import React from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardBody,
  VStack,
  Avatar,
  Flex,
  Badge,
  Link,
} from '@chakra-ui/react';
import { FaDesktop, FaTools, FaChartLine, FaHeadset, FaQuoteLeft, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const features = [
  {
    title: 'Desarrollo Web',
    text: 'Creamos sitios web modernos y responsivos que representan tu marca.',
    icon: FaDesktop,
  },
  {
    title: 'Soporte Técnico',
    text: 'Servicio técnico especializado para mantener tu infraestructura funcionando.',
    icon: FaTools,
  },
  {
    title: 'Soporte Siigo',
    text: 'Expertos en implementación y soporte de software contable Siigo.',
    icon: FaChartLine,
  },
  {
    title: 'Atención Personalizada',
    text: 'Servicio al cliente excepcional y soporte continuo.',
    icon: FaHeadset,
  },
];

const stats = [
  { label: 'Clientes Satisfechos', number: '100+', helpText: 'En Saldaña y alrededores' },
  { label: 'Servicios Técnicos', number: '500+', helpText: 'Realizados con éxito' },
  { label: 'Soporte Siigo', number: '50+', helpText: 'Empresas implementadas' },
  { label: 'Experiencia', number: '5+', helpText: 'Años en el mercado' },
];

const testimonials = [
  {
    name: 'María López',
    position: 'Propietaria',
    company: 'Comercial Saldaña',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=100&h=100',
    text: 'Excelente servicio técnico, siempre disponibles cuando los necesitamos. Han sido un apoyo fundamental para nuestro negocio.',
  },
  {
    name: 'Juan Pérez',
    position: 'Gerente',
    company: 'Distribuidora Local',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=100&h=100',
    text: 'La implementación de Siigo y el soporte que nos brindan ha mejorado significativamente nuestra gestión contable.',
  },
];

const contactInfo = {
  address: 'Cl. 9 #9b-121, Saldaña, Colombia',
  phone: '+57 321 4934385',
  email: 'nelsonandres192016@gmail.com',
  schedule: {
    weekdays: {
      days: 'Lunes a Viernes',
      morning: '8:00 AM - 12:00 PM',
      afternoon: '2:00 PM - 6:00 PM'
    },
    saturday: {
      days: 'Sábados',
      hours: '8:00 AM - 12:00 PM'
    },
    sunday: {
      days: 'Domingos',
      hours: 'Cerrado'
    }
  }
};

const Home: React.FC = () => {
  const bgColor = useColorModeValue('brand.primary', 'brand.secondary');
  const cardBg = useColorModeValue('white', 'gray.700');
  
  return (
    <Box>
      {/* Hero Section */}
      <Box
        bg={bgColor}
        color="white"
        py={{ base: 20, md: 28 }}
      >
        <Container maxW="1200px">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 8, md: 10 }}
            align="center"
          >
            <Stack flex={1} spacing={{ base: 5, md: 10 }}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              >
                <Text as="span">
                  Soluciones Tecnológicas
                </Text>
                <br />
                <Text as="span" color="brand.accent">
                  para tu Empresa
                </Text>
              </Heading>
              <Text color="gray.100" fontSize={{ base: 'lg', sm: 'xl' }}>
                Infosystem es tu aliado tecnológico. Ofrecemos servicios integrales
                de desarrollo web, soporte técnico y consultoría en software contable.
              </Text>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: 'column', sm: 'row' }}
              >
                <Button
                  as={RouterLink}
                  to="/servicios"
                  size="lg"
                  bg="white"
                  color="brand.primary"
                  _hover={{ bg: 'gray.100' }}
                >
                  Nuestros Servicios
                </Button>
                <Button
                  as={RouterLink}
                  to="/contacto"
                  size="lg"
                  variant="outline"
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  Contáctanos
                </Button>
              </Stack>
            </Stack>
            <Box flex={1} display="flex" alignItems="center" justifyContent="center">
              <Image
                src="/infosystem/images/hero.jpg"
                alt="Soluciones Tecnológicas Infosystem"
                maxW={{ base: "100%", md: "90%" }}
                h={{ base: '300px', sm: '400px', lg: '450px' }}
                objectFit="cover"
                fallbackSrc="https://via.placeholder.com/800x600/00A650/FFFFFF?text=SOLUCIONES+TECNOLOGICAS"
                borderRadius="xl"
                shadow="2xl"
                transition="transform 0.3s ease"
                _hover={{ transform: 'scale(1.02)' }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="1200px">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {stats.map((stat) => (
              <Stat key={stat.label} px={4} py={6} shadow="lg" borderRadius="lg" bg={cardBg}>
                <StatLabel fontSize="lg" fontWeight="medium">{stat.label}</StatLabel>
                <StatNumber fontSize="4xl" fontWeight="bold" color="brand.primary">
                  {stat.number}
                </StatNumber>
                <StatHelpText>{stat.helpText}</StatHelpText>
              </Stat>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20}>
        <Container maxW="1200px">
          <Stack spacing={4} as={Container} maxW="3xl" textAlign="center" mb={16}>
            <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight="bold">
              ¿Por qué elegir Infosystem?
            </Heading>
            <Text color="gray.600" fontSize={{ base: 'sm', sm: 'lg' }}>
              Ofrecemos soluciones integrales adaptadas a tus necesidades
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {features.map((feature) => (
              <Card
                key={feature.title}
                bg={cardBg}
                shadow="lg"
                _hover={{ transform: 'translateY(-5px)', shadow: '2xl' }}
                transition="all 0.3s ease"
              >
                <CardBody>
                  <VStack spacing={4}>
                    <Box
                      p={4}
                      bg={useColorModeValue('brand.primary', 'brand.secondary')}
                      borderRadius="full"
                      color="white"
                    >
                      <Icon as={feature.icon} w={6} h={6} />
                    </Box>
                    <Text fontWeight={600} fontSize="lg">{feature.title}</Text>
                    <Text color="gray.600" align="center">
                      {feature.text}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="1200px">
          <Stack spacing={4} as={Container} maxW="3xl" textAlign="center" mb={16}>
            <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight="bold">
              Lo que dicen nuestros clientes
            </Heading>
          </Stack>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} bg={cardBg} shadow="lg">
                <CardBody>
                  <VStack spacing={4} align="start">
                    <Icon as={FaQuoteLeft} w={8} h={8} color="brand.primary" />
                    <Text fontSize="lg" fontStyle="italic">
                      "{testimonial.text}"
                    </Text>
                    <Flex align="center" mt={4}>
                      <Avatar src={testimonial.image} name={testimonial.name} mr={4} />
                      <Box>
                        <Text fontWeight="bold">{testimonial.name}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {testimonial.position}
                        </Text>
                        <Badge colorScheme="brand" mt={1}>
                          {testimonial.company}
                        </Badge>
                      </Box>
                    </Flex>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Contact Banner with Info */}
      <Box bg="brand.primary" color="white" py={16}>
        <Container maxW="1200px">
          <Stack spacing={10}>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={8}
              align="center"
              justify="space-between"
            >
              <VStack align={{ base: 'center', md: 'start' }} spacing={2}>
                <Heading size="lg">¿Necesitas ayuda con tu proyecto?</Heading>
                <Text fontSize="lg">
                  Estamos aquí para ayudarte. Contáctanos por cualquiera de nuestros canales.
                </Text>
              </VStack>
              <Button
                as={RouterLink}
                to="/contacto"
                size="lg"
                bg="white"
                color="brand.primary"
                _hover={{ bg: 'gray.100' }}
                px={8}
              >
                Contactar Ahora
              </Button>
            </Stack>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} pt={8}>
              <VStack 
                align={{ base: 'center', md: 'start' }}
                bg="whiteAlpha.200"
                p={6}
                borderRadius="lg"
                spacing={4}
                _hover={{ bg: 'whiteAlpha.300' }}
                transition="all 0.3s ease"
                h="100%"
              >
                <Flex
                  align="center"
                  justify="center"
                  bg="whiteAlpha.300"
                  p={3}
                  borderRadius="full"
                >
                  <Icon as={FaMapMarkerAlt} w={6} h={6} />
                </Flex>
                <Text fontWeight="bold" fontSize="lg">Ubicación</Text>
                <VStack spacing={1}>
                  <Text textAlign={{ base: 'center', md: 'left' }} fontSize="md">
                    {contactInfo.address}
                  </Text>
                  <Text fontSize="sm" color="whiteAlpha.800">
                    Saldaña, Tolima
                  </Text>
                </VStack>
              </VStack>
              
              <VStack 
                align={{ base: 'center', md: 'start' }}
                bg="whiteAlpha.200"
                p={6}
                borderRadius="lg"
                spacing={4}
                _hover={{ bg: 'whiteAlpha.300' }}
                transition="all 0.3s ease"
                h="100%"
              >
                <Flex
                  align="center"
                  justify="center"
                  bg="whiteAlpha.300"
                  p={3}
                  borderRadius="full"
                >
                  <Icon as={FaPhone} w={6} h={6} />
                </Flex>
                <Text fontWeight="bold" fontSize="lg">Contacto Directo</Text>
                <VStack spacing={1}>
                  <Link 
                    href={`tel:${contactInfo.phone}`} 
                    _hover={{ textDecoration: 'none', color: 'brand.accent' }}
                    fontSize="md"
                  >
                    {contactInfo.phone}
                  </Link>
                  <Text fontSize="sm" color="whiteAlpha.800">
                    Llamadas y WhatsApp
                  </Text>
                </VStack>
              </VStack>
              
              <VStack 
                align={{ base: 'center', md: 'start' }}
                bg="whiteAlpha.200"
                p={6}
                borderRadius="lg"
                spacing={4}
                _hover={{ bg: 'whiteAlpha.300' }}
                transition="all 0.3s ease"
                h="100%"
              >
                <Flex
                  align="center"
                  justify="center"
                  bg="whiteAlpha.300"
                  p={3}
                  borderRadius="full"
                >
                  <Icon as={FaEnvelope} w={6} h={6} />
                </Flex>
                <Text fontWeight="bold" fontSize="lg">Correo Electrónico</Text>
                <VStack spacing={1}>
                  <Link 
                    href={`mailto:${contactInfo.email}`} 
                    _hover={{ textDecoration: 'none', color: 'brand.accent' }}
                    fontSize="md"
                  >
                    {contactInfo.email}
                  </Link>
                  <Text fontSize="sm" color="whiteAlpha.800">
                    Cotizaciones y Consultas
                  </Text>
                </VStack>
              </VStack>

              <VStack 
                align={{ base: 'center', md: 'start' }}
                bg="whiteAlpha.200"
                p={6}
                borderRadius="lg"
                spacing={4}
                _hover={{ bg: 'whiteAlpha.300' }}
                transition="all 0.3s ease"
                h="100%"
              >
                <Flex
                  align="center"
                  justify="center"
                  bg="whiteAlpha.300"
                  p={3}
                  borderRadius="full"
                >
                  <Icon as={FaClock} w={6} h={6} />
                </Flex>
                <Text fontWeight="bold" fontSize="lg">Horario de Atención</Text>
                <VStack spacing={2} align={{ base: 'center', md: 'start' }} w="100%">
                  <VStack spacing={0} align={{ base: 'center', md: 'start' }} w="100%">
                    <Text fontWeight="medium" fontSize="md">{contactInfo.schedule.weekdays.days}</Text>
                    <Text fontSize="sm">{contactInfo.schedule.weekdays.morning}</Text>
                    <Text fontSize="sm">{contactInfo.schedule.weekdays.afternoon}</Text>
                  </VStack>
                  <VStack spacing={0} align={{ base: 'center', md: 'start' }} w="100%">
                    <Text fontWeight="medium" fontSize="md">{contactInfo.schedule.saturday.days}</Text>
                    <Text fontSize="sm">{contactInfo.schedule.saturday.hours}</Text>
                  </VStack>
                  <VStack spacing={0} align={{ base: 'center', md: 'start' }} w="100%">
                    <Text fontWeight="medium" fontSize="md">{contactInfo.schedule.sunday.days}</Text>
                    <Text fontSize="sm" color="whiteAlpha.800">{contactInfo.schedule.sunday.hours}</Text>
                  </VStack>
                </VStack>
              </VStack>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg="gray.50" py={16}>
        <Container maxW="1200px">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={8}
            align="center"
            justify="space-between"
            textAlign={{ base: 'center', md: 'left' }}
          >
            <Stack flex={1} spacing={4}>
              <Heading fontSize={{ base: '2xl', sm: '3xl' }}>
                ¿Listo para impulsar tu negocio?
              </Heading>
              <Text color="gray.600" fontSize={{ base: 'md', lg: 'lg' }}>
                Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos.
              </Text>
            </Stack>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
              <Button
                as={RouterLink}
                to="/contacto"
                colorScheme="brand"
                size="lg"
              >
                Solicitar Información
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 