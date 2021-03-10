import { Container, AspectRatio } from '@chakra-ui/layout'
import React, { useState, useRef } from 'react'
import ReactPlayer from 'react-player'
import PlayerControls from './PlayerControls'



export default function VideoPlayer(props) {
    const [action, setAction] = useState ({
        playing : true,
        volume: 0.5,
        muted: true,
        played: 0,
        seeking: false
    })

    const {primaryColor, url, title, secondaryColor, channelID, useLogo, logoUrl} = props

    const {playing, volume, muted, played, seeking} = action
    const playerRef = useRef(null)
    const playerContainerRef = useRef(null)

    const handlePlayPause = () => {
        setAction({...action, playing: !action.playing});
    }

    const handleMute = () => {
        setAction({...action, muted: !action.muted });
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
        setAction({ ...action, ...changeState});
    }

    const handleSeek = (newValue) => {
        if(!action.seeking){
        setAction({...action, played: parseFloat(newValue / 100)})
        }
    }

    const handleSeeking = () => {
        setAction({...action, seeking: true})
    }

    const handleSeekEnd = (newValue) => {
        setAction({...action, seeking: false});
        playerRef.current.seekTo(newValue / 100);
    }

    return(
        <Container id='playerContainer' ref={playerContainerRef} w="100%" position='relative'>
            <AspectRatio maxW="100%" ratio={16 / 9}>
                <ReactPlayer 
                    ref={playerRef}
                    url={props.url}  
                    width={"100%"}
                    height='100%'
                    controls={false}
                    playing={playing}
                    volume={volume}
                    muted={muted}
                    onProgress={handleProgress}
                />
            </AspectRatio>
            <AspectRatio maxW="calc(100% - 32px)" ratio={16 / 9} position='absolute'
                top="0" bottom="0" left="16px" right="0"
            >
                <PlayerControls 
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
                    onSeeking={handleSeeking}
                    onSeekEnd={handleSeekEnd}
                />
            </AspectRatio>
        </Container>
    )
}