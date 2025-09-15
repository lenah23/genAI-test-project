import UseGenerateAiImageHooks from "./imageAi.hooks";

const ImageAI = () => {
  const { input, setInput, handleSubmit, loading, imageUrl } =
    UseGenerateAiImageHooks();

    console.log(imageUrl, "imageUrlimageUrl");

  return (
    <div>
      <h1>Ask AI to generate an image for u</h1>
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
    </div>
  );
};

export default ImageAI;
