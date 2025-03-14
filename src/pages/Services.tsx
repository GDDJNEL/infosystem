import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaDesktop,
  FaTools,
  FaChartLine,
  FaServer,
  FaShieldAlt,
  FaNetworkWired,
} from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const services = [
  {
    title: 'Desarrollo Web',
    description: 'Creamos sitios web modernos, responsivos y optimizados para buscadores.',
    icon: FaDesktop,
    features: [
      'Diseño personalizado',
      'Optimización SEO',
      'Integración con redes sociales',
      'Panel de administración',
    ],
  },
  {
    title: 'Soporte Técnico',
    description: 'Mantenimiento y soporte para mantener tu infraestructura funcionando.',
    icon: FaTools,
    features: [
      'Mantenimiento preventivo',
      'Soporte remoto',
      'Reparación de equipos',
      'Respaldo de datos',
    ],
  },
  {
    title: 'Soporte Siigo',
    description: 'Expertos en implementación y soporte del software contable Siigo.',
    icon: FaChartLine,
    features: [
      'Implementación',
      'Capacitación',
      'Soporte técnico',
      'Actualizaciones',
    ],
  },
  {
    title: 'Hosting y Dominios',
    description: 'Soluciones de alojamiento web seguro y registro de dominios.',
    icon: FaServer,
    features: [
      'Hosting empresarial',
      'Certificados SSL',
      'Correo corporativo',
      'Respaldos automáticos',
    ],
  },
  {
    title: 'Seguridad Informática',
    description: 'Protección integral para tu infraestructura tecnológica.',
    icon: FaShieldAlt,
    features: [
      'Antivirus empresarial',
      'Firewall',
      'Copias de seguridad',
      'Auditorías de seguridad',
    ],
  },
  {
    title: 'Redes y Conectividad',
    description: 'Diseño e implementación de redes empresariales.',
    icon: FaNetworkWired,
    features: [
      'Cableado estructurado',
      'Redes WiFi',
      'VPNs',
      'Monitoreo de red',
    ],
  },
];

const Services = () => {
  const bgBox = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box>
      {/* Hero Section */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={20}>
        <Container maxW="1200px">
          <Stack spacing={8} textAlign="center">
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              Nuestros Servicios
            </Heading>
            <Text color="gray.600" fontSize={{ base: 'lg', md: 'xl' }} maxW="3xl" mx="auto">
              Ofrecemos soluciones tecnológicas integrales para impulsar tu negocio
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container maxW="1200px" py={20}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {services.map((service) => (
            <Box
              key={service.title}
              bg={bgBox}
              p={6}
              rounded="lg"
              borderWidth="1px"
              borderColor={borderColor}
              shadow="md"
            >
              <Stack spacing={4}>
                <Icon as={service.icon} w={10} h={10} color="brand.primary" />
                <Heading size="md">{service.title}</Heading>
                <Text color="gray.600">{service.description}</Text>
                <Stack spacing={2}>
                  {service.features.map((feature) => (
                    <Text key={feature} fontSize="sm">
                      • {feature}
                    </Text>
                  ))}
                </Stack>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* CTA Section */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={16}>
        <Container maxW="1200px">
          <Stack spacing={8} textAlign="center">
            <Heading fontSize={{ base: '2xl', md: '3xl' }}>
              ¿Necesitas alguno de nuestros servicios?
            </Heading>
            <Text color="gray.600" fontSize={{ base: 'md', lg: 'lg' }}>
              Contáctanos para una consulta personalizada
            </Text>
            <Button
              as={RouterLink}
              to="/contacto"
              colorScheme="brand"
              size="lg"
              maxW="200px"
              mx="auto"
            >
              Contactar Ahora
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Services; 