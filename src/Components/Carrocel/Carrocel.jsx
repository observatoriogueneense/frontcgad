import React, { Component } from 'react';
import './Carrocel.css'

class Carrocel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
    };
  }

  

  componentDidMount() {
    this.intervalId = setInterval(this.nextSlide, 9000); // Avança para o próximo slide a cada 3 segundos
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  nextSlide = () => {
    this.setState((prevState) => ({
      currentSlide: (prevState.currentSlide + 1) % this.props.slides.length,
    }));
  };

  nextSlideb = (dd) => {
    if(dd !== 0){
      this.setState((prevState) => ({
        currentSlide: (prevState.currentSlide - 1) % this.props.slides.length,
      }));
    }
  };

  render() {
    const { slides } = this.props;
    const { currentSlide } = this.state;
    // var ArrayLinks = this.props.linkId
    // console.log(slides)
    // var show = " "
    // const getSlide = (data)=>{
    //   window.location.replace(`/atualidade/${slides[data]._id}`);
    // }
  //   const verify = (id)=>{
  //     if(show === id){
  //       show = " "
  //     }else{
  //       show = id;
  //     }
  //     console.log(show)
  // }

    return (
      <div className='FullCarrocel'>
        {slides[currentSlide] ? (
        <div className="cardProjectsSecundAtual" >
            <div className="imageProjectSecurd">
                <img src={slides[currentSlide]?.img ? slides[currentSlide]?.img : "https://scdesign.org.br/wp-content/uploads/2021/04/fundo-branco-png-1024x576.png"} alt="" className="imgProjectSecund" />
            </div>
            <div className="textProjectsSecund">
                <div className="TitleProjectsSecund">{slides[currentSlide]?.title}</div>
                <div className="descriptionProjectsSecund"></div>
            </div>
            {/* <div className="buttonProjectsSecund">
              <i className="fa-solid fa-circle-arrow-down arrowSizee" onClick={()=>verify(slides[currentSlide]?.id)}></i>
            </div> */}
            
              <div id="buttomCardSecundAtual" className={slides[currentSlide]?.id}>
                <div className="org"></div>
                  {/* <div className="ObjCard"><b> </b>{slides[currentSlide]?.obj}</div> */}
                  <div className="ObjCard"><b> </b>{slides[currentSlide]?.obj}</div>
              </div>
            
            </div> 
        ):(
          <div className='carregarText'>Carregando ....</div>
        )}
      </div>
    );
  }
}

export default Carrocel;
