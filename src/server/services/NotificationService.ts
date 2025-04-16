import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { config } from '../config/config.js';

class NotificationService {
  private emailTransporter;
  private twilioClient;

  constructor() {
    // Configurar el transportador de email
    this.emailTransporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: false,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });

    // Configurar el cliente de Twilio
    console.log('Verificando credenciales de Twilio:', {
      accountSid: config.twilio.accountSid ? 'Configurado' : 'No configurado',
      authToken: config.twilio.authToken ? 'Configurado' : 'No configurado',
      whatsappFrom: config.twilio.whatsappFrom
    });

    if (!config.twilio.accountSid || !config.twilio.authToken) {
      console.error('Faltan credenciales de Twilio');
    } else {
      try {
        this.twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken);
        console.log('Cliente de Twilio inicializado correctamente');
      } catch (error) {
        console.error('Error al inicializar el cliente de Twilio:', error);
      }
    }
  }

  async sendEmail(subject: string, content: string) {
    try {
      await this.emailTransporter.sendMail({
        from: config.email.user,
        to: config.admin.email,
        subject,
        html: content,
      });
      console.log('Email enviado correctamente');
    } catch (error) {
      console.error('Error al enviar email:', error);
      throw error;
    }
  }

  async sendWhatsApp(message: string) {
    if (!this.twilioClient) {
      console.error('Cliente de Twilio no inicializado');
      return;
    }

    try {
      await this.twilioClient.messages.create({
        body: message,
        from: `whatsapp:${config.twilio.whatsappFrom}`,
        to: `whatsapp:${config.admin.whatsapp}`,
      });
      console.log('Mensaje de WhatsApp enviado correctamente');
    } catch (error) {
      console.error('Error al enviar mensaje de WhatsApp:', error);
      throw error;
    }
  }

  async notifyNewClient(clientInfo: any) {
    const emailContent = `
      <h2>Nuevo Cliente en el Chat</h2>
      <p><strong>ID de Conversación:</strong> ${clientInfo.id}</p>
      <p><strong>Fecha:</strong> ${clientInfo.timestamp}</p>
      <p><strong>Nombre:</strong> ${clientInfo.name || 'No proporcionado'}</p>
      <p><strong>Email:</strong> ${clientInfo.email || 'No proporcionado'}</p>
      <p><strong>Teléfono:</strong> ${clientInfo.phone || 'No proporcionado'}</p>
      <p><strong>Consulta:</strong> ${clientInfo.query}</p>
      <p><strong>Servicio:</strong> ${clientInfo.service}</p>
    `;

    const whatsappContent = `
🔔 Nuevo Cliente en el Chat
📅 Fecha: ${new Date(clientInfo.timestamp).toLocaleString()}
👤 ${clientInfo.name ? 'Nombre: ' + clientInfo.name : 'Cliente sin nombre'}
📞 ${clientInfo.phone ? 'Tel: ' + clientInfo.phone : 'Sin teléfono'}
📧 ${clientInfo.email ? 'Email: ' + clientInfo.email : 'Sin email'}
❓ Consulta: ${clientInfo.query}
🔍 Servicio: ${clientInfo.service}
    `;

    try {
      await Promise.all([
        this.sendEmail('Nuevo Cliente en el Chat', emailContent),
        this.sendWhatsApp(whatsappContent),
      ]);
    } catch (error) {
      console.error('Error al enviar notificaciones:', error);
    }
  }
}

// Exportar una única instancia del servicio
export const notificationService = new NotificationService();