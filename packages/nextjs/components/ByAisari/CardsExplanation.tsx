import steps from './data/steps.json';

interface Step {
    title: string;
    description: string;
}

const CardsExplanation = () => {
    return (
        <div className="flex flex-col items-center my-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="relative">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-72">
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                                <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardsExplanation;
