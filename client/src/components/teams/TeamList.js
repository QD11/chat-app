import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import Team from './Team'
import {teamsSelectors} from '../../states/teamsSlice'


const TeamList = () => {
    const teams = useSelector(teamsSelectors.selectAll)
    
    return (
        <div>
            {teams.map(team => <Team key={team.id} team={team}/>)}
        </div>
    )
}

export default TeamList
