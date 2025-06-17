import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface FormData {
  name: string;
  email: string;
  message: string;
}


export async function POST(request: Request) {
  try {
    const { name, email, message }: FormData = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Faltan campos obligatorios: nombre, email o mensaje.' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, 
      port: parseInt(process.env.EMAIL_PORT || '587', 10), 
      secure: process.env.EMAIL_PORT === '465', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `${name} <${email}>`, 
      to: process.env.EMAIL_TO, 
      subject: `Nuevo mensaje de contacto de la web: ${name}`, 
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `, 
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Mensaje enviado con éxito' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en el API route /api/send-email:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al enviar el mensaje.' },
      { status: 500 }
    );
  }
}


