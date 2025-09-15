import { useState } from "react";
import OpenAI from "openai";

const UseGenerateAiImageHooks = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>();

  const GEMENIapiKey = import.meta.env.VITE_CHATGPT_API_KEY;

  const openai = new OpenAI({
    apiKey: GEMENIapiKey,
    dangerouslyAllowBrowser: true,
  });

  const generateImage = async (value: any) => {
    if (!value.trim()) return;
    try {
      const res = await openai.images.generate({
        prompt: value,
        n: 1,
        size: "512x512",
      });
      setImageUrl(res.data?.[0].url);
    } catch (err) {
      console.error("Failed to generate image:", err);
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse(""); // Clear previous response
    const result = await generateImage(input); // Call the OpenAI API
    setResponse(result); // Set the AI's response
    setLoading(false);
  };

  return {
    generateImage,
    handleSubmit,
    input,
    setInput,
    response,
    loading,
    imageUrl,
  };
};

export default UseGenerateAiImageHooks;
