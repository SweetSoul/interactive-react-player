import React from 'react';
import {
  ChakraProvider,
  Flex,
  theme,
  Input,
} from '@chakra-ui/react';
import VideoPlayer from './Components/VideoPlayer/videoplayer'


function App() {
  let url = "https://www.youtube.com/embed/hZC0wzCSil4";
  let primaryColor = "red"
  let secondaryColor = "white"
  let title =  "Test"
  let channelID = "UCbtlMIfdRVxPXZ1nI8NBN2A"
  let useLogo = true
  let logoUrl = "https://yt3.ggpht.com/ytc/AAUvwnih1lb1CtrjxSGkv7a3PDrGJl1QF3Oypt2CuNJb=s88-c-k-c0x00ffffff-no-rj"

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
          <VideoPlayer 
            url={url}
            primaryColor={primaryColor}
            title={title}
            secondaryColor={secondaryColor}
            channelID={channelID}
            useLogo={useLogo}
            logoUrl={logoUrl}
          />
        </Flex>
    </ChakraProvider>
  );
}

export default App;
