import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker?url";
import UseUploadPDFHooks from "./uploadPDF.hooks";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const UploadPDF = () => {
  const { handleFileChange, error, pdfContent } = UseUploadPDFHooks();

  return (
    <div style={{ margin: "20px" }}>
      <h1>Upload and Parse PDF</h1>

      <input type="file" accept="application/pdf" onChange={handleFileChange} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {pdfContent && (
        <div style={{ marginTop: "20px" }}>
          <h2>Extracted JSON Data:</h2>
          <pre
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              maxHeight: "300px",
              overflowY: "scroll",
            }}
          >
            {JSON.stringify(pdfContent, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default UploadPDF;
