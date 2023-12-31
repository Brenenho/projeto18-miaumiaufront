import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import MainApp from "./pages/MainApp"
import History from "./pages/History";
import Habits from "./pages/Habits";
import CatDetailPage from "./pages/CatDetail";
import styled from "styled-components"
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Context from './Context';


function App() {
  const [foto, setFoto] = useState("");
  const [token, setToken] = useState("");
  const [porcentagemConcluida, setPorcentagemConcluida] = useState(0);

  return (
    <Context.Provider value={{foto, setFoto, token, setToken, porcentagemConcluida, setPorcentagemConcluida}}>
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/cadastro" element={<SignUp />}></Route>
          <Route path="/hoje" element={<MainApp />}></Route>
          <Route path="/historico" element={<History/>}></Route>
          <Route path="/habitos" element={<Habits/>}></Route>
          <Route path="/gato/:id" element={<CatDetailPage/>}></Route>

        </Routes>
      </BrowserRouter>
    
    </>
    </Context.Provider>
  )
}

export default App
