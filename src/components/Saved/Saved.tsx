import * as _React  from 'react'; 
import { useState, useEffect } from 'react'; 
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
    CardMedia,
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
import { AnimalProps, searchStyles } from '../Search';
import { MessageType } from '../Auth'; 
import { serverCalls } from '../../api';
// import { Collection } from '../Collection';









// export interface CreateCollectionProps {
//     collection: SearchProps[]
// }


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
   
    return (
        <Box sx={searchStyles.main}>
            <NavBar />
           
            <Stack direction = 'column' sx={searchStyles.main} alignItems='center'>
                <Stack direction = 'column' alignItems = 'center' sx={{marginTop: '100px', marginLeft: '0'}}>
                    <Typography 

                        variant = 'h4'
                        sx = {{ marginRight: '40px'}}
                    >
                       Saved Animals
                    </Typography>
                   
                </Stack>
                
                <Stack spacing={8} sx={searchStyles.stack}>
                    {currentSaved?.map((saved: AnimalProps, index: number) => (
                        
                        <Stack key={saved.id}>
                            <Card sx={searchStyles.card}>
                               
                                <CardContent>
                                <Stack 
                                        direction = 'column'
                                        alignItems = 'left'
                                        justifyContent = 'space-between'
                                   
                                         sx={{ color: 'charcoal', backgroundColor: 'ivory'  }}>
                                          
                                                <Typography>NAME: {saved.name}</Typography>
                                                
                                                {/* <Typography>HABITAT: {saved.habitat}</Typography>
                                                <Typography>DIET: {saved.diet}</Typography>
                                                <Typography>PREY: {saved.prey}</Typography>
                                                <Typography>NAME OF YOUNG: {saved.name_of_young}</Typography>
                                                <Typography>COMMON NAME: {saved.common_name}</Typography>
                                                <Typography>NUMBER OF SPECIES: {saved.number_of_species}</Typography>
                                                <Typography>WHERE THEY LIVE: {saved.location}</Typography>
                                                <Typography>TYPE OF ANIMAL: {saved.group}</Typography> */}
                                                {/* I would like the output to look like a card catalog with Typewriter font */}
                                            {/* fontFamily: 'Fira Code, Consolas, Input, DejaVu Sans Mono, JetBrains Mono, and MonoLisa.' */}

                                   
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
                                <CardMedia 
                                    component = 'img'
                                    sx = {searchStyles.cardMedia}
                                    image = {saved.image}
                                    alt = {saved.name}
                                />
                            </Card>

                        </Stack>
                    ))}
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