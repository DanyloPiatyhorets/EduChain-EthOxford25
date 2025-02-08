import certificate from './data/certificate.json';

const CardsExplanation = () => {
    return (
        <div className="flex flex-col items-center my-16 px-4">
            <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Certificates
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {certificate.map((certificate, index) => (
                    <div 
                        key={index} 
                        className="transform transition-all duration-300 hover:scale-105"
                    >
                        <div className="bg-white rounded-xl shadow-xl p-8 w-80 h-full border border-gray-100 hover:border-blue-500">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {certificate.universityName}
                                    </h3>
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-lg font-medium text-gray-700">{certificate.studentName}</p>
                                    <p className="text-blue-600 font-semibold">{certificate.courseName}</p>
                                    <p className="text-gray-600 font-medium">{certificate.degree}</p>
                                    <p className="text-sm text-gray-500">{certificate.graduationDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardsExplanation;
