import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import axios from "axios";
import type { IPersonInfo } from "../types";

const UseUploadPDFHooks = () => {
  const [pdfContent, setPdfContent] = useState(null);
  const [error, setError] = useState("");
  const [response, setResponse] = useState<IPersonInfo | undefined>(undefined);
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

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          contents: [
            {
              parts: [
                {
                  text: `Using this information, please give me an object with the following keys and the appropriate values from the information provided. Your response will not contain any odd symbols, so I can parse it to an object. Keys: name, surname, address, email and phone-number. If any information is missing, please use "Not available" as the value. Here is the information: ${extractedContent?.[0]?.content}`,
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

      setResponse(
        JSON.parse(response.data.candidates[0].content.parts[0].text)
      );
    } catch (err) {
      console.error("Error parsing PDF:", err);
      setError("Failed to parse the PDF file.");
      setPdfContent(null);
    } finally {
    }
  };

  return {
    handleFileChange,
    error,
    pdfContent,
    response,
  };
};

export default UseUploadPDFHooks;
