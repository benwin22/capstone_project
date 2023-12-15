import * as _React from 'react';
import { useState } from 'react'; 
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import {
    onAuthStateChanged,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword 
} from 'firebase/auth'; 
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    Snackbar,
    Stack,
    Divider,
    CircularProgress,
    Dialog,
    DialogContent,
    Alert} from '@mui/material'

// internal imports
import { NavBar, InputText, InputPassword } from '../sharedComponents/';
import searchImage from '../../assets/images/animals2.png';

const authStyles = {
    main: {
        backgroundImage: `url(${searchImage});`,
        width: '100%',
        height: '100%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top 5px', 
        position: 'absolute',
        marginTop: '10px',
        // color: 'red'
    },
    stack: {
        width: '400px',
        marginTop: '500px',
        marginRight: 'auto',//center div
        marginLeft: 'auto',
        color: 'blue'
    },
    button: {
        height: '50px',
        width: '175px',
        fontSize: '14px',
        color: 'blue'
        
    }
}

interface Props {
    title: string
}


interface ButtonProps {
    open: boolean 
    onClick: () => void
}


interface SubmitProps {
    email: string
    password: string 
}

export type MessageType = 'error' | 'warning' | 'info' | 'success'


const GoogleButton = (_props: ButtonProps ) => {
    // set up hooks/variables
    const [ open, setOpen ] = useState(false) //sets state of open to open signin box
    const [ message, setMessage ] = useState<string>() //setting messages for alerts
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate() //insantiating useNavigate function to use
    const auth = getAuth()// monitor state of authentication (true/false)
    const  [ signInWithGoogle, _user, loading, error ] = useSignInWithGoogle(auth)

    const signIn = async () => {
        await signInWithGoogle() // call function - Google DialogueBox>select user>sign in w/user 
        // use local storage: temp storage
        localStorage.setItem('auth', 'true')//key/value pairs in string format
        onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem('user', user.email || "")//shows loggedin:user in navbar
                localStorage.setItem('uuid', user.uid || "")// for cart to make unique users/orders
                setMessage(`Successfully logged in ${user.email}`)
                setMessageType('success')
                setOpen(true)
                // going to use setTimeout to display messagae for a short period & then navigate elsewhere
                setTimeout(() => {navigate('/search')}, 2000)//setTimeout, 2 args, function|time
            }
        })

        if (error){
            setMessage(error.message)
            setMessageType('error')
            setOpen(true)
        }

        if (loading){
            return <CircularProgress />
        }
    }

    return(
        <Box>
            <Button
                variant = 'contained'
                color = 'info'
                size = 'large'
                sx = { authStyles.button}
                onClick={ signIn }
            >
                Sign In With Google
            </Button>
            <Snackbar
                open = {open}
                autoHideDuration={2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity={messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}


const SignIn = () => {
    //hooks
    const [ open, setOpen ] = useState(false) //sets state of open to open signin box
    const [ message, setMessage ] = useState<string>() //setting messages for alerts
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate() //insantiating useNavigate function to use
    const auth = getAuth()
    const { register, handleSubmit } = useForm<SubmitProps>({})

    const onSubmit:SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault(); // prevents default functionality of any event

        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((_userCredential) => {localStorage.setItem('auth', 'true') //backup for monitoring logged in or not
        onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem('user', user.email || "") //show who is currently logged in
                localStorage.setItem('uuid', user.uid || "") // cart > unique for our users & for our orders
                setMessage(`Successfully logged in ${user.email}`)
                setMessageType('success')
                setOpen(true)
                // going to use setTimeout to display messagae for a short period & then navigate elsewhere
                setTimeout(() => {navigate('/search')}, 2000) //setTimeout takes 2 arguments, the first is function, second is time
            }
        } )
    })
    .catch((error) => {
        const errorMessage = error.message 
        setMessage(errorMessage)
        setMessageType('error')
        setOpen(true)
    })

    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant='h6'>Sign Into Your Account</Typography>
                <Box>
                    <label htmlFor='email'></label>
                    <InputText {...register('email')} name='email' placeholder='Email Here'/>
                    <label htmlFor='password'></label>
                    <InputPassword {...register('password')} name='password' placeholder='Password must be 6 characters'/>
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open = {open}
                autoHideDuration={2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity={messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}


const SignUp = () => {
    //hooks
    const [ open, setOpen ] = useState(false) 
    const [ message, setMessage ] = useState<string>() 
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate() 
    const auth = getAuth()
    const { register, handleSubmit } = useForm<SubmitProps>({})

    const onSubmit:SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault(); 

        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((_userCredential) => {localStorage.setItem('auth', 'true') 
        onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem('user', user.email || "") 
                localStorage.setItem('uuid', user.uid || "") 
                setMessage(`Successfully logged in ${user.email}`)
                setMessageType('success')
                setOpen(true)
                setTimeout(() => {navigate('/search')}, 2000) 
            }
        } )
    })
    .catch((error) => {
        const errorMessage = error.message 
        setMessage(errorMessage)
        setMessageType('error')
        setOpen(true)
    })

    }
// this is the email sign up button pop up
    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant='h6'>ANIMAL DATA Sign Up!</Typography>
                <Box>
                    <label htmlFor='email'></label>
                    <InputText {...register('email')} name='email' placeholder='Email Here'/>
                    <label htmlFor='password'></label>
                    <InputPassword {...register('password')} name='password' placeholder='Password must be 6 characters'/>
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open = {open}
                autoHideDuration={2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity={messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}


export const Auth = (props:Props) => {
    const [open, setOpen] = useState(false)
    const [ signType, setSignType ] = useState<string>()

// this is the page with buttons to signin/up
    return (
        <Box>
            
            <Box sx={ authStyles.main}>
                <Stack direction = 'column' alignItems='center' textAlign= 'center' sx={authStyles.stack}>
                    <Typography variant = 'h2' sx={{color: 'white'}}>
                        {props.title}
                    </Typography>
                    <br />
                    <Typography variant='h5'>
                        LETS EXPLORE WILD ANIMALS!
                    </Typography>
                    <NavBar />
                    <br />
                    <GoogleButton open={open} onClick={() => setOpen(false)}/>
                    <Divider variant='fullWidth' color = 'white' />
                    <br />
                    <Stack
                        width = '100%'
                        alignItems='center'
                        justifyContent='space-between'
                        direction='row'
                    >
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            sx={ authStyles.button}
                            onClick={ () => { setOpen(true); setSignType('signin')}}
                        >
                            Email Log In
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            sx={ authStyles.button}
                            onClick={ () => { setOpen(true); setSignType('signup')}}
                        >
                            Email Sign Up
                        </Button>

                    </Stack>
                </Stack>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogContent>
                        { signType === 'signin' ? <SignIn/> : <SignUp />}
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>
    )
}