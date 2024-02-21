import React, { useEffect, useState } from 'react'
import './Projeto.css'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'
import Humburguer from '../../Components/Humburguer/Humburguer'
import SubFooter from '../../Components/SubFooter/SubFooter'
import Footer from '../../Components/Footer/Footer'
import api from '../../AdmScreens/api'

    
export default function Projeto() {
    const [pro, setPro] = useState()
    const [banner, setBanner] = useState({})
    const [show, setShow] = useState(" ")
    const [Fundo, setFundo] = useState({})


    

    useEffect(()=>{
        const gatAll= async()=>{
            try {
                const res = await api.get("/bannertema")
                setBanner(res.data[0])
                // console.log(res.data)
                
                var myInput = document.querySelector(".fullContentFast")
                myInput.style.backgroundImage = "url('" + res.data[0].img + "')";
                myInput.style.backgroundRepeat = "no-repeat";
                myInput.style.backgroundSize = "cover";
                myInput.style.backgroundPosition = "center";
                

                const response = await api.get("/tema/public")
                setPro(response.data)

                const newRes = await api.get("/fundotema")
                setFundo(newRes.data[0])
                var myinputt = document.querySelector("#fullContentFastr")
                myinputt.style.backgroundImage = "url('" + newRes.data[0].img + "')";
                myinputt.style.backgroundRepeat = "no-repeat";
                myinputt.style.backgroundSize = "cover";
                myinputt.style.backgroundPosition = "center";
            } catch (error) {}
        }
        gatAll()
    }, [])

    const verify = (id)=>{
        if(show === id){
            setShow(" ")
        }else{
            setShow(id)
        }
    }
  return (
    <div className='Projeto'>
        <Header />
        <Menu />
        <Humburguer />
        <div className="fullContentFast">
            <div className="colorFastContent">
                <div className="oitentaFastContent">
                    <h1 className="centerFastContent">{banner.title}</h1>
                    <p className="paragradoFastContent">
                        
                    </p>
                </div>
            </div>
        </div>
        
        <div className="fullProjectsSecund">
            <div className="oitentaProjectsSecundNew">
                {pro?.map((d)=>(
                    <div className="cardProjectsSecund" key={d._id}>
                        <div className="imageProjectSecurd">
                            <img src={d.img} alt="" className="imgProjectSecund" />
                        </div>
                        <div className="textProjectsSecund">
                            <div className="TitleProjectsSecund">{d.title}</div>
                            <div className="descriptionProjectsSecund"></div>
                        </div>
                        <div className="buttonProjectsSecund">
                            <i className="fa-solid fa-circle-arrow-down arrowSizee" onClick={()=>verify(d._id)}></i>
                        </div>
                        {show === d._id && (
                            <div id="buttomCardSecund" className={d._id}>
                                <div className="org"></div>
                                <div className="ObjCard"><b> </b>{d.obj}</div>
                                <div className="ObjCard"><b> </b>{d.slg}</div>
                            </div>
                        )}
                    </div>   
                ))}
            </div>
        </div>
        {/*  */}

        <div id='fullContentFastr' className="fullContentFast">
              <div className="colorBackBissau">
                <div className="textBackBissau">
                  <div className="rightBissau">
                    <p className="ogadText">{Fundo.title}</p>
                    <p className="textDescOGAD">{Fundo.text1}</p>
                    <p className="textDescOGAD">{Fundo.text2}</p>
                  </div>
                </div>
              </div>
        </div>

        <SubFooter />
        <Footer />
    </div>
  )
}
