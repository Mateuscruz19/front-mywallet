import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../Contexts/AuthContext";
import { RefreshContext } from "../Contexts/RefreshContext";
import { findAllTransactions } from "../services/transactions";


export default function Home() {

  const [transactions, setTransactions] = useState([]);
  const { Token, setToken,user, setUser } = useContext(AuthContext);
  const { refresh } = useContext(RefreshContext);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

    // Funcao de carregar as transações.

   async function getTransactions() {

     if (!Token) {
       navigate("/signin");
     }

   const promisse = await findAllTransactions(Token);
    if (promisse.status === 401) {
      alert("Token inválido, faça o login novamente!")
      setTimeout(() => {
        navigate("/signin");
      }, 900);
    }
    setUser(promisse.data.user);
    setTransactions(promisse.data.transactions);

    let total = 0;
    promisse.data.transactions.forEach((t) => {
      if (t.type === "entrada") {
        total += Number(t.value);
      } else {
        total -= Number(t.value);
      }
    });

    console.log(promisse)
     setTotal(total);
   }

     // Função de limpeza de token
    function Leave() {
        setToken("");
        navigate("/signin");
      }

      // Função que troca a tela de nova transição para tela correta dependendo do type.
      function newTransaction(type) {
        navigate(`transactions/${type}`);
      }

      // Recarrega as mensagens a cada atualização

       useEffect(() => {
         getTransactions();
       }, [refresh]);
    

    return(
        <>
        <HomeStyled>
        <header>
            <h1>Olá,{user.name}</h1>
            <ion-icon name="log-out-outline" onClick={Leave}></ion-icon>
        </header>

        <div>
            <Transactions>
            <ul>
            {transactions.map((t, index) => (
              <li key={index}>
                <div>
                  <span>{t.createdAt.substr(0, 5)}</span>
                  <strong>{t.description}</strong>
                </div>
                <Value color={t.type}>R$ {t.value}</Value>
              </li>
            ))}
          </ul>
                <article>
                    <span>Saldo </span>
                    <span>R$: {total}</span>
                </article>
            </Transactions>
            <section>
            <Button onClick={() => newTransaction("entrada")}>
            <p>Nova Entrada</p>
          </Button>
          <Button onClick={() => newTransaction("saida")}><p>Nova Saída</p></Button>
            </section>
        </div>
        </HomeStyled>
        </>
    )
}









const HomeStyled = styled.main`

    background-color: #8c11be;
    padding:15px;

    header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 1rem;
    h1 {
        margin-top:10px;
        font-size: 35px;
        font-weight: 700;
    }

    ion-icon {
        font-size: 37px;
        margin-top:10px;
    }
    }

    section {
    display: flex;
    align-items: center;
    justify-content: space-around;
    }

    span{
        color: #868686;
    }

`;

const Button = styled.button`

    border-radius: 9px;
    background-color: #a328d6;
    padding: 15px;
    font-size: 18px;
    margin-top: 15px;
    font-weight: 600;
    color: #FFFFFF;
    width: 155px;
    height: 114px;
    outline: none;
    border: none;
    cursor: pointer;

    p{
        margin-top:70px;
    }

`;

const Transactions = styled.article`

    height: 600px;
    background-color: #000;
    color: #FFF;
    border-radius: 0.3rem;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;
    }
    ul li div span {
    color: #c6c6c6;
    margin-right: 0.7rem;
    }

    article{
    font-size: 1.3rem;
    display: flex;
    justify-content: space-between;
    }
    
`;

const Value = styled.div`
color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`;
