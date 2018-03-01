import React, { Component } from 'react';
import Hero from './components/Hero';
import LaunchSearch from './components/LaunchSearch';
import LaunchList from './components/LaunchList';
import Footer from './components/Footer';

import moment from 'moment';

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            launchData: [],
            launchDataFiltered: [],
            itemsToDisplay: 9,
            dateOptions: []
        }
    }

    componentDidMount = () => {
        const self = this;
        fetch('http://localhost:3001/launches', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            response.json().then(function(data) {
                self.setState({
                    launchData: data.data,
                    launchDataFiltered: data.data,
                    dateOptions: self.uniqueDates(data.data)
                })
            });
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
    }

    // filter launchData by value, lowercased both inputs
    launchDataFilter = ({ value, launchPad, minYear, maxYear }) => {
        // step 1: filter by keyword
        let result = this.state.launchData.filter(launch => {
            const launchInfo = launch.rocket.rocket_name + ' ' + (launch.flight_number).toString() + ' ' + launch.payloads.map(x => x.payload_id + ' ')
            return (launchInfo).toLowerCase().indexOf(value.toLowerCase()) !== -1;
        })
        // step 2: filter by launchpad, skip if null
        if (launchPad !== '') result = result.filter(launch => (launch.launch_site.site_id).indexOf(launchPad) !== -1)
        // step 3: filter by minYear, skip if null
        if (minYear !== '') result = result.filter(launch => moment(launch.launch_date_local).format("YYYY") >= minYear)
        // step 4: filter by maxYear, skip if null
        if (maxYear !== '') result = result.filter(launch => moment(launch.launch_date_local).format("YYYY") <= maxYear)
        this.setState({
            launchDataFiltered: result,
            itemsToDisplay: 9
        });
    }

    // display 10 more launch results
    toggleMoreItems = (event) => {
        event.preventDefault();
        this.setState({itemsToDisplay: this.state.itemsToDisplay + 10})
    }

    // return an array of unique date values
    uniqueDates = (dates) => {
        let array = [];
        dates.map((x,i) => {
            array.push(moment(x.launch_date_local).format("YYYY"));
        })
        return array.filter((v, i, a) => a.indexOf(v) === i);
    }

    render() {
        return (
            <div>
                <Hero />
                <div className='content__color'>
                    <LaunchSearch launchDataFilter={this.launchDataFilter} dateOptions={this.state.dateOptions} />
                    <LaunchList launchData={this.state.launchDataFiltered} toggleMoreItems={this.toggleMoreItems} itemsToDisplay={this.state.itemsToDisplay} />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default App;
