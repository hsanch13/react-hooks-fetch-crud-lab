import React, { useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ onQuestionDelete }) {

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(resp => resp.json())
      .then(questionsArray => {
        setQuestions(questionsArray)
      })
  }, [])

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul> 
        {questions.map(question => (
        <  QuestionItem 
              key={question.id}
              question={question}
              prompt={question.prompt} 
              answers={question.answers}
              onQuestionDelete={onQuestionDelete}
              questions={questions}
              setQuestions={setQuestions}/>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
