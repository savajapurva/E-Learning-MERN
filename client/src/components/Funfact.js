import React, {Component} from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';


class Funfact extends Component{

    state = {
        didViewCountUp: false
      };
    
    
      onVisibilityChange = isVisible => {
        if (isVisible) {
          this.setState({didViewCountUp: true});
        }
      }
    
    render(){

        let data = [
            {img: 'funfact-project.png', countNum : 598, countTitle: 'Projects' },
            {img: 'funfact-clients.png', countNum : 128, countTitle: 'Clients' },
            {img: 'funfact-success.png', countNum : 114, countTitle: 'Success' },
            {img: 'funfact-award.png', countNum : 109, countTitle: 'Awards' }
        ];

        let DataList = data.map((val, i)=>{
            return(
                <div className="single-fact col-md-3 col-6 section-space--bottom--30" key={i}>
                    <img src={`assets/img/icons/${val.img}`} alt="" />
                    <h1 className="counter">
                    <VisibilitySensor onChange={this.onVisibilityChange} offset={{top:10}} delayedCall>
                        <CountUp end={this.state.didViewCountUp ? val.countNum : 0} />
                    </VisibilitySensor>
                    </h1>
                    <h4>{val.countTitle}</h4>
                </div>
            )
        });

        return(
            <div>
                {/*====================  fun fact area ====================*/}
                <div className="funfact-section section-space--inner--100 funfact-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="fun-fact-wrapper">
                                    <div className="row">
                                        {DataList}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*====================  End of fun fact area  ====================*/}

            </div>
        )
    }
}

export default Funfact;