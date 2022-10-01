import {useState} from "react";
import {Helmet} from "react-helmet";

import('./Player.css');

export default function Player({
                                   currentVideoData,
                                   isPlaying,
                                   clickPlay,
                                   clickPause,
                                   progress,
                                   videoLength,
                                   playRandom,
                                   handleNext,
                                   handlePrev,
                                   seekTo,
                                   playRepeat
                               }) {
    const [seek, setSeek] = useState(progress);

    const handleChange = e => {
        setSeek(parseFloat(e.target.value).toFixed(2));
        seekTo(e.target.value * (videoLength / 60));
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            clickPause();
        } else {
            clickPlay();
        }
    }
    return (
        <div className='player' style={{
            zIndex: 999999
        }}>
            <Helmet titleTemplate="%s - Lofi Radio">
                <meta charSet="utf-8" />
                <title>{`${isPlaying?'⏸':'▶️'}️ ${currentVideoData.title}`}</title>
            </Helmet>
            <div className='player_inner'>
                <div className='player_inner__top'>
                    <div className='t_left'>
                        <i className='fa fa-bars' style={{
                            opacity:0
                        }}></i>
                    </div>
                    <div className='t_mid'>
                        <h1>Lofi Radio</h1>
                    </div>
                    <div className='t_right'>
                        <i className='fa fa-search'
                           style={{
                               opacity:0
                           }}></i>
                    </div>
                </div>
                <div className='player_inner__middle'>
                    {/*<input className='trigger--4' name='omni' type='radio'/>*/}
                    <input className='trigger--3' name='omni' type='radio'/>
                    <input className='trigger--2' name='omni' type='radio'/>
                    {/*<input className='trigger--1' name='omni' type='radio'/>*/}
                    <input className='empty'/>
                    <div className='cube'>
                        <div className='cube_inner'>
                            <div className='cube_inner__front'>
                                <div className='bars' style={{
                                    opacity: isPlaying ? 1 : 0
                                }}>
                                    <div className='bars_bar'></div>
                                    <div className='bars_bar'></div>
                                    <div className='bars_bar'></div>
                                    <div className='bars_bar'></div>
                                    <div className='bars_bar'></div>
                                    <div className='bars_bar'></div>
                                    <div className='bars_bar'></div>
                                    <div className='bars_bar'></div>
                                    <div className='bars_bar'></div>
                                    <div className='bars_bar'></div>
                                </div>
                                <div className='details'>
                                    <div className='details_album'
                                         style={{
                                             background: currentVideoData.poster!==''?`url(${require('./posters/'+currentVideoData.poster)}) no-repeat center`:'' ,
                                             // backgroundImage: `url(${currentVideoData.poster})`
                                             // backgroundImage: "url(" + "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" + ")",
                                         }}></div>
                                    <h2>{currentVideoData.title}</h2>
                                    <h3>{currentVideoData.author}</h3>
                                </div>
                            </div>
                            <div className='cube_inner__left'>
                                <div className='options'>
                                    <i className='fa fa-headphones'></i>
                                    <i className='fa fa-redo-alt'></i>
                                    <i className='fa fa-random'></i>
                                    <i className='fa fa-fast-forward'></i>
                                    <i className='fa fa-music'></i>
                                </div>
                            </div>
                            <div className='cube_inner__right'>
                                <div className='volume'>

                                    <input type='range' max="100" min="10">
                                    </input>

                                    <i className='fa fa-volume-up'></i>
                                    {/*<div className='volume_pip'></div>*/}
                                    {/*<div className='volume_pip'></div>*/}
                                    {/*<div className='volume_pip'></div>*/}
                                    {/*<div className='volume_pip'></div>*/}
                                    {/*<div className='volume_pip'></div>*/}
                                    {/*<div className='volume_pip'></div>*/}
                                    {/*<div className='volume_pip'></div>*/}
                                    {/*<div className='volume_pip'></div>*/}
                                    {/*<div className='volume_pip'></div>*/}
                                    {/*<div className='volume_pip'></div>*/}
                                    {/*<div className='volume_pip'></div>*/}
                                    {/*<div className='volume_pip'></div>*/}
                                    {/*<div className='volume_pip'></div>*/}
                                    {/*<div className='volume_pip'></div>*/}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='r_trim'></div>
                    <div className='l_trim'></div>
                    <div className='shadow_right'></div>
                    <div className='shadow_left'></div>
                </div>
                <div className='player_inner__bottom'>
                    <div className='options'>
                        <i className='fa fa-repeat' onClick={playRepeat}></i>
                        <i className='fa fa-random' onClick={playRandom} title="Play random"></i>
                    </div>
                    <div className='playbar'>
                        <input type="range" id="seek-slider" max={videoLength} min="0" value={seek}
                               className='playbar_inner' style={{
                            marginTop: '-1px',
                            width: '100%'
                        }} onChange={e => setSeek(e.target.value)}
                               onMouseUp={handleChange}/>
                        {/*<div className='playbar_inner' style={{width: progress + '%'}}>*/}
                        {/*    <div style={{*/}
                        {/*        float: 'right',*/}
                        {/*        marginTop: '-8px',*/}
                        {/*        color: '#44ab87'*/}
                        {/*    }}>*/}
                        {/*        <i className="fa fa-circle" aria-hidden="true"></i>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className='playbar_left'>
                            {progress !== 0
                                ? <span>{parseFloat(progress.toFixed(2)).toString().replace('.', ':')}</span>
                                : <span>0:00</span>
                            }
                        </div>
                        <div className='playbar_right'>
                            {videoLength !== 0
                                ? <span>{parseFloat(videoLength.toFixed(2)).toString().replace('.', ':')}</span>
                                : <span>100:00</span>
                            }
                        </div>
                    </div>
                    <div className='controls'>
                        <div className='controls_left'>
                            <i className='fa fa-step-backward' onClick={handlePrev} title="Play prev"></i>
                        </div>
                        <div className='controls_middle'>
                            {isPlaying
                                ? <i className='fa fa-pause-circle' onClick={handlePlayPause}></i>
                                : <i className='fa fa-play-circle' onClick={handlePlayPause}></i>
                            }
                        </div>
                        <div className='controls_right'>
                            <i className='fa fa-step-forward' onClick={handleNext} title="Play next"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
