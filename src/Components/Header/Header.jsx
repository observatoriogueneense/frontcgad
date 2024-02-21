import React from 'react'
import './Header.css'

export default function Header() {

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

  return (
    <div className='Header'>
        <div className="allcontent">
            <div className="flag">
                <i className="fa-brands fa-square-facebook iconsoc" onClick={Facebook}></i>
                <i className="fa-brands fa-twitter iconsoc flagItem" onClick={Twitter}></i>
                <i className="fa-brands fa-square-instagram iconsoc flagItem" onClick={Instagram}></i>
                <i className="fa-brands fa-youtube iconsoc flagItem" onClick={Youtube}></i>
            </div>
            <div className="menu">
                <button className='doar'>Doar</button>
                <div className="pesquisa">
                    <input type='text' placeholder='Procurar...' className='inputSearch' required />
                    <div className="iconInput">
                        <i className="fa-solid fa-magnifying-glass iconPosition"></i>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}
