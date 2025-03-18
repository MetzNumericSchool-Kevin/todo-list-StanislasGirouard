import { useState } from "react"

// type TodoItem = {
//     id: number,
//     description: string
//     done: boolean
// }

let nextid = 0

export default function AddTaskForm(){
    const [list, setList] = useState([])
    const [description, setDescription] = useState("")
    const sortedList = 
        list.sort((a, b) =>
            a.done - b.done
        )

    function handleDelete(item) {
        const newList = sortedList.filter(task => task.id !== item.id);
        setList(newList);
    };

    function editTask(id, completedValue) {
        setList(
            sortedList.map((task) =>
                task.id === id ? { ...task, done: completedValue } : task
            )
        );
    };

    return (
        <>
            <div className="flex">
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="grow" placeholder="Ajouter une tâche" />
                </label>

                <button onClick={() => {setList([{id: nextid++, description: description, done: false}, ...list]), setDescription("")}} className="btn btn-primary"> + </button>         
            </div>

            <div className="my-5 flex-column gap-5 w-full text-left">
                {list.map((task) => (
                    <div className={task.done ? "bg-indigo-900 w-full m-5 rounded-box p-3 flex" : "bg-indigo-700 w-full m-5 rounded-box p-3 flex"}>
                        <span className="pr-8">
                            <label>
                                <input type="checkbox" checked={task.done} onClick={() => editTask(task.id, !task.done)} className="checkbox" />
                            </label>
                        </span>

                        <span key={task.id} className={task.done ? "flex-grow line-through" : "flex-grow"}> {task.description} </span>
                        
                        <div>
                            <button onClick={() => handleDelete(task)} className="btn btn-error btn-outline btn-xs">
                                X
                            </button>
                        </div>
                    </div>)
                )}
            </div>
        </>
    )
}