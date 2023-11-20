import React from 'react';
import './Styles/Question.css'; // Import the CSS file

function Question({ questionData, onRemove }) {
  const { question,tag } = questionData;
  const options= questionData.options
  return (
    <div className="question-card">
      <div className="question-details">
        <div className="field">
          <label>Question : </label>
          <span>{question}</span>
        </div>
        <ul>
            {options.map((option, index) => (
              option && <li key={index}>{option}</li>
            ))}
          </ul>

        <div className="field">
          <label>Answer : {questionData.answer}</label>
        </div>
        <div className="field tag">
          <label>Tag :{tag} </label>
        </div>
      </div>
      <button className="remove-button" onClick={() => onRemove(questionData)}>
        Remove
      </button>
    </div>
  );
}

export default Question;
