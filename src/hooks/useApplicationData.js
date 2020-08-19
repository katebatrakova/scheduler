import { useState, useEffect } from "react";
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



  // useEffect doesn't depend on state, no dependency needed
  useEffect(() => {
    let urlDays = '/api/days'
    let urlAppointments = '/api/appointments'
    let urlinterviewers = '/api/interviewers'



    const promise1 = axios.get(urlDays)
    const promise2 = axios.get(urlAppointments)
    const promise3 = axios.get(urlinterviewers)

    Promise.all([promise1, promise2, promise3])
      .then(result => {
        setState(prev => ({ ...prev, days: result[0].data, appointments: result[1].data, interviewers: result[2].data }));
      });
  }, [])


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
    return axios.put(`/api/appointments/${id}`, appointment)
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
    // //make a copy of the days
    const days = [...state.days]
    //new appointments object with new info about the appointment deleted
    const currentAppointment = { ...state.appointments[id], interview: null }
    const appointments = { ...state.appointments, [id]: currentAppointment }
    let currentDayIndex = -1;

    //finding the id of the day
    for (let day in days) {
      if (days[day].appointments.includes(id)) {
        currentDayIndex = day;
      }
    }

    //increasing the spots for that specific day
    if (state.appointments[id].interview) {
      days[currentDayIndex].spots++;
    }


    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        setState(state => ({
          ...state,
          appointments
        }))
      })
  }
  // exporting to be used in Application component 
  return { state, setState, setDay, bookInterview, cancelInterview };
}