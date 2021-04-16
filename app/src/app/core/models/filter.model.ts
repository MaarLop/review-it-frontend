import { FilterValue } from './dictionary.model';

export class Filter {
  key: string;
  value: any;

  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  get getValue(): FilterValue {
    const value =
      this.value instanceof Date
        ? this.value.toISOString().split('T', 1)[0]
        : this.value;
    return value;
  }
}
