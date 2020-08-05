


export function getAppointmentsForDay(state, day) {

  const filteredDays = []
  //loop through the days array and push only matching object to the filtered days array
  Object.keys(state.days).forEach((key, index) => {
    if (state.days[index].name === day) {
      filteredDays.push(state.days[index])
    }
  })
  // if nothing was pushed - no matching day, return empty erray and don't continue
  if (filteredDays.length === 0) return [];


  const matchingAppointments = []


  for (let appointmentId of filteredDays[0].appointments) {
    if (state.appointments[appointmentId]) {
      if (appointmentId === state.appointments[appointmentId].id) {
        matchingAppointments.push(state.appointments[appointmentId])
      }
    }
  }
  return matchingAppointments;
}

// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 8]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   }
// };