import { useState } from "react";
import '../app.css'
import api from '../api';
import Back from '../components/Back'
import DivInput from "../components/DivInput";
import DivInputDisable from "../components/DivInputDisable";
import DivInputSubmit from "../components/DivInputSubmit";
import HeadTitle from "../components/HeadTitle";
import Processamento from "../components/Processamento";
import Sucesso from "../components/Sucesso";

export default function SalarioCadastro(){
    const [salary, setSalary] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [loading, setLoading] = useState(false);

    const sendSalary = async (data) => {

        try{

            const response = await api.post('/salary/create', data);
            setMensagem(response.data);
            setSalary('');

        }catch(error){

            console.log('Erro ao cadastrar o Salário Base: ',error.response.data);
            
        }finally{

            setLoading(false);
        }

    }

    function getData(e){
        e.preventDefault();

        setLoading(true);

        const data = {
            salario: salary,
            transporte: 25,
            alimentacao: 15,
            presenca: 10,
            desempenho: 10
        }

        sendSalary(data);

    }

    return (
        <>
        <Back back="/salario"/>
        <main className="flex-col">

            {loading && mensagem ? <Processamento text="Processando..."/> 
            : loading ? <Processamento text="Processando..."/> 
            : mensagem ? <Sucesso messege={mensagem}/> : ""}

            <HeadTitle text="Cadastramento De Salários"/>

            <form className="w-7/10 h-85 flex items-center justify-evenly border border-black rounded-lg px-5 flex-wrap" onSubmit={getData}>
                <DivInput
                className="w-full h-2/11 flex flex-col justify-around font-mono font-bold text-blue-600 pr-85"
                label="salario"
                labelText="Salário Base"
                type="number"
                value={salary}
                placeholder="Insira o valor do salário"
                classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                onChange={(e) => setSalary(e.target.value)}
                />

                <DivInputDisable 
                className="w-5/11 h-2/11 flex flex-col font-mono font-black" 
                label="alimenta" 
                text="Subsídio de alimentação" 
                value="15%"
                />

                <DivInputDisable 
                className="w-5/11 h-2/11 flex flex-col font-mono font-black" 
                label="transporta" 
                text="Subsídio de transporte" 
                value="25%"
                />

                <DivInputDisable 
                className="w-5/11 h-2/11 flex flex-col font-mono font-black" 
                label="presencas" 
                text="Subsídio de presenças" 
                value="10%"
                />

                <DivInputDisable 
                className="w-5/11 h-2/11 flex flex-col font-mono font-black" 
                label="desempenhos" 
                text="Subsídio de desempenho" 
                value="10%"
                />

                <DivInputSubmit 
                className="w-full h-2/11 flex justify-around font-mono font-black pt-2.5" 
                classNameSubmit="w-2/5 h-8/12 border rounded-lg bg-blue-400" 
                classNameReset="w-2/5 h-8/12 border rounded-lg bg-red-400" 
                submitText="Cadastrar" resetText="Limpar"
                />

            </form>
        </main>
        </>
    );

}