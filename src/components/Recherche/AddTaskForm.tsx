import { useState } from "react"

type TodoItem = {
    id: number,
    description: string
    done: boolean
}
let nextid = 0

export default function AddTaskForm(){
    const [list, setList] = useState([])
    const [text, setText] = useState("")

    function handleDelete(index) {
        const newList = [...list];
        newList.splice(index, 1);
        setList(newList);
    };

    function editTask(id, completedValue) {
        setList(
            list.map((task) =>
                task.id === id ? { ...task, done: completedValue } : task
            )
        );
    };
  
    return (
        <>
            <div className="flex">
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" value={text} onChange={e => setText(e.target.value)} className="grow" placeholder="Ajouter une tâche" />
                </label>

                <button onClick={() => {setList([...list, {id: nextid++, text: text, done: false}]), setText("")}} className="btn btn-primary"> + </button>         
            </div>

            <div className="my-5 flex-column gap-5 w-full text-left">
                {list.map((task, index) => (
                    <div className={task.done ? "bg-indigo-900 w-full m-5 rounded-box p-3 flex" : "bg-indigo-700 w-full m-5 rounded-box p-3 flex"}>
                        <span className="pr-8">
                            <label>
                                <input type="checkbox" checked={task.done} onClick={() => editTask(task.id, !task.done)} className="checkbox" />
                            </label>
                        </span>

                        <span key={task.id} className={task.done ? "flex-grow line-through" : "flex-grow"}> {task.text} </span>
                        
                        <div>
                            <button onClick={() => handleDelete(index)} className="btn btn-error btn-outline btn-xs">
                                X
                            </button>
                        </div>
                    </div>)
                )}
            </div>
        </>
    )
}