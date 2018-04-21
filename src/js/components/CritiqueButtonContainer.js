import React from "react";
import ReactDOM from "react-dom";
import ExpandButton from "./ExpandButton";
import SubmitOpenButton from "./SubmitOpenButton";

class CritiqueButtonContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="udex-container">
          <div className="critique-container">
            <h4 className="h-slim">UDEX Chrome Extension Actions</h4>
            <div className="row row-buttons">
              <div className="col-xs-12">
                <ExpandButton />
                <SubmitOpenButton />
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .udex-container {
            margin-bottom: 20px;
          }
          .critique-container {
            padding: 10px;
          }
          .h-slim {
            margin-bottom: 5px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default CritiqueButtonContainer;
