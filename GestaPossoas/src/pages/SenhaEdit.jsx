import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Back from "../components/Back";
import Processamento from "../components/Processamento";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function SenhaEdit() {
    const navigate = useNavigate();

    const [senhaAtual, setSenhaAtual] = useState("");
    const [senhaNova, setSenhaNova] = useState("");
    const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
    const [processamento, setProcessamento] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showSenhaAtual, setShowSenhaAtual] = useState(false);
    const [showSenhaNova, setShowSenhaNova] = useState(false);
    const [showSenhaConfirmacao, setShowSenhaConfirmacao] = useState(false);

    function validarSenhas() {
        setError("");

        if (!senhaAtual.trim()) {
            setError("Palavra-passe atual é obrigatória.");
            return false;
        }

        if (!senhaNova.trim()) {
            setError("Nova palavra-passe é obrigatória.");
            return false;
        }

        if (senhaNova.length < 6) {
            setError("A nova palavra-passe deve ter no mínimo 6 caracteres.");
            return false;
        }

        if (senhaNova !== senhaConfirmacao) {
            setError("As palavras-passe não correspondem.");
            return false;
        }

        if (senhaAtual === senhaNova) {
            setError("A nova palavra-passe não pode ser igual à atual.");
            return false;
        }

        return true;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validarSenhas()) return;

        setProcessamento(true);
        setError("");
        setSuccess("");

        try {
            const data = {
                current_password: senhaAtual,
                password: senhaNova,
                password_confirmation: senhaConfirmacao
            };

            const response = await api.post("/user/change-password", data);

            if (response.data.sucesso){

                setSuccess(response.data.sucesso);
                setTimeout(() => {
                    navigate("/profile");
                }, 2000);

            }else{

                setError(response.data.erro);

            }

            setSenhaAtual("");
            setSenhaNova("");
            setSenhaConfirmacao("");

        } catch (err) {
            console.error("Erro ao alterar palavra-passe:", err);
            const errorMessage =
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Falha ao alterar a palavra-passe. Verifique os dados e tente novamente.";
            setError(errorMessage);
        } finally {
            setProcessamento(false);
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
            <Back back="/definicoes" />

            <div className="mx-auto w-4/10 px-4 pb-10">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 inline-flex rounded-full bg-blue-100 p-4 text-blue-600">
                        <FaLock className="text-3xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800">Alterar Palavra-Passe</h1>
                    <p className="mt-2 text-sm text-slate-600">Atualize a sua palavra-passe de forma segura</p>
                </div>

                {processamento ? (
                    <Processamento text="A alterar palavra-passe..." />
                ) : null}

                {error ? (
                    <div
                        className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                        role="alert"
                    >
                        {error}
                    </div>
                ) : null}

                {success ? (
                    <div
                        className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                        role="alert"
                    >
                        {success}
                    </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    {/* Palavra-passe Atual */}
                    <div className="space-y-2">
                        <label htmlFor="senhaAtual" className="text-sm font-semibold text-slate-700">
                            Palavra-Passe Atual
                        </label>
                        <div className="relative">
                            <input
                                id="senhaAtual"
                                type={showSenhaAtual ? "text" : "password"}
                                value={senhaAtual}
                                onChange={(e) => setSenhaAtual(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 pr-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="Digite a sua palavra-passe atual"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                            >
                                {showSenhaAtual ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Nova Palavra-Passe */}
                    <div className="space-y-2">
                        <label htmlFor="senhaNova" className="text-sm font-semibold text-slate-700">
                            Nova Palavra-Passe
                        </label>
                        <div className="relative">
                            <input
                                id="senhaNova"
                                type={showSenhaNova ? "text" : "password"}
                                value={senhaNova}
                                onChange={(e) => setSenhaNova(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 pr-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="Digite uma nova palavra-passe"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowSenhaNova(!showSenhaNova)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                            >
                                {showSenhaNova ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <p className="text-xs text-slate-500">Mínimo 6 caracteres</p>
                    </div>

                    {/* Confirmação de Palavra-Passe */}
                    <div className="space-y-2">
                        <label htmlFor="senhaConfirmacao" className="text-sm font-semibold text-slate-700">
                            Confirmar Nova Palavra-Passe
                        </label>
                        <div className="relative">
                            <input
                                id="senhaConfirmacao"
                                type={showSenhaConfirmacao ? "text" : "password"}
                                value={senhaConfirmacao}
                                onChange={(e) => setSenhaConfirmacao(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 pr-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="Confirme a nova palavra-passe"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowSenhaConfirmacao(!showSenhaConfirmacao)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                            >
                                {showSenhaConfirmacao ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() => navigate("/definicoes")}
                            className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Alterar Palavra-Passe
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-xs text-slate-500">
                    A sua palavra-passe é guardada de forma encriptada e segura.
                </p>
            </div>
        </div>
    );
}
