import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import Team from './Team'

const TeamList = () => {
    const teams = useSelector(state => state.teamsSlice)

    return (
        <div>
            {teams.map(team => <Team key={team.id} team={team}/>)}
        </div>
    )
}

export default TeamList
