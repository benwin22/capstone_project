import * as _React from 'react';
import { useState } from 'react'; //useState is a React Hook
import {
    Button,
    // Drawer, 
    ListItemButton,
    List,
    ListItemText,
    AppBar,
    Toolbar,
    IconButton,
    Stack, 
    Typography,
    Divider, 
    // CssBaseline,
    Box 
} from '@mui/material'; 
import { useNavigate } from 'react-router-dom'; 
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';;
import PetsIcon from '@mui/icons-material/Pets';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { signOut, getAuth } from 'firebase/auth';
import animalBackground from "../../../assets/images/animals2.png"
 



//internal imports
import { theme } from '../../../Theme/themes'; 


// building a CSS object/dictionary to reference inside our html for styling
// const drawerWidth = 200; 


const navStyles = {
    appBar: {
        backgroundImage: `url(${animalBackground})`,
        marginTop: '0px',
        backgroundPosition: 'center',
        height: "20%",
        width: "100%",
        position: 'fixed',
        backgroundSize: "40%",
        backgroundOrigin: 'content-box',
        backgroundRepeat: "no-repeat",
        backgroundColor: 'white',
    
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp, //number 
            duration: theme.transitions.duration.leavingScreen //string calculation of the duration
        })
    },
    menuButton: {
        marginRight: theme.spacing(2), //default to 8px * 2 = 16px
        color: 'theme.transitions.duration.leavingScreen'
    },
  
    // toolbar: {
    //     display: 'flex'
    // },
    // toolbarButton: {
    //     marginLeft: 'auto',
    //     color: theme.palette.primary.contrastText
    // },
    signInStack: {
        position: 'absolute',
        top: '5%',
        right: '50px'
    }
}

export const NavBar = () => {
    const [ _open, setOpen ] = useState(false) 
    const navigate = useNavigate(); 
    const myAuth = localStorage.getItem('auth')
    const auth = getAuth(); 

    const linkOpen = () => {
        setOpen(true)
    }

    const linkClose = () => {
        setOpen(false)
    }

 

    const navLinks = [
        {
            text: 'Home',
            icon: <HomeIcon/>,
            onClick: () => navigate('/')
        },
        {
            text: myAuth === 'true' ? 'Search' : 'Sign In',
            icon: myAuth === 'true' ? <SearchIcon /> : <CollectionsBookmarkIcon/>,
            onClick: () => navigate(myAuth === 'true' ? '/search' : '/auth')
        },
        {
            text: myAuth === 'true' ? 'Saved' : '',
            icon: myAuth === 'true' ? <CollectionsBookmarkIcon /> : "",
            onClick: myAuth === 'true' ? () => navigate('/saved') : () => {}
        }
    ]
// nav bar button
    let signInText = 'SignIn!!!'

    if (myAuth === 'true') {
         signInText = 'Sign Out'
    }

    const signInButton = async () => {
        if (myAuth === 'false') {
            navigate('/auth')
        } else {
            await signOut(auth)
            localStorage.setItem('auth', 'false')
            localStorage.setItem('user', '')
            localStorage.setItem('uuid', '')
            navigate('/')
        }
    };

    return (
        <Box sx={{display: 'flex'}}>
            {/* <CssBaseline /> */}
            <AppBar
                sx={ navStyles.appBar }
                position = 'fixed'
                >
                <Toolbar>
                    
                    <IconButton 
                        color='inherit'
                        // aria-label='open drawer'
                        onClick = { ()=>{navigate('/')}}
                        edge='start'
                        sx = {navStyles.menuButton }
                    >
                        <Typography>Home</Typography>
                        <PetsIcon />
                           
                    </IconButton>
                    
                    <IconButton 
                        color='inherit'
                        // aria-label='open drawer'
                        onClick = { ()=>{navigate('/search')}}
                        edge='start'
                        sx = {navStyles.menuButton }
                    >
                        <Typography>Search</Typography>
                        <SearchIcon />                       
                    </IconButton>
                    <IconButton 
                        color='inherit'
                        // aria-label='open drawer'
                        onClick = { ()=>{navigate('/saved')}}
                        edge='start'
                        sx = {navStyles.menuButton }
                    >
                        <Typography>Saved</Typography>
                        <CollectionsBookmarkIcon />                       
                    </IconButton>
                </Toolbar>
               
                <Stack 
                    direction='row' 
                    justifyContent='space-between' 
                    alignItems='center'
                    sx = { navStyles.signInStack} >
                        <Typography variant='body2' sx={{color: 'inherit'}}>
                            {localStorage.getItem('user')}
                        </Typography>
                        <Button 
                            variant='contained'
                            color = 'info'
                            size = 'large'
                            sx = {{ marginLeft: '20px'}}
                            onClick = { signInButton }
                        >
                            { signInText }
                        </Button>
                </Stack>
            </AppBar>
       
           
            {/* <Divider />
                <List>
                    {navLinks.map((item) => {
                        const { text, icon, onClick } = item;
                        return (
                            <ListItemButton key={text} onClick={onClick}>
                                <ListItemText primary={text} />
                                {icon}
                            </ListItemButton>
                        )
                    })}
                </List> */}
        </Box >
    )
};
