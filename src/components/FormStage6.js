import React from "react";
import PropTypes from "prop-types";

const FormStage6 = ({ downloadPdf }) => {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center flex-column align-items-center">
        <h2>Aqui está o documento</h2>
        <button
          className="btn-stage btn btn-outline-success d-flex align-items-center gap-2 p-2"
          onClick={downloadPdf}
        >
          {" "}
          Baixar PDF{" "}
        </button>
      </div>
    </div>
  );
};

FormStage6.propTypes = {
  downloadPdf: PropTypes.func.isRequired,
};
export default FormStage6;
