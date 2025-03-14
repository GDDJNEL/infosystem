import React from 'react';
import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex="1" as="main">
        {children}
      </Box>
      <Footer />
      <ChatBot />
    </Box>
  );
};

export default MainLayout; 