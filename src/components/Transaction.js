import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../Contexts/AuthContext";
import { createTransaction } from "../services/transactions";

export default function Transactions(props) {

    const { token } = useContext(AuthContext);
    const { type } = useParams();
    const [form, setForm] = useState({});
    const navigate = useNavigate();

    function handleForm({ value, name }) {
        setForm({
          ...form,
          [name]: value,
        });
      }

      function handleSendForm(e) {
        e.preventDefault();
        createTransaction(form, type, token).then((res) => {
          if (res.status === 401) return alert("Token invalido")
          if (res.status === 400) {
            res.data.forEach((item) => {
              return console.log("Error")
            });
          }
          navigate("/");
        });
      }

    return(
        <>
        <NewTransactions>
        <Form>
        <MainTitle>Nova {type}</MainTitle>

        <Input placeholder="Valor" name="value" type="text"
        onChange={(e) => handleForm({ name: e.target.name, value: e.target.value,})}>
        </Input>
        <Input placeholder="Descrição" name="description" type="text" 
        onChange={(e) => handleForm({ name: e.target.name, value: e.target.value,})}>
        </Input>

        <Button onClick={handleSendForm}>Salvar {type}</Button>    
        </Form>
        </NewTransactions>
        </>
    )
}

const NewTransactions = styled.main`

  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

`;


const Form = styled.form`

  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom:600px;
  
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
