"use client"; // Este componente será un Client Component

import { useState, ChangeEvent, FormEvent } from 'react';

// Define la interfaz de Epayco Checkout para TypeScript
declare global {
  interface Window {
    ePayco: any; // La librería de Epayco se adjunta al objeto window
  }
}

export default function OpenDonationButton() {
  const [amount, setAmount] = useState<string>('');
  const [status, setStatus] = useState<string | null>(null); // 'success', 'error', 'loading'

  // ** Reemplaza con tus credenciales REALES de Epayco **  // Puedes obtenerlas de tu panel de Epayco (Configuración -> Llaves API)
  const EPAYCO_PUBLIC_KEY = process.env.NEXT_PUBLIC_EPAYCO_PUBLIC_KEY || 'TU_LLAVE_PUBLICA_EPAYCO'; // Asegúrate de usar una variable de entorno
  //const EPAYCO_CLIENT_ID = process.env.NEXT_PUBLIC_EPAYCO_CLIENT_ID || 'TU_ID_CLIENTE_EPAYCO'; // Usualmente tu P_CUST_ID_PAYCO

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, ''); 
    setAmount(value);
  };

  const handleDonation = (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const donationAmount = parseFloat(amount);

    if (isNaN(donationAmount) || donationAmount <= 0) {
      setStatus('error');
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    if (typeof window.ePayco === 'undefined') {
      console.error('Epayco script no está cargado.');
      setStatus('error');
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    // Opciones del checkout de Epayco
    const handler = window.ePayco.checkout.configure({
      key: EPAYCO_PUBLIC_KEY,
      external: 'false', // Abre el checkout en un modal
      test: true, // Cambia a 'false' para producción
    });

    const data = {
      // Datos de la transacción
      name: 'Donación a Fundación Solidarity Colombia',
      description: 'Aporte voluntario para nuestros programas sociales',
      currency: 'COP', // Moneda: COP para pesos colombianos
      amount: donationAmount.toFixed(0), // El monto de la donación (sin decimales para COP)
      tax_base: '0', // Base gravable para impuestos (si aplica)
      tax: '0', // Valor de impuestos (si aplica)
      dues: '0', // Cuotas (0 para pago único)
      // Datos del cliente (puedes recolectarlos en tu formulario o ponerlos por defecto)
      // customer_firstname: 'Nombre',
      // customer_lastname: 'Apellido',
      // customer_email: 'email@ejemplo.com',
      // customer_phone: '1234567890',

      // URL de respuesta (a donde redirigir después de la transacción)
      // **IMPORTANTE: Debes tener una URL en tu sitio que Epayco pueda llamar para confirmar la transacción.**
      // Crea una ruta en tu Next.js como /api/epayco-response para esto.
      response: 'https://tu-dominio.com/api/epayco-response', // Reemplaza con tu dominio real
      confirmation: 'https://tu-dominio.com/api/epayco-confirmation', // Reemplaza con tu dominio real

      // Parámetros personalizados (opcional)
      extra1: 'Donacion_Voluntaria', // Puedes usar esto para identificar el tipo de transacción
      // Para recibir más información de la transacción en el response, puedes enviar campos adicionales
      // x_ref_payco, x_transaction_id, x_amount, etc.

      // Propiedades de personalización visual (opcional)
      buttonType: 'custom', // Indica que no es un botón predefinido de Epayco
      autoclick: false, // No iniciar el checkout automáticamente
    };

    handler.open(data);
    setStatus(null); // Resetea el estado después de abrir el checkout, Epayco manejará el resto.
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Dona el valor que desees</h3>
      <p className="text-center text-gray-600 mb-6">Tu aporte es fundamental para nuestra misión.</p>
      <form onSubmit={handleDonation} className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="donationAmount" className="sr-only">Monto de la donación</label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">COP $</span>
            </div>
            <input
              type="text" // Usar text para manejar la entrada y luego parsear a float
              id="donationAmount"
              name="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Ej: 50000"
              className="block w-full rounded-md border-0 py-2 pl-16 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {status === 'loading' && (
          <div className="text-center text-blue-600">Procesando donación...</div>
        )}
        {status === 'error' && (
          <div className="text-center text-red-600">Por favor, ingresa un monto válido.</div>
        )}
        {status === 'success' && (
          <div className="text-center text-green-600">¡Gracias por tu donación!</div>
        )}

        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold rounded-full shadow-lg
                     hover:from-teal-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Procesando...' : 'Donar Ahora'}
        </button>
      </form>
    </div>
  );
}
