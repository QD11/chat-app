import React from 'react'
import Avatar from 'react-avatar';

function TeamMember({member, image}) {
    return (
        <div className="team-member">
            <li>{member.name}</li>
            <Avatar 
            name={member.name} 
            size="50" 
            round={true}
            src={image}
            />
        </div>
    )
}

export default TeamMember
