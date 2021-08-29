import React from 'react'
import CategoriesBar from '../components/CategoriesBar'
import '../assets/styles/pages/landing-page.css'
import illustrationH from '../assets/images/study.svg'
import illustrationD from '../assets/images/tutors.svg'

class LandingPage extends React.Component {

    render(){
        return(
            <div className="BaseContainer">
                <div className="mockH">Header</div>
                <section className="LPContainer">
                    <section className="HeroContainer">
                        <section className="HeroTextContainer">
                            <p className='Title'>For each student, <span className="SecondLine">a <span id="Highlight">commited</span> tutor.</span></p>
                            <p className='Subtitle'>For each question. <span className="SecondLine">The right answer.</span></p>
                            <div className="Line"></div>
                        </section>
                        <img className="Illustration" src={illustrationH} alt="hero illustration" />
                    </section>
                    <section className="DescriptionContainer">
                        <div className="DescriptionTextContainer">
                            <p className="Title">Ask <span id="Highlight">anything</span>, <span className="SecondLine">we've got you covered</span></p>
                            <p className="Subtitle">Search for every subject you can imagine, a spetialized tutor will help you with your problem</p>
                        </div>
                        <img className="Illustration" src={illustrationD} alt="description illustration" />
                    </section>
                    <section className="TutorsContainer">
                        <p className="Subtitle" id="Common">From Math to Philosophy, take a look at some of the most common subjects asked by thousands of students</p>
                        <div className="Categories">
                            <CategoriesBar />
                        </div>
                        <div className="TitleT">
                            <p>Meet some of our best tutors</p>
                        </div>
                        <div className="MockTutorsContainer">
                            <div className="MockTutors"></div>
                            <div className="MockTutors"></div>
                            <div className="MockTutors"></div>
                            <div className="MockTutors"></div>
                        </div>
                    </section>
                </section>
                <div className="mockF">Footer</div>
            </div>
        )
    }
}

export default LandingPage
