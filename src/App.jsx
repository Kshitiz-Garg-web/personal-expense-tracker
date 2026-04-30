import { useState } from 'react'
import './App.css'
import ContextMenu from './components/ContextMenu'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import { useLocalStorage } from '../hook/useLocalStorage'

function App() {
  // const [expenses, setExpenses] = useState([])
  const [expenses, setExpenses] = useLocalStorage('expenses', [])
  // const [obj, setObj] = useState({
  //   title: "",
  //   category: "",
  //   amount: ""
  // })
  const [obj, setObj] = useLocalStorage(
    "obj", {
    title: "",
    category: "",
    amount: ""
  }
  )
  // const [editableMode, setEditableMode] = useState(false)
  const [editableMode, setEditableMode] = useLocalStorage('editableMode', false)
  // const [rowId, setRowId] = useState({})
    const [rowId, setRowId] = useLocalStorage('rowId', {})

  const [rawData, setRawData] = useLocalStorage('myNum', [1, 2, 3, 4, 5])

  return (
    <>
      <main>
        <h1 onClick={(() => setRawData((pre) => [...pre, 6, 7, 8, 9, 10]))}>Track Your Expense
          <br />
          {rawData}
        </h1>
        <div className="expense-tracker">
          <ExpenseForm editableMode={editableMode} setExpenses={setExpenses} obj={obj} setObj={setObj} rowId={rowId} setEditableMode={setEditableMode} />
          <ExpenseTable expenses={expenses} setExpenses={setExpenses} setObj={setObj} setEditableMode={setEditableMode} setRowId={setRowId} rowId={rowId} />
        </div>
      </main>
    </>
  )
}

export default App
