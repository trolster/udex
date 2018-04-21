# UDEX

A quality-of-life Google Chrome Extension for Udacity Reviewers.

## Dependencies

Node.js version 8+ and npm

## Get Started

It's possible to install a chrome extension from a folder, and since this extension hasn't been published it's necessary to do so to use it. Here is whta you need to do:

1. Clone this repository and open your terminal to the repository folder.
1. Install all dependencies and build the extension: `npm i && npm run build`.
1. OPen up Chrome and go to this address: `chrome://extensions/`.
1. Turn on "Developer mode" in the top right corner.
1. Click "LOAD UNPACKED" from the menu and select the folder that contains this repository.
1. Navigate to an active review and check that it's working.

## What does it do?

It injects some JavaScript into any page the matches `https://review.udacity.com/*`. This adds some buttons with some actions associated:

#### "MARK ALL PASSED" Button

Expand all rubric items, with the radio "Meets Specification" already selected.

#### "SUBMIT ALL OPEN" Button

Submits all open rubric items. :bulb: This does not submit the review, only any unsubmitted rubric items.

## What will it do in the future?

I'm looking at saving default rubric comments as well.

## Contributing

I'm not accepting contributions at this time.

## License

MIT