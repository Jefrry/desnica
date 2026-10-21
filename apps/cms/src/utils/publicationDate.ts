export function today(date = new Date()): string {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

export function calendarDate(value: string | Date): string {
  return (value instanceof Date ? value.toISOString() : value).slice(0, 10);
}
