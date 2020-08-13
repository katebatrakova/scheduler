
export default function getAppointmentsForDay(state, day) {
  const filteredDays = []
  Object.keys(state.days).forEach((index) => {
    if (state.days[index].name === day) {
      filteredDays.push(state.days[index])
    }
  })

  if (filteredDays.length === 0) return [];

  const matchingAppointments = filteredDays[0].appointments.map((matchingAppointment) => {
    return state.appointments[matchingAppointment]
  })
  return matchingAppointments;
};


export function getInterview(state, interview) {
  // if no interview return null 
  if (interview === null) return null;
  //create a copy of interview obj 
  let updatedInterviewObj = {
    student: '',
    interviewer: ''

  }
  // find out the id of the interviewer
  updatedInterviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  }
  return updatedInterviewObj;
}


export function getInterviewersForDay(state, day) {
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