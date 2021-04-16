export const getProperty = (object, key) => {
  if (object === null || key === null) {
    return '';
  }
  key = key.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  key = key.replace(/^\./, ''); // strip a leading dot
  const a = key.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (isObject(object) && k in object) {
      object = object[k];
    } else {
      return;
    }
  }
  return object;
};

function isObject(o) {
  return o === Object(o);
}
