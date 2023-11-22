import dayjs from 'dayjs'

const MAX_ROWS = 5
const MAX_COLUMNS = 7

export function getMonth(month = dayjs().month()) {
    const year = dayjs().year()
    
    // This retrieves the day of the week of the first day of the month
    const firstDayOfMonth = dayjs(new Date(year, month, 1)).day()

    // This determines how much underflow we need from the previous month
    // If day = 0, we don't need any underflow, if firstDayOfMonth = 1 (Monday), we need 1 day of underflow, etc.
    // Thus currMonthCount starts at -1 from the first day of the month
    let currMonthCount = 0 - firstDayOfMonth
    const daysMatrix = new Array(MAX_ROWS).fill([]).map(() => {
        return new Array(MAX_COLUMNS).fill(null).map(() => {
            currMonthCount++
            // This dayjs object is the current month/year but if we go into the negatives we underflow
            return dayjs(new Date(year, month, currMonthCount))
            // If we go past the number of days in the month, we overflow (Start again at 1 in the next month)
        })
    })
    return daysMatrix
}