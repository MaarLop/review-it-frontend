export class SimpleOption {
  id: number | string;
  descripcion: string;

  constructor(id: number = null, descipcion: string = null) {
    this.id = id;
    this.descripcion = descipcion;
  }
}
