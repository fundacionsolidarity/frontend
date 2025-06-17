"use client"; // Este componente es un Client Component

import { useState, ChangeEvent, FormEvent } from 'react';

export default function PayPalOpenDonationButton() {
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Permite solo números y un punto decimal
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
    setMessage(null); // Limpia cualquier mensaje anterior al cambiar el monto
  };

  const handleDonation = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null); // Limpia mensajes anteriores
    setLoading(true);

    const donationAmount = parseFloat(amount);

    if (isNaN(donationAmount) || donationAmount <= 0) {
      setMessage('Por favor, ingresa un monto válido (mayor a cero) para la donación.');
      setLoading(false);
      return;
    }

    try {
      // Paso 1: Crear la orden de PayPal en tu backend
      // Debes crear un Next.js API Route (ej. /api/paypal/create-order)
      // Este endpoint de tu backend llamará a la API de PayPal para crear una orden.
      const createOrderResponse = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: donationAmount.toFixed(2), // Envía el monto al backend
          currency: 'USD', // Asegúrate de que esta moneda coincida con la que usarás en tu backend y PayPal
          description: 'Donación a Fundación Solidarity Colombia',
        }),
      });

      if (!createOrderResponse.ok) {
        const errorData = await createOrderResponse.json();
        console.error('Error al crear la orden de PayPal en el backend:', errorData);
        setMessage('Error al iniciar la donación. Por favor, intenta de nuevo más tarde.');
        setLoading(false);
        return;
      }

      const { orderID, redirectUrl } = await createOrderResponse.json();

      if (!orderID || !redirectUrl) {
        setMessage('No se pudo obtener la información de la orden de PayPal.');
        setLoading(false);
        return;
      }

      // Paso 2: Redirigir al usuario a PayPal para la aprobación
      // El usuario será redirigido a la página de PayPal para completar el pago.
      // Después de la aprobación, PayPal redirigirá de vuelta a una URL de retorno que definas.
      window.location.href = redirectUrl;

      // El resto de la lógica de captura se manejará en el backend
      // cuando PayPal redirija al usuario de vuelta a tu 'return_url'
      // y tu backend reciba la confirmación de la orden.

    } catch (error) {
      console.error('Error de red o inesperado al procesar la donación:', error);
      setMessage('Ocurrió un error inesperado. Por favor, verifica tu conexión e intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Dona con PayPal (API REST)</h3>
      <p className="text-center text-gray-600 mb-6">Ingresa el monto que deseas donar.</p>

      <form onSubmit={handleDonation} className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="paypalDonationAmount" className="sr-only">Monto de la donación</label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">USD $</span> {/* Ajusta la moneda según tu configuración de PayPal */}
            </div>
            <input
              type="text"
              id="paypalDonationAmount"
              name="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Ej: 25.00"
              className="block w-full rounded-md border-0 py-2 pl-16 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {message && (
          <div className={`text-center p-3 rounded-lg ${
            message.includes('válido') || message.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-full shadow-lg
                     hover:from-blue-700 hover:to-indigo-800 transform hover:scale-105 transition-all duration-300 ease-in-out"
          disabled={loading} // Deshabilita el botón mientras se procesa la donación
        >
          {loading ? 'Redirigiendo a PayPal...' : 'Donar con PayPal'}
        </button>
      </form>
    </div>
  );
}
