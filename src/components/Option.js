function Option({ question, dispatch, answer }) {
  const hasAnwered = answer !== null;
  
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${answer === i ? "answer" : ""} ${
            hasAnwered
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnwered}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
