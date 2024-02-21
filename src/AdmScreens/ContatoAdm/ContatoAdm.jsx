import React, { useEffect, useState } from 'react'
import MenuAdm from '../MenuAdm/MenuAdm'
import './ContatoAdm.css'
import api from '../api'
import Swal from 'sweetalert2'
import { useContext } from 'react';
import {Context} from '../../Context/Context'
import Auth from '../Auth/Auth';

export default function ContatoAdm() {

    const [contact, setContact] = useState({})
    const [email, setEmail] = useState(null)
    const [UserAdm, setUserAdm] = useState(null)
    const [cell, setCell] = useState(null)
    const [endereco, setEndereco] = useState(null)
    const [facebook, setFacebook] = useState(null)
    const [instagram, setInstagram] = useState(null)
    const [youtube, setYoutube] = useState(null)
    const [twitter, setTwitter] = useState(null)
    const [slogan, setSlogan] = useState(null)
    
    const {user} = useContext(Context)

    const getData = async ()=>{
        try {
            const ress = await api.get("/contato")
            setContact(ress.data[0])
        } catch (error) {}
    }
    const getUserAdm = async()=>{
        try {
            var resUser = await api.post("/adm/getuser",{path: user.token})
            if(resUser.data.setu === "resgatamento"){
                setUserAdm(resUser.data.setu)
            }else{
                window.location.replace("/login");
            }
        } catch (error) {}
    }

    
    useEffect(()=>{
        getUserAdm()
        getData()
    }, )

    const Facebook  = (data)=>{
        console.log(data)
        window.open(`${data}`)
    }

    const EditFundador = async()=>{
        try {
            await api.put(`/contato/${contact._id}`, {
                email:email===null ? contact.email : email,
                cell:cell===null ? contact.cell : cell,
                endereco: endereco===null ? contact.endereco : endereco,
                facebook: facebook===null ? contact.facebook : facebook,
                instagram: instagram===null ? contact.instagram : instagram,
                youtube: youtube===null ? contact.youtube : youtube,
                twitter: twitter===null ? contact.twitter : twitter,
                slogan: slogan===null ? contact.slogan : slogan,
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Alteração feita com sucesso!',
                showConfirmButton: false,
                timer: 1500
              })
            window.location.reload()
        } catch (error) {}
    }

  return (
    <>
    {UserAdm && (
    <div>
        <MenuAdm />
        <Auth />
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
      {/* ================================================ */}
      <div className="newFullContentForm">
            <div className="oitentaofFull">
                <div className="CadastrarNovoTemaNew">Editar Atualidade</div>
                <input type="text" className="textFastIn" placeholder='Endereço' onChange={(e)=> setEndereco(e.target.value)} />
                <input type="text" className="textFastIn" placeholder='Telefone' onChange={(e)=> setCell(e.target.value)} />
                <input type="text" className="textFastIn" placeholder='Email' onChange={(e)=> setEmail(e.target.value)} />
                <input type="text" className="textFastIn" placeholder='Slogan' onChange={(e)=> setSlogan(e.target.value)} />
                <input type="text" className="textFastIn" placeholder='Facebook' onChange={(e)=> setFacebook(e.target.value)} />
                <input type="text" className="textFastIn" placeholder='Instagram' onChange={(e)=> setInstagram(e.target.value)} />
                <input type="text" className="textFastIn" placeholder='YouTube' onChange={(e)=> setYoutube(e.target.value)} />
                <input type="text" className="textFastIn" placeholder='Twitter' onChange={(e)=> setTwitter(e.target.value)} />
                <div className="divNewLateralButt"><button className="butbtnNewwTUContact" onClick={EditFundador}>Salvar Alteração</button></div>
            </div>
        </div>
        {/* =============================================== */}
    </div>
    )}
    </>
  )
}
