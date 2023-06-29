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

