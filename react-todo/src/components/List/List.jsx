import React from "react";
import classNames from 'classnames';
import axios from "axios";
import { NavLink } from 'react-router-dom';

import { Badge } from "../index"

import RemoveSVG from "../../assets/images/remove.svg"

import './List.scss'

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) =>  {

    console.log(items)

    const removeList = (item) => {
        if(window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id)
            })
        }
    }

    return (
        <ul onClick={onClick} className="list">
            {
                items.map((item, index) => (
                    if (item.name === 'Все задачи') {
                        return (
                            
                        )
                    }
                    <NavLink to={`/lists/${item.id}`}>
                        <li 
                            key={index} 
                            className={classNames(item.className, { active : item.active ? item.active : activeItem && activeItem.id === item.id })}
                            onClick={onClickItem ? () => onClickItem(item) : null}>
                            <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
                            <span>{item.name}{item.tasks && `(${item.tasks.length})`}</span>
                                {
                                    isRemovable 
                                    && 
                                    <div onClick={() => removeList(item)}>
                                        <img 
                                            className="list__remove-icon" 
                                            src={RemoveSVG} 
                                            alt="Remove icon"
                                        />
                                    </div>
                                }
                        </li>
                    </NavLink>
                ))
            }
        </ul>
    );
}

export default List;
