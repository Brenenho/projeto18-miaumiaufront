import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f7f7f7;
`;

const CatDetailsContainer = styled.div`
  width: 80%;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const CatImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const CatImage = styled.img`
  max-width: 100%;
  border-radius: 10px;
`;

const CatInfoSection = styled.section`
  background-color: #fff6e0;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
`;

const CatInfoTitle = styled.h2`
  color: #ff6b6b;
`;

const CatInfoItem = styled.p`
  margin: 10px 0;
  overflow-wrap: break-word;
`;

const ModelDetails = styled.div`
  background-color: #ffc2d1;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
`;

const ModelDetailsTitle = styled.h2`
  color: #ff6b6b;
  margin-bottom: 10px;
`;

const ModelDetailsText = styled.p`
  margin: 10px 0 20px;
  overflow-wrap: break-word;
`;

export default function CatDetailPage() {
  const { id } = useParams();
  const [catInfo, setCatInfo] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cats/${id}`)
      .then((response) => {
        setCatInfo(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!catInfo) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <NavBar />
      <CatDetailsContainer>
        <CatImageContainer>
          <CatImage src={catInfo.image} alt={catInfo.name} />
        </CatImageContainer>
        <ModelDetails>
          <ModelDetailsTitle>Detalhes do Modelo</ModelDetailsTitle>
          <ModelDetailsText>
            Nome: {catInfo.name}<br />
            <br />
            Descrição: {catInfo.descricao}
          </ModelDetailsText>
        </ModelDetails>
        <CatInfoSection>
          <CatInfoTitle>Dados do Contratante</CatInfoTitle>
          <CatInfoItem>Nome: {catInfo.dadosTutor.name}</CatInfoItem>
          <CatInfoItem>Telefone: {catInfo.dadosTutor.telefone}</CatInfoItem>
          <CatInfoItem>Email: {catInfo.dadosTutor.email}</CatInfoItem>
        </CatInfoSection>
      </CatDetailsContainer>
      <Footer />
    </Container>
  );
}
