import React from "react";
import DayListItem from "components/DayListItem";

// App js passes to DayList these props

// [{
//   id: 1,
//   name: "Monday",
//   spots: 2,
// },
// {
//   id: 2,
//   name: "Tuesday",
//   spots: 5,
// },
// {
//   id: 3,
//   name: "Wednesday",
//   spots: 0,
// }], + useState's day + useState's setDay

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
