import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AuthForm from './Authform/Authform'
import AgentList from './components/Agentslist';
import Distributionlist from './components/Distributionlist';
import Addagent from './components/Addagent';

const Approutes = () => {
  return (
    <>
  {/* Routing the all pages  */}
      <Routes>
        <Route path='/' element={<AuthForm/>}/>
        <Route path='/Agentlist' element={<AgentList/>}/>
        <Route path='/Addagent' element={<Addagent/>}/>
        <Route path='/Distributionlist' element={<Distributionlist/>}/>
      </Routes>
    </>
  )
}

export default Approutes
