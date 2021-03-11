import React, { useState } from 'react';
import {
  ChakraProvider,
  Flex,
  theme,
  Input,
  Checkbox,
  Text,
} from '@chakra-ui/react';
import VideoPlayer from './Components/VideoPlayer/videoplayer'


function App() {
  let defaultLogo = 'https://itelofilho.gallerycdn.vsassets.io/extensions/itelofilho/chakra-ui-cheatsheet/0.1.2/1602346378840/Microsoft.VisualStudio.Services.Icons.Default'
  let defaultColor = '#008080'
  let defaultSecColor = '#fff'
  const [url, setUrl] = useState("")
  const [isLive, setIsLive] = useState(false)
  const [useLogo, setUseLogo] = useState(true)
  const [logoUrl, setLogoUrl] = useState(defaultLogo)
  const [primaryColor,setPrimaryColor] = useState(defaultColor)
  const [secondaryColor,setSecondaryColor] = useState(defaultSecColor)
  let title =  ""
  let channelID = "UCbtlMIfdRVxPXZ1nI8NBN2A"
  let size = '800px'
  let questions = ['Quem descobriu o brasil?', 'Qual a língua falada no butão?']
  let fireTime = [10, 15]
  let fireMarks = questions.map((question, index) => 
  (
    {fire: {time: `${fireTime[index]}`, question: `${question}`}})
  )
    const handleLive = () => {
      (isLive) ? setIsLive(false) : setIsLive(true)
    }

  return (
    <ChakraProvider theme={theme}>
        <Flex 
          minH="100vh" minW="100vw" 
          alignItems="center" justifyContent="center"
          flexDirection="row" 
          p={5} 
          backgroundColor="#0A0D12"
        >
          <Flex flexDirection='column' w='50%' mb="35px" alignItems='center'>
            <Input id="videoURL"  placeholder="URL do vídeo" maxW='60%' justifySelf='center' onChange={(e) => {setUrl(e.target.value)}} />
            <Checkbox m='25px' onChange={handleLive}>É uma live?</Checkbox>
            <Checkbox mt='25px' defaultChecked={true} mb='5px' onChange={() => setUseLogo(!useLogo)}>Usar Logo?</Checkbox>
            <Input id="videoURL"  placeholder="URL da Logo" maxW='60%' justifySelf='center' 
            onChange={(e) => {(e.target.value.length === 0) ? setLogoUrl(defaultLogo) : setLogoUrl(e.target.value)}} 
            />
            <Flex maxW='100%' flexDirection='row' justifyContent='center' my='25px'>
              <Text flexShrink='0'>Escolha a cor primária: </Text>
              <Input flex='0 0 auto' ml='10px' maxW='10em' type='color' defaultValue={defaultColor} onChange={(e) => {setPrimaryColor(e.target.value)}}/>
            </Flex>
            <Flex maxW='100%' flexDirection='row' justifyContent='center'>
              <Text flexShrink='0'>Escolha a cor secundária (texto do 'Ao vivo'): </Text>
              <Input flex='0 0 auto' ml='10px' maxW='10em' type='color' defaultValue={defaultSecColor} onChange={(e) => {setSecondaryColor(e.target.value)}}/>
            </Flex>
          </Flex>
          <VideoPlayer 
            url={url}
            primaryColor={primaryColor}
            title={title}
            channelID={channelID}
            useLogo={useLogo}
            logoUrl={logoUrl}
            size={size}
            fireMarks={fireMarks}
            isLive={isLive}
            secondaryColor={secondaryColor}
          />
        </Flex>
    </ChakraProvider>
  );
}

export default App;
