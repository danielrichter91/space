import React from 'react';
import moment from 'moment';

// Display all payloads from array
const payloadList = (payloadArray) => {
    return payloadArray.map((x,i) => {
        return x.payload_id + ' ';
    })
}
// Check mission success
const missionSuccess = ({ launch_success, land_success }) => {
    if (!launch_success || !land_success) {
        return true;
    }
    return false;
}
// Convert launch date to human readable date
const launchDate = (date) => {
    return moment(date).format("Do MMMM YYYY");
}
// Convert launch time to human readable time
const launchTime = (time) => {
    return moment(time).format("h.ma");
}

// Open all links in new tab
const LaunchItem = ({ launchData, display }) => (
    <div className={'launchitem ' + display}>
        <div className='launchitem__img'>
            <img src={launchData.links.mission_patch} alt="mission_patch" />
        </div>
        <div className='launchitem__info'>
            <p className='launchitem__title'>{launchData.rocket.rocket_name} - {payloadList(launchData.payloads)}{ missionSuccess(launchData) ? '-' : undefined } { missionSuccess(launchData) ? <span>Failed Mission</span> : undefined }</p>
            <p className='launchitem__subtitle'>Launched <span>{launchDate(launchData.launch_date_local)}</span> at <span>{launchTime(launchData.launch_date_local)}</span> from <span>{launchData.launch_site.site_name}</span></p>
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