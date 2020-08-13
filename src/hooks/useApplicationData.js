import { useState } from "react";
import axios from "axios";
// import getAppointmentsForDay from "helpers/selectors.js";


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


  //BOOK INTERVIEW
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //make a copy of the days
    const days = [...state.days]
    let currentDayIndex = -1;
    for (let day in days) {
      if (days[day].appointments.includes(id)) {
        currentDayIndex = day;
      }
    }

    if (!state.appointments[id].interview) {
      days[currentDayIndex].spots--;
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // request with the interview data in the body
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(response => {
        // update the state after request comes back 
        setState({
          ...state,
          appointments, days
        })
      })
  }
  // CANCEL INTERVIEW     
  function cancelInterview(id) {
    //make a copy of the days
    const days = [...state.days]
    let currentDayIndex = -1;
    for (let day in days) {
      if (days[day].appointments.includes(id)) {
        currentDayIndex = day;
      }
    }

    if (state.appointments[id].interview) {
      days[currentDayIndex].spots++;
    }

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, 'null')
      .then(response => {
        setState({
          ...state,
          days
        })
      })
  }
  // exporting to be used in Application component 
  return { state, setState, setDay, bookInterview, cancelInterview };
}