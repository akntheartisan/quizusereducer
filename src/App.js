import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NxtButton from "./NxtButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const intialstate = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "Ready" };
    case "error":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active",secondsRemaining:state.questions.length * 30 };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...intialstate,
        questions: state.questions,
        status: "Ready",
      };

    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("something wrong");
  }
}
function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, intialstate);

  const numQuestion = questions.length;
  const totalPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    try {
      async function fetchData() {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      }

      fetchData();
    } catch (error) {
      dispatch({ type: error });
    }
  }, []);
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "Ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestion={numQuestion}
              index={index + 1}
              points={points}
              totalPoints={totalPoints}
            />
            <Questions
              currenQue={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NxtButton
                dispatch={dispatch}
                answer={answer}
                numQuestion={numQuestion}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
