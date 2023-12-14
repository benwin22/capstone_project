import * as _React from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useGetCollection } from '../../customHooks';
import { useState, useEffect } from 'react';
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Snackbar } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';


// Internal imports
// import { serverCalls } from '../../api';
import { InputText } from '../sharedComponents'; 
import { theme } from '../../Theme/themes';
import { SearchProps } from '../../customHooks';
import { SubmitProps } from '../Search';
import { MessageType } from '../Auth';
import { serverCalls } from '../../api/server';
import { updateCollection } from '../../api/server'

const columns: GridColDef[] = [
  { field: 'image', 
  headerName: 'Image', 
  width: 150,
   renderCell: (param) => ( 
        <img 
            src={param.row.image} 
            alt={param.row.name}
            style = {{ maxHeight: '100%', aspectRatio: '1/1'}} 
        ></img>
   ) 
},
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'habitat',
    headerName: 'Habitat',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'diet',
    headerName: 'Diet',
    width: 110,
    editable: true,
  },
  {
    field: 'prey',
    headerName: 'Prey',
    width: 110,
    editable: true,
  },
  {
    field: 'name_of_young',
    headerName: 'Name of Young', 
    width: 150,
    editable: true,
  },
  {
    field: 'common_name',
    headerName: 'Common Name', 
    width: 150,
    editable: true,
  },
  {
    field: 'number_of_species',
    headerName: 'Number of Species', 
    width: 150,
    editable: true,
  },
  {
    field: 'location',
    headerName: 'Where They Live', 
    width: 150,
    editable: true,
  },
 
  
];


interface UpdateProps {
    id: string,
    collectionData: SearchProps[]
}


const UpdateSelect = (props: UpdateProps) => {
    // setting up our hooks
    const [ openAlert, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const { register, handleSubmit } = useForm<SubmitProps>({})

    // using the useEffect so we don't go into an infinite loop with an undefined id, only checks once and gives us an error
    useEffect(() => {
        if (props.id === 'undefined'){
            setMessage('No collection Selected')
            setMessageType('error')
            setOpen(true)
            setTimeout(()  => window.location.reload(), 2000)
        }
    }, [])

    const onSubmit: SubmitHandler<SubmitProps> = async (data: SubmitProps, event: any) => {
        if (event) event.preventDefault();

        // let collectionId = ""
        

        // for (let collection of props.collectionData) {
        //     if (collection.name === props.id) {
        //         collectionId = collection.collection as string
  
        //     }
        // }

        const updateData = {
            "select" : data.select
        }

        const response = await serverCalls.updateCollection(Collection,updateData)
        if (response.status === 200){
            setMessage('Successfully updated item in your collection')
            setMessageType('success')
            setOpen(true)
            setTimeout(()=>{window.location.reload()}, 2000)
        } else {
            setMessage(response.message)
            setMessageType('error')
            setOpen(true)
            setTimeout(()=>{window.location.reload()}, 2000)
        }
    }


    return(
        <Box sx={{padding: '20px'}}>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Box>
                    <label htmlFor="select">What is the updated selection?</label>
                    <InputText {...register('select')} name='select' placeholder='Selection Here' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open={openAlert}
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

export const Collection = () => {
    const { collectionData } = useGetCollection(); 
    const [ gridData, setGridData ] = useState<GridRowSelectionModel>([])
    const [ open, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const [ openDialog, setDialogOpen ] = useState(false); // this hook will open up our Update Quantity Dialog Box

    
    const deleteItem = async () => {

        const id = `${gridData[0]}`



       
        let collectionData = ""
       
//        I am not using "id's" might need to adjust
        if (id === 'undefined'){
            setMessage('No collection Selected')
            setMessageType('error')
            setOpen(true)
            setTimeout(()=> window.location.reload(), 2000)
        }



        
        for (let _collection of collectionData){
            if (collectionData === id){
                // collection_id = collection.collection_id as string
                // prod_id = collection.prod_id as string
            }
        }

        // make a little dictionary to pass to our api call needs to match format of what flask is expecting

        const deleteData = {
            'collection': collectionData
        }

        const response = await serverCalls.deleteCollection(Collection,deleteData)

        if (response.status === 200) {
            setMessage('Successfully deleted item from collection')
            setMessageType('success')
            setOpen(true)
            setTimeout(()=>window.location.reload(), 2000)
        } else {
            setMessage(response.message)
            setMessageType('error')
            setOpen(true)
            setTimeout(()=>window.location.reload(), 2000)
        }


    }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={collectionData}
        columns={columns}
        sx={{ color: 'white', borderColor: theme.palette.primary.main, backGroundColor: theme.palette.secondary.light }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        getRowId={(row) => row.id}
        onRowSelectionModelChange = {(newSelectionModel) => setGridData(newSelectionModel)}
      />
      <Button variant='contained' color='info' onClick={()=> setDialogOpen(true)}>Update</Button>
      <Button variant='contained' color='warning' onClick={deleteItem}>Delete</Button>
      <Dialog open={openDialog} onClose={()=> setDialogOpen(false)}>
        <DialogContent>
            <DialogContentText>Collection Data: {gridData[0]}</DialogContentText>
        </DialogContent>
        <UpdateSelect id={`${gridData[0]}`} collectionData = {collectionData} />
        <DialogActions>
            <Button onClick = { ()=> setDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
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
  );
}