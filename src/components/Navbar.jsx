import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    // Navigation link data
    const navLinks = [
        { path: '/', text: 'Home' },
        { path: '/bookings', text: 'Bookings' },
        { path: '/blogs', text: 'Blogs' },
        { path: '/contact', text: 'Contact' },
    ];

    // Helper function for navigation link classes
    const getNavLinkClass = (isActive) =>
        isActive ? 'border-b-2 rounded-none opacity-100' : 'opacity-70';

    return (
        <div className="navbar py-4 bg-[#EFEFEF] px-8 md:px-12 lg:px-16">
            <div className="navbar-start">
                {/* Mobile menu dropdown */}
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="mr-2 lg:hidden"
                        aria-label="Toggle navigation menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                    >
                        {navLinks.map(link => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => getNavLinkClass(isActive)}
                                >
                                    {link.text}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Logo */}
                <NavLink to='/' className="text-3xl font-extrabold flex items-center gap-2">
                    <img
                        className='w-16 h-16'
                        src="/DocFlow.png"
                        alt="DocFlow Logo"
                        loading="lazy"
                    />
                    DocFlow
                </NavLink>
            </div>
            {/* Desktop navigation */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium text-base">
                    {navLinks.map(link => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) => getNavLinkClass(isActive)}
                            >
                                {link.text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Emergency button */}
            <div className="navbar-end">
                <button
                    className="relative cursor-pointer hidden md:block items-center justify-start px-5 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group"
                    aria-label="Emergency contact"
                >
                    <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">Emergency</span>
                </button>
            </div>
        </div>
    );
};

export default Navbar;