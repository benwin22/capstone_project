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

import { NavBar, InputText } from '../sharedComponents';
import { theme } from '../../Theme/themes';
import { MessageType } from '../Auth';
import  searchImage  from '../../assets/images/animals.jpg';
import { serverCalls } from '../../api';
// import SearchProps from '../Search';
// import { searchBar } from '../sharedComponents';


// WANT A SEARCH BAR!!=====================================
// import TextField from '@mui/material/TextField';

// interface SearchBarProps {
//   onSearch: (query: string) => void;
// }

// const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState<string>('');

//   const handleSearch = () => {
//     onSearch(searchQuery);
//   };

//   return (
//     <TextField
//       label="Search ANIMALS"
//       variant="outlined"
//       value={searchQuery}
//       onChange={(e) => setSearchQuery(e.target.value)}
//       onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//     />
//   );
// };

// export default searchBar;
// =================================================================

// CSS style object 
export const searchStyles = {
    main: {
        backgroundImage: `url(${searchImage});`,
        height: '100%',
        width: '100%',
        color: 'grey',
        backgroundSize: 'contain',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: 'fixed',
        position: 'absolute',
        overflow: 'auto',
        paddingBottom: '100px'
    },
    grid: {
        marginTop: '25px', 
        marginRight: 'auto', 
        marginLeft: 'auto', 
        width: '70vw'
    },
    card: {
        width: "400px", 
        padding: '10px',
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgb(217,156,159)",
        border: '2px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '10px'
    },
    cardInfo: {
        width: "600px",
        marginRight: 'auto', 
        marginLeft: 'auto',
        padding: '10px',
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgb(217,156,159)",
        border: '2px solid',
        borderColor: '#02C5CF',
        borderRadius: '10px',
        textAlign: 'center'
    },
    cardMedia: {
        width: '95%',
        margin: 'auto',
        marginTop: '5px',
        aspectRatio: '1/1',
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '10px'
    },
    button: {
        borderWidth: "medium",
        color: '#grey', 
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
        borderColor: theme.palette.primary.main, 
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



export interface SubmitProps {
    search: string 
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

        const userId = localStorage.getItem('uuid') 
        const savedRef = ref(db, `saved/${userId}/`) 

      

        // if (mySaved.quantity > parseInt(data.quantity)) {
        //     mySaved.quantity = parseInt(data.quantity)
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
                autoHideDuration={3000}
                onClose={()=> setOpen(false)}
            >
                <Alert severity = {messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}


export const Search = () => {
    // hooks
    // const { searchData } = useGetSearch(); //list of all our data objects 
    const [ animalData, setAnimalData ] = useState<SearchProps[]>([])
    // const [ currentSearch] = useState<SearchProps[]>([]); //one and only one object we will send to our saved 
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
                {animalData.map((search: SearchProps, index: number ) => (
                    <Grid item key={index} xs={12} md={6} lg={4}>
                        <Card sx={searchStyles.card}>
                            <CardMedia 
                                component='img'
                                sx={searchStyles.cardMedia}
                                image={search.image}
                                alt={search.name}
                            />
                            <CardContent>
                                <Stack 
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
                                    </Stack>
                                <Button
                                    size='medium'
                                    variant='outlined'
                                    sx={searchStyles.button}
                                    onClick = {()=>{ setSavedOpen(true)}}
                                >
                                    Add to Saved - ${parseFloat(search.name).toFixed(2)}
                                </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </Box>
    )
}