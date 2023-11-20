import React, {useState, useEffect} from 'react';
import Question from './Question';
import SearchBar from './SearchBar';
import axios from 'axios'
import {useSelector, useDispatch} from "react-redux";
import {storeActions} from "./Store/index";
import './Styles/QuesChart.css';

const BASE_URL = process.env.REACT_APP_BASE_URL

const getData = async() => {
    let res = await axios.get(`${BASE_URL}/api/v1/data/questions`, {
        headers: {
            Authorization: localStorage.getItem('chatToken')
        }
    })
    res = res.data
    for (let i of res) {
        i.valid = true
    }
    return res
}

function QuesChart() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.quesBank.data);
    const trigger = useSelector((state) => state.quesBank.trigger);
    useEffect(() => {
        (async() => {
            const val = await getData()
            dispatch(storeActions.setData({data: val}))
        })()
    }, [trigger])

	useEffect(() => {
		setFilteredData(data);
	  }, [data]);
	
    const [filteredData,
        setFilteredData] = useState(data)
    const onRemove = async(quesData) => {
        try {
			const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/data/delQues/${quesData._id}`, {
                headers: {
                    Authorization: localStorage.getItem('chatToken')
                }
            })
            if (res.data.success) {
                dispatch(storeActions.trigger())
            }
        } catch (error) {
            console.log(error)
        }
    }

    const searchData = (query) => {
        const filteredResults = [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i].question;
            let tag = data[i].tag;
            if (!tag) {
                tag = ''
            }
            if (item.toLowerCase().includes(query.toLowerCase()) || tag.toLowerCase().includes(query.toLowerCase())) {
                filteredResults.push(data[i]);
            }
        }
        setFilteredData(filteredResults)
    };

    return (
        <div className="ques-chart">
            <SearchBar searchData={searchData}/>
            <div className="questions-list">
                {filteredData.map((questionData, index) => (<Question key={index} questionData={questionData} onRemove={onRemove}/>))}
            </div>
        </div>
    );
}

export default QuesChart;
