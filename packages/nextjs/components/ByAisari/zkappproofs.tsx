import React, { useState } from 'react';

const ZkWalletConnect = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [error, setError] = useState('');

    const connectWallet = async () => {
        try {
            // Check if Mina wallet extension exists
            const mina = (window as any).mina;
            if (!mina) {
                throw new Error("Mina wallet extension not found! Please install Auro wallet.");
            }

            // Request wallet connection
            const accounts = await mina.requestAccounts();
            if (!accounts || accounts.length === 0) {
                throw new Error("No accounts found!");
            }

            // Get the first account
            const address = accounts[0];
            setWalletAddress(address);
            setIsConnected(true);
            setError('');
        } catch (err: any) {
            setError(err.message || 'Failed to connect wallet');
            setIsConnected(false);
            setWalletAddress('');
        }
    };

    const disconnectWallet = () => {
        setIsConnected(false);
        setWalletAddress('');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">ZK Wallet Connection</h2>

                {!isConnected ? (
                    <div className="text-center">
                        <p className="mb-4">Connect your ZK wallet to continue</p>
                        <button
                            onClick={connectWallet}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            Connect Wallet
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="mb-4">Wallet Connected</p>
                        <p className="text-sm text-gray-600 mb-4 break-all">{walletAddress}</p>
                        <button
                            onClick={disconnectWallet}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            Disconnect Wallet
                        </button>
                    </div>
                )}

                {error && (
                    <p className="text-red-500 text-xs italic mt-4 text-center">{error}</p>
                )}
            </div>
        </div>
    );
};

export default ZkWalletConnect;
