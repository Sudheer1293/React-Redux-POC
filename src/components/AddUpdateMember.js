import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect,Link } from 'react-router-dom';
import { createMember, updateMember } from '../store/actions/memberActions';
import moment from 'moment';

const formValid = (errors, details) => {
    let valid = true;
    Object.values(errors).forEach(val => {
        val.length > 0 && (valid = false)
    });

    Object.values(details).forEach(val => {
        val.length === 0 && (valid = false)
    });

    return valid;
}

const nameRegex = /^[a-zA-Z ]+$/;

class AddMember extends Component {
    state = {
        firstName: '',
        lastName: '',
        relationship: '',
        dob: '',
        gender: '',
        address: '',
        city: [
            { value: 'AP', cities: [
                { value: '', display: 'Please select a city'},
                { value: 'Vizag',display: 'Vizag'}, 
                { value: 'Rajahmundry', display: 'Rajahmundry'}, 
                { value: 'Vijayawada', display: 'Vijayawada'}
                ]
            },
            { value: 'TN', cities: [
                { value: '', display: 'Please select a city'},
                { value: 'Chennai', display: 'Chennai'},
                { value: 'Madurai', display: 'Madurai'},
                { value: 'Coimbatore', display: 'Coimbatore'}
                ]
            }
        ],
        cityBasedOnState: [],
        selectedCity: '',
        state: [
            { value: '', display: 'Please select state' },
            { value: 'AP', display: 'Andhra Pradesh' },
            { value: 'TN', display: 'Tamil Nadu' }
        ],
        selectedState: '',
        zipCode: '',
        phoneNumber: '',
        emailId: '',
        coverageType: [{ value: '', display: 'Please select coverage type' }, {value: 'Individual', display: 'Individual'}, { value: 'Group', display: 'Group'}],
        selectedCoverageType: '',
        client: [{ value: '', display: 'Please select client' }, {value: 'Client-1', display: 'Client-1'}, {value: 'Client-2', display: 'Client-2'}, {value: 'Client-3', display: 'Client-3'}],
        selectedClient: '',
        benefit:  [{ value: '', display: 'Please select benefit' }, {value: 'Benefit-1', display: 'Benefit-1'}, {value: 'Benefit-2', display: 'Benefit-2'}, {value: 'Benefit-3', display: 'Benefit-3'}],
        selectedBenefit: '',
        effectiveDate: '',
        termDate: '',
        formValid: false,
        formErrors: {
            firstName: '',
            lastName: '',
            relationship: '',
            dob: '',
            gender: '',
            address: '',
            selectedCity: '',
            selectedState: '',
            zipCode: '',
            phoneNumber: '',
            emailId: '',
            selectedCoverageType: '',
            selectedClient: '',
            selectedBenefit: '',
            effectiveDate: '',
            termDate: ''
        }
    }

    componentDidMount() {
        console.log(this.props.currentUser);
        const { id } = this.props.match.params;
        if( id !== undefined ) {
            const memberTobeEdited = this.props.members.filter(member => member.id === id);
            this.setState({ firstName: memberTobeEdited[0].firstName});
            this.setState({ lastName: memberTobeEdited[0].lastName});
            this.setState({ relationship: memberTobeEdited[0].relationship});
            this.setState({ dob: memberTobeEdited[0].dob});
            this.setState({ gender: memberTobeEdited[0].gender});
            this.setState({ address: memberTobeEdited[0].address});
            
            this.setState({ selectedState: memberTobeEdited[0].selectedState});
            this.setState({ zipCode: memberTobeEdited[0].zipCode});
            this.setState({ phoneNumber: memberTobeEdited[0].phoneNumber});
            this.setState({ emailId: memberTobeEdited[0].emailId});
            this.setState({ selectedCoverageType: memberTobeEdited[0].selectedCoverageType});
            this.setState({ selectedClient: memberTobeEdited[0].selectedClient});
            this.setState({ selectedBenefit: memberTobeEdited[0].selectedBenefit});
            this.setState({ effectiveDate: memberTobeEdited[0].effectiveDate});
            this.setState({ termDate: memberTobeEdited[0].termDate});

            const cities = this.state.city.filter((c) => c.value === memberTobeEdited[0].selectedState);
            this.setState({ cityBasedOnState: cities.length > 0? cities[0].cities : [] });
            this.setState({ selectedCity: memberTobeEdited[0].selectedCity});
            // this.setState
        }
    }

    handleChange = (e) => {
        const { id, value } = e.target;

        if(id === 'selectedState') {
            const cities = this.state.city.filter((c) => c.value === value);
            this.setState({ cityBasedOnState: cities.length > 0? cities[0].cities : [] });
        }
        
        let formErrors = this.state.formErrors;
        if(value.length === 0 || value === "") {
            formErrors[id] = "This field is required.";
        } else {
            formErrors[id] = "";
        }

        switch(id) {
            case "firstName":
            case "lastName":
                const error = nameRegex.test(value) ? "" : "Name should contain only alphabets and space.";
                formErrors[id] = error;
                break;
            case "emailId":
                formErrors[id] = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value) ? "" : "Email address is invalid.";
                break;
            case "phoneNumber":
                console.log(/^[0-9]{10}$/.test(value))
                formErrors[id] = (/^[0-9]{10}$/).test(value) ? "" : "Contact number should contain 10 digits.";
                break;
            case "effectiveDate":
                // console.log(moment(value).format("L"));
                console.log(new Date())
                break;
            default:
                break;
        }
        this.setState({ formErrors, [id]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let res;
        const requiredFields = Object.keys(this.state).filter(s => !(['city', 'cityBasedOnState', 'state', 'coverageType', 'benefit', 'client', 'formErrors' ].includes(s)));
        let memberDetails = {};
        for( let field of requiredFields) {
            memberDetails[field] = this.state[field];
        }
        const { id } = this.props.match.params;
        const currentUser = this.props.currentUser.email;
        console.log(currentUser);
        if(formValid(this.state.formErrors, memberDetails) && id == undefined) {
            this.props.createNewMember({ ...memberDetails, currentUser });
        } else if (formValid(this.state.formErrors, memberDetails) && id!= undefined) {
            this.props.updateMember({...memberDetails, id});
        }
    }

    render() {
        const redirectToHome = this.props.memberCreated || this.props.memberUpdated;
        if(redirectToHome) {
            console.log(redirectToHome)
            return (<Redirect to="/home" />);
        }
        return (


            <div className="container" style={{ paddingTop: '20px'}}>
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="input-field col s6">
                        <div className="col-4" style={{display: 'inline-block'}}>
                            <label htmlFor="firstName" >First Name</label>
                            <input id="firstName" name="firstName" type="text" className="validate" value={this.state.firstName} onChange={this.handleChange} />                      
                            <span style={{ color: 'red'}}>{this.state.formErrors.firstName}</span>
                        </div>

                        <div className="col-4" style={{display: 'inline-block'}}>
                            <label htmlFor="lastName" >Last Name</label>
                            <input id="lastName" name="lastName" type="text" className="validate" value={this.state.lastName} onChange={this.handleChange} />
                            <span style={{ color: 'red'}}>{this.state.formErrors.lastName}</span>                       
                        </div>
                        <div className="col-4" style={{display: 'inline-block'}}>
                            <label htmlFor="relationship">Relationship</label>
                            <input id="relationship" name="relationship" type="text" className="validate" value={this.state.relationship} onChange={this.handleChange} />               
                            <span style={{ color: 'red'}}>{this.state.formErrors.relationship}</span>
                        </div>
                    </div>

                    <div className="input-field col s6">
                        <div className="col-4" style={{display: 'inline-block'}}>
                            <label htmlFor="dob">Date of Birth</label>
                            <input id="dob" name="dob" type="date" max={moment().format('YYYY-MM-DD')} className="validate" value={this.state.dob} onChange={this.handleChange} /> 
                            <span style={{ color: 'red'}}>{this.state.formErrors.dob}</span>                     
                        </div>

                        <div className="col-4" style={{display: 'inline-block'}}>
                            <label htmlFor="gender">Gender</label>
                            <input id="gender" name="gender" type="text" className="validate" value={this.state.gender} onChange={this.handleChange} />  
                            <span style={{ color: 'red'}}>{this.state.formErrors.gender}</span>                     
                        </div>
                        <div className="col-4" style={{display: 'inline-block'}}>
                            <label htmlFor="address">Member Address</label>
                            <input id="address" name="address" type="text" className="validate" value={this.state.address} onChange={this.handleChange} /> 
                            <span style={{ color: 'red'}}>{this.state.formErrors.address}</span>              
                        </div>
                    </div>

                    <div className="input-field col s6">
                        <div className="col-4" style={{display: 'inline-block'}}>
                            <label htmlFor="selectedCity">City</label>
                            <select style={{ display: 'inline-block'}} id="selectedCity" name="selectedCity" value={this.state.selectedCity} className="validate" onChange={this.handleChange} >
                                { this.state.cityBasedOnState.map((c) => <option key={c.value} value={c.value}>{c.display}</option> )}
                            </select>
                            <span style={{ color: 'red'}}>{this.state.formErrors.selectedCity}</span>                      
                        </div>

                        <div className="col-4" style={{display: 'inline-block'}}>
                            <label htmlFor="selectedState">State</label>
                            <select style={{ display: 'inline-block'}} id="selectedState" name="selectedState" value={this.state.selectedState} className="validate" onChange={this.handleChange} >
                                {this.state.state.map((s) => <option key={s.value} value={s.value}>{s.display}</option>)}
                            </select>
                            <span style={{ color: 'red'}}>{this.state.formErrors.selectedState}</span>                       
                        </div>
                        <div className="col-4" style={{display: 'inline-block'}}>
                            <label htmlFor="zipCode">Zip Code</label>
                            <input id="zipCode" name="zipCode" type="text" className="validate" value={this.state.zipCode} onChange={this.handleChange} /> 
                            <span style={{ color: 'red'}}>{this.state.formErrors.zipCode}</span>              
                        </div>
                    </div>

                    <div className="input-field col s6">
                        <div className="col-4" style={{display: 'inline-block'}}>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input id="phoneNumber" name="phoneNumber" type="text" className="validate" value={this.state.phoneNumber} onChange={this.handleChange} />                      
                            <span style={{ color: 'red'}}>{this.state.formErrors.phoneNumber}</span>
                        </div>

                        <div className="col-4" style={{display: 'inline-block'}}>
                            <label htmlFor="emailId">Email Id</label>
                            <input id="emailId" name="emailId" type="text" className="validate" value={this.state.emailId} onChange={this.handleChange} />  
                            <span style={{ color: 'red'}}>{this.state.formErrors.emailId}</span>                     
                        </div>
                        <div className="col-4" style={{display: 'inline-block'}}>
                            <label htmlFor="selectedCoverageType">Coverage Type</label>
                            <select style={{ display: 'inline-block'}} id="selectedCoverageType" value={this.state.selectedCoverageType} name="selectedCoverageType" className="validate" onChange={this.handleChange} >
                                { this.state.coverageType.map((c) => <option key={c.value} value={c.value}>{c.display}</option> )}
                            </select>
                            <span style={{ color: 'red'}}>{this.state.formErrors.selectedCoverageType}</span>
                        </div>
                    </div>

                    <div className="input-field col s6">
                        <div className="col-6" style={{display: 'inline-block'}}>
                            <label htmlFor="selectedClient">Client</label>
                            <select style={{ display: 'inline-block'}} id="selectedClient" value={this.state.selectedClient} name="selectedClient" className="validate" onChange={this.handleChange} >
                                { this.state.client.map((c) => <option key={c.value} value={c.value}>{c.display}</option> )}
                            </select> 
                            <span style={{ color: 'red'}}>{this.state.formErrors.selectedClient}</span>                    
                        </div>

                        <div className="col-6" style={{display: 'inline-block'}}>
                            <label htmlFor="selectedBenefit">Benefit</label>
                            {/* <input id="benefit" name="benefit" type="text" className="validate" value={this.state.benefit} onChange={this.handleChange} />  */}
                            <select style={{ display: 'inline-block'}} id="selectedBenefit" value={this.state.selectedBenefit} name="selectedBenefit" className="validate" onChange={this.handleChange} >
                                { this.state.benefit.map((c) => <option key={c.value} value={c.value}>{c.display}</option> )}
                            </select> 
                            <span style={{ color: 'red'}}>{this.state.formErrors.selectedBenefit}</span>                      
                        </div>
                    </div>

                    <div className="input-field col s6">
                        <div className="col-6" style={{display: 'inline-block'}}>
                            <label htmlFor="effectiveDate">Effective Date</label>
                            <input id="effectiveDate" name="effectiveDate" max={moment().format('YYYY-MM-DD')} type="date" className="validate" value={this.state.effectiveDate} onChange={this.handleChange} />                      
                            <span style={{ color: 'red'}}>{this.state.formErrors.effectiveDate}</span>
                        </div>

                        <div className="col-6" style={{display: 'inline-block'}}>
                            <label htmlFor="termDate">Term Date</label>
                            <input id="termDate" name="termDate" max={moment().format('YYYY-MM-DD')} type="date" className="validate" value={this.state.termDate} onChange={this.handleChange} />  
                            <span style={{ color: 'red'}}>{this.state.formErrors.termDate}</span>                     
                        </div>
                    </div>
                    <div style={{ textAlign: 'center'}}>
                        <button type="submit" disabled={this.validate} className="btn btn-primary">{this.props.match.params.id ? 'Update Member' : 'Create Member' }</button>
                        <Link to="/home" style={{ marginLeft: '5px' }}className="btn btn-primary">Cancel</Link>
                    </div>
                    
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    const { memberCreated, members, memberUpdated } = state.member;
    const { currentUser } = state.auth;
    return { memberCreated, members, memberUpdated, currentUser };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNewMember: (member) => dispatch(createMember(member)),
        updateMember: (member) => dispatch(updateMember(member))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddMember);