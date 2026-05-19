import { useEffect, useState } from "react";
import api from "../api";
import Loading from "../components/Loading";
import Header from "../components/Header";
import FormatarMoeda from "../components/FormatarMoeda";
import Back from "../components/Back";
import FormatarPercentagem from "../components/FormatarPercentagem";
import { useParams } from "react-router-dom";

export default function Pagamento() {
  const [salario, setSalario] = useState('');
  const [salaryTotal, setSalaryTotal] = useState('');
  const [desconto, setDesconto] = useState('');
  const [user, setUser] = useState('');
  const [numFaltas, setNumFaltas] = useState('');
  const [numJustificadas, setNumJustificadas] = useState('');
  const [numAtrasos, setNumAtrasos] = useState('');
  const [numDesemp, setNumDesemp] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchSalaryData = async (id) => {

      try {

        const response = await api.get(`/salary/show/${id}`);
        setSalario(response.data.salario);
        setDesconto(response.data.desconto);
        setUser(response.data.user);
        setSalaryTotal(response.data.salaryTotal);
        setNumFaltas(response.data.faltas);
        setNumJustificadas(response.data.justificadas);
        setNumAtrasos(response.data.atrasos);
        setNumDesemp(response.data.desempenhos);
        console.log(response.data.faltas);

        } catch (error) {

            console.log('Erro ao buscar o mapa salarial: ', error?.response?.data || error);
      
        } finally {

            setLoading(false);
        }

    };

    fetchSalaryData(id);

  }, [id]);

  if (loading) return <Loading />;

  return (
    <>
      <Back back="/salario" />
      <main style={{ padding: '6rem 0' }} className="bg-blue-100">
            <div className="mx-auto mb-10 w-8/12 border border-blue-300 rounded-xl bg-white p-6 font-mono shadow-md">
              <h2 className="mb-4 text-center text-3xl font-bold text-cyan-700 border-b pb-3">Mapa Salarial de {user.first_name} {user.last_name}</h2>

                <div className="mb-4 text-lg text-slate-700">
                  <p><strong>Usuário:</strong>{user.first_name} {user.last_name}</p>
                  <p><strong>Departamento:</strong> {user.departamento.denominacao}</p>
                  <p><strong>Função:</strong> {user.funcao.denominacao} </p>
                </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h3 className="mb-3 text-xl font-semibold text-blue-700">Salário Base</h3>
                  <p className="text-2xl font-black text-red-600"><FormatarMoeda valor={Number(salario.salario) || 0} /></p>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h3 className="mb-3 text-xl font-semibold text-green-700">Salário Final</h3>
                  <p className="text-2xl font-black text-green-700"><FormatarMoeda valor={salaryTotal} /></p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-blue-300 bg-sky-50 p-4">
                  <h3 className="mb-3 text-xl font-semibold text-blue-800">Subsídios</h3>
                  <ul className="space-y-2 text-slate-800">
                    <li>Transporte: <span className="font-bold text-blue-600"><FormatarPercentagem value={salario.transporte} /></span></li>
                    <li>Alimentação: <span className="font-bold text-blue-600"><FormatarPercentagem value={salario.alimentacao} /></span></li>
                    <li>Presenças: <span className="font-bold text-blue-600"><FormatarPercentagem value={salario.presenca} /></span></li>
                    <li>Desempenho: <span className="font-bold text-blue-600"><FormatarPercentagem value={salario.desempenho} /></span></li>
                  </ul>
                </div>

                <div className="rounded-lg border border-red-300 bg-rose-50 p-4">
                  <h3 className="mb-3 text-xl font-semibold text-red-800">Descontos</h3>
                  <ul className="space-y-2 text-slate-800">
                    <li>Faltas: <span className="font-bold text-red-600"><FormatarPercentagem value={desconto.faltas} />/Falta </span></li>
                    <li>Faltas Justificadas: <span className="font-bold text-red-600"><FormatarPercentagem value={desconto.justificadas} /></span></li>
                    <li>Atrasos: <span className="font-bold text-red-600"><FormatarPercentagem value={desconto.atrasos} /></span></li>
                    <li>Mau Desempenho: <span className="font-bold text-red-600"><FormatarPercentagem value={desconto.desempenho} /></span></li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-slate-300 bg-slate-100 p-4">
                  <h3 className="mb-3 text-lg font-semibold">Total de Subsídios</h3>
                  <p className="font-bold text-slate-700"> <FormatarPercentagem value={(Number(salario.transporte) || 0) + (Number(salario.alimentacao) || 0) + (Number(salario.presenca) || 0) + (Number(salario.desempenho) || 0)} /> (
                  <FormatarMoeda valor={(Number(salario.salario) || 0) * (((Number(salario.transporte) || 0) + (Number(salario.alimentacao) || 0) + (Number(salario.presenca) || 0) + (Number(salario.desempenho) || 0)) / 100)} />) </p>
                </div>
                <div className="rounded-lg border border-slate-300 bg-slate-100 p-4">
                  <h3 className="mb-3 text-lg font-semibold">Total de Descontos</h3>
                  <p className="font-bold text-slate-700"><FormatarPercentagem value={(Number(desconto.faltas * numFaltas) || 0) + (Number(desconto.justificadas * numJustificadas) || 0) + (Number(desconto.atrasos * numAtrasos) || 0) + (Number(desconto.desempenho * numDesemp) || 0)} /> (
                  <FormatarMoeda valor={(Number(salario.salario) || 0) * (((Number(desconto.faltas * numFaltas) || 0) + (Number(desconto.justificadas * numJustificadas) || 0) + (Number(desconto.atrasos * numAtrasos) || 0) + (Number(desconto.desempenho * numDesemp) || 0)) / 100)} />)</p>
                </div>
              </div>
            </div>
      </main>
    </>
  );
}
