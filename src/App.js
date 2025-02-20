// Import CSS
import "./App.css";

// Import React
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputMask from "react-text-mask";

// Import Images

// Import Hook
import { useFetchLang } from "./components/hooks/useFetchLang";
import { useFetchData } from "./components/hooks/useFetchData";
import { useFetchPdf } from "./components/hooks/useFetchPDF";

// Import Components
import FormStage1 from "./components/FormStage1";
import FormStage2 from "./components/FormStage2";
import FormStage3 from "./components/FormStage3";
import FormStage4 from "./components/FormStage4";
import FormStage5 from "./components/FormStage5";
import FormStage6 from "./components/FormStage6";

// Import CORS/Data
const url = "http://localhost:1000/api/listarlang";
const urlPost = "http://localhost:1000/api/save";

const steps = [
  { id: 1, stage: "Informações Técnicas" },
  { id: 2, stage: "Empresa Parceira" },
  { id: 3, stage: "Dados dos autores" },
  { id: 4, stage: "Finalizar" },
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [modal, setModal] = useState(false);
  const [qtdAutor, setQtdAutor] = useState(0);
  const { data: lang, loading } = useFetchLang(url);
  const [cooperacao, setCooperacao] = useState();
  const [edital, setEdital] = useState();
  const [campus, setCampus] = useState();
  const [isDone, setIsDone] = useState(true);

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [data3Stage1, setData3Stage1] = useState({});
  const [dataAutores, setDataAutores] = useState({});

  const { responseData, loadingPost, postData } = useFetchData(urlPost);
  const { pdf } = useFetchPdf(responseData);

  useEffect(() => {
    if (responseData && dataAutores) {
      console.log(responseData);
      console.log(dataAutores);
    }
  }, [responseData, dataAutores]);

  const moveToNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const moveToPrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const sendData = () => {
    const programData = {
      nomePrograma: data1.nomePrograma,
      dataPrograma: data1.dataPrograma,
      tipoPrograma: data1.tipoPrograma,
      derivaDeObraProtegida: data1.derivaDeObraProtegida,
      tituloProgramaOriginal: data1.tituloProgramaOriginal,
      campoAplicacao: data1.campoAplicacao,
      criptografia: data1.criptografia,
      cooperacao: cooperacao,
      edital: edital,
      campus: campus,
      idLinguagem: selectedLanguages.map((lang) => ({
        idLinguagem: lang.idLinguagem,
        nomeLinguagem: lang.nomeLinguagem,
      })),
      autores: dataAutores,
      instituicao: [
        {
          teveParticipacao: data3Stage1.participacao,
          nomeInstituicao: data3Stage1.nomeInst,
          cnpjInstituicao: data3Stage1.cnpjInst,
          nitInstituicao: data3Stage1.nitInst,
        },
      ],
      empresaParceira: [
        {
          razaoSocial: data2.razaoSocial,
          cnpjParceira: data2.cnpjParceira,
          ruaParceira: data2.ruaParceira,
          numeroParceira: parseInt(data2.numeroParceira),
          bairroParceira: data2.bairroParceira,
          cidadeParceira: data2.cidadeParceira,
          estadoParceira: data2.estadoParceira,
          cepParceira: data2.cepParceira,
          nomeSocio: data2.nomeSocio,
          nacionalidadeSocio: data2.nacionalidadeSocio,
          estadoCivilSocio: data2.estadoCivilSocio,
          rgSocio: data2.rgSocio,
          orgaoExpedidorSocio: data2.orgaoExpedidorSocio,
          cpfSocio: data2.cpfSocio,
          residAtualSocio: data2.residAtualSocio,
        },
      ],
    };

    console.log(programData);

    postData(programData);
  };

  const finalizeForm = () => {
    window.open(URL.createObjectURL(pdf), "_blank");
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(pdf);
    downloadLink.download = `${data1.nomePrograma}.pdf`; // Nome do arquivo a ser baixado
    downloadLink.click();
    setCurrentStep(6);
    setComplete(true);
  };

  const downloadPdf = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(pdf);
    downloadLink.download = `${data1.nomePrograma}.pdf`; // Nome do arquivo a ser baixado
    downloadLink.click();
  };

  // Guarda as linguagens selecionadas em "selectedLanguages"
  const handleSelectedLanguagesChange = (languages) => {
    const selected = languages.map((language) => ({
      idLinguagem: language.idLang,
      nomeLinguagem: language.nome,
    }));
    setSelectedLanguages(selected);

    setData1((prevData1) => ({
      ...prevData1,
      idLinguagem: selected.map((language) => ({
        idLinguagem: language.idLinguagem,
        nomeLinguagem: language.nomeLinguagem,
      })),
    }));
  };

  const handleStage1Data = (
    title,
    type,
    date,
    application,
    cripto,
    showOriginal,
    original
  ) => {
    setData1((prevData1) => ({
      ...prevData1,
      nomePrograma: title,
      tipoPrograma: type,
      dataPrograma: date,
      campoAplicacao: application,
      criptografia: cripto,
      derivaDeObraProtegida: showOriginal,
      tituloProgramaOriginal: showOriginal ? original : "",
    }));

    moveToNext();
  };

  const handleStage2Data = (data2) => {
    setData2({
      razaoSocial: data2.razao,
      cnpjParceira: data2.cnpj,
      ruaParceira: data2.rua,
      numeroParceira: data2.numero,
      bairroParceira: data2.bairro,
      cidadeParceira: data2.cidade,
      estadoParceira: data2.estado,
      cepParceira: data2.cep,
      nomeSocio: data2.nome,
      nacionalidadeSocio: data2.nacionalidade,
      estadoCivilSocio: data2.estadocivil,
      rgSocio: data2.rg,
      cpfSocio: data2.cpf,
      orgaoExpedidorSocio: data2.orgao,
      residAtualSocio: data2.residencia,
    });

    moveToNext();
  };

  const handleStage3Data1 = (data3Stage1) => {
    setData3Stage1(data3Stage1);
  };

  const handleAutoresData = (data) => {
    setDataAutores(data);
  };

  const isData1Valid = () => {
    let valid = true;
    const coop = /^\d{4}\/\d{4}$/;
    const edit = /^\d{3}\/\d{4}$/;
    const input1 = document.querySelector("#input1");
    const input2 = document.querySelector("#input2");
    const input3 = document.querySelector("#input3");

    if (cooperacao === "" || !coop.test(cooperacao) || campus === undefined) {
      input1.classList.add("was-validated");
      valid = false;
    } else {
      input1.classList.remove("was-validated");
    }

    if (edital === "" || !edit.test(edital) || campus === undefined) {
      input2.classList.add("was-validated");
      valid = false;
    } else {
      input2.classList.remove("was-validated");
    }

    if (campus === "" || campus === undefined) {
      input3.classList.add("was-validated");
      valid = false;
    } else {
      input3.classList.remove("was-validated");
    }

    if (valid) {
      setIsDone(false);
    }
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top justify-content-between">
        <button
          className="navbar-brand btn btn-outline-success d-flex align-items-center gap-2"
          // href="#"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-left-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
            />
          </svg>
          Voltar
        </button>

        {currentStep <= 1 && (
          <button
            className="navbar-brand btn btn-outline-success d-flex align-items-center gap-2"
            onClick={() => setIsDone(true)}
          >
            Edital
          </button>
        )}
      </nav>

      <div className="sidebar">
        <div className="row text-center">
          <div className="col-12 progress-container">
            <div className="progress-bar-bg"></div>
          </div>
        </div>
        <ul
          className="flex-lg-column ps-lg-4 gap-lg-4 mb-1 mt-1 row text-center gap-1 justify-content-between"
          style={{ position: "relative" }}
        >
          {steps?.map((step) => (
            <li
              key={step.id}
              id={step.id === 4 ? "finalizar" : undefined}
              className={`col p-0 d-flex flex-lg-row flex-column align-items-center gap-1 ${
                step.id === 1 && "pt-lg-1"
              } ${currentStep === step.id ? "active" : ""} ${
                step.id < currentStep || complete ? "complete" : ""
              }`}
            >
              {step.id === currentStep || step.id < currentStep || complete ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="#f0eff4"
                    stroke="rgba(0, 0, 0, 0.31)"
                    strokeWidth="1"
                  />
                  <circle cx="12" cy="12" r="7.5" fill="#008a17" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="#f0eff4"
                    stroke="rgba(0, 0, 0, 0.31)"
                    strokeWidth="1"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="7"
                    fill="#f0eff4"
                    stroke="#f0eff4"
                  />
                </svg>
              )}
              <span>{step.stage}</span>
            </li>
          ))}
        </ul>
      </div>

      <main className="content">
        {currentStep === 1 && (
          <FormStage1
            linguagens={lang ?? []}
            loading={loading}
            onSelectedLanguagesChange={handleSelectedLanguagesChange}
            nextStage={moveToNext}
            handleStage1Data={handleStage1Data}
            data1={data1 || {}}
            setQtdAutor={setQtdAutor}
            setModal={setModal}
          />
        )}

        {currentStep === 2 && (
          <FormStage2
            previousStage={moveToPrevious}
            handleStage2Data={handleStage2Data}
            nameProgram={data1.nomePrograma || ""}
            data2={data2 || {}}
            setQtdAutor={setQtdAutor}
            setModal={setModal}
            qtdAutor={parseInt(qtdAutor)}
          />
        )}

        {currentStep === 3 && (
          <FormStage3
            nextStage={moveToNext}
            previousStage={moveToPrevious}
            handleStage3Data1={handleStage3Data1}
            data3Stage1={data3Stage1 || {}}
            qtdAutor={parseInt(qtdAutor)}
            setModal={setModal}
          />
        )}

        {currentStep === 4 && (
          <FormStage4
            nextStage={moveToNext}
            previousStage={moveToPrevious}
            data3Stage1={data3Stage1 || {}}
            handleAutoresData={handleAutoresData}
            dadosAutores={dataAutores || {}}
            setModal={setModal}
            sendData={sendData}
          />
        )}

        {currentStep === 5 && (
          <FormStage5
            previousStage={moveToPrevious}
            finalizeForm={finalizeForm}
            loadingPost={loadingPost}
            sendData={sendData}
          />
        )}

        {currentStep === 6 && <FormStage6 downloadPdf={downloadPdf} />}
      </main>

      {modal && (
        <Modal
          show={modal}
          onHide={() => setModal(false)}
          className="emergente-modal"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Aviso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Por favor, preencha todos os campos corretamente.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setModal(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {isDone && (
        <Modal show={isDone} onHide={() => setIsDone(false)} centered>
          <Modal.Header>
            <Modal.Title>Primeiros passos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="" className="needs-validation">
              <div
                className="input-group mb-3 justify-content-start align-items-center gap-1"
                id="input1"
              >
                <label htmlFor="acordoCooperacao" id="label">
                  Acordo de Cooperação Técnica:
                </label>
                <InputMask
                  mask={[/\d/, /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                  type="text"
                  id="cooperacao"
                  value={cooperacao}
                  className="form-control w-100"
                  placeholder="XXXX/2024"
                  aria-label="Cooperação Técnica"
                  aria-describedby="basic-addon2"
                  aria-autocomplete="none"
                  autoComplete="off"
                  list="autocompleteOff"
                  onChange={(e) => setCooperacao(e.target.value)}
                  required
                />
                <div className="invalid-feedback">Preencha este campo</div>
              </div>

              <div
                className="input-group mb-3 justify-content-start align-items-center gap-1"
                id="input2"
              >
                <label htmlFor="edital" id="label">
                  Edital:
                </label>
                <InputMask
                  mask={[/\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                  type="text"
                  id="edital"
                  value={edital}
                  className="form-control w-100"
                  placeholder="XXX/XXXX"
                  aria-label="Edital"
                  aria-describedby="basic-addon2"
                  aria-autocomplete="none"
                  autoComplete="off"
                  list="autocompleteOff"
                  onChange={(e) => setEdital(e.target.value)}
                  required
                />
                <div className="invalid-feedback">Preencha este campo</div>
              </div>

              <div
                className="input-group mb-3 justify-content-start align-items-center gap-1"
                id="input3"
              >
                <label htmlFor="acordoCooperacao" id="label">
                  Campus:
                </label>
                <div className="input-group">
                  <select
                    className="form-select fs-6"
                    id="inputGroupSelect03"
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    required
                  >
                    <option value="">Escolha...</option>
                    <option value="Três Lagoas">Três Lagoas</option>
                    <option value="Dourados">Dourados</option>
                    <option value="Aquidauana">Aquidauana</option>
                    <option value="Campo Grande">Campo Grande</option>
                  </select>
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect03"
                  >
                    Opções
                  </label>
                  <div className="invalid-feedback">Escolha um campus</div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-stage btn btn-outline-success d-flex align-items-center gap-2 p-2"
              onClick={isData1Valid}
            >
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default App;
