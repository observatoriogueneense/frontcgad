import React, { useContext } from 'react'
import './Auth.css'
import { Context } from '../../Context/Context'
import { Link } from 'react-router-dom'

export default function Auth() {

    const { dispatch } = useContext(Context)

    const hendSair = ()=>{
        dispatch({type: "LOGOUT"})
    }

  return (
    <div className='fullLoginMenu'>
        <div className="contentLogoutMenu">
            <div className="logoutAdm" onClick={hendSair}>Logout</div>
            <div className="logoutAlterarAdm"><Link to="/authsenha" className='linkAuthSenha'>Alterar senha</Link></div>
        </div>
    </div>
  )
}
