import { useState } from 'react';


//When the Appointment component loads, we want it to be empty, so we need to initialize the mode to EMPTY.
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace === true) {
      setMode(mode)
    }

    if (replace === false) {
      setMode(mode);
      setHistory([...history, mode]);
    }

  }

  const back = () => {
    if (history.length > 1) {
      const slicedHistory = history.slice(0, history.length - 1);
      setMode(slicedHistory[slicedHistory.length - 1])
      setHistory(slicedHistory)
    }
  }
  return { mode: mode, transition: transition, back: back };
}

