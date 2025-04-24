import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';
import { useLoaderData } from 'react-router';

/**
 * Wrapper component that ensures a minimum loading time for routes
 * and passes loader data to children components
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {number} props.minLoadTime - Minimum loading time in milliseconds
 * @returns {React.Element} Wrapped component or loading spinner
 */
const RouteWrapper = ({ children, minLoadTime = 400 }) => {
    const [isLoading, setIsLoading] = useState(true);
    const data = useLoaderData();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, minLoadTime);

        return () => clearTimeout(timer);
    }, [minLoadTime]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    // Clone the children and pass the loaded data as props
    return React.Children.map(children, child =>
        React.isValidElement(child)
            ? React.cloneElement(child, { data })
            : child
    );
};

RouteWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    minLoadTime: PropTypes.number
};

export default RouteWrapper;