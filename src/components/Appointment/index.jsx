import React from "react"; //a feature that lets us group a list of children without adding extra nodes to the DOM.
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // console.log(props, "APPOINTMENT component props");
  //SAVE function to be passed to the Form component
  //Form should capture the name and interviewer and pass them to props.onSave as arguments
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer,
    };
    console.log("cool interview in save", interview);
    // show the SAVING indicator to handle longer requests
    transition(SAVING);
    props
      .bookInterview(props.id, interview) //to update the state object
      .then(() => transition(SHOW));
  }

  function deleteInterview() {
    transition(CONFIRM);
    transition(DELETING);
    props
      .cancelInterview(props.id) //to update the state object
      .then(() => transition(EMPTY));
  }

  // console.log(props, "Appointment(props)");
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          bookInterview={props.bookInterview}
          onAdd={(event) => {
            transition(CREATE);
          }}
        />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={(event) => {
            transition(EDIT);
          }}
          onDelete={(event) => {
            transition(CONFIRM);
          }}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          onSave={save}
          interview={props.interview}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer}
          onCancel={(event) => back(EMPTY)}
        />
      )}
      {mode === CREATE && (
        <Form
          onSave={save}
          interview={props.interview}
          interviewers={props.interviewers}
          onCancel={(event) => back(EMPTY)}
        />
      )}
      {mode === SAVING && <Status message="Saving ..." />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={(event) => back(EMPTY)}
          onConfirm={deleteInterview}
          message="You sure you want to delete this interview?"
        />
      )}
      {mode === DELETING && <Status message="Deleting ..." />}
    </article>
  );
}

// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png",
// };

// interview={{ student: "Lydia Miller-Jones", interviewer }
