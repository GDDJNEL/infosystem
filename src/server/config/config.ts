// Depuración de variables de entorno
const TWILIO_ACCOUNT_SID = 'ACaebe971f12712f0fe5c34304fc0abe6c';
const TWILIO_AUTH_TOKEN = 'EH6KD6739REP5QRYPLZ53EXB';
const TWILIO_WHATSAPP_FROM = '+14155238886';

console.log('Variables de entorno configuradas manualmente:', {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: TWILIO_AUTH_TOKEN ? 'Existe' : 'No encontrado',
  TWILIO_WHATSAPP_FROM
});

export const config = {
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    user: process.env.EMAIL_USER || 'nelsonandres192016@gmail.com',
    pass: process.env.EMAIL_PASSWORD || '', // Aquí deberás configurar tu contraseña de aplicación de Gmail
  },
  twilio: {
    accountSid: TWILIO_ACCOUNT_SID,
    authToken: TWILIO_AUTH_TOKEN,
    whatsappFrom: TWILIO_WHATSAPP_FROM,
  },
  admin: {
    whatsapp: process.env.ADMIN_WHATSAPP || '+573214934385',
    email: process.env.ADMIN_EMAIL || 'nelsonandres192016@gmail.com',
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/infosystem',
  }
}; 