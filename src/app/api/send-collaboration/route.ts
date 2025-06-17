// src/app/api/send-collaboration/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'; // Importa la librería Nodemailer

interface CollaborationFormData {
  name: string;
  email: string;
  helpMessage: string; 
}


export async function POST(request: Request) {
  try {
    const { name, email, helpMessage }: CollaborationFormData = await request.json();
    if (!name || !email || !helpMessage) {
      return NextResponse.json(
        { message: 'Faltan campos obligatorios: nombre, email o mensaje de ayuda.' },
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
      to: process.env.EMAIL_TO_COLLABORATION || process.env.EMAIL_TO,
      subject: `Nueva Solicitud de Colaboración de la web: ${name}`, 
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje de Ayuda:</strong></p>
        <p>${helpMessage}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: 'Solicitud de colaboración enviada con éxito' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en el API route /api/send-collaboration:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al enviar la solicitud de colaboración.' },
      { status: 500 }
    );
  }
}
