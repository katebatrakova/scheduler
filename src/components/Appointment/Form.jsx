import React, { useState } from "react";
import "components/Appointment/styles.scss";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  //1st - currently stored value, 2nd- function to set a new value
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // to track the error state when the input is invalid
  const [error, setError] = useState("");

  const reset = () => {
    setInterviewer(null);
    setName("");
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  //show an error message when name input is empty
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError(null);
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={(event) => cancel()}>
            Cancel
          </Button>
          <Button confirm onClick={(event) => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
