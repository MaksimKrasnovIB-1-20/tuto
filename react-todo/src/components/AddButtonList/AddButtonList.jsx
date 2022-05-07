import React, { useState, useEffect } from "react";
import axios from "axios";

import { List, Badge } from "../index";

import CloseSVG from "../../assets/images/close.svg";

import "./AddButtonList.scss";

const AddButtonList = ({ colors, onAddList }) => {
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, setSelectedColor] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [inputValue, setInputValue] = useState('')

// УЖАСНЫЙ КОД
    useEffect(() => {
        if(Array.isArray(colors)) {
            setSelectedColor(colors[0].id) 
        }
    }, [colors])
// УЖАСНЫЙ КОД

    const onClose = () => {
        setVisiblePopup(false)
        setInputValue('')
        setSelectedColor(colors[0].id)
    }

    const addList = () => {
        if(!inputValue) {
            alert('Введите название списка')
            return
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/lists/', { name: inputValue, colorId: selectedColor }).then(({ data }) => {
            const color = colors.filter(c => c.id === colors)[0]
            const listObj = {...data, color, tasks: []}
            onAddList(listObj)
            onClose()
        }).catch(() => {
            alert('Ошибка при добавлении списка')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div className="add-list">
            <List
                onClick={() => setVisiblePopup(!visiblePopup)}
                items={[
                    {
                        className: 'list__add-button',
                        icon: 
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>,
                        name: 'Добавить список',
                    } 
                ]}
            />
            {visiblePopup && <div className="add-list__popup">
                <img
                    onClick={onClose}
                    src={CloseSVG} 
                    alt="Close Button" 
                    className="add-list__popup-close"
                />
                <input 
                    value={inputValue}
                    onChange={e => {setInputValue(e.target.value)}}
                    className="field" 
                    type="text" 
                    placeholder="Название списка" 
                /> 
                <div className="add-list__popup-colors">
                    {
                        colors.map(color => 
                        <Badge 
                            onClick={() => setSelectedColor(color.id)} 
                            key={color.id} 
                            color={color.name} 
                            className={selectedColor === color.id && 'active'}
                        />)
                    }
                </div>
                <button 
                    onClick={addList} 
                    className="button">{isLoading ? 'Добавление...' : 'Добавить'}
                </button>
            </div>}
        </div>
    )
}

export default AddButtonList;
