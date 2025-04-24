import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    return (
        <>
           <Navbar></Navbar>
            <div className='min-h-[calc(100vh-397px)] bg-[#EFEFEF]'>
                <div className='max-w-screen-2xl mx-auto px-8 md:px-12 lg:px-16'>
                <Outlet></Outlet>
            </div>
           </div>
           <Footer></Footer>
           <ToastContainer></ToastContainer>
        </>
    );
};

export default Main;