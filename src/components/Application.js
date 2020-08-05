import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import axios from "axios";
import "components/Application.scss";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Archie Cohen",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Maria Boucher",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }

];


export default function Application(props) {

  const [day, setDay] = useState("Monday")
  const [days, setDays] = useState([])

  useEffect(() => {
    console.log('Effect is happening')
    axios({
      method: 'GET',
      url: 'http://localhost:8001/api/days'
    })
      .then(result => {
        setDays(result.data)
      })
  }, [])

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
          {/* imported DayList component acceprs 3 props:array,selected day, function.Same as in StoryBook */}
          <DayList
            days={days}
            day={day}
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
          appointments.map((appointment) => {
            return (
              // <Appointment id={appointment.id} time={appointment.time} interview={appointment.interview} />
              <Appointment key={appointment.id} {...appointment} />
            )
          })
        }
      </section>
    </main>
  );
}

