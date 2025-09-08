import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import axios from "axios";

const UseUploadPDFHooks = () => {
  const [pdfContent, setPdfContent] = useState(null);
  const [error, setError] = useState("");
  const GEMENIapiKey = import.meta.env.VITE_OPENAI_GEMENI_API_KEY;


  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];

    if (!file) {
      setError("No file selected.");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      setPdfContent(null);
      return;
    }

    setError("");

    try {
      const arrayBuffer = await file.arrayBuffer();

      const pdfDoc = await pdfjsLib.getDocument(arrayBuffer).promise;

      let extractedContent: any = [];

      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const textContent = await page.getTextContent();

        const pageText = textContent.items
          .map((item) => {
            if ("str" in item) {
              return (item as { str: string }).str;
            }
            return "";
          })
          .join(" ");

        extractedContent.push({
          page: pageNum,
          content: pageText,
        });
      }

      setPdfContent(extractedContent);
    } catch (err) {
      console.error("Error parsing PDF:", err);
      setError("Failed to parse the PDF file.");
      setPdfContent(null);
    }
  };

  const askChatGPT = async (prompt: any) => {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMENIapiKey,
        },
      }
    );

    // Return the response (adjust structure based on API response format)
    return (
      response.data.candidates[0].content.parts[0].text ||
      "No response generated."
    );
  } catch (error: any) {
    // Handle errors properly
    console.error("Error calling Dial-E API:", error.response || error);
    return "Sorry, I couldn’t generate a response.";
  }
};

  return {
    handleFileChange,
    error,
    pdfContent,
    askChatGPT,
  };
};

export default UseUploadPDFHooks;
