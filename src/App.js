import './App.css';
import YouTube from "react-youtube";
import Player from "./Player";
import {useEffect, useState} from "react";

function App() {

    const [videoIds] = useState([
        {
            id: 'rtTI1rh9U5M',
            title: '1 Hour Of Night Hindi Lofi Songs To Study \\Chill \\Relax \\Refreshing',
            poster: 'rtTI1rh9U5M.webp',
            author: 'Mood Creations'
        },
        {
            id: 'q0BVR5jRXxE',
            title: 'Bollywood Lofi Mixtape Vol.1 | 🎶 30 Minute Mix to Relax, Drive, Study, Chill 🌌| WORMONO',
            poster: 'q0BVR5jRXxE.webp',
            author: 'Wormono Music'
        },
        {
            id: 'Fs7CbWEES88',
            title: '45 Minutes of lofi songs -Bollywood Songs Hindi Songs #lofi #bollywood #bollywoodsongs',
            poster: 'Fs7CbWEES88.webp',
            author: 'Wormono Music'
        },
        {
            id: 'CzWsjMkOYKA',
            title: '1hour lofi mashup sleeping| relaxing|study|work|@Lofi ms lover feel the music..',
            poster: 'CzWsjMkOYKA.webp',
            author: 'Lofi ms lover'
        },
        {
            id: 'uS5wfG1REN4',
            title: '1 Hour Of Night Hindi Lofi Songs To Study, Chill, Relax and Refreshing',
            poster: 'uS5wfG1REN4.webp',
            author: 'LoFi and Chill'
        }
    ]);
    const randomVideo = () => {
        let random = videoIds[(Math.floor(Math.random() * videoIds.length))];
        setCurrentVideoId(random.id)
        setCurrentVideoData(random)
        return random.id;
    }
    const [currentVideoData, setCurrentVideoData] = useState(
        {
            id: '',
            poster: '',
            author: ''
        });
    let random = videoIds[(Math.floor(Math.random() * videoIds.length))];
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentVideoId, setCurrentVideoId] = useState(random.id);
    const [iframeTarget, setIframeTarget] = useState(Event.target);
    const [progress, setProgress] = useState(0);
    const [videoLength, setVideoLength] = useState(100);
    const opts = {
        height: 1,
        width: 1,
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    useEffect(()=>{
        setCurrentVideoData(random)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let timeoutTimer = '';
        let intervalTimer = '';
        timeoutTimer = setTimeout(() => {
            intervalTimer = setInterval(() => {
                if (iframeTarget !== undefined) {
                    if (iframeTarget.getCurrentTime() !== 0) {
                        if (!isNaN(iframeTarget.getCurrentTime() / 60)) {
                            setProgress(iframeTarget.getCurrentTime() / 60)
                        }
                    }
                }
            }, 300);
        }, 200);

        return (() => {
            clearInterval(intervalTimer);
            clearTimeout(timeoutTimer);
        })

    }, [iframeTarget]);

    const clickPlay = () => {
        iframeTarget.playVideo();
        setIsPlaying(true);
    }
    const clickPause = () => {
        iframeTarget.pauseVideo();
        setIsPlaying(false);
    }

    const playRandom = () => {
        setCurrentVideoId(randomVideo);
        setTimeout(() => {
            iframeTarget.clearVideo();
            iframeTarget.loadVideoById(currentVideoId);
            iframeTarget.playVideo();
            setVideoLength(iframeTarget.getDuration() / 60);
            setIsPlaying(true);
        }, 200);

    }

    const handleNext = () => {
        setCurrentVideoId(randomVideo);
        iframeTarget.clearVideo();
        iframeTarget.loadVideoById(currentVideoId);
        iframeTarget.playVideo();
        setIsPlaying(true);
    }

    const handlePrev = () => {
        setCurrentVideoId(randomVideo);
        iframeTarget.clearVideo();
        iframeTarget.loadVideoById(currentVideoId);
        iframeTarget.playVideo();
        setIsPlaying(true);
    }
    const _onReady = (event) => {
        setIframeTarget(event.target);
        setVideoLength(event.target.getDuration() / 60);
        setIsPlaying(true);
    }

    const seekTo = (time) => {
        iframeTarget.seekTo(time * 60);
    }

    const playRepeat = (time) => {
        iframeTarget.setLoop(true);
    }
    return (
        <>
            <Player
                currentVideoData={currentVideoData}
                isPlaying={isPlaying}
                clickPlay={clickPlay}
                clickPause={clickPause}
                progress={progress}
                videoLength={videoLength}
                playRandom={playRandom}
                handleNext={handleNext}
                handlePrev={handlePrev}
                seekTo={seekTo}
                playRepeat={playRepeat}
            />
            <div style={{
                opacity: 0,
            }}>
                <YouTube videoId={currentVideoId} opts={opts} onReady={_onReady}/>
            </div>
        </>
    );
}

export default App;
