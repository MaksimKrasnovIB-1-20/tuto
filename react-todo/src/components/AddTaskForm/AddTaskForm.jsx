import React, {useState} from 'react'
import axios from 'axios'

import AddSVG from "../../assets/images/add.svg"

import "./AddTaskForm.scss"

const AddTaskForm = ({ list, onAddTask }) => {

    const [visibleForm, setVisibleForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState('')

    const toggleVisibleForm = () => {
        setVisibleForm(!visibleForm)
        setInputValue('')
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/tasks', obj).then(({ data }) =>  {
            onAddTask(list.id, data) 
            toggleVisibleForm()
        }).catch(() => {
            alert('Ошибка при добавлении задачи')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div className="tasks__form">
            {!visibleForm ? (<div onClick={toggleVisibleForm} className="tasks__form-new">
                                <img src={AddSVG} alt="Add icon" />
                                <span>Новая задача</span>
                            </div>
                            ) : (
                            <div className="tasks__form-block">
                                <input
                                    value={inputValue}
                                    className="field" 
                                    type="text" 
                                    placeholder="Текст задачи"
                                    onChange={e => setInputValue(e.target.value)}
                                />
                                <button 
                                    disabled={isLoading}
                                    onClick={addTask} 
                                    className="button">
                                        {isLoading ? 'Добавление...' : 'Добавить задачу'}
                                </button>
                                <button onClick={toggleVisibleForm} className="button button--grey">Отмена</button>
                            </div>)
            }
        </div>
    );
}

export default AddTaskForm;
