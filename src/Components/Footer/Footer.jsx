import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <div className='Footer'>
      <div className="contenFooter">
        <div className="empityFooter"></div>
        <div className="textFooter">Copyright © 2023 CGAD | Created by 
        {/* <i className='DevName'>African-Coder</i> */}
        </div>
        <a href='#headertop' className="buttonFooter"><i className="fa-solid fa-circle-chevron-up VoltarArrow"></i></a>
      </div>
    </div>
  )
}
