module.exports = {
  SCREEN: {
    // These values represent the crop of the overall screenshot
    // that will be created to OCR for the queue position.
    HEIGHT: 0,
    WIDTH: 0,
    LEFT: 0,
    TOP: 0,
  },
  PUSHOVER_API_KEY: "",
  PUSHOVER_USER_KEY: "",
  SCREENSHOT_FILE: './screenshot.png',
  // Measured in ms. Default 10 minutes.
  NOTIFICATION_INTERVAL: 60 * 1000 * 10,
  NOTIFICATION_TITLE: 'New World Queue'
}

