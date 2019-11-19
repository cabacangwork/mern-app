import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
  )

const ExercisesList = () => {

    const [exercises, setExercises] = useState(['']);

    useEffect(() => {
        axios.get('http://localhost:5000/exercises')
            .then(response => {
                setExercises(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    });

    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
            <tbody>
                { exerciseList() }
            </tbody>
            </table>
        </div>
    )

    function onDeleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(response => { console.log(response.data)});
    
        setExercises(exercises.filter(el => el._id !== id));
    }

    function exerciseList() {
        return exercises.map((currentexercise, index) => {
          return <Exercise exercise={currentexercise} deleteExercise={onDeleteExercise} key={index}/>;
        })
      }
    

}


export default ExercisesList