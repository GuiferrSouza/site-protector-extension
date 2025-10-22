export default function LoadingScreen() {
    return (
        <div className="w-[420px] h-[600px] bg-gray-900 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-3"></div>
                <p className="text-gray-400 text-sm">Carregando configurações...</p>
            </div>
        </div>
    );
}