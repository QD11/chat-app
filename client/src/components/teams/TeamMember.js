import React from 'react'
import Avatar from 'react-avatar';

function TeamMember({member}) {
    return (
        <div>
            <li>{member.name}</li>
            <Avatar name={member.name} size="50" round={true}/>
        </div>
    )
}

export default TeamMember
