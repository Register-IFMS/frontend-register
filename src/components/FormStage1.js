import { useState, useEffect, useMemo } from "react";
import "./FormStage1.css";
import PropTypes from "prop-types";

const FormSection1 = ({
  linguagens,
  loading,
  onSelectedLanguagesChange,
  handleStage1Data,
  data1,
  setModal,
}) => {
  const [selectedLang, setSelectedLang] = useState([]);
  const [titleProgram, setTitleProgram] = useState("");
  const [typeProgram, setTypeProgram] = useState("");
  const [dateProgram, setDateProgram] = useState("");
  const [aplicationProgram, setAplicationProgram] = useState("");
  const [criptoProgram, setCriptoProgram] = useState("");
  const [showOriginal, setShowOriginal] = useState(false);
  const [obraProtegida, setObraProtegida] = useState("");
  const [search, setSearch] = useState("");
  const [langs, setLangs] = useState([]);

  const handleLangClick = (id, name) => {
    if (selectedLang.some((selected) => selected.idLang === id)) {
      const updatedLangs = selectedLang.filter(
        (selected) => selected.idLang !== id
      );
      setSelectedLang(updatedLangs);
    } else {
      setSelectedLang([...selectedLang, { idLang: id, nome: name }]);
    }
  };

  const isFormValid = () => {
    return (
      titleProgram !== "" &&
      typeProgram !== "" &&
      dateProgram !== "" &&
      aplicationProgram !== "" &&
      criptoProgram !== "" &&
      (obraProtegida !== "" || showOriginal === false) &&
      selectedLang.length > 0
    );
  };

  const sendDataStage1 = () => {
    if (isFormValid()) {
      onSelectedLanguagesChange(selectedLang);

      handleStage1Data(
        titleProgram,
        typeProgram,
        dateProgram,
        aplicationProgram,
        criptoProgram,
        showOriginal,
        obraProtegida
      );
    } else {
      setModal(true);
    }
  };

  useEffect(() => {
    if (linguagens) {
      setLangs(linguagens);
    } else {
      console.log("linguagens vazio");
    }
  }, [linguagens, search]);

  useEffect(() => {
    if (data1) {
      setTitleProgram(data1.nomePrograma || "");
      setTypeProgram(data1.tipoPrograma || "");
      setDateProgram(data1.dataPrograma || "");
      setAplicationProgram(data1.campoAplicacao || "");
      setCriptoProgram(data1.criptografia || "");
      setObraProtegida(data1.tituloProgramaOriginal || "");
      setShowOriginal(data1.derivaDeObraProtegida || false);
      setSelectedLang(
        data1.idLinguagem
          ? data1.idLinguagem.map((lang) => ({
              idLang: lang.idLinguagem,
              nome: lang.nomeLinguagem,
            }))
          : []
      );
    }
  }, [data1]);

  const filtroLangSearch = useMemo(() => {
    const searchLower = search.toLowerCase();
    return langs.filter((lang) => {
      const isSelected = selectedLang.some(
        (selected) => selected.idLang === lang.idLinguagem
      );
      return (
        !isSelected && lang.nomeLinguagem.toLowerCase().includes(searchLower)
      );
    });
  }, [search, langs, selectedLang]);

  return (
    <div className="content-stage-1 container-fluid">
      <div className="section1 d-flex align-items-center flex-column flex-xl-row justify-content-between mb-4">
        <div
          className="input-group mb-0 d-flex flex-row justify-content-start align-items-center gap-1"
          id="s1"
        >
          <label htmlFor="nomePrograma" id="label">
            Titulo do Programa:
          </label>
          <input
            type="text"
            id="nomePrograma"
            className="form-control w-100"
            placeholder="Nome do Programa"
            aria-label="Nome do Programa"
            aria-describedby="input-name-program"
            aria-autocomplete="none"
            value={titleProgram}
            onChange={(e) => setTitleProgram(e.target.value)}
            autoComplete="off"
            list="autocompleteOff"
          />
        </div>

        <div
          className="input-group mb-0 d-flex flex-row justify-content-start align-items-center gap-1"
          id="s2"
        >
          <label htmlFor="tipoPrograma" id="label">
            Tipo de Programa:
          </label>
          <input
            type="text"
            id="tipoPrograma"
            className="form-control w-100"
            placeholder="Software..."
            aria-label="Tipo de Programa"
            aria-describedby="input-type-program"
            aria-autocomplete="none"
            autoComplete="off"
            list="autocompleteOff"
            value={typeProgram}
            disabled={!titleProgram}
            onChange={(e) => setTypeProgram(e.target.value)}
          />
        </div>

        <div
          className="input-group mb-0 d-flex flex-row justify-content-start align-items-center gap-1"
          id="s3"
        >
          <label htmlFor="dataPrograma" id="label">
            Data de criação ou Publicação:
          </label>
          <input
            type="date"
            id="dataPrograma"
            className="form-control w-100"
            value={dateProgram}
            disabled={!typeProgram}
            onChange={(e) => setDateProgram(e.target.value)}
            aria-autocomplete="none"
            autoComplete="off"
            list="autocompleteOff"
          />
        </div>

        <div
          className="input-group mb-0 d-flex flex-row justify-content-start align-items-center gap-1"
          id="s4"
        >
          <label htmlFor="camp-aplica" id="label">
            Campo de aplicação:
          </label>
          <input
            type="text"
            className="form-control w-100"
            placeholder="Técnologia, Saúde..."
            aria-label="Campo de Aplicação"
            aria-describedby="input-application-field"
            id="camp-aplica"
            value={aplicationProgram}
            disabled={!dateProgram}
            onChange={(e) => setAplicationProgram(e.target.value)}
            aria-autocomplete="none"
            autoComplete="off"
            list="autocompleteOff"
          />
        </div>
      </div>

      <div className="section2 d-md-flex mb-2 gap-1">
        <span>Criptografia:</span>
        <div className="mb-1 w-100">
          <textarea
            placeholder="Algoritmo ou função HASH para criptografia"
            className="form-control"
            rows="3"
            value={criptoProgram}
            disabled={!aplicationProgram}
            onChange={(e) => setCriptoProgram(e.target.value)}
            style={{ resize: "none" }}
            aria-autocomplete="none"
            autoComplete="off"
            list="autocompleteOff"
          ></textarea>
        </div>
      </div>

      <div className="section3 mb-4">
        <div
          className="d-flex flex-xl-row flex-column me-lg-4 me-4"
          id="box-lang"
        >
          <span className="col-md-6" id="lang-title">
            Linguagens Utilizadas:
          </span>
          <div className="d-flex col-md-12" id="box-languages">
            <div className="col-md-5 card border-none box" id="box">
              <div className="input-group card-header bg-transparent border-none p-1">
                <input
                  type="text"
                  className="form-control shadow-none"
                  id="searchInput"
                  placeholder="Pesquisar"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoComplete="off"
                  list="autocompleteOff"
                  aria-autocomplete="none"
                />
                <span className="input-group-text" id="basic-addon1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                  </svg>
                </span>
              </div>
              <div
                className="card-body text-dark mb-0 p-0 overflow-x-auto"
                id="box-selection"
              >
                {!loading ? (
                  filtroLangSearch.length > 0 &&
                  filtroLangSearch.map((linguagem) => (
                    <button
                      key={linguagem.idLinguagem}
                      className="card-text p-2 d-flex align-items-center gap-1 w-100"
                      style={
                        linguagem.idLinguagem === 1 && linguagem.length > 5
                          ? {
                              borderTop: "0",
                              borderRight:
                                "border-right: 1px solid var(--bs-border-color-translucent)",
                            }
                          : {}
                      }
                      onClick={() =>
                        handleLangClick(
                          linguagem.idLinguagem,
                          linguagem.nomeLinguagem
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="rgba(16, 55, 22, 0.05)"
                        className="bi bi-plus-circle"
                        id="svg-plus"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                          fill="rgba(16, 55, 22, 0.1)"
                        />
                        <path
                          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                          fill="#0E6BA8"
                        />
                      </svg>
                      {linguagem.nomeLinguagem}
                    </button>
                  ))
                ) : (
                  <div className="d-flex mt-5 align-items-center justify-content-center fs-6 gap-2">
                    <span
                      className="spinner-border spinner-border-sm"
                      id="loading"
                      aria-hidden="true"
                      style={{ color: "rgba(0, 138, 23, 1)" }}
                    ></span>
                    <output style={{ color: "rgba(0, 138, 23, 1)" }}>
                      Carregando...
                    </output>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-5 card border-none ms-4 box" id="box">
              <div
                className="card-body text-dark mb-0 p-0 overflow-x-auto"
                id="box-selection"
              >
                {selectedLang.length > 0 &&
                  selectedLang.map((linguagem) => (
                    <button
                      className="card-text p-2 d-flex align-items-center gap-1 w-100"
                      id="box2"
                      name=""
                      key={linguagem.idLang}
                      onClick={() =>
                        handleLangClick(linguagem.idLang, linguagem.nome)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="rgba(16, 55, 22, 0.05)"
                        className="bi bi-dash-circle"
                        id="svg-minus"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                          fill="rgba(16, 55, 22, 0.1)"
                        />
                        <path
                          d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"
                          fill="#ff0000"
                        />
                      </svg>
                      {linguagem.nome}{" "}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section4 row align-items-center mb-4 gap-1">
        <span>Este programa é derivação de outra obra protegida: </span>
        <div className="d-flex align-items-center gap-2" id="nao">
          <input
            type="radio"
            value="nao"
            className="form-check-input mt-0"
            checked={!showOriginal}
            onChange={() => setShowOriginal(false)}
            disabled={!criptoProgram || !selectedLang.length}
          />{" "}
          <label htmlFor="nao">Não</label>
        </div>

        <div
          className="d-flex w-100 align-items-center gap-2"
          id="input-obra-original"
        >
          <input
            type="radio"
            value="sim"
            className="form-check-input mt-0"
            checked={showOriginal}
            onChange={() => setShowOriginal(true)}
            disabled={!criptoProgram && !selectedLang.length}
          />{" "}
          <label htmlFor="sim">Sim:</label>
          <input
            type="text"
            className="form-control"
            placeholder=" Informe o título do programa original ou o número do registro no INPI"
            disabled={!showOriginal || !criptoProgram}
            value={obraProtegida}
            onChange={(e) => setObraProtegida(e.target.value)}
            aria-autocomplete="none"
            autoComplete="off"
            list="autocompleteOff"
          />
        </div>
      </div>

      <div className="section5 mt-3" id="btnStage">
        <button
          type="submit"
          className="btn-stage btn btn-outline-success d-flex align-items-center gap-2 p-2"
          onClick={sendDataStage1}
        >
          {" "}
          Próximo{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

FormSection1.propTypes = {
  linguagens: PropTypes.array.isRequired,
  onSelectedLanguagesChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handleStage1Data: PropTypes.func.isRequired,
  data1: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
};
export default FormSection1;
