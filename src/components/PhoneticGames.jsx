import React, { useState, useEffect } from "react";

const generateOptions = (correctNumber) => {
  let options = new Set([correctNumber]);
  while (options.size < 4) {
    options.add(Math.floor(Math.random() * 20) + 1);
  }
  return [...options].sort(() => Math.random() - 0.5);
};

const speakNumber = (number) => {
  const msg = new SpeechSynthesisUtterance(number);
  msg.lang = "en-US";
  window.speechSynthesis.speak(msg);
};

export default function PhoneticGames() {
  const [correctNumber, setCorrectNumber] = useState(1);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    generateNewNumber();
  }, []);

  const generateNewNumber = () => {
    const newNumber = Math.floor(Math.random() * 20) + 1;
    setCorrectNumber(newNumber);
    setOptions(generateOptions(newNumber));
    setFeedback("");
  };

  const checkAnswer = (num) => {
    if (num === correctNumber) {
      setFeedback("✅ Correct!");
      setScore(score + 10);
      setStreak(streak + 1);
    } else {
      setFeedback("❌ Try Again!");
      setStreak(0);
    }
    setTimeout(generateNewNumber, 1000);
  };

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#07192f"
    }}>
      <div style={{
        width: "90%", maxWidth: "400px", background: "#fff", padding: "20px", borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", textAlign: "center"
      }}>
        <h1 style={{ color: "#333", fontSize: "35px", marginBottom: "10px" }}>🔢 Number Game</h1>
        <p style={{ color: "#666", fontSize: "20px" }}>Listen and choose the correct number</p>
        <br></br>
        <div style={{ display: "flex", justifyContent:"space-evenly", marginBottom: "15px", fontSize: "25px" }}>
          <p>⭐Score: <span style={{ color: "#007bff" }}>{score}</span></p>
          <p>🔥Streak: <span style={{ color: "#28a745" }}>{streak}</span></p>
        </div>

        <button 
          style={{ 
            padding: "12px 15px", fontSize: "18px", backgroundColor: "#007bff", color: "white",
            border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold",
            transition: "background 0.2s" 
          }}
          onClick={() => speakNumber(correctNumber)}
        >
          🔊 Play Sound
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginTop: "15px" }}>
          {options.map((num) => (
            <button 
              key={num} 
              style={{ 
                padding: "12px", fontSize: "18px", fontWeight: "bold", borderRadius: "6px",
                border: "1px solid #ccc", cursor: "pointer", backgroundColor: "#f8f9fa", color: "#333",
                transition: "background 0.2s, transform 0.2s"
              }}
              onClick={() => checkAnswer(num)}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1.0)"}
            >
              {num}
            </button>
          ))}
        </div>

        <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "10px", color: feedback.includes('✅') ? "#28a745" : "#dc3545" }}>{feedback}</p>

        <button 
          style={{ 
            marginTop: "15px", padding: "12px 15px", fontSize: "18px", backgroundColor: "#28a745", color: "white",
            border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold",
            transition: "background 0.2s" 
          }}
          onClick={generateNewNumber}
        >
          🔄 Shuffle
        </button>
      </div>
    </div>
  );
}