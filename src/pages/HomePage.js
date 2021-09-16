import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../assets/styles/pages/HomePage.scss'
import { TutorsContainer } from '../components/TutorsContainer';

function HomePage(props){
    const state = useSelector(state => state)

    useEffect(() => {
        if(state.token === null) {
            props.history.replace('/');
        }
    }, [state.token, props.history])

    return(
        <main className="homepage-container">
            <div className="homepage-content">
                <TutorsContainer subtitle=" " title="Find a tutorship" />
            </div>
        </main>
    )
}

export default HomePage;