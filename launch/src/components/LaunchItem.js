import React from 'react';

// Extend this function to allow for multiple payloads
const payloadList = (payloadArray) => {
    return payloadArray.map((x,i) => {
        return x.payload_id + ' ';
    })
}

// Extend to remove the - when the mission is successful
const missionSuccess = ({ launch_success, land_success }) => {
    if (!launch_success || !land_success) {
        return <span>Failed Mission</span>;
    }
    return;
}

// Extend to covert date to human readable
const launchDateTime = () => {
    return;
}

// Open all links in new tab
const LaunchItem = ({ launchData, display }) => (
    <div className={'launchitem ' + display}>
        <div className='launchitem__img'>
            <img src={launchData.links.mission_patch} alt="mission_patch" />
        </div>
        <div className='launchitem__info'>
            <p className='launchitem__title'>{launchData.rocket.rocket_name} - {payloadList(launchData.payloads)}- {missionSuccess(launchData)}</p>
            <p className='launchitem__subtitle'>Launched <span>11th October 2017</span> at <span>6.53pm</span> from <span>{launchData.launch_site.site_name}</span></p>
            { launchData.links.reddit_campaign ? <a href={launchData.links.reddit_campaign} target="_blank" className='launchitem__link'>Reddit Campaign</a> : undefined }
            { launchData.links.reddit_launch ? <a href={launchData.links.reddit_launch} target="_blank" className='launchitem__link'>Reddit Launch</a> : undefined }
            { launchData.links.reddit_recovery ? <a href={launchData.links.reddit_recovery} target="_blank" className='launchitem__link'>Reddit Recovery</a> : undefined }
            { launchData.links.reddit_media ? <a href={launchData.links.reddit_media} target="_blank" className='launchitem__link'>Reddit Media</a> : undefined }
            { launchData.links.presskit ? <a href={launchData.links.presskit} target="_blank" className='launchitem__link'>Press Kit</a> : undefined }
            { launchData.links.article_link ? <a href={launchData.links.article_link} target="_blank" className='launchitem__link'>Article</a> : undefined }
            { launchData.links.video_link ? <a href={launchData.links.video_link} target="_blank" className='launchitem__link'>Watch Video</a> : undefined }
        </div>
        <div className='launchitem__flightnum'>
            <p className='launchitem__number'>#{launchData.flight_number}</p>
            <p className='launchitem__flighttext'>Flight Number</p>
        </div>
    </div>
)

export default LaunchItem;