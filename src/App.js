import HandButton from './HandButton';
import ResultIcon from './ResultIcon';
import { compareHand, generateRandomHand } from './utils';
import { useState } from 'react';
import resetIc from './assets/ic-reset.svg';
import './App.css';

function getRsult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return '승리';
  if (comparison < 0) return '패배';
  return '무승부';
}

const INITIAL_VALUE = 'paper';

function App() {
  const [hand, setHand] = useState('rock');
  const [otherHand, setOtherHand] = useState('rock');
  const [gameHistory, setGameHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);

  const handleButtonClick = (nextHand) => {
    const nextOtherHand = generateRandomHand();
    const comparison = compareHand(nextHand, nextOtherHand);
    const gameHistoryItem = getRsult(nextHand, nextOtherHand);
    setHand(nextHand);
    setOtherHand(nextOtherHand);
    setGameHistory([...gameHistory, gameHistoryItem]);
    if (comparison > 0) {
      setScore(score + bet);
    }
    if (comparison < 0) {
      setOtherScore(otherScore + bet);
    }
  };

  const handleClearClick = () => {
    setHand(INITIAL_VALUE);
    setOtherHand(INITIAL_VALUE);
    setGameHistory([]);
    setScore(0);
    setOtherScore(0);
    setBet(1);
  };
  const handleBetChange = (e) => {
    let num = Number(e.target.value);
    if (num === 0 || num > 9) {
      alert('1~9까지 숫자를 넣어주세요.');
    }
    num = Math.floor(num);
    setBet(num);
  };

  return (
    <div className="App">
      <h1 className="App-heading">가위바위보</h1>
      <img className="App-reset" src={resetIc} alt="초기화" onClick={handleClearClick} />
      <div className="App-scores">
        <div className="Score">
          <div className="Score-num">{score}</div>
          <div className="Score-name">나</div>
        </div>
        <div className="App-versus">:</div>
        <div className="Score">
          <div className="Score-num">{otherScore}</div>
          <div className="Score-name">상대</div>
        </div>
      </div>
      <div className="Box App-box">
        <div className="Box-inner">
          <div className="App-hands">
            <ResultIcon value={hand} score={score} otherScore={otherScore} />
            <div className="App-versus">VS</div>
            <ResultIcon value={otherHand} score={otherScore} otherScore={score} />
          </div>

          <div className="App-bet">
            <span>배점</span>
            <input type="number" value={bet} min={1} max={9} onChange={handleBetChange}></input>
            <span>배</span>
          </div>
          <div className="App-history">
            <h2>승부기록</h2>
            <p>{gameHistory.join(', ')}</p>
          </div>
        </div>
      </div>
      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
