import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import Header from "../components/Header";
import HeadTitle from "../components/HeadTitle";
import Loading from "../components/Loading";
import Processamento from "../components/Processamento";

export default function FunEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [resp, setResp] = useState("");
    const [salary, setSalary] = useState("");
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processamento, setProcessamento] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [salaryResponse, funcaoResponse] = await Promise.all([
                    api.get("/salary"),
                    api.get("/funcao")
                ]);

                setSalaries(salaryResponse.data || []);

                const lista = funcaoResponse.data?.funcao || funcaoResponse.data || [];
                const funcao = Array.isArray(lista)
                    ? lista.find((item) => String(item.id) === String(id))
                    : null;

                if (funcao) {
                    setName(funcao.denominacao || "");
                    setResp(funcao.responsabilidade || "");
                    setSalary(funcao.salary_id || funcao.salary?.id || "");
                } else {
                    setError("Não foi possível encontrar a função selecionada.");
                }
            } catch (err) {
                console.error("Erro ao carregar dados da função:", err);
                setError("Não foi possível carregar os dados da função.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    async function handleSubmit(motivo) {
        
        setProcessamento(true);
        setError("");

        try {

            const data = {
                id: id,
                motivo: motivo,
                denominacao: name,
                salary_id: salary,
                responsabilidade: resp
            };

            await api.post('/funcao/update', data);
            navigate("/funcoes");

        } catch (err) {
            console.error("Erro ao actualizar a função:", err);
            setError("Não foi possível actualizar a função.");

        } finally {
            setProcessamento(false);
        }
    }

    function send(e){
        e.preventDefault();

        if (!name) return;

        const motivo = prompt("Porquê deseja alterar?");

        if (motivo !== null && motivo !== ""){
            handleSubmit(motivo);
        }

    }

    if (loading) return <Loading />;

    return (
        <>
            <Header />
            <main style={{ flexDirection: "column", padding: "6rem 0" }}>
                {processamento ? <Processamento text="A actualizar a função..." /> : null}
                <HeadTitle text="EDITAR FUNÇÃO" />

                {error ? (
                    <div className="mx-auto mb-4 w-8/12 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                        {error}
                    </div>
                ) : null}

                <form className="mx-auto mb-2 flex w-8/12 flex-col items-center justify-center rounded-2xl border pt-3" onSubmit={send}>
                    <div className="w-11/12 flex-1 flex flex-col gap-2 font-mono font-black pt-2">
                        <label htmlFor="nome">Denominação</label>
                        <select
                            id="nome"
                            className="w-full h-10 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                            <option value="">Selecione uma função...</option>
                            <option value="Gestor">Gestor</option>
                            <option value="Director">Director De Departamento</option>
                            <option value="Funcionário">Funcionário Simples</option>
                        </select>
                    </div>

                    <div className="w-11/12 flex-1 flex flex-col gap-2 font-mono font-black pt-2">
                        <label htmlFor="responsabilidade">Responsabilidade</label>
                        <input
                            id="responsabilidade"
                            type="text"
                            value={resp}
                            onChange={(e) => setResp(e.target.value)}
                            className="w-full h-10 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                            placeholder="Responsabilidade desta função"
                            required
                        />
                    </div>

                    <div className="w-11/12 flex-1 flex flex-col gap-2 font-mono font-black pt-2">
                        <label htmlFor="salario">Pagamento Mensal</label>
                        <select
                            id="salario"
                            className="w-4/10 border-b border-blue-500 text-blue-500"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        >
                            {salaries.map((sal) => (
                                <option key={sal.id} value={sal.id}>
                                    {sal.salario}kz
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-11/12 flex-1 flex justify-around font-mono font-black pt-2.5">
                        <button
                            type="button"
                            className="w-2/5 h-10 border rounded-lg bg-red-400"
                            onClick={() => navigate("/funcoes")}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="w-2/5 h-10 border rounded-lg bg-blue-400">
                            Guardar
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}
