import React, { useMemo } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

// Array of colors for the chart bars
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

/**
 * Generates an SVG path for a triangle-shaped bar
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} width - Bar width
 * @param {number} height - Bar height
 * @returns {string} SVG path string
 */
const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

/**
 * Custom triangle bar component for the chart
 */
const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

/**
 * Bar chart component that displays doctor appointment fees
 */
const AppointmentFeeChart = ({ appointments }) => {
    // Transform appointment data for the chart
    const chartData = useMemo(() => (
        appointments.map((appointment) => ({
            name: appointment.doctorName,
            fee: appointment.fee,
        }))
    ), [appointments]);

    // Show a message when no data is available
    if (chartData.length === 0) {
        return (
            <div className="bg-white rounded-xl p-6 w-full h-[400px] flex items-center justify-center">
                <p className="text-gray-500">No appointment data available</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-2 md:p-6 w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    aria-label="Bar chart showing doctor appointment fees"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <text x="50%" y="15" textAnchor="middle" dominantBaseline="middle" className="recharts-text">
                        Doctor Appointment Fees
                    </text>
                    <Bar dataKey="fee" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

AppointmentFeeChart.propTypes = {
    appointments: PropTypes.arrayOf(
        PropTypes.shape({
            doctorName: PropTypes.string.isRequired,
            fee: PropTypes.number.isRequired,
        })
    ).isRequired,
};

AppointmentFeeChart.defaultProps = {
    appointments: [],
};

export default AppointmentFeeChart;