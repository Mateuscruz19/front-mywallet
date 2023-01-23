import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signUp } from "../services/Auth.js";
import logo from "../images/LOGO.png"

export default function Signup() {

    const [form, setForm] = useState({});
    const navigate = useNavigate();

    function handleForm({ value, name }) {
      setForm({...form,[name]: value,});
    }

    function handleSendForm (event) {
        event.preventDefault();
        console.log(form)
        if(!form.name || !form.email || !form.password){
          return alert("Preencha os campos corretamente");
        }
        console.log(form)
        signUp(form).then((res) => {
          console.log(res)
          alert(res.data)
          navigate("/signin");
        })
        .catch((err) => {
         err.response.data.map((e) => {
          return alert(e)
         })
        })
      }

    return (
        <>
        <Background>
        <Form autoComplete="off">
          <LogoA width={"150px"} src={logo} alt="Logo"></LogoA>
                <ConteinerTop>
                    <LoginText>Registro</LoginText>
                    <LoginDescription>Coloque seus dados para se cadastrar no site.</LoginDescription>
                </ConteinerTop>
                <ContainerBot>
                    <TextPass>Nome</TextPass>
                    <Senha placeholder="Digite seu nome" name="name" type="text"
         onChange={(name) => handleForm({ name: name.target.name, value: name.target.value})}>
         </Senha>
                    <TextEmail>Email</TextEmail>
                    <Email placeholder="Digite seu e-mail" name="email" type="email"
        onChange={(email) => handleForm({name: email.target.name,value: email.target.value, })}>
        </Email>
                    <TextPass>Senha</TextPass>
                    <Senha placeholder="Digite sua senha" name="password" type="password" 
                    onChange={(e) => handleForm({name: e.target.name, value: e.target.value,})}>
                    </Senha>
                <Entrar onClick={handleSendForm}><p>Registrar-se</p></Entrar>
                <Link to="/signin">
                <RegisterBox>Já tem uma conta?<span>Logue!</span></RegisterBox>
                </Link>
                </ContainerBot>
                </Form>
            </Background>
        </>
    )
}


const Form = styled.form`

  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

`;

const Background = styled.main`
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    margin-top:50px;
`
const LogoA = styled.img`
    width:250px;
    margin-top:-15px;
    margin-bottom:20px;
`
const ConteinerTop = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    width: 330px;
    height: 71px;
`
const LoginText = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    letter-spacing: 0.01em;
    text-transform: capitalize;
    color: #344054;
    flex: none;
    order: 0;
    flex-grow: 0;
`

const LoginDescription = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    flex: none;
    order: 1;
    flex-grow: 0;
`

const ContainerBot = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    margin-top:10px;
`

  const TextEmail = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  const TextPass = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  margin-top:10px;
  `


const Email = styled.input`
    box-sizing: border-box;
    width: 327px;
    height: 44px;
    border: 1px solid #D0D5DD;
    border-radius: 8px;
    &::placeholder{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #667085;
    flex: none;
    order: 0;
    flex-grow: 0;
    }
`


const Senha = styled.input`
    box-sizing: border-box;
    width: 327px;
    height: 44px;
    border: 1px solid #D0D5DD;
    border-radius: 8px;
    &::placeholder{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #667085;
    flex: none;
    order: 0;
    flex-grow: 0;
    }
`


const Entrar = styled.button`
    margin-top:20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 327px;
    height: 44px;
    background: #000;
    outline:none;
    border:none;
    border-radius: 8px;
    cursor: pointer;
    p{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #FFFFFF;
    flex: none;
    order: 0;
    flex-grow: 0;
    }
`


const RegisterBox = styled.p`
    margin-top:15px;
    width: 327px;
    height: 21px;
    left: 24px;
    top: 694px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #344054;
    cursor: pointer;
    span{
        color:#E2CAFC;
    }
    &:hover{
        text-decoration: underline;
        text-decoration-color:#5429FF;
    }
`