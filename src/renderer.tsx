// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import * as React from "react";
import * as ReactDOM from "react-dom";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <h1 className="header">THIS IS REACT</h1>
        <div>Do whatever you want now!</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
