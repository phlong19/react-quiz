import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";

const SEC_PER_QUESTION = 15; //seconds for player to think each ques

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  seconds: null,
};

function reducer(state, action) {
  switch (action.type) {
    // data from fake api
    case "dataFetched":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    // game functionalities
    case "startQuiz":
      return {
        ...state,
        status: "active",
        seconds: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      let points =
        action.payload === question.correctOption ? question.points : 0;
      return {
        ...state,
        answer: action.payload,
        points: state.points + points,
      };
    case "nextQuiz":
      return { ...state, answer: null, index: state.index++ };
    case "endQuiz":
      return {
        ...state,
        status: "finish",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        highScore: state.highScore,
        status: "ready",
      };
    // timer
    case "timer":
      return {
        ...state,
        seconds: state.seconds - 1,
        status: state.seconds === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Unknow action");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highScore, seconds },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        if (!res.ok) throw new Error("err");
        const data = await res.json();

        dispatch({ type: "dataFetched", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              points={points}
              numQuestions={numQuestions}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              index={index}
            />
            <Timer seconds={seconds} dispatch={dispatch} />
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            dispatch={dispatch}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
