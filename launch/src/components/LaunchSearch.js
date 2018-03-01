import React, { Component } from 'react';

class LaunchSearch extends Component {
    constructor (props) {
        super(props)
        this.state = {
            formData: {
                value: '',
                launchPad: '',
                minYear: '',
                maxYear: ''
            },
            launchpads: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLaunchPadChange = this.handleLaunchPadChange.bind(this);
        this.handleMinYearChange = this.handleMinYearChange.bind(this);
        this.handleMaxYearChange = this.handleMaxYearChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        const self = this;
        fetch('http://localhost:3001/launchpads', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            response.json().then(function(data) {
                self.setState({launchpads: data.data})
            });
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
    }

    handleChange = (event) => {
        let formData = {...this.state.formData};
        formData.value = event.target.value;
        this.setState({formData: formData});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.launchDataFilter(this.state.formData)
    }

    handleLaunchPadChange = (event) => {
        let formData = {...this.state.formData};
        formData.launchPad = event.target.value;
        this.setState({formData: formData});
    }

    handleMinYearChange = (event) => {
        let formData = {...this.state.formData};
        formData.minYear = event.target.value;
        this.setState({formData: formData});
    }

    handleMaxYearChange = (event) => {
        let formData = {...this.state.formData};
        formData.maxYear = event.target.value;
        this.setState({formData: formData});
    }

    render() {
        return (
            <div className='container'>
                <div className='launchsearch'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='launchsearch__wrapper'>
                            <div className='launchsearch__formitem one'>
                                <label htmlFor='keywords'>Keywords</label>
                                <input className='launchsearch__inputtext' id='keywords' type='text' placeholder='eg Falcon' onChange={this.handleChange} />
                            </div>
                            <div className='launchsearch__formitem two'>
                                <label htmlFor='launchpad'>Launch Pad</label>
                                <div className='custom-select'>
                                    <select id='launchpad' onChange={this.handleLaunchPadChange}>
                                        <option value=''>Any</option>
                                        {this.state.launchpads.map((x,i) => {
                                            return <option key={i} value={x.id}>{x.full_name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='launchsearch__formitem three'>
                                <label htmlFor='min-year'>Min Year</label>
                                <div className='custom-select'>
                                    <select id='min-year' onChange={this.handleMinYearChange}>
                                        <option value=''>Any</option>
                                        {this.props.dateOptions.map((x,i) => {
                                            return <option key={i} value={x}>{x}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='launchsearch__formitem three'>
                                <label htmlFor='max-year'>Max Year</label>
                                <div className='custom-select'>
                                    <select id='max-year' onChange={this.handleMaxYearChange}>
                                        <option value=''>Any</option>
                                        {this.props.dateOptions.map((x,i) => {
                                            return <option key={i} value={x}>{x}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='launchsearch__formitem display--flex four'>
                                <input className='launchsearch__inputsubmit' type="submit" value="Apply" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LaunchSearch;
