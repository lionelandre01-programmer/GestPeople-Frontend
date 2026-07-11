import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import Back from "../components/Back";
import Loading from "../components/Loading";
import Processamento from "../components/Processamento";

export default function DepEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [denominacao, setDenominacao] = useState("");
    const [responsabilidade, setResponsabilidade] = useState("");
    const [loading, setLoading] = useState(true);
    const [processamento, setProcessamento] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDepartamento = async () => {
            try {
                const response = await api.get(`/departamento/each/${id}`);
                const departamento = response.data?.dep;

                setDenominacao(departamento.denominacao || "");
                setResponsabilidade(departamento.responsabilidade || "");
            } catch (err) {
                console.error("Erro ao carregar departamento:", err);
                setError("Não foi possível carregar os detalhes do departamento.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDepartamento();
        }
    }, [id]);

    

    async function handleSubmit(motivo) {
        
        setProcessamento(true);
        setError("");

        try {

            const data = {
                id: id,
                motivo: motivo,
                denominacao,
                responsabilidade
            };

            await api.post('/departamento/update', data);
            navigate("/departamentos");

        } catch (err) {
            console.error("Erro ao actualizar o departamento:", err);
            setError("Não foi possível actualizar o departamento.");

        } finally {
            setProcessamento(false);
        }
    }

    function send(e){
        e.preventDefault();
            
        const motivo = prompt("Porquê deseja alterar?");

        if (motivo !== null && motivo !== ""){
            handleSubmit(motivo);
        }

    }

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-slate-50">
            <Back back="/departamentos" />

            <div className="max-w-3xl mx-auto px-4 pb-10">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-600">EDITAR DEPARTAMENTO</h1>
                    <p className="text-sm text-gray-600">Atualize os dados do departamento selecionado.</p>
                </div>

                {processamento ? <Processamento text="A actualizar o departamento..." /> : null}

                {error ? (
                    <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                        {error}
                    </div>
                ) : null}

                <form onSubmit={send} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="denome" className="text-sm font-semibold text-slate-700">Denominação</label>
                        <input
                            id="denome"
                            type="text"
                            value={denominacao}
                            onChange={(e) => setDenominacao(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Ex.: Recursos Humanos"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="responsable" className="text-sm font-semibold text-slate-700">Responsabilidade</label>
                        <input
                            id="responsable"
                            type="text"
                            value={responsabilidade}
                            onChange={(e) => setResponsabilidade(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Ex.: Gestão de colaboradores"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() => navigate("/departamentos")}
                            className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Guardar alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
