import React, { Component } from 'react';
import LaunchItem from './LaunchItem';

const launchCount = (launchData) => {
    if (launchData.length === 1) return 'Showing 1 Mission';
    if (launchData.length === 0) return 'No results, please refine your search';
    return 'Showing ' + launchData.length + ' Missions';
}

class LaunchList extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='launchlist__background'>
                    <p className='launchList__count'>{launchCount(this.props.launchData)}</p>
                    {this.props.launchData.map((x,i) => {
                        let display = '';
                        if (i > this.props.itemsToDisplay) display = 'hidden'; // hide all items after the 10th
                        return <LaunchItem launchData={x} key={i} display={display} />
                    })}
                    { this.props.itemsToDisplay < this.props.launchData.length ? <a href='#' className='launchlist__showmore' onClick={this.props.toggleMoreItems}>Display more...</a> : undefined }
                </div>
            </div>
        );
    }
}

export default LaunchList;
