import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
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
    <li
      data-testid="day"
      className={dayListItemClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="{text--regular}">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
