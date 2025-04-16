import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      primary: '#00A650',    // Verde corporativo
      secondary: '#000000',  // Negro
      accent: '#F5F5F5',     // Tono neutro claro
    },
  },
  fonts: {
    heading: '"Poppins", sans-serif',
    body: '"Inter", sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.primary',
          color: 'white',
          _hover: {
            bg: 'brand.primary',
            opacity: 0.9,
          },
        },
      },
    },
  },
});

export default theme; 