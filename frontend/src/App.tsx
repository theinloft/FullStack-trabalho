import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home";
import CadastroCliente from "./Pages/CadastroCliente/Cadastro-Cliente";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/cadastro-cliente" element={<CadastroCliente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
