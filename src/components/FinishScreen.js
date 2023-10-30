function FinishScreen({ points, maxPoints, dispatch, highScore }) {
  const precent = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(precent)} %)
      </p>
      <p className="highscore">Highscore: {highScore} points.</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
