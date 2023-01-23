import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Transactions from "./components/Transaction";
import RefreshProvider from "./Contexts/RefreshContext";
import { GlobalStyle } from "./globalStyles";
import AuthProvider from "./Contexts/AuthContext";
import Teste from "./components/Teste";

export default function App() {
  return (<>
      <GlobalStyle />
      <RefreshProvider>
        <BrowserRouter>
         <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/teste" element={<Teste />} />
            <Route path="/transactions/:type" element={<Transactions />} />
          </Routes>
          </AuthProvider>
        </BrowserRouter>
      </RefreshProvider>
      </>)}
