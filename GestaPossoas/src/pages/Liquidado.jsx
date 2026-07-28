import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaSearch, FaUserCircle } from 'react-icons/fa';
import Header from '../components/Header';
import HeadTitle from '../components/HeadTitle';
import Loading from '../components/Loading';
import api from '../api';

function formatCurrency(value) {
  const amount = Number(value || 0);
  return `${amount.toLocaleString('pt-AO')}Kz`;
}

function normalizeList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.pagamentos)) return payload.pagamentos;
  return [];
}

function getMonthKey(value) {
  if (!value) return '';

  const data = new Date(value);
  if (!Number.isNaN(data.getTime())) {
    return `${String(data.getMonth() + 1).padStart(2, '0')}-${data.getFullYear()}`;
  }

  if (typeof value === 'string' && value.match(/^\d{4}-\d{2}/)) {
    return value.slice(0, 7);
  }

  return '';
}

function getUserName(item) {
  const user = item.users || {};
  const firstName = user.first_name || '';
  const lastName = user.last_name || '';
  return [firstName, lastName].filter(Boolean).join(' ').trim() || 'Funcionário';
}

function getUserRole(item) {
  const user = item.users || {};
  return user.funcao?.denominacao || 'Colaborador';
}

function getUserDep(item) {
  const user = item.users || {};
  return user.departamento?.denominacao || 'Departamento';
}

function getUserPhoto(item) {
  const user = item.users || {};
  return user.image || '';
}

export default function Liquidado() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mesSelecionado, setMesSelecionado] = useState('');
  const [indiceInicial, setIndiceInicial] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get('/pagamento');
        setPayments(normalizeList(response.data.pagamento));
        console.log(response.data.pagamento);
      } catch (error) {
        console.error('Erro ao buscar pagamentos:', error?.response?.data || error);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const meses = useMemo(() => {
    const monthKeys = payments
      .map((item) => getMonthKey(item.data))
      .filter(Boolean);

    return [...new Set(monthKeys)].sort().reverse();
  }, [payments]);

  useEffect(() => {
    if (!mesSelecionado && meses.length) {
      setMesSelecionado(meses[0]);
    }
  }, [meses, mesSelecionado]);

  const dadosDoMes = useMemo(() => {
    if (!mesSelecionado) return [];
    return payments.filter((item) => getMonthKey(item.data) === mesSelecionado);
  }, [payments, mesSelecionado]);

  const totalGeral = useMemo(() => {
    return dadosDoMes.reduce(
      (acc, item) => ({
        pago: acc.pago + Number(item.total || 0),
        subsidio: acc.subsidio + Number(item.bonus || 0),
        desconto: acc.desconto + Number(item.desconto || 0),
      }),
      { pago: 0, subsidio: 0, desconto: 0 }
    );
  }, [dadosDoMes]);

  const cardsVisiveis = dadosDoMes.slice(indiceInicial, indiceInicial + 2);

  const avancarCards = () => {
    if (indiceInicial + 2 < dadosDoMes.length) {
      setIndiceInicial((prev) => prev + 1);
    }
  };

  const voltarCards = () => {
    if (indiceInicial > 0) {
      setIndiceInicial((prev) => prev - 1);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-100 px-4 py-24 md:px-8 lg:px-12">
        <div className="mb-6 flex items-center gap-3">
          <Link to="/financeiro" className="rounded-full bg-white p-3 text-slate-700 shadow-sm transition hover:bg-slate-200">
            <FaArrowLeft />
          </Link>
          <HeadTitle text="Pagamentos liquidados" />
        </div>

        <section className="mb-8 grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Total Pago</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">{formatCurrency(dadosDoMes.reduce((sum, item) => sum + Number(item.total || item.valor || item.pago || 0), 0))}</h3>
            <p className="mt-2 text-sm text-slate-500">Total pago no mês selecionado</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Desconto e subsídio</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">{dadosDoMes.length ? `${Math.round((totalGeral.desconto / Math.max(dadosDoMes.length, 1)) * 100) / 100} / ${Math.round((totalGeral.subsidio / Math.max(dadosDoMes.length, 1)) * 100) / 100}` : '0 / 0'}</h3>
            <p className="mt-2 text-sm text-slate-500">Média do período selecionado</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Funcionários com pagamento</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">{dadosDoMes.length}</h3>
            <p className="mt-2 text-sm text-slate-500">Registos para o mês selecionado</p>
          </article>
        </section>

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Pesquisar por mês</h2>
              <p className="text-sm text-slate-500">Veja o total geral e o que cada funcionário recebeu no período selecionado.</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
              <FaSearch className="text-slate-400" />
              <select value={mesSelecionado}
                onChange={(event) => {
                  setMesSelecionado(event.target.value);
                  setIndiceInicial(0);
                }}
                className="bg-transparent text-sm font-semibold text-slate-700 outline-none">
                {meses.map((mes) => (
                  <option key={mes} value={mes}>
                    {mes}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <article className="rounded-2xl bg-slate-900 p-5 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Total pago</p>
              <h3 className="mt-2 text-2xl font-bold">{formatCurrency(totalGeral.pago)}</h3>
            </article>
            <article className="rounded-2xl bg-emerald-600 p-5 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-100">Subsídio</p>
              <h3 className="mt-2 text-2xl font-bold">{formatCurrency(totalGeral.subsidio)}</h3>
            </article>
            <article className="rounded-2xl bg-amber-600 p-5 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-100">Desconto</p>
              <h3 className="mt-2 text-2xl font-bold">{formatCurrency(totalGeral.desconto)}</h3>
            </article>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Último pagamento por funcionário</h2>
              <p className="text-sm text-slate-500">Acompanhe a informação de cada colaborador em cards.</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={voltarCards}
                className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100">
                <FaChevronLeft />
              </button>
              <button
                onClick={avancarCards}
                className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100">
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cardsVisiveis.map((item) => {
              const photo = getUserPhoto(item);
              return (
                <article key={`${item.id || item.user_id}-${item.data}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    {photo ? (
                      <img src={`http://127.0.0.1:8000/storage/${photo}`} alt={getUserName(item)} className="h-14 w-14 rounded-full object-cover" />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                        <FaUserCircle className="text-3xl" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-slate-900">{getUserName(item)}</h3>
                      <h2 className="font-semibold text-slate-700">{getUserDep(item)}</h2>
                      <p className="text-sm text-slate-500">{getUserRole(item)}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600">
                    <p><span className="font-semibold text-slate-900">Último pagamento:</span> {mesSelecionado}</p>
                    <p><span className="font-semibold text-slate-900">Pago:</span> {formatCurrency(item.total || 0)}</p>
                    <p><span className="font-semibold text-slate-900">Subsídio:</span> {formatCurrency(item.bonus || 0)}</p>
                    <p><span className="font-semibold text-slate-900">Desconto:</span> {formatCurrency(item.desconto || 0)}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
