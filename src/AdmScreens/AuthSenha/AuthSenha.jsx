import './AuthSenha.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import api from '../api';
import emailjs from '@emailjs/browser';
import { Context } from '../../Context/Context';
import Swal from 'sweetalert2';

export default function AuthSenha() {
    const [sets, setSets] = useState(null)
    const [rendou, setRendou] = useState(null)
    const [senha, setSenha] = useState(null)
    const [Show, setShow] = useState(true)
    const [indefine, setIndefine] = useState(true)
    const [incoreto, setIncoreto] = useState(false)
    const [trocar, setTrocar] = useState(true)
    const form = useRef();
    const formd = useRef();

    const { dispatch } = useContext(Context)
    // const {isFetching, dispatch } = useContext(Context)

    function aleCod(max, min){
        return Math.floor(Math.random()*(max - min) + min)
    }

    const sendEmail = async(e) => {
        e.preventDefault();
        
        try {
            const codigo = aleCod(100000, 1000000)
            setRendou(codigo)
            var myInput = document.querySelector("#message")
            myInput.value = `Este é o seu código de verificação: , ${codigo}`

            setShow(false)
                
            emailjs.sendForm('service_x1gywkk', 'template_nha5mop', form.current, 'NydSs6yI1bSQuFoaC')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            
        } catch (error) {
            console.log(error)
        }
    }
    const sendEmaild = async(e) => {
        e.preventDefault();
        
        try {

            const { data } = await api.put("/adm", {
                sets:sets
            })

            if(data.valid){
                var myInput = document.querySelector("#messages")
                myInput.value = `A sua última senha cadastrada é: , ${sets}`
    
                setShow(false)
                    
                emailjs.sendForm('service_x1gywkk', 'template_nha5mop', formd.current, 'NydSs6yI1bSQuFoaC')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Senha Alterada!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                window.location.replace("/homeadm");

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
            
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'CÓDIGO CORRETO!',
                showConfirmButton: false,
                timer: 1500
              })
              setTrocar(false)
            // window.location.replace("/homeadm");
        }else{
            setIncoreto(true)
        }
    }

    useEffect(()=>{
        setIndefine(true)
    }, [])

  return (
    <div className='fullContentAuthSenha'>
      {Show ? (
      <div className="contentLogin">
        <div className="imgLogoLogin">
            <img src="./cgadt.png" alt="" className="imageLogg" />
        </div>
        <div className="imgLogoLogin">Solicitação do código de Verificação!</div>
        <div className="textInstrution">Para efetuar a alteração da senha da conta do administrador da plataforma, deve-se primeiro fazer a confirmação do código que será enviado no email do administrador deste site!</div>
        <form className="contentFormLogin" ref={form} onSubmit={sendEmail}>
            <input type="text" className="newTextBocx" />
            <input type="Password" className="newTextBocx" onChange={(e)=>setSets(e.target.value)} />
            {indefine && (<>
            <textarea  id="message" maxLength={2000} placeholder='Sua Mensagem...' name="message" rows="4" cols="50" className='newTextBocx'>
            </textarea>
            </>)}
            <div className="buttDivParaPoderAlinhar">
                <button className='paddinBuuttAuth' value="Send" type="submit">
                    Solicitar código
                    <i className="fa-solid fa-hand-dots marinAuthSenha"></i>
                </button>
            </div>
        </form>
      </div>
      ):(
        <>
        {trocar ? (
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
  
        ):(
          <form className="contentFormLogin" ref={formd} onSubmit={sendEmaild}>
            <input type="text" className="newTextBocx"  />
            <input type="Password" className="newTextBocx" onChange={(e)=>setSets(e.target.value)} />
            {indefine && (<>
            <textarea  id="messages" maxLength={2000} placeholder='Sua Mensagem...' name="message" rows="4" cols="50" className='newTextBocx'>
            </textarea>
            </>)}
            <div className="imgLogoLogin">
                <img src="./cgadt.png" alt="" className="imageLogg" />
            </div>
            <div className="imgLogoLogin">Alteral a senha!</div>
            <div className="oit">
                <input type="text" onChange={(e)=>setSets(e.target.value)} required name="" id="" className="inputTextNameUserAdmA" />
            </div>
            <div className="buttDivParaPoderAlinhar">
                <button className='paddinBuuttAuth' value="Send" type="submit">
                    Salvar Alteração
                    <i className="fa-solid fa-share-from-square marinAuthSenha"></i>
                </button>
            </div>

          </form>
        )}
        </>
      
      )}
    </div>
  )
}
