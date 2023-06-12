import React, { useState } from "react";
import styles from "./CalenderElement.module.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const renderCalendar = () => {
    // 달력 로직을 구현해주세요
    // 예시로 현재 연도와 월을 사용하였습니다.
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // 현재 연도와 월을 기반으로 달력의 일자를 계산합니다.
    // 여기에서는 간단하게 현재 월의 1일부터 31일까지 표시하였습니다.
    const calendarDays = [];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      calendarDays.push(
        <div
          key={day}
          className={`${styles.day} ${
            date.getTime() === selectedDate?.getTime() ? styles.selected : ""
          }`}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <h2>Calendar</h2>
      </div>
      <div className={styles.days}>{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
