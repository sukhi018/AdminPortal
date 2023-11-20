import React, {useState} from 'react';
import './Styles/AddQues.css'
import {useDispatch} from "react-redux";
import {storeActions} from "./Store/index";
import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL

function AddQues() {
    const dispatch = useDispatch();

    const [jsonFile,
        setJsonFile] = useState(null);

    const [newQuestion,
        setNewQuestion] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        tag: '',
        answer: ''
    });

    const handleJsonFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.name.endsWith('.json')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const content = JSON.parse(e.target.result);
                    setJsonFile(content);
                };
                reader.readAsText(file);
            } else {
                alert('Please upload a JSON file.');
            }
        }
    };

    const handleAddJson = async() => {
        try
        {
            for (let i of jsonFile) {
                if (i.question && i.answer && i.tag && i.options) {
                    let reqData = {
                        question: i.question,
                        correctAnswer: i.answer,
                        category: i.tag,
                        options: i.options
                    }
                    let res = await axios.post(`${BASE_URL}/api/v1/data/addQues`, reqData, {
                        headers: {
                            Authorization: localStorage.getItem('chatToken')
                        }
                    })

                }

            }
            setJsonFile(null)
            dispatch(storeActions.trigger())
        } catch (err) {
            console.log(err)
        }

    };

    const handleAddQuestion = async() => {
        try
        {
            if (newQuestion.question && newQuestion.answer && newQuestion.tag && newQuestion.option1 && newQuestion.option2 && newQuestion.option3 && newQuestion.option4) {
                let reqData = {
                    question: newQuestion.question,
                    correctAnswer: newQuestion.answer,
                    category: newQuestion.tag,
                    options: [newQuestion.option1, newQuestion.option2, newQuestion.option3, newQuestion.option4]
                }
                let res = await axios.post(`${BASE_URL}/api/v1/data/addQues`, reqData, {
                    headers: {
                        Authorization: localStorage.getItem('chatToken')
                    }
                })

                setNewQuestion({
                    question: '',
                    option1: '',
                    option2: '',
                    option3: '',
                    option4: '',
                    tag: '',
                    answer: ''
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='main-div'>
            <div className="container">
                <h2>Add Questions :
                </h2>
                <label className="upload-label">
                    Upload JSON
                    <input
                        className='upload-input'
                        type="file"
                        accept=".json"
                        onChange={handleJsonFileUpload}/>
                </label>

                {jsonFile && (
                    <div>
                        <div className='content'>
                            <h3>JSON File Contents :
                            </h3>
                            <pre>{JSON.stringify(jsonFile, null, 2)}</pre>
                        </div>
                        <button onClick={handleAddJson}>Add to database</button>
                    </div>
                )}

                <div className="question-inputs">
                    <h2>Add a Question :</h2>
                    <input
                        type="text"
                        placeholder="Question"
                        value={newQuestion.question}
                        onChange={(e) => setNewQuestion({
                        ...newQuestion,
                        question: e.target.value
                    })}/>
                    <input
                        type="text"
                        placeholder="Option 1"
                        value={newQuestion.option1}
                        onChange={(e) => setNewQuestion({
                        ...newQuestion,
                        option1: e.target.value
                    })}/>
                    <input
                        type="text"
                        placeholder="Option 2"
                        value={newQuestion.option2}
                        onChange={(e) => setNewQuestion({
                        ...newQuestion,
                        option2: e.target.value
                    })}/>
                    <input
                        type="text"
                        placeholder="Option 3"
                        value={newQuestion.option3}
                        onChange={(e) => setNewQuestion({
                        ...newQuestion,
                        option3: e.target.value
                    })}/>
                    <input
                        type="text"
                        placeholder="Option 4"
                        value={newQuestion.option4}
                        onChange={(e) => setNewQuestion({
                        ...newQuestion,
                        option4: e.target.value
                    })}/>
                    <input
                        type="text"
                        placeholder="Tag"
                        value={newQuestion.tag}
                        onChange={(e) => setNewQuestion({
                        ...newQuestion,
                        tag: e.target.value
                    })}/>
                    <input
                        type="text"
                        placeholder="Answer"
                        value={newQuestion.answer}
                        onChange={(e) => setNewQuestion({
                        ...newQuestion,
                        answer: e.target.value
                    })}/>
                    <button onClick={handleAddQuestion}>Add Question</button>
                </div>
            </div>
        </div>
    );
}

export default AddQues;