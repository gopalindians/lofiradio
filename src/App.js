import './App.css';
import YouTube from "react-youtube";
import React, {useEffect, useState} from "react";
import Player from "./Player";
import ReactGA from 'react-ga';
import useAnalyticsEventTracker from './useAnalyticsEventTracker';
const TRACKING_ID = "G-EEZYQ5LJVB"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
    const gaEventTracker = useAnalyticsEventTracker('Player');
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
        },
        {
            id: 'LChom6tBtKM',
            title: '1 Hour Of Aesthetic Indian Lofi, Bollywood Lofi Songs To Chill Study Relax And Enjoy❤🎶',
            poster: 'LChom6tBtKM.jpeg',
            author: 'Jubin Hoof'
        },
        {
            id: 'HA-WJYc4J9c',
            title: 'Long Drive Mashup | Non-Stop JukeBox | Jay Guldekar | Road Trip Mashup | Romantic LoFi, Chill',
            poster: 'HA-WJYc4J9c.jpeg',
            author: 'Jay Guldekar'
        },
        {
            id: '2tuyLghqDDQ',
            title: 'Mood X Waalian X Senorita X Tu Aake Dekhle | DJ Rohan | Chill Mashup 2021 | @Shawn Mendes',
            poster: '2tuyLghqDDQ.jpeg',
            author: 'ROHAN ♪'
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
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);
    useEffect(()=>{
        setCurrentVideoData(random)
        gaEventTracker('PlayerInit');
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
        gaEventTracker('playVideo');
    }
    const clickPause = () => {
        iframeTarget.pauseVideo();
        setIsPlaying(false);
        gaEventTracker('pauseVideo');
    }

    const playRandom = () => {
        setCurrentVideoId(randomVideo);
        setTimeout(() => {
            iframeTarget.clearVideo();
            iframeTarget.loadVideoById(currentVideoId);
            iframeTarget.playVideo();
            setVideoLength(iframeTarget.getDuration() / 60);
            setIsPlaying(true);
            gaEventTracker('playRandom');
        }, 200);

    }

    const handleNext = () => {
        setCurrentVideoId(randomVideo);
        iframeTarget.clearVideo();
        iframeTarget.loadVideoById(currentVideoId);
        iframeTarget.playVideo();
        setIsPlaying(true);
        gaEventTracker('playNext');
    }

    const handlePrev = () => {
        setCurrentVideoId(randomVideo);
        iframeTarget.clearVideo();
        iframeTarget.loadVideoById(currentVideoId);
        iframeTarget.playVideo();
        setIsPlaying(true);
        gaEventTracker('playPrev');
    }
    const _onReady = (event) => {
        setIframeTarget(event.target);
        setVideoLength(event.target.getDuration() / 60);
        setIsPlaying(true);
        gaEventTracker('onReady');
    }

    const seekTo = (time) => {
        iframeTarget.seekTo(time * 60);
        gaEventTracker('seekVideo');
    }

    const playRepeat = (time) => {
        iframeTarget.setLoop(true);
        gaEventTracker('repeatVideo');
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
