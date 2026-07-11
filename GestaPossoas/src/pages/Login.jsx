import { useState } from "react";
import Back from "../components/Back";
import DivInput from "../components/DivInput";
import DivInputSubmit from "../components/DivInputSubmit";
import { Link, useNavigate } from "react-router-dom";
import Processamento from "../components/Processamento";
import api from "../api";

export default function Login(){

    const navegate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [processamento, setProcessamento] = useState(false);

    async function fazerLogin(dados){

        try{

        const response = await api.post('/login', dados);

        if (response.data.user && response.data.token) {
        
            console.log("Login Realizado Com Sucesso!");
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navegate("/");

        }else{

            console.log('Resposta inesperada do servidor: ', response.data);
        }

        } catch (error) {

            console.log('Erro ao fazer login: ', error.response?.data || error.message);
        
        }finally{

            setProcessamento(false);

        }
    }

    function getDados(e){
        e.preventDefault();

        setProcessamento(true);

        const dados = {
            email: email,
            password: password
        }

        fazerLogin(dados);

    }

    return (
        <div className="h-dvh w-full flex flex-col items-center">

            <Back back="/"/>

            {processamento ? <Processamento text="Processando o login..."/> : ""}

            <h2 className="text-center text-4xl text-blue-500 font-bold mt-10">FAZER LOGIN</h2>

            <form className="w-7/12 h-5/12 flex flex-col items-center justify-center border rounded-2xl mb-2 mt-10 py-4" onSubmit={getDados}>
                <DivInput
                className="w-11/12 h-2/6 flex flex-col justify-around font-mono font-black"
                label="eMail"
                labelText="E-MAIL"
                type="email"
                value={email}
                placeholder="Informe Seu E-Mail"
                classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                onChange={(e) => setEmail(e.target.value)}
                />

                <DivInput 
                className="w-11/12 h-2/6 flex flex-col justify-around font-mono font-black" 
                label="passWord" 
                labelText="PALAVRA-PASSE" 
                type="password" 
                value={password} 
                placeholder="Informe Sua Palavra-Passe" 
                classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal font-sans" 
                onChange={(e) => setPassword(e.target.value)}
                />

                <DivInputSubmit 
                className="w-11/12 h-2/7 flex justify-around font-mono font-black pt-2.5" 
                classNameSubmit="w-2/5 h-8/12 border rounded-lg bg-blue-400" 
                classNameReset="w-2/5 h-8/12 border rounded-lg bg-red-400" 
                submitText="Fazer Login" resetText="Cancelar"
                />

            </form>

            <span className="mt-4 text-2xl">Não tem uma conta? &nbsp; 
                <Link to="/cadastro" className="text-blue-700">Cadastrar-se</Link>
            </span>

        </div>
    );

}