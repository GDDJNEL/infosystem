import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  Stack,
  Button,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaCheckCircle, FaDesktop, FaUsers, FaBook, FaHeadset } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const features = [
  'Soporte técnico especializado',
  'Capacitación personalizada',
  'Implementación y configuración',
  'Migración de datos',
  'Actualizaciones y mantenimiento',
  'Resolución de problemas',
  'Asesoría contable',
  'Backup y recuperación de datos',
];

const services = [
  {
    title: 'Implementación',
    description: 'Configuración inicial y puesta en marcha del sistema.',
    icon: FaDesktop,
  },
  {
    title: 'Capacitación',
    description: 'Entrenamiento completo para tu equipo de trabajo.',
    icon: FaUsers,
  },
  {
    title: 'Documentación',
    description: 'Manuales y guías de usuario personalizadas.',
    icon: FaBook,
  },
  {
    title: 'Soporte',
    description: 'Asistencia técnica continua y resolución de problemas.',
    icon: FaHeadset,
  },
];

const SiigoSupport = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box bg={useColorModeValue('brand.primary', 'brand.secondary')} color="white" py={20}>
        <Container maxW="1200px">
          <Stack spacing={8} textAlign="center">
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              Soporte Siigo
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} maxW="3xl" mx="auto">
              Expertos en implementación y soporte del software contable líder en Colombia
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="1200px" py={20}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box>
            <Heading mb={6}>Características del Servicio</Heading>
            <List spacing={3}>
              {features.map((feature) => (
                <ListItem key={feature} display="flex" alignItems="center">
                  <ListIcon as={FaCheckCircle} color="brand.primary" />
                  <Text>{feature}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box>
            <Heading mb={6}>¿Por qué elegirnos?</Heading>
            <Text fontSize="lg" mb={4}>
              Somos especialistas certificados en Siigo con años de experiencia en:
            </Text>
            <List spacing={3}>
              <ListItem>• Siigo Nube</ListItem>
              <ListItem>• Siigo Pyme</ListItem>
              <ListItem>• Siigo POS</ListItem>
              <ListItem>• Siigo Contador</ListItem>
            </List>
          </Box>
        </SimpleGrid>
      </Container>

      {/* Services Grid */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={20}>
        <Container maxW="1200px">
          <Heading textAlign="center" mb={16}>
            Nuestros Servicios de Soporte
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {services.map((service) => (
              <Box
                key={service.title}
                bg={useColorModeValue('white', 'gray.700')}
                p={6}
                rounded="lg"
                shadow="md"
                borderWidth="1px"
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              >
                <Stack align="center" spacing={4}>
                  <Icon as={service.icon} w={10} h={10} color="brand.primary" />
                  <Text fontWeight={600} fontSize="lg">
                    {service.title}
                  </Text>
                  <Text color="gray.600" align="center">
                    {service.description}
                  </Text>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={16}>
        <Container maxW="1200px">
          <Stack spacing={8} textAlign="center">
            <Heading fontSize={{ base: '2xl', md: '3xl' }}>
              ¿Necesitas ayuda con Siigo?
            </Heading>
            <Text color="gray.600" fontSize={{ base: 'md', lg: 'lg' }}>
              Nuestro equipo de expertos está listo para ayudarte
            </Text>
            <Button
              as={RouterLink}
              to="/contacto"
              colorScheme="brand"
              size="lg"
              maxW="200px"
              mx="auto"
            >
              Solicitar Soporte
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default SiigoSupport; 