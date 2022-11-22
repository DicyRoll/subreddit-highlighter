# Subreddit Highlighter

Subreddit Highlighter is a browser extension that highlights posts on the reddit home page from subreddits you specify, you can even customize the color of the highlight (impressive I know).

Developed with Tailwind CSS and Parcel.

## Dependencies

- [Node.js](https://nodejs.org/) v19.1.0
- [npm](https://www.npmjs.com/) v9.1.2
- zip (optional: to zip the extension for publishing)

## Development

- After cloning the repository, run `npm install` to install the dependencies.

- Run `npm run watch`, Parcel will execute an initial build of the extension and then watch for changes to the source files, rebuilding on each change. The extension will be built to the `dist` directory.

- Enable **developer mode** on the top left of your **menage extensions page** (chrome://extensions/), click **load unpacked** and select the `dist` folder. Changes to the extension will usually be automatically loaded, if for whatever reason this doesn't happen, you can reload the extension by clicking the reload button.

- When you're ready to build the extension, run `npm run build`.

- To zip the extension, run `npm run zip`.

## Installation

### Chrome Web Store

You can install the extension from the [Chrome Web Store]()!

### Manual Installation

You can follow the [development](#development) instructions above to install the extension manually, just ignore the `npm run watch` section.
