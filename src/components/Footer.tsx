import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  SimpleGrid,
  useColorModeValue,
  Heading,
  Icon,
  VStack,
} from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW="1200px" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align="flex-start">
            <Heading size="md" mb={2}>Empresa</Heading>
            <Link as={RouterLink} to="/nosotros">Sobre Nosotros</Link>
            <Link as={RouterLink} to="/servicios">Servicios</Link>
            <Link as={RouterLink} to="/portafolio">Portafolio</Link>
            <Link as={RouterLink} to="/contacto">Contacto</Link>
          </Stack>

          <Stack align="flex-start">
            <Heading size="md" mb={2}>Servicios</Heading>
            <Link as={RouterLink} to="/servicios/desarrollo-web">Desarrollo Web</Link>
            <Link as={RouterLink} to="/servicios/soporte-tecnico">Soporte Técnico</Link>
            <Link as={RouterLink} to="/soporte-siigo">Soporte Siigo</Link>
            <Link as={RouterLink} to="/servicios/consultoria">Consultoría</Link>
          </Stack>

          <Stack align="flex-start">
            <Heading size="md" mb={2}>Contacto</Heading>
            <VStack spacing={2} align="start">
              <Text fontWeight="bold">Contacto</Text>
              <Text>Teléfono: 321 493 43 85</Text>
              <Text>WhatsApp: +1 415 523 8886</Text>
              <Text>Email: nelsonandres192016@gmail.com</Text>
            </VStack>
          </Stack>

          <Stack align="flex-start">
            <Heading size="md" mb={2}>Síguenos</Heading>
            <Stack direction="row" spacing={6}>
              <Link href="#" isExternal>
                <Icon as={FaFacebook} w={6} h={6} />
              </Link>
              <Link href="#" isExternal>
                <Icon as={FaTwitter} w={6} h={6} />
              </Link>
              <Link href="#" isExternal>
                <Icon as={FaInstagram} w={6} h={6} />
              </Link>
              <Link href="#" isExternal>
                <Icon as={FaWhatsapp} w={6} h={6} />
              </Link>
            </Stack>
          </Stack>
        </SimpleGrid>

        <Box borderTopWidth={1} borderStyle="solid" borderColor={useColorModeValue('gray.200', 'gray.700')} pt={8} mt={8}>
          <Text textAlign="center">
            © {new Date().getFullYear()} Infosystem. Todos los derechos reservados.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 