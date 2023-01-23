import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services/Auth.js";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";


export default function Signin() {

    const [form, setForm] = useState({});
    const { setToken } = useContext(AuthContext);


  const navigate = useNavigate();


  function handleForm({ value, name }) {
    setForm({...form,[name]: value,});
  }

  function handleSendForm(e) {
    e.preventDefault();
    if(!form.email || !form.password){
      return alert("Preencha os campos corretamente");
    }

    signIn(form).then((res) => {
      if(res.data === "Unauthorized") return alert("Verifique os dados inseridos")
      console.log(res);
      console.log(res.data);
     setToken(res.data);
      navigate("/teste");
    }).catch((err) => {
      err.response.data.map((e) => {
      return alert(e)
      })
     })
  }
  

    return (
        <>
        <Container>
        <Form autoComplete="off">
        <MainTitle>MyWallet</MainTitle>

        <Input placeholder="Digite seu e-mail" name="email" type="email"
        onChange={(e) => handleForm({ name: e.target.name, value: e.target.value,})}>
        </Input>

        <Input placeholder="Digite sua senha" name="password" type="password"
        onChange={(e) => handleForm({name: e.target.name,value: e.target.value,})}>
        </Input>

        <Button onClick={handleSendForm}>Entrar</Button>

        <span> Não tem uma conta?{" "}
          <Link className="link" to="/signup">Cadastre-se</Link>
        </span>
            </Form>
         </Container>
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

const Container = styled.div`
  height: 100vh;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  margin-bottom:15px;
  outline: none;
  border: none;

`;
