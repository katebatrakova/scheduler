import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";

function InterviewerListItem(props) {
  let interviewerListItemClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li
      className={interviewerListItemClass}
      onClick={props.setInterviewer} //after
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

export default InterviewerListItem;
