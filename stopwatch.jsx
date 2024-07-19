import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning, elapsedTime]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime; // Reset start time when starting
  }

  function stop() {
    setIsRunning(false);
    clearInterval(intervalIdRef.current); // Clear the interval
    startTimeRef.current = Date.now() - elapsedTime; // Update start time to current elapsed time
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
    startTimeRef.current = Date.now(); // Reset start time
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="stopwatch">
      <div className="display">
        {formatTime()}
        <div className="controls">
          <button onClick={start} className="start-button">
            Start
          </button>
          <button onClick={stop} className="stop-button">
            Stop
          </button>
          <button onClick={reset} className="reset-button">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
