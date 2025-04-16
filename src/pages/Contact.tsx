import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={20}>
        <Container maxW="1200px">
          <Heading
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            textAlign="center"
            mb={4}
          >
            Contáctanos
          </Heading>
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            textAlign="center"
            color="gray.600"
            maxW="3xl"
            mx="auto"
          >
            Estamos aquí para ayudarte. Contáctanos para una consulta personalizada.
          </Text>
        </Container>
      </Box>

      {/* Contact Form and Info */}
      <Container maxW="1200px" py={20}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {/* Contact Form */}
          <Box>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    type="text"
                    placeholder="Tu nombre completo"
                    focusBorderColor="brand.primary"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    focusBorderColor="brand.primary"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Teléfono</FormLabel>
                  <Input
                    type="tel"
                    placeholder="Tu número de teléfono"
                    focusBorderColor="brand.primary"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Asunto</FormLabel>
                  <Input
                    type="text"
                    placeholder="¿En qué podemos ayudarte?"
                    focusBorderColor="brand.primary"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Mensaje</FormLabel>
                  <Textarea
                    placeholder="Escribe tu mensaje aquí..."
                    rows={6}
                    focusBorderColor="brand.primary"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="brand"
                  size="lg"
                  w="full"
                >
                  Enviar Mensaje
                </Button>
              </VStack>
            </form>
          </Box>

          {/* Contact Info */}
          <Box>
            <VStack spacing={8} align="stretch">
              <Box>
                <Heading size="md" mb={4}>Información de Contacto</Heading>
                <VStack spacing={4} align="stretch">
                  <HStack>
                    <Icon as={FaMapMarkerAlt} w={6} h={6} color="brand.primary" />
                    <Text>Dirección: [Tu dirección aquí]</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaPhone} w={6} h={6} color="brand.primary" />
                    <Text>Teléfono: [Tu teléfono]</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaEnvelope} w={6} h={6} color="brand.primary" />
                    <Text>Email: info@infosystem.com</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaWhatsapp} w={6} h={6} color="brand.primary" />
                    <Text>WhatsApp: +1 415 523 8886</Text>
                  </HStack>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" mb={4}>Horario de Atención</Heading>
                <VStack spacing={2} align="stretch">
                  <Text>Lunes a Viernes: 8:00 AM - 6:00 PM</Text>
                  <Text>Sábados: 8:00 AM - 1:00 PM</Text>
                  <Text>Domingos y Festivos: Cerrado</Text>
                </VStack>
              </Box>

              {/* Map */}
              <Box
                h="300px"
                bg="gray.200"
                rounded="md"
                overflow="hidden"
              >
                {/* Aquí iría el componente del mapa */}
                <Text
                  h="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  Mapa de ubicación
                </Text>
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Contact; 