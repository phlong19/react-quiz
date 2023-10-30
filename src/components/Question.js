import Option from "./Option";

function Question({ question, dispatch, answer, index }) {
  const type = index === 14 ? "endQuiz" : "nextQuiz";
  return (
    <div>
      <h4>{question.question}</h4>
      <Option question={question} dispatch={dispatch} answer={answer} />
      {answer !== null && (
        <button className="btn btn-ui" onClick={() => dispatch({ type: type })}>
          {type === "endQuiz" ? "Finish" : "Next"}
        </button>
      )}
    </div>
  );
}

export default Question;
