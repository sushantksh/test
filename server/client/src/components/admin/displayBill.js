import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {getBill, updatePageClick} from "../../actions/adminActions";
import {BILLDETAILS} from '../../actions/pageClickEnums';
import {connect} from "react-redux";
import Moment from 'react-moment';
import moment from 'moment';
import './billDetails.css';

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

const showTimes = ['11:05 AM', '12:15 PM', '1:30 PM',
    '2:15 PM', '3:00 PM', '4:15 PM',
    '6:00 PM', '9:00 PM', '10:15 PM',
    '10:40 PM', '11:00 PM'];
const screen = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
class BillsInfo extends Component {

    constructor (props) {
        super(props)
        this.state = {
            billingId: this.props.match.params.billingId
        };
    }

    componentDidMount() {
        console.log("props info: " + JSON.stringify(this.props));
        this.props.updatePageClick(BILLDETAILS);
        this.props.getBill(this.state.billingId);
    }

    render() {
        return(
          <div className="container-fluid">
            <div className="row">
              <br/>
              <h1><u>PURCHASE DETAILS</u></h1>
              <br/><hr/>
              <div className="col-md-6">
                <Card>
                  <div className="row">
                    <div className="col-md-6">
                      <CardTitle className="cardtitle">{this.props.admin.data.billDetails.title}
                        <CardSubtitle className="cardsubtitle">({this.props.admin.data.billDetails.seeItIn})</CardSubtitle>
                      </CardTitle>
                      <CardSubtitle className="cardsubtitle">Movie Length {this.props.admin.data.billDetails.movieLengthInMin} min</CardSubtitle>
                      <img width="75%" src={this.props.admin.data.billDetails.photosUrl} alt="Card image cap" />
                    </div>
                    <div className="col-md-6">
                      <CardBody>
                        <br/><br/><br/>
                        <CardTitle className="cardtitle"><u>SHOW TIME</u></CardTitle>
                        <CardText className="cardtext">{moment().format('MMMM Do YYYY')}</CardText>
                        <CardText className="cardtext">{showTimes[Math.floor(Math.random() * showTimes.length)]}</CardText>
                        <CardText className="cardtext">SCREEN: {screen[Math.floor(Math.random() * screen.length)]}</CardText>
                        <CardText className="cardtext">PURCHASER: {this.props.admin.data.billDetails.firstName} {this.props.admin.data.billDetails.lastName}</CardText>
                      </CardBody>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="col-md-6">
                <Card>
                  <div className="row">
                    <div className="col-md-6">
                      <CardBody>
                        <br/><br/><br/>
                        <CardTitle className="cardtitle"><u>HALL LOCATION</u></CardTitle>
                        <CardText className="cardtext">{this.props.admin.data.billDetails.hallName}</CardText>
                        <CardText className="cardtext">{this.props.admin.data.billDetails.city}, CA</CardText>
                        <CardText className="cardtext">{this.props.admin.data.billDetails.zipcode}</CardText>
                      </CardBody>
                    </div>
                    <div className="col-md-6">
                      <br/><br/><br/>
                      <CardTitle className="cardtitle"><u>TICKET SUMMARY</u></CardTitle>
                      <Table>
                        <tbody>
                          <tr>
                            <td>
                              <CardText className="cardtext">{this.props.admin.data.billDetails.ticketCount} x People: </CardText>
                            </td>
                            <td>
                              <CardText className="cardtext">${this.props.admin.data.billDetails.totalAmount}</CardText>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <CardText className="cardtext">Convenience Fee:</CardText>
                            </td>
                            <td>
                              <CardText className="cardtext">$3.00</CardText>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <CardText className="cardtext">Fandango Code:</CardText>
                            </td>
                            <td>
                              <CardText className="cardtext">NA</CardText>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <CardText className="cardtext">TOTAL:</CardText>
                            </td>
                            <td>
                              <CardText className="cardtext">${this.props.admin.data.billDetails.totalAmount + 3.00}</CardText>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );
    }
}

function mapStateToProps({ admin }) {
    return { admin };
}

export default connect(mapStateToProps, { getBill, updatePageClick })(withRouter(BillsInfo));
