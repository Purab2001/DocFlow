import React from 'react';
import { NavLink } from 'react-router';
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareYoutube } from "react-icons/fa6";

const SocialMediaLinks = () => (
    <div className="grid grid-flow-col gap-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">
            <FaFacebook size={25} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter page">
            <FaSquareXTwitter size={25} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn page">
            <FaLinkedin size={25} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel">
            <FaSquareYoutube size={25} />
        </a>
    </div>
);

const Footer = () => {
    return (
        <footer className="footer flex flex-col items-center text-base-content rounded p-6 md:p-9">
            {/* Logo */}
            <NavLink to="/" className="text-3xl font-extrabold flex items-center gap-2">
                <img className="w-16 h-16" src="/DocFlow.png" alt="DocFlow Logo" />
                DocFlow
            </NavLink>

            {/* Navigation Links */}
            <nav className="grid grid-flow-col gap-4 mt-4">
                <ul className="menu menu-horizontal px-1 font-medium text-base">
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'border-b-2 rounded-none opacity-100' : 'opacity-70'}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/bookings" className={({ isActive }) => isActive ? 'border-b-2 rounded-none opacity-100' : 'opacity-70'}>
                            Bookings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/blogs" className={({ isActive }) => isActive ? 'border-b-2 rounded-none opacity-100' : 'opacity-70'}>
                            Blogs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? 'border-b-2 rounded-none opacity-100' : 'opacity-70'}>
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </nav>

            {/* Divider */}
            <div className="w-full border-t border-gray-300"></div>

            {/* Social Media Links */}
            <SocialMediaLinks />
        </footer>
    );
};

export default Footer;