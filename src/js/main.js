import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  state = {
    show: false
  }
  handleShowAll() {
    this.setState({show: !this.state.show})
  }
  handleClick() {
    this.setState({show: !this.state.show})
    console.log('please work')
  }
  render() {
    return (
      <div>
        <button onClick={() => this.handleClick()}>Click Me!</button>
        {this.state.show && 
          <input
            type="button" 
            value="another button to click!"
            onClick={() => this.handleShowAll()}
          />
        }
      </div>
    )
  }
}

// Message Listener function
chrome.runtime.onMessage.addListener((request, sender, response) => {
  // If message is injectApp
  if (request.injectApp) {  
    // Inject our app to DOM and send response
    injectApp();
    response({
      startedExtension: true,
    });
  }
});

function injectApp() {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "udex");
  document.body.prepend(newDiv);
  ReactDOM.render(<App />, newDiv);
}