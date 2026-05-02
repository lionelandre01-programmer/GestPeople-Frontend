import { useState } from "react";
import Back from "../components/Back";
import DivInput from "../components/DivInput";
import DivInputSubmit from "../components/DivInputSubmit";
import { Link } from "react-router-dom";

export default function Login(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function getDados(e){
        e.preventDefault();

        const dados = {
            email: email,
            password: password
        }

        props.onSubmit(dados);

    }

    return (
        <div className="h-dvh w-full flex flex-col items-center">

            <Back back="/"/>

            <h2 className="text-center text-2xl text-blue-500 font-bold">FAZER LOGIN</h2>

            <form className="w-7/12 h-6/12 flex flex-col items-center justify-center border rounded-2xl mb-2 mt-4 py-4" onSubmit={getDados}>
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

            <span className="mt-4">Não tem uma conta? &nbsp; 
                <Link to="/cadastro" className="text-blue-700">Cadastrar-se</Link></span>

        </div>
    );

}