"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { SocialLinks } from '../interfaces/social-links';
import { fetchAPI } from '@/app/lib/api';
 
const ContactForm = () => {
   const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [ socialLinks, setSocialLinks] = useState<SocialLinks>();
    const [submissionStatus, setSubmissionStatus] = useState<string | null>(null); 

    useEffect(() => {
        const fetchSocialLinks = async () => {      
            try {
                const data = await fetchAPI('/community'); 
                setSocialLinks(data);
            } catch (error) {
                console.error('Error al obtener los enlaces sociales:', error);
            }
        }
        fetchSocialLinks();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmissionStatus('sending'); 

        if (!formData.name || !formData.email || !formData.message) {
            setSubmissionStatus('error');
            return;
        }

        try {
            const apiEndpoint = '/api/send-email'; 

            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmissionStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                const errorData = await response.json();
                console.error('Error al enviar correo:', errorData);
                setSubmissionStatus('error');
            }
        } catch (error) {
            console.error('Error de red o inesperado al enviar el formulario:', error);
            setSubmissionStatus('error'); 
        } finally {
            setTimeout(() => setSubmissionStatus(null), 5000);
        }
    };

    return (
        <section id="contacto" className="relative p-8 md:p-12 lg:p-16 min-h-[600px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 animate-gradient-flow z-0"></div>

            <div className="relative z-10 max-w-2xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight flex items-center justify-center">
                    <span className="mr-3 text-4xl">✉️</span> Contáctanos
                </h2>
                <p className="text-center text-gray-700 text-lg mb-12 max-w-xl mx-auto">
                    ¿Tienes preguntas, ideas o quieres colaborar? ¡Nos encantaría escucharte! Envíanos un mensaje.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="sr-only">Tu nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Tu nombre"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200 shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Tu correo</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu correo"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200 shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="sr-only">Tu mensaje</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Tu mensaje"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200 shadow-sm resize-y"
                            required
                        ></textarea>
                    </div>

                    {submissionStatus === 'sending' && (
                        <div className="bg-blue-100 text-blue-700 p-3 rounded-lg text-center animate-fade-in">
                            Enviando mensaje...
                        </div>
                    )}
                    {submissionStatus === 'success' && (
                        <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center animate-fade-in">
                            ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
                        </div>
                    )}
                    {submissionStatus === 'error' && (
                        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center animate-fade-in">
                            Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={submissionStatus === 'sending'} 
                        className={`w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-full shadow-lg
                                   ${submissionStatus === 'sending' ? 'opacity-60 cursor-not-allowed' : 'hover:from-purple-700 hover:to-pink-700 transform hover:scale-105'}
                                   transition-all duration-300 ease-in-out animate-button-bounce`}
                    >
                        {submissionStatus === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
                    </button>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-gray-700 text-lg mb-6">O síguenos en nuestras redes:</p>
                    <div className="flex justify-center space-x-6">
                        {
                            socialLinks?.data.Email && (
                                <a 
                                    href={socialLinks?.data.Email || '#'} 
                                    className="text-purple-600 hover:text-purple-800 transform hover:scale-125 transition-transform duration-200"
                                    title="Email"
                                    aria-label="Email"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </a>
                            )
                        }

                        {
                           socialLinks?.data.Facebook && (
                                <a 
                                    href={socialLinks?.data.Facebook || '#'} 
                                    className="text-blue-600 hover:text-blue-800 transform hover:scale-125 transition-transform duration-200"
                                    title="Facebook"
                                    aria-label="Facebook"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </a>
                            ) 
                        }

                        {
                           socialLinks?.data.Linkeding && (
                                <a 
                                    href={socialLinks?.data.Linkeding || '#'}
                                    className="text-blue-800 hover:text-blue-900 transform hover:scale-125 transition-transform duration-200"
                                    title="LinkedIn"
                                    aria-label="LinkedIn"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6.5C2.89 6.5 2 5.61 2 4.5S2.89 2.5 4 2.5s2 .89 2 2S5.11 6.5 4 6.5z"></path></svg>
                                </a>
                            ) 
                        }

                        {
                           socialLinks?.data.Instagram && (
                                <a 
                                    href="#" 
                                    className="text-pink-600 hover:text-pink-800 transform hover:scale-125 transition-transform duration-200"
                                    title="Instagram"
                                    aria-label="Instagram"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                            ) 
                        }
                        
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactForm;
