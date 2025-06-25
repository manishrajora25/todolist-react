
import { useState } from "react"

interface Todo{
    id:number,
    Task:string
}
function TodoList() {

const [todos , setTodos]=useState<Todo[]>([])
const [input , setInput]=useState<string>("")
const [editId , setEditId]=useState<boolean>(false)
const [TaskeditId , setTaskEditId]=useState<number>()
 
function addTask(){
  if (!input.trim()) {
    alert("Enter the task"); 
    return;
  }
    if(editId){
    setTodos(
        todos.map(item=>item.id ===TaskeditId ?{...item , Task:input}:item))
    setEditId(false)
    setInput("")

    }
    else{
      if(input){
         const newTodo :Todo={
         id:Date.now(),
         Task:input
         }
         setTodos([...todos ,newTodo ])
         setInput("")
        }
      }
    }
console.log(todos)

function editTask(e:Todo){
     setInput(e.Task)
     setTaskEditId(e.id)
     setEditId(true)
}

function deleteTask(id:number){
  setTodos(todos.filter(item=>item.id!==id))
}

  return (
   <>
  <div className="flex flex-col items-center justify-center mt-[15%] px-4">
  {/* Input and Button Section */}
  <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-lg">
    <input
      type="text"
      placeholder="Enter your task"
      onChange={(e) => setInput(e.target.value)}
      value={input}
      className="w-full sm:w-[70%] p-2 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4 sm:mb-0 sm:mr-2"
    />
    <button
      onClick={addTask}
      className={`w-full sm:w-[30%] px-4 py-2 rounded-md text-white transition-all ${
        editId
          ? "bg-green-500 hover:bg-green-600"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {editId ? "Update Task" : "Add Task"}
    </button>
  </div>

  {/* Tasks Section */}
  <div className="mt-6 w-full max-w-lg space-y-4">
    {todos && todos.length > 0 ? (
      todos.map((e) => (
        <div
          key={e.id}
          className="flex flex-col sm:flex-row items-center sm:justify-between bg-gray-100 p-4 rounded-md shadow-md hover:shadow-lg transition-all"
        >
          <h2 className="text-lg font-semibold text-gray-800 text-center sm:text-left mb-2 sm:mb-0">
            {e.Task}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => editTask(e)}
              className="px-3 py-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition-all"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(e.id)}
              className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      ))
    ) : (
      ""
    )}
  </div>
</div>


   </>
  )
}

export default TodoList;
