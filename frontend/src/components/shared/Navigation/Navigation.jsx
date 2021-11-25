import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import {logOut} from '../../../http/index'
import {useDispatch} from 'react-redux'
import { setAuth } from '../../../store/authSlice';
import { useSelector } from 'react-redux';

const Navigation = () => {
    const dispatch  = useDispatch()
    const isAuth  = useSelector((state)=> state.auth.isAuth)
    async function logOutUser(){
        try { 
            const {data} = await logOut()
            dispatch(setAuth(data))


        }catch(e){
            console.log(e)
        }
    }
    const brandStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
    };

    const logoText = {
        marginLeft: '10px',
    };

    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to="/">
                <img src="/images/logo.png" alt="logo" />
                <span style={logoText}>eHub</span>
            </Link>
            { isAuth && <button onClick={logOutUser}>Logout</button> } 
        </nav>
    );
};

export default Navigation;