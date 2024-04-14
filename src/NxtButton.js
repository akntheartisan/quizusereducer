import React from "react";

export default function NxtButton({ dispatch, answer, index, numQuestion }) {
    console.log(index,numQuestion);
  if (answer === null) return null;
  if (index < numQuestion - 1)
   return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      </div>
    );
  if (index === numQuestion - 1)
   return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      </div>
    );
}
