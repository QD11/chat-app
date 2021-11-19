import React from 'react'
import {useSelector} from 'react-redux'
import {teamsSelectors} from '../../states/teamsSlice'

import {useParams} from 'react-router-dom'
import TeamMember from './TeamMember';

function TeamMembers({image, setImage}) {
    const {team_id} = useParams()
    const team = useSelector(teamsSelectors.selectAll).find(team => team.id === parseInt(team_id))
    console.log(team)

    return (
        <div className="team-members">
            <h2>{team.name}</h2>
            {team.users.map(member => <TeamMember member={member} image={image} setImage={setImage} key={member.id}/>)}
        </div>
    )
}

export default TeamMembers
{/* 
// {teams.map(team => team.memberships.map(member => member.user.name))} */}
