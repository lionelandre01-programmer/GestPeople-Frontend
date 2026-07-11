import { useEffect, useState } from "react";
import Header from "../components/Header";
import HeadTitle from "../components/HeadTitle";
import DivInput from "../components/DivInput";
import DivSelect from "../components/DivSelect";
import DivInputSubmit from "../components/DivInputSubmit";
import Loading from "../components/Loading";
import api from "../api";
import Processamento from "../components/Processamento";

export default function FunCadastro(props){
    const [name, setName] = useState('');
    const [resp, setResp] = useState('');
    const [salary, setSalary] = useState('');
    const [salaries, setSalaries] = useState('');
    const [loading, setLoading] = useState(true);
    const [processamento, setProcessamento] = useState(false);

    useEffect(() => {

        const fetchSalary = async () => {

            try{

                const response = await api.get('/salary');
                console.log(response.data);
                setSalaries(response.data);

            } catch (error) {

                console.log("Erro ao trazer os salários: ",error.response.data);

            } finally {

                setLoading(false);

            }

        }

        fetchSalary();

    }, []);

    if (loading) return <Loading />;

    function getDados(e){
        e.preventDefault();

        if (name){

        setProcessamento(true);
        const dados = {
            denominacao: name,
            responsabilidade: resp,
            salary_id: salary
        }
        
        props.onSubmit(dados);

        }

    }

    return (
        <>
            <Header/>
            <main style={{ flexDirection: "column", padding: "6rem 0" }}>
                {processamento ? <Processamento text="Processando o cadastro..."/> : ""}
                <HeadTitle text="CADASTRO DE FUNÇÃO"/>
                <form className="w-8/12 flex-1 flex flex-col items-center justify-center border rounded-2xl mb-2 pt-3" onSubmit={getDados}>

                    <div className="w-11/12 flex-1 flex flex-col gap-2 font-mono font-black pt-2">
                        <label htmlFor="nome">Denominação</label>
                        <select id="nome" className="w-full h-10 rounded-lg border border-gray-300 px-4 font-normal font-sans" 
                        onChange={(e) => setName(e.target.value)}>
                            <option>Selecione uma função...</option>
                            <option value="Gestor">Gestor</option>
                            <option value="Director">Director De Departamento</option>
                            <option value="Funcionário">Funcionário Simples</option>
                        </select>
                    </div>

                    <DivInput
                    className="w-11/12 flex-1 flex flex-col gap-2 font-mono font-black"
                    label="respon"
                    labelText="Responsabilidade"
                    type="text"
                    value={resp}
                    placeholder="Responsabilidade desta função"
                    classNameInput="w-full h-10 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                    onChange={(e) => setResp(e.target.value)}
                    />

                    <div className="w-11/12 flex-1 flex flex-col gap-2 font-mono font-black">
                        <label htmlFor="salario">Pagamento Mensal</label>
                        <select className="w-4/10 border-b border-blue-500 text-blue-500" id="salario" onChange={(e) => setSalary(e.target.value)}>
                            {salaries.map(sal => (

                                <option key={sal.id} value={sal.id}>{sal.salario}kz</option>

                            ))}
                        </select>
                    </div>

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