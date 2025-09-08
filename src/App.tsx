import { useState } from "react";
import "./App.css";
import UploadPDF from "./components/uploadPDF";
import UseUploadPDFHooks from "./components/uploadPDF.hooks";

function App() {
  const { askChatGPT } = UseUploadPDFHooks();
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse(""); // Clear previous response
    const result = await askChatGPT(input); // Call the OpenAI API
    setResponse(result); // Set the AI's response
    setLoading(false);
  };

  return (
    <>
      <UploadPDF />
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Ask AI</h1>
        <textarea
          rows={4}
          cols={50}
          placeholder="Type your question here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ marginBottom: "10px", display: "block", width: "100%" }}
        ></textarea>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ marginBottom: "10px" }}
        >
          {loading ? "Generating..." : "Ask"}
        </button>
        <div>
          <h3>Response:</h3>
          <p>{response || "No response yet."}</p>
        </div>
      </div>
    </>
  );
}

export default App;
