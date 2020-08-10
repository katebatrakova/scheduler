import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

// DayList passes these props
// {
//   id: 1,
//   name: "Monday",
//   spots: 2,
// } + selected + setDay

export default function DayListItem(props) {
  console.log(props.spots, "props.spots");
  function formatSpots() {
    let spotsRemainingText = props.spots;
    if (props.spots === 0) {
      spotsRemainingText = "no spots remaining";
      return spotsRemainingText;
    }
    if (props.spots === 1) {
      spotsRemainingText = "1 spot remaining";
      return spotsRemainingText;
    }
    if (props.spots > 1) {
      spotsRemainingText += " spots remaining";
      return spotsRemainingText;
    }
  }

  let dayListItemClass = classnames(
    "day-list__item",
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": props.spots === 0 }
  );

  return (
    <li className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="{text--regular}">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
