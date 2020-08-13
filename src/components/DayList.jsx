import React from "react";
import DayListItem from "components/DayListItem";

//The DayList is responsible for rendering a list of DayListItem components.
export default function DayList(props) {
  const { days } = props;
  const parsedDays = days.map((day) => {
    return (
      <DayListItem
        key={day.name}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return (
    <>
      <ul>{parsedDays}</ul>
    </>
  );
}
