


export default function getAppointmentsForDay(state, day) {

  const filteredDays = []

  // find the object in our state.days array who's name matches the provided day
  Object.keys(state.days).forEach((index) => {
    if (state.days[index].name === day) {
      filteredDays.push(state.days[index])
    }
  })
  // if nothing was pushed - no matching day, return empty erray and don't continue
  if (filteredDays.length === 0) return [];

  // else continue to iterate over appointments for the specific day
  const matchingAppointments = []

  for (let appointmentId of filteredDays[0].appointments) {
    // comparewhere it's id matches the id of states.appointments and return that value
    if (state.appointments[appointmentId]) {
      if (appointmentId === state.appointments[appointmentId].id) {
        matchingAppointments.push(state.appointments[appointmentId])
      }
    }
  }
  return matchingAppointments;
}


export function getInterview(state, interview) {
  // if no interview return null 
  if (interview === null) return null;
  //create a copy of interview obj 
  let updatedInterviewObj = { ...interview }
  // find out the id of the interviewer
  const interviewerId = updatedInterviewObj.interviewer;

  const specificInterviewerObj = state.interviewers[interviewerId];
  //  console.log(specificInterviewerObj, 'specificInterviewerObj', 'interviewer ID is', interviewerId )

  updatedInterviewObj.interviewer = specificInterviewerObj;

  return updatedInterviewObj;
}




export function getInterviewersForDay(state, day) {

  const filteredDays = []

  // find the object in our state.days array who's name matches the provided day
  Object.keys(state.days).forEach((index) => {
    if (state.days[index].name === day) {
      filteredDays.push(state.days[index])
    }
  })

  // if nothing was pushed - no matching day, return empty erray and don't continue
  if (filteredDays.length === 0) return [];

  // else continue to iterate over appointments for the specific day
  const matchingInterviewers = []

  for (let interviewerId of filteredDays[0].interviewers) {
    // comparewhere it's id matches the id of states.appointments and return that value
    if (state.interviewers[interviewerId]) {
      if (interviewerId === state.interviewers[interviewerId].id) {
        matchingInterviewers.push(state.interviewers[interviewerId])
      }
    }
  }
  console.log(matchingInterviewers, 'matchingInterviewers in getInterviewersForDay selector')

  return matchingInterviewers;
}