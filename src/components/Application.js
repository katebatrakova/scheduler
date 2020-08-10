import React, { useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import axios from "axios";
import "components/Application.scss";
import getAppointmentsForDay from "helpers/selectors.js";
import getInterview from "helpers/selectors.js";
import useApplicationData from "hooks/useApplicationData.js";
import PropTypes from "prop-types";



export default function Application(props) {
  //Validating Props
  // Appointment.propTypes = {
  //   spots: PropTypes.number,
  //   key: PropTypes.number,
  //   cancelInterview: PropTypes.func,
  //   bookInterview: PropTypes.func,
  //   interview: PropTypes.object,
  //   interviewers: PropTypes.array,
  //   id: PropTypes.number,
  //   time: PropTypes.string
  // };

  const {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview,
    spotsLeft
  } = useApplicationData();

  // useEffect doesn't depend on state, no dependency needed
  useEffect(() => {
    let urlDays = 'http://localhost:8001/api/days'
    let urlAppointments = 'http://localhost:8001/api/appointments'
    let urlinterviewers = 'http://localhost:8001/api/interviewers'

    const promise1 = axios.get(urlDays)
    const promise2 = axios.get(urlAppointments)
    const promise3 = axios.get(urlinterviewers)

    Promise.all([promise1, promise2, promise3])
      .then(result => {
        setState(prev => ({ days: result[0].data, appointments: result[1].data, interviewers: result[2].data }));
      });
  }, [])

  //retrieving INTERVIEWERS FUNCTION 
  function getInterviewersForDay(state, day) {
    const filteredDays = []
    Object.keys(state.days).forEach((index) => {
      if (state.days[index].name === day) {
        filteredDays.push(state.days[index])
      }
    })

    if (filteredDays.length === 0) return [];

    const matchingInterviewers = filteredDays[0].interviewers.map((matchingInterviewer) => {
      return state.interviewers[matchingInterviewer]
    })
    return matchingInterviewers;
  };
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
                <Appointment spots={spotsLeft} cancelInterview={cancelInterview} bookInterview={bookInterview} key={appointment.id} interview={getInterview(state, appointment.interview)} interviewers={interviewers}{...appointment} id={appointment.id} time={appointment.time} />
              )
            })
        }
        < Appointment key="last" time="5pm" />
      </section >
    </main >
  );
}

