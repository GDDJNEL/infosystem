import React from 'react';
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Stack,
  IconButton,
  Link,
  Image,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const Links = [
  { name: 'Inicio', path: '/' },
  { name: 'Nosotros', path: '/nosotros' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Soporte Siigo', path: '/soporte-siigo' },
  { name: 'Portafolio', path: '/portafolio' },
  { name: 'Contacto', path: '/contacto' },
];

const Header: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box as="header" bg="white" px={4} boxShadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="1200px" mx="auto">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={onToggle}
        />
        
        <Link as={RouterLink} to="/" display="flex" alignItems="center">
          <Image
            src="/images/logo.png"
            alt="Infosystem Logo"
            h={{ base: "30px", md: "40px" }}
            w="auto"
            objectFit="contain"
            fallbackSrc="https://via.placeholder.com/200x50/00A650/FFFFFF?text=INFOSYSTEM"
          />
        </Link>

        <Flex display={{ base: 'none', md: 'flex' }} alignItems="center">
          <Stack direction="row" spacing={4}>
            {Links.map((link) => (
              <Link
                key={link.path}
                as={RouterLink}
                to={link.path}
                px={2}
                py={1}
                rounded="md"
                _hover={{
                  textDecoration: 'none',
                  color: 'brand.primary',
                }}
              >
                {link.name}
              </Link>
            ))}
          </Stack>
        </Flex>

        <Box display={{ base: 'none', md: 'block' }}>
          <Button
            as={RouterLink}
            to="/contacto"
            colorScheme="brand"
            variant="solid"
          >
            Contáctanos
          </Button>
        </Box>
      </Flex>

      {/* Mobile menu */}
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'none' }}
        pb={4}
      >
        <Stack as="nav" spacing={4}>
          {Links.map((link) => (
            <Link
              key={link.path}
              as={RouterLink}
              to={link.path}
              px={2}
              py={1}
              rounded="md"
              _hover={{
                textDecoration: 'none',
                bg: 'brand.accent',
              }}
            >
              {link.name}
            </Link>
          ))}
          <Button
            as={RouterLink}
            to="/contacto"
            colorScheme="brand"
            variant="solid"
            w="full"
          >
            Contáctanos
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Header; 