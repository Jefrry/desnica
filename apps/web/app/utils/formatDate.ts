const ISO_CALENDAR_DATE = /^(\d{4})-(\d{2})-(\d{2})/

const formatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatDate(value: string) {
  const match = ISO_CALENDAR_DATE.exec(value)

  if (!match) {
    return value
  }

  const [, year, month, day] = match
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))

  if (Number.isNaN(date.getTime())) {
    return value
  }

  const parts = formatter.formatToParts(date)
  const formattedDay = parts.find(part => part.type === 'day')?.value
  const formattedMonth = parts.find(part => part.type === 'month')?.value
  const formattedYear = parts.find(part => part.type === 'year')?.value

  return `${formattedDay} ${formattedMonth} ${formattedYear}`
}
