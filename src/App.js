import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Screens/Home/Home';
import Sobre from './Screens/Sobre/Sobre';
import Projeto from './Screens/Projeto/Projeto';
import Atual from './Screens/Atual/Atual';
import Contato from './Screens/Contato/Contato';
import Colaboradores from './Screens/Colaboradores/Colaboradores';
import HomeAdm from './AdmScreens/HomeAdm/HomeAdm';
import SobreAdm from './AdmScreens/SobreAdm/SobreAdm';
import ProjetoAdm from './AdmScreens/ProjetoAdm/ProjetoAdm';
import AtualAdm from './AdmScreens/AtualAdm/AtualAdm';
import ContatoAdm from './AdmScreens/ContatoAdm/ContatoAdm';
import ParceiroAdm from './AdmScreens/ParceiroAdm/ParceiroAdm';
import Login from './AdmScreens/Login/Login';
import { useContext } from 'react';
import {Context} from './Context/Context'
import Single from './Screens/Single/Single';
import AuthSenha from './AdmScreens/AuthSenha/AuthSenha';
import EditLogo from './AdmScreens/EditLogo/EditLogo';


function App() {
  const {user} = useContext(Context);

  return (
    <div className="App">
      <Router>
          <Routes> 
            <Route path="/" element={<Home /> } exact />
            <Route path="/sobre" element={<Sobre /> } exact />
            <Route path="/temas" element={<Projeto /> } exact />
            <Route path="/atualidade" element={<Atual /> } exact />
            <Route path="/atualidade/:id" element={<Single /> } exact />
            <Route path="/contatos" element={<Contato /> } exact />
            <Route path="/parcerias" element={<Colaboradores /> } exact />
            <Route path="/homeadm" element={user ? <HomeAdm /> : <Login /> } exact />
            <Route path="/sobreadm" element={ user ? <SobreAdm /> : <Login /> } exact />
            <Route path="/temaadm" element={ user ? <ProjetoAdm /> : <Login /> } exact />
            <Route path="/atualadm" element={ user ? <AtualAdm /> : <Login /> } exact />
            <Route path="/contatoadm" element={ user ? <ContatoAdm /> : <Login /> } exact />
            <Route path="/parceriasadm" element={ user ? <ParceiroAdm /> : <Login /> } exact />
            <Route path="/login" element={<Login /> } exact />
            <Route path="/authsenha" element={<AuthSenha /> } exact />
            <Route path="/alterar-logo-adm" element={<EditLogo /> } exact />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
