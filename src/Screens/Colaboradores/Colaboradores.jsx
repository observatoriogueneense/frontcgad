import React, { useEffect, useState } from 'react'
import './Colaboradores.css'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'
import Humburguer from '../../Components/Humburguer/Humburguer'
import SubFooter from '../../Components/SubFooter/SubFooter'
import Footer from '../../Components/Footer/Footer'
import api from '../../AdmScreens/api'


export default function Colaboradores() {
    const [db, setDb] = useState([])
    const [banner, setBanner] = useState({})
    
    
    
    useEffect(()=>{
        const getData = async()=>{
            try {
                const ress = await api.get("/bannertema")
                setBanner(ress.data[0])
                
                var myInput = document.querySelector(".fullContentFast")
                myInput.style.backgroundImage = "url('" + ress.data[0].img + "')";
                myInput.style.backgroundRepeat = "no-repeat";
                myInput.style.backgroundSize = "cover";
                myInput.style.backgroundPosition = "center";

                var {data} = await api.get("/parceiros")
                var res = data
                for(var x = 0; x < data.length; x++){
                    data[x] = {...res[x], ordem:x}
                }
                setDb(data)
            } catch (error) {}
        }
        getData()
    }, [])

  return (
    <div className='Colaboradores'>
        <Header />
        <Menu />
        <Humburguer />
        <div className="fullContentFast">
            <div className="colorFastContent">
                <div className="oitentaFastContent">
                    <h1 className="centerFastContent" id='newSizeTitle'>{banner.title}</h1>
                    <p className="paragradoFastContent" id='newSizeP'>
                    {banner.desc}
                    </p>
                </div>
            </div>
        </div>
        <div className="TitlePesquisadores">Parceiros</div>
        {db?.map((d)=>(
            <div className={ d.ordem % 2 === 0 ? "pesquisadores newAlingCardPar" : "pesquisawhite newAlingCardPar" } key={d._id}>
                <div className="oitentaPesquisadores">
                    <div className={ d.ordem % 2 === 0 ? "cardColaboradores":"cardColaboradoresWhite"}>
                        <div className="descColaboradorPes">
                            <div className="nomeColaPes">{d.title}</div>
                            <div className="descColaPes">{d.desc}</div>
                        </div>
                        <div className="imagemColaboradorPes">
                            <img src={d.img} alt="" className="imgColaPes" />
                        </div>
                    </div>
                </div>
        </div>

        ))}
        <SubFooter />
        <Footer />
    </div>
  )
}
