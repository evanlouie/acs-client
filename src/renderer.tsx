// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import * as React from "react";
import * as ReactDOM from "react-dom";

import * as child from "child_process";
// import { promisify } from "util";

class App extends React.Component {
  public static async callACS(): Promise<string> {
    return new Promise<string>(resolve => {
      child.exec("acs-engine", (error, stdout, stderr) => {
        error && console.error(error.message);
        stderr && console.error(stderr);
        stdout && console.log(stdout);
        return resolve(stdout);
      });
    });
  }

  public render() {
    return (
      <div className="App">
        <h1 className="header">THIS IS REACT</h1>
        <div>Do whatever you want now!</div>
        <button
          className="acs-test"
          onClick={() => {
            App.callACS();
          }}
        >
          click me!
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
