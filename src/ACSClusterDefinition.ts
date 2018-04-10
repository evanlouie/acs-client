import { IProperties } from "./types";

/**
 * @see https://github.com/Azure/acs-engine/blob/master/docs/clusterdefinition.md
 */
interface IClusterDefinition {
  apiVersion: string;
  properties: IProperties;
}

export class ACSClusterDefinition implements IClusterDefinition {
  public apiVersion: string;
  public properties: IProperties;

  constructor(properties: IProperties, apiVersion: string = "vlabs") {
    this.apiVersion = apiVersion;
    this.properties = properties;
  }
}
