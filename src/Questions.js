import React from "react";

export default function Questions({ currenQue, dispatch, answer }) {
  console.log("answer:",answer);
  const hasAnswered = answer !== null;
  return (
    <div>
      <h4>{currenQue.question}</h4>
      <div className="options">
        {currenQue.options.map((current, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} 
            ${
              hasAnswered ? index === currenQue.correctOption ? "correct" : "wrong" : ""
            }`}
            key={current}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {current}
          </button>
        ))}
      </div>
    </div>
  );
  
}
