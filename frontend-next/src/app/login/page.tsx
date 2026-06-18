import "./login.css";

export default function Login() {
  return (
    <main className="main">
      <div className="card">
        <h1 className="logo">SHRED_LAB</h1>
        <p className="subtitulo">ACESSE SUA CONTA</p>

        <div className="campo">
          <label className="label">EMAIL</label>
          <input type="email" className="input" />
        </div>

        <div className="campo">
          <label className="label">SENHA</label>
          <input type="password" className="input" />
        </div>

        <button className="btn">ENTRAR</button>

        <p className="rodape">
          Não tem conta?{" "}
          <a href="/cadastro-usuario" className="link">
            CADASTRE-SE
          </a>
        </p>
      </div>
    </main>
  );
}
