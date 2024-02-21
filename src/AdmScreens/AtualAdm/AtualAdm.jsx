import React, { useEffect, useState } from 'react'
import MenuAdm from '../MenuAdm/MenuAdm'
import Swal from 'sweetalert2'
import api from '../api'
import './AtualAdm.css'
import { useContext } from 'react';
import {Context} from '../../Context/Context'
import Auth from '../Auth/Auth';
import { imageDb } from '../firebase';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';



const handleClick = async (URL)=>{
    try {
       const imgRef = ref(imageDb, `files/${v4()}`)
       uploadBytes(imgRef, URL)
       const snapshot = await uploadBytes(imgRef, URL)
       const downloadURL = await getDownloadURL(snapshot.ref);
       return (downloadURL)
    } catch (error) {
        console.log(error)
    }
}

//upload img
async function postImage({image, description}) {
    const formData = new FormData();
    formData.append("image", image)
    formData.append("description", description)

    const result = await handleClick(image)
  return result;
}

export default function AtualAdm() {
    const [post, setPost] = useState()
    const [show, setShow] = useState(null)
    const [UserAdm, setUserAdm] = useState(null)
    const [img, setImg] = useState(null)
    const [Title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [obj, setObj] = useState("")
    const [Banner, setBanner] = useState(false)
    const [imgE, setImgE] = useState(null)
    const [imgEA, setImgEA] = useState(null)
    const [TitleE, setTitleE] = useState(null)
    const [descE, setDescE] = useState(null)
    const [objE, setObjE] = useState(null)
    const [IdEdit, setIdEdit] = useState(null)
    const [contact, setContact] = useState({})
    const {user} = useContext(Context)

    
    

    
    useEffect(()=>{
        const getData = async ()=>{
            try {
                const res = await api.get("/atual")
                setPost(res.data)
                const ress = await api.get("/contato")
                setContact(ress.data[1])
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

        getUserAdm()
        getData()
    }, [user.token])

    const Cadastrar = async()=>{
        try {
            var result = null
            if(img){
                const description = Date.now() + img.name;
                result = await postImage({image: img, description})
            }

            if(result){
                setBanner(false)
                await api.post("/atual", {
                    title: Title,
                    img:result,
                    local:obj,
                    text:desc,
                    status:false
                })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Alteração feita com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                window.location.reload()
            }else{
                setBanner(true)
            }
        } catch (error) {}
    }

    const verify = (data)=>{
        if(show === data._id){
            setShow(null)
            setImgE(null)
            setImgEA(null)
            setTitleE(null)
            setDescE(null)
            setObjE(null)
            setIdEdit(null)
        }else{
            setShow(data._id)
            setTitleE(data.title)
            setDescE(data.text)
            setObjE(data.obj)
            setIdEdit(data._id)
            setImgEA(data.img)
        }
    }

    const EditFundador = async()=>{
        try {

            var result=null;
            
            if(imgE){
                const description = Date.now() + imgE.name;
                result = await postImage({image: imgE, description})
            }
            
            await api.put(`/atual/${IdEdit}`,{
                img: result ? result : imgEA,
                title: TitleE,
                local:objE,
                text:descE
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

    const deletText = async(data)=>{
        try {
            await api.delete(`/atual/${data}`)
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

    const DeleteTextConfirm = (data)=>{
        Swal.fire({
            title: 'Tens certeza?',
            text: "Você estás abilitar a deleção!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!'
          }).then((result) => {
            if (result.isConfirmed) {
                deletText(data)
            //   Swal.fire(
            //     'Deleted!',
            //     'Your file has been deleted.',
            //     'success'
            //   )
            }
          })
        
    }

    const Public = async (id)=>{
        await api.put(`/atual/public/${id}`)
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Atualização Alterado com Sucesso!"
          });

          window.location.reload()
    }
    const Privado = async (id)=>{
        await api.put(`/atual/private/${id}`)
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Atualização Alterado com Sucesso!"
          });

          window.location.reload()
        
    }

  return (
    <>
    {UserAdm && (
    <div>
        <MenuAdm />
        <Auth />
        {/* ================================================ */}
        <div className="newFullContentForm">
            <div className="oitentaofFull">
                <div className="CadastrarNovoTema">Cadastrar Atualidade</div>
                {Banner && (<div className="CadastrarNovoTemaRed">Preencha todos os campos...</div>)}
                <input type="file" id='imgUserPhoto' accept="image/*" className="textFastIn" onChange={(e)=> setImg(e.target.files[0])}  />
                <input type="text" className="textFastIn" placeholder='Título' onChange={(e)=> setTitle(e.target.value)} />
                <input type="text" className="textFastIn" placeholder='Descrição' onChange={(e)=> setDesc(e.target.value)} />
                <input type="text" className="textFastIn" placeholder='Local do Evento' onChange={(e)=> setObj(e.target.value)} />
                <div className="divNewLateralButt"><button className="butbtnNeww" onClick={Cadastrar}>Cadastrar...</button></div>
            </div>
        </div>
        {/* =============================================== */}
      <div className="fullAtualContent">
            <div className="oitentAtual">
                <div className="NoticiaContent">
                {post?.map((d)=>(
                <div className="cardAtual" key={d._id}>
                        <div className="imagemAtual">
                            <img src={d.img} alt="" className="imgAtual" />
                            <i className="fa-solid fa-trash-can imgLogoAtual morStyleForBacket" onClick={()=>DeleteTextConfirm(d._id)}></i>
                        </div>
                        <div className="allTextAtual">
                            <div className="titleAtual">
                                {d.title}
                            </div>
                            <div className="regiaoAtualnew">
                                <div className="statusCont">
                                    Estatus :  <i className='iStatus'>{d.status ? "Público":"Privado"}</i>
                                    {d.status ? <i className="fa-solid fa-lock-open statusIcon"></i>:<i className="fa-solid fa-lock statusIcon"></i>}
                                    {/* {d.status ? <i className="fa-solid fa-users statusIcon"></i>:<i className="fa-solid fa-lock statusIcon"></i>} */}
                                </div>
                                {d.status ? (
                                    <div className="Privado" onClick={()=>Privado(d._id)}>Privado</div>
                                ):(
                                    <div className="Publico" onClick={()=>Public(d._id)}>Público</div>
                                )}
                            </div>
                            {show === d._id && (
                                <div id="descAtual" className={d._id}>
                                <p className='textVizible'>{/* {d.text} */}</p>
                                    {/* ================================================ */}
                                    <div className="newFullContentForm">
                                        <div className="oitentaofFull">
                                            <div className="CadastrarNovoTemaNew">Editar Atualidade</div>
                                            {Banner && (<div className="CadastrarNovoTemaRed">Preencha todos os campos...</div>)}
                                            <input type="file" id='imgUserPhoto' accept="image/*" className="textFastIn" onChange={(e)=> setImgE(e.target.files[0])}  />
                                            <input type="text" className="textFastIn" placeholder='Título' onChange={(e)=> setTitleE(e.target.value)} />
                                            <input type="text" className="textFastIn" placeholder='Descrição' onChange={(e)=> setDescE(e.target.value)} />
                                            <input type="text" className="textFastIn" placeholder='Local do Evento' onChange={(e)=> setObjE(e.target.value)} />
                                            <div className="divNewLateralButtt"><button className="butbtnNewwTU" onClick={EditFundador}>Salvar Alteração</button></div>
                                        </div>
                                    </div>
                                    {/* =============================================== */}
                                </div> 
                            )}
                            <div className="iconAtual">
                                <button className="buttonIconAtual" onClick={()=>verify(d)}>
                                    Editar
                                    <i className="fa-solid fa-angles-right iconBuGo"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="localContent">
                    <div className="associacaoFour">
                        <div className="conTentCarAss">
                            <div className="contentAssociacaoCard">
                                <div className="TitleAssociacao">Sede Social da CGAD</div>
                                <div className="localAssociacao">
                                <i className="fa-solid fa-map-location-dot"></i><i className="locationAsso">
                                    {contact.endereco}
                                </i>
                                </div>
                                <div className="celularAssociacao">
                                    <i className="fa-solid fa-phone"></i><i className="locationAsso">
                                        {contact.cell}
                                    </i>
                                </div>
                                <div className="emailAssociacao">
                                    <i className="fa-solid fa-envelope"></i><i className="locationAsso">
                                        {contact.email}
                                    </i>
                                </div>
                            </div>
                        </div>
                        <div className="conTentCarAssFour">
                            <div className="contentAssociacaoCard marginTopAssociacaao">
                                <div className="logoAssociacao"><img src="././cgadt.png" alt="" className="logoimgAssociacao" /></div>
                                <div className="TitleAssociacao">Slogan da CGAD</div>
                                <div className="emailAssociacao">
                                    <i className="locationAsso">
                                        {contact.slogan}
                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )}
    </>
  )
}
