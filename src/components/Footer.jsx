import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Context from '../Context';
import { useContext } from 'react';
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";




export default function Footer() {


    const { foto, setFoto, token, setToken, porcentagemConcluida, setPorcentagemConcluida } = useContext(Context);
    const porcentagem = 0;

    return (
        <DivFooter data-test="menu">
            <Link data-test="habit-link" to={"/habitos"} style={{ textDecoration: 'none' }}>
                <p>Meus Miaus</p>
            </Link>
            <Link data-test="today-link" to={"/hoje"} style={{ textDecoration: 'none' }}>
                <Ellipse>
                    <CircularProgressbar
                        value={porcentagem}
                        text={`Modelos`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#3e98c7",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
                    />
                </Ellipse>
            </Link>
            <Link data-test="history-link" to={"/historico"} style={{ textDecoration: 'none' }}>
                <p>Histórico</p>
            </Link>

        </DivFooter>

    )
}


const DivFooter = styled.div`
    width: 100%;
    height: 70px;
    left: 0px;
    bottom: 0px;
    position: fixed;
    z-index: 10;
    background: #FFFFFF;
    box-sizing: border-box;
    padding: 0 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;


    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 500;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        outline: none;
        text-decoration: none;
        color: #52B6FF;
    }
    

`

const Ellipse = styled.div`
    background-color: #45597e;
    width: 120px;
    height: 120px;
    background: #52B6FF;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 28px;
    font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;

        color: #FFFFFF;
  

    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;

        color: #FFFFFF;
    }

`