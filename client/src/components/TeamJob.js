import React, { Component } from 'react';

class TeamJob extends Component{
    render(){

        let data = [
            {jobTitle: "Warehouse General Laborer", jobDesc: "here are many variations of passages", jobLink: "/"},
            {jobTitle: "General Factory Worker", jobDesc: "here are many variations of passages", jobLink: "/"},
            {jobTitle: "Production Weekender", jobDesc: "here are many variations of passages", jobLink: "/"}
        ];

        let DataList = data.map((val, i)=>{
            return(
                <div className="team-job__single" key={i}>
                    <h3 className="title"> <a href={val.jobLink}>{val.jobTitle}</a></h3>
                    <p className="text">{val.jobDesc}</p>
                </div>
            )
        });
        return(
            <div>
                {/*====================  team job area ====================*/}
                <div className="team-job-area section-space--inner--120">
                <div className="container">
                    <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="team-job__content">
                        <div className="team-job__title-wrapper">
                            <h2 className="team-job__title">Meet Our <br /> Honorable Employees.</h2>
                            <button onClick={null} className="see-more-link see-more-link--color">Meet Our Team</button>
                        </div>
                        <div className="team-job__content-wrapper">
                            <h2 className="team-job__title">Open Job <span><button onClick={null} className="see-more-link see-more-link--color">VIEW ALL JOBS</button></span></h2>
                            <div className="team-job__list-wrapper">
                                {DataList}
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="team-job__image text-center text-lg-right">
                        <img src="assets/img/team/team.jpg" className="img-fluid" alt="" />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                {/*====================  End of team job area  ====================*/}

            </div>
        )
    }
}

export default TeamJob;