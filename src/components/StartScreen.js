function StartScreen({ numQuestions, dispatch, highScore }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Let's start
      </button>
      <br/>
      <p className="highscore">Highscore: {highScore} points.</p>
    </div>
  );
}

export default StartScreen;
