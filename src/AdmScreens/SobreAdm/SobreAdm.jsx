import React, { useEffect, useState } from 'react'
import './SobreAdm.css'
import api from '../api'
import Swal from 'sweetalert2';
import MenuAdm from '../MenuAdm/MenuAdm';
import { useContext } from 'react';
import {Context} from '../../Context/Context'
import Auth from '../Auth/Auth';
// import upload from '../../upload';
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
    console.log(result)
    //const result = await upload.post('/upload', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result;
}

export default function SobreAdm() {
    const [newp, setNewp]=useState("")
    const [hist, sethist]=useState()
    const [membro, setMembro]=useState()
    const [colaborador, setColaborador]=useState()
    const [iMissao, setIMissao]= useState(null)
    const [nome, setNome] = useState("")
    const [cargo, setCargo] = useState("")
    const [desc, setDesc] = useState("")
    const [linkk, setLinkk] = useState("")
    const [nomeEd, setNomeEd] = useState("")
    const [cargoEd, setCargoEd] = useState("")
    const [descEd, setDescEd] = useState("")
    const [linkkEd, setLinkkEd] = useState("")
    const [idEd, setIdEd] = useState("")
    const [iMissaoEd, setIMissaoEd]= useState(null)
    const [nomeEdC, setNomeEdC] = useState("")
    const [cargoEdC, setCargoEdC] = useState("")
    const [descEdC, setDescEdC] = useState("")
    const [linkkEdC, setLinkkEdC] = useState("")
    const [idEdC, setIdEdC] = useState("")
    const [iMissaoEdC, setIMissaoEdC]= useState(null)
    const [HoldImg, setHoldImg]= useState(null)
    const [HoldImgC, setHoldImgC]= useState(null)

    const [nomeC, setNomeC] = useState("")
    const [cargoC, setCargoC] = useState("")
    const [descC, setDescC] = useState("")
    const [linkkC, setLinkkC] = useState("")
    const [iMissaoC, setIMissaoC]= useState(null)
    const [Edit, setEdit]= useState(true)
    const [EditC, setEditC]= useState(true)
    const [EditText, setEditText]= useState(true)
    const [textEdit, setTextEdit]= useState("")
    const [idText, setIdText]= useState("")

    const [UserAdm, setUserAdm] = useState(null)
    const {user} = useContext(Context)

    
    const AddP = async ()=>{
        try {
            await api.post("/sobre", {
                history:newp
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
    const AddPEdit = async ()=>{
        try {
            await api.put(`/sobre/${idText}`, {
                history:textEdit
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

    const DeleteCola = async(data)=>{
        try {
            await api.delete(`/sobre/colaborador/${data}`)
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

    const DeleteColaConfirm = (data)=>{
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
                DeleteCola(data)
            //   Swal.fire(
            //     'Deleted!',
            //     'Your file has been deleted.',
            //     'success'
            //   )
            }
          })
        
    }
    const DeleteMembro = async(data)=>{
        try {
            await api.delete(`/sobre/membro/${data}`)
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

    const DeleteMembroConfirm = (data)=>{
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
                DeleteMembro(data)
            //   Swal.fire(
            //     'Deleted!',
            //     'Your file has been deleted.',
            //     'success'
            //   )
            }
          })
        
    }
    const deletText = async(data)=>{
        try {
            await api.delete(`/sobre/${data}`)
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

    const getdata = async ()=>{
        try {
            const res = await api.get("/sobre")
            const ress = await api.get("/sobre/membro")
            const resss = await api.get("/sobre/colaborador")
            // console.log(resss)
            sethist(res.data)
            setMembro(ress.data)
            setColaborador(resss.data)
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
        getdata()
    }, )

    const saveImage= async()=>{
        try {
            
        
        var result=null;
        if(iMissao){
            const description = Date.now() + iMissao.name;
            result = await postImage({image: iMissao, description})
            
        }

        const ObjectUpdate = {
            nome:nome,
            funcao:cargo,
            img:result,
            desc:desc,
            link:linkk,
        }
        await api.post("/sobre/membro", ObjectUpdate)

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
    const saveImageColalorador = async()=>{
        try {
            
        
        var result=null;
        if(iMissaoC){
            const description = Date.now() + iMissaoC.name;
            result = await postImage({image: iMissaoC, description})
            
        }

        const ObjectUpdate = {
            nome:nomeC,
            funcao:cargoC,
            img:result,
            desc:descC,
            link:linkkC,
        }
        await api.post("/sobre/colaborador", ObjectUpdate)

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

    const editSet =(data)=>{
        setNomeEd(data.nome)
        setCargoEd(data.funcao)
        setLinkkEd(data.link)
        setDescEd(data.desc)
        setIdEd(data._id)
        setHoldImg(data.img)
        setEdit(false)
    }
    const editSetC =(data)=>{
        setNomeEdC(data.nome)
        setCargoEdC(data.funcao)
        setLinkkEdC(data.link)
        setDescEdC(data.desc)
        setHoldImgC(data.img)
        setIdEdC(data._id)
        setEditC(false)
    }
    const EditFundador = async()=>{
        try {

            var result=null;
            
            if(iMissaoEd){
                const description = Date.now() + iMissaoEd.name;
                result = await postImage({image: iMissaoEd, description})
            }
            
            await api.put(`/sobre/membro/${idEd}`,{
                nome:nomeEd,
                funcao:cargoEd,
                img: result ? result : HoldImg,
                desc:descEd,
                link:linkkEd,
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Alteração feita com sucesso!',
                showConfirmButton: false,
                timer: 1500
              })
            window.location.reload()
            setEdit(true)
        } catch (error) {}
    }
    const EditFundadorC = async()=>{
        try {

            var result=null;
            if(iMissaoEdC){
                const description = Date.now() + iMissaoEdC.name;
                result = await postImage({image: iMissaoEdC, description})
                
            }

            await api.put(`/sobre/colaborador/${idEdC}`,{
                nome:nomeEdC,
                funcao:cargoEdC,
                img: result ? result : HoldImgC,
                desc:descEdC,
                link:linkkEdC,
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Alteração feita com sucesso!',
                showConfirmButton: false,
                timer: 1500
              })
            window.location.reload()
            setEdit(true)
        } catch (error) {}
    }

    const activeEdit = (data)=>{
        setTextEdit(data.history)
        setIdText(data._id)
        setEditText(false)
    }
  return (
    <>
    {UserAdm && (
    <>
        <MenuAdm select={"inicio"} />
        <Auth />
        <div className="nossaSobreFull dfTexxt">
            <div className="oitentaNossa">
                <div className="TitleNossa">Nossa história</div>
                {hist?.map((his)=>(
                    <p className="paragrafoNossa" key={his._id}>
                        {his.history}
                        <i className="divIconss">
                            <i className="fa-solid fa-pen-to-square margLefIconEd" onClick={()=>activeEdit(his)}></i>
                            <i className="fa-solid fa-trash-can newcolortoIcon" onClick={()=>DeleteTextConfirm(his._id)}></i>
                        </i>
                    </p>
                ))}
            </div>
            {EditText ? (
                <div className="adddivInputPost">
                    <div className="bannerEditformVerde">Cadastrar Texto</div>
                    <div className="paragrafoNossa">
                        {newp}
                    </div>
                    <div className="inpAdds">
                        <input type="text" className="adddInputHead" onChange={e=>setNewp(e.target.value)} />
                        <button className='btnAddBut' onClick={AddP}><i className="fa-solid fa-plus addmais"></i></button>
                    </div>
                </div>

            ):(
                <div className="adddivInputPost">
                    <div className="bannerEditform">Editar Texto</div>
                    <div className="paragrafoNossa">
                        {textEdit}
                    </div>
                    <div className="inpAdds">
                        <input type="text" className="adddInputHead" onChange={e=>setTextEdit(e.target.value)} />
                        <button className='btnAddBut' onClick={AddPEdit}><i className="fa-solid fa-plus addmais"></i></button>
                    </div>
                </div>

            )}
        </div>
        <div className="membros">
            <div className="oitentaMembros">
                <div className="headerMembros">
                    <div className="TitleMembros">Membros Fundadores</div>
                    <p className="pMembros">Os Combatentes Que Iniciaram o Projeto</p>
                </div>
                <div className="itemMembros2">
                    {membro?.map((m)=>(
                        <div className="cardMembro2 marginTopParaOCard" key={m._id}>
                            <div className="imgCardMembro2">
                                <img src={m.img} alt="" className="imageCardMembro2" />
                                <div className="NameAndCardgoCArdMembro">
                                    <div className="textsMembroCardNome">
                                        <div className="nomeMembro2">{m.nome}</div>
                                        <i className="CargoDoMembro2">{m.funcao}</i>
                                    </div>
                                    <button className="cardBuutt" onClick={()=>editSet(m)}>
                                        Editar
                                        <i className="fa-solid fa-user-plus paddingIconMembro"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="descCArdMembro">{m.desc}</div>
                            <div className="descCArdMembroRedIcon">
                                <div className="centerOitenta" onClick={()=>DeleteMembroConfirm(m._id)}>
                                    <i className="fa-solid fa-trash-can redIconDelit"></i>
                                </div>
                            </div>
                        </div>

                    ))}
                    
                    
                </div>
                {Edit ? (

                <div className="formPostDataMembro" >
                    <div className="bannerEditformVerde">Cadastrar Novo Membro {nomeEd}</div>
                    <input type="file" id='imgUserPhoto' accept="image/*" className="nomeDoUsuario" onChange={(e)=> setIMissao(e.target.files[0])}  />
                    <input type="text" placeholder='Nome' className="nomeDoUsuario" onChange={e=>setNome(e.target.value)} />
                    <input type="text" placeholder='Função' className="nomeDoUsuario" onChange={e=>setCargo(e.target.value)} />
                    <input type="text" placeholder='Descrição' className="nomeDoUsuario" onChange={e=>setDesc(e.target.value)} />
                    <input type="text" placeholder='link do litte' className="nomeDoUsuario" onChange={e=>setLinkk(e.target.value)} />
                    <div className='WBuuton'>
                        <button className="butbtnNeww" onClick={saveImage}>Cadastrar...</button>
                    </div>
                </div>
                ):(

                <div className="formPostDataMembro" >
                    <div className="bannerEditform">Editar {nomeEd}</div>
                    <input type="file" id='imgUserPhoto' accept="image/*" className="nomeDoUsuario" onChange={(e)=> setIMissaoEd(e.target.files[0])}  />
                    <input type="text"  maxLength={40} placeholder='Nome' className="nomeDoUsuario" onChange={e=>setNomeEd(e.target.value)} />
                    <input type="text"  placeholder='Função' className="nomeDoUsuario" onChange={e=>setCargoEd(e.target.value)} />
                    <input type="text" placeholder='Descrição' className="nomeDoUsuario" onChange={e=>setDescEd(e.target.value)} />
                    <input type="text"  placeholder='link do litte' className="nomeDoUsuario" onChange={e=>setLinkkEd(e.target.value)} />
                    <div className='WBuuton'>
                        <button className="butbtnNeww" onClick={EditFundador}>Editar...</button>
                    </div>
                </div>
                )}
            </div>
        </div>
        <div className="membros colorMembroBackground">
            <div className="oitentaMembros">
                <div className="headerMembros">
                    <div className="TitleMembros">Colaboradores</div>
                    <p className="pMembros">Os Combatentes Que Iniciaram o Projeto</p>
                </div>
                <div className="itemMembros2">
                {colaborador?.map((m)=>(
                        <div className="cardMembro2" key={m._id}>
                            <div className="imgCardMembro2">
                                <img src={m.img} alt="" className="imageCardMembro2" />
                                <div className="NameAndCardgoCArdMembro">
                                    <div className="textsMembroCardNome">
                                        <div className="nomeMembro2">{m.nome}</div>
                                        <i className="CargoDoMembro2">{m.funcao}</i>
                                    </div>
                                    <button className="cardBuutt" onClick={()=>editSetC(m)}>
                                        Editar
                                        <i className="fa-solid fa-user-plus paddingIconMembro"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="descCArdMembro">{m.desc}</div>
                            <div className="descCArdMembroRedIcon">
                                <div className="centerOitenta" onClick={()=>DeleteColaConfirm(m._id)}>
                                    <i className="fa-solid fa-trash-can redIconDelit"></i>
                                </div>
                            </div>

                        </div>

                    ))}
                    
                </div>
                {EditC ? (<div className="formPostDataMembro" >
                    <div className="bannerEditformVerde">Cadastrar Colaborador {nomeEd}</div>
                    <input type="file" id='imgUserPhoto' accept="image/*" className="nomeDoUsuario" onChange={(e)=> setIMissaoC(e.target.files[0])}  />
                    <input type="text" placeholder='Nome' className="nomeDoUsuario" onChange={e=>setNomeC(e.target.value)} />
                    <input type="text" placeholder='Função' className="nomeDoUsuario" onChange={e=>setCargoC(e.target.value)} />
                    <input type="text" placeholder='Descrição' className="nomeDoUsuario" onChange={e=>setDescC(e.target.value)} />
                    <input type="text" placeholder='link do litte' className="nomeDoUsuario" onChange={e=>setLinkkC(e.target.value)} />
                    
                    <div className='WBuuton'>
                        <button className="butbtnNeww" onClick={saveImageColalorador}>Cadastrar...</button>
                    </div>
                </div>
                ):(
                    <div className="formPostDataMembro" >
                        <div className="bannerEditform">Editar {nomeEd}</div>
                        <input type="file" id='imgUserPhoto' accept="image/*" className="nomeDoUsuario" onChange={(e)=> setIMissaoEdC(e.target.files[0])}  />
                        <input type="text"  maxLength={40} placeholder='Nome' className="nomeDoUsuario" onChange={e=>setNomeEdC(e.target.value)} />
                        <input type="text"  placeholder='Função' className="nomeDoUsuario" onChange={e=>setCargoEdC(e.target.value)} />
                        <input type="text" placeholder='Descrição' className="nomeDoUsuario" onChange={e=>setDescEdC(e.target.value)} />
                        <input type="text"  placeholder='link do litte' className="nomeDoUsuario" onChange={e=>setLinkkEdC(e.target.value)} />
                        
                        <div className='WBuuton'>
                        <button className="butbtnNeww" onClick={EditFundadorC}>Editar...</button>
                    </div>
                    </div>

                )}
            </div>
        </div>
        </>
    )}
    </>
  )
}
