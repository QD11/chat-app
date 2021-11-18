import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import Team from './Team'
import {teamsSelectors} from '../../states/teamsSlice'


const TeamList = () => {
    const teamsInfo = useSelector(teamsSelectors.selectAll)
    
    return (
        <div>
            {teamsInfo.length !== 0 || teamsInfo ? teamsInfo.map(team => <Team key={team.id} team={team}/>) : null}
        </div>
    )
}

export default TeamList
