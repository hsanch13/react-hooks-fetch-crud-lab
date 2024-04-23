import React, {useState, useEffect} from "react";

function QuestionItem({ questions, setQuestions, onQuestionDelete, question }) {

  const { id, prompt, answers, correctIndex} = question;

  function handleChange(event){
    
    const { value } = event.target

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        correctIndex: parseInt(value)
      })
    })
  }

  function handleDeleteClick() {
    
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then(resp => resp.json())
    .then(() => {
      const updatedQsArray = questions.filter(question => question.id !== id)
      setQuestions(updatedQsArray)
    })
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;
