import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

const InterviewerList = (props) => {
  //Validating Props
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  };

  const { interviewers } = props;
  const parsedInterviewers = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={(event) => props.onChange(interviewer.id)}
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
