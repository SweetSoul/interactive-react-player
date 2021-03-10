import Icon from '@chakra-ui/icon'
import { BsPlayFill, BsPauseFill, BsVolumeUpFill, BsFillVolumeMuteFill, BsVolumeDownFill } from 'react-icons/bs'
import { AiOutlineFullscreen } from 'react-icons/ai'
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/slider'
import { Tooltip } from '@chakra-ui/tooltip'
import { Image } from '@chakra-ui/image'
import { IconButton } from '@chakra-ui/button'
import { Flex, Grid, GridItem, Text } from '@chakra-ui/layout'
import React from 'react'
import { chakra } from '@chakra-ui/system'

export default function PlayerControls({ 
    onPlayPause, 
    playing, 
    onRW, 
    onFF, 
    onVolumeChange, 
    volume,
    onMute,
    muted,
    played,
    onToggleFS,
    onSeek,
    onSeeking,
    onSeekEnd,
    primaryColor,
    title
    }){

    return (
        <Flex 
                background="rgba(0,0,0,0.6)"
                flexDirection="column"
                justifyContent='space-between'
                zIndex='1'
            >

                {/* Controles do topo */}
                <Grid templateColumns="repeat(8, 1fr)" gap={2} 
                    justifyContent='space-between' 
                    p='16px'
                    w='100%'
                >
                    <GridItem colSpan={3}>
                        <Text as='h5' color='white'>{title}</Text>
                    </GridItem>
                </Grid>

                {/* Controles secretos no meio */}
                <Grid templateColumns="repeat(10, 1fr)" w='100%' h='8em' alignItems='center' position='absolute' bottom='calc(50% - 100)'>
                    <GridItem colSpan={3}>
                        <chakra.div h='100' w='100%' onDoubleClick={onRW} ></chakra.div>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <chakra.div h='100' w='100%' textAlign='center' onClick={onPlayPause} >
                            <Text id='ffTxt' textAlign='center' opacity='0' backgroundColor='rgba(255,255,255,.3'>+10</Text>
                        </chakra.div>
                    </GridItem>
                    <GridItem colSpan={3}>
                        <chakra.div h='100' w='100%' onDoubleClick={onFF} ></chakra.div>
                    </GridItem>
                </Grid>

                {/* Controles de baixo */}
                <Grid templateColumns="repeat(8, 1fr)" templateRows='repeat(2, 30px)' p="16px" w='100%'>
                    <GridItem colSpan={8} rowSpan={1}>
                    <Slider aria-label="slider-ex-1" colorScheme='teal' value={played * 100} 
                    onChange={onSeek} onChangeStart={() => console.log("test2")} onChangeEnd={() => console.log("test")} >
                        <SliderTrack>
                            <SliderFilledTrack backgroundColor={primaryColor} />
                        </SliderTrack>
                        <Tooltip hasArrow placement='top' label={played * 100} aria-label="Video Timestamp tooltip">
                            <SliderThumb />
                        </Tooltip>
                    </Slider>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={8} display="flex" flexDirection='Row' alignItems='center'>
                                
                    <IconButton 
                            color="#999"
                            _hover={{ color:"#fff" }} 
                            background= "none"
                            aria-label="Play/Pause Button"
                            size="xs"
                            fontSize="35px"
                            icon={<Icon as={playing?BsPauseFill:BsPlayFill}
                            onClick={onPlayPause}
                        />}

                        />
                        <IconButton 
                            color="#999"
                            ml='20px'
                            _hover={{ color:"#fff" }} 
                            background='none' 
                            size='xs' 
                            fontSize='25px' 
                            aria-label='Volume' 
                            onClick={onMute}
                            icon={<Icon as={
                                    (volume === 0 || muted === true) ? 
                                    BsFillVolumeMuteFill : 
                                    (volume >= 0.5) ? 
                                    BsVolumeUpFill : 
                                    (volume < 0.5) ? 
                                    BsVolumeDownFill : null} 
                                />} 
                            mr='5px'
                        />
                            <Slider 
                                ml='5px'
                                aria-label="Volume Slider"  
                                value={volume * 100}
                                onChange={onVolumeChange}
                                maxW='5em'
                            > 
                                <SliderTrack>
                                    <SliderFilledTrack backgroundColor={primaryColor}/>
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        <Text color='#fff' ml='16px'> 05:05 </Text>
                        <Image  
                            boxSize='80px'
                            fit='contain'
                            margin='0'
                            ml='auto' 
                            src='https://sweetsoul.sirv.com/Images/Logos/logo-coca-cola-comp.png'
                        />
                        <IconButton 
                            color="#999"
                            _hover={{ color:"#fff" }} 
                            background='none' 
                            size='xs' 
                            fontSize='25px' 
                            aria-label='Fullscreen' 
                            icon={<Icon as={AiOutlineFullscreen} />} 
                            ml='25px'
                            onClick={onToggleFS}
                        />
                    </GridItem>
                </Grid>
            </Flex>
    )
}