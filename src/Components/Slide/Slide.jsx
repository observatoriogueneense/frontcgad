import React from 'react'
import './Slide.css'

export default function Slide() {
  var counter = 1;


      setInterval(function(){
          document.getElementById('radio' + counter);
          counter++;
          if(counter > 4){
              counter = 1;
          }
      }, 12000)


      const Back=()=>{
        counter--;
        if(counter < 1){
          counter = 1;
        }
        document.getElementById('radio' + counter).checked = true;
      }
      const Go=()=>{
        counter++;
        if(counter > 4){
          counter = 4;
        }
        document.getElementById('radio' + counter).checked = true;
      }
  return (
    <div className='Slide'>
      <div className="slideFull">{/* slide com 100% */}
        <div className="imgContentVida">{/* Cada Slide */}
        <div className="slider">
          <div className="slides">
            <input type="radio" name="radio-btn" id="radio1" />
            <input type="radio" name="radio-btn" id="radio2" />
            <input type="radio" name="radio-btn" id="radio3" />
            <input type="radio" name="radio-btn" id="radio4" />

            <div className="slide first">
              <img src="./droga.jpg" alt="" />
            </div>
            <div className="slide">
              <img src="./ndg.jpg" alt="" />
            </div>            
            <div className="slide">
              <img src="./droga2.jpg" alt="" />
            </div>
            <div className="slide">
              <img src="./dg.jpg" alt="" />
            </div>

            <div className="navigation-auto">
              <div className="auto-btn1"></div>
              <div className="auto-btn2"></div>
              <div className="auto-btn3"></div>
              <div className="auto-btn4"></div>
            </div>
          </div>

          <div className="navigation-manual">
            <label htmlFor='radio1' className="manual-btn"></label>
            <label htmlFor='radio2' className="manual-btn"></label>
            <label htmlFor='radio3' className="manual-btn"></label>
            <label htmlFor='radio4' className="manual-btn"></label>
          </div>
          <div className="buttonGo-manual">
            <div className="ButtonBack" onClick={Back}>
              <div className="iconButtomSlide"><i className="fa-solid fa-chevron-left colorSlideIcom"></i></div>
              <div className="vazioButtonH"></div>
            </div>
            <div className="ButtonBack" onClick={Go}>
              <div className="vazioButtonH"></div>
              <div className="iconButtomSlideRight"><i className="fa-solid fa-chevron-right colorSlideIcom"></i></div>
            </div>
          </div>
        </div>
        </div>
      </div>
      
      
    </div>
  )
}
