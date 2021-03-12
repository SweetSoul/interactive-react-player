import React, { useState} from 'react';
import {
  ChakraProvider,
  Flex,
  theme,
  Input,
  Checkbox,
  Text,
  Button,
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
  const [fireMarks, setFireMarks] = useState([{tempo: 0, pergunta: ''}]) 
  const [useQuestion, setUseQuestion] = useState(false)
  let title =  ""
  let channelID = "UCbtlMIfdRVxPXZ1nI8NBN2A"
  let size = '800px'
  
    const handleLive = () => {
      (isLive) ? setIsLive(false) : setIsLive(true)
    }

     function handleChange(evt, idx) {
      const value = evt.target.value;
      const name = evt.target.name;
      
      
      const newQuestion = fireMarks.map((fireMark, sidx) => {
        if (idx !== sidx) return fireMark
        else { return {...fireMark, pergunta: value}}
      });

      const newTime = fireMarks.map((fireMark, sidx) => {
        if (idx !== sidx) return fireMark
        else { return {...fireMark, tempo: value}}
      });

      if(name === 'pergunta'){
          setFireMarks(newQuestion)
      } else {
          setFireMarks(newTime)
      }

      if(fireMarks[0].pergunta !== '' && fireMarks[0] !== 0){
        setUseQuestion(true);
      }
    }

    const handleAddQuestion = () => {
      setFireMarks(fireMarks.concat([{pergunta: '', tempo: 0}]));
    };
  
    const handleRemoveQuestion = (idx) => {
      setFireMarks(fireMarks.filter((s, sidx) => idx !== sidx));
    };

  return (
    <ChakraProvider theme={theme}>
        <Flex 
          minH="100vh" minW="100vw" 
          alignItems="center" justifyContent="center"
          flexDirection={['column-reverse', 'column-reverse','column-reverse', 'row']}
          p={5} 
          backgroundColor="#0A0D12"
        >
          <Flex flexDirection='column' w='80%' alignItems='center' my='25px'>
            <Input 
            color={defaultSecColor} 
            placeholder="URL do vídeo" 
            maxW='70%' 
            justifySelf='center' 
            onChange={(e) => {setUrl(e.target.value)}} 
            />

            <Flex 
            flexDirection='row' 
            alignItems='center'
            >
              <Checkbox 
              m='25px' 
              color={defaultSecColor} 
              onChange={handleLive}>
                É uma live?
              </Checkbox>

              <Checkbox m='25px' 
              color={defaultSecColor} 
              defaultChecked={true} 
              onChange={() => setUseLogo(!useLogo)}>
                Usar Logo?
              </Checkbox>
            </Flex>

            <Input 
            color={defaultSecColor}  
            placeholder="URL da Logo" 
            maxW='70%' 
            justifySelf='center' 
            onChange={(e) => {(e.target.value.length === 0) ? setLogoUrl(defaultLogo) : setLogoUrl(e.target.value)}} 
            />

            <Flex 
            maxW='100%' 
            flexDirection={['column', 'column','column', 'column','row']} 
            justifyContent='center' 
            alignItems='center'
            my='25px'
            >
              <Text 
              flexShrink='0' 
              color={defaultSecColor}>
                Escolha a cor primária: 
              </Text>

              <Input 
              color={defaultSecColor} 
              defaultValue={primaryColor}
              flex='0 0 auto' 
              maxW='10em' 
              alignSelf='center' 
              type='color'  
              onChange={(e) => {setPrimaryColor(e.target.value)}}
              />
            </Flex>

            <Flex 
            maxW='100%' 
            mb='30px' 
            alignItems='center'
            color={defaultSecColor} 
            flexDirection={['column', 'column','column', 'column','row']} 
            justifyContent='center'
            >
              <Text 
              flexShrink='0'>
                Escolha a cor secundária (texto do 'Ao vivo'): 
              </Text>

              <Input 
              flex='0 0 auto' 
              alignSelf='center' 
              maxW='10em' 
              type='color' 
              defaultValue={secondaryColor}
              onChange={(e) => {setSecondaryColor(e.target.value)}}
              />
            </Flex>

            {fireMarks.map((question, idx) => (
          <Flex w='70%' maxW='100%' color={defaultSecColor} key={`Container${idx}`} flexDirection='row' justifyContent='center' m='10px'>
              <Input flex='0 0 auto' 
              alignSelf='center' 
              ml='10px' 
              w='60%'
              type='text'
              name='pergunta'
              key={`Pergunta${idx}`}
              placeholder={`Pergunta #${idx + 1}`}
              onChange={(e) => handleChange(e, idx)}
              />

              <Input flex='0 0 auto' 
              alignSelf='center' 
              label='Tempo em segundos'
              ml='10px'
              w='25%'
              name='tempo'
              type='number'
              key={`Segundos${idx}`}
              placeholder='Tempo em segundos'
              onChange={(e) => handleChange(e, idx)}
              />
            <Button
              onClick={() => handleRemoveQuestion(idx)}
              className="small"
              transform=' scale(1)'
              key={`Remover${idx}`}
              _hover={{transform: 'scale(1.1)'}}
              backgroundColor={primaryColor}
              ml='10px'
            >
              -
            </Button>
          </Flex>
        ))}
        <Button
          onClick={handleAddQuestion}
          className="small"
          mt='10px'
          transform=' scale(1)'
          _hover={{transform: 'scale(1.1)'}}
          backgroundColor={primaryColor}
        >
          Adicionar Pergunta
        </Button>
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
            useQuestion={useQuestion}
          />
        </Flex>
    </ChakraProvider>
  );
}

export default App;
