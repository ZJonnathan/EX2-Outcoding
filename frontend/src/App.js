import React from 'react';
import Wrapper from './components/Wrapper'

/* MaterialUI Components */
import Container from '@material-ui/core/Container'

import './App.css';

function App() {
    return (
        <Container maxWidth={false}>
            <Wrapper />
        </Container>
    );
}

export default App;
