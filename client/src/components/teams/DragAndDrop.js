import React, {useState} from 'react';
import './draganddrop.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";

const item = {
    id: v4(),
    name: "Clean the house"
}

const item2 = {
    id: v4(),
    name: "Wash the car"
}

const DragAndDrop = ({state, setState}) => {
    // const [text, setText] = useState("")
    // // const [state, setState] = useState({
    // //     "todo": {
    // //     title: "Todo",
    // //     items: users
    // //     },
    // //     "in-progress": {
    // //     title: "In Progress",
    // //     items: []
    // //     },
    // })

    const handleDragEnd = ({destination, source}) => {
        if (!destination) {
        return
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
        return
        }

        // Creating a copy of item before removing it from state
        const itemCopy = {...state[source.droppableId].items[source.index]}

        setState(prev => {
        prev = {...prev}
        // Remove from previous items array
        prev[source.droppableId].items.splice(source.index, 1)


        // Adding to new items array location
        prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

        return prev
        })
    }


    return (
        <div className="App">
        <DragDropContext onDragEnd={handleDragEnd}>
            {_.map(state, (data, key) => {
            return(
                <div key={key} className={"column"}>
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                    {(provided, snapshot) => {
                    return(
                        <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={"droppable-col"}
                        >
                        {data.items.map((el, index) => {
                            return(
                            <Draggable key={el.id} index={index} draggableId={el.id}>
                                {(provided, snapshot) => {
                                return(
                                    <div
                                    className={`item ${snapshot.isDragging && "dragging"}`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    >
                                    {el.name}
                                    </div>
                                )
                                }}
                            </Draggable>
                            )
                        })}
                        {provided.placeholder}
                        </div>
                    )
                    }}
                </Droppable>
                </div>
            )
            })}
        </DragDropContext>
        </div>
    );
}


export default DragAndDrop
