import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import axios from "axios";
import "components/Application.scss";
import getAppointmentsForDay from "helpers/selectors.js";
import getInterviewersForDay from "helpers/selectors.js";
import getInterview from "helpers/selectors.js";


export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  //function setDay that updates the state with the new day
  const setDay = day => setState({ ...state, day });
  // We don't want to make the Effect request every time the component renders. Instead, we need to remove the dependency. We do that by passing a function to setState.
  const setDays = days => setState(prev => ({ ...prev, days }));;

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
        // console.log(result[0].data, 'result days');
        // console.log(result[1].data, 'result appointments');
        // console.log(result[2].data, 'result interviewers');
      });
  }, [])
  //SELECTOR FUNCTION GET INTERVIEW
  // function getInterview(state, interview) {
  //   // if no interview return null 
  //   if (interview === null) return null;
  //   //create a copy of interview obj 
  //   let updatedInterviewObj = {
  //     student: '',
  //     interviewer: ''

  //   }
  //   // find out the id of the interviewer
  //   updatedInterviewObj = {
  //     student: interview.student,
  //     interviewer: state.interviewers[interview.interviewer],
  //   }

  //   // const specificInterviewerObj = state.interviewers[interviewerId];
  //   //  console.log(specificInterviewerObj, 'specificInterviewerObj', 'interviewer ID is', interviewerId )

  //   // updatedInterviewObj.interviewer = specificInterviewerObj;
  //   return updatedInterviewObj;
  // }


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
    console.log(matchingInterviewers, 'matching interviewers')
    return matchingInterviewers;
  };
  // INTERVIEWERS LIST 
  const interviewers = getInterviewersForDay(state, state.day)

  //BOOK INTERVIEW
  function bookInterview(id, interview) {
    // console.log(id, interview, 'book interview function');
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // console.log('cool state before', appointments)



    // request with the interview data in the body
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      // .then(response => console.log(response))
      .then(response => {
        // console.log('cool state after', appointments)
        // update the state after request comes back 
        setState({
          ...state,
          appointments
        })
      })
      .catch(err => console.log(err))

  }

  function cancelInterview(id) {
    console.log(state.appointments[id], 'CANCEL FUNCTION');
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, 'null')
      .then(response => { console.log(response) })
  }






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

              const interview = getInterview(state, appointment.interview);
              console.log(interview, 'interview inside getAppointmentsForDay APP.JS')

              return (
                // <Appointment id={appointment.id} time={appointment.time} interview={appointment.interview} />

                <Appointment cancelInterview={cancelInterview} bookInterview={bookInterview} key={appointment.id} interview={interview} interviewers={interviewers}{...appointment} id={appointment.id} time={appointment.time} />
              )
            })

        }
      </section>
    </main>
  );
}

