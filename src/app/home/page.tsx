"use client";

import Banner from "@/components/mainBanner";
import { useState } from "react";
import useFetchPhraseData from "@/hooks/useFetchPhraseData";

export default function Home() {
    const [userMessage, setUserMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const { data, loading, error, fetchData } = useFetchPhraseData();

    const handleBuscar = async (messageParam?: string) => {
        const medicoParams = {
            message: messageParam ?? userMessage,
        };
        await fetchData("https://maoamiga.up.railway.app/chat", medicoParams);
        setModalOpen(true);
    };

    const handleBuscarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        handleBuscar();
    };

    const handleEmotionClick = (emotion: string) => {
        const messages: { [key: string]: string } = {
            raiva: "Estou com raiva.",
            triste: "Estou triste.",
            feliz: "Estou feliz.",
            apaixonado: "Estou apaixonado.",
        };

        const selected = messages[emotion] || "Estou sentindo algo.";
        setUserMessage(selected);
        handleBuscar(selected);
    };

    return (
        <div>
            <div className="relative mb-52">
                <Banner
                    value={userMessage}
                    onChange={setUserMessage}
                    handleSubmit={handleBuscarClick}
                    onEmotionClick={handleEmotionClick}
                />
                <div className="flex justify-center items-center">
                    {modalOpen && (
                        <div className="mt-4 mb-10 p-4 border rounded-3xl shadow-md bg-gray-100">
                            {loading && (
                                <p className="text-blue-500">Carregando resposta...</p>
                            )}

                            {error && (
                                <p className="text-red-500">Erro: {error}</p>
                            )}

                            {!loading && !error && data.length > 0 && (
                                data.map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative bg-white p-4 rounded-lg shadow-md mb-6 max-w-5xl mx-auto speech-bubble"
                                    >
                                        <h3 className="font-semibold mb-2 text-2xl">Resposta:</h3>
                                        <p className="text-gray-800 text-2xl">{item.bot_reply}</p>
                                        <p className="text-sm text-gray-500 mt-1">Emoção detectada: {item.feeling}</p>
                                    </div>
                                ))
                            )}

                            {!loading && !error && data.length === 0 && (
                                <p className="text-gray-500">Nenhuma resposta recebida.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
