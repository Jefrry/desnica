import { readQueryValue } from '~/utils/query/readQueryValue'

export function parsePositivePage(value: unknown) {
  const queryValue = readQueryValue(value)

  if (!queryValue || !/^[1-9]\d*$/.test(queryValue)) {
    return undefined
  }

  const page = Number(queryValue)
  return Number.isSafeInteger(page) ? page : undefined
}
