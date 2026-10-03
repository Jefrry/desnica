export function readQueryValue(value: unknown) {
  const queryValue = Array.isArray(value) ? value[0] : value
  return typeof queryValue === 'string' && queryValue ? queryValue : undefined
}
