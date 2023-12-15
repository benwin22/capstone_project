// there are changes to make in saved for the table

import * as _React from 'react'; 
// import React from 'react'; 
import { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
    CardMedia,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    Stack,
    Typography,
    Snackbar,
    Alert } from '@mui/material'; 
import InfoIcon from '@mui/icons-material/Info';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getDatabase, ref, push } from 'firebase/database'; 
// ======================================================

// internal imports
// import { useGetSearch, SearchProps } from '../../customHooks';


import { NavBar, InputText } from '../sharedComponents';
import { theme } from '../../Theme/themes';
import { MessageType } from '../Auth';
import  searchImage  from '../../assets/images/land_sea.jpeg';
import { serverCalls } from '../../api';
// import {customFont} from '../../../src/index.css';
// import SearchProps from '../Search';
// import { searchBar } from '../sharedComponents';




// CSS style object 
export const searchStyles = {
    main: {
        backgroundImage: `url(${searchImage});`,
        height: '100%',
        width: '100%',
        color: 'charcoal',
        
        backgroundSize: 'cover',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "fixed",
        backgroundAttachment: 'fixed',
        position: 'static',
        overflow: 'auto',
        marginTop: '120px',
        paddingTop: '50px',
        paddingBottom: '1000px',
    },
    grid: {
        marginTop: '25px', 
        marginRight: 'auto', 
        marginLeft: 'auto', 
        width: '70vw'
    },
    card: {
        width: "1100px",
        marginRight: 'auto', 
        marginLeft: 'auto',
        height: '600px', 
        padding: '10px',
        display: "flex",
        flexDirection: "row",
        // search result==================
        backgroundColor: "ivory",
        border: '2px solid',
        borderColor: 'orange',
        borderRadius: '10px',
        justifyContent: 'center',
        zoom: 'transition: tansform .2s',
        zoomHover: 'scale(1.5)'
        
        
    },
    cardInfo: {
        width: "800px",
        marginRight: 'auto', 
        marginLeft: 'auto',
        padding: '10px',
        display: "flex",
        flexDirection: "column",
        // COLOR============================
        backgroundColor: "#9AB9CB",
        // opacity: '.95',
        border: '2px solid',
        borderColor: 'orange',
        borderRadius: '20px',
        textAlign: 'center',
        // fontSize: '100px',
        marginBottom: '40px',
        position: 'relative',
       
    },
    cardMedia: {
        width: '75%',
        margin: 'auto',
        marginTop: '5px',
        marginBottom: '5px',
        aspectRatio: '1/1',
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '10px',
        backgroundSize: 'contain'
        
 
    },
    button: {
        borderWidth: "thick",
        color: '#B6BEC3', 
        borderRadius: '50px',
        backgroundColor: '#FBAB3D',
        height: '45px',
        width: '100%',
        marginTop: '10px',
        fontSize: '20px',
        textShadow: "-1px 1px 0 #000,1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;" ,
        
    },
    stack: {
        width: '75%', 
        marginLeft: 'auto', 
        marginRight: 'auto',
        borderColor: 'orange',
    },
    stack2: {
        border: '1px solid', 
        borderColor: 'orange',
        borderRadius: '50px', 
        borderWidth: "medium",
        width: '100%',
        marginTop: '10px'
    },
    typography: { 
        marginLeft: '40vw', 
        textShadow: "-1px 1px 0 #000,1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;",
        color: "#FFFF", 
        marginTop: '100px',
        fontSize: '30px'
    },
    

}

// ============================================================

export interface SubmitProps {
    select: string 
}


export interface SavedProps {
    savedItem: AnimalProps
}

export interface AnimalProps {
    image: string,
    name: string,
    // habitat: string,
    diet: string,
    // prey: string,
    // name_of_young: string,
    // common_name: string,
    // number_of_species: string,
    location:string,
    // group: string,
   
}


export const SearchProps = (saved: SavedProps ) => {
    // setuphooks & variables
    const db = getDatabase();
    const [ open, setOpen ] = useState(false)
    const [ message, setMessage] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const { handleSubmit } = useForm<SubmitProps>({})
    let mySaved = saved.savedItem 


    const onSubmit: SubmitHandler<SubmitProps> = async (_data: SubmitProps, event: any) => {
        if (event) event.preventDefault(); 

        const user = localStorage.getItem('uuid') 
        const savedRef = ref(db, `saved/${user}/`) 

        push(savedRef, mySaved)
        .then((_newSavedRef) => {
            setMessage(`Successfully added item ${mySaved.name} to Saved`)
            setMessageType('success')
            setOpen(true)
        })
        .then(() => {
            setTimeout(()=>{window.location.reload()}, 2000)
        })
        .catch((error) => {
            setMessage(error.message)
            setMessageType('error')
            setOpen(true)
        })
    }

    return (
        <Box>
        <form onSubmit = {handleSubmit(onSubmit)}>
            <Button sx={{borderColor: 'orange', }}>
            <Button type='submit'>Submit</Button>
            </Button>
        </form>
        <Snackbar
            open={open}
            // autoHideDuration={3000}
            onClose={()=> setOpen(false)}
        >
            <Alert severity = {messageType}>
                {message}
            </Alert>
        </Snackbar>
    </Box>
    )
}

// ==========================================================================
export const Search = () => {

    const [ animalData, setAnimalData ] = useState<AnimalProps[]>([])
    const [ _savedOpen, setSavedOpen ] = useState(false); 


    const { register, handleSubmit } = useForm<SubmitProps>({})

    const onSubmit:SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault();
        // I am having an issue here
        let myApiCall = await serverCalls.getSearch(data.search) as AnimalProps[]; 
        setAnimalData(myApiCall)



        
    }
    return (
        <Box sx={ searchStyles.main }>
            <NavBar />
            <Typography 
                variant = 'h4'
                sx = { searchStyles.typography }
                >
                TYPE IN THE NAME OF AN ANIMAL!
            </Typography>
            <form onSubmit = {handleSubmit(onSubmit)}>
                
                <Box sx={searchStyles.cardInfo}>
                    
                    
                    <InputText {...register('search')} name='search' placeholder='Type In Your Search Here' />
                    <Button type='submit'
                     size='medium'
                     variant='outlined'
                     sx={searchStyles.button}>Submit</Button>
                </Box>
                
            </form>
          
            <Stack spacing={3} sx={searchStyles.stack}>
                { animalData.map((search: AnimalProps, index: number ) => (
                    
                    <Stack >
                        <Card sx={searchStyles.card}>
                          
                            <CardContent>
                                <Stack 
                                    direction='column'
                                    justifyContent='space-between'
                                    alignItems = 'center'
                                >
                                    <Stack 
                                        direction = 'column'
                                        alignItems = 'left'
                                        justifyContent = 'space-between'
                                   
                                         sx={{ color: 'charcoal', backgroundColor: 'ivory'  }}>
                                          
                                                <Typography>NAME: {search.name}</Typography>
                                                <Typography>DIET: {search.diet}</Typography>
                                                <Typography>LOCATION: {search.location}</Typography>
                                                {/* <Typography>HABITAT: {search.habitat}</Typography>
                                               
                                                <Typography>PREY: {search.prey}</Typography>
                                                <Typography>NAME OF YOUNG: {search.name_of_young}</Typography>
                                                <Typography>COMMON NAME: {search.common_name}</Typography>
                                                <Typography>NUMBER OF SPECIES: {search.number_of_species}</Typography>
                                                <Typography>WHERE THEY LIVE: {search.location}</Typography>
                                                <Typography>TYPE OF ANIMAL: {search.group}</Typography> */}
                                                {/* I would like the output to look like a card catalog with Typewriter font */}
                                            {/* fontFamily: 'Fira Code, Consolas, Input, DejaVu Sans Mono, JetBrains Mono, and MonoLisa.' */}

                                    </Stack>
                                    <SearchProps savedItem={ search }/>
                                      
                                </Stack>
                            </CardContent>
                            <CardMedia 
                                component='img'
                                sx={searchStyles.cardMedia}
                                image={search.image}
                                alt={search.name}
                            />
                        </Card>
                    </Stack>
                ))}
            </Stack>
    

        </Box>
    )
}

