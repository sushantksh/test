import React from 'react';
import * as moviesDetails from "../actions/moviesActions";
import {moviesData} from "../reducers/moviesReducer";
import {bindActionCreators} from 'redux';
import './movieDetails.css';
import {connect} from "react-redux";
import {Redirect,withRouter} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class MovieDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            title:"",
            trailer_link:"",
            release_date:"",
            movie_characters:"",
            see_it_in:"",
            genre:"",
            movie_length:"",
            minimum_age:3,
            description:"",
            image_url:""
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }

    componentWillMount(){
    }

    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            release_date: date
        });
    }

    addMovie(){
        this.props.addMovie(this.state);
    }


    render() {
        return (
            <div className="container-fluid">
                <h1 className="text-center">Add New Movie</h1>
                <form className="col-md-offset-3 col-md-6 add-movie-form" style={{marginBottom:'40px'}}>
                <input
                    className="form-control"
                    placeholder="Enter Movie Name"
                    type="text"
                    required
                    label=""
                    name="title"
                    onChange={this.onChange.bind(this)}
                />
                <input
                    className="form-control"
                    placeholder="Add Trailer Link"
                    type="url"
                    required
                    label=""
                    name="trailer_link"
                    onChange={this.onChange.bind(this)}
                />
                <input
                    className="form-control"
                    placeholder="Add Movie Characters seperated by comma"
                    type="text"
                    required
                    label=""
                    name="movie_characters"
                    onChange={this.onChange.bind(this)}
                />
                <div>
                    <h4 className="font-white">Release Date</h4>
                    <DatePicker  required
                                 selected={this.state.release_date}
                                 onChange={this.handleDateChange.bind(this)}
                    />
                </div>
                <input
                    className="form-control"
                    placeholder="Add Movie Length"
                    type="text"
                    required
                    label=""
                    name="movie_length"
                    onChange={this.onChange.bind(this)}
                />
                <input
                    className="form-control"
                    placeholder="See it in"
                    type="text"
                    required
                    label=""
                    name="see_it_in"
                    onChange={this.onChange.bind(this)}
                />
                <input
                    className="form-control"
                    placeholder="Add Genre"
                    type="text"
                    required
                    label=""
                    name="genre"
                    onChange={this.onChange.bind(this)}
                />
                <input
                    className="form-control"
                    placeholder="Add Minimum Age"
                    type="text"
                    required
                    label=""
                    name="minimum_age"
                    onChange={this.onChange.bind(this)}
                />
                    <input
                        className="form-control"
                        placeholder="Add Description"
                        type="text"
                        required
                        label=""
                        name="description"
                        onChange={this.onChange.bind(this)}
                    />
                    <input
                        className="form-control"
                        placeholder="Add Movie Image URL"
                        type="text"
                        required
                        label=""
                        name="image_url"
                        onChange={this.onChange.bind(this)}
                    />
                <button className="btn btn-warning mt20" onClick={this.addMovie.bind(this)}>Add Movie</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        moviesData : state.movies
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Object.assign({}, moviesDetails),dispatch)

}
export default connect(mapStateToProps,mapDispatchToProps)(MovieDetails);
//export default Landing;