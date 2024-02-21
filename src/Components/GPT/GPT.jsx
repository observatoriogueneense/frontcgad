import React, { Component } from 'react';
import './GPT.css'

class SlideShow extends Component {
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
    const getSlide = (data)=>{
      window.location.replace(`/atualidade/${slides[data]._id}`);
    }

    return (
      <>
        {slides[currentSlide] ? (
          <div className="contDivPencepaly">
            <div className="slide-showy" id='contentImg' onClick={()=>getSlide(currentSlide)}>
              {/* <img src="./def.jpg" alt={`Carregando...`} className='imgCardSlideNovoy' /> */}
              <img src={slides[currentSlide]?.img ? slides[currentSlide]?.img : "https://scdesign.org.br/wp-content/uploads/2021/04/fundo-branco-png-1024x576.png"} alt={`Carregando...`} className='imgCardSlideNovoy' />
              {/* <img src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} className='imgCardSlideNovo' /> */}
            </div>
            <div className="textBannerCenter">{slides[currentSlide]?.title}</div>
            <button className="butGoSlide" onClick={this.nextSlide}>Próximo</button>
            <button className="butGoSlideb" onClick={()=>this.nextSlideb(currentSlide)}>Anterior</button>
          </div>
        ):(
          <div className='carregarText'>Carregando ....</div>
        )}
      </>
    );
  }
}

export default SlideShow;
