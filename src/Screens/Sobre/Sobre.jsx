import React, { useEffect, useState } from 'react'
import './Sobre.css'
import Header from '../../Components/Header/Header'
import Humburguer from '../../Components/Humburguer/Humburguer'
import Menu from '../../Components/Menu/Menu'
import SubFooter from '../../Components/SubFooter/SubFooter'
import Footer from '../../Components/Footer/Footer'
import api from '../../AdmScreens/api'

export default function Sobre() {

    const [hist, sethist]=useState()
    const [membro, setMembro]=useState()
    const [colaborador, setColaborador]=useState()

    const getdata = async ()=>{
        try {
            const res = await api.get("/sobre")
            const ress = await api.get("/sobre/membro")
            const resss = await api.get("/sobre/colaborador")
            sethist(res.data)
            setMembro(ress.data)
            setColaborador(resss.data)
        } catch (error) {}
    }

    const Facebook  = (data)=>{
        console.log(data)
        window.open(`${data}`)
    }
    
    useEffect(()=>{
        getdata()
    }, [])

  return (
    <div className='Sobre'>
        <Header />
        <Humburguer />
        <Menu select={"inicio"} />
        <div className="svgContent">
            <div className="widthSvgContent">
                <div className="textSvgContent">
                    <div className="textBack">
                        <p className="ogadText">CGAD</p>
                        <p className="textDescOGADSobre">Centro de Pesquisa Guineense </p>
                        <p className="textDescOGADSobre">em Álcool e outras Drogas...</p>
                    </div>
                </div>
                <div className="pSvgContent">
                    
                </div>
            </div>
        </div>
        <div className="nossaSobreFull">
            <div className="oitentaNossa">
                <div className="TitleNossa">Nossa história</div>
                {hist?.map((his)=>(
                    <p className="paragrafoNossa" key={his._id}>
                        {his.history}
                    </p>
                ))}
                
            </div>
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
                                    <button className="cardItemButtonMembro" onClick={()=>Facebook(m.link)}>
                                        Saiba mais
                                        <i className="fa-solid fa-user-plus paddingIconMembro"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="descCArdMembro">{m.desc}</div>
                        </div>

                    ))}
                    
                </div>
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
                        <div className="cardMembro2 marginTopParaOCard" key={m._id}>
                            <div className="imgCardMembro2">
                                <img src={m.img} alt="" className="imageCardMembro2" />
                                <div className="NameAndCardgoCArdMembro">
                                    <div className="textsMembroCardNome">
                                        <div className="nomeMembro2">{m.nome}</div>
                                        <i className="CargoDoMembro2">{m.funcao}</i>
                                    </div>
                                    <button className="cardItemButtonMembro" onClick={()=>Facebook(m.link)}>
                                        Saiba mais
                                        <i className="fa-solid fa-user-plus paddingIconMembro"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="descCArdMembro">{m.desc}</div>
                        </div>

                    ))}
                    
                </div>
            </div>
        </div>
        <SubFooter />
        <Footer />
    </div>
  )
}
