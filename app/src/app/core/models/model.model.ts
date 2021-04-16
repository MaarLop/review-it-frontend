export abstract class Model {
  static modelName: string;
  static modelPluralName: string;
  static modelGender: genderTypes;
  static moduleName?: string;
  id: number | string;
}

export type genderTypes = 'M' | 'F' | 'N';
