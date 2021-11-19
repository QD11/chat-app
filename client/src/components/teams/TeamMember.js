import React from 'react'
import Avatar from 'react-avatar';
import styled from 'styled-components'
import AvatarGroup from 'react-avatar-group'

function TeamMember({member, image}) {
    return (
        <MemberDiv >
            {/* <Avatar
            name={member.name} 
            size="50" 
            round={true}
            src={image}
            />
            <span>{member.name}</span> */}
            <AvatarGroup
                    avatars={[member.name]}
                    initialCharacters={1}
                    max={1}
                    size={60}
                    //displayAllOnHover
                    shadow={2}
                    />
                    <span>{member.name}</span> 
        </MemberDiv>
    )
}

const MemberDiv = styled.div`
    display:flex;
    align-items: center;
    font-size: 25px;
    margin-bottom: 10px;
    //box-shadow: 0 25px 45px rgba(0, 0, 0, 0.15);
`

export default TeamMember
