import React from "react";
import DayListItem from "components/DayListItem";


export default function DayList(props) {
  const { days } = props
  const parsedDays = days.map((day) => {
    return (<DayListItem

      name={day.name}
      spots={day.spots}
      selected={day.name === day.day}
      setDay={day.setDay}
    />

    );
  });

  return (
    <>
      <ul>
        {parsedDays}
      </ul>
    </>
  )

}