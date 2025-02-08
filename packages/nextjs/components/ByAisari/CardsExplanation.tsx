import { useState } from 'react';
import certificate from './data/certificate.json';
import strenghts from './data/strenghts.json';
import ReactMarkdown from 'react-markdown';

const CardsExplanation = () => {
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateDescription = () => {
        setLoading(true);
        setDescription(''); 
        setTimeout(() => {
            setDescription(strenghts[0].description);
            setLoading(false);
        }, 5000);
    };

    return (
        <div className="flex flex-col items-center my-20 px-6 max-w-7xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-16 text-center bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
                Academic Certificates
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {certificate.map((certificate, index) => (
                    <div 
                        key={index} 
                        className="transform transition-all duration-500 hover:scale-105 hover:rotate-1"
                    >
                        <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-sm border-2 border-transparent hover:border-blue-500/50 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                        {certificate.universityName}
                                    </h3>
                                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-xl font-semibold text-gray-700">{certificate.studentName}</p>
                                    <p className="text-lg font-medium text-blue-600">{certificate.courseName}</p>
                                    <p className="text-gray-600 font-medium">{certificate.degree}</p>
                                    <p className="text-sm text-gray-500 font-medium tracking-wider">{certificate.graduationDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 text-center">
                <button 
                    onClick={handleGenerateDescription} 
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                    Generate Description Using AI
                </button>
                {/* Show spinner if loading, otherwise show the description if available */}
                {loading ? (
                    <div className="mt-6 flex justify-center">
                        <svg
                            className="animate-spin h-8 w-8 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                        </svg>
                    </div>
                ) : (
                    description && (
                        <div className="mt-6 p-6 backdrop-blur-sm bg-white/90 rounded-xl shadow-lg max-w-2xl mx-auto text-left">
                            <ReactMarkdown className="prose prose-blue">
                                {description}
                            </ReactMarkdown>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default CardsExplanation;

