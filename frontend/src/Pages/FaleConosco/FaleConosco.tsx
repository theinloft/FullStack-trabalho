import { useState } from "react";
import "./FaleConosco.css";

const MAX_OBS = 300;

export default function FaleConosco() {
  const [obsLength, setObsLength] = useState(0);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
  }

  return (
    <section className="contato">
      <div className="mapa">
        <div className="mapa-frame">
          <iframe
            title="Localização no mapa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.9239414968174!2d-51.19101452474843!3d-30.03903983102531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951978253ac0e4b1%3A0xce5eb0f3e484ffa5!2sAv.%20Lavras%2C%20329%20-%20Petr%C3%B3polis%2C%20Porto%20Alegre%20-%20RS%2C%2090460-040!5e0!3m2!1spt-BR!2sbr!4v1782511851944!5m2!1spt-BR!2sbr"
          ></iframe>
          <div className="selo" aria-hidden="true">
            <span>
              Porto
              <br />
              Alegre · RS
            </span>
          </div>
        </div>
      </div>

      <div className="form_contato">
        <span className="eyebrow">Formulário 01</span>
        <h1>Contato online</h1>
        <span className="subtitulo">
          Preencha os dados abaixo para que possamos retornar o contato.
        </span>
        <hr className="regua" />

        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="nome" className="input">
              Nome completo<span className="obrig">*</span>
            </label>
            <input
              id="nome"
              type="text"
              name="nome"
              className="input"
              placeholder="Nome Completo"
              autoComplete="name"
              required
              autoFocus
            />
          </div>

          <div className="campo">
            <label htmlFor="cel" className="input">
              Telefone<span className="obrig">*</span>
            </label>
            <input
              id="cel"
              type="tel"
              name="cel"
              className="input"
              placeholder="(51) XXXXX-XXXX"
              autoComplete="tel"
              required
            />
          </div>

          <div className="campo full">
            <label htmlFor="endereco" className="input">
              Endereço<span className="obrig">*</span>
            </label>
            <input
              id="endereco"
              type="text"
              name="endereco"
              className="input"
              placeholder="Rua, avenida..."
              autoComplete="address-line1"
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="cep" className="input">
              CEP<span className="obrig">*</span>
            </label>
            <input
              id="cep"
              type="text"
              name="cep"
              className="input"
              placeholder="Sem ponto e sem hífen"
              autoComplete="postal-code"
              inputMode="numeric"
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="numero" className="input">
              Número<span className="obrig">*</span>
            </label>
            <input
              id="numero"
              type="number"
              name="numero"
              className="input"
              min={0}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="complemento" className="input">
              Complemento
            </label>
            <input
              id="complemento"
              type="text"
              name="complemento"
              className="input"
              placeholder="Apto, bloco, sala..."
              autoComplete="address-line2"
            />
          </div>

          <div className="campo">
            <label htmlFor="cidade" className="input">
              Cidade<span className="obrig">*</span>
            </label>
            <input
              id="cidade"
              type="text"
              name="cidade"
              className="input"
              placeholder="Campo obrigatório"
              autoComplete="address-level2"
              required
            />
          </div>

          <label htmlFor="obs" className="obs">
            Observações
          </label>
          <textarea
            id="obs"
            name="obs"
            className="input"
            rows={6}
            maxLength={MAX_OBS}
            placeholder="Escreva observações, mensagens ou pedidos especiais, se necessário."
            onChange={(e) => setObsLength(e.target.value.length)}
          />
          <span className="contador">
            {obsLength}/{MAX_OBS}
          </span>

          <div className="rodape-form">
            <span className="dica-envio">Toque para enviar</span>
            <button type="submit" className="botao">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
