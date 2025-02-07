import React, { createContext, useState, useContext } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(duration)
dayjs.extend(isBetween)

type D = dayjs.Dayjs // smaller alias

// Depending on if `selectRange` is true, you can either
// select one date or two. But if one date is selected,
// we'll always store it as an array
type SelectedDates = [] | [D] | [D, D]

/****************************************
  DatePicker
*****************************************/

type DatePickerProps = {
  selectRange?: boolean
  // All the DayJS types
  baseMonth?: string | number | D | Date | null | undefined
  onSelectDate?: (selectedDate: SelectedDates) => void
}

// const Context = createContext<ContextType>(null!)

export const DatePicker: React.FC<DatePickerProps> = ({
  selectRange = false,
  baseMonth,
  onSelectDate,
}) => {
  const [selectedDates, setSelectedDates] = useState<SelectedDates>([])

  // A DateJS (D) Object for the first day of the month
  const [baseMonthFirst, setBaseMonthFirst] = useState<D>(() => {
    return dayjs(baseMonth || new Date()).startOf('month')
  })

  function selectDate(date: D) {
    let newSelectedDates: SelectedDates = []
    if (selectRange && selectedDates.length === 1) {
      newSelectedDates = [selectedDates[0], date]
    } else {
      newSelectedDates = [date]
    }
    setSelectedDates(newSelectedDates)
    onSelectDate?.(newSelectedDates)
  }

  function setBaseMonth(to: number | D) {
    if (typeof to === 'number') {
      const newBaseMonth = baseMonthFirst.add(to, 'month')
      setBaseMonthFirst(newBaseMonth)
    } else {
      setBaseMonthFirst(to)
    }
  }

  return (
    <DatePickerCalendar
      selectedDates={selectedDates}
      selectDate={selectDate}
      baseMonthFirst={baseMonthFirst}
      setBaseMonth={setBaseMonth}
    />
  )
}

/****************************************
  DatePickerCalendar
*****************************************/

// type Offset = -1 | 0 | 1
type DatePickerCalendarProps = {
  // offset?: Offset
  selectedDates: SelectedDates
  selectDate(date: D): void
  baseMonthFirst: D
  setBaseMonth(to: number | D): void
}

export function DatePickerCalendar({
  selectedDates,
  selectDate,
  baseMonthFirst,
  setBaseMonth,
}: DatePickerCalendarProps) {
  // The first day of the base month
  const theFirst = baseMonthFirst

  // The day of the week of the first day of the month
  const dayOfWeek = theFirst.day()

  const today = dayjs(new Date())
  const daysInMonth = theFirst.daysInMonth()
  const year = theFirst.year()
  const monthNumber = theFirst.format('MM')

  const style = { '--datePickerCalendarBoxOffset': dayOfWeek + 1 } as React.CSSProperties

  return (
    <div className="spacing">
      <button data-datepicker-change-month="" onClick={() => setBaseMonth(1)}>
        Next Month
      </button>

      <hr />
      <div data-datepicker-calendar="" style={style}>
        <div data-datepicker-calendar-dayofweek="">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div data-datepicker-calendar-boxes="">
          {[...Array(daysInMonth).keys()].map((n) => {
            const day = n + 1
            const dayPad = day.toString().padStart(2, '0')
            const timeStamp = `${year}-${monthNumber}-${dayPad}`
            const date = dayjs(timeStamp)

            const selectedFirst = selectedDates[0] && date.isSame(selectedDates[0], 'day')
            const selectedLast = selectedDates[1] && date.isSame(selectedDates[1], 'day')
            const selected = selectedFirst || selectedLast
            const isToday = today.isSame(date, 'day')
            const isPast = today.isAfter(date, 'day')

            const between =
              selectedDates.length === 2 && date.isBetween(selectedDates[0], selectedDates[1])

            return (
              <button
                key={day}
                data-selected={selected ? '' : undefined}
                data-selected-first={selectedFirst ? '' : undefined}
                data-selected-last={selectedLast ? '' : undefined}
                data-today={isToday ? '' : undefined}
                data-past={isPast ? '' : undefined}
                data-between={between ? '' : undefined}
                onClick={() => selectDate(date)}
              >
                <time dateTime={timeStamp}>{day}</time>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
