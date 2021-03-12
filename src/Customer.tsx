import React, { useState } from 'react'
import QUESTIONS from './servayData'
import './App.css'

export default function App() {
	const questions = QUESTIONS
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [showScore, setShowScore] = useState(false)
	const [total, setTotal] = useState<number>(0)
  const [answerGroup, setAnswerGroup] = useState<Array<string>>([])

	const handleAnswerOptionClick = (answerOption: { answerText?: string; isCorrect: boolean }) => {
		if (answerOption.isCorrect) {
			setTotal(total + 1);
		}
    if (answerOption.answerText) {
      const answer = answerOption.answerText
      setAnswerGroup((answerGroup:string[]) => [...answerGroup, answer])
    }
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

	return (
		<div className='customerWrapper'>
			{showScore ? (
				<div className='score-section'>
          <h3>You answered {total} out of {questions.length}</h3>
          <ul>
            {answerGroup.map((item, index) => {
              return <li key={index}>{item}</li>
            })}
          </ul>
				</div>
			) : (
				<>
					<div className='question-section'>
            <h2>Customer journey servay</h2>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption, index) => (
              
							<button key={index} 
              onClick={() => { handleAnswerOptionClick(answerOption)            
            }}
              >{answerOption.answerText}</button> 
						))}
					</div>
				</>
			)}
		</div>
	);
}