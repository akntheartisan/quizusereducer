import React, { useEffect } from "react";


export default function Timer({dispatch,secondsRemaining}) {

    const min = Math.floor(secondsRemaining/60);
    const sec = secondsRemaining % 60;
  useEffect(function () {
    const timer = setInterval(() => {
      dispatch({type:'timer'})
    }, 1000);
  
    return ()=>clearInterval(timer);

  }, [dispatch]);
  return <div className="timer">{min}:{sec}</div>;
}
