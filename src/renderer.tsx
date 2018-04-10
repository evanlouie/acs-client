// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

import { ACSClusterDefinitionForm, IClusterDefinition } from "./ACSClusterDefinitionForm";
import { ACSEngine } from "./ACSEngine";

class App extends React.Component {
  public state: { stdout: string; clusterDefn: IClusterDefinition } = {
    // tslint:disable
    clusterDefn: {
      apiVersion: "vlabs",
      properties: {
        orchestratorProfile: {
          orchestratorType: "Kubernetes",
          orchestratorRelease: "1.9",
          kubernetesConfig: {
            apiServerConfig: {
              "--admission-control":
                "NamespaceLifecycle,LimitRanger,ServiceAccount,DefaultStorageClass,DenyEscalatingExec,Initializers,MutatingAdmissionWebhook,ValidatingAdmissionWebhook,ResourceQuota",
              "--runtime-config": "admissionregistration.k8s.io/v1alpha1",
            },
          },
        },
        masterProfile: {
          count: 1,
          dnsPrefix: "",
          vmSize: "Standard_DS2_v2",
        },
        agentPoolProfiles: [
          {
            name: "agentpool1",
            count: 2,
            vmSize: "Standard_DS2_v2",
            availabilityProfile: "AvailabilitySet",
          },
        ],
        linuxProfile: {
          adminUsername: "azureuser",
          ssh: {
            publicKeys: [
              {
                keyData: "",
              },
            ],
          },
        },
        servicePrincipalProfile: {
          clientId: "",
          secret: "",
        },
      },
    },
    // tslint:enable
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
          <ACSClusterDefinitionForm
            apiVersion={this.state.clusterDefn.apiVersion}
            properties={this.state.clusterDefn.properties}
          />
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
