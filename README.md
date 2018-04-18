# UDEX

A quality-of-life Google Chrome Extension for Udacity Reviewers.

## Dependencies

Node.js version 8+
npm

## Get Started

It's quite easy to install a chrome extension from disk, and since this extension hasn't been published it's necessary to do so to use it. It involves only a few steps:

1. Clone this repository and open your terminal to the repository folder.
1. Install all dependencies and build the extension: `npm i && npm run build`.
1. Go to this address: `chrome://extensions/`, and turn on "Developer mode" in the top right corner.
1. Click "LOAD UNPACKED" from the menu and select the folder that contains this repository.
1. Navigate to an active review and check that it's working.

## What does it do?

It injects some JavaScript into any page the matches `https://review.udacity.com/*`. This adds some buttons with some actions associated:

### "Open All" Button
Expand all rubric items, with the radio "passed" already selected.

### "Save All" Button
Submits all open rubric items.

## What will it do in the future?

Not much!

1. Allow for default content for rubric items.

## Contributing

I'm not accepting contributions at this time.

## License

MIT