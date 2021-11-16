import React, {useState, useEffect} from 'react'

const TeamList = () => {
    const user_id = 1

    useEffect(()=> {
        fetch("http://localhost:3000/teams")
        .then(resp => resp.json())
        .then((data) => setTeams(data))
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default TeamList
