import React, { useEffect, useState } from 'react'
import './Menu.css'
import { Link, useLocation } from 'react-router-dom'
import api from '../../AdmScreens/api'

export default function Menu({select, data}) {
  const [selectItem, setSelectItem] = useState(select)
  const [Datat, setDatat] = useState({})
  const location = useLocation();
  var path = location.pathname.split("/")[2]
  
  useEffect(()=>{
    const getData= async()=>{
      try {
        const resp = await api.get("/logo")
        setDatat(resp.data[0])
      } catch (error) {}
    }
    getData()
    setSelectItem(selectItem)
  }, [selectItem])

  return (
    <div className='Menu' id='headertop'>
      <div className="fullMenu">
        <div className="logoImg">
          {path ?
              (<img src="../cgadt.png" className='logoClass' alt="cgad" />)
              :
              (
              <>
                {data ? 
                    <img src={Datat.img} className='logoClass' alt="cgad" /> 
                    : 
                    <img src={Datat.img} className='logoClass' alt="" />
                }
              </>
              )
          }
            <div className="textTitle">
                <p className="title">{Datat.text1}</p>
                <p className="title">{Datat.text2}</p>
            </div>
        </div>
        <div className="menuEscolha">
            <Link to='/'><div className={selectItem==="inicio" ? "itemMenu": "itemMenu"}>Início</div></Link>
            {/* <div className={selectItem==="inicio" ? "selectButton": "itemMenu"}>Início</div> */}
            <Link to='/sobre'><div className={selectItem==="2" ? "selectButton": "itemMenu"}>Sobre</div></Link>
            <Link to='/temas'><div className={selectItem==="3" ? "selectButton": "itemMenu"}>Temas</div></Link>
            <Link to='/noticias'><div className={selectItem==="4" ? "selectButton": "itemMenu"}>Notícias</div></Link>
            <Link to='/parcerias'><div className={selectItem==="5" ? "selectButton": "itemMenu"}>Parcerias</div></Link>
            <Link to='/contatos'><div className={selectItem==="5" ? "selectButton": "itemMenu"}>Contatos</div></Link>
        </div>
      </div>
    </div>
  )
}
