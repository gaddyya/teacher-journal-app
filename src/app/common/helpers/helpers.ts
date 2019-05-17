export function isUndefined(value: any): boolean {
  return typeof value === 'undefined';
}

export function isFunction(value: any): boolean {
  return typeof value === 'function';
}

export function isNumber(value: any): boolean {
  return typeof value === 'number';
}

export function isString(value: any): boolean {
  return typeof value === 'string';
}

export function isBoolean(value: any): boolean {
  return typeof value === 'boolean';
}

export function isObject(value: any): boolean {
  return value !== null && typeof value === 'object';
}

export function isNumberFinite(value: any): boolean {
  return isNumber(value) && isFinite(value);
}
