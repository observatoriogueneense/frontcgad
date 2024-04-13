import React from 'react'
import './MenuAdm.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import api from '../api';

export default function MenuAdm({select}) {
    const [selectItem, setSelectItem] = useState(select)
    const [Id, setId] = useState(null)
    const [Data, setData] = useState({})

  useEffect(()=>{
    const getData= async()=>{
      try {
        const resp = await api.get("/logo")
        setData(resp.data[0])
        setId(resp.data[0]._id)
      } catch (error) {}
    }
    getData()
    setSelectItem(selectItem)
  }, [selectItem])

  const UpdatePadrao = async()=>{
    try {
      await api.put(`/logo/${Id}`,{
        img:"./cgadt.png",
        text1: "CENTRO DE PESQUISA GUINEENSE",
        text2: "EM ÁLCOOL E OUTRAS DROGAS"
      })
      window.location.reload()
    } catch (error) {}
  }

  const verifyUpdate = ()=>{
    Swal.fire({
      title: 'Você desejas atualizar a logo?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Atualizar',
      denyButtonText: `Logo Padrão`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        window.location.replace("alterar-logo-adm")
        Swal.fire('Atualizar!', '', 'info')
      } else if (result.isDenied) {
        UpdatePadrao()
        Swal.fire('Logo Padrão Atualizada', '', 'success')

      }
    })
  }
  return (
    <div className='Menu'>
      <div className="fullMenu">
        <div className="logoImg">
            <img src={Data.img} className='logoClass' id='CursorLogoAdm' onClick={verifyUpdate} alt="" />
            <div className="textTitle">
                <p className="title">{Data.text1}</p>
                <p className="title">{Data.text2}</p>
            </div>
        </div>
        <div className="menuEscolha">
            <Link to='/homeadm'><div className={selectItem==="inicio" ? "itemMenu": "itemMenu"}>Início</div></Link>
            {/* <div className={selectItem==="inicio" ? "selectButton": "itemMenu"}>Início</div> */}
            <Link to='/sobreadm'><div className={selectItem==="2" ? "selectButton": "itemMenu"}>Sobre</div></Link>
            <Link to='/temaadm'><div className={selectItem==="3" ? "selectButton": "itemMenu"}>Temas</div></Link>
            <Link to='/noticias'><div className={selectItem==="4" ? "selectButton": "itemMenu"}>Notícias</div></Link>
            <Link to='/parceriasadm'><div className={selectItem==="5" ? "selectButton": "itemMenu"}>Parcerias</div></Link>
            <Link to='/contatoadm'><div className={selectItem==="5" ? "selectButton": "itemMenu"}>Contatos</div></Link>
        </div>
      </div>
    </div>
  )
}
