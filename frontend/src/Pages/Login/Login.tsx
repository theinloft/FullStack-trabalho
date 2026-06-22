import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.logo}>Gestão de pedidos</h1>
        <p className={styles.subtitulo}>ACESSE SUA CONTA</p>

        <div className={styles.campo}>
          <label className={styles.label}>EMAIL</label>
          <input type="email" className={styles.input} />
        </div>

        <div className={styles.campo}>
          <label className={styles.label}>SENHA</label>
          <input type="password" className={styles.input} />
        </div>

        <button className={styles.btn}>ENTRAR</button>
        <button className={styles.btn} onClick={() => navigate("/")}>
          VOLTAR
        </button>

        <p className={styles.rodape}>
          Não tem conta?{" "}
          <a href="/cadastro-cliente" className={styles.link}>
            CADASTRE-SE
          </a>
        </p>
      </div>
    </main>
  );
}

export default Login;
