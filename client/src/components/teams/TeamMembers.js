import React from 'react'
import {useSelector} from 'react-redux'
import {teamsSelectors} from '../../states/teamsSlice'
// import Avatar from 'react-avatar';
import {useParams} from 'react-router-dom'
import TeamMember from './TeamMember';

function TeamMembers({image, setImage}) {
    const {team_id} = useParams()
    const team = useSelector(teamsSelectors.selectAll).find(team => team.id === parseInt(team_id))
    
    // console.log(teams)
    return (
        <div className="team-members">
             <h3>Chat Members</h3>
             <ul>
                {team.memberships.map(member => <TeamMember member={member} image={image} setImage={setImage}/>)}
            </ul>
        </div>
    )
}

export default TeamMembers
{/* 
// {teams.map(team => team.memberships.map(member => member.user.name))} */}
