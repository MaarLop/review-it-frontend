
export function camelCaseKeysToUnderscore(obj: any) {
  if (typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Array) {
    const resultArray = [];
    Object.keys(obj).forEach((i) =>
      resultArray.push(camelCaseKeysToUnderscore(obj[i])),
    );
    return resultArray;
  }
  const result = {};
  // tslint:disable-next-line: forin
  for (const oldName in obj) {
    const newName = camelToUnderscore(oldName);
    result[newName] = obj[oldName];
    if (result[newName] != null) {
      if (result[newName] instanceof Array) {
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < result[newName].length; index++) {
          result[newName][index] = camelCaseKeysToUnderscore(
            result[newName][index],
          );
        }
      } else if (
        typeof result[newName] === 'object' &&
        !(result[newName] instanceof Date)
      ) {
        result[newName] = camelCaseKeysToUnderscore(result[newName]);
      }
    }
  }
  return result;
}

function camelToUnderscore(key) {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * Transforma texto legible en undescore case, para generar urls. "Órdenes de compra" lo transforma en
 * "ordenes_compra"
 * @param text Texto human friendly a transformar
 */
export function textToUnderscoreCase(text: string): string {
  return text
    .toLowerCase()
    .replace(' de ', '_') // para evitar preposiciones que no se incluiran en la url. Posiblemente haya que mejorarlo.
    .split(' ')
    .join('_')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
