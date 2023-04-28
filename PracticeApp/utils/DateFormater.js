export const FormatDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getUTCDate()}`
}
export const getDateMinusDays = (date,days) => {
  return new Date(date.getFullYear(),date.getMonth(),date.getUTCDate() - days)
}