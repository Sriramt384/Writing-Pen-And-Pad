import React, { useState, useEffect } from 'react';

const generateNumbersAndTarget = () => {
  let numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 9) + 1);
  let target = numbers.reduce((acc, num) => acc + num, 0); // Ensure sum is attainable
  return { numbers, target };
};

const speak = (text) => {
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 1.2;
  window.speechSynthesis.speak(speech);
};

const NewPage = () => {
  const [numbers, setNumbers] = useState([]);
  const [target, setTarget] = useState(0);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    startNewGame();
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedNumbers.length === 2 && operation) {
      calculateResult();
    }
  }, [selectedNumbers, operation]);

  const startNewGame = () => {
    const { numbers, target } = generateNumbersAndTarget();
    setNumbers(numbers);
    setTarget(target);
    setSelectedNumbers([]);
    setOperation(null);
    setMessage('');
    setScore(0);
    setTimeLeft(60);
  };

  const handleNumberClick = (num, index) => {
    if (selectedNumbers.length < 2) {
      setSelectedNumbers([...selectedNumbers, { num, index }]);
      speak(num);
    }
  };

  const handleOperationClick = (op) => {
    setOperation(op);
    speak(op === '+' ? 'plus' : op === '-' ? 'minus' : op === '*' ? 'times' : 'divided by');
  };

  const calculateResult = () => {
    if (selectedNumbers.length !== 2 || !operation) return;
    const [first, second] = selectedNumbers.map((item) => item.num);
    let result;
    switch (operation) {
      case '+': result = first + second; break;
      case '-': result = first - second; break;
      case '*': result = first * second; break;
      case '/': result = first / second; break;
      default: return;
    }
    speak(`Result is ${result}`);

    const updatedNumbers = [...numbers];
    updatedNumbers[selectedNumbers[0].index] = result;
    updatedNumbers.splice(selectedNumbers[1].index, 1);

    setNumbers(updatedNumbers);
    setSelectedNumbers([]);
    setOperation(null);
    setScore((prev) => prev + 10);

    if (result === target) {
      setMessage('🎉 You Win!');
      speak('Congratulations! You reached the target!');
    } else if (updatedNumbers.length === 1) {
      setMessage('❌ Game Over!');
      speak('Game Over! You did not reach the target.');
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Poppins', sans-serif",
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '90%',
        color: '#fff'
      }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '10px' }}>Number Clash</h1>
        <p style={{ fontSize: '1.3em', fontWeight: '600' }}>🎯 Target: {target}</p>
        <p style={{ fontSize: '1.3em', fontWeight: '600', color: '#ffdd57' }}>🏆 Score: {score}</p>
        <p style={{ fontSize: '1.3em', fontWeight: '600', color: '#ff4757' }}>⏳ Time Left: {timeLeft}s</p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginTop: '20px'
      }}>
        {numbers.map((num, index) => (
          <button key={index} onClick={() => handleNumberClick(num, index)}
            style={{
              fontSize: '1.8em',
              padding: '15px',
              backgroundColor: '#34c759',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '70px',
              height: '70px',
              cursor: 'pointer',
              transition: '0.3s ease',
              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#28a745'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#34c759'}
          >
            {num}
          </button>
        ))}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginTop: '20px'
      }}>
        {['+', '-', '*', '/'].map((op) => (
          <button key={op} onClick={() => handleOperationClick(op)}
            style={{
              fontSize: '2em',
              padding: '10px 20px',
              backgroundColor: '#ff6b81',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: '0.3s ease',
              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#ff4757'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b81'}
          >
            {op}
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p style={{ fontSize: '1.5em', color: '#fff' }}>{message}</p>
        <button onClick={startNewGame}
          style={{
            fontSize: '1.2em',
            padding: '10px 20px',
            backgroundColor: '#2ed573',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: '0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1e9e49'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2ed573'}
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default NewPage;
