import React, { userState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMembersData } from '../store/actions/memberActions';

import Header from './Header';

const MembersDataTable = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMembersData())
        console.log(getMembersData)
    }, []);
    const members = useSelector(state => state.member.members);
    const loggedInUser = useSelector(state => state.auth);
    const newMembers = members.filter(member => {
        return member.currentUser === loggedInUser.currentUser.email
    });
        return (
            <div className="container">
            <Header />
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {newMembers.map(member => {
                        return (
                            <tr key={member.id}>
                                <td><Link to={`/edit-member/${member.id}`}>{member.id}</Link></td>
                                <td>{member.firstName}</td>
                                <td>{member.lastName}</td>
                                {/* <td><i className="small material-icons" onClick={() => this.editMember(user.id)}>edit</i></td> */}
                            </tr>
                        )
                    })}     
                </tbody>
            </table>
            </div>
        );
}
// const mapStateToProps = (state) => {
//     console.log(state)
//     const { members, memberUpdated } = state.member;
//     return { membersData : members };
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getMembersData: () => dispatch(getMembersData()),
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MemberDataTable);
export default MembersDataTable;