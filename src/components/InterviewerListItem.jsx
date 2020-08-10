import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";

// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };

// setInterviewer={action("setInterviewer")}

function InterviewerListItem(props) {
  // const [interviewer, setInterviwer] = useState({ interviewer });

  let interviewerListItemClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li
      className={interviewerListItemClass}
      // onClick={() => props.setInterviewer(props.id)} //before
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
