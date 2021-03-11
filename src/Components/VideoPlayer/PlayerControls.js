import Icon from '@chakra-ui/icon'
import { BsPlayFill, BsPauseFill, BsVolumeUpFill, BsFillVolumeMuteFill, BsVolumeDownFill } from 'react-icons/bs'
import { AiOutlineFullscreen } from 'react-icons/ai'
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/slider'
import { Image } from '@chakra-ui/image'
import { IconButton, Button } from '@chakra-ui/button'
import { Flex, Grid, GridItem, Text } from '@chakra-ui/layout'
import React, { forwardRef, useRef } from 'react'
import { chakra } from '@chakra-ui/system'
import { Tooltip } from '@chakra-ui/tooltip'

export default forwardRef(({ 
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
    totalDuration,
    elapsedTime,
    onChangeDisplayFormat,
    primaryColor,
    title,
    useLogo,
    logoUrl,
    isLive,
    size,
    seekRecent,
    secondaryColor
    }, ref) => {
        const refTxtFF = useRef(null)
        const refTxtRW = useRef(null)

        const standardize_color = (str) => {
            let ctx = document.createElement("canvas").getContext("2d");
            ctx.fillStyle = str;
            return ctx.fillStyle;
        }

        const convertHexToRGBA = (color, opacity) => {
            let hexCode = standardize_color(color)
            let hex = hexCode.replace('#', '');
            
            if (hex.length === 3) {
                hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
            }    
            
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
        
            return `rgba(${r},${g},${b},${opacity / 100})`;
        };
        let priColorRgba = convertHexToRGBA(primaryColor, 40);
    return (
        
        <Flex 
                background="rgba(0,0,0,0.6)"
                flexDirection="column"
                justifyContent='space-between'
                alignItems='flex-start'
                w='100%'
                h='100%'
                zIndex='1'
                ref={ref}
            >

                {/* Controles do topo */}
                <Grid templateColumns="repeat(8, 1fr)" gap={2} 
                    justifyContent='space-between'
                    p='16px' w='100%'
                >
                    <GridItem colSpan={3}>
                        <Text as='h4' color='white' fontSize='20px'>{title}</Text>
                    </GridItem>
                    {(useLogo) ? 
                    <GridItem colStart={8}>
                    <Image  
                            w='100%'
                            h='auto'
                            maxW='30px'
                            fit='contain'
                            margin='0' 
                            ml='auto'
                            src={logoUrl}
                        />
                    </GridItem>
                    : null
                    }
                </Grid>

                {/* Controles secretos no meio */}
                <Grid templateColumns="repeat(10, 1fr)" w='100%' h='70%' alignItems='center'>
                    <GridItem colSpan={3} h='100%'>
                        <chakra.div h='100%' w='100%' onDoubleClick={onRW} ></chakra.div>
                    </GridItem>
                    <GridItem colSpan={4} h='100%'>
                        <chakra.div h='100%' w='100%' textAlign='center' onClick={onPlayPause} onDoubleClick={onToggleFS}>
                            <Text ref={refTxtFF} textAlign='center' fontSize='2xl' opacity='0' backgroundColor='rgba(255,255,255,.3'>+10</Text>
                            <Text ref={refTxtRW} textAlign='center' fontSize='2xl' opacity='0' backgroundColor='rgba(255,255,255,.3' >-10</Text>
                        </chakra.div>
                    </GridItem>
                    <GridItem colSpan={3} h='100%'>
                        <chakra.div h='100%' w='100%' onDoubleClick={onFF} ></chakra.div>
                    </GridItem>
                </Grid>

                {/* Controles de baixo */}
                <Grid templateColumns="repeat(8, 1fr)" templateRows='repeat(2, 30px)' p="16px" w='100%'>
                    <GridItem colSpan={8} rowSpan={1}>
                    <Slider aria-label="slider-ex-1"
                    value={(isLive) ? 100 : played * 100} onChange={onSeek}
                    focusThumbOnChange={false}>
                        <SliderTrack>
                            <SliderFilledTrack backgroundColor={primaryColor} />
                        </SliderTrack>
                        <Tooltip closeOnMouseDown={true} 
                        hasArrow 
                        label={elapsedTime}
                        placement='top'
                        >
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
                            _focus={{boxShadow: 'none'}}
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
                                value={(muted) ? 0 : volume * 100}
                                onChange={onVolumeChange}
                                maxW='5em'
                            > 
                                <SliderTrack>
                                    <SliderFilledTrack backgroundColor={primaryColor}/>
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>

                        <Button color='#fff' ml='16px' fontSize='12px' 
                        onClick={(isLive) ? seekRecent : onChangeDisplayFormat}
                        p={(isLive) ? '2px 12px 2px 12px' : '0'}
                        background={(isLive) ? `${primaryColor}` : 'none'}
                        fontWeight={(isLive) ? 'bold' : '400'}
                        outline='none'
                        h='80%'
                        color={(isLive) ? secondaryColor : '#fff'}
                        boxShadow={(isLive) ? `0 0 10px 7px ${priColorRgba}` : 'none'}
                        _hover={(isLive) ? {boxShadow: 'none'} : {background: 'none', boxShadow:'none'}}
                        > 
                        {(isLive) ? 'Ao Vivo' : `${elapsedTime} / ${totalDuration}`}
                        </Button>
                        
                        
                        <IconButton 
                            color="#999"
                            _hover={{ color:"#fff" }} 
                            background='none' 
                            size='xs' 
                            fontSize='25px' 
                            aria-label='Fullscreen' 
                            icon={<Icon as={AiOutlineFullscreen} />} 
                            ml='auto'
                            onClick={onToggleFS}
                        />
                    </GridItem>
                </Grid>
            </Flex>
    )
})