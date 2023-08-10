export const calculateDaysPassed = (startDate, endDate) => {
  // Convert the dates to UTC to ignore time zone differences
  const start = new Date(startDate.toISOString().split('T')[0])
  const end = new Date(endDate.toISOString().split('T')[0])

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = end - start

  // Calculate the number of whole days by dividing milliseconds by the number of milliseconds in a day (24 hours)
  const daysPassed = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  )

  return daysPassed
}

export const timeSince = (time) => {
  const date = new Date(time)
  let seconds = Math.floor((new Date() - date) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' años'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' meses'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' dias'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' horas'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' minutos'
  }
  return Math.floor(seconds) + ' segundos'
}
