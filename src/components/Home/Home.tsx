import * as _React from 'react'; 
import { styled } from '@mui/system'; 
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; 


import searchBackgroundImage from '../../assets/images/land_sea.jpeg'; 
import { NavBar, InputText } from '../sharedComponents';

interface Props {
    title: string
}

// code out our styled components
const Root = styled('div')({
    padding: 0,
    margin: 0
})

const Main = styled('main')({
    backgroundImage: `url(${searchBackgroundImage});`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: '',
    backgroundPosition: 'center top 5px', 
    position: 'fixed',
    marginTop: '50px',
    
})

const MainText = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    borderColor: 'black',
    textShadow: "-1px 1px 0 #000,1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;" ,
    zoom: 'transition: tansform .2s',
    zoomHover: 'scale(1.5)'
})


// This is our firsst functional based component!
export const Home = (props: Props) => {
    const myAuth = localStorage.getItem('auth')

    // return is always HTML & it can have ONLY 1 parent div 
    return (
        <Root>
             <NavBar />
            <Main>
                <MainText>
                    <Typography variant='h1'> { props.title }ANIMAL DATABASE FOR KIDS!</Typography>
                    <Button sx={{ marginTop: '100px', fontSize: '75px',}} component={Link} to={myAuth === 'true' ? "/search" : "/auth"}>CLICK HERE TO EXPLORE!</Button>
                </MainText>
            </Main>
        </Root>
    )
}