import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home";
import CadastroCliente from "./Pages/CadastroCliente/Cadastro-Cliente";
import Painel from "./Pages/Painel/Painel";
import Layout from "./Pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/cadastro-cliente" element={<CadastroCliente />} />
          <Route path="/painel" element={<Painel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
