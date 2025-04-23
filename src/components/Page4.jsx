import React, { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true });

export default function ParagraphToStory() {
  const [paragraph, setParagraph] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    if (!paragraph.trim()) return;
    setLoading(true);
    setStory("");
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: `Turn this paragraph into a creative short story: ${paragraph}` }],
        max_tokens: 500,
      });
      setStory(response.choices[0].message.content);
    } catch (error) {
      setStory("Error generating story. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      width: "80%", maxWidth: "600px", background: "white", padding: "20px", borderRadius: "12px", 
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", textAlign: "center", margin: "auto", marginTop: "50px"
    }}>
      <h1 style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }}>📖 AI Story Generator</h1>
      <textarea
        style={{ width: "100%", height: "120px", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", resize: "none", fontSize: "16px" }}
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
        placeholder="Enter a paragraph..."
      ></textarea>
      <button 
        style={{ marginTop: "15px", padding: "10px 15px", fontSize: "18px", backgroundColor: loading ? "#ccc" : "#6200ea", color: "white", border: "none", borderRadius: "6px", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.3s" }}
        onClick={generateStory} 
        disabled={loading}
      >
        {loading ? "Generating..." : "Convert to Story"}
      </button>
      <div style={{ marginTop: "20px", padding: "15px", background: "#eef", borderRadius: "8px", minHeight: "100px", textAlign: "left" }}>
        <h2 style={{ fontSize: "20px", color: "#444" }}>Your Story:</h2>
        <p style={{ fontSize: "16px", color: "#222" }}>{story || "Your generated story will appear here."}</p>
      </div>
    </div>
  );
}