# UDEX

`udex` is a quality-of-life Google Chrome Extension for Udacity Reviewers.

---

**IMPORTANT NOTICE:** The API is eventually going to be shut down and when that happens `udex` will become inactive.

## Get Started

1.  Navigate to my [/projects][1] page where you can find the `udex` project.
1.  Click the install button.
1.  Get a new token from the API Access link in the [Reviewer Dashboard][2]. ![API Token][token]
1.  Open the popup by clicking on the extension icon the the Chrome Extension bar next to the address bar.
1.  Check that it's working!

## What it Does

### Extension Icon Notification

It updates the extension icon with a badge that shows if you have new reviews and/or unread feedbacks from students.

![Extension Icon Badges][badges]

**Badge numbers**: The first number is the number of new reviews available. The second number is the number of unread student feedbacks you have.

**Badge colors**:

* Red: You have new reviews.
* Blue: You only have new feedbacks.
* Grey: You have no new reviews or feedbacks.

### Review Page Buttons

It adds some buttons to the review page with some actions associated:
![Review Page Buttons][buttons]

#### "MARK ALL PASSED" Button

Expand all rubric items, with "Meets Specification" already selected.

#### "SUBMIT ALL OPEN" Button

Submits all open rubric items. :bulb: This does not submit the review, only any unsubmitted rubric items.

## Future Development

### Contributing

I don't intend to actively maintain the project but for very minor changes:

1.  Fork this repository
1.  Create your branch (`git checkout -b my-new-thing`)
1.  Commit your changes (`git commit -am 'commit-message'`)
1.  Push to the branch (`git push origin my-new-thing`)
1.  Create a new Pull Request.

### Development Dependencies

Node.js version 8.5+ and npm

### Development Setup

For development and testing you'll need to install a chrome extension from a folder. Here are the steps to get it up and running:

1.  Clone this repository and open your terminal to the repository folder:

    ```shell
    mkdir udex
    git clone https://github.com/trolster/udex-chrome-extension.git udex
    cd udex
    ```

1.  Install all dependencies and build the extension: `npm i && npm run build`.
1.  Open up Chrome and go to this address: `chrome://extensions/`.
1.  Turn on "Developer mode" in the top right corner.
1.  Click "LOAD UNPACKED" from the menu and select the root folder that contains this repository (the topmost folder that contains `manifest.json`).
1.  Navigate to an active review and check that it's working.

## License

MIT

[1]: https://www.mtl.codes/projects
[2]: https://review.udacity.com/#!/submissions/dashboard
[badges]: https://readmeimages-wautwxpogk.now.sh/readme-udex-badges.png
[buttons]: https://readmeimages-wautwxpogk.now.sh/readme-udex-buttons.png
[token]: https://readmeimages-kvmrxqcrux.now.sh/readme-api-access.png
