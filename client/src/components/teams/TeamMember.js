import React from 'react'
import Avatar from 'react-avatar';

function TeamMember({member, image}) {
    return (
        <div>
                 <li>{member.user.name}</li>
                 <Avatar 
                 name={member.user.name} 
                 size="50" 
                 round={true}
                 src={image}
                 />
        </div>
    )
}

export default TeamMember
