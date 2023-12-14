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
    Grid,
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
import  searchImage  from '../../assets/images/animals.jpg';
import { serverCalls } from '../../api';
// import SearchProps from '../Search';
// import { searchBar } from '../sharedComponents';




// CSS style object 
export const searchStyles = {
    main: {
        // backgroundImage: `url(${searchImage});`,
        height: '100%',
        width: '100%',
        color: 'green',
        backgroundSize: 'contain',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: 'fixed',
        position: 'static',
        overflow: 'auto',
        marginTop: '120px',
        paddingBottom: '200px',
    },
    grid: {
        marginTop: '25px', 
        marginRight: 'auto', 
        marginLeft: 'auto', 
        width: '70vw'
    },
    card: {
        width: "1200px",
        height: '600px', 
        padding: '10px',
        display: "flex",
        flexDirection: "row",
        // search result==================
        backgroundColor: "ivory",
        border: '2px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '10px',
        position: 'realative'
    },
    cardInfo: {
        width: "800px",
        marginRight: 'auto', 
        marginLeft: 'auto',
        padding: '10px',
        display: "flex",
        flexDirection: "column",
        // COLOR============================
        backgroundColor: "ivory",
        border: '2px solid',
        borderColor: '#02C5CF',
        borderRadius: '10px',
        textAlign: 'center'
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
        backgroundColor: 'red'
        // backgroundColor: 'red',
    },
    button: {
        borderWidth: "medium",
        color: 'red', 
        borderRadius: '50px',
        height: '45px',
        width: '100%',
        marginTop: '10px'
        
    },
    stack: {
        width: '75%', 
        marginLeft: 'auto', 
        marginRight: 'auto'
    },
    stack2: {
        border: '1px solid', 
        borderColor: 'red', 
        borderRadius: '50px', 
        borderWidth: "medium",
        width: '100%',
        marginTop: '10px'
    },
    typography: { 
        marginLeft: '35vw', 
        color: "#02C5CF", 
        marginTop: '100px'
    },
    

}

// ============================================================

export interface SubmitProps {
    select: string 
}


interface SavedProps {
    savedItem: SearchProps
}

export interface SearchProps {
    image: string,
    name: string,
    habitat: string,
    diet: string,
    prey: string,
    name_of_young: string,
    common_name: string,
    number_of_species: string,
    location:string,
    group: string,
   
}


const SearchProps = (saved: SavedProps ) => {
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

      

        // if (mySaved.select > parseInt(_data.select)) {
        //     mySaved.select = parseInt(_data.select)
        // }

        
        // 2 args, 1st: where we are pushing, 2nd is what we are pushing
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
            <Button type='submit'>Submit</Button>
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

    const [ animalData, setAnimalData ] = useState<SearchProps[]>([])
    const [ _savedOpen, setSavedOpen ] = useState(false); 

    console.log(animalData)
    const { register, handleSubmit } = useForm<SubmitProps>({})

    const onSubmit:SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault();
        // I am having an issue here
        let myApiCall = await serverCalls.getSearch(data.search) as SearchProps[]; 
        setAnimalData(myApiCall)



        
    }
    return (
        <Box sx={ searchStyles.main }>
            <NavBar />
            <Typography 
                variant = 'h4'
                sx = { searchStyles.typography }
                >
                LETS EXPLORE THE WORLD OF WILD ANIMALS!
            </Typography>
            <form onSubmit = {handleSubmit(onSubmit)}>
                
                <Box sx={searchStyles.cardInfo}>
                    
                    <label htmlFor='search'>What Animal?</label>
                    <InputText {...register('search')} name='search' placeholder='search Here' />
                    <Button type='submit'
                     size='medium'
                     variant='outlined'
                     sx={searchStyles.button}>Submit</Button>
                </Box>
                
            </form>
          
            <Grid container spacing={3} sx={searchStyles.grid}>
                { animalData.map((search: SearchProps, index: number ) => (
                    <Grid item key={index} xs={12} md={6} lg={4}>
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
                                                
                                                <Typography>HABITAT: {search.habitat}</Typography>
                                                <Typography>DIET: {search.diet}</Typography>
                                                <Typography>PREY: {search.prey}</Typography>
                                                <Typography>NAME OF YOUNG: {search.name_of_young}</Typography>
                                                <Typography>COMMON NAME: {search.common_name}</Typography>
                                                <Typography>NUMBER OF SPECIES: {search.number_of_species}</Typography>
                                                <Typography>WHERE THEY LIVE: {search.location}</Typography>
                                                <Typography>TYPE OF ANIMAL: {search.group}</Typography>
                                                {/* I would like the output to look like a card catalog with Typewriter font */}
                                            {/* fontFamily: 'Fira Code, Consolas, Input, DejaVu Sans Mono, JetBrains Mono, and MonoLisa.' */}
                                          
                                        
                                        
                                    </Stack>
                              
                                    <Button
                                    size='medium'
                                    variant='outlined'
                                    sx={searchStyles.button}
                                    onClick = {()=>{ setSavedOpen(true)}}
                                >
                                    Add to Saved
                                    {/* {parseFloat(search.name).toFixed(2)} */}
                                </Button>
                                </Stack>
                            </CardContent>
                            <CardMedia 
                                component='img'
                                sx={searchStyles.cardMedia}
                                image={search.image}
                                alt={search.name}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
    

        </Box>
    )
}

{/* <Stack 
                                    direction='column'
                                    justifyContent='space-between'
                                    alignItems = 'center'
                                >
                                    <Stack 
                                        direction = 'row'
                                        alignItems = 'center'
                                        justifyContent = 'space-between'
                                    >
                                        <Accordion sx={{ color: 'white', backgroundColor: theme.palette.secondary.light }}>
                                            <AccordionSummary 
                                                expandIcon={<InfoIcon sx={{ color: theme.palette.primary.main }}/>}
                                            >
                                                <Typography>NAME: {search.name}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>HABITAT: {search.habitat}</Typography>
                                                <Typography>DIET: {search.diet}</Typography>
                                                <Typography>PREY: {search.prey}</Typography>
                                                <Typography>NAME OF YOUNG: {search.name_of_young}</Typography>
                                                <Typography>COMMON NAME: {search.common_name}</Typography>
                                                <Typography>NUMBER OF SPECIES: {search.number_of_species}</Typography>
                                                <Typography>WHERE THEY LIVE: {search.location}</Typography>
                                                <Typography>TYPE OF ANIMAL: {search.group}</Typography>
                                            
                                            </AccordionDetails>
                                        
                                        </Accordion>
                                    </Stack> */}