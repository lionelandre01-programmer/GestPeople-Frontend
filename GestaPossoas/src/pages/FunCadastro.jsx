import { useState } from "react";
import Header from "../components/Header";
import HeadTitle from "../components/HeadTitle";
import DivInput from "../components/DivInput";
import DivInputSubmit from "../components/DivInputSubmit";

export default function FunCadastro(props){
    const [name, setName] = useState('');
    const [resp, setResp] = useState('');
    const [salary, setSalary] = useState('');

    function getDados(e){
        e.preventDefault();

        const dados = {
            denominacao: name,
            responsabilidade: resp,
            salario: salary
        }

        props.onSubmit(dados);

    }

    return (
        <>
            <Header/>
            <main style={{ flexDirection: "column", padding: "6rem 0" }}>
                <HeadTitle text="CADASTRO DE FUNÇÃO"/>
                <form className="w-8/12 flex-1 flex flex-col items-center justify-center border rounded-2xl mb-2 pt-3" onSubmit={getDados}>

                    <DivInput
                    className="w-11/12 flex-1 flex flex-col gap-2 font-mono font-black pt-2"
                    label="denominacao"
                    labelText="Denominação"
                    type="text"
                    value={name}
                    placeholder="Denomine a função"
                    classNameInput="w-full h-8 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                    onChange={(e) => setName(e.target.value)}
                    />

                    <DivInput
                    className="w-11/12 flex-1 flex flex-col gap-2 font-mono font-black"
                    label="respon"
                    labelText="Responsabilidade"
                    type="text"
                    value={resp}
                    placeholder="Responsabilidade desta função"
                    classNameInput="w-full h-8 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                    onChange={(e) => setResp(e.target.value)}
                    />

                    <DivInput
                    className="w-11/12 flex-1 flex flex-col gap-2 font-mono font-black"
                    label="salario"
                    labelText="Pagamento Mensal"
                    type="number"
                    value={salary}
                    placeholder="Salário Mensal"
                    classNameInput="w-full h-8 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                    onChange={(e) => setSalary(e.target.value)}
                    />

                    <DivInputSubmit 
                    className="w-11/12 flex-1 flex justify-around font-mono font-black pt-2.5" 
                    classNameSubmit="w-2/5 h-8 border rounded-lg bg-blue-400" 
                    classNameReset="w-2/5 h-10 border rounded-lg bg-red-400" 
                    submitText="Cadastrar" resetText="Limpar"
                    />

                </form>
            </main>
        </>
    );

}