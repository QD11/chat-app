import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import Team from './Team'
import {teamsSelectors} from '../../states/teamsSlice'
import {messagesSelectors} from '../../states/messagesSlice'


const TeamList = () => {
    const teamsInfo = useSelector(teamsSelectors.selectAll)
    const messages = useSelector(messagesSelectors.selectAll)

    const lastMessages = []
    teamsInfo.forEach(team => {
        const messagesToTeam = messages.filter(message => message.team.id === team.id)
        lastMessages.push(messagesToTeam.at(-1))
    })

    const newLastMessages = lastMessages.sort(function(a, b) {
        return b.id - a.id
    });
    const teamInOrder = newLastMessages.map(message => message.team)
    
    const newTeamsInfo = []
    teamInOrder.forEach(team => {
        newTeamsInfo.push(teamsInfo.find(renderTeam => team.id === renderTeam.id))
    })

    return (
        <div>
            {teamsInfo.length !== 0 || teamsInfo ? newTeamsInfo.map(team => <Team key={team.id} team={team}/>) : null}
        </div>
    )
}

export default TeamList
