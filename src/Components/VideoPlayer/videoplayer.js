import { Container, AspectRatio, Text } from '@chakra-ui/layout'
import React, { useState, useRef } from 'react'
import ReactPlayer from 'react-player'
import PlayerControls from './PlayerControls'
import { Modal, ModalBody, ModalFooter, ModalOverlay, ModalContent, ModalHeader } from "@chakra-ui/modal"
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";

let count = 0;
let index = 0;
let question = '';

export default function VideoPlayer(props) {
    const [action, setAction] = useState ({
        playing : true,
        volume: 0.5,
        muted: false,
        played: 0,
        seeking: true
    })

    const fireMarks = props.fireMarks

    const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal")

    const format = (seconds) => {
        if(isNaN(seconds)){
            return '00:00'
        }
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds().toString().padStart(2, '0')
        if(hh){
            return `${hh}:${mm.toString().padStart(2,'0')}:${ss}`
        } 
            return `${mm}:${ss}`
    }

    const {primaryColor, url, useLogo, logoUrl, title, size, isLive, secondaryColor, useQuestion} = props

    const {playing, volume, muted, played} = action
    const playerRef = useRef(null)
    const playerContainerRef = useRef(null)
    const controlsRef = useRef(null)
    const answerBtn = useRef(null)
    const answerInput = useRef(null)

    const handlePlayPause = () => {
        setAction({...action, playing: !action.playing});
    }

    const handleMute = () => {
        setAction({...action, muted: !action.muted});
    }

    const handleRW = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    }

    const handleFF = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    }

    const handleVolumeChange = (newValue) => {
        setAction({...action, volume: parseFloat(newValue/100), 
            muted : newValue === 0 ? true : false
            });
    }

    const handleFS = () => {
            if (!document.fullscreenElement) {
                document.getElementById('playerContainer').requestFullscreen();
            } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    const handleProgress = (changeState) => {
        if(count>2){
            controlsRef.current.style.opacity = '0';
            count = 0;
        }

        if(controlsRef.current.style.opacity === '1'){
            count += 1
        }

        fireVidEvents(fireMarks);

        setAction({ ...action, ...changeState});
    }

    const handleSeek = (newValue) => {
        setAction({...action, played: parseFloat(newValue / 100)});
        playerRef.current.seekTo(newValue / 100);
    }

    const handleChangeDisplayFormat = () => {
        setTimeDisplayFormat(timeDisplayFormat === 'normal' ? 'remaining' : 'normal')
        console.log(timeDisplayFormat)
    }

    const handleMouseMove = () => {
        controlsRef.current.style.opacity = '1';
        count = 0
    }

    const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00'
    const duration = playerRef.current ? playerRef.current.getDuration() : '00:00'

    const elapsedTime = timeDisplayFormat==='normal' ? format(currentTime) : `-${format(duration - currentTime)}`;
    const totalDuration = format(duration)

    const{ isOpen, onOpen, onClose } = useDisclosure();
    
    const fireVidEvents = (props) => {
        let tick = playerRef.current ? Math.round(playerRef.current.getCurrentTime()) : '';
        if(useQuestion === true && props.length > index){
            if(props[index].tempo == tick) {
                question = props[index].pergunta
                setAction({...action, playing: !action.playing});
                onOpen()
                index += 1
                }
            }
        }

    const handleSentAnswer = () => {
        let text = answerInput.current.value;
        if(text.length > 0) {
            console.log(text)
            answerInput.current.style.boxShadow = 'none'
            onClose()
            
        } else{
            answerInput.current.style.boxShadow = '0 0 5px 5px rgba(255,0,0,0.4)'
        }
        
    }

    const seekRecent = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 9999);
    }


    return(
        <Container id='playerContainer' ref={playerContainerRef} w='100%' maxW={size} p='0' m='0' h={`calc(9 * ${size} / 16)`}>
            <AspectRatio ratio={16 / 9} _before={{display: 'none'}} >
            <Container maxW='100%' position='relative' pt='56.25%'>
                <ReactPlayer 
                ref={playerRef}
                style={{position: 'absolute', top: '0', left:'0', margin: '0', padding: '0', width: '100%', height: 'auto'}}
                url={url}  
                width={'100%'}
                height='100%'
                controls={false}
                playing={playing}
                volume={volume}
                muted={muted}
                onProgress={handleProgress}
                config= {{
                    youtube: {
                        playerVars: { playerVars: { disablekb: 1 } }
                    },
                    vimeo: { playerOptions: { background: true, responsive: true, autoplay: false }}
                }}
                />
                <Container maxH='100%' maxW='100%' position='absolute' p='0' m='0'
                top="0" bottom="0" left="0" right="0" 
                onMouseMove={handleMouseMove}
                >
                    <PlayerControls 
                    ref={controlsRef}
                    onPlayPause={handlePlayPause}
                    playing={playing}
                    onRW={handleRW}
                    onFF={handleFF}
                    onVolumeChange={handleVolumeChange}
                    onMute={handleMute}
                    volume={volume}
                    muted={muted}
                    onToggleFS={handleFS}
                    primaryColor={primaryColor}
                    title={title}
                    played={played}
                    onSeek={handleSeek}
                    elapsedTime={elapsedTime}
                    totalDuration={totalDuration}
                    onChangeDisplayFormat={handleChangeDisplayFormat}
                    useLogo={useLogo}
                    logoUrl={logoUrl}
                    size={size}
                    isLive={isLive}
                    seekRecent={seekRecent}
                    secondaryColor={secondaryColor}
                    />
                </Container>
            </Container>
            </AspectRatio>

            <Modal onClose={onClose} isOpen={isOpen} isCentered closeOnOverlayClick={false} closeOnEsc={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Pergunta {index}</ModalHeader>
                <ModalBody>
                    <Text>
                        {question}
                    </Text>
                    <Input ref={answerInput} mt='20px' _focus={{outlineColor: `${primaryColor}`}} transition='box-shadow' transitionDuration='300ms' placeholder='Coloque aqui sua resposta'/>
                </ModalBody>
                <ModalFooter>
                    <Button  ref={answerBtn} onClick={handleSentAnswer}>Enviar resposta</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>

        </Container>
    )
}