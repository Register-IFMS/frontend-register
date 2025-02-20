import "./FormStage4.css";
import PropTypes from "prop-types";
import InputMask from "react-text-mask";
import { useCallback, useEffect, useState } from "react";
import { useFetchCEP } from "./hooks/useFetchCEP";

const FormStage4 = ({
  nextStage,
  previousStage,
  data3Stage1,
  handleAutoresData,
  dadosAutores,
  setModal,
  sendData,
}) => {
  const { autores } = data3Stage1;

  const [indiceAutorAtual, setIndiceAutorAtual] = useState(0);

  const [dataAutores, setDataAutores] = useState(
    autores.map((autor) => ({
      nome: autor.nome,
      porcentagem: autor.porcentagem,
      instituicao: autor.instituicao,
      email: "",
      dataNasc: "",
      nit: "",
      cidade: "",
      cep: "",
      cpf: "",
      logradouro: "",
      uf: "",
      numero: "",
      bairro: "",
      telefone: "",
      celular: "",
      vinculo: "",
      nacionalidade: "",
      estadoCivil: "",
    }))
  );

  const { data: local } = useFetchCEP(
    dataAutores[indiceAutorAtual].cep.replace(/\D/g, "")
  );

  const atualizaDataAutor = useCallback(
    (campo, valor) => {
      setDataAutores((prevData) => {
        const newData = prevData.slice();
        newData[indiceAutorAtual] = {
          ...newData[indiceAutorAtual],
          [campo]: valor,
        };
        return newData;
      });
    },
    [indiceAutorAtual]
  );

  const handleVinculoChange = (id, tipoVinculo) => {
    let atualizaVinculo;
    if (id === 3) {
      atualizaVinculo = tipoVinculo;
    } else if (id === 1) {
      atualizaVinculo = "servidor";
    } else {
      atualizaVinculo = "estudante";
    }
    atualizaDataAutor("vinculo", atualizaVinculo);
  };

  useEffect(() => {
    if (local && !local.erro) {
      atualizaDataAutor("cidade", local.localidade);
      atualizaDataAutor("uf", local.uf);
      atualizaDataAutor("logradouro", local.logradouro);
      atualizaDataAutor("bairro", local.bairro);
    }
  }, [local, atualizaDataAutor]);

  useEffect(() => {
    if (indiceAutorAtual >= 0 && indiceAutorAtual < autores.length) {
      setDataAutores((prevData) => {
        const newData = prevData.slice();
        newData[indiceAutorAtual] = {
          ...newData[indiceAutorAtual],
          cidade: "",
          uf: "",
          logradouro: "",
          bairro: "",
          vinculo: "",
        };
        return newData;
      });
    }
  }, [indiceAutorAtual, autores]);

  const isFormatValid = () => {
    return (
      dataAutores[indiceAutorAtual].email === "" ||
      dataAutores[indiceAutorAtual].dataNasc === "" ||
      dataAutores[0].nit === "" ||
      dataAutores[indiceAutorAtual].cidade === "" ||
      dataAutores[indiceAutorAtual].cep === "" ||
      dataAutores[indiceAutorAtual].cpf === "" ||
      dataAutores[indiceAutorAtual].logradouro === "" ||
      dataAutores[indiceAutorAtual].uf === "" ||
      dataAutores[indiceAutorAtual].numero === "" ||
      dataAutores[indiceAutorAtual].bairro === "" ||
      dataAutores[indiceAutorAtual].celular === "" ||
      dataAutores[indiceAutorAtual].vinculo === "" ||
      dataAutores[indiceAutorAtual].nacionalidade === "" ||
      dataAutores[indiceAutorAtual].estadoCivil === ""
    );
  };

  const nextAutor = () => {
    if (indiceAutorAtual < autores.length - 1) {
      if (!isFormatValid()) {
        handleAutoresData(dataAutores);
        setIndiceAutorAtual((prevIndice) => prevIndice + 1);
      } else {
        setModal(true);
      }
    } else {
      console.log("Todos os autores foram preenchidos");
    }
  };

  const prevAutor = () => {
    setIndiceAutorAtual((prevIndice) => prevIndice - 1);
  };

  const proximoStagio = () => {
    if (isFormatValid()) {
      setModal(true);
    } else {
      handleAutoresData(dataAutores);
      nextStage();
    }
  };

  useEffect(() => {
    if (
      dadosAutores &&
      indiceAutorAtual >= 0 &&
      indiceAutorAtual < dadosAutores.length
    ) {
      setDataAutores(dadosAutores);
    }
  }, [dadosAutores, indiceAutorAtual]);

  console.log(dataAutores);

  return (
    <div className="container-fluid">
      <div className="section1_3 d-flex justify-content-between mb-4">
        <h4>
          {indiceAutorAtual === 0
            ? "Autor Principal"
            : "Autor " + (indiceAutorAtual + 1)}{" "}
          - <span id="title-nome">{dataAutores[indiceAutorAtual].nome}</span>
        </h4>
        {indiceAutorAtual > 0 && (
          <button
            className="navbar-brand btn btn-outline-success d-flex align-items-center gap-2"
            onClick={prevAutor}
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
            </svg>{" "}
            Voltar Autor {indiceAutorAtual}
          </button>
        )}
      </div>

      <div className="section2_3 row row-cols-2 mt-1 mb-4">
        <div
          className="col d-flex flex-column justify-content-center gap-3"
          id="fila-esquerda"
        >
          <div className="input-group gap-2 align-items-center">
            <label htmlFor="nomeAutor">Nome:</label>
            <input
              className="form-control"
              id="nomeAutor"
              type="text"
              value={dataAutores[indiceAutorAtual].nome}
              disabled
            />
          </div>

          <div className="input-group gap-2 align-items-center">
            <label htmlFor="emailAutor">Email:</label>
            <input
              className="form-control"
              id="emailAutor"
              type="email"
              placeholder="meu.email@email.com"
              value={dataAutores[indiceAutorAtual].email}
              onChange={(e) => atualizaDataAutor("email", e.target.value)}
              list="autocompleteOff"
              aria-autocomplete="none"
            />
          </div>

          <div className="input-group gap-2 align-items-center">
            <label htmlFor="enderecoAutor">Endereço:</label>
            <input
              className="form-control w-25"
              id="enderecoAutor"
              type="text"
              placeholder="Rua Santa Rita..."
              value={dataAutores[indiceAutorAtual].logradouro}
              onChange={(e) => atualizaDataAutor("logradouro", e.target.value)}
              list="autocompleteOff"
              aria-autocomplete="none"
            />
            <label htmlFor="enderecoAutor">CEP:</label>
            <InputMask
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
              className="form-control"
              id="cepAutor"
              type="text"
              placeholder="12345-678"
              value={dataAutores[indiceAutorAtual].cep}
              onChange={(e) => atualizaDataAutor("cep", e.target.value)}
              list="autocompleteOff"
              aria-autocomplete="none"
            />
          </div>

          <div className="input-group gap-2 align-items-center">
            <label htmlFor="cidadeAutor">Cidade:</label>
            <input
              className="form-control w-25"
              id="cidadeAutor"
              type="text"
              placeholder="Cidade..."
              value={dataAutores[indiceAutorAtual].cidade}
              onChange={(e) => atualizaDataAutor("cidade", e.target.value)}
              list="autocompleteOff"
              aria-autocomplete="none"
            />
            <label htmlFor="ufAutor">UF:</label>
            <InputMask
              mask={[/[A-Za-z]/, /[A-Za-z]/]}
              className="form-control"
              id="ufAutor"
              type="text"
              placeholder="MS..."
              value={dataAutores[indiceAutorAtual].uf}
              onChange={(e) =>
                atualizaDataAutor("uf", e.target.value.toUpperCase())
              }
              list="autocompleteOff"
              aria-autocomplete="none"
            />
            <label htmlFor="numeroAutor">N°:</label>
            <input
              className="form-control"
              id="numeroAutor"
              type="number"
              value={dataAutores[indiceAutorAtual].numero}
              onChange={(e) => atualizaDataAutor("numero", e.target.value)}
              list="autocompleteOff"
              aria-autocomplete="none"
            />
          </div>

          <div className="input-group gap-2 align-items-center">
            <label htmlFor="bairroAutor">Bairro:</label>
            <input
              className="form-control"
              id="bairroAutor"
              type="text"
              placeholder="Meu bairro.."
              value={dataAutores[indiceAutorAtual].bairro}
              onChange={(e) => atualizaDataAutor("bairro", e.target.value)}
              list="autocompleteOff"
              aria-autocomplete="none"
            />
          </div>

          <div className="input-group gap-2 align-items-center">
            <label htmlFor="telefoneAutor">Telefone Fixo:</label>
            <InputMask
              mask={[
                "(",
                /\d/,
                /\d/,
                ")",
                " ",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
              className="form-control"
              id="telefoneAutor"
              type="text"
              placeholder="(12) 3456-7891"
              value={dataAutores[indiceAutorAtual].telefoneFixo}
              onChange={(e) =>
                atualizaDataAutor("telefoneFixo", e.target.value)
              }
              list="autocompleteOff"
              aria-autocomplete="none"
            />
          </div>

          <div className="input-group gap-2 align-items-center">
            <label htmlFor="celularAutor">Celular:</label>
            <InputMask
              mask={[
                "(",
                /\d/,
                /\d/,
                ")",
                " ",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
              className="form-control"
              id="celularAutor"
              type="text"
              placeholder="(12) 34567-8910"
              value={dataAutores[indiceAutorAtual].celular}
              onChange={(e) => atualizaDataAutor("celular", e.target.value)}
              list="autocompleteOff"
              aria-autocomplete="none"
            />
          </div>

          <div className="input-group gap-2 align-items-center">
            <label htmlFor="nacionalidadeAutor">Nacionalidade:</label>
            <input
              className="form-control"
              id="nacionalidadeAutor"
              type="text"
              placeholder="Brasileiro..."
              value={dataAutores[indiceAutorAtual].nacionalidade}
              onChange={(e) =>
                atualizaDataAutor("nacionalidade", e.target.value)
              }
              list="autocompleteOff"
              aria-autocomplete="none"
            />
          </div>

          <div className="input-group gap-2 align-items-center estado-civil">
            <label htmlFor="estadoCivil" id="label">
              Estado Cívil:
            </label>
            <div className="input-group w-auto options">
              <select
                className="form-select fs-6"
                id="inputGroupSelect02"
                value={dataAutores[indiceAutorAtual].estadoCivil}
                onChange={(e) =>
                  atualizaDataAutor("estadoCivil", e.target.value)
                }
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

        <div className="col d-flex flex-column gap-3" id="fila-direita">
          <div className="input-group gap-2 align-items-center w-100">
            <label htmlFor="dataAutor">Data de Nascimento:</label>
            <input
              className="form-control"
              id="dataAutor"
              type="date"
              value={dataAutores[indiceAutorAtual].dataNasc}
              onChange={(e) => atualizaDataAutor("dataNasc", e.target.value)}
              list="autocompleteOff"
              aria-autocomplete="none"
            />
          </div>

          {indiceAutorAtual === 0 && (
            <div className="input-group gap-2 align-items-center w-50">
              <label htmlFor="nitAutor">Contato NIT:</label>
              <InputMask
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  ".",
                  /\d/,
                  /\d/,
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
                className="form-control"
                id="nitAutor"
                type="text"
                placeholder="123.45678.910-1"
                value={dataAutores[indiceAutorAtual].nit}
                onChange={(e) => atualizaDataAutor("nit", e.target.value)}
                list="autocompleteOff"
                aria-autocomplete="none"
              />
            </div>
          )}

          <div className="input-group gap-2 align-items-center w-50">
            <label htmlFor="cpfAutor">CPF:</label>
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
              className="form-control"
              id="cpfAutor"
              type="text"
              placeholder="123.456.789-10"
              value={dataAutores[indiceAutorAtual].cpf}
              onChange={(e) => atualizaDataAutor("cpf", e.target.value)}
              list="autocompleteOff"
              aria-autocomplete="none"
            />
          </div>

          <div className="input-group row gap-2 align-items-center mb-4">
            <label htmlFor="vinculoAutor">Vínculo com o IFMS:</label>
            <div className="form-check ms-3 d-flex align-items-center gap-2">
              <input
                type="checkbox"
                id="servidorCheckbox"
                className="form-check-input mt-0"
                checked={dataAutores[indiceAutorAtual]?.vinculo === "servidor"}
                onChange={() => handleVinculoChange(1, "servidor")}
              />
              <label htmlFor="servidorCheckbox" className="form-check-label">
                Servidor
              </label>
            </div>
            <div className="form-check ms-3 d-flex align-items-center gap-2">
              <input
                type="checkbox"
                id="estudanteCheckbox"
                className="form-check-input mt-0"
                checked={dataAutores[indiceAutorAtual]?.vinculo === "estudante"}
                onChange={() => handleVinculoChange(2, "estudante")}
              />
              <label htmlFor="estudanteCheckbox" className="form-check-label">
                Estudante
              </label>
            </div>
            <div className="form-check ms-3 d-flex align-items-center gap-2">
              <input
                type="checkbox"
                id="outrosCheckbox"
                className="form-check-input mt-0"
                checked={
                  dataAutores[indiceAutorAtual]?.vinculo !== "servidor" &&
                  dataAutores[indiceAutorAtual]?.vinculo !== "estudante"
                }
                onChange={() => handleVinculoChange(3, "")}
              />
              <label htmlFor="outrosCheckbox" className="form-check-label">
                Outros
              </label>
              <input
                className="form-control w-100"
                id="vinculoAutor"
                type="text"
                list="autocompleteOff"
                aria-autocomplete="none"
                value={
                  dataAutores[indiceAutorAtual]?.vinculo !== "servidor" &&
                  dataAutores[indiceAutorAtual]?.vinculo !== "estudante"
                    ? dataAutores[indiceAutorAtual]?.vinculo
                    : ""
                }
                disabled={
                  dataAutores[indiceAutorAtual]?.vinculo === "servidor" ||
                  dataAutores[indiceAutorAtual]?.vinculo === "estudante"
                }
                onChange={(e) => handleVinculoChange(3, e.target.value)}
              />
            </div>
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
          onClick={
            indiceAutorAtual === autores.length - 1 ? proximoStagio : nextAutor
          }
        >
          {indiceAutorAtual === autores.length - 1
            ? "Próximo"
            : `Próximo Autor ${indiceAutorAtual + 1 + 1}`}
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

FormStage4.propTypes = {
  nextStage: PropTypes.func.isRequired,
  previousStage: PropTypes.func.isRequired,
  data3Stage1: PropTypes.object.isRequired,
  handleAutoresData: PropTypes.func.isRequired,
  dadosAutores: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  sendData: PropTypes.func.isRequired,
};

export default FormStage4;
