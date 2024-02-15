import  { useState, useEffect } from 'react';
import { format, formatDuration, intervalToDuration, isBefore, add } from 'date-fns';
function Timer() {
  const [countdown, setCountdown] = useState('');
  const [countdownEnded, setCountdownEnded] = useState(false);
  const [endDate, setEndDate] = useState();

  function handleDateChange(event) {
    const chosenDate = new Date(event.target.value);
    const dateEST = add(chosenDate, { hours: 1 });
    localStorage.setItem("endDate", dateEST);
    setEndDate(dateEST);
    setCountdownEnded(false);
  }
  // useEffect hook: Updates the countdown every second and checks if the countdown has ended. If it has, it clears the interval and sets the countdownEnded state to true.
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const duration = intervalToDuration({ start: now, end: endDate });

      if (isBefore(endDate, now)) { 
        setCountdownEnded(true);
        clearInterval(interval);
      } else { 
        setCountdown(`${formatDuration(duration)}`);
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className='countdown-timer-container'>
      <div className='timer'>
        <h2>Countdown Clock</h2>
        <input type="date" min={format(new Date(), "yyyy-MM-dd")} onChange={handleDateChange} />
        {/* {!initialEndDate && <h3>{format(nextDayAndExtraTime, "MMMM do, yyyy")}</h3>}
        {initialEndDate && <h3>{format(endDate, "MMMM do, yyyy")}</h3>} */}
        {!countdownEnded && <h4>{countdown}</h4>}
        {countdownEnded && <h4>Countdown Ended!</h4>}
      </div>
    </div>
  );       
}

export default Timer;