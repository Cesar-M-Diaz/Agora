import React from 'react'
import Header from './Header';
import Footer from './Footer';

class Layout extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <>
                <Header />
                    {this.props.children}
                <Footer />
            </>
        )
    }
}

export default Layout;