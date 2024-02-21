import React, { useEffect, useState } from 'react'
import './HomeAdm.css'
import api from '../api'
import Swal from 'sweetalert2';
import MenuAdm from '../MenuAdm/MenuAdm';
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


export default function HomeAdm() {
    const [pro, setPro] = useState()
    const [UserAdm, setUserAdm] = useState(false)
    const [header,  setHeader] = useState()
    const [show, setShow] = useState(" ")
    const [missao, setMissao] = useState(null)
    const [visao, setVisao] = useState(null)
    const [valor, setValor] = useState(null)
    const [edit, setEdit] = useState(false)
    const [iMissao, setIMissao]= useState(null)
    const [iVisao, setIVisao]= useState(null)
    const [iValor, setIValor]= useState(null)
    const [File, setFile]= useState(null)
    const [resp, setResp] = useState({})
    const [Banner, setBanner] = useState(false)
    const [bannert, setBannert] = useState(null)
    const [banneri, setBanneri] = useState(null)
    const [bannerd, setBannerd] = useState(null)
    const [bannerd2, setBannerd2] = useState(null)

    const {user} = useContext(Context);

    const confirm = ()=>{
        Swal.fire({
            title: 'Desejas salvar estas alterações ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            denyButtonText: `Não Salvar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
            //   Swal.fire('Saved!', '', 'success')
                saveImage()
            } else if (result.isDenied) {
              Swal.fire('Alteração não salva', '', 'info')
            }
          })
    }

    const editBanner = async ()=>{
        try {
            var result = null
            const {data} = await api.get("/fundo")
            if(banneri){
                const description = Date.now() + banneri.name;
                result = await postImage({image: banneri, description})
            }

            if(result){
                await api.put(`/fundo/${data[0]._id}`,{
                    title:bannert ? bannert : data[0].title,
                    img:result ? result : data[0].img,
                    text1:bannerd ? bannerd : data[0].text1,
                    text2:bannerd2 ? bannerd2 : data[0].text2,
                })
            }

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Alteração feita com sucesso!',
                showConfirmButton: false,
                timer: 1500
              })
            window.location.reload()

        } catch (error) {
            setBanner(true)
        }
    }


    const saveImage= async()=>{
        var resultVa=null;
        var resultVi=null;
        var result=null;
        if(iMissao){
            const description = Date.now() + iMissao.name;
            result = await postImage({image: iMissao, description})
        }
        if(iVisao){
            const description = Date.now() + iVisao.name;
            resultVi = await postImage({image: iVisao, description})
        }
        if(iValor){
            const description = Date.now() + iValor.name;
            resultVa = await postImage({image: iValor, description})
        }
        console.log([missao, valor, visao])
        console.log(pro)
        
        const ObjectUpdate = {
            header:header,
            missao:missao ? missao : pro[0].obj,
            visao:visao ? visao : pro[1].obj,
            valor:valor ? valor : pro[2].obj,
            imissao: iMissao ? result : pro[0].img,
            ivisao:iVisao ? resultVi : pro[1].img,
            ivalor:iValor ? resultVa : pro[2].img,
        }
        console.log(ObjectUpdate)
        const keyId='64ed8bd8c6bd3e465a738fd0'
        const NewRes = await api.put("/home/"+keyId, ObjectUpdate)

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Alteração feita com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })

        console.log(NewRes)
    }

    const getData = async()=>{
        try {
            const {data} = await api.get("/home")
            const respodta = await api.get("/img")
            setResp(respodta.data[0])
            setHeader(data[0].header)

            const BigRes = [
                {
                    id:"1",
                    img:data[0].imissao,
                    title:"MISSÃO",
                    obj:data[0].missao
                },
                {
                    id:"2",
                    img:data[0].ivisao,
                    title:"VISÃO",
                    obj:data[0].visao
                },
                {
                    id:"3",
                    img:data[0].ivalor,
                    title:"VALORES",
                    obj:data[0].valor
                }
            ]
            setPro(BigRes)
            // setMissao(data[0].missao)
            // setVisao(data[0].visao)
            // setValor(data[0].valor)

        } catch (error) {
            console.log(error)
        }
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

  const verify = (id)=>{
    if(show === id){
        setShow(" ")
    }else{
        setShow(id)
    }
}

const SetEditForm = ()=>{
    setEdit(true)
}
const Xmissao = ()=>{
    setMissao(pro[0].obj)
    setEdit(false)
}
const Xvisao = ()=>{
    setVisao(pro[1].obj)
    setEdit(false)
}
const Xvalor = ()=>{
    setValor(pro[2].obj)
    setEdit(false)
}


const SalvarImagem = async()=>{
    try {
        var resultado = null
        if(File){
            const description = Date.now() + File.name;
            resultado = await postImage({image: File, description})
        }
        if(resultado){
            await api.put(`/img/${resp._id}`,{
                img:resultado
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
            alert("É obrigatório adicionar  uma imagem para poder Fazer a alteração!")
        }
    } catch (error) {
        
    }
}
  return (
    <>
    {UserAdm && (
     <div>
        <MenuAdm select={"inicio"} />
        <Auth />
      <div className="fulltextIntrudation">
        <div className="textContentIntrodaction dfConteHeader">
          <h1 className="intudaction">
            {header}
          </h1>
        <input type="text" className="inputHeaderUpdate" onChange={(e)=>setHeader(e.target.value)} />
        </div>
      </div>
      <div className="fullProjectsSecund">
            <div className="oitentaProjectsSecund">
                {pro?.map((d)=>(
                    <div className="cardProjectsSecund" key={d.id}>
                        <div className="imageProjectSecurd">
                
                            {d.id === "1" && (
                                <>
                                {/* =================================== */}
                                    <div className=" use imgUser">
                                        {iMissao ? (
                                            <img src={URL.createObjectURL(iMissao)} alt="" className="imgProjectSecund" />
                                        ):(
                                            <img src={d.img} alt="" className="imgProjectSecund" />
                                        )}
                                        <label htmlFor='imgUserPhoto' className="iconEditImg"><i className="fa-regular fa-image iconColorAddImg"></i>
                                        </label>
                                    </div>
                                    <div className="displayNoneImg">
                                        <input type="file" id='imgUserPhoto' accept="image/*" className="inputImgUser userInputB Bselect displayNone" onChange={(e)=> setIMissao(e.target.files[0])}  />
                                    </div>
                                    {/* =================================== */}
                                </>
                            )}
                            {d.id === "2" && (
                                <>
                                    {/* =================================== */}
                                    <div className=" use imgUser">
                                        {iVisao ? (
                                            <img src={URL.createObjectURL(iVisao)} alt="" className="imgProjectSecund" />
                                        ):(
                                            <img src={d.img} alt="" className="imgProjectSecund" />
                                        )}
                                        <label htmlFor='imgUserPhotovi' className="iconEditImg"><i className="fa-regular fa-image iconColorAddImg"></i>
                                        </label>
                                    </div>
                                    <div className="displayNoneImg">
                                        <input type="file" id='imgUserPhotovi' accept="image/*" className="inputImgUser userInputB Bselect displayNone" onChange={(e)=> setIVisao(e.target.files[0])}  />
                                    </div>
                                    {/* =================================== */}
                                </>
                            )}
                            {d.id === "3" && (
                                <>
                                    {/* =================================== */}
                                    <div className=" use imgUser">
                                        {iValor ? (
                                            <img src={URL.createObjectURL(iValor)} alt="" className="imgProjectSecund" />
                                        ):(
                                            <img src={d.img} alt="" className="imgProjectSecund" />
                                        )}
                                        <label htmlFor='imgUserPhotova' className="iconEditImg"><i className="fa-regular fa-image iconColorAddImg"></i>
                                        </label>
                                    </div>
                                    <div className="displayNoneImg">
                                        <input type="file" id='imgUserPhotova' accept="image/*" className="inputImgUser userInputB Bselect displayNone" onChange={(e)=> setIValor(e.target.files[0])}  />
                                    </div>
                                    {/* =================================== */}
                                </>
                            )}
                        </div>
                        <div className="textProjectsSecund">
                            <div className="TitleProjectsSecund">{d.title}</div>
                            <div className="descriptionProjectsSecund"></div>
                        </div>
                        <div className="buttonProjectsSecund">
                            <i className="fa-solid fa-circle-arrow-down arrowSizee" onClick={()=>verify(d.id)}></i>
                        </div>
                        {show === d.id && (
                            <div id="buttomCardSecund" className={d.id}>
                                <div className="org"></div>
                                <div className="ObjCard"><b></b>{d.obj}</div>
                                {edit && (
                                    <>
                                        {d.id === "1" && (
                                            <>
                                                <input type="text" className="editInputObject" onChange={(e)=> setMissao(e.target.value)} />
                                                <div className="ObjCard"><b></b><i className="fa-solid fa-trash-can colorSizerLixo" onClick={Xmissao}></i></div>
                                            </>
                                        )}
                                        {d.id === "2" && (
                                            <>
                                                <input type="text"  className="editInputObject" onChange={(e)=> setVisao(e.target.value)} />
                                                <div className="ObjCard"><b></b><i className="fa-solid fa-trash-can colorSizerLixo" onClick={Xvisao}></i></div>
                                            </>
                                        )}
                                        {d.id === "3" && (
                                            <>
                                                <input type="text" className="editInputObject" onChange={(e)=> setValor(e.target.value)} />
                                                <div className="ObjCard"><b></b><i className="fa-solid fa-trash-can colorSizerLixo" onClick={Xvalor}></i></div>
                                            </>
                                        )}
                                    </>
                                )}
                                {!edit && (<div className="ObjCard" onClick={SetEditForm}><b></b><i className="fa-solid fa-pen-to-square colorSixe"></i></div>)}
                            </div>
                        )}
                    </div>   
                ))}
            </div>
        </div>
        {/* ************************************************ */}
        <div className="newFullContentForm">
            <div className="oitentaofFull">
                <div className="CadastrarNovoTema">Editar Banner Da Página Início</div>
                {Banner && (<div className="CadastrarNovoTemaRed">Preencha todos os campos...</div>)}
                <input type="file" id='imgUserPhoto' accept="image/*" className="textFastIn" onChange={(e)=> setBanneri(e.target.files[0])}  />
                <input type="text" className="textFastIn" placeholder='Título' onChange={(e)=> setBannert(e.target.value)} />
                <input type="text" className="textFastIn" placeholder='Texto 1' onChange={(e)=> setBannerd(e.target.value)} />
                <input type="text" className="textFastIn" placeholder='Texto 2' onChange={(e)=> setBannerd2(e.target.value)} />
                <div className="divNewLateralButt"><button className="butbtnNeww" onClick={editBanner}>Editar...</button></div>
            </div>
        </div>
        {/* ************************************************ */}
        <div className="fullHistory">
        <div className="contentHistory">
          <div className="imageHistory">
            {/* <img src="./monu.jpeg" alt="" className="imgHistory" /> */}
            

            {/* ============================================== */}
            <div className="use imgUser baaaa">
                {File ? (
                    <img src={URL.createObjectURL(File)} alt="" className="imgProjectSecund" />
                ):(
                    <img src={resp.img} alt="" className="imgProjectSecund" />
                )}
                <div className="displayNoneImguu">
                    <input type="file" id='imgUserPhotovay' accept="image/*" className="inputImgUser userInputB Bselect displayNone" onChange={(e)=> setFile(e.target.files[0])}  />
                </div>
                <label htmlFor='imgUserPhotovay' className="newPositionIcon">
                    <i className="fa-regular fa-image newPositionIconyu"></i>
                </label>
                <div className="contenteButtonSubmit">
                    <button className="sendOrSubmit" onClick={SalvarImagem}>Salvar...</button>
                </div>
            </div>
            {/* ============================================== */}
          </div>
          <div className="textHistor">
            <div className="titleHistory">História do CGAD</div>
            <p className="textPHistory">
            </p>
              <button className="buttonHistory">Sobre CGAD <i className="fa-solid fa-circle-chevron-right cicleColor"></i></button>
          </div>
        </div>
      </div>
        <div className="redeDiv" onClick={confirm}>SALVAR ALTERAÇÕES....</div>
    </div>
    )}
    </>
  )
}
