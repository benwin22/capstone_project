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

// we want our columns to match our data object (name, description, price, quantity,....)

const columns: GridColDef[] = [
  { field: 'image', //thats what needs to match the keys on our objects/dictionaries
  headerName: 'Image', //this is whats being displayed as the column header
  width: 150,
   renderCell: (param) => ( //we are rendering html thats why we have () not {}
        <img 
            src={param.row.image} //param is whole list, row is object in that list, image is key on that object
            alt={param.row.name}
            style = {{ maxHeight: '100%', aspectRatio: '1/1'}} //making this a square no matter what size our image is 
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
    field: 'description',
    headerName: 'Description', 
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 110,
    editable: true,
  },
  {
    field: 'id',
    headerName: 'collection ID',
    width: 110,
    editable: true,
  },
 
  
];


interface UpdateProps {
    id: string,
    collectionData: SearchProps[]
}


const UpdateQuantity = (props: UpdateProps) => {
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

        let collectionId = ""
        let prodId = ""

        for (let collection of props.collectionData) {
            if (collection.id === props.id) {
                // collectionId = collection.collection_id as string
                // prodId = collection.prod_id as string 
            }
        }

        const updateData = {
            "prod_id" : prodId,
            "quantity" : data.quantity
        }

        const response = await serverCalls.updateData(collectionId, updateData)
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
                    <label htmlFor="quantity">What is the updated quantity?</label>
                    <InputText {...register('quantity')} name='quantity' placeholder='Quantity Here' />
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



       
        let collection_id = ""
        let prod_id = ""

        if (id === 'undefined'){
            setMessage('No collection Selected')
            setMessageType('error')
            setOpen(true)
            setTimeout(()=> window.location.reload(), 2000)
        }



        
        for (let collection of collectionData){
            if (collection.id === id){
                // collection_id = collection.collection_id as string
                // prod_id = collection.prod_id as string
            }
        }

        // make a little dictionary to pass to our api call needs to match format of what flask is expecting

        const deleteData = {
            'prod_id': prod_id
        }

        const response = await serverCalls.deleteCollection(collection_id, deleteData)

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
            <DialogContentText>Collection id: {gridData[0]}</DialogContentText>
        </DialogContent>
        <UpdateQuantity id={`${gridData[0]}`} collectionData = {collectionData} />
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