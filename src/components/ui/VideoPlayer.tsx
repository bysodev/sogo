import { IconButton, LinearProgress, Slider, styled } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { FaVolumeDown, FaVolumeMute, FaVolumeOff, FaVolumeUp } from 'react-icons/fa';
import { IoPause, IoPlay } from 'react-icons/io5';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';

interface VideoPlayerProps {
    src: string;
}

const StyledSlider = styled(Slider)({
    color: '#c084fc', // Cambia el color del slider
    width: 5,
    height: '4rem',
    position: 'absolute',
    left: 3,
    top: '-1.7rem',
    m: 10,
    transform: 'translateY(-50%)', // Ajusta la posición para que esté perfectamente centrada
    '& .MuiSlider-thumb': {
        height: 0,
        width: 0,
        '&:hover': {
            boxShadow: 'none',
        },
    },
    '& .MuiSlider-track': {
        heigth: '3rem',
    },
    '& .MuiSlider-rail': {
        heigth: '3rem',
    },
});

const StyledLinearProgress = styled(LinearProgress)({
    height: '5px',
    borderRadius: '5px',
    backgroundColor: '#d8b4fe',
    '& .MuiLinearProgress-bar': {
        backgroundColor: '#c084fc',
    },
});

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState<number>(100);
    const [currentTime, setCurrentTime] = useState<number | undefined>(0);
    const [duration, setDuration] = useState<number | undefined>(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handlePlayPause = () => {
        if (videoRef?.current?.paused) {
            videoRef?.current?.play();
            setIsPlaying(true);
        } else {
            videoRef?.current?.pause();
            setIsPlaying(false);
        }
    };

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [src]);

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef?.current?.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(videoRef?.current?.duration);
    };

    const handleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
        }
        setIsMuted(!isMuted);
    };
    const handleVolumeChange = (event: Event, newValue: number | number[]) => {
        const value = Array.isArray(newValue) ? newValue[0] : newValue;
        setVolume(value);
        if (videoRef.current) {
            videoRef.current.volume = value / 100;
        }
    };

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoRef.current?.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
            setIsFullscreen(true);
        } else if (document.exitFullscreen) {
            document.exitFullscreen().catch(err => {
                alert(`Error attempting to close full-screen mode: ${err.message} (${err.name})`);
            });
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        video?.addEventListener('timeupdate', handleTimeUpdate);
        video?.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            video?.removeEventListener('timeupdate', handleTimeUpdate);
            video?.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        video?.addEventListener('ended', () => setIsPlaying(false));

        return () => {
            video?.removeEventListener('ended', () => setIsPlaying(false));
        };
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    return (
        <div className='block border rounded-t-xl relative'>
            <video
                ref={videoRef}
                className="rounded-xl m-auto aspect-[12/9] object-contain w-full"
                height="5400"
                width="500"
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute w-full flex items-center justify-between bg-white rounded-b-xl p-1">
                <IconButton onClick={handlePlayPause}>
                    {isPlaying ? <IoPause /> : <IoPlay />}
                </IconButton>
                <div className="flex gap-2 w-full items-center">
                    <div className="whitespace-nowrap text-xs">
                        {formatTime(currentTime ?? 0)} / {formatTime(duration ?? 0)}
                    </div>
                    <StyledLinearProgress sx={{ width: '100%' }} variant="determinate" value={(currentTime ?? 0) / (duration ?? 0) * 100} />
                </div>
                <div className="relative flex"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    {isHovered && (
                        <StyledSlider
                            orientation='vertical'
                            value={volume}
                            onChange={(event: Event, newValue: number | number[]) => handleVolumeChange(event, newValue as number)}
                            aria-labelledby="continuous-slider"
                        />
                    )}
                    <IconButton onClick={handleMute}>
                        {isMuted ? <FaVolumeMute /> : volume === 0 ? <FaVolumeOff /> : volume > 50 ? <FaVolumeUp /> : <FaVolumeDown />}                    </IconButton>
                </div>
                <IconButton onClick={handleFullscreen}>
                    {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
                </IconButton>
            </div>
        </div>
    );
};

export default VideoPlayer;