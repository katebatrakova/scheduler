import React, { useState } from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
// import classnames from "classnames";

// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
// ]; + interviewer={}, + setInterviewer={action("setInterviewer")}
const InterviewerList = (props) => {
  const { interviewers } = props;

  const parsedInterviewers = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        // setInterviewer={interviewer.setInterviewer} //before
        setInterviewer={(event) => props.onChange(interviewer.id)} //after
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
};

export default InterviewerList;
