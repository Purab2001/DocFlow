import React, { useState, useRef, useEffect } from 'react';
import CountUp from 'react-countup';
import successDoctor from '../assets/success-doctor.png';
import successReview from '../assets/success-review.png';
import successPatients from '../assets/success-patients.png';
import successStaffs from '../assets/success-staffs.png';

const SuccessCard = ({ image, alt, count, text, isVisible }) => (
    <div className='space-y-4 bg-white p-6 sm:p-8 rounded-xl'>
        <img src={image} alt={alt} loading="lazy" />
        <h2 className='font-extrabold text-4xl sm:text-5xl md:text-6xl'>
            {isVisible ? (
                <CountUp end={count} suffix="+" duration={5} />
            ) : (
                <span>0+</span> // Placeholder before animation starts
            )}
        </h2>
        <p className='font-semibold text-lg sm:text-xl text-gray-600'>{text}</p>
    </div>
);

const Success = () => {
    const [isInViewport, setIsInViewport] = useState(false);
    const sectionRef = useRef(null);

    const successStats = [
        { image: successDoctor, count: 199, text: "Total Doctors", alt: "Doctor icon" },
        { image: successReview, count: 464, text: "Total Reviews", alt: "Review icon" },
        { image: successPatients, count: 1900, text: "Patients", alt: "Patient icon" },
        { image: successStaffs, count: 300, text: "Total Staffs", alt: "Staff icon" }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update state when intersection status changes
                setIsInViewport(entry.isIntersecting);
            },
            {
                root: null, // Use viewport as root
                rootMargin: '0px',
                threshold: 0.1 // Trigger when at least 10% of the section is visible
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className='p-2 md:p-8 lg:p-16 space-y-5'
            aria-labelledby="success-heading"
        >
            <h1 id="success-heading" className='text-center font-extrabold text-3xl md:text-4xl'>
                We Provide Best Medical Services
            </h1>
            <p className='text-center font-medium text-xs sm:text-sm md:text-base text-gray-700'>
                Our platform connects you with verified, experienced doctors across various specialties — all at your convenience.
            </p>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                {successStats.map((stat, index) => (
                    <SuccessCard
                        key={index}
                        image={stat.image}
                        alt={stat.alt}
                        count={stat.count}
                        text={stat.text}
                        isVisible={isInViewport}
                    />
                ))}
            </div>
        </section>
    );
};

export default Success;