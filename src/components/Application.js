import React, { useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import axios from "axios";
import "components/Application.scss";
import getAppointmentsForDay from "helpers/selectors.js";
import { getInterviewersForDay } from "helpers/selectors.js";
import getInterview from "helpers/selectors.js";
import useApplicationData from "hooks/useApplicationData.js";



export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    spotsLeft
  } = useApplicationData();

  console.log(state.appointments, 'state.appointments before delete')


  // INTERVIEWERS LIST 
  const interviewers = getInterviewersForDay(state, state.day)

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {/* imported DayList component accepts 3 props:array,selected day, function.Same as in StoryBook */}
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {
          getAppointmentsForDay(state, state.day) //after
            .map((appointment) => {
              return (
                < Appointment spots={spotsLeft} cancelInterview={cancelInterview} bookInterview={bookInterview} key={appointment.id} interview={getInterview(state, appointment.interview)} interviewers={interviewers}{...appointment} id={appointment.id} time={appointment.time} />
              )
            })
        }
        < Appointment key="last" time="5pm" />
      </section >
    </main >
  );
}

