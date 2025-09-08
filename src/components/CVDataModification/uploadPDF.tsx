import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker?url";
import UseUploadPDFHooks from "./uploadPDF.hooks";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const UploadPDF = () => {
  const { handleFileChange, error, response } = UseUploadPDFHooks();

  return (
    <div style={{ margin: "20px" }}>
      <h1>Upload and Parse PDF</h1>

      <input type="file" accept="application/pdf" onChange={handleFileChange} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <div>
          <h3>Response:</h3>
          {response && (
            <div>{`Hello dear ${response.name} ${response.surname}. We are ready to give an interview change to thos, whose location is ${response.address}. To get in touch with you, we will call you on ${response["phone-number"]} or email to ${response.email}. Thanks for your CV.  `}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPDF;
