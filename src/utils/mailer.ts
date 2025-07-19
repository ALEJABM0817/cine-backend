import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'homehelpersco1@gmail.com',
    pass: 'tgfr zuha neef ynct',
  },
});

interface CorreoContenido {
  asunto: string;
  cuerpo: string;
}

export async function sendMail(destinatario: string, contenido: CorreoContenido) {
  await transporter.sendMail({
    from: `"Cine App" <homehelpersco1@gmail.com>`,
    to: destinatario,
    subject: contenido.asunto,
    text: contenido.cuerpo,
  });
}
