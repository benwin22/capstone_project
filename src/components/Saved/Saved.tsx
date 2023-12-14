import * as _React  from 'react'; 
import { useState, useEffect } from 'react'; 
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
    Stack,
    Typography,
    Snackbar,
    Alert } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import { getDatabase, ref, onValue, off, remove, update } from 'firebase/database';

// internal imports
import { NavBar } from '../sharedComponents';
import { theme } from '../../Theme/themes';
import { SearchProps } from '../../customHooks';
import { searchStyles } from '../Search';
import { MessageType } from '../Auth'; 
import { serverCalls } from '../../api/server';
// import { Collection } from '../Collection';









export interface CreateCollectionProps {
    collection: SearchProps[]
}


export const Saved = () => {
//   setup our hooks
    const db = getDatabase();
    const [ open, setOpen ] = useState(false)
    const [ message, setMessage] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const [ currentSaved, setCurrentSaved ] = useState<SearchProps[]>()
    const user = localStorage.getItem('uuid')
    const savedRef = ref(db, `saved/${user}/`); 


    useEffect(()=> {


     
        onValue(savedRef, (snapshot) => {
            const data = snapshot.val() 
           
            let savedList = []

            if (data){
                for (let [key, value] of Object.entries(data)){
                    let savedItem = value as SearchProps
                    savedItem['id'] = key
                    savedList.push(savedItem)
                }
            }

            setCurrentSaved(savedList as SearchProps[])
        })

        
        return () => {
            off(savedRef)
        }
    },[]);

  
    // const updateSelect = async (_name: string, operation: string) => {

    //     // findIndex method to find the index of a value based on a conditional
    //     const dataIndex: number = currentSaved?.findIndex((saved) => saved.name === _name) as number//stores the index of the item it finds
    //     console.log(dataIndex)
    //     if (currentSaved) console.log(currentSaved[dataIndex as number])


        
    //     const updatedSaved = [...currentSaved as SearchProps[]]
    //     console.log(updatedSaved)
    //     if (operation == 'dec'){
    //         updatedSaved[dataIndex].select -= 1
    //     } else {
    //         updatedSaved[dataIndex].select += 1
    //     }

    //     setCurrentSaved(updatedSaved)
    // }

   
    const updateSaved = async ( savedItem: SearchProps ) => {

        const itemRef = ref(db, `saveds/${user}/${savedItem.id}`)


        
        update(itemRef, {
            select: savedItem.select
        })
        .then(() => {
            setMessage('Successfully Updated Your Saved')
            setMessageType('success')
            setOpen(true)
        })
        .then(() => {
            setTimeout(() => window.location.reload(), 2000)
        })
        .catch((error) => {
            setMessage(error.message)
            setMessageType('error')
            setOpen(true)
        })
    }


    // I don't have items
    const deleteItem = async (savedItem: SearchProps ) => {

        const itemRef = ref(db, `saved/${user}/${savedItem.id}`)


        
        remove(itemRef)
        .then(() => {
            setMessage('Successfully Deleted Item from Saved')
            setMessageType('success')
            setOpen(true)
        })
        .then(() => {
            setTimeout(() => window.location.reload(), 2000)
        })
        .catch((error) => {
            setMessage(error.message)
            setMessageType('error')
            setOpen(true)
        })
    }
    // function updateSelect(name: any, arg1: string) {
    //     throw new Error('Function not implemented.');
    // }

// not sure I need this code....
    // const catalog = async () => {

    //     const data: CreateCollectionProps = {
    //         'collection': currentSaved as SearchProps[]
    //     }

    //     const response = await serverCalls.createCollection(data)

    //     if (response.status === 200){ //200 is a good status code
    //         remove(savedRef) //this is removing our whole entire cartRef aka emptying our cart
    //         .then(() => {
    //             console.log("Saved cleared successfully")
    //             setMessage('Successfully compiled')
    //             setMessageType('success')
    //             setOpen(true)
    //             setTimeout(()=>{window.location.reload()}, 2000)
    //         })
    //         .catch((error) => {
    //             console.log("Error clearing Saved: " + error.message)
    //             setMessage(error.message)
    //             setMessageType('error')
    //             setOpen(true)
    //             setTimeout(()=>{window.location.reload()}, 2000)
    //         })
    //     } else {
    //         setMessage('Error with your Saved')
    //         setMessageType('error')
    //         setOpen(true)
    //         setTimeout(()=>{window.location.reload()}, 2000)
    //     }

    // }



    return (
        <Box sx={searchStyles.main}>
            <NavBar />
            <Stack direction = 'column' sx={searchStyles.main} alignItems='center'>
                <Stack direction = 'row' alignItems = 'center' sx={{marginTop: '100px', marginLeft: '0'}}>
                    <Typography 
                        variant = 'h4'
                        sx = {{ marginRight: '40px'}}
                    >
                       Saved Animals
                    </Typography>
                    {/* <Button color = 'primary' variant = 'contained' onClick={ catalog } >Compile</Button> */}
                </Stack>
                <Grid container spacing={3} sx={searchStyles.grid}>
                    {currentSaved?.map((saved: SearchProps, index: number) => (
                        <Grid item key={index} xs={12} md={6} lg={4}>
                            <Card sx={searchStyles.card}>
                                <CardMedia 
                                    component = 'img'
                                    sx = {searchStyles.cardMedia}
                                    image = {saved.image}
                                    alt = {saved.name}
                                />
                                <CardContent>
                                    <Stack direction = 'column' justifyContent='space-between' alignItems = 'center'>
                                        <Accordion sx = {{color: 'white', backgroundColor: theme.palette.secondary.light}}>
                                            <AccordionSummary 
                                                expandIcon={<InfoIcon sx={{color: theme.palette.primary.main}}/>}
                                            >@#$%
                                                <Typography>{saved.name}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>{saved.habitat}</Typography>
                                            </AccordionDetails>
                                            <AccordionDetails>
                                                <Typography>{saved.diet}</Typography>
                                            </AccordionDetails>
                                            <AccordionDetails>
                                                <Typography>{saved.prey}</Typography>
                                            </AccordionDetails>
                                            <AccordionDetails>
                                                <Typography>{saved.name_of_young}</Typography>
                                            </AccordionDetails>
                                            <AccordionDetails>
                                                <Typography>{saved.common_name}</Typography>
                                            </AccordionDetails>
                                            <AccordionDetails>
                                                <Typography>{saved.number_of_species}</Typography>
                                            </AccordionDetails>
                                            <AccordionDetails>
                                                <Typography>{saved.location}</Typography>
                                            </AccordionDetails>
                                            <AccordionDetails>
                                                <Typography>{saved.group}</Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Stack 
                                            direction = 'row' 
                                            alignItems = 'center' 
                                            justifyContent='space-between' 
                                            sx={searchStyles.stack2}
                                        >
                                            <Button 
                                                size='large'
                                                variant='text'
                                                onClick={()=>{updateSelect(saved.name, 'dec')}}
                                            >-</Button>
                                            <Typography variant = 'h6' sx={{color: 'red'}}>
                                                {saved.select}
                                            </Typography>
                                            <Button 
                                                size='large'
                                                variant='text'
                                                onClick={()=>{updateSelect(saved.name, 'inc')}}
                                            >+</Button>
                                        </Stack>
                                        <Button 
                                            size = 'medium'
                                            variant = 'outlined'
                                            sx = {searchStyles.button}
                                            onClick = {()=>{updateSaved(saved)}}
                                        >
                                            Update Select(Don't need this) = ${(saved.select * parseFloat(saved.name)).toFixed(2)}
                                        </Button>
                                        <Button 
                                            size = 'medium'
                                            variant = 'outlined'
                                            sx = {searchStyles.button}
                                            onClick = {()=>{deleteItem(saved)}}
                                        >
                                            Delete Item From Saved
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>

                        </Grid>
                    ))}
                </Grid>
                <Stack direction = 'column' sx={{marginLeft: ''}}>
                    <Typography 
                        variant = 'h4'
                        sx={{ marginTop: '50px', marginBottom: '100px'}}
                        >
                            Your Collections
                        </Typography>
                        {/* <Collection /> */}
                </Stack>
            </Stack>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={()=> setOpen(false)}
            >
                <Alert severity = {messageType}>
                    {message}
                 </Alert>
            </Snackbar>

         </Box>
    )

}