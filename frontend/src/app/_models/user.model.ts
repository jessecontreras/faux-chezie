export class User {
  _id?: string;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  token: string;

  //TODO: Is this redundant? Isn't my alert class already a de-facto partial given all optional properties? Think about it Jes...come back to this if you have time.
  constructor(
    _id = '',
    username = '',
    firstName = '',
    lastName = '',
    token = ''
  ) {
    this._id = _id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.token = token;
  }
}
