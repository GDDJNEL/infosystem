import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  IconButton,
  VStack,
  Input,
  Text,
  useColorModeValue,
  Collapse,
  Flex,
  Avatar,
  Spacer,
  CloseButton,
  useDisclosure,
  Heading,
  Link,
} from '@chakra-ui/react';
import { FaRobot, FaPaperPlane, FaCalendarAlt } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: Array<{
    text: string;
    emoji?: string;
    value: string;
    action?: () => void;
  }>;
}

// Base de conocimiento para preguntas frecuentes
const faqResponses = {
  precios: {
    pattern: /(precio|costo|valor|tarifa|cuanto cuesta)/i,
    response: "Los precios varían según el servicio:\n\n" +
              "💻 Mantenimiento preventivo: Desde $50.000\n" +
              "🔧 Reparación de equipos: Desde $80.000\n" +
              "🌐 Desarrollo web: Desde $1.000.000\n" +
              "📊 Implementación Siigo: Desde $500.000\n\n" +
              "¿Te gustaría una cotización específica?",
    options: [
      { text: "Solicitar cotización", emoji: "💰", value: "cotizar" },
      { text: "Ver más servicios", emoji: "📋", value: "servicios" },
      { text: "Hablar con asesor", emoji: "👨‍💼", value: "asesor" }
    ]
  },
  horarios: {
    pattern: /(horario|hora|cuando|atienden|disponibilidad)/i,
    response: "Nuestros horarios de atención son:\n\n" +
              "📅 Lunes a Viernes:\n" +
              "🕐 8:00 AM - 12:00 PM\n" +
              "🕐 2:00 PM - 6:00 PM\n\n" +
              "📅 Sábados:\n" +
              "🕐 8:00 AM - 12:00 PM\n\n" +
              "¿Te gustaría agendar una cita?",
    options: [
      { text: "Agendar cita", emoji: "📅", value: "agendar" },
      { text: "Urgencia", emoji: "🚨", value: "urgencia" },
      { text: "Más información", emoji: "ℹ️", value: "info" }
    ]
  },
  ubicacion: {
    pattern: /(donde|ubicacion|direccion|lugar|como llegar)/i,
    response: "Nos encontramos en:\n\n" +
              "📍 Cl. 9 #9b-121, Saldaña, Colombia\n\n" +
              "Puntos de referencia:\n" +
              "🏢 Cerca al centro comercial\n" +
              "🏫 A dos cuadras del parque principal",
    options: [
      { text: "Cómo llegar", emoji: "🗺️", value: "direcciones" },
      { text: "Agendar visita", emoji: "📅", value: "visita" },
      { text: "Servicio a domicilio", emoji: "🚗", value: "domicilio" }
    ]
  },
  urgencias: {
    pattern: /(urgente|emergencia|urgencia|inmediato|rapido)/i,
    response: "Para atención urgente:\n\n" +
              "📞 Llama al: +57 321 493 43 85\n" +
              "💬 WhatsApp: +1 415 523 8886\n\n" +
              "Tenemos servicio prioritario para emergencias técnicas.",
    options: [
      { text: "Llamar ahora", emoji: "📞", value: "llamar" },
      { text: "WhatsApp", emoji: "💬", value: "whatsapp" },
      { text: "Servicio urgente", emoji: "🚨", value: "urgente" }
    ]
  },
  garantia: {
    pattern: /(garantia|garantías|devolucion|reclamo)/i,
    response: "Nuestra política de garantía:\n\n" +
              "🔧 Reparaciones: 3 meses\n" +
              "💻 Mantenimiento: 1 mes\n" +
              "🌐 Desarrollo web: 6 meses\n" +
              "📊 Implementación Siigo: 3 meses",
    options: [
      { text: "Más detalles", emoji: "📋", value: "detalles_garantia" },
      { text: "Hacer reclamo", emoji: "⚠️", value: "reclamo" },
      { text: "Contactar soporte", emoji: "🛠️", value: "soporte" }
    ]
  }
};

// Categorías de respuestas
const responses = {
  greeting: {
    welcome: "¡Hola! Soy el asistente virtual de Infosystem. ¿En qué puedo ayudarte hoy?",
    menu: [
      { text: "Soporte técnico", emoji: "💻", value: "soporte_tecnico" },
      { text: "Reparación de equipos", emoji: "🔧", value: "reparacion" },
      { text: "Diseño web y programación", emoji: "🌐", value: "desarrollo" },
      { text: "Ciberseguridad", emoji: "🔒", value: "seguridad" },
      { text: "Soporte Siigo", emoji: "📊", value: "siigo" },
      { text: "Hablar con un asesor", emoji: "👨‍💼", value: "asesor" }
    ]
  },
  soporte_tecnico: {
    initial: "¿Qué tipo de soporte técnico necesitas? 💻",
    options: [
      { text: "Computadora lenta", emoji: "🐌", value: "pc_lenta" },
      { text: "Problemas de virus", emoji: "🦠", value: "virus" },
      { text: "Problemas de internet", emoji: "🌐", value: "internet" },
      { text: "Mantenimiento preventivo", emoji: "🔧", value: "mantenimiento" },
      { text: "Otro problema", emoji: "❓", value: "otro" }
    ],
    problemas: {
      pc_lenta: {
        text: "La lentitud puede deberse a varios factores. Aquí hay algunas soluciones comunes:\n\n" +
              "1. 🧹 Limpieza de archivos temporales\n" +
              "2. 💾 Desfragmentación del disco duro\n" +
              "3. 🔄 Actualización de controladores\n" +
              "4. 🛠️ Mantenimiento de hardware\n\n" +
              "¿Te gustaría agendar una revisión técnica profesional?",
        options: [
          { text: "Agendar revisión", emoji: "📅", value: "agendar_revision" },
          { text: "Más información", emoji: "ℹ️", value: "mas_info_lentitud" },
          { text: "Contactar técnico", emoji: "👨‍💻", value: "contactar_tecnico" }
        ]
      }
    }
  },
  reparacion: {
    initial: "¿Qué tipo de equipo necesitas reparar? 🔧",
    options: [
      { text: "Computadora de escritorio", emoji: "🖥️", value: "desktop" },
      { text: "Laptop", emoji: "💻", value: "laptop" },
      { text: "Impresora", emoji: "🖨️", value: "printer" },
      { text: "Otro dispositivo", emoji: "📱", value: "otro" }
    ]
  },
  desarrollo: {
    initial: "¿Qué tipo de desarrollo te interesa? 🌐",
    options: [
      { text: "Sitio web", emoji: "🌐", value: "web" },
      { text: "Tienda en línea", emoji: "🛒", value: "ecommerce" },
      { text: "Sistema a medida", emoji: "⚙️", value: "sistema" },
      { text: "App móvil", emoji: "📱", value: "app" }
    ],
    servicios: {
      web: {
        text: "Nuestros servicios de desarrollo web incluyen:\n\n" +
              "🎨 Diseño web responsivo\n" +
              "🛒 E-commerce\n" +
              "⚙️ Sistemas web personalizados\n" +
              "🔍 Optimización SEO\n\n" +
              "¿Te gustaría ver nuestro portafolio?",
        options: [
          { text: "Ver portafolio", emoji: "👀", value: "ver_portafolio" },
          { text: "Solicitar cotización", emoji: "💰", value: "cotizacion" },
          { text: "Hablar con asesor", emoji: "👨‍💼", value: "asesor" }
        ]
      }
    }
  },
  seguridad: {
    initial: "¿Qué servicio de ciberseguridad necesitas? 🔒",
    options: [
      { text: "Análisis de vulnerabilidades", emoji: "🔍", value: "vulnerabilidades" },
      { text: "Protección contra virus", emoji: "🛡️", value: "antivirus" },
      { text: "Respaldo de datos", emoji: "💾", value: "backup" },
      { text: "Consultoría de seguridad", emoji: "📋", value: "consultoria" }
    ]
  },
  siigo: {
    initial: "¿Qué versión de Siigo utilizas o te interesa? 📊",
    options: [
      { text: "Siigo Nube", emoji: "☁️", value: "nube" },
      { text: "Siigo Pyme", emoji: "🏢", value: "pyme" },
      { text: "Siigo POS", emoji: "🏪", value: "pos" },
      { text: "No lo sé aún", emoji: "❓", value: "info" }
    ],
    productos: {
      nube: {
        text: "Siigo Nube ofrece:\n\n" +
              "☁️ Acceso desde cualquier dispositivo\n" +
              "🔄 Copias de seguridad automáticas\n" +
              "⚡ Actualizaciones en tiempo real\n" +
              "📱 App móvil incluida\n\n" +
              "¿Te gustaría una demostración?",
        options: [
          { text: "Solicitar demo", emoji: "🎯", value: "demo_nube" },
          { text: "Ver precios", emoji: "💰", value: "precios_nube" },
          { text: "Hablar con asesor", emoji: "👨‍💼", value: "asesor_nube" }
        ]
      }
    }
  },
  contacto: {
    asesor: {
      text: "Te conectaré con un asesor especializado. ¿Cómo prefieres que te contactemos? 👨‍💼",
      options: [
        { text: "Llamada telefónica", emoji: "📞", value: "llamada" },
        { text: "WhatsApp", emoji: "💬", value: "whatsapp" },
        { text: "Correo electrónico", emoji: "📧", value: "email" }
      ]
    },
    agendar: {
      text: "Para agendar una cita, necesito algunos datos:\n\n" +
            "1. 📋 Tipo de servicio\n" +
            "2. 📅 Fecha preferida\n" +
            "3. 🕒 Horario preferido\n\n" +
            "¿Cómo prefieres coordinar tu cita?",
      options: [
        { text: "Agendar ahora", emoji: "📅", value: "agendar_ahora" },
        { text: "Por WhatsApp", emoji: "💬", value: "agendar_whatsapp" },
        { text: "Por teléfono", emoji: "📞", value: "agendar_llamada" }
      ]
    }
  }
};

// Interfaz para la información del cliente
interface ClientInfo {
  id: string;
  timestamp: Date;
  name?: string;
  email?: string;
  phone?: string;
  query: string;
  conversation: Message[];
  status: 'pending' | 'in-progress' | 'completed';
  service: string;
}

// Función para enviar notificación al administrador
const sendAdminNotification = async (clientInfo: ClientInfo) => {
  try {
    // Aquí puedes implementar el envío de notificaciones por email
    await fetch('/api/admin/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'new_client',
        clientInfo,
        // Puedes enviar la notificación a tu WhatsApp de administrador
        adminWhatsApp: '+573214934385',
        // O a tu correo
        adminEmail: 'nelsonandres192016@gmail.com'
      })
    });
  } catch (error) {
    console.error('Error al enviar notificación:', error);
  }
};

// Función para guardar la conversación
const saveClientConversation = async (clientInfo: ClientInfo) => {
  try {
    await fetch('/api/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientInfo)
    });
  } catch (error) {
    console.error('Error al guardar conversación:', error);
  }
};

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: responses.greeting.welcome,
      isBot: true,
      timestamp: new Date(),
      options: responses.greeting.menu
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isOpen, onToggle } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);

  // Auto-scroll al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const collectClientInfo = (message: string, type: string) => {
    if (!clientInfo) {
      const newClientInfo: ClientInfo = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        query: message,
        conversation: messages,
        status: 'pending',
        service: type
      };
      setClientInfo(newClientInfo);
      sendAdminNotification(newClientInfo);
    } else {
      const updatedInfo = {
        ...clientInfo,
        conversation: [...messages, { text: message, isBot: false, timestamp: new Date() }]
      };
      setClientInfo(updatedInfo);
      saveClientConversation(updatedInfo);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Identificar el tipo de consulta
    const messageType = identifyQueryType(inputMessage);
    collectClientInfo(inputMessage, messageType);

    // Si el cliente proporciona información de contacto, actualizarla
    if (containsContactInfo(inputMessage)) {
      updateClientContactInfo(inputMessage);
    }

    const responseTime = Math.min(1000 + inputMessage.length * 20, 3000);

    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, responseTime);
  };

  const identifyQueryType = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('soporte') || lowerMessage.includes('técnico')) return 'soporte_tecnico';
    if (lowerMessage.includes('reparación')) return 'reparacion';
    if (lowerMessage.includes('web') || lowerMessage.includes('desarrollo')) return 'desarrollo';
    if (lowerMessage.includes('siigo')) return 'siigo';
    return 'general';
  };

  const containsContactInfo = (message: string): boolean => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex = /(\+?57)?[ -]*(3\d{9}|\d{7})/;
    return emailRegex.test(message) || phoneRegex.test(message);
  };

  const updateClientContactInfo = (message: string) => {
    if (!clientInfo) return;

    const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = message.match(/(\+?57)?[ -]*(3\d{9}|\d{7})/);
    const nameMatch = message.match(/(?:me llamo|soy|nombre es) ([A-Za-zÁáÉéÍíÓóÚúÑñ\s]+)/i);

    const updatedInfo = {
      ...clientInfo,
      email: emailMatch ? emailMatch[0] : clientInfo.email,
      phone: phoneMatch ? phoneMatch[0] : clientInfo.phone,
      name: nameMatch ? nameMatch[1].trim() : clientInfo.name
    };

    setClientInfo(updatedInfo);
    sendAdminNotification(updatedInfo);
  };

  const getBotResponse = (message: string): Message => {
    const lowerMessage = message.toLowerCase();
    
    // Manejar acciones específicas de contacto
    if (lowerMessage.includes('whatsapp')) {
      return {
        text: "Te redirigiré a WhatsApp para chatear con nuestro asistente virtual.\n\n" +
              "📱 Número: +1 415 523 8886\n\n" +
              "¿Deseas abrir WhatsApp ahora?",
        isBot: true,
        timestamp: new Date(),
        options: [
          { 
            text: "Abrir WhatsApp", 
            emoji: "💬", 
            value: "open_whatsapp",
            action: () => window.open(`https://wa.me/14155238886`, '_blank')
          },
          { text: "Más tarde", emoji: "⏰", value: "later" }
        ]
      };
    }

    if (lowerMessage.includes('llamada') || lowerMessage.includes('teléfono') || lowerMessage.includes('telefonica')) {
      return {
        text: "Te proporcionaré el número de contacto directo:\n\n" +
              "📞 Teléfono: +57 321 493 43 85\n" +
              "⏰ Horario de atención telefónica:\n" +
              "   Lunes a Viernes: 8:00 AM - 6:00 PM\n" +
              "   Sábados: 8:00 AM - 12:00 PM\n\n" +
              "¿Deseas realizar la llamada ahora?",
        isBot: true,
        timestamp: new Date(),
        options: [
          { 
            text: "Llamar ahora", 
            emoji: "📞", 
            value: "call_now",
            action: () => window.location.href = `tel:+573214934385`
          },
          { text: "Agendar llamada", emoji: "📅", value: "schedule_call" }
        ]
      };
    }

    if (lowerMessage.includes('correo') || lowerMessage.includes('email')) {
      return {
        text: "Te proporcionaré nuestro correo de contacto:\n\n" +
              "📧 Email: nelsonandres192016@gmail.com\n\n" +
              "¿Deseas enviar un correo ahora?",
        isBot: true,
        timestamp: new Date(),
        options: [
          { 
            text: "Enviar email", 
            emoji: "📧", 
            value: "send_email",
            action: () => window.location.href = `mailto:nelsonandres192016@gmail.com?subject=Consulta desde el chat`
          },
          { text: "Copiar dirección", emoji: "📋", value: "copy_email" }
        ]
      };
    }

    // Manejar acciones específicas de agendamiento
    if (lowerMessage.includes('agendar')) {
      return {
        text: "Para agendar una cita, necesito algunos datos:\n\n" +
              "1. 📋 Tipo de servicio\n" +
              "2. 📅 Fecha preferida\n" +
              "3. 🕒 Horario preferido\n\n" +
              "¿Cómo prefieres coordinar tu cita?",
        isBot: true,
        timestamp: new Date(),
        options: [
          { 
            text: "Agendar por WhatsApp", 
            emoji: "💬", 
            value: "schedule_whatsapp",
            action: () => window.open(`https://wa.me/14155238886?text=Hola, quisiera agendar una cita para...`, '_blank')
          },
          { 
            text: "Llamar para agendar", 
            emoji: "📞", 
            value: "schedule_call",
            action: () => window.location.href = `tel:+573214934385`
          },
          { text: "Ver disponibilidad", emoji: "📅", value: "check_availability" }
        ]
      };
    }

    // Verificar preguntas frecuentes primero
    for (const [key, faq] of Object.entries(faqResponses)) {
      if (faq.pattern.test(lowerMessage)) {
        return {
          text: faq.response,
          isBot: true,
          timestamp: new Date(),
          options: faq.options
        };
      }
    }

    // Soporte Técnico
    if (lowerMessage.includes('soporte') || lowerMessage.includes('técnico')) {
      return {
        text: responses.soporte_tecnico.initial,
        isBot: true,
        timestamp: new Date(),
        options: responses.soporte_tecnico.options
      };
    }

    // Reparación
    if (lowerMessage.includes('reparación') || lowerMessage.includes('reparar')) {
      return {
        text: responses.reparacion.initial,
        isBot: true,
        timestamp: new Date(),
        options: responses.reparacion.options
      };
    }

    // Desarrollo Web
    if (lowerMessage.includes('web') || lowerMessage.includes('desarrollo') || lowerMessage.includes('programación')) {
      return {
        text: responses.desarrollo.initial,
        isBot: true,
        timestamp: new Date(),
        options: responses.desarrollo.options
      };
    }

    // Siigo
    if (lowerMessage.includes('siigo')) {
      return {
        text: responses.siigo.initial,
        isBot: true,
        timestamp: new Date(),
        options: responses.siigo.options
      };
    }

    // Seguridad
    if (lowerMessage.includes('seguridad') || lowerMessage.includes('virus')) {
      return {
        text: responses.seguridad.initial,
        isBot: true,
        timestamp: new Date(),
        options: responses.seguridad.options
      };
    }

    // Asesor
    if (lowerMessage.includes('asesor') || lowerMessage.includes('persona') || lowerMessage.includes('humano')) {
      return {
        text: responses.contacto.asesor.text,
        isBot: true,
        timestamp: new Date(),
        options: responses.contacto.asesor.options
      };
    }

    // Respuesta por defecto
    return {
      text: "¿En qué área específica necesitas ayuda?",
      isBot: true,
      timestamp: new Date(),
      options: responses.greeting.menu
    };
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleOptionClick = (option: { text: string; value: string; action?: () => void }) => {
    if (option.action) {
      option.action();
    }
    
    setInputMessage(option.text);
    collectClientInfo(option.text, option.value);
    handleSendMessage();
  };

  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      zIndex="1000"
    >
      <Collapse in={isOpen} animateOpacity>
        <Box
          w="350px"
          h="500px"
          bg={bgColor}
          borderRadius="lg"
          boxShadow="lg"
          border="1px"
          borderColor={borderColor}
          overflow="hidden"
        >
          {/* Header del chat */}
          <Flex
            bg="brand.primary"
            p={3}
            color="white"
            alignItems="center"
          >
            <Avatar size="sm" icon={<FaRobot />} bg="brand.secondary" />
            <Heading size="sm" ml={3}>Asistente Virtual</Heading>
            <Spacer />
            <CloseButton onClick={onToggle} />
          </Flex>

          {/* Área de mensajes */}
          <VStack
            h="380px"
            overflowY="auto"
            p={3}
            spacing={3}
            alignItems="stretch"
          >
            {messages.map((message, index) => (
              <Flex
                key={index}
                direction="column"
                alignItems={message.isBot ? 'flex-start' : 'flex-end'}
              >
                <Box
                  maxW="85%"
                  bg={message.isBot ? 'gray.100' : 'brand.primary'}
                  color={message.isBot ? 'black' : 'white'}
                  borderRadius="lg"
                  px={3}
                  py={2}
                >
                  <Text fontSize="sm" whiteSpace="pre-line">{message.text}</Text>
                </Box>
                {message.options && message.isBot && (
                  <Flex wrap="wrap" gap={2} mt={2} maxW="85%">
                    {message.options.map((option, optIndex) => (
                      <Button
                        key={optIndex}
                        size="sm"
                        variant="outline"
                        colorScheme="brand"
                        onClick={() => handleOptionClick(option)}
                        leftIcon={option.emoji ? <Text>{option.emoji}</Text> : undefined}
                      >
                        {option.text}
                      </Button>
                    ))}
                  </Flex>
                )}
              </Flex>
            ))}
            {isTyping && (
              <Flex align="flex-start">
                <Box
                  bg="gray.100"
                  borderRadius="lg"
                  px={3}
                  py={2}
                >
                  <Text fontSize="sm">Escribiendo...</Text>
                </Box>
              </Flex>
            )}
            <div ref={messagesEndRef} />
          </VStack>

          {/* Input para mensajes */}
          <Flex p={3} borderTop="1px" borderColor={borderColor}>
            <Input
              placeholder="Escribe tu mensaje..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              mr={2}
              disabled={isTyping}
            />
            <IconButton
              colorScheme="brand"
              aria-label="Enviar mensaje"
              icon={<FaPaperPlane />}
              onClick={handleSendMessage}
              disabled={isTyping}
            />
          </Flex>
        </Box>
      </Collapse>

      {/* Botón para abrir/cerrar el chat */}
      <Button
        leftIcon={<FaRobot />}
        colorScheme="brand"
        onClick={onToggle}
        mt={2}
        display={isOpen ? 'none' : 'flex'}
        boxShadow="lg"
      >
        Chat con nosotros
      </Button>
    </Box>
  );
};

export default ChatBot; 