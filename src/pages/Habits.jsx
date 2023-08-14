import styled from "styled-components"
import NavBar from "../components/Navbar"
import Footer from "../components/Footer";
import { useContext } from 'react';
import { useEffect } from "react";
import Context from '../Context';
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { ThreeDots } from 'react-loader-spinner'



export default function Habits() {

    const Days = [`D`, `S`, `T`, `Q`, `Q`, `S`, `S`]
    const [DiasSelecionados, setDiasSelecionados] = useState([]);
    const [NameHabit, setNameHabit] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState("");
    const { foto, setFoto, token, } = useContext(Context)
    const [Habitos, SetHabitos] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {

        const url = `${import.meta.env.VITE_API_URL}/mycats`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const promise = axios.get(url, config);

        promise.then(resposta => {

            console.log(token)
            SetHabitos(resposta.data)
            

        });
        promise.catch(erro => console.log(erro.response.data));
    }, []);



    const [started, setStarted] = useState(false);

    function AddHabit() {
        setStarted(true);
    }

    function CancelAddHabit() {
        setStarted(false);
    }

    function SendHabit(e) {
        e.preventDefault();


        const URL = `${import.meta.env.VITE_API_URL}/cats`;

        const novo = { name: nome, descricao: descricao, image: imagem }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const promise = axios.post(URL, novo, config);
        setLoad(true)


        promise.then(resposta => {
            
            setLoad(false)
            setStarted(false);
            setDiasSelecionados([])
            setNameHabit("")
            alert("Miaudelo cadastrado com sucesso!")




            const url = `${import.meta.env.VITE_API_URL}/mycats`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const promise = axios.get(url, config);

            promise.then(resposta => {

                SetHabitos(resposta.data)
                

            });
            promise.catch(erro => {
                
                setLoad(false)
                console.log(erro.response.data)});


        });

        promise.catch(erro => {
            console.log(token)
            alert(erro.response.data)
            setLoad(false)
            
        });
    }

    function CheckBox(HabitoSelecionado) {

        console.log(HabitoSelecionado)
        console.log(token)

        
        if (HabitoSelecionado.isdisponivel == true) {

            console.log("entrou no if")
            console.log(HabitoSelecionado.id)
            console.log(token)


            const URL = `${import.meta.env.VITE_API_URL}/cats/${HabitoSelecionado.id}`

            const novo = {}

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            console.log(config)

            const promise = axios.put(URL, novo, config);



            promise.then(resposta => {
                

                const url = `http://localhost:5000/mycats`;

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const promise = axios.get(url, config);

                promise.then(resposta => {

                    SetHabitos(resposta.data)
                    
                    setTotalHabitos(resposta.data.length);
                    const concluidos = resposta.data.filter(habito => habito.done);
                    setHabitosConcluidos(concluidos.length);

                });
                promise.catch(erro => console.log(erro.response.data));


            });

            promise.catch(erro => {
                alert(erro.response.data.message)
            });

        } else {

            const URL = `http://localhost:5000/cats/${HabitoSelecionado.id}`

            const novo = {}

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const promise = axios.put(URL, novo, config);



            promise.then(resposta => {
                

                const url = `http://localhost:5000/mycats`;

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const promise = axios.get(url, config);

                promise.then(resposta => {

                    SetHabitos(resposta.data)
                    const concluidos = resposta.data.filter(habito => habito.done);
                

                });
                promise.catch(erro => console.log(erro.response.data));


            });

            promise.catch(erro => {
                alert(erro.response.data.message)
            });



        }



    }



    return (

        <>
            <Container>

                <NavBar foto={foto} />
                <ContentMain>

                    <SuperiorTitle>
                        <Titulo>
                            Meus Miaudelos
                        </Titulo>
                        <Button data-test="habit-create-btn" onClick={AddHabit}>
                            +
                        </Button>
                    </SuperiorTitle>




                    {started ? (
                        <form onSubmit={SendHabit} >
                            <CardHabit data-test="habit-create-container">

                                <input

                                    data-test="habit-name-input"
                                    type="text"
                                    placeholder="nome do miaudelo"
                                    required
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />

                                <input

                                    data-test="habit-name-input"
                                    type="text"
                                    placeholder="descrição do miaudelo"
                                    required
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                />

                                <input

                                    data-test="habit-name-input"
                                    type="text"
                                    placeholder="imagem do miaudelo"
                                    required
                                    value={imagem}
                                    onChange={(e) => setImagem(e.target.value)}
                                />


                                <ButtonsAction>

                                    <CancelButton data-test="habit-create-cancel-btn" onClick={CancelAddHabit}>
                                        Cancelar
                                    </CancelButton>
                                    <SaveButton data-test="habit-create-save-btn" load={load} type="submit">
                                        {load == true ? (
                                            <ThreeDots
                                                width="43"
                                                height="11"
                                                radius="9"
                                                color="#FFFFFF"
                                                ariaLabel="three-dots-loading"
                                                wrapperStyle={{}}
                                                wrapperClassName=""
                                                visible={true}
                                            />
                                        ) : ("Salvar")}
                                    </SaveButton>
                                </ButtonsAction>

                            </CardHabit>
                        </form>) : ("")}

                        {Habitos.length != 0 ? (
                        <>
                            {
                                Habitos.map((Habito, index) => (



                                    <Card data-test="today-habit-container" isDone={Habito.done}>
                                        <div>
                                            <TituloCard data-test="today-habit-name">{Habito.name}</TituloCard>
                                            <Sequencia data-test="today-habit-sequence" isDone={Habito.isdisponivel} >Está ativo: <span> {Habito.isdisponivel == true ? "Sim" : "Não"}</span></Sequencia>
                                        </div>
                                        <Check data-test="today-habit-check-btn" onClick={() => CheckBox(Habito)} isDone={Habito.isdisponivel} >
                                            <img src="https://media.discordapp.net/attachments/931340188024713226/1113687254762799104/image.png" alt="" />
                                        </Check>
                                    </Card>

                                )
                                )
                            }


                        </>

                    ) : (

                        <SubTitulo1>
                            Você não tem nenhum Miaudelo cadastrado ainda. Adicione um para começar a sua vida de GatoStar!
                        </SubTitulo1>



                    )}


                </ContentMain>
                <Footer />
            </Container >
        </>
    )
}



const Container = styled.div`
    background-color: #F2F2F2;
    height: calc(100vh - 70px);
    width: 100%;
    overflow-y: auto;
`

const ContentMain = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 28px;
    padding-bottom: 70px;
    padding-top: 70px;
    padding-left: 18px;
    padding-right: 18px;
    box-sizing: border-box;
    
    
`

const Titulo = styled.p`

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    /* identical to box height */


    color: #126BA5;
    
`

const SubTitulo = styled.p`
    width: 338px;
    height: 74px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;

    color: #666666;


`

const SubTitulo1 = styled.p`
    width: 338px;
    height: 74px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;

    color: #666666;


`

const Button = styled.div`

width: 40px;
height: 35px;
background: #52B6FF;
border-radius: 4.63636px;
display: flex;
justify-content: center;
align-items: center;


    


    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 26.976px;
    
    /* identical to box height */

    

    color: #FFFFFF;

    outline: none;
    border: none;

`

const SuperiorTitle = styled.div`

display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
margin-bottom: 28px;

`

const CardHabit = styled.div`
    width: 340px;
    height: auto;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 28px;
    padding: 18px;
    box-sizing: border-box;

    input {
        width: 303px;
        height: 45px;
        margin-bottom: 6px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding:0 11px;
        box-sizing: border-box;
        &::placeholder {
            
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            color: #DBDBDB;
            display: flex;
            align-items: center;
        }
    }

`

const ButtonDays = styled.button`
width: 30px;
height: 30px;


border: 1px solid ${props => (props.isSelected ? `#CFCFCF` : `#D5D5D5`)};         // Essa cor deve mudar
background-color: ${props => (props.isSelected ? `#CFCFCF` : `#FFFFFF`)};    // Essa cor deve mudar
border-radius: 5px;

font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
/* identical to box height */
display: flex;
justify-content: center;
align-items: center;

color: ${props => (props.isSelected ? `#FFFFFF` : `#DBDBDB`)};


`

const ButtonsDays = styled.div`

    width: 234px;
    height: 30px;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;



`

const ButtonsAction = styled.div`
    
    
    height: 35px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 29px;
    gap: 8px


`

const SaveButton = styled.button`
    width: 84px;
    height: 35px;
    background: #52B6FF;
    border-radius: 4.63636px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${props => (props.load ? `0.7` : `1`)};
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    /* identical to box height */

    text-align: center;
    border: none;
    color: #FFFFFF;
`

const CancelButton = styled.button`

    width: 84px;
    height: 35px;
    background: #FFFFFF;
    border-radius: 4.63636px;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    /* identical to box height */

    text-align: center;
    border: none;
    color: #52B6FF;
`

const HabitoSaved = styled.div`
    width: 340px;
    height: 91px;
    position: relative;
    background: #FFFFFF;
    margin-bottom: 10px;
    border-radius: 5px;
    padding-left: 15px;
    padding-right: 10px;
    box-sizing: border-box;
    z-index: 1;
    
    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
       margin-top: 13px;


        color: #666666;
    }

    img {
        width: 13px;
        height: 15px;
        position: absolute ;
        top: 11px;
        right: 10px;
    }


`
const Card = styled.div`
    width: 340px;
    height: 94px;
    background: #FFFFFF;
    border-radius: 5px;
    
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 0 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    
`

const TituloCard = styled.p`

font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 900;
        max-width: 200px;
        overflow: hidden;
        font-size: 19.976px;
        line-height: 25px;
        width: auto;
        height: 25px;
        color: #666666;        

`
const Sequencia = styled.p`

font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 300;
        max-width: 200px;
        overflow: hidden;
        font-size: 20px;
        line-height: 16px;
        margin-top: 7px;
        color: #666666;

        span {
            color: ${props => (props.isDone ? `#8FC549` : `red`)};
        }

`
const Recorde = styled.p`

font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;

        span {
            color: ${props => (props.isDone && props.isRecord ? `#8FC549` : `#666666`)};
        }

`

const Check = styled.div`
    width: 69px;
    height: 69px;
    background: ${props => (props.isDone? `#8FC549` : `#EBEBEB`)};
    border: 1px solid ${props => (props.isDone ? `#8FC549` : `#E7E7E7`)}; ; 
    border-radius: 5px;
    display: flex;
        justify-content: center;
        align-items: center;


    img {       
            width: 35px;
            height: 28px;
        }
`