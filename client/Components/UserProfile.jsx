import React, { useEffect } from 'react';
import { useState } from 'react';
import {connect} from 'react-redux'
import PetCard from './PetCard';
import './scssStyles/petCard.scss';

const mapStateToProps = state => (
    {
        username: state.user.username,
        userId: state.user.userId,
    }
  ); 

function UserProfile(props) {
    const [petInfo, setPets] = useState([])
    console.log(props)
    useEffect(() => {
        const fetchPets = async () =>{
            fetch(`api/pets/${props.userId}`)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                setPets(data)
                return data
            })
            .catch((err) => console.log(err))
        }
        fetchPets();
        //setPets()
    }, [])

    

    return (
        <div id="container">
            <p id="greeting">{props.username}'s Profile</p>
            <div id="cardContainer">
            {
                petInfo.map(pet => {
                    return <PetCard petInfo={pet}/>
                })
            }
            </div>
        </div>
        
    )
}

export default connect(mapStateToProps)(UserProfile)