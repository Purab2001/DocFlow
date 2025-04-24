import React, { useState } from 'react';
import Hero from '../components/Hero';
import DocsContainer from '../components/DocsContainer';
import { useLoaderData } from 'react-router';
import Success from '../components/Success';

const Home = () => {

    const data = useLoaderData();
    const [doctors, setDoctors] = useState(data);
    const handleSearch = (e, text) => {
        e.preventDefault();
        if (text === '') return setDoctors(data);
        const searchDoctors = data.filter(
            doctor =>
                doctor?.name?.toLowerCase().split(' ').includes(text.toLowerCase())
        )
        setDoctors(searchDoctors);
    }
    return (
        <div>
            <Hero handleSearch={handleSearch}></Hero>
            <DocsContainer doctors={doctors}></DocsContainer>
            <Success></Success>
        </div>
    );
};

export default Home;