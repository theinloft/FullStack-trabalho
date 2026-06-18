import "./cadastro-usuario.css";
export default function CadastroUsuario() {
  return (
    <main className="main">
      <div className="card">
        <h1 className="logo">SHRED_LAB</h1>
        <p className="subtitulo">CADASTRE-SE</p>

        <div className="campo">
          <label className="label">Nome</label>
          <input type="text" className="input" />
        </div>

        <div className="campo">
          <label className="label">Email</label>
          <input type="email" className="input" />
        </div>

        <div className="campo">
          <label className="label">Senha</label>
          <input type="password" className="input" />
        </div>

        <button className="btn">CADASTRAR</button>
        <button className="btn">VOLTAR</button>
      </div>
    </main>
  );
}
