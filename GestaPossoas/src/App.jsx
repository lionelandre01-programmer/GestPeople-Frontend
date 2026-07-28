import api from './api'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Index from './pages/Index'
import Footer from './components/Footer'
import Cadastro from './pages/Cadastro'
import DepCadastro from './pages/DepCadastro'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Lista from './pages/Lista'
import UpdateUser from './pages/UpdateUser'
import DashBoard from './pages/DashBoard'
import Departamentos from './pages/Departamentos'
import Desempenho from './pages/Desempenho'
import EachDepartamento from './pages/EachDepartamento'
import DepEdit from './pages/DepEdit'
import Funcao from './pages/Funcao'
import FunCadastro from './pages/FunCadastro'
import FunEdit from './pages/FunEdit'
import Presencas from './pages/Presencas'
import PresencaInform from './pages/PresencaInform'
import PresencasRegist from './pages/PresencasRegist'
import Definicoes from './pages/Definicoes'
import SalarioCadastro from './pages/SalarioCadastro'
import Salario from './pages/Salario'
import Pagamento from './pages/Pagamento'
import Messege from './pages/Messege'
import Employees from './pages/Employees'
import EmployeeDetails from './pages/EmployeeDetails'
import SearchEmployee from './pages/SearchEmployee'
import Movimentos from './pages/Movimentos'
import MovimentoDetails from './pages/MovimentoDetails'
import EditEmployeeDetails from './pages/EditEmployeeDetails'
import EditSalario from './pages/EditSalario'
import SenhaEdit from './pages/SenhaEdit'
import Financeiro from './pages/Financeiro'
import Liquidado from './pages/Liquidado'

function Main(){
  return (
    
    <>
      <Header />
        <main>
          <Index />
        </main>
      <Footer />
    </>

  );
}

function App() {

  const navegate = useNavigate();
  const { setUser, setToken } = useAuth();
  const [reload, setReload] = useState(false);

  async function criarDepartamento(data){

    try {
      const response = await api.post('/departamento/create', data);
      console.log('Departamento criado com sucesso:', response.data);
      navegate("/departamentos");
    } catch (error) {
      console.error('Erro ao criar departamento:', error);
    }
  }

  async function cadastrarUser(dados){

    try{
      const response = await api.post('/user/create', dados);
      console.log('Usuário Cadastrado Com Sucesso: ', response.data);
      navegate("/lista");

    } catch (error) {

      console.log('Erro ao cadastrar usuário: ', error.response.data);
    }
  }

  async function fazerLogout() {
    
    try{

      const response = await api.post('/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setToken(null);
      console.log('Logout realizado com sucesso: ', response.data);
      // Redirect to login or home
      window.location.href = '/';

    } catch (error){

      console.log('Erro ao fazer logout: ',error.response.data);
    }
  }

  async function updateUser(data) {
    try {
      const response = await api.post('http://127.0.0.1:8000/api/user/update', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log('Usuário atualizado com sucesso!');
      
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data.user);
      navegate("/profile");

    } catch (error) {

      console.error('Erro ao atualizar usuário:', error.response.data);
    
    }
  }

  async function createFun(dados) {

    try{

      const response = await api.post('/funcao/create', dados);
      console.log('Sucesso: ',response.data);
      navegate("/funcoes");
    
    }catch(error){

      console.log('Erro ao cadastrar função: ',error.response.data);

    }

  }

  async function changeDesempenho(dados)
  {
    try{

      const response = await api.post('/desempenho/create', dados);
      console.log('Secesso: ',response.data);
      setReload(prev => !prev);

    }catch(error){

      console.log('Erro ao cadastrar desempenho: ',error.response.data);

    }
  }

  return (
    
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path="/cadastro" element={<Cadastro onSubmit={cadastrarUser}/>} />
        <Route path="/departamento/cadastro" element={<DepCadastro onSubmit={criarDepartamento}/>} />
        <Route path="/departamento/edit/:id" element={<DepEdit />} />
        <Route path="/profile" element={<Profile onSubmit={fazerLogout}/>} />
        <Route path="/update-user" element={<UpdateUser onSubmit={updateUser}/>} />
        <Route path="/lista" element={<Lista />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/departamentos" element={<Departamentos />} />
        <Route path="/desempenhos" element={<Desempenho onSubmit={changeDesempenho} reload={reload}/>} />
        <Route path="/eachDep/:id" element={<EachDepartamento onSubmit={changeDesempenho} reload={reload}/>} />
        <Route path="/funcoes" element={<Funcao />} />
        <Route path="/definicoes" element={<Definicoes />} />
        <Route path="/senha/edit" element={<SenhaEdit />} />
        <Route path="/presencas" element={<Presencas />} />
        <Route path="/salario" element={<Salario />} />
        <Route path="/salario/edit/:id" element={<EditSalario />} />
        <Route path="/salario/pagamento/:id" element={<Pagamento />} />
        <Route path="/messeges" element={<Messege />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/search" element={<SearchEmployee />} />
        <Route path="/employees/details/:id" element={<EmployeeDetails />} />
        <Route path="/employees/details/edit/:id" element={<EditEmployeeDetails />} />
        <Route path="/movimentos" element={<Movimentos />} />
        <Route path="/movimentos/details/:id" element={<MovimentoDetails />} />
        <Route path="/salario/create" element={<SalarioCadastro />} />
        <Route path="/presencas/information/:id" element={<PresencaInform />} />
        <Route path="/presencas/register" element={<PresencasRegist />} />
        <Route path="/funcoes/create" element={<FunCadastro onSubmit={createFun} />} />
        <Route path="/funcoes/edit/:id" element={<FunEdit />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/liquidado" element={<Liquidado />} />
      </Routes>
    </AuthProvider>
    
  );
  
}

export default App
