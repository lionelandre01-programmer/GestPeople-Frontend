import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import Back from '../components/Back';
import DivInput from '../components/DivInput';
import DivInputSubmit from '../components/DivInputSubmit';
import Loading from '../components/Loading';
import Processamento from '../components/Processamento';
import HeadTitle from '../components/HeadTitle';
import DivInputReadonly from '../components/DivInputReadonly';

export default function EditSalario(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [salario, setSalario] = useState('');
  const [transporte, setTransporte] = useState('');
  const [alimentacao, setAlimentacao] = useState('');
  const [presenca, setPresenca] = useState('');
  const [desempenho, setDesempenho] = useState('');
  const [loading, setLoading] = useState(true);
  const [processamento, setProcessamento] = useState(false);

  useEffect(() => {
    async function fetchSalario(){
      try{
        const response = await api.get(`/salary/show/${id}`);
        const s = response.data.salario || response.data;
        setSalario(s.salario || '');
        setTransporte(s.transporte || '');
        setAlimentacao(s.alimentacao || '');
        setPresenca(s.presenca || '');
        setDesempenho(s.desempenho || '');
      } catch(error){
        console.error('Erro ao carregar salário:', error?.response?.data || error);
        alert('Erro ao carregar o mapa salarial');
      } finally{
        setLoading(false);
      }
    }

    fetchSalario();
  }, [id]);

  if (loading) return <Loading />;

  async function handleSubmit(e){
    e.preventDefault();
    setProcessamento(true);

    try{
      const data = {
        id,
        salario,
        transporte,
        alimentacao,
        presenca,
        desempenho
      };

      await api.post('/salary/update', data);

      alert('Salário atualizado com sucesso');
      navigate('/salario');

    } catch(error){
      console.error('Erro ao actualizar salário:', error?.response?.data || error);
      alert('Erro ao actualizar salário');
    } finally{
      setProcessamento(false);
    }
  }

  return (
    <>
      <Back back="/salario" />
      <main className="flex-col">
        {processamento ? <Processamento text="Actualizando..."/> : ''}
        <HeadTitle text="Editar Mapa Salarial" />

        <form className="w-7/10 h-85 flex items-center justify-evenly border border-black rounded-lg px-5 flex-wrap" onSubmit={handleSubmit}>
          <DivInput
            className="w-full h-2/11 flex flex-col justify-around font-mono font-bold text-blue-600 pr-85"
            label="salario"
            labelText="Salário Base"
            type="number"
            value={salario}
            placeholder="Insira o valor do salário"
            classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal font-sans"
            onChange={(e) => setSalario(e.target.value)}
          />

          <DivInputReadonly
            className="w-5/11 h-2/11 flex flex-col font-mono font-black"
            label="transporte"
            labelText="Subsídio de Transporte (%)"
            type="number"
            value={transporte}
            classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal"
            onChange={(e) => setTransporte(e.target.value)} 
          />

          <DivInputReadonly
            className="w-5/11 h-2/11 flex flex-col font-mono font-black"
            label="alimentacao"
            labelText="Subsídio de Alimentação (%)"
            type="number"
            value={alimentacao}
            classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal"
            onChange={(e) => setAlimentacao(e.target.value)}
          />

          <DivInputReadonly
            className="w-5/11 h-2/11 flex flex-col font-mono font-black"
            label="presenca"
            labelText="Subsídio de Presenças (%)"
            type="number"
            value={presenca}
            classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal"
            onChange={(e) => setPresenca(e.target.value)}
          />

          <DivInputReadonly
            className="w-5/11 h-2/11 flex flex-col font-mono font-black"
            label="desempenho"
            labelText="Subsídio de Desempenho (%)"
            type="number"
            value={desempenho}
            classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal"
            onChange={(e) => setDesempenho(e.target.value)}
          />

          <DivInputSubmit
            className="w-full h-2/11 flex justify-around font-mono font-black pt-2.5"
            classNameSubmit="w-2/5 h-8/12 border rounded-lg bg-blue-400"
            classNameReset="w-2/5 h-8/12 border rounded-lg bg-red-400"
            submitText="Actualizar" resetText="Limpar"
          />
        </form>
      </main>
    </>
  );
}
