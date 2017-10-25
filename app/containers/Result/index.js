import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator } from 'react-material-ui-form-validator';

import { loadResult } from './actions';
import { prepareSelector } from 'shared/functions';
import { endpoint } from 'shared/constants';

export class ResultPage extends React.PureComponent {
    state = {
        contactList: [],
        newContact: {
            name: '',
            phoneNumber: '',
            email: ''
        },
        isEdit: false,
        searchQuery: '',
        showList: []
    };

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    onChangeNewContactName = (event, newValue) => {
        let oldContact = this.state.newContact;
        this.setState({
            newContact: {
                name: newValue,
                phoneNumber: oldContact.phoneNumber,
                email: oldContact.email
            }
        });
    };

    onChangeNewContactPhoneNumber = (event, newValue) => {
        let oldContact = this.state.newContact;
        this.setState({
            newContact: {
                name: oldContact.name,
                phoneNumber: newValue,
                email: oldContact.email
            }
        });
    };

    onChangeNewContactEmail = (event, newValue) => {
        let oldContact = this.state.newContact;
        this.setState({
            newContact: {
                name: oldContact.name,
                phoneNumber: oldContact.phoneNumber,
                email: newValue
            }
        });
    };

    addNewContact = () => {
        let contacts = this.state.contactList;

        if (this.state.newContact.name) {
            contacts.push(this.state.newContact);
            this.setState({
                contactList: contacts,
                showList: contacts,
                newContact: {
                    name: '',
                    phoneNumber: '',
                    email: ''
                }
            });
        }
    };

    cancelAddNew = () => {
    };

    onEditContact = (event, contact, index) => {
        console.log('onEditContact = ', contact, index);
    };

    onDeleteContact = (event, contact, delIndex) => {
        let contacts = [];

        this.state.contactList.map(function (contact, index) {
            if (index !== delIndex) {
                contacts.push(contact);
            }
        });

        this.setState({
            contactList: contacts,
            showList: contacts
        });
    };

    searchContacts = (event, query) => {
        let results = [];

        let isNameQuery = !(/\d/.test(query)); // check whether query is name or phoneNumber
        this.state.contactList.map(function (contact) {
            if (isNameQuery) {
                if (contact.name.toLowerCase().indexOf(query) !== -1) {
                    results.push(contact);
                }
            } else {
                if (contact.phoneNumber.indexOf(query) !== -1) {
                    results.push(contact);
                }
            }
        });

        this.setState({
            searchQuery: query,
            showList: results
        });
    };

    loadMenuItem = (contact, index) => {
        const iconButtonElement = (
            <IconButton
                touch={true}
                tooltip="more"
                tooltipPosition="bottom-left"
            >
                <MoreVertIcon color={grey400}/>
            </IconButton>
        );

        return (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onClick={(event) => this.onEditContact(event, contact, index)}>Edit</MenuItem>
                <MenuItem onClick={(event) => this.onDeleteContact(event, contact, index)}>Remove</MenuItem>
            </IconMenu>
        );
    };

    loadContactList = () => {
        let contacts = [];

        if (this.state.showList.length) {
            this.state.showList.map(function (contact, index) {
                contacts.push(
                    <div key={index}>
                        <ListItem
                            leftAvatar={<Avatar src="assets/images/avatar.png"/>}
                            rightIconButton={this.loadMenuItem(contact, index)}
                            primaryText={contact.name}
                            secondaryText={
                                <p>
                                    <span style={{color: darkBlack}}>E-mail : {contact.email}</span><br/>
                                    <span style={{color: darkBlack}}>Phone Number : {contact.phoneNumber}</span>
                                </p>
                            }
                            secondaryTextLines={2}
                        />
                        <Divider inset={true}/>
                    </div>
                );
            }.bind(this));
            return contacts;
        }
    };

    render() {
        const textFieldStyle = {
            fontSize: '20px',
            margin: '0 20px',
            width: '28%'
        };

        const paperStyle = {
            padding: '25px 40px',
            margin: '10px 0'
        };
        const {newContact, searchQuery} = this.state;
        return (
            <div className="view-container">
                <div className="result-view">
                    <div>
                        <p className="module-title"
                           style={{fontSize: '34px'}}></p>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="">
                            <Paper style={paperStyle}>
                                <p className="title">New Contact</p>
                                <div className="metric-content-container">
                                    <ValidatorForm
                                        ref="form"
                                        onSubmit={this.addNewContact}
                                    >
                                        <div className="row">
                                            <TextValidator
                                                floatingLabelText="Name"
                                                onChange={this.onChangeNewContactName}
                                                name="name"
                                                value={newContact.name}
                                                validators={['required']}
                                                style={textFieldStyle}
                                                maxLength="100"
                                                errorMessages={['this field is required']}
                                            />
                                            <TextValidator
                                                floatingLabelText="E-mail address"
                                                onChange={this.onChangeNewContactEmail}
                                                name="email"
                                                style={textFieldStyle}
                                                value={newContact.email}
                                                validators={['required', 'isEmail']}
                                                errorMessages={['this field is required', 'email is not valid']}
                                            />
                                            <TextValidator
                                                floatingLabelText="Phone Number: xxx-xxx-xxxx"
                                                onChange={this.onChangeNewContactPhoneNumber}
                                                name="phone"
                                                style={textFieldStyle}
                                                value={newContact.phoneNumber}
                                                validators={['required', 'matchRegexp:^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$']}
                                                errorMessages={['this field is required', 'phone number is not valid']}
                                            />
                                        </div>
                                        <div className="row action-container">
                                            <RaisedButton className="btn-add" type="submit" label="Add" primary={true}/>
                                            <RaisedButton className="btn-cancel" label="Cancel" primary={true}
                                                          onClick={this.cancelAddNew}/>
                                        </div>
                                    </ValidatorForm>
                                </div>
                            </Paper>
                        </div>

                        <div className="">
                            <Paper style={paperStyle}>
                                <TextField
                                    hintText="Search Contacts"
                                    floatingLabelText="search query"
                                    style={{width: '100%'}}
                                    value={searchQuery}
                                    onChange={(event, query) => this.searchContacts(event, query)}
                                />
                            </Paper>
                        </div>

                        <div className="">
                            <Paper style={paperStyle}>
                                <List>
                                    <Subheader>My Contacts</Subheader>
                                    {
                                        this.loadContactList()
                                    }
                                </List>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ResultPage.propTypes = {
  loading: React.PropTypes.bool,
  dispatchLoadResult: React.PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  // API
  dispatchLoadResult: (sessionId) => dispatch(loadResult(sessionId))
});

const prepareResultSelector = value => prepareSelector('result', value);
const mapStateToProps = createStructuredSelector({
  result: prepareResultSelector('result'),
  loading: prepareResultSelector('loading'),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
