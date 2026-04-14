import { Link } from 'react-router-dom';
import Desempenho from '../images/GestPeople/desempenho.jpg'

function SectionOla(){

  return (
    <section className='bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6 md:px-12 lg:px-24'>
      <div className='max-w-4xl mx-auto text-center'>
        <h1 className='text-5xl md:text-6xl font-bold mb-6'>Welcome To GestPeople</h1>
        <h2 className='text-xl md:text-2xl font-light mb-8 leading-relaxed'>
          A FERRAMENTA QUE TE AJUDA A GERIR O SEU PESSOAL QUANDO E ONDE QUISER.
        </h2>
        <Link to="/departamento/cadastro" className='inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300'>
          Começar
        </Link>
      </div>
    </section>
  );
}

function SectionEquipe(){
  return (
    <section className='py-16 px-6 md:px-12 lg:px-24 bg-white'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          <div className='flex justify-center md:order-2'>
            <img src={Desempenho} alt="Equipe" className='rounded-lg shadow-lg max-w-full h-auto' />
          </div>
          <div className='md:order-1'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-6'>
              Gestão Completa do Pessoal
            </h2>
            <p className='text-lg text-gray-600 leading-relaxed mb-4'>
              A GestPeople permite fazer a gestão do seu pessoal, analisando o desempenho, 
              a responsabilidade, a disponibilidades e outros detalhes importantes para o sucesso da sua equipa.
            </p>
            <p className='text-lg text-gray-600 leading-relaxed'>
              Tenha controlo total sobre o seu recursos humanos com ferramentas intuitivas e relatórios detalhados.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionFuncionalidades() {
  const features = [
    {
      title: 'Desempenho',
      description: 'Acompanhe e avalie o desempenho dos colaboradores em tempo real'
    },
    {
      title: 'Disponibilidade',
      description: 'Gerencie horários, férias e disponibilidade da equipa'
    },
    {
      title: 'Relatórios',
      description: 'Gere relatórios detalhados sobre KPIs e métricas de performance'
    },
    {
      title: 'Acesso Remoto',
      description: 'Aceda à plataforma quando e onde quiser, a qualquer momento'
    }
  ];

  return (
    <section className='py-16 px-6 md:px-12 lg:px-24 bg-gray-50'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-4xl font-bold text-center text-gray-800 mb-12'>
          Funcionalidades Principais
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => (
            <div key={index} className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
              <h3 className='text-xl font-bold text-blue-600 mb-3'>{feature.title}</h3>
              <p className='text-gray-600 text-sm leading-relaxed'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionSobre() {
  return (
    <section className='bg-blue-600 text-white py-16 px-6 md:px-12 lg:px-24'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-4xl font-bold mb-6'>Sobre a GestPeople</h2>
        <p className='text-lg leading-relaxed mb-4'>
          A GestPeople é uma solução inovadora de gestão de recursos humanos, desenvolvida para empresas 
          que querem otimizar a gestão do seu pessoal de forma simples e eficiente.
        </p>
        <p className='text-lg leading-relaxed'>
          Com uma interface amigável e funcionalidades robustas, a GestPeople permite que a sua equipa 
          trabalhe de forma mais produtiva e organizada.
        </p>
      </div>
    </section>
  );
}

function SectionCTA() {
  return (
    <section className='py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-green-500 to-green-600 text-white'>
      <div className='max-w-4xl mx-auto text-center'>
        <h2 className='text-4xl font-bold mb-6'>Pronto para Começar?</h2>
        <p className='text-lg mb-8'>
          Junte-se a centenas de empresas que já utilizam GestPeople para gerir seu pessoal de forma eficiente.
        </p>
        <Link to="/cadastro" className='inline-block bg-white text-green-600 font-bold py-3 px-10 rounded-lg hover:bg-gray-100 transition-colors duration-300'>
          Criar Conta Agora
        </Link>
      </div>
    </section>
  );
}

function Index() {
  
    return (
        <div>
            <SectionOla />
            <SectionEquipe />
            <SectionFuncionalidades />
            <SectionSobre />
            <SectionCTA />
        </div>
    );
}

export default Index