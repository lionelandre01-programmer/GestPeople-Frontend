import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DivInput from '../components/DivInput';
import DivSelect from '../components/DivSelect';
import DivInputSubmit from '../components/DivInputSubmit';
import Loading from '../components/Loading';

export default function UpdateUser(props) {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [morada, setMorada] = useState(user?.morada || '');
  const [genero, setGenero] = useState(user?.genero || '');
  const [nascimento, setNascimento] = useState(user?.nascimento || '');
  const [departamento, setDepartamentoId] = useState(user?.departamento?.id || '');
  const [funcao, setFuncaoId] = useState(user?.funcao?.id || '');
  const [photo, setPhoto] = useState(user?.image || null);
  const [departamentos, setDepartamentos] = useState([]);
  const [funcoes, setFuncoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const depResponse = await api.get('/departamento/get');
        const funResponse = await api.get('/funcao/get');
        setDepartamentos(depResponse.data);
        setFuncoes(funResponse.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('morada', morada);
    formData.append('nascimento', nascimento);
    formData.append('genero', genero);
    formData.append('departamento_id', departamento);
    formData.append('funcao_id', funcao);

    if (photo) {
      formData.append('image', photo);
    }

    props.onSubmit(formData);
    
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Editar Perfil</h1>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <DivInput
                className="w-full"
                label="firstName"
                labelText="Primeiro Nome"
                type="text"
                value={firstName}
                placeholder="Primeiro Nome"
                classNameInput="w-full h-10 rounded-lg border border-gray-300 px-4"
                onChange={(e) => setFirstName(e.target.value)}
              />
              
              <DivInput
                className="w-full"
                label="lastName"
                labelText="Último Nome"
                type="text"
                value={lastName}
                placeholder="Último Nome"
                classNameInput="w-full h-10 rounded-lg border border-gray-300 px-4"
                onChange={(e) => setLastName(e.target.value)}
              />
              
              <DivInput
                className="w-full"
                label="email"
                labelText="Email"
                type="email"
                value={email}
                placeholder="Email"
                classNameInput="w-full h-10 rounded-lg border border-gray-300 px-4"
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <DivInput
                className="w-full"
                label="phone"
                labelText="Telefone"
                type="text"
                value={phone}
                placeholder="Telefone"
                classNameInput="w-full h-10 rounded-lg border border-gray-300 px-4"
                onChange={(e) => setPhone(e.target.value)}
              />
              
              <DivInput
                className="w-full"
                label="morada"
                labelText="Morada"
                type="text"
                value={morada}
                placeholder="Morada"
                classNameInput="w-full h-10 rounded-lg border border-gray-300 px-4"
                onChange={(e) => setMorada(e.target.value)}
              />
              
              <DivSelect
                className="w-full h-1/6 flex flex-col justify-around font-mono"
                label="sexo" 
                value={genero}
                onChange={(e) => setGenero(e.target.value)} 
                labelText="Seu Gênero" 
                options={['Indefinido','Masculino', 'Feminino']}
                classNameInput="w-full h-10 rounded-lg border border-gray-300 px-4 py-2"
              />

              <DivInput
                className="w-full"
                label="nascimento"
                labelText="Data de Nascimento"
                type="date"
                value={nascimento}
                classNameInput="w-full h-10 rounded-lg border border-gray-300 px-4"
                onChange={(e) => setNascimento(e.target.value)}
              />
              
              <div>
                <label htmlFor="dep">Departamento</label>
                <select id='dep' onChange={(e) => setDepartamentoId(e.target.value)} className="w-full h-10 rounded-lg border border-gray-300 px-4">
                    {departamentos.map(d => (
                        <option key={d.id} value={d.id}>
                        {d.denominacao}
                        </option>
                    ))}
                </select>
              </div>
                
              
              <div>
                <label htmlFor="fun">Cargo</label>
                <select id='fun' onChange={(e) => setFuncaoId(e.target.value)} className="w-full h-10 rounded-lg border border-gray-300 px-4">
                    {funcoes.map(f => (
                        <option key={f.id} value={f.id}>
                        {f.denominacao}
                        </option>
                    ))}
                </select>
              </div>
              
              
              <div className="w-full">
                <label htmlFor="photo">Foto do Perfil</label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  className="w-full h-10 rounded-lg border border-gray-300 px-4"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                {user?.image && (
                  <img src={`http://127.0.0.1:8000/storage/${user.image}`} alt="Foto atual" className="mt-2 w-20 h-20 rounded-full" />
                )}
              </div>
            </div>
            
            <DivInputSubmit
              className="w-full flex justify-center"
              classNameSubmit="w-1/3 h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg"
              classNameReset="w-1/3 h-10 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg ml-4"
              submitText="Atualizar"
              resetText="Cancelar"
            />
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
