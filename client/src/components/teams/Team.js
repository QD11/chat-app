import React from 'react'
import styled from 'styled-components'

const Team = ({team}) => {

    console.log(team)

    return (
        <DivTeam>
            <span>{team.name}</span>
            <span>{team.memberships.map(member => member.user.name)}</span>
            <span>{team.latest_message.content.length < 8 ? team.latest_message.content : team.latest_message.content.substring(0,8) + "..."}</span>
        </DivTeam>
    )
}

const DivTeam = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    // box-shadow: 1px 1px 5px 3px rgb(132 133 132 / 40%);
    // background-color: white;
    margin-bottom: 20px;
    border-radius: 10px;
`

export default Team
