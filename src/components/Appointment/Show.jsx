import React from "react";
import "components/Appointment/styles.scss";

export default function Show(props) {
  //helper function to display interviewer's name
  function findInterviewerName(interviewers) {
    for (let i = 0; i < interviewers.length; i++) {
      if (interviewers[i].id === props.interviewer) {
        return interviewers[i].name;
      }
    }
  }

  console.log(props, "props of SHOW");
  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">
            {findInterviewerName(props.interviewers)}
          </h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={props.onDelete}
          />
        </section>
      </section>
    </main>
  );
}
