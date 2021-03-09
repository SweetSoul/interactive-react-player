import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import ReactPlayer from 'react-player';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <ReactPlayer url="https://www.youtube.com/watch?v=HgFzP5m1k_c" controls={true} volume={0} playing={true}/>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
