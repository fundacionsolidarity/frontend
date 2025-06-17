"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import PayPalOpenDonationButton from "./BotonPaypal";
declare global {
  interface Window {
    paypal: {
      HostedButtons: (options: { hostedButtonId: string }) => {
        render: (container: string) => Promise<void>;
      };
    };
  }
}
const ColaboraForm = () => {

  const [volunteerFormData, setVolunteerFormData] = useState({
        name: '',
        email: '',
        helpMessage: ''
    });
    const [volunteerSubmissionStatus, setVolunteerSubmissionStatus] = useState<string | null>(null); 

    const handleVolunteerChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setVolunteerFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleVolunteerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setVolunteerSubmissionStatus('sending'); // Establece el estado a 'sending' mientras se envía

        // Validación básica en el cliente
        if (!volunteerFormData.name || !volunteerFormData.email || !volunteerFormData.helpMessage) {
            setVolunteerSubmissionStatus('error');
            return;
        }

        try {
            // ** Este es el endpoint de tu Next.js API Route para colaboraciones **
            // Apunta a la ruta que definiremos a continuación: /api/send-collaboration
            const apiEndpoint = '/api/send-collaboration';

            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(volunteerFormData),
            });

            if (response.ok) {
                setVolunteerSubmissionStatus('success');
                setVolunteerFormData({ name: '', email: '', helpMessage: '' }); // Limpia el formulario
            } else {
                // Si la respuesta no es OK, intenta leer el error del backend
                const errorData = await response.json();
                console.error('Error al enviar solicitud de colaboración:', errorData);
                setVolunteerSubmissionStatus('error');
            }
        } catch (error) {
            console.error('Error de red o inesperado al enviar el formulario de colaboración:', error);
            setVolunteerSubmissionStatus('error'); // Error general de la petición
        } finally {
            // Restablece el estado después de un tiempo para que el usuario vea el mensaje
            setTimeout(() => setVolunteerSubmissionStatus(null), 5000);
        }
    };

    return (
        <section id="colabora" className="relative p-8 md:p-12 lg:p-16 min-h-[800px] flex flex-col items-center justify-center overflow-hidden">
            {/* Background with subtle animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 animate-gradient-flow z-0"></div>

            <div className="relative z-10 max-w-4xl mx-auto bg-white bg-opacity-90 p-6 md:p-10 rounded-3xl shadow-2xl animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6 tracking-tight flex items-center justify-center">
                    <span className="mr-3 text-4xl">🤝</span> Colabora con Nosotros
                </h2>
                <p className="text-center text-gray-700 text-lg mb-12 max-w-2xl mx-auto">
                    Tu apoyo impulsa nuestros proyectos y transforma vidas. Hay muchas formas de ser parte del cambio.
                </p>

                {/* Sección de Donaciones */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
                        <span className="mr-2 text-3xl">💖</span> Haz una Donación
                    </h3>
                    <p className="text-center text-gray-600 mb-8">
                        Cada aporte, grande o pequeño, nos permite seguir brindando educación y apoyo a quienes más lo necesitan.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <form id="frm_ePaycoCheckoutOpen" 
                                name="frm_ePaycoCheckoutOpen" 
                                method="POST" 
                                action="https://secure.payco.co/checkoutopen.php"
                                className="flex items-center justify-center p-5 bg-gradient-to-r from-yellow-400 to-green-200 text-white rounded-xl shadow-lg"
                        >
                                
                                <input name="p_cust_id_cliente" type="hidden" value="1554103"/>
                                <input name="p_key" type="hidden" value="633d57f2495953d3a6a9179a727ec426e5b9cb44"/>
                                <input name="p_id_factura" type="hidden" value=""/>
                                <input name="p_description" type="hidden" value="Donaciones Fundacion Solidarity"/>
                                <input name="p_detalle" type="hidden" value="Este pago es para poder donar abiertamente lo que quieras para nuestra causa"/>
                                <input name="p_referencia" type="hidden" value=""/>
                                <input name="p_test_request" type="hidden" value="false"/>
                                <input name="p_url_respuesta" type="hidden" value=""/>
                                <input name="p_url_confirmacion" type="hidden" value=""/>
                                <input type="image" id="imagen" src="https://multimedia.epayco.co/dashboard/btns/btn3.png" alt=""/>
                                <input type="hidden" id="idboton" name="idboton" value="0f6335b0-f97c-43eb-9434-890420849021"/>
                                                    
                        </form>
                        <PayPalOpenDonationButton />
                    </div>
                </div>

                {/* Sección de Voluntariado */}
                <div>
                    <h3 className="text-2xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
                        <span className="mr-2 text-3xl">🙋‍♀️</span> Sé Voluntario/a
                    </h3>
                    <p className="text-center text-gray-600 mb-8">
                        Tu tiempo y tus habilidades son un regalo invaluable. Únete a nuestro equipo y contribuye directamente.
                    </p>
                    <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="volunteerName" className="sr-only">Tu nombre</label>
                            <input
                                type="text"
                                id="volunteerName"
                                name="name"
                                placeholder="Tu nombre"
                                value={volunteerFormData.name}
                                onChange={handleVolunteerChange}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200 shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="volunteerEmail" className="sr-only">Tu correo</label>
                            <input
                                type="email"
                                id="volunteerEmail"
                                name="email"
                                placeholder="Tu correo"
                                value={volunteerFormData.email}
                                onChange={handleVolunteerChange}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200 shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="volunteerMessage" className="sr-only">Cuéntame cómo te gustaría ayudar</label>
                            <textarea
                                id="volunteerMessage"
                                name="helpMessage"
                                placeholder="Cuéntame cómo te gustaría ayudar"
                                rows={5}
                                value={volunteerFormData.helpMessage}
                                onChange={handleVolunteerChange}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200 shadow-sm resize-y"
                                required
                            ></textarea>
                        </div>

                        {volunteerSubmissionStatus === 'sending' && (
                            <div className="bg-blue-100 text-blue-700 p-3 rounded-lg text-center animate-fade-in">
                                Enviando solicitud...
                            </div>
                        )}
                        {volunteerSubmissionStatus === 'success' && (
                            <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center animate-fade-in">
                                ¡Gracias por tu interés en ser voluntario! Nos pondremos en contacto pronto.
                            </div>
                        )}
                        {volunteerSubmissionStatus === 'error' && (
                            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center animate-fade-in">
                                Hubo un error al enviar tu solicitud. Por favor, asegúrate de llenar todos los campos.
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={volunteerSubmissionStatus === 'sending'} // Deshabilita el botón mientras se envía
                            className={`w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold text-lg rounded-full shadow-lg
                                       ${volunteerSubmissionStatus === 'sending' ? 'opacity-60 cursor-not-allowed' : 'hover:from-blue-700 hover:to-green-700 transform hover:scale-105'}
                                       transition-all duration-300 ease-in-out animate-button-bounce`}
                        >
                            {volunteerSubmissionStatus === 'sending' ? 'Enviando...' : 'Enviar Solicitud'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ColaboraForm