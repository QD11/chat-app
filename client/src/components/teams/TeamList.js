import React, {useState, useEffect} from 'react'
import Team from './Team'

const TeamList = () => {
    const user_id = 1
    const [teams, setTeams] = useState([])

    useEffect(()=> {
        fetch(`http://localhost:3000/${user_id}/teams`)
        .then(resp => resp.json())
        .then((data) => setTeams(data))
    }, [])

    return (
        <div>
            {teams.map(team => <Team key={team.id} team={team}/>)}
        </div>
    )
}

export default TeamList
