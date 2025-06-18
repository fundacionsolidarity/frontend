import Image from "next/image";
import { LogoNavbar } from "./interfaces/navbar";
import { fetchAPI } from "../lib/api";



export const Header = async () => {

    const { data }: LogoNavbar = await fetchAPI('/logo-navbar');
    const {  logoNavbar }= data 
    return (
    <header className="relative w-full overflow-hidden bg-gradient-to-br from-pink-400 via-orange-200 to-yellow-300 p-4 shadow-md rounded-b-xl">
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white opacity-20 rounded-full animate-float-one"></div>
        <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-white opacity-15 rounded-full animate-float-two"></div>
        <div className="absolute bottom-1/4 left-1/2 w-10 h-10 bg-white opacity-25 rounded-full animate-float-three"></div>

        <div className="container mx-auto flex items-center justify-between z-10 relative">
        {/* Logo/Título - Animación de rebote sutil al cargar */}
        <div className="flex items-center">
            <Image
            src={ logoNavbar[0]?.url } // Placeholder para tu logo
            alt="Logo Fundación Solidarity Colombia"
            width={100}
            height={100}
            className="w-16 h-16 md:w-16 md:h-16  rounded-full mr-4 transform transition-transform duration-300 hover:scale-110 animate-bounce-once"
            />
            <h1 className="text-white text-xl md:text-3xl font-bold tracking-wide">
            Fundación Solidarity Colombia
            </h1>
        </div>
        </div>
    </header>
    )
}