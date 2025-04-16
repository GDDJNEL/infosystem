import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaHandshake, FaLightbulb, FaUsers, FaRocket } from 'react-icons/fa';

const values = [
  {
    title: 'Compromiso',
    text: 'Nos dedicamos a ofrecer soluciones de calidad y un servicio excepcional.',
    icon: FaHandshake,
  },
  {
    title: 'Innovación',
    text: 'Constantemente nos actualizamos con las últimas tecnologías.',
    icon: FaLightbulb,
  },
  {
    title: 'Trabajo en Equipo',
    text: 'Colaboramos estrechamente con nuestros clientes para alcanzar sus objetivos.',
    icon: FaUsers,
  },
  {
    title: 'Excelencia',
    text: 'Buscamos la perfección en cada proyecto que emprendemos.',
    icon: FaRocket,
  },
];

const About: React.FC = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={20}>
        <Container maxW="1200px">
          <Stack spacing={8} textAlign="center">
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              Sobre Infosystem
            </Heading>
            <Text color="gray.600" fontSize={{ base: 'lg', md: 'xl' }} maxW="3xl" mx="auto">
              Somos una empresa líder en soluciones tecnológicas, especializada en desarrollo web,
              soporte técnico y consultoría en software contable.
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* Misión y Visión */}
      <Container maxW="1200px" py={20}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box>
            <Heading as="h2" size="xl" mb={6}>
              Nuestra Misión
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Proporcionar soluciones tecnológicas innovadoras y servicios de alta calidad
              que impulsen el éxito y crecimiento de nuestros clientes, a través de un
              servicio personalizado y un compromiso constante con la excelencia.
            </Text>
          </Box>
          <Box>
            <Heading as="h2" size="xl" mb={6}>
              Nuestra Visión
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Ser reconocidos como el socio tecnológico preferido por las empresas,
              destacando por nuestra innovación, calidad de servicio y capacidad para
              adaptarnos a las necesidades cambiantes del mercado.
            </Text>
          </Box>
        </SimpleGrid>
      </Container>

      {/* Valores */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={20}>
        <Container maxW="1200px">
          <Heading textAlign="center" mb={16}>
            Nuestros Valores
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {values.map((value) => (
              <Box key={value.title} p={5}>
                <Stack align="center" spacing={4}>
                  <Icon as={value.icon} w={10} h={10} color="brand.primary" />
                  <Text fontWeight={600} fontSize="lg">
                    {value.title}
                  </Text>
                  <Text color="gray.600" align="center">
                    {value.text}
                  </Text>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default About; 