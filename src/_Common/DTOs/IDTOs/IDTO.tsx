export default abstract class IDTO {
  toJSON(): any {}
  static fromJSON(json: any): any {}
}
