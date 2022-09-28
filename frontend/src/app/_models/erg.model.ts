export class ERG {
  _id?: string;
  name: string;
  numberOfMembers: number;
  //constructor overload, _id is defined on the backend, so we'll need to accept a 2 parameter erg object on the frontend.
  constructor(name: string, numberOfMember: number);
  constructor(name: any, numberOfMembers: any, _id?: any) {
    // check for types and then
    // do assignment to fields if needed
    // now we are just assiging it
    // without checking for the types
    this._id = _id;
    this.name = name;
    this.numberOfMembers = numberOfMembers;
  }
}
