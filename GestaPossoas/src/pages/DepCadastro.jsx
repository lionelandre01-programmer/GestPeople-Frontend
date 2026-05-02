import { useState } from "react";
import Back from "../components/Back";

export default function DepCadastro({ onSubmit }){
    const [denominacao, setDenominacao] = useState('');
    const [responsabilidade, setResponsabilidade] = useState('');

    function getDate(e){

        e.preventDefault();

        const data = {
            denominacao: denominacao,
            responsabilidade: responsabilidade
        };


        onSubmit(data);
    }

    return (
        <div className="w-dvw h-dvh flex flex-col items-center">
            <Back back="/departamentos"/>
            <h1 className="font-bold text-blue-300 text-2xl mb-3">CADASTRAMENTO DE DEPARTAMENTO</h1>
            <form className="w-1/2 border rounded-2xl flex flex-col h-1/2 p-8" onSubmit={getDate}>
                <div className="w-full h-1/3 flex flex-col gap-1">
                    <label htmlFor="denome" className="text-1xl font-normal">Denominação</label>
                    <input type="text" value={denominacao}  id="denome" 
                    className="border h-1/2 rounded-lg px-2" onChange={(e) => setDenominacao(e.target.value)}/>
                </div>

                <div className="w-full h-1/3 flex flex-col gap-1">
                    <label htmlFor="responsable">Responsabilidade</label>
                    <input type="text" value={responsabilidade} id="responsable" 
                    className="border h-1/2 rounded-lg px-2" onChange={(e) => setResponsabilidade(e.target.value)}/>
                </div>

                <div className="w-full h-1/3 flex items-center justify-evenly px-1">
                    <button type="submit" className="border py-3 px-10 rounded-lg bg-blue-100">Cadastrar</button>
                    <button type="reset" className="border py-3 px-10 rounded-lg bg-red-100">Cancelar</button>
                </div>
            </form>
        </div>
    );
}