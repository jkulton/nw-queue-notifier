const { createWorker } = require('tesseract.js');
const screenshot = require('screenshot-desktop');
const config = require('./config');
const chump = require('chump');
const Jimp = require('jimp');

const pushover = new chump.Client(config.PUSHOVER_API_KEY);
const user = new chump.User(config.PUSHOVER_USER_KEY);

async function processScreenshot({ file, left, top, height, width }) {
  // Crop image to provided position, invert for OCR
  // (OCR performs better with dark text on light background)
  const image = await Jimp.read(file);
  await image
    .crop(left, top, width, height)
    .invert()
    .write(file);
}

async function getQueuePosition({ file }) {
  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({ tessedit_char_whitelist: '0123456789' });
  const { data: { text } } = await worker.recognize(file);
  await worker.terminate();
  return text.trim();
}

async function main() {
  console.log('Taking screenshot...');
  await screenshot({
    filename: config.SCREENSHOT_FILE,
    format: 'png'
  });

  // Crops screenshot to queue counter and inverts for OCR performance.
  console.log('Processing screenshot for OCR...');
  await processScreenshot({
    file: config.SCREENSHOT_FILE,
    left: config.SCREEN.LEFT,
    top: config.SCREEN.TOP,
    height: config.SCREEN.HEIGHT,
    width: config.SCREEN.WIDTH,
  });

  console.log('Extracting queue position w/OCR...');
  const queuePosition = await getQueuePosition({ file: config.SCREENSHOT_FILE });
  console.log("Queue position:", queuePosition);

  // Primitive attempt to validate OCR
  const parsedPosition = parseInt(queuePosition);
  const validValue = queuePosition === String(parsedPosition);

  // Send Pushover notification
  console.log("Sending notification...");
  const message = new chump.Message({
    title: config.NOTIFICATION_TITLE,
    message: validValue ? queuePosition : 'Unable to get queue position',
    user
  });
  await pushover.sendMessage(message);
  console.log("");
}

main();
setInterval(main, config.NOTIFICATION_INTERVAL);
