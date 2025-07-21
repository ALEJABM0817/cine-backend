import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface CorreoContenido {
  asunto: string;
  cuerpo: string;
}

export async function sendMail(destinatario: string, contenido: CorreoContenido) {
  await transporter.sendMail({
    from: `"Cine App" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: contenido.asunto,
    text: contenido.cuerpo,
  });
}
