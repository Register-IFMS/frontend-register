import { useEffect, useState } from "react";
import "./FormStage3.css";
import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

const FormStage3 = ({
  previousStage,
  nextStage,
  qtdAutor,
  setModal,
  handleStage3Data1,
  data3Stage1,
}) => {
  const [autores, setAutores] = useState(
    Array(qtdAutor).fill({
      nome: "",
      porcentagem: 100 / qtdAutor,
      instituicao: "",
    })
  );

  const [participacao, setParticipacao] = useState(false);
  const [nomeInst, setNomeInst] = useState("");
  const [cnpjInst, setCnpjInst] = useState("");
  const [nitInst, setNitInst] = useState("");

  const formatCnpj = (value) => {
    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, "");

    // Aplica a máscara do CNPJ
    let maskedValue = numericValue;
    if (numericValue.length > 2) {
      maskedValue = `${numericValue.substring(0, 2)}.${numericValue.substring(
        2,
        5
      )}.${numericValue.substring(5, 8)}/${numericValue.substring(
        8,
        12
      )}-${numericValue.substring(12, 14)}`;
    }

    // Retorna o CNPJ formatado
    return maskedValue;
  };

  const atualzarAutor = (indice, campo, valor) => {
    const novosAutores = [...autores];

    if (campo === "porcentagem") {
      const novaPorcentagem = parseFloat(valor) || 0;
      const porcentagemRestante = 100 - novaPorcentagem;
      const totalOutrosAutores = qtdAutor - 1;

      novosAutores[indice] = {
        ...novosAutores[indice],
        porcentagem: novaPorcentagem,
      };

      novosAutores.forEach((autor, idx) => {
        if (idx !== indice) {
          autor.porcentagem = porcentagemRestante / totalOutrosAutores;
        }
      });
    } else {
      novosAutores[indice] = { ...novosAutores[indice], [campo]: valor };
    }
    setAutores(novosAutores);
  };

  const isFormatValid = () => {
    let totalPorcentagem = 0;
    let isValid = true;

    autores.forEach((autor) => {
      totalPorcentagem += parseFloat(autor.porcentagem) || 0;

      if (
        autor.nome.trim() === "" ||
        autor.porcentagem === null ||
        autor.instituicao.trim() === ""
      ) {
        isValid = false;
      }
    });

    if (totalPorcentagem !== 100) {
      isValid = false;
    }

    if (participacao) {
      if (
        nomeInst.trim() === "" ||
        cnpjInst.trim() === "" ||
        nitInst.trim() === ""
      ) {
        isValid = false;
      }
    }
    return isValid;
  };

  const handleNextStage = () => {
    if (isFormatValid()) {
      const newData = {
        autores: autores,
        participacao: participacao,
        nomeInst: nomeInst,
        cnpjInst: cnpjInst,
        nitInst: nitInst,
      };
      handleStage3Data1(newData);
      nextStage();
    } else {
      setModal(true);
    }
  };

  useEffect(() => {
    if (data3Stage1?.autores?.length > 0) {
      setAutores(data3Stage1.autores);
      setNomeInst(data3Stage1.nomeInst || "");
      setCnpjInst(data3Stage1.cnpjInst || "");
      setNitInst(data3Stage1.nitInst || "");
    }
  }, [data3Stage1]);

  useEffect(() => {
    if (participacao === false) {
      setNomeInst("");
      setCnpjInst("");
      setNitInst("");
    }
  }, [participacao]);

  return (
    <div className="content-stage-3 container-fluid">
      <div className="section1-3">
        <Table className="table-bordered">
          <thead>
            <tr id="thead">
              <th>Nome</th>
              <th>%</th>
              <th>Instituição</th>
            </tr>
          </thead>
          <tbody>
            {autores.map((autor, id) => (
              <tr key={id}>
                <td className="p-1">
                  <input
                    type="text"
                    className="form-control"
                    value={autor.nome}
                    onChange={(e) => atualzarAutor(id, "nome", e.target.value)}
                  />
                </td>
                <td className="p-1 w-25" id="porcentagem">
                  <input
                    type="number"
                    className="form-control"
                    value={parseFloat(autor.porcentagem)}
                    onChange={(e) =>
                      atualzarAutor(id, "porcentagem", e.target.value)
                    }
                  />
                </td>
                <td className="p-1">
                  <input
                    type="text"
                    className="form-control"
                    value={autor.instituicao}
                    onChange={(e) =>
                      atualzarAutor(id, "instituicao", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="section2-3">
        <div className="row align-items-center mb-4 gap-2">
          <span className="col col-md-auto">
            Houve participação de outra instituição?{" "}
          </span>
          <div
            className="col col-auto d-flex align-items-center gap-2"
            id="input-obra-original"
          >
            <input
              type="checkbox"
              value="sim"
              className="form-check-input mt-0"
              checked={participacao}
              onChange={() => setParticipacao(true)}
            />{" "}
            <label htmlFor="sim">Sim:</label>
          </div>

          <div
            className="col col-auto d-flex align-items-center gap-2"
            id="nao"
          >
            <input
              type="checkbox"
              value="nao"
              className="form-check-input mt-0"
              checked={!participacao}
              onChange={() => setParticipacao(false)}
            />{" "}
            <label htmlFor="nao">Não</label>
          </div>

          <div className="input-group align-items-center mt-2 gap-2">
            <label htmlFor="nomeInstituicao">Nome:</label>
            <input
              type="text"
              id="nomeInstituicao"
              className="form-control"
              placeholder="Nome da instiuição"
              disabled={!participacao}
              value={nomeInst}
              onChange={(e) => setNomeInst(e.target.value)}
              aria-autocomplete="none"
              autoComplete="off"
              list="autocompleteOff"
            />

            <label htmlFor="cnpjInst">CNPJ:</label>
            <input
              type="text"
              id="cnpjInst"
              className="form-control"
              placeholder="12.345.678/0001-90"
              disabled={!participacao}
              value={cnpjInst}
              onChange={(e) => setCnpjInst(formatCnpj(e.target.value))}
              aria-autocomplete="none"
              autoComplete="off"
              list="autocompleteOff"
            />
          </div>

          <div className="input-group align-items-center mt-2 gap-2">
            <label htmlFor="contatoNit">
              Telefone do NIT ou outro Contato:
            </label>
            <input
              className="form-control"
              id="nitAutor"
              type="text"
              placeholder="123.45678.910-1"
              disabled={!participacao}
              value={nitInst}
              onChange={(e) => setNitInst(e.target.value)}
              list="autocompleteOff"
              aria-autocomplete="none"
              autoComplete="off"
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
          onClick={handleNextStage}
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
    </div>
  );
};

FormStage3.propTypes = {
  previousStage: PropTypes.func.isRequired,
  nextStage: PropTypes.func.isRequired,
  qtdAutor: PropTypes.number.isRequired,
  setModal: PropTypes.func.isRequired,
  handleStage3Data1: PropTypes.func.isRequired,
  data3Stage1: PropTypes.object.isRequired,
};

export default FormStage3;
