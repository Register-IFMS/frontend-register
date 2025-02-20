import { useEffect, useState } from "react";
import "./FormStage2.css";
import InputMask from "react-text-mask";
import { useFetchCEP } from "./hooks/useFetchCEP";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal2 from "react-bootstrap/Modal";

const Stage2 = ({
  previousStage,
  handleStage2Data,
  nameProgram,
  data2,
  setQtdAutor,
  setModal,
  qtdAutor,
}) => {
  const [razao, setRazao] = useState("");
  const [cnpj, setCnpj] = useState("");

  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");

  const [nomeSocio, setNomeSocio] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [orgaoExpedidor, setOrgaoExpedidor] = useState("");
  const [residenciaAtual, setResidenciaAtual] = useState("");

  const [modalAutores, setModalAutores] = useState(false);
  const { data: local } = useFetchCEP(cep.replace(/\D/g, ""));
  const [quantidadeAutor, setQuantidadeAutor] = useState(null);

  const isFormValid = () => {
    return (
      cep !== "" &&
      cnpj !== "" &&
      rua !== "" &&
      cidade !== "" &&
      estado !== "" &&
      nomeSocio !== "" &&
      nacionalidade !== "" &&
      estadoCivil !== "" &&
      rg !== "" &&
      cpf !== "" &&
      orgaoExpedidor !== "" &&
      residenciaAtual !== ""
    );
  };

  const sendDataStage2 = () => {
    if (isFormValid()) {
      const dataToSend = {
        razao: razao,
        cnpj: cnpj,
        rua: rua,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        cep: cep,
        nome: nomeSocio,
        nacionalidade: nacionalidade,
        estadocivil: estadoCivil,
        rg: rg,
        cpf: cpf,
        orgao: orgaoExpedidor,
        residencia: residenciaAtual,
      };
      handleStage2Data(dataToSend);
      setQtdAutor(quantidadeAutor);
    } else {
      setModal(true);
    }
  };

  useEffect(() => {
    if (data2) {
      const setters = {
        setRazao,
        setCnpj,
        setRua,
        setNumero,
        setBairro,
        setCep,
        setCidade,
        setCpf,
        setNomeSocio,
        setEstadoCivil,
        setEstado,
        setNacionalidade,
        setOrgaoExpedidor,
        setResidenciaAtual,
        setRg,
      };

      const keys = {
        setRazao: "razaoSocial",
        setCnpj: "cnpjParceira",
        setRua: "ruaParceira",
        setNumero: "numeroParceira",
        setBairro: "bairroParceira",
        setCep: "cepParceira",
        setCidade: "cidadeParceira",
        setCpf: "cpfSocio",
        setNomeSocio: "nomeSocio",
        setEstadoCivil: "estadoCivilSocio",
        setEstado: "estadoParceira",
        setNacionalidade: "nacionalidadeSocio",
        setOrgaoExpedidor: "orgaoExpedidorSocio",
        setResidenciaAtual: "residAtualSocio",
        setRg: "rgSocio",
      };

      Object.entries(setters).forEach(([setterName, setterFunc]) => {
        setterFunc(data2[keys[setterName]] || "");
      });

      if (qtdAutor) {
        setQuantidadeAutor(qtdAutor);
      }
    }
  }, [data2, qtdAutor]);

  useEffect(() => {
    if (local && !local.erro) {
      setCidade(local.localidade);
      setEstado(local.uf);
      setRua(local.logradouro);
      setBairro(local.bairro);
    }
  }, [local]);

  useEffect(() => {
    if (cep === "") {
      setCidade("");
      setEstado("");
      setRua("");
      setBairro("");
    }
  }, [cep]);

  return (
    <div className="content-stage-2 container-fluid">
      <div className="section1-2 row gap-3">
        <div
          className="input-group col mb-0 d-flex flex-row justify-content-start align-items-center gap-2 gap-lg-1"
          id="s1"
        >
          <label htmlFor="nomeEmpresa" id="label">
            Razão Social:
          </label>
          <input
            type="text"
            id="nomeEmpresa"
            className="form-control w-100"
            placeholder="Nome da Empresa"
            aria-label="Razão Social"
            aria-describedby="basic-addon2"
            aria-autocomplete="none"
            autoComplete="off"
            list="autocompleteOff"
            value={razao}
            onChange={(e) => setRazao(e.target.value)}
          />
        </div>

        <div
          className="input-group col mb-0 d-flex flex-row justify-content-start align-items-center gap-2 gap-lg-1"
          id="s1"
        >
          <label htmlFor="cnpj" id="label">
            CNPJ da Empresa:
          </label>
          <InputMask
            mask={[
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              "/",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
            ]}
            type="text"
            id="cnpj"
            className="form-control w-100"
            placeholder="12.345.678/0001-90"
            aria-label="CNPJ"
            aria-describedby="basic-addon2"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            aria-autocomplete="none"
            autoComplete="off"
            list="autocompleteOff"
          />
          <div className="form-text text-danger" id="basic-addon4-1">
            Digite apenas números*
          </div>
        </div>

        <div
          className="input-group col mb-0 d-flex flex-row justify-content-start align-items-center gap-2 gap-lg-1 mt-2 mt-lg-0"
          id="s1"
        >
          <label htmlFor="rua" id="label">
            Rua:
          </label>
          <input
            type="text"
            id="rua"
            value={rua}
            className="form-control w-100"
            placeholder="Rua fulano de tal..."
            aria-label="Rua"
            aria-describedby="basic-addon2"
            aria-autocomplete="none"
            autoComplete="off"
            list="autocompleteOff"
            onChange={(e) => setRua(e.target.value)}
          />
        </div>

        <div className="row mt-2 m-0 p-0" id="section1-row">
          <div
            className="input-group col mb-0 d-flex flex-row justify-content-start align-items-center gap-2 gap-lg-1"
            id="s1"
          >
            <label htmlFor="numeroEmpresa" id="label">
              Número:
            </label>
            <input
              type="number"
              id="numeroEmpresa"
              value={numero}
              className="form-control w-100"
              placeholder="1234..."
              aria-label="Numero do local"
              aria-describedby="basic-addon2"
              aria-autocomplete="none"
              autoComplete="off"
              list="autocompleteOff"
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>

          <div
            className="input-group col mb-0 d-flex flex-row justify-content-start align-items-center gap-2 gap-lg-1"
            id="s1"
          >
            <label htmlFor="bairroEmpresa" id="label">
              Bairro:
            </label>
            <input
              type="text"
              id="bairroEmpresa"
              value={bairro}
              className="form-control w-100"
              placeholder="Santa Rita..."
              aria-label="Bairro"
              aria-describedby="basic-addon2"
              aria-autocomplete="none"
              autoComplete="off"
              list="autocompleteOff"
              onChange={(e) => setBairro(e.target.value)}
            />
          </div>

          <div
            className="input-group col mb-0 d-flex flex-row justify-content-start align-items-center gap-2 gap-lg-1"
            id="s1"
          >
            <label htmlFor="cidade" id="label">
              Cidade:
            </label>
            <input
              type="text"
              id="cidade"
              value={cidade}
              className="form-control w-100"
              placeholder="Cidade..."
              aria-label="Cidade"
              aria-describedby="basic-addon2"
              aria-autocomplete="none"
              autoComplete="off"
              list="autocompleteOff"
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>

          <div
            className="input-group col mb-0 d-flex flex-row justify-content-start align-items-center gap-2 gap-lg-1"
            id="s1"
          >
            <label htmlFor="estado" id="label">
              Estado:
            </label>
            <input
              type="text"
              id="estado"
              className="form-control w-100"
              placeholder="Estado..."
              aria-label="Estado"
              aria-describedby="basic-addon2"
              aria-autocomplete="none"
              autoComplete="off"
              list="autocompleteOff"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />
          </div>

          <div
            className="input-group col mb-0 d-flex flex-row justify-content-start align-items-center gap-2 gap-lg-1"
            id="s1"
          >
            <label htmlFor="cep" id="label">
              CEP:
            </label>
            <InputMask
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
              type="text"
              id="cep"
              value={cep}
              className="form-control w-100"
              placeholder="12345-678"
              aria-label="Estado"
              aria-describedby="basic-addon2"
              aria-autocomplete="none"
              autoComplete="off"
              list="autocompleteOff"
              onChange={(e) => setCep(e.target.value)}
            />
            <div className="form-text text-danger" id="basic-addon4-2">
              Digite apenas números*
            </div>
          </div>
        </div>
      </div>

      <div className="section2-2 mt-4">
        <p className="text-center fs-4">Sócio administrador</p>

        <div className="row gap-3" id="row1">
          <div
            className="input-group col mb-0 d-flex flex-row justify-content-start align-items-center gap-2 gap-lg-1"
            id="s2"
          >
            <label htmlFor="nomeSocio" id="label">
              Nome:
            </label>
            <input
              type="text"
              id="nomeSocio"
              value={nomeSocio}
              className="form-control w-100"
              placeholder="Nome..."
              aria-label="Nome do Sócio"
              aria-describedby="basic-addon2"
              aria-autocomplete="none"
              autoComplete="off"
              list="autocompleteOff"
              onChange={(e) => setNomeSocio(e.target.value)}
            />
          </div>

          <div
            className="input-group col mb-0 d-flex flex-row justify-content-start align-items-center gap-2 gap-lg-1"
            id="s2"
          >
            <label htmlFor="nacionalidade" id="label">
              Nacionalidade:
            </label>
            <input
              type="text"
              id="nacionalidade"
              className="form-control w-100"
              placeholder="Brasileiro..."
              aria-label="Nacionalidaed"
              aria-describedby="basic-addon2"
              aria-autocomplete="none"
              autoComplete="off"
              list="autocompleteOff"
              value={nacionalidade}
              onChange={(e) => setNacionalidade(e.target.value)}
            />
          </div>

          <div
            className="input-group col mb-0 d-flex flex-row justify-content-start align-items-center gap-2 gap-lg-1"
            id="s2"
          >
            <label htmlFor="estadoCivil" id="label">
              Estado Cívil:
            </label>
            <div className="input-group">
              <select
                className="form-select fs-6"
                id="inputGroupSelect02"
                value={estadoCivil}
                onChange={(e) => setEstadoCivil(e.target.value)}
              >
                <option value="" disabled>
                  Escolha...
                </option>
                <option value="Solteiro (a)">Solteiro</option>
                <option value="Casado (a)">Casado</option>
                <option value="União Estável">União Estável</option>
              </select>
              <label className="input-group-text" htmlFor="inputGroupSelect02">
                Opções
              </label>
            </div>
          </div>
        </div>

        <div className="row mt-3 mb-5" id="socio-final">
          <div
            className="input-group col mb-0 d-flex flex-row justify-content-start align-items-center gap-1"
            id="s2"
          >
            <label htmlFor="rg" id="label">
              RG:
            </label>
            <InputMask
              type="text"
              mask={[
                /\d/,
                /\d/,
                ".",
                /\d/,
                /\d/,
                /\d/,
                ".",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
              ]}
              id="rg"
              value={rg}
              className="form-control w-100"
              placeholder="12.345.678-9"
              aria-label="RG"
              aria-describedby="basic-addon2"
              autoComplete="off"
              onChange={(e) => setRg(e.target.value)}
            />
            <div className="form-text text-danger" id="basic-addon4">
              Digite apenas números*
            </div>
          </div>

          <div
            className="input-group col mb-0 d-flex flex-row justify-content-start align-items-center gap-1"
            id="s2"
          >
            <label htmlFor="cpf" id="label">
              CPF:
            </label>
            <InputMask
              mask={[
                /\d/,
                /\d/,
                /\d/,
                ".",
                /\d/,
                /\d/,
                /\d/,
                ".",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
              ]}
              type="text"
              id="cpf"
              value={cpf}
              className="form-control w-100"
              placeholder="123.456.789-10"
              aria-label="CPF"
              aria-describedby="basic-addon2"
              aria-autocomplete="none"
              autoComplete="off"
              list="autocompleteOff"
              onChange={(e) => setCpf(e.target.value)}
            />
            <div className="form-text text-danger cpf-danger" id="basic-addon4">
              Digite apenas números*
            </div>
          </div>

          <div
            className="input-group col mb-0 d-flex flex-row justify-content-start align-items-center gap-1"
            id="s2"
          >
            <label htmlFor="orgaoExpedidor" id="label">
              Orgão Expedidor:
            </label>
            <InputMask
              mask={[
                /[A-Za-z]/,
                /[A-Za-z]/,
                /[A-Za-z]/,
                "/",
                /[A-Za-z]/,
                /[A-Za-z]/,
              ]}
              type="text"
              id="orgaoExpedidor"
              value={orgaoExpedidor}
              className="form-control w-100"
              placeholder="###/##"
              aria-label="Orgão Expedidor"
              aria-describedby="basic-addon2"
              aria-autocomplete="none"
              autoComplete="off"
              list="autocompleteOff"
              onChange={(e) => setOrgaoExpedidor(e.target.value.toUpperCase())}
            />
          </div>

          <div
            className="input-group col mb-0 d-flex flex-row justify-content-start align-items-center gap-1"
            id="s2"
          >
            <label htmlFor="residenciaAtual" id="label">
              Residência Atual:
            </label>
            <input
              type="text"
              id="residenciaAtual"
              value={residenciaAtual}
              className="form-control w-100"
              placeholder="Casa, apartamento..."
              aria-label="Residência Atual"
              aria-describedby="basic-addon2"
              aria-autocomplete="none"
              autoComplete="off"
              list="autocompleteOff"
              onChange={(e) => setResidenciaAtual(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="btnStage d-flex justify-content-between">
        <button
          type="button"
          className="btn-stage btn btn-outline-success d-flex align-items-center gap-2 p-2"
          onClick={previousStage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
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
        <button
          type="button"
          className="btn-stage btn btn-outline-success d-flex align-items-center gap-2 p-2"
          onClick={() => {
            if (isFormValid()) {
              if (qtdAutor > 0) {
                sendDataStage2();
              } else {
                setModalAutores(true);
              }
            } else {
              setModal(true);
            }
          }}
        >
          Próximo
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

      {modalAutores && (
        <Modal2
          show={modalAutores}
          onHide={() => setModalAutores(false)}
          className="emergente-modal"
          centered
        >
          <Modal2.Body className="row gap-3">
            <div
              className="input-group mb-0 justify-content-start align-items-center gap-2"
              id="s-autores"
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
                value={nameProgram}
                autoComplete="off"
                list="autocompleteOff"
                disabled
              />
            </div>
            <div
              className="input-group mb-0 justify-content-start align-items-center gap-2"
              id="s-autores"
            >
              <label htmlFor="numeroAutores" id="label">
                Numero de Autores:
              </label>
              <input
                type="number"
                id="numeroAutores"
                className="form-control w-100"
                placeholder=""
                aria-label="Numero de Autores"
                aria-describedby="input-name-program"
                aria-autocomplete="none"
                onChange={(e) => setQuantidadeAutor(e.target.value)}
                autoComplete="off"
                list="autocompleteOff"
              />
            </div>
          </Modal2.Body>
          <Modal2.Footer className="justify-content-between">
            <Button
              className="btn-stage btn btn-outline-success d-flex align-items-center gap-2 p-2"
              variant="danger"
              onClick={() => setModalAutores(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
            </Button>
            <Button
              className="btn-stage btn btn-outline-success d-flex align-items-center gap-2 p-2"
              variant="danger"
              onClick={sendDataStage2}
            >
              Próximo
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
            </Button>
          </Modal2.Footer>
        </Modal2>
      )}
    </div>
  );
};

Stage2.propTypes = {
  previousStage: PropTypes.func.isRequired,
  handleStage2Data: PropTypes.func.isRequired,
  data2: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  nameProgram: PropTypes.string.isRequired,
  setQtdAutor: PropTypes.func.isRequired,
  qtdAutor: PropTypes.number.isRequired,
};

export default Stage2;
