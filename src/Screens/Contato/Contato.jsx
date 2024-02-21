import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contato.css'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'
import Humburguer from '../../Components/Humburguer/Humburguer'
import ReCAPTCHA from "react-google-recaptcha";
import Swal from 'sweetalert2';
import SubFooter from '../../Components/SubFooter/SubFooter';
import Footer from '../../Components/Footer/Footer';
import api from '../../AdmScreens/api';

export default function Contato() {
    const [contact, setContact] = useState({})
    const  [status, setStatus] = useState(false)
    const form = useRef();

    const getData = async ()=>{
        try {
            const ress = await api.get("/contato")
            setContact(ress.data[0])
        } catch (error) {}
    }

    
    useEffect(()=>{
        getData()
    }, [])

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_x1gywkk', 'template_nha5mop', form.current, 'NydSs6yI1bSQuFoaC')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Mensagem enviada com Sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          window.location.replace("/contatos");
    };

    function onChange(value) {
        if(value){
            setStatus(true)
        }else{
            setStatus(false)
        }
    }

    const Facebook  = (data)=>{
        console.log(data)
        window.open(`${data}`)
    }
    
  return (
    <div className='Contato'>
      <Header />
      <Menu />
      <Humburguer />
      <div className="contactosContentPage">
        <div className="fullRed">
            <div className="telContent">
                <div className="TitleRed">CONTACTOS:</div>
                <div className="ItemTelRed">
                    <div className="descItemTelRed">
                        <i className="fa-solid fa-location-dot sizeRedIcon"></i>
                        <div className="descTitleRedTell">
                            <div className="TitleTelItemRed">Endereço</div>
                            <div className="EnderecoItemTellRed">{contact.endereco}</div>
                        </div>
                    </div>
                    <div className="descItemTelRed">
                        <i className="fa-solid fa-mobile-screen-button sizeRedIcon"></i>
                        <div className="descTitleRedTell">
                            <div className="TitleTelItemRed">Telefones</div>
                            <div className="EnderecoItemTellRed">{contact.cell}</div>
                        </div>
                    </div>
                    <div className="descItemTelRed">
                        <i className="fa-regular fa-envelope sizeRedIcon"></i>
                        <div className="descTitleRedTell">
                            <div className="TitleTelItemRed">E-mail</div>
                            <div className="EnderecoItemTellRed">{contact.email}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="RedContent">
                <div className="TitleFacebookRed">ESTAMOS NA REDE:</div>
                <div className="midiasSociasRed">
                    <i className="fa-brands fa-square-facebook iconsocRed" onClick={()=>Facebook(contact.facebook)}></i>
                    <div className="tracoRed"></div>
                    <i className="fa-brands fa-twitter iconsocRed" onClick={()=>Facebook(contact.twitter)}></i>
                    <div className="tracoRed"></div>
                    <i className="fa-brands fa-square-instagram iconsocRed" onClick={()=>Facebook(contact.instagram)}></i>
                    <div className="tracoRed"></div>
                    <i className="fa-brands fa-youtube iconsocRed" onClick={()=>Facebook(contact.youtube)}></i>
                </div>
                <div className="divTextRed">
                    Para mais informações, visite as nossas redes sociais...
                </div>
            </div>
        </div>
      </div>
      <div className="formContent">
        <form ref={form} onSubmit={sendEmail} className="oitenteForm">
            <div className="titleForm">Envie-nos sua mensagem!</div>
            <div className="nomeForm">
                <div className="labelContent">
                    <label  className='NegritoName'>Nome completo</label>
                    <i className="xege">*</i>
                </div>
                <input type="text" name="user_name" id="user_name" maxLength={100} className="NomeFormItem" placeholder='Seu nome completo aqui...' required />
            </div>
            <div className="EmailFormContent">
                <div className="emailForm">
                    <div className="labelContent">
                        <label  className='NegritoName'>E-mail</label>
                        <i className="xege">*</i>
                    </div>
                    <input type="email" id="user_email" maxLength={100} className="NomeFormItem" placeholder='Seu email aqui...' required />
                </div>
                <div className="emailForm">
                    <div className="labelContent">
                        <label  className='NegritoName'>Telefone</label>
                        <i className="xege">*</i>
                    </div>
                    <input type="tel" name="user_tell" id="user_tell" maxLength={20} className="NomeFormItem" required placeholder='Seu telefone aqui...' />
                </div>
            </div>
            <div className="selectFormContent">
                <div className="nomeForm">
                    <div className="labelContent">
                        <label  className='NegritoName'>Assunto</label>
                        <i className="xege">*</i>
                    </div>
                    <select name="user_title" id="user_title" className="SeletFormItem" required>
                        <option value="Pedir Informações">Pedir Informações</option>
                        <option value="Solicitar parceria">Solicitar parceria</option>
                        <option value="Suporte Técnico">Suporte Técnico</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>
            </div>
            <div className="messagemForm">
                <div className="nomeForm">
                    <div className="labelContent">
                        <label  className='NegritoName'>Mensagem</label>
                        <i className="xege">*</i>
                    </div>
                    <textarea id="message" maxLength={2000} placeholder='Sua Mensagem...' required name="message" rows="4" cols="50" className='messageFormItem'>
                    </textarea>
                    
                </div>
            </div>
            
            <div className="buttonFormMessage">
                <ReCAPTCHA
                    sitekey="6LedgZcnAAAAAIup7OG6TnUmuG4Tr_imnDNG1G2Y"
                    onChange={onChange}
                />
            </div>
            <div className="buttonFormMessage">
                <button disabled={!status} id={!status ? "disableCursor": ""} value="Send" className="buttonMSM" type="submit">Enviar Mensagem</button>
            </div>
        </form>
      </div>
      <SubFooter />
      <Footer />
    </div>
  )
}
