import { Container, Flex, AspectRatio } from '@chakra-ui/layout'
import React from 'react'
import ReactPlayer from 'react-player'



export default function VideoPlayer(props) {
    

    return(
        <Container w="100%" position='relative'>
            <AspectRatio maxW="100%" ratio={16 / 9}>
                <ReactPlayer 
                    url={props.url}  
                    width={"100%"}
                    height='100%'
                />
            </AspectRatio>
            <Flex 
                position="absolute"
                top="0" bottom="0" left="0" right="0"
                background="rgba(0,0,0,0.6)"
                flexDirection="column"
                justifyContent="space-between"
                zIndex='1'
            >   
            </Flex>
        </Container>
    )
}