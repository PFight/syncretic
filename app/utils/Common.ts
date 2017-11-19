export function definedNotNull(x) {
  return x !== undefined && x !== null;
}

export function undefinedOrNull(x) {
  return x === undefined || x === null;
}
