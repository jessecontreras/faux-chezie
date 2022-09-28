export class Alert {
  id?: string;
  type?: AlertType;
  message?: string;
  autoClose?: boolean;
  keepAfterRouteChange?: boolean;
  fade?: boolean;
  //TODO: Is this redundant? Isn't my alert class already a de-facto partial given all optional properties? Think about it Jes...come back to this if you have time. What are we type checking if all optionals...
  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning,
}
