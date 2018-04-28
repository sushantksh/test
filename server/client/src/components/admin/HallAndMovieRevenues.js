import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";

import Moment from 'react-moment';
import moment from 'moment';

import {getRevenueByMovie,
        getRevenueByHall,
        getAllMovies,
        getAllMovieHalls} from "../../actions/revenueActions";

import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TheatersIcon from 'material-ui-icons/Theaters';
import MovieIcon from 'material-ui-icons/Movie';
import {
    Row,
    Col,
    Container,
    Card,
    CardHeader,
    CardBody,
    CardImg,
    CardTitle,
    CardSubtitle,
    CardText,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    FormText,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    Dropdown
} from 'reactstrap';
import './billDetails.css';

const menuProps = {
  desktop: true,
  disableAutoFocus: true,
};

const iconstyle = {
  width:25,
  height:25
};

/**
 * Provide props to be passed into the Menu component.
 */
class HallAndMovieRevenues extends Component {

  constructor() {
    super();
    this.state = {
      revenue: 0,
      value: '',
      mapping: {},
      dataSource: []
    };
    this.onNewRequest = this.onNewRequest.bind(this);
    this.renderHallRevenue = this.renderHallRevenue.bind(this);
    this.renderMovieRevenue = this.renderMovieRevenue.bind(this);
  }

  async componentDidMount() {
    await this.props.getAllMovies();
    await this.props.getAllMovieHalls();
    const nameToIdMapping = {};
    /*console.log("did mount props: " + JSON.stringify(this.props));*/
    this.props.revenue.movies.forEach(function(element) {
        nameToIdMapping[element.title] = [element.movieId, 'getRevenueByMovie'];
    });
    this.props.revenue.halls.forEach(function(element) {
        nameToIdMapping[element.hallName] = [element.hallId, 'getRevenueByHall'];
    });
    const dataSource = Object.keys(nameToIdMapping);
    this.setState({
      mapping: nameToIdMapping,
      dataSource: dataSource,
      flag: '',
      revenue: {}
    })
  }

  async onNewRequest(str, index) {
      console.log("name: " + str);
      console.log("index: " + index);
      if(this.state.mapping[str][1] === 'getRevenueByMovie') {
          await this.props.getRevenueByMovie(this.state.mapping[str][0])
          this.setState({
            flag: this.state.mapping[str][1],
            revenue: this.props.revenue.revenueByMovie
          });
      } else if(this.state.mapping[str][1] === 'getRevenueByHall') {
          await this.props.getRevenueByHall(this.state.mapping[str][0])
          this.setState({
            flag: this.state.mapping[str][1],
            revenue: this.props.revenue.revenueByHall
          });
      }
      console.log("revenue: " + JSON.stringify(this.props));
      console.log("flag: " + this.state.flag);
  }

  renderMovieRevenue() {
    /*console.log("redux" + JSON.stringify(this.props.revenue));*/
    if (this.state.flag === 'getRevenueByMovie') {
      if (Object.keys(this.props.revenue.revenueByMovie).length === 0) {
        return <h2>Data Not Found</h2>
      }
      return (
        <div className="row">
          <br/>
          <h2>MOVIE REVENUE</h2>
          <hr/><br/>
          <div className="col-md-6">
            <Card>
              <CardTitle className="cardtitle">MOVIE: {this.props.revenue.revenueByMovie.title}
                <CardSubtitle className="cardsubtitle"><MovieIcon style={{width:30,height:30}}/></CardSubtitle>
              </CardTitle>
              <CardText className="cardtext">TOTAL REVENUE: {' '}${this.props.revenue.revenueByMovie.totalRevenue}</CardText>
              <CardText className="cardtext">
                    RELEASE DATE: {' '}
                      <Moment format="YYYY/MM/DD">
                        {this.props.revenue.revenueByMovie.releaseDate}
                      </Moment>
              </CardText>
              <img width="25%" src={this.props.revenue.revenueByMovie.photosUrl} alt="Card image cap" />
              <CardText className="cardtext">*** Revenue is subject to change every hour</CardText>
            </Card>
          </div>
        </div>
      );
    }
    return (<div className="row"></div>);
  }

  renderHallRevenue() {
    if (this.state.flag === 'getRevenueByHall') {
      if (Object.keys(this.props.revenue.revenueByHall).length === 0) {
        return <h2>Data Not Found</h2>
      }
      return (
        <div className="row">
          <br/><hr/><br/>
          <div className="col-md-6">
            <Card>
              <CardTitle className="cardtitle">HALL: {this.props.revenue.revenueByHall.hallName}
                <CardSubtitle className="cardsubtitle"><TheatersIcon style={{width:30,height:30}}/></CardSubtitle>
              </CardTitle>
              <CardText className="cardtext">TOTAL REVENUE: {' '}${this.props.revenue.revenueByHall.totalRevenue}</CardText>
              <CardTitle className="cardtext">HALL LOCATION: {' '}</CardTitle>
              <CardText className="cardtext">
                  {this.props.revenue.revenueByHall.city},{' '}
                  {this.props.revenue.revenueByHall.state}{' '}
                  {this.props.revenue.revenueByHall.zipcode}
              </CardText>
              <img width="75%" src="/movieHall.jpg" alt="Card image cap" />
              <CardText className="cardtext">*** Revenue is subject to change every hour</CardText>
            </Card>
          </div>
        </div>
      );
    }
    return (<div className="row"></div>);
  }

  render() {
    /*console.log("state udpates: " + JSON.stringify(this.state.dataSource));
    console.log("state udpates mapping: " + JSON.stringify(this.state.mapping));*/
    return (
      <MuiThemeProvider>
        <div className='container-fluid'>
          <br/><br/>
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <h2><u>REVENUES MOVIES/HALLS</u></h2>
              <br/>
              <AutoComplete
                fullWidth
                hintText="Search on Halls/Movies"
                dataSource={this.state.dataSource}
                menuProps={menuProps}
                onNewRequest={this.onNewRequest}
              />
            </div>
            <div className="col-sm-1"></div>
          </div>
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              {this.renderMovieRevenue()}
              {this.renderHallRevenue()}
            </div>
            <div className="col-sm-1"></div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ revenue }) {
    return { revenue };
}

export default connect(mapStateToProps, {getRevenueByMovie,
                                         getAllMovies,
                                         getRevenueByHall,
                                         getAllMovieHalls})(withRouter(HallAndMovieRevenues));
