import { useState, useEffect } from "react";
import axios from "axios";
import getAppointmentsForDay from "helpers/selectors.js";


//When the Appointment component loads, we want it to be empty, so we need to initialize the mode to EMPTY.
export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));


  // useEffect doesn't depend on state, no dependency needed

  const allAppointments = getAppointmentsForDay(state, state.day);

  const appointmentsBooked = (allAppointments) => {
    let spotsBooked = 0;
    for (let app of allAppointments) {
      if (app.interview) {
        spotsBooked++;
      }
    }
    return spotsBooked;
  }
  const spotsLeft = allAppointments.length - appointmentsBooked(allAppointments)


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
    // request with the interview data in the body
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      // .then(response => console.log(response))
      .then(response => {
        // update the state after request comes back 
        setState({
          ...state,
          appointments
        })
      })
  }
  // CANCEL INTERVIEW     
  function cancelInterview(id) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, 'null')
      .then(response => { console.log(response) })
  }
  // exporting to be used in Application component 
  return { state, setState, setDay, bookInterview, cancelInterview, spotsLeft };
}