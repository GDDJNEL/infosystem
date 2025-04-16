import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Stack,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react';

const projects = [
  {
    title: 'E-commerce Moderno',
    description: 'Tienda en línea con integración de pagos y gestión de inventario.',
    image: '/infosystem/portfolio/ecommerce.jpg',
    tags: ['React', 'Node.js', 'MongoDB'],
    category: 'Desarrollo Web',
  },
  {
    title: 'Sistema de Gestión',
    description: 'Software empresarial para gestión de recursos y procesos.',
    image: '/infosystem/portfolio/management.jpg',
    tags: ['Angular', 'Express', 'PostgreSQL'],
    category: 'Software Empresarial',
  },
  {
    title: 'App Móvil Delivery',
    description: 'Aplicación móvil para servicio de entrega a domicilio.',
    image: '/infosystem/portfolio/mobile-app.jpg',
    tags: ['React Native', 'Firebase'],
    category: 'Desarrollo Móvil',
  },
  {
    title: 'Portal Educativo',
    description: 'Plataforma de aprendizaje en línea con contenido multimedia.',
    image: '/infosystem/portfolio/education.jpg',
    tags: ['Vue.js', 'Laravel', 'MySQL'],
    category: 'Plataforma Web',
  },
  {
    title: 'Dashboard Analytics',
    description: 'Panel de control para visualización de datos empresariales.',
    image: '/infosystem/portfolio/dashboard.jpg',
    tags: ['TypeScript', 'D3.js', 'AWS'],
    category: 'Business Intelligence',
  },
  {
    title: 'CRM Personalizado',
    description: 'Sistema de gestión de relaciones con clientes a medida.',
    image: '/infosystem/portfolio/crm.jpg',
    tags: ['Python', 'Django', 'React'],
    category: 'Software Empresarial',
  },
];

const Portfolio = () => {
  const bgBox = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box>
      {/* Hero Section */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={20}>
        <Container maxW="1200px">
          <Stack spacing={8} textAlign="center">
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              Nuestro Portafolio
            </Heading>
            <Text color="gray.600" fontSize={{ base: 'lg', md: 'xl' }} maxW="3xl" mx="auto">
              Descubre algunos de nuestros proyectos más destacados
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* Portfolio Grid */}
      <Container maxW="1200px" py={20}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {projects.map((project) => (
            <Box
              key={project.title}
              bg={bgBox}
              rounded="lg"
              shadow="md"
              overflow="hidden"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Image
                src={project.image}
                alt={project.title}
                h="200px"
                w="full"
                objectFit="cover"
                fallbackSrc={`https://via.placeholder.com/600x400/00A650/FFFFFF?text=${encodeURIComponent(project.title)}`}
              />
              <Box p={6}>
                <Stack spacing={3}>
                  <Tag size="sm" colorScheme="brand" alignSelf="start">
                    {project.category}
                  </Tag>
                  <Heading size="md">{project.title}</Heading>
                  <Text color="gray.600">{project.description}</Text>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {project.tags.map((tag) => (
                      <Tag key={tag} size="sm" variant="subtle" colorScheme="gray">
                        {tag}
                      </Tag>
                    ))}
                  </Stack>
                </Stack>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* Stats Section */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={20}>
        <Container maxW="1200px">
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10} textAlign="center">
            <Box>
              <Heading color="brand.primary" fontSize="4xl">100+</Heading>
              <Text>Proyectos Completados</Text>
            </Box>
            <Box>
              <Heading color="brand.primary" fontSize="4xl">50+</Heading>
              <Text>Clientes Satisfechos</Text>
            </Box>
            <Box>
              <Heading color="brand.primary" fontSize="4xl">5+</Heading>
              <Text>Años de Experiencia</Text>
            </Box>
            <Box>
              <Heading color="brand.primary" fontSize="4xl">24/7</Heading>
              <Text>Soporte Disponible</Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default Portfolio;