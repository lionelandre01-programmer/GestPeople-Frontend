import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCoins, FaMoneyBillWave, FaPercent, FaUserShield } from 'react-icons/fa';
import Header from '../components/Header';
import HeadTitle from '../components/HeadTitle';
import Loading from '../components/Loading';
import api from '../api';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

function formatCurrency(value) {
  const amount = Number(value || 0);
  return `Kz ${amount.toLocaleString('pt-AO')}`;
}

function normalizeList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function getMonthKey(value) {
  if (!value) return '';

  const data = new Date(value);
  if (!Number.isNaN(data.getTime())) {
    return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
  }

  if (typeof value === 'string' && value.match(/^\d{4}-\d{2}/)) {
    return value.slice(0, 7);
  }

  return '';
}

export default function Financeiro() {
  const [payments, setPayments] = useState([]);
  const [salaryRules, setSalaryRules] = useState([]);
  const [toPay, setToPay] = useState(0);
  const [desconto, setDesconto] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentsResponse, salaryResponse, descontoResponse] = await Promise.all([
          api.get('/pagamento'),
          api.get('/salary'),
          api.get('/desconto')
        ]);

        setPayments(normalizeList(paymentsResponse.data.pagamento));
        setSalaryRules(normalizeList(salaryResponse.data));
        setToPay(Number(paymentsResponse.data.total));
        setDesconto(Number(descontoResponse.data));
      } catch (error) {
        console.error('Erro ao buscar dados financeiros:', error?.response?.data || error);
        setPayments([]);
        setSalaryRules([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const resumo = useMemo(() => {
    const monthKeys = payments.map((item) => getMonthKey(item.data)).filter(Boolean);
    const orderedMonths = [...new Set(monthKeys)].sort();
    const latestMonth = orderedMonths[orderedMonths.length - 1] || '';
    const previousMonth = orderedMonths[orderedMonths.length - 1] || latestMonth;

    const currentMonthPayments = payments.filter((item) => getMonthKey(item.data) === latestMonth);
    const previousMonthPayments = payments.filter((item) => getMonthKey(item.data) === previousMonth);

    const totalPagoMesPassado = previousMonthPayments.reduce((sum, item) => sum + Number(item.total || 0), 0);
    const totalDescontoMesPassado = previousMonthPayments.reduce((sum, item) => sum + Number(item.desconto || 0), 0);

    const subsidyPercentages = salaryRules
      .map((rule) => Number(rule.transporte || 0) + Number(rule.alimentacao || 0) + Number(rule.presenca || 0) + Number(rule.desempenho || 0))
      .filter((value) => !Number.isNaN(value));

    const averageSubsidio = subsidyPercentages.length
      ? subsidyPercentages.reduce((sum, value) => sum + value, 0) / subsidyPercentages.length
      : 0;

    const discountPercentages = salaryRules
      .map((rule) => Number(rule.desconto || 0))
      .filter((value) => !Number.isNaN(value));

    const averageDesconto = discountPercentages.length
      ? discountPercentages.reduce((sum, value) => sum + value, 0) / discountPercentages.length
      : 0;

    return [
      {
        title: 'Total pago no mês passado',
        value: formatCurrency(totalPagoMesPassado),
        detail: previousMonth ? 'No mês ' + format( new Date(previousMonth), 'MM-yyy', { locale: pt }) : 'Comparado com o mês atual',
        icon: <FaMoneyBillWave className="text-green-600" />,
      },
      {
        title: 'Total que deve ser pago por mês',
        value: formatCurrency(toPay || 0),
        detail: latestMonth ? 'Para ' + format( new Date(latestMonth), 'MM-yyy', { locale: pt }) : 'Previsto para o próximo processamento',
        icon: <FaCoins className="text-blue-600" />,
      },
      {
        title: 'Total de descontos no mês passado',
        value: formatCurrency(totalDescontoMesPassado),
        detail: 'Descontos registados',
        icon: <FaUserShield className="text-amber-600" />,
      },
      {
        title: 'Desconto e subsídio mensal',
        value: `${desconto}% / ${averageSubsidio.toFixed(0)}% (${previousMonthPayments.length}x)`,
        detail: 'Média por funcionário',
        icon: <FaPercent className="text-purple-600" />,
      },
    ];
  }, [payments, salaryRules]);

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-100 px-4 py-24 md:px-8 lg:px-12">
        <HeadTitle text="Resultados financeiros" />

        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Visão financeira</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-800">Resumo de salários e descontos</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Consulte rapidamente os valores pagos no mês anterior, o montante mensal estimado e os impactos de descontos e subsídios.
            </p>
          </div>

          <Link
            to="/liquidado"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            Ver detalhes liquidados
            <FaArrowRight />
          </Link>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {resumo.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                {item.icon}
              </div>
              <h3 className="text-sm font-semibold text-slate-600">{item.title}</h3>
              <p className="mt-3 text-2xl font-bold text-slate-900">{item.value}</p>
              <p className="mt-2 text-sm text-slate-500">{item.detail}</p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
