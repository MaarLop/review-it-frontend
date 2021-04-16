import { Deposito } from 'app/admin/models/deposito.model';
import { Model, genderTypes } from './model.model';

export class User implements Model {
  static modelName = 'Usuario';
  static modelPluralName = 'Usuarios';
  static modelGender = 'M' as genderTypes;
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  isSuperuser: boolean;
  telefono: string;
  mail?: string;
  depositoDeTrabajo: Deposito;
}
