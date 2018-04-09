// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import * as React from "react";
import * as ReactDOM from "react-dom";

import { ACSEngine } from "./ACSEngine";

class App extends React.Component {
  public state: { stdout: string } = {
    stdout: "",
  };

  public render() {
    return (
      <div className="App container">
        <div className="row">
          <button className="acs" onClick={this.checkACSEngine.bind(this)}>
            Check acs-engine binary is executable
          </button>
          <button className="acs-test" onClick={this.callACSEngine.bind(this)}>
            Check for acs-engine in $PATH
          </button>
          <pre className="stdout">
            <code>{this.state.stdout}</code>
          </pre>
        </div>
      </div>
    );
  }

  private log(out: string) {
    const withNewLine: string = !!out.match(/\n$/) ? out : out + "\n";
    const stdout: string = withNewLine + this.state.stdout;
    this.setState({ stdout });
  }

  private async checkACSEngine() {
    const isInstalled = await ACSEngine.acsIsInstalled();
    this.log(`Packaged acs-engine executable: ${isInstalled}\n`);
  }

  private async callACSEngine() {
    const stdout = await ACSEngine.call();
    this.log(stdout);
  }
}

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
