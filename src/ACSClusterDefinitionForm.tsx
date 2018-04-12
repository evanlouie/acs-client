import * as hljs from "highlight.js";
import { Map } from "immutable";
import React from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

import { ACSClusterDefinition } from "./ACSClusterDefinition";

import { IProperties } from "./types";

/**
 * @see https://github.com/Azure/acs-engine/blob/master/docs/clusterdefinition.md
 */
export interface IClusterDefinition {
  apiVersion: string;
  properties: IProperties;
}

export class ACSClusterDefinitionForm extends React.Component<{
  clusterDefinition: IClusterDefinition;
}> {
  public state = {
    ...this.props,
    immutable: Map({ ...this.props.clusterDefinition }),
  };

  public render() {
    const { immutable } = this.state;
    const apiVersion = immutable.get("apiVersion") as string;
    const properties = immutable.get("properties") as IProperties;

    const { orchestratorProfile, masterProfile, agentPoolProfiles, linuxProfile } = properties;

    return (
      <div className="ACSClusterDefinitionForm">
        <Row>
          <Col md={6}>
            <h3>Cluster Definition</h3>
            <FormGroup>
              <Label for="apiVersion">apiVersion</Label>
              <Input
                disabled
                type="text"
                name="apiVersion"
                id="apiVersion"
                value={apiVersion}
                onChange={e => this.updateApiVersion.bind(this)(e.target.value)}
              />
            </FormGroup>
            <h4>Properties</h4>
            {Object.keys(properties).map(key => {
              const value = properties[key];
              return (
                <div className={`ACSClusterDefinitionForm__${key}`}>
                  <Label for={key}>{key}</Label>
                  {this.generateFormGroup(value, ["properties", key])}
                </div>
              );
            })}
          </Col>
          <Col md={6}>
            <h3>JSON</h3>
            <pre>
              <code
                dangerouslySetInnerHTML={{
                  __html: hljs.highlight(
                    "json",
                    JSON.stringify(this.state.immutable.toJSON(), null, 2),
                  ).value,
                }}
              />
            </pre>
          </Col>
        </Row>
      </div>
    );
  }

  private generateFormGroup(formGroup: any, keyPath: string[] = []): JSX.Element[] {
    if (typeof formGroup === "undefined") {
      return [<div className="undefined" />];
    }
    const indent = keyPath.length;
    const marginLeft = `${keyPath.length * 0.5}em`;

    return Object.keys(formGroup).map(key => {
      const value = (formGroup as any)[key];

      if (typeof value === "string") {
        return (
          <FormGroup style={{ marginLeft }}>
            <Label for={key}>{key}:</Label>
            <Input
              bsSize="sm"
              type="text"
              name={key}
              id={key}
              value={value}
              onChange={e => this.updateProperty.bind(this)([...keyPath, key], e.target.value)}
            />
          </FormGroup>
        );
      } else if (typeof value === "number") {
        return (
          <FormGroup style={{ marginLeft }}>
            <Label for={key}>{key}:</Label>
            <Input
              bsSize="sm"
              type="number"
              name={key}
              id={key}
              value={value}
              onChange={e =>
                this.updateProperty.bind(this)([...keyPath, key], Number.parseInt(e.target.value))
              }
            />
          </FormGroup>
        );
      } else if (Array.isArray(value)) {
        return (
          <FormGroup style={{ marginLeft }}>
            <Label for={key}>{key}:</Label>
            {value.map(val => this.generateFormGroup(val, [...keyPath, key]))}
          </FormGroup>
        );
      } else if (typeof value === "object") {
        return (
          <FormGroup style={{ marginLeft }}>
            <Label for={key}>{key}:</Label>
            {this.generateFormGroup(value, [...keyPath, key])}
          </FormGroup>
        );
      }

      return <div className="not-found">Type for {value} not found</div>;
    });
  }

  private updateProperty(keyPath: string[], value: any) {
    console.log(keyPath, value);
    const immutable = this.state.immutable.setIn(keyPath, value);
    this.setState({ immutable });
  }

  private updateApiVersion(apiVersion: string) {
    const clusterDefinition = { ...this.state.clusterDefinition };
    clusterDefinition.apiVersion = apiVersion;
    this.setState({ clusterDefinition });
  }

  private addOrchestratorProfile() {
    const { clusterDefinition } = this.state;
    const { properties } = clusterDefinition;
    properties.orchestratorProfile = {
      orchestratorRelease: "1.9",
      orchestratorType: "Kubernetes",
      orchestratorVersion: "1.9",
    };
    clusterDefinition.properties = properties;
    this.setState({ clusterDefinition });
  }
}
