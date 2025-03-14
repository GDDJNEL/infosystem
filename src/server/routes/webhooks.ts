import express from 'express';
import twilio from 'twilio';
import { config } from '../config/config';
import { notificationService } from '../services/NotificationService';

const router = express.Router();

// Almacenar el estado de la conversación
const userStates: { [key: string]: { menu: string, subMenu?: string } } = {};

// Respuestas del chatbot
const responses = {
  greeting: '👋 ¡Hola! Soy el asistente virtual de INFOSYSTEM. ¿En qué puedo ayudarte?\n\n' +
    '1️⃣ Soporte Técnico\n' +
    '2️⃣ Servicios Web y Programación\n' +
    '3️⃣ Soporte Siigo\n' +
    '4️⃣ Agendar una Cita\n' +
    '5️⃣ Hablar con un Asesor\n\n' +
    'Por favor, responde con el número de la opción que necesitas.',

  technical: '🔧 Soporte Técnico:\n' +
    '1. Mantenimiento de Equipos\n' +
    '2. Reparación de Hardware\n' +
    '3. Problemas de Software\n' +
    '4. Redes y Conectividad\n' +
    '0. Volver al menú principal',

  technical_1: '🔨 Mantenimiento de Equipos:\n' +
    '1. Mantenimiento Preventivo\n' +
    '2. Mantenimiento Correctivo\n' +
    '3. Limpieza de Hardware\n' +
    '4. Actualización de Componentes\n' +
    '5. Volver al menú de Soporte Técnico\n' +
    '0. Volver al menú principal',

  technical_2: '🛠️ Reparación de Hardware:\n' +
    '1. Diagnóstico de Fallas\n' +
    '2. Reparación de Componentes\n' +
    '3. Reemplazo de Partes\n' +
    '4. Recuperación de Datos\n' +
    '5. Volver al menú de Soporte Técnico\n' +
    '0. Volver al menú principal',

  technical_3: '💻 Problemas de Software:\n' +
    '1. Sistema Operativo\n' +
    '2. Programas y Aplicaciones\n' +
    '3. Virus y Malware\n' +
    '4. Respaldo de Información\n' +
    '5. Volver al menú de Soporte Técnico\n' +
    '0. Volver al menú principal',

  technical_4: '🌐 Redes y Conectividad:\n' +
    '1. Configuración de Red\n' +
    '2. Problemas de Internet\n' +
    '3. Configuración WiFi\n' +
    '4. Seguridad de Red\n' +
    '5. Volver al menú de Soporte Técnico\n' +
    '0. Volver al menú principal',

  web: '💻 Servicios Web y Programación:\n' +
    '1. Diseño Web\n' +
    '2. Desarrollo de Software\n' +
    '3. E-commerce\n' +
    '4. Hosting y Dominios\n' +
    '0. Volver al menú principal',

  siigo: '📊 Soporte Siigo:\n' +
    '1. Siigo Nube\n' +
    '2. Siigo Contador\n' +
    '3. Facturación Electrónica\n' +
    '4. Capacitación\n' +
    '0. Volver al menú principal',

  appointment: '📅 Para agendar una cita, necesito algunos datos:\n' +
    '1. Tu nombre\n' +
    '2. Tipo de servicio\n' +
    '3. Fecha preferida\n' +
    'O si prefieres, puedo conectarte con un asesor.\n' +
    '0. Volver al menú principal',

  advisor: '👨‍💼 Te conectaré con un asesor en un momento.\n' +
    'Mientras tanto, ¿podrías decirme brevemente en qué necesitas ayuda?',

  default: 'No entendí tu mensaje. Por favor, elige una opción del menú:\n' +
    '1️⃣ Soporte Técnico\n' +
    '2️⃣ Servicios Web y Programación\n' +
    '3️⃣ Soporte Siigo\n' +
    '4️⃣ Agendar una Cita\n' +
    '5️⃣ Hablar con un Asesor'
};

// Función para obtener la respuesta adecuada
function getResponse(message: string | undefined, from: string): string {
  if (!message) {
    return responses.greeting;
  }

  const lowerMessage = message.toLowerCase();
  const userState = userStates[from] || { menu: 'main' };
  
  // Manejar comando para volver al menú principal
  if (message === '0') {
    userStates[from] = { menu: 'main' };
    return responses.greeting;
  }

  // Manejar mensajes de saludo o ayuda
  if (lowerMessage.includes('hola') || lowerMessage.includes('ayuda') || lowerMessage === 'menu') {
    userStates[from] = { menu: 'main' };
    return responses.greeting;
  }

  // Manejar submenús técnicos
  if (userState.menu === 'technical') {
    switch (message) {
      case '1':
        userStates[from] = { menu: 'technical', subMenu: '1' };
        return responses.technical_1;
      case '2':
        userStates[from] = { menu: 'technical', subMenu: '2' };
        return responses.technical_2;
      case '3':
        userStates[from] = { menu: 'technical', subMenu: '3' };
        return responses.technical_3;
      case '4':
        userStates[from] = { menu: 'technical', subMenu: '4' };
        return responses.technical_4;
      case '5':
        userStates[from] = { menu: 'main' };
        return responses.greeting;
      default:
        return responses.technical;
    }
  }

  // Manejar menú principal
  switch (message) {
    case '1':
      userStates[from] = { menu: 'technical' };
      return responses.technical;
    case '2':
      userStates[from] = { menu: 'web' };
      return responses.web;
    case '3':
      userStates[from] = { menu: 'siigo' };
      return responses.siigo;
    case '4':
      userStates[from] = { menu: 'appointment' };
      return responses.appointment;
    case '5':
      userStates[from] = { menu: 'advisor' };
      return responses.advisor;
    default:
      return responses.default;
  }
}

// Middleware para verificar que las solicitudes vienen de Twilio
const twilioWebhook = twilio.webhook({ validate: false }); // En producción, cambia a true

// Endpoint para recibir mensajes de WhatsApp
router.post('/whatsapp', twilioWebhook, async (req, res) => {
  try {
    const { Body = '', From = 'unknown' } = req.body;
    console.log(`Mensaje recibido de ${From}: ${Body}`);

    // Obtener la respuesta personalizada
    const responseMessage = getResponse(Body, From);

    // Crear una respuesta usando TwiML
    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message(responseMessage);

    // Si el usuario solicita hablar con un asesor, notificar al administrador
    if (Body === '5') {
      await notificationService.notifyNewClient({
        timestamp: new Date(),
        phone: From,
        query: 'Solicitud de atención personalizada',
        service: 'Atención al Cliente'
      });
    }

    res.type('text/xml').send(twiml.toString());
  } catch (error) {
    console.error('Error en webhook de WhatsApp:', error);
    // En caso de error, enviar una respuesta genérica
    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message(responses.default);
    res.type('text/xml').send(twiml.toString());
  }
});

export default router; 