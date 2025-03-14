"use client"
import Image from 'next/image';
import { useState } from 'react';

const Banner = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="font-raleway tracking-wide flex flex-col gap-5 mx-auto mt-32 mb-52 px-4 sm:px-6 max-w-7xl">
            <div className="flex flex-col sm:flex-row gap-10 items-center">
                <h1 className="text-4xl sm:text-6xl lg:text-8xl text-bannerMain text-center sm:text-left lg:ml-5 md:ml-10">
                    Conte os seus <span className="text-primary">sentimentos</span>...
                </h1>
                <Image
                    src="/icons/bannerIcon.svg"
                    alt="menu de navegação"
                    width={203}
                    height={201}
                    className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 lg:mr-60 md:mr-10"
                />
            </div>
            <div className="bg-[#EFEFEF] p-5 w-[350px] max-w-8xl mx-auto shadow-md rounded-lg lg:ml-2 xl:w-[1200px] lg:w-[950px] xs:w-[250px] md:w-[650px]">
                <div className="relative">
                    <input
                        type="text"
                        className=" h-12 sm:h-16 lg:h-20 text-lg sm:text-xl lg:text-3xl p-3 border border-[#9E9E9E] shadow-md rounded-lg xl:w-[1150px] w-[300px] xs:w-[200px] md:w-[600px] lg:w-[900px]"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Me sinto alegre!"
                    />
                    <button className="absolute inset-y-0 right-0 px-4">
                        <Image
                            src="/icons/arrow.svg"
                            alt="enviar emoção"
                            width={61}
                            height={61}
                            className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
                        />
                    </button>
                </div>
            </div>
            <div className="flex justify-center sm:justify-end -mr-0 sm:-mr-32 lg:mr-10 md:mr-10">
                <button>
                    <Image
                        src="/icons/angry.svg"
                        alt="emoção - raiva"
                        width={53}
                        height={53}
                        className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
                    />
                </button>
                <button>
                    <Image
                        src="/icons/sad.svg"
                        alt="emoção - tristeza"
                        width={53}
                        height={53}
                        className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
                    />
                </button>
                <button>
                    <Image
                        src="/icons/happy.svg"
                        alt="emoção - felicidade"
                        width={53}
                        height={53}
                        className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
                    />
                </button>
                <button>
                    <Image
                        src="/icons/euphoric.svg"
                        alt="emoção - euforia"
                        width={53}
                        height={53}
                        className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
                    />
                </button>
                <button>
                    <Image
                        src="/icons/love.svg"
                        alt="emoção - apaixonado"
                        width={53}
                        height={53}
                        className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
                    />
                </button>
            </div>
        </div>
    );
};

export default Banner;