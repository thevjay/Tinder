import React from 'react';

const Skeleton = () => {
    return (
        <div className="card bg-gray-200 w-96 shadow-lg rounded-2xl p-6 animate-pulse">
            <div className="flex flex-col items-center">
                <div className="skeleton bg-gray-300 h-24 w-24 rounded-full mb-4"></div>
                <div className="skeleton bg-gray-300 h-6 w-48 mb-2 rounded"></div>
                <div className="skeleton bg-gray-300 h-4 w-36 mb-2 rounded"></div>
                <div className="skeleton bg-gray-300 h-4 w-40 mb-4 rounded"></div>
            </div>
            <div className="skeleton bg-gray-300 h-32 w-full mb-4 rounded-lg"></div>
            <div className="skeleton bg-gray-300 h-4 w-64 mb-2 rounded"></div>
            <div className="skeleton bg-gray-300 h-4 w-64 mb-2 rounded"></div>
            <div className="skeleton bg-gray-300 h-4 w-64 mb-2 rounded"></div>
            <div className="flex justify-center gap-4 mt-6">
                <div className="skeleton bg-gray-300 h-10 w-24 rounded-lg"></div>
                <div className="skeleton bg-gray-300 h-10 w-24 rounded-lg"></div>
            </div>
        </div>
    );
};

export default Skeleton;
