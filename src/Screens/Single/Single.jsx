import React, { useEffect, useState } from 'react'
import './Single.css'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'
import Humburguer from '../../Components/Humburguer/Humburguer'
import SubFooter from '../../Components/SubFooter/SubFooter'
import Footer from '../../Components/Footer/Footer'
import api from '../../AdmScreens/api'
import { Link, useLocation } from 'react-router-dom'

export default function Single() {
  const location = useLocation();
  var path = location.pathname.split("/")[2]

  var [res, setRes] = useState({})

  
  useEffect(()=>{
    const getAtualidade = async() =>{
      try {
        var { data } = await api.get(`/atual/${path}`)
        setRes(data)
      } catch (error) {}
    }
    
    getAtualidade()
  }, [path])
  
  const CopyLink = ()=>{
    navigator.clipboard.writeText(`http://localhost:3000/atualidade/${res._id}`).then(()=>alert("Link Copiado na sua área de transferência"))
  }
  return (
    <div className='fullContSingle'>
        <Header />
        <Menu data={true} />
        <Humburguer />
      <div className="headerSingle">
        <div className="oitentSingleHeader">
            <div className="iconHomeSingle">
                <Link to="/"><i className="fa-solid fa-house-chimney iconSizz"></i></Link>
                <i className="fa-solid fa-angle-right rowRightSingle"></i>
                <Link to="/atualidade"><i className="textISingle iconSizzt">Todas Atualizações</i></Link>
                <i className="fa-solid fa-angle-right rowRightSingle"></i>
            </div>
            <div className="textHomeSingle">
                {res.title}
            </div>
        </div>
      </div>
      <div className="headerSingle">
        <div className="oitentSingleHeaderText">
            <div className="textHeroSingle">
              {res.title}
            </div>
        </div>
      </div>
      <div className="headerSingle">
        <div className="oitentSingleHeaderTextSocial">
            <div className="tempoSingle">
                <div className="porSocial">Por <i className='iName'></i>CGAD</div>
                <div className="dataSocial">
                  <i className="fa-regular fa-clock clockSize"></i> {new  Date(res.createdAt).toDateString()} 
                  {res?.updatedAt && (
                    <i className="iUpdate">| Utualizado: {new  Date(res.updatedAt).toDateString()} </i>
                  )}
                </div>
            </div>
            <div className="socialSingle">
                <i className="fa-solid fa-link fontSizeLink" onClick={CopyLink}></i>
            </div>
        </div>
      </div>
      <div className="headerSingle">
        <div className="oitentSingleHeaderTextSocialimg">
            <img src={res.img} alt="" className="singleImg" />
        </div>
      </div>
      <div className="headerSingle">
        <div className="oitentSingleHeaderTextSocialimgT">
            <div className="textSingleText">
                {res.text}
            </div>
        </div>
      </div>
      <SubFooter data={true} />
      <Footer />
    </div>
  )
}
