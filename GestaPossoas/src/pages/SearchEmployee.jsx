import { useState } from "react";
import { FaBuilding, FaChartLine, FaMoneyBillWave, FaSearch, FaUser } from "react-icons/fa";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import api from "../api";
import Header from "../components/Header";
import HeadTitle from "../components/HeadTitle";
import Loading from "../components/Loading";
import FormatarMoeda from "../components/FormatarMoeda";

export default function SearchEmployee() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = async (data) => {

    try {
      
        const response = await api.post('/user/get', data);

        const employeeData = response.data;

        setResult({
            employee: employeeData,
            salario: employeeData.funcao.salario || null,
            desempenho: employeeData.ult_desempenho || [],
        });

    } catch (err) {

      console.error("Erro ao buscar funcionário:", err);
      setError("Nenhum funcionário encontrado com esses dados.");

    } finally {
      setLoading(false);
    }
  };

  function getData(e){
    e.preventDefault();

    const value = query.trim();

    if (!value) {
      setError("Informe o nome ou o código do funcionário.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    if (/^\d+$/.test(value)){

        const data = {
            id: Number(value)
        }

        handleSearch(data);

    }else{

        const [nome, sobre] = value.split(" ");

        if (sobre){
            
            const data = {
                id: 0,
                first_name: nome,
                last_name: sobre
            }

            handleSearch(data);
        
        }else{
            setError("Informe o nome e o sobrenome do funcionário.");
            setLoading(false);
            setResult(null);
        }

    }

  }

  const employee = result?.employee;
  const salario = result?.salario;
  const desempenho = result?.desempenho || [];
  const latestPerformance = desempenho;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 px-6 py-24 md:px-12 lg:px-24">
        <HeadTitle text="Buscar Funcionário" />

        <section className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <form onSubmit={getData} className="space-y-4">
            <label className="block text-lg font-semibold text-slate-700" htmlFor="searchEmployee">
              Pesquise pelo nome ou pelo código do funcionário
            </label>
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                id="searchEmployee"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ex.: João Silva ou 15"
                className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-lg outline-none ring-0 focus:border-blue-500"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                <FaSearch />
                Buscar
              </button>
            </div>
            <p className="text-sm text-slate-500">
              Digite o nome completo ou o código de identificação para localizar o colaborador.
            </p>
          </form>

          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="mt-8">
              <Loading />
            </div>
          ) : result ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr]">
              <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    {employee?.image ? (
                      <img
                        src={`http://127.0.0.1:8000/storage/${employee.image}`}
                        alt={employee.first_name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-3xl" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {employee?.first_name} {employee?.last_name || ""}
                    </h2>
                    <p className="text-slate-600">Código: {employee?.id}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-800">
                      <FaUser /> Dados pessoais
                    </h3>
                    <ul className="space-y-2 text-xl">
                      <li><span className="font-semibold text-slate-700">Telefone:</span> {employee?.phone || "Não informado"}</li>
                      <li><span className="font-semibold text-slate-700">E-mail:</span> {employee?.email || "Não informado"}</li>
                      <li><span className="font-semibold text-slate-700">Gênero:</span> {employee?.genero || "Não informado"}</li>
                      <li><span className="font-semibold text-slate-700">Endereço:</span> {employee?.morada || "Não informado"}</li>
                      <li>
                        <span className="font-semibold text-slate-700">Nascimento:</span>{" "}
                        {employee?.nascimento ? format(new Date(employee.nascimento), "dd/MM/yyyy", { locale: pt }) : "Não informado"}
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-800">
                      <FaBuilding /> Departamento e função
                    </h3>
                    <ul className="space-y-2 text-xl">
                        <li><span className="font-semibold text-slate-700">Departamento:</span> {employee?.departamento?.denominacao || "Não informado"}</li>
                        <li><span className="font-semibold text-slate-700">Função:</span> {employee?.funcao?.denominacao || "Não informada"}</li>
                        <li><span className="font-semibold text-slate-700">Responsabilidade:</span> {employee?.funcao?.responsabilidade || "Não informada"}</li>
                        <li><span className="font-semibold text-slate-700"><FaMoneyBillWave /> Salário: </span><FormatarMoeda valor={(
                            ((salario.transporte + salario.alimentacao + salario.desempenho + salario.presenca) / 100) * salario.salario) + parseInt(salario.salario)} />
                        </li>
                    </ul>
                  </div>
                </div>
              </article>

              <div className="space-y-4">

                <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-800">
                    <FaChartLine /> Nível de desempenho
                  </h3>
                  {latestPerformance && latestPerformance.nivel > 0 ? (
                    <div className="space-y-3">
                      <p className="text-sm text-slate-600">
                        Último registro: <span className="font-semibold text-slate-800">{latestPerformance.nivel || 0}%</span>
                      </p>
                      <div className="h-5 overflow-hidden rounded-lg bg-slate-200">
                        <div
                          className="h-full bg-emerald-500" id={latestPerformance > 40 ? "bg-blue":"bg-red"}
                          style={{ width: `${Math.min(100, Number(latestPerformance.nivel) || 0)}%` }}
                        />
                      </div>
                      <p className="text-sm text-slate-500">
                        {"Nenhuma observação registrada."}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-600">Nenhum desempenho registrado para este funcionário.</p>
                  )}
                </article>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
              Use a busca acima para localizar um colaborador e visualizar seus dados completos.
            </div>
          )}
        </section>
      </main>
    </>
  );
}
