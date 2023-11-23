import React, { useEffect, useState, useContext } from 'react'
import dayjs from 'dayjs'
import { getMonth } from '../util.js'
import GlobalContext from "../context/GlobalContext.js"
import Day from './Day.js'

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month())
  const [currentMonth, setCurrentMonth] = useState(getMonth())

  // React hook that takes effect when currentMonthIdx changes
  // Occurs when small calendar chevrons change it
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx))
  }, [currentMonthIdx]);

  // React hook that takes effect when monthIdx changes
  // Occurs when big calendar chevrons update it
  const { monthIndex } = useContext(GlobalContext)
  useEffect(() => {
    setCurrentMonthIdx(monthIndex)
  }, [monthIndex]);

  // actionEventHandler for chevron_left
  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1)
  }

  // actionEventHandler for chevron_right
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1)
  }

  // Function dynamically dependent on state of day
  // Appends given "return" properties to the currentDay buttons className
  function getCurrSmallDay(day) {
    const format = "DD-MM-YY"
    const nowDay = dayjs().format(format)
    const currDay = day.format(format)
    if (nowDay === currDay) {
      return "bg-blue-600 text-white rounded-full";
    } else {
      return "";
    }
  }

  return (
    <div className="mt-9">
        <header className="flex justify-between">
          {/* Dynamic Month Label */}
          <p className="text-gray-500 items-center">
            {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
              "MMMM YYYY"
            )}
          </p>
          
          {/* Month Navigation Chevrons */}
          <div>
          <button onClick={handlePrevMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_right
            </span>
          </button>
          </div>
        </header>

        {/* Start of Small Calendar */}
        <div className="grid grid-cols-7 grid-rows-6">
          {currentMonth[0].map((day, idx) => (
            <span key={idx} className="text-sm py-1 text-center">
              {day.format('dd').charAt(0)}
            </span>
          ))}
          {currentMonth.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((day, idx) => (
                <button key={idx} className={`py-1 w-full ${getCurrSmallDay(day)}`}>
                  <span className="text-sm">
                    {day.format('D')}
                  </span>
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
    </div>
  )
}