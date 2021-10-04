# nw-queue-notifier

Script for notifying [New World](https://www.newworld.com/) queue position.

This script is intended to be run while waiting in a queue. It will take a screenshot of the screen, OCR the queue position from the screenshot, and then send a [Pushover](https://pushover.net/) notification on regular interval.

<img width=500 src="https://user-images.githubusercontent.com/6694167/135780134-cd3c951f-0c6b-486d-8e38-e9b2855f0a92.jpg" />


Note: This is a simple and brute force script, YMMV.

## Basic Usage

(This script requires [Pushover](https://pushover.net/), so you'll need an account and to create an app)

1. Clone repo
2. Run `npm install`
3. Copy `config.example.js` into `config.js`
4. Fill out values in `config.js`
5. `npm run start`

## Tips for Usage

+ You'll want to run New World in windowed mode, and it should be foregounded so the queue position is visible in the screenshot.
+ In order to fill out the `SCREEN` values in `config.js` you'll need to determine the location of the queue counter on your computer screen. One easy way to do this is to take a screenshot of your entire screen and then use an image editor to determine the top/left offset and the height/width of the queue counter.
+ The `4` from New World's font can sometimes be parsed as a `1` by tesseract. YMMV.
