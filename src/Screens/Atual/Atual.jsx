import React, { useEffect, useState } from 'react'
import './Atual.css'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'
import SubFooter from '../../Components/SubFooter/SubFooter'
import Footer from '../../Components/Footer/Footer'
import Humburguer from '../../Components/Humburguer/Humburguer'
import Carrocel from '../../Components/Carrocel/Carrocel'
import api from '../../AdmScreens/api'


var slides = []
export default function Atual() {
    const [post, setPost] = useState()
    const [show, setShow] = useState("")
    const [contact, setContact] = useState({})
    
    

    const getSlide = (data)=>{
        window.location.replace(`/noticias/${data}`);
      }
    
    useEffect(()=>{

        const getDataCarrocel = async()=>{
            try {
                const {data} = await api.get("/home")
                // setNewStyle("showwNeww")
                slides = [
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
      
            } catch (error) {
                console.log(error)
            }
        }

        const getData = async ()=>{
            try {
                const res = await api.get("/atual/public")
                setPost(res.data)
                const ress = await api.get("/contato")
                setContact(ress.data[0])
                // console.log(ress.data[1])
            } catch (error) {}
        }

        getDataCarrocel()
        getData()
        setShow("")
    }, [])


  return (
    <div className='Atual'>
        <Header />
        <Humburguer />
        <Menu select={"inicio"} />
        <div className="fullAtualContent">
            <div className="oitentAtual">
                <div className="NoticiaContent">
                {post?.map((d)=>(
                <div className="cardAtual" key={d._id}>
                        <div className="imagemAtual">
                            <img src={d.img} alt="" className="imgAtual" />
                            <img src="././cgadt.png" alt="" className="imgLogoAtual" />
                        </div>
                        <div className="allTextAtual">
                            <div className="titleAtual">
                                {d.title}
                            </div>
                            <div className="regiaoAtual">Notícias / </div>
                            {show === d._id ? (
                                <div id="descAtual" className={d._id}>
                                    <p className='allTextVizible'>
                                        {d.text}
                                    </p>
                                </div>

                            ):(
                                <div id="descAtual" className={d._id}>
                                <p className='textVizible'>
                                    {d.text}
                                </p>
                                </div> 
                            )}
                            <div className="iconAtual">
                                <button className="buttonIconAtual" onClick={()=>getSlide(d._id)}>
                                    Ler mais
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
                                <div className="TitleAssociacao">CGAD</div>
                                <div className="localAssociacao">
                                <i className="fa-solid fa-map-location-dot"></i><i className="locationAsso">{contact.endereco}</i>
                                </div>
                                <div className="celularAssociacao">
                                    <i className="fa-solid fa-phone"></i><i className="locationAsso">{contact.cell}</i>
                                </div>
                                <div className="emailAssociacao">
                                    <i className="fa-solid fa-envelope"></i><i className="locationAsso">{contact.email}</i>
                                </div>
                            </div>
                        </div>
                        <div className="conTentCarAssFour">
                            <Carrocel slides={slides} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <SubFooter />
      <Footer />
    </div>
  )
}
