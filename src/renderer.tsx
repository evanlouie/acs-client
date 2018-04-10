// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

import { ACSEngine } from "./ACSEngine";

class App extends React.Component {
  public state: { stdout: string } = {
    stdout: "",
  };

  public render() {
    return (
      <div className="App">
        <button className="acs" onClick={this.checkACSEngine.bind(this)}>
          Check acs-engine binary is executable
        </button>
        <button className="acs-test" onClick={this.callACSEngine.bind(this)}>
          Check for acs-engine in $PATH
        </button>
        {this.state.stdout && (
          <pre className="stdout">
            <code>{this.state.stdout}</code>
          </pre>
        )}
        <Container>
          <Row>
            <Col>
              <h4>Configure ACS-Engine JSON</h4>
              <Form>
                <FormGroup>
                  <Label for="apiVersion">apiVersion</Label>
                  <Input type="text" name="apiVersion" id="apiVersion" defaultValue="vlabs" />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="password placeholder"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Select</Label>
                  <Input type="select" name="select" id="exampleSelect">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelectMulti">Select Multiple</Label>
                  <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Text Area</Label>
                  <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <FormGroup tag="fieldset">
                  <legend>Radio Buttons</legend>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="radio1" /> Option one is this and that—be sure to
                      include why it's great
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="radio1" /> Option two can be something else and
                      selecting it will deselect option one
                    </Label>
                  </FormGroup>
                  <FormGroup check disabled>
                    <Label check>
                      <Input type="radio" name="radio1" disabled /> Option three is disabled
                    </Label>
                  </FormGroup>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" /> Check me out
                  </Label>
                </FormGroup>
              </Form>
            </Col>
            <Col>
              <h4>JSON</h4>
              <pre>
                <code>THIS IS YOUR JSON</code>
              </pre>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="float-right">
                <Button color="primary">Deploy!</Button>
              </div>
            </Col>
          </Row>
        </Container>
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
