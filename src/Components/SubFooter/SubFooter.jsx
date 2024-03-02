import React from 'react'
import './SubFooter.css'
import { useLocation } from 'react-router-dom';

export default function SubFooter(data) {

  const location = useLocation();
  const directory = location.pathname
  // var path = location.pathname.split("/")[1]
  // console.log(directory)

  const Facebook  = ()=>{
    window.open('https://www.facebook.com/profile.php?id=61550249258004')
  }
  const Twitter  = ()=>{
      window.open('https://twitter.com/CGAD023')
  }
  const Instagram  = ()=>{
      window.open('https://www.instagram.com/cgad.guinebissau/')
  }
  const Youtube  = ()=>{
      window.open('https://www.youtube.com/channel/UC4EVIQIRd8IZoKDRlOZm18Q')
  }
  const Noticia = ()=>{
    window.location.replace("/atualidade");
  }
  const Historia = ()=>{
    window.location.replace("/sobre");
  }
  // const Home = ()=>{
  //   window.location.replace("/");
  // }
  return (
    <div className='SubFooter'>
      <div className="subFooterContent">
        <div className="imageSubFooter">
            {data ? <img src="../cgadt.png" id='iconImgLogoCgad' alt="" className="imgSubFooter" /> : <img src="./cgadf.png" alt="" className="imgSubFooter" /> }
        </div>
        <div className="allSubFooter">
            <div className="quem">
                <div className="quemTitle">Quem Somos</div>
                <div className="quemItemContem">
                    <p className="itemQuem linkMissao" onClick={Historia}>História do CGAD</p>
                    {directory === "/" ? <a href="#missao" className="itemQuem linkMissao">Missão</a> : <a href="/#missao" className="itemQuem linkMissao">Missão</a>}
                    {directory === "/" ? <a href="#visao" className="itemQuem linkMissao">Visão</a> : <a href="/#visao" className="itemQuem linkMissao">Visão</a>}
                    {directory === "/" ? <a href="#valores" className="itemQuem linkMissao">Valores</a> : <a href="/#valores" className="itemQuem linkMissao">Valores</a>}
                </div>
            </div>
            <div className="quem">
                <div className="quemTitle">Atualidades</div>
                <div className="quemItemContem">
                    <p className="itemQuem" onClick={Noticia}>Notícias</p>
                </div>
            </div>
            <div className="quem">
                <div className="quemTitle">Redes Sociais</div>
                <div className="quemItemContem">
                    <p className="itemQuem" onClick={Facebook}>Facebook</p>
                    <p className="itemQuem" onClick={Twitter}>Twitter</p>
                    <p className="itemQuem" onClick={Instagram}>Instagram</p>
                    <p className="itemQuem" onClick={Youtube}>YouTube</p>
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}
