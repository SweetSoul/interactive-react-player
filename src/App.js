import React from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Stack,
  Container,
  Flex,
  theme,
  Input,
} from '@chakra-ui/react';
import VideoPlayer from './Components/videoplayer'


function App() {
  let url = "https://www.youtube.com/watch?v=Rq5SEhs9lws";

  return (
    <ChakraProvider theme={theme}>
        <Flex 
          minH="100vh" minW="100vw" 
          alignItems="center" justifyContent="center"
          flexDirection="column" 
          p={5} 
          backgroundColor="#0A0D12"
        >
          <Input id="videoURL" placeholder="URL do vídeo" mb="25" maxW='30%' justifySelf='center' />
          <VideoPlayer url={url} />
        </Flex>
    </ChakraProvider>
  );
}

export default App;
