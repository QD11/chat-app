import React from 'react'
import Avatar from 'react-avatar';

function TeamMember({member}) {
    return (
        <div>
            
                 
                
                 <li>{member.user.name}</li>
                 <Avatar name={member.user.name} size="50" round={true}/>
             
         
        </div>
    )
}

export default TeamMember
