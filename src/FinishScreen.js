import React from "react";

export default function FinishScreen({points, totalPoints, highscore, dispatch,}) 
{
  const percentage = (points / totalPoints) * 100;

  return (
    <>
        <div className="result">
      <p>
        Your score {points} out of {totalPoints} ({Math.ceil(percentage)}%)
      </p>
      <p>Highscore:{highscore}</p>

    </div>
          <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart Quiz
        </button>
    </>

  );
}
