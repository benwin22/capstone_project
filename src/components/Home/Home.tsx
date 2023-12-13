import * as _React from 'react'; 
import { styled } from '@mui/system'; 
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; 


import searchImage from '../../assets/images/animals2.png'; 

interface Props {
    title: string
}

// code out our styled components
const Root = styled('div')({
    padding: 0,
    margin: 0
})

const Main = styled('main')({
    backgroundImage: `url(${searchImage});`,
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top 5px', 
    position: 'absolute',
    marginTop: '10px',
    color: '#02C5CF'
})

const MainText = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#02C5CF'
})


// This is our firsst functional based component!
export const Home = (props: Props) => {

    // return is always HTML & it can have ONLY 1 parent div 
    return (
        <Root>
            <Main>
                <MainText>
                    <Typography variant='h1'> { props.title }</Typography>
                    <Button sx={{ marginTop: '10px'}} component={Link} to={"/search"} variant='contained'>Let's Explore the Wold of Animals!</Button>
                </MainText>
            </Main>
        </Root>
    )
}