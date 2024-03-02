import React, { useContext, useEffect, useRef, useState } from 'react'
import './Login.css'
import api from '../api';
import emailjs from '@emailjs/browser';
import { Context } from '../../Context/Context';
import Swal from 'sweetalert2';

export default function Login() {
    const [setu, setSetu] = useState(null)
    const [sets, setSets] = useState(null)
    const [adata, setAdata] = useState(null)
    const [rendou, setRendou] = useState(null)
    const [senha, setSenha] = useState(null)
    const [Show, setShow] = useState(true)
    const [indefine, setIndefine] = useState(true)
    const [incoreto, setIncoreto] = useState(false)
    const form = useRef();

    const { dispatch } = useContext(Context)
    // const {isFetching, dispatch } = useContext(Context)

    function aleCod(max, min){
        return Math.floor(Math.random()*(max - min) + min)
    }

    const sendEmail = async(e) => {
        e.preventDefault();
        
        try {
            const {data} = await api.post("/adm/login", {setu, sets})
            console.log(data)
            setAdata(data)
            if(data.token){
                const codigo = aleCod(100000, 1000000)
                setRendou(codigo)
                var myInput = document.querySelector("#message")
                myInput.value = `Este é o seu código de verificação: , ${codigo}`
                console.log(codigo)

                setShow(false)
                // console.log(codigo)
                emailjs.sendForm('service_x1gywkk', 'template_nha5mop', form.current, 'NydSs6yI1bSQuFoaC')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            }else{
                console.log("Falha ao logar...")
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const confirmPass = ()=>{
        setIncoreto(false)
        dispatch({ type: "LOGIN_START"})
        var renderString = rendou.toString()
        if(renderString===senha){
            dispatch({ type: "LOGIN_SUCCESS", payload: adata})
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'LOGIN FEITO COM SUCESSO!',
                showConfirmButton: false,
                timer: 1500
              })
            window.location.replace("/homeadm");
        }else{
            dispatch({ type: "LOGIN_FAILURE"})
            setIncoreto(true)
        }
    }

    useEffect(()=>{
        setIndefine(true)
    }, [])


  return (
    <div className='ContainerLogin'>
      {Show ? (
      <div className="contentLogin">
        <div className="imgLogoLogin">
            <img src="./cgadt.png" alt="" className="imageLogg" />
        </div>
        <div className="imgLogoLogin">Login</div>
        <form className="contentFormLogin" ref={form} onSubmit={sendEmail}>
            <input type="text" className="inputTextNameUserAdmA" onChange={(e)=>setSetu(e.target.value)} placeholder='Usuário...' required />
            <input type="Password" className="inputTextNameUserAdmA" onChange={(e)=>setSets(e.target.value)} placeholder='Senha...' required />
            {indefine && (<>
            <textarea  id="message" maxLength={2000} placeholder='Sua Mensagem...' name="message" rows="4" cols="50" className='newTextBocx'>
            </textarea>
            </>)}
            <div className="buttDivParaPoderAlinhar">
                <button className='paddinBuutt' value="Send" type="submit">
                    <i className="fa-solid fa-right-to-bracket"></i>
                </button>
            </div>
        </form>
      </div>
      ):(
      
      <div className="modalConfirm">
        <div className="textModalconfirm">Digite o Código Enviado</div>
        <div className="textModalconfirmtxt">verifique a caixa de entrada do E-mail!</div>
        <input type="password" className='inpConfirmSenhaModal' maxLength={6} name="" id="" placeholder='Digite o Código...' onChange={(e)=>setSenha(e.target.value)} />
        {incoreto && (<div className="bannnerConfirm">
            <li className='liBaner'>Código incorreto...</li>
        </div>)}
        <div className="buttonTextConfirmModal" onClick={confirmPass}>Confirmar...</div>
        <i className="fa-solid fa-circle-xmark classX"></i>
      </div>
      
      )}
    </div>
  )
}
