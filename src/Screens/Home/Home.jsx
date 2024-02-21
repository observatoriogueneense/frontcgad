import React, { useEffect, useState } from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'
import SubFooter from '../../Components/SubFooter/SubFooter'
import Footer from '../../Components/Footer/Footer'
import Humburguer from '../../Components/Humburguer/Humburguer'
import { Link } from 'react-router-dom'
// import Slide from '../../Components/Slide/Slide'
import api from '../../AdmScreens/api'
import SlideShow from '../../Components/GPT/GPT'


var slides = [
  {
    _id:"1",
  img:"https://scdesign.org.br/wp-content/uploads/2021/04/fundo-branco-png-1024x576.png",
  title:"CGAD"
},
  {
    _id:"2",
  img:"https://scdesign.org.br/wp-content/uploads/2021/04/fundo-branco-png-1024x576.png",
  title:"CGAD"
},
  {
    _id:"3",
  img:"https://scdesign.org.br/wp-content/uploads/2021/04/fundo-branco-png-1024x576.png",
  title:"CGAD"
},
  {
    _id:"4",
  img:"https://scdesign.org.br/wp-content/uploads/2021/04/fundo-branco-png-1024x576.png",
  title:"CGAD"
}
];
export default function Home() {
    const [pro, setPro] = useState()
    const [show, setShow] = useState(" ")
    const [header, setHeader] = useState(" ")
    const [text, setText] = useState(" ")
    const [newStyle, setNewStyle] = useState("showwNew")
    const [resp, setResp] = useState({})
    const [banner, setBanner] = useState({})

  
  useEffect(()=>{
    const getData = async()=>{
      try {
          const getImgs = await api.get("/atual/public")
          slides=getImgs.data
          // console.log(getImgs.data)
          const {data} = await api.get("/home")
          const respodta = await api.get("/img")
          setResp(respodta.data[0])
          const response = await api.get("/sobre")
          setNewStyle("showwNeww")
          
          // if(getImgs.data){
            //   setTimeout(()=>{
          //   }, 3000)
          // }

          setText(response.data[2].history)
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

          const newRes = await api.get("/fundo")
          setBanner(newRes.data[0])

          var myInput = document.querySelector(".fullContentFast")
          myInput.style.backgroundImage = "url('" + newRes.data[0].img + "')";
          myInput.style.backgroundRepeat = "no-repeat";
          myInput.style.backgroundSize = "cover";
          myInput.style.backgroundPosition = "center";

      } catch (error) {
          console.log(error)
      }
  }
  getData()
  
  }, [])

  const verify = (id)=>{
    if(show === id){
        setShow(" ")
    }else{
        setShow(id)
    }
}


  return (
    <div className='Home'>
      <Header />
      <Humburguer />
      <Menu select={"inicio"} />
      {/* <Slide /> */}
        <div className={`${newStyle}`}>
          <SlideShow slides={slides}  />
        </div>
      <div className="fulltextIntrudation">
        <div className="textContentIntrodaction">
          <h1 className="intudaction">
            {header}
          </h1>
        </div>
      </div>
      <div className="fullProjectsSecund">
            <div className="oitentaProjectsSecund">
                {pro?.map((d)=>(
                    <div className="cardProjectsSecund" key={d.id}>
                        <div className="imageProjectSecurd">
                            <img src={d.img} alt="" className="imgProjectSecund" />
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
                                <div className="ObjCard"><b> </b>{d.obj}</div>
                                {/* <div className="ObjCard"><b> </b>{d.slg}</div> */}
                            </div>
                        )}
                    </div>   
                ))}
            </div>
        </div>


        <div className="fullContentFast">
              <div className="colorBackBissau">
                <div className="textBackBissau">
                  <div className="rightBissau">
                    <p className="ogadText">{banner.title}</p>
                    <p className="textDescOGAD">{banner.text1}</p>
                    <p className="textDescOGAD">{banner.text2}</p>
                  </div>
                </div>
              </div>
        </div>

      <div className="fullHistory">
        <div className="contentHistory">
        <div className="use imgUser baaaa">
          {resp.img &&(<img src={resp.img} alt="" className="imgProjectSecundBove" />)}
        </div>
          <div className="textHistor">
            <div className="titleHistory">História do CGAD</div>
            <p className="textPHistory">
              {text}
            </p>
            <Link to='/sobre'>
              <button className="buttonHistory">Sobre CGAD <i className="fa-solid fa-circle-chevron-right cicleColor"></i></button>
            </Link>
          </div>
        </div>
      </div>
      <SubFooter />
      <Footer />
    </div>
  )
}
