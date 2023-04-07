export default abstract class IEntity {
  toDTO(): any {}
  static fromDTO(dto: any): any {}
}
