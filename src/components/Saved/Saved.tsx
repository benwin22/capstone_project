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
// import { Collection } from '../Collection';
// import  serverCalls  from '../../api/server';







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
    const userId = localStorage.getItem('uuid')
    const savedRef = ref(db, `saved/${userId}/`); 


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

  
    const updateQuantity = async (id: string, operation: string) => {

        // findIndex method to find the index of a value based on a conditional
        const dataIndex: number = currentSaved?.findIndex((saved) => saved.id === id) as number//stores the index of the item it finds
        console.log(dataIndex)
        if (currentSaved) console.log(currentSaved[dataIndex as number])


        
        const updatedSaved = [...currentSaved as SearchProps[]]
        console.log(updatedSaved)
        if (operation == 'dec'){
            updatedSaved[dataIndex].quantity -= 1
        } else {
            updatedSaved[dataIndex].quantity += 1
        }

        setCurrentSaved(updatedSaved)
    }

   
    const updateSaved = async ( savedItem: SearchProps ) => {

        const itemRef = ref(db, `saveds/${userId}/${savedItem.id}`)


        
        update(itemRef, {
            quantity: savedItem.quantity
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


    
    const deleteItem = async (savedItem: SearchProps ) => {

        const itemRef = ref(db, `saveds/${userId}/${savedItem.id}`)


        
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


    




    return (
        <Box sx={searchStyles.main}>
            <NavBar />
            <Stack direction = 'column' sx={searchStyles.main} alignItems='center'>
                <Stack direction = 'row' alignItems = 'center' sx={{marginTop: '100px', marginLeft: '0'}}>
                    <Typography 
                        variant = 'h4'
                        sx = {{ marginRight: '40px'}}
                    >
                        {/* ${user.uid} ANIMALS */}
                    </Typography>
                    {/* <Button color = 'primary' variant = 'contained' onClick={ catalog } >Catalog</Button> */}
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
                                            >
                                                <Typography>{saved.name}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>{saved.description}</Typography>
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
                                                onClick={()=>{updateQuantity(saved.id, 'dec')}}
                                            >-</Button>
                                            <Typography variant = 'h6' sx={{color: 'white'}}>
                                                {saved.quantity}
                                            </Typography>
                                            <Button 
                                                size='large'
                                                variant='text'
                                                onClick={()=>{updateQuantity(saved.id, 'inc')}}
                                            >+</Button>
                                        </Stack>
                                        <Button 
                                            size = 'medium'
                                            variant = 'outlined'
                                            sx = {searchStyles.button}
                                            onClick = {()=>{updateSaved(saved)}}
                                        >
                                            Update Quantity = ${(saved.quantity * parseFloat(saved.price)).toFixed(2)}
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