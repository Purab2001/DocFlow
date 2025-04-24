import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import Main from "../layout/Main";
import LoadingSpinner from "../ui/LoadingSpinner";
import RouteWrapper from "../ui/RouteWrapper"; // Combined wrapper component
import ErrorPage from "../pages/ErrorPage";

// Constants
const MIN_LOAD_TIME = 400;

/**
 * Fetch doctor data with error handling
 * @returns {Promise<Object>} JSON data
 */
const fetchDoctorData = async () => {
    try {
        const response = await fetch('../data.json');
        if (!response.ok) throw new Error('Failed to fetch doctor data');
        return response.json();
    } catch (error) {
        console.error("Error fetching doctor data:", error);
        return { doctors: [] }; // Return empty data as fallback
    }
};

/**
 * Fetch blog data with error handling
 * @returns {Promise<Object>} JSON data
 */
const fetchBlogs = async () => {
    try {
        const response = await fetch('/blogs.json');
        if (!response.ok) throw new Error('Failed to fetch blog data');
        return response.json();
    } catch (error) {
        console.error("Error fetching blog data:", error);
        return { blogs: [] }; // Return empty data as fallback
    }
};

// Lazy-loaded components
const Home = lazy(() => import("../pages/Home"));
const Bookings = lazy(() => import("../pages/Bookings"));
const Blogs = lazy(() => import("../pages/Blogs"));
const DoctorDetails = lazy(() => import("../pages/DoctorDetails"));

/**
 * Wrap a component with Suspense and data fetching capabilities
 * @param {React.Component} Component - The component to wrap
 * @param {boolean} useDataWrapper - Whether to use data wrapper
 * @returns {React.Element} Wrapped component
 */
const wrapRoute = (Component, useDataWrapper = true) => (
    <Suspense fallback={<LoadingSpinner />}>
        {useDataWrapper ? (
            <RouteWrapper minLoadTime={MIN_LOAD_TIME}>
                <Component />
            </RouteWrapper>
        ) : (
            <Component />
        )}
    </Suspense>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: wrapRoute(Home),
                loader: fetchDoctorData
            },
            {
                path: "/bookings",
                element: wrapRoute(Bookings, false), // No data fetching needed
            },
            {
                path: "/blogs",
                element: wrapRoute(Blogs),
                loader: fetchBlogs,
            },
            {
                path: "/doctor-details/:registration_number",
                element: wrapRoute(DoctorDetails),
                loader: fetchDoctorData,
            }
        ]
    },
]);

export default router;