import "./FormStage5.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const FormStage5 = ({ previousStage, finalizeForm, sendData }) => {
  const [modal, setModal] = useState(false);

  const setFinal = () => {
    sendData();
    setModal(true);
  };
  const step = () => {
    setModal(false);
    finalizeForm();
  };
  return (
    <div className="container-fluid">
      <div className="terms">
        <h2>Termos e Condições(FICTICIO)</h2>
        <p>
          Bem-vindo ao nosso site. Se você continuar a navegar e usar este site,
          você está concordando em cumprir e ser regido pelos seguintes termos e
          condições de uso, que junto com nossa política de privacidade,
          governam o relacionamento deste site com você em relação a este site.
        </p>
        <p>
          O termo 'nós' ou 'nosso' refere-se ao proprietário do site. O termo
          'você' refere-se ao usuário ou visitante do nosso site.
        </p>
        <h3>Uso do Site</h3>
        <p>
          O conteúdo das páginas deste site é para sua informação geral e uso
          apenas. Ele está sujeito a alterações sem aviso prévio.
        </p>
        <h3>Isenção de Garantias</h3>
        <p>
          Nem nós nem terceiros fornecemos qualquer garantia quanto à precisão,
          pontualidade, desempenho, integridade ou adequação das informações e
          materiais encontrados ou oferecidos neste site para qualquer
          finalidade específica. Você reconhece que tais informações e materiais
          podem conter imprecisões ou erros e nós expressamente excluímos a
          responsabilidade por quaisquer dessas imprecisões ou erros na extensão
          máxima permitida por lei.
        </p>
        <h3>Limitação de Responsabilidade</h3>
        <p>
          O uso de qualquer informação ou material neste site é inteiramente por
          sua conta e risco, pelo qual não seremos responsáveis. Será sua
          própria responsabilidade garantir que quaisquer produtos, serviços ou
          informações disponíveis através deste site atendam às suas
          necessidades específicas.
        </p>
        <h3>Propriedade Intelectual</h3>
        <p>
          Este site contém material que é de nossa propriedade ou licenciado
          para nós. Este material inclui, mas não está limitado a, o design,
          layout, aparência, e gráficos. A reprodução é proibida, exceto em
          conformidade com o aviso de direitos autorais, que faz parte destes
          termos e condições.
        </p>
        <h3>Links para Outros Sites</h3>
        <p>
          De tempos em tempos, este site pode também incluir links para outros
          sites. Esses links são fornecidos para sua conveniência para fornecer
          mais informações. Eles não significam que endossamos o(s) site(s). Não
          temos responsabilidade pelo conteúdo dos sites vinculados.
        </p>
        <h3>Lei Aplicável</h3>
        <p>
          O uso deste site e qualquer disputa decorrente de tal uso do site está
          sujeito às leis do [seu país/estado].
        </p>
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
          onClick={setFinal}
        >
          Finalizar
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

      {modal && (
        <Modal
          show={modal}
          onHide={() => setModal(false)}
          className="emergente-modal"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Aviso</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tem certeza que deseja finalizar?</Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-stage btn btn-outline-success d-flex align-items-center gap-2 p-2"
              onClick={step}
            >
              Sim
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default FormStage5;
