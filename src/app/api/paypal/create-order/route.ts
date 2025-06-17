import { NextResponse } from 'next/server';

async function generateAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const paypalApiBaseUrl = process.env.PAYPAL_API_BASE_URL || 'https://api-m.sandbox.paypal.com'; // Usar sandbox para desarrollo

  if (!clientId || !clientSecret) {
    throw new Error('PAYPAL_CLIENT_ID o PAYPAL_CLIENT_SECRET no están definidos en las variables de entorno.');
  }

  try {
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch(`${paypalApiBaseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${auth}`,
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al obtener token de acceso de PayPal:', errorData);
      throw new Error(`Fallo al generar token de acceso de PayPal: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Excepción al generar token de acceso de PayPal:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { amount, currency, description } = await request.json();
    const paypalApiBaseUrl = process.env.PAYPAL_API_BASE_URL || 'https://api-m.sandbox.paypal.com';

    if (!amount || parseFloat(amount) <= 0) {
      return NextResponse.json(
        { message: 'Monto de donación inválido.' },
        { status: 400 }
      );
    }
    if (!currency) {
      return NextResponse.json(
        { message: 'Moneda requerida.' },
        { status: 400 }
      );
    }

    const accessToken = await generateAccessToken();

    // Define las URLs de retorno y cancelación para PayPal
    // ** IMPORTANTE: Estas URLs deben ser rutas REALES en tu frontend de Next.js **
    // Por ejemplo, puedes crear src/app/donacion-exitosa/page.tsx
    // y src/app/donacion-cancelada/page.tsx
    const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/donacion-exitosa`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/donacion-cancelada`;

    // Crea la orden de PayPal
    const createOrderResponse = await fetch(`${paypalApiBaseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE', // O 'AUTHORIZE' si quieres capturar después
        purchase_units: [{
          amount: {
            currency_code: currency,
            value: amount,
          },
          description: description,
        }],
        application_context: {
          return_url: returnUrl,
          cancel_url: cancelUrl,
          user_action: 'PAY_NOW', // Mostrar un botón de "Pagar ahora" en PayPal
          shipping_preference: 'NO_SHIPPING', // No se requiere dirección de envío para donaciones
        },
      }),
    });

    if (!createOrderResponse.ok) {
      const errorData = await createOrderResponse.json();
      console.error('Error al crear la orden de PayPal:', errorData);
      return NextResponse.json(
        { message: 'Fallo al crear la orden de PayPal.', details: errorData },
        { status: createOrderResponse.status }
      );
    }

    const orderData = await createOrderResponse.json();
    const orderID = orderData.id;
    const redirectUrl = orderData.links.find((link: any) => link.rel === 'approve')?.href;

    if (!redirectUrl) {
      throw new Error('No se encontró URL de aprobación en la respuesta de PayPal.');
    }

    // Devuelve el orderID y la URL de redirección al frontend
    return NextResponse.json({ orderID, redirectUrl }, { status: 200 });

  } catch (error) {
    console.error('Error en el API route /api/paypal/create-order:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al crear la orden de PayPal.' },
      { status: 500 }
    );
  }
}
