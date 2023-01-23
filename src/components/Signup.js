import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signUp } from "../services/Auth.js";

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
          alert(e)
         })
        })
      }

    return (
        <>
        <Container>
            <Form autoComplete="off">
                <MainTitle>MyWallet</MainTitle>

         <Input placeholder="Digite seu nome" name="name" type="text"
         onChange={(name) => handleForm({ name: name.target.name, value: name.target.value})}>
         </Input>

         <Input placeholder="Digite seu e-mail" name="email" type="email"
        onChange={(email) => handleForm({name: email.target.name,value: email.target.value, })}>
        </Input>

        <Input placeholder="Digite sua senha" name="password" type="password" 
        onChange={(e) => handleForm({name: e.target.name, value: e.target.value,})}>
        </Input>

        <Button onClick={handleSendForm}>CADASTRAR</Button>
          </Form>
      <h1>Já tem uma conta?
        <span><Link className="link" to="/signin"> Entre agora!</Link></span>
      </h1>
        </Container>
        </>
    )
}

const Container = styled.div`

  height: 100vh;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;

const Form = styled.form`

  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

`;

const MainTitle = styled.p`

  font-size: 33px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom:15px;

`;

const Input = styled.input`

  width: 100%;
  margin-bottom:7px;
  font-size: 15px;;
  padding: 10px;
  border: 1px solid #FFFFFF;


`;

const Button = styled.button`

  width: 100%;
  background-color: #a328d6;
  font-weight: 600;
  color: #FFFFFF;
  cursor: pointer;
  border-radius: 10px;
  padding: 7px;
  font-size: 17px;
  margin-top: 15px;
  outline: none;
  border: none;

`;
