import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import Team from './Team'
import {teamsSelectors} from '../../states/teamsSlice'
import {messagesSelectors} from '../../states/messagesSlice'
import {membershipsSelectors} from '../../states/membershipsSlice'

const TeamList = () => {
    const teamsInfo = useSelector(teamsSelectors.selectAll)
    const messages = useSelector(messagesSelectors.selectAll)
    const memberships = useSelector(membershipsSelectors.selectAll)

    if (messages.length > 0 && teamsInfo.every(team => team) && memberships.every(team=>team)) {
        const lastMessages = []
        teamsInfo.forEach(team => {
            const messagesToTeam = messages.filter(message => message.team.id === team.id)
            lastMessages.push(messagesToTeam.at(-1))
        })

        const newLastMessages = lastMessages.sort(function(a, b) {
            return b.id - a.id
        });

        const teamInOrder = newLastMessages?.map(message => message?.team)
        
        const newTeamsInfo = []
        teamInOrder.forEach(team => {
            newTeamsInfo.push(teamsInfo.find(renderTeam => team.id === renderTeam.id))
        })

        return (
            <div>
                {(teamsInfo.length !== 0 || teamsInfo)  ? newTeamsInfo.map(team => <Team key={team.id} team={team} membership={memberships.find(membership => membership.team.id === team.id)}/>) : null}
            </div>
        )}
    else {
        return null
    }
}

export default TeamList
