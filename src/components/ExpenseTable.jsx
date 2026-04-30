import { useEffect, useRef, useState } from "react"
import ContextMenu from "./ContextMenu"
import { RxCross2 } from "react-icons/rx";
import { useLocalStorage } from "../../hook/useLocalStorage";
// expenses - bucket
// category - query

export default function ExpenseTable({ expenses, setExpenses, setObj, setEditableMode, setRowId, rowId }) {
  // const [category, setCategory] = useState("")
  const [category, setCategory] = useLocalStorage('category', "")
  const filterExpense = expenses.filter((filter) => filter.category.toLowerCase().includes(category))
  console.log(filterExpense)

  // const [positionContextMenu, setPositionContextMenu] = useState({})
  const [positionContextMenu, setPositionContextMenu] = useLocalStorage('positionContextMenu', {})
  const [sortCallBack, setSortCallBack] = useState(() => () => { })

  let total = 0;
  for (let i = 0; i < filterExpense.length; i++) {
    const amount = filterExpense[i].amount;
    total = total + amount
  }

  return (
    <>
      <ContextMenu positionContextMenu={positionContextMenu} setPositionContextMenu={setPositionContextMenu} setExpenses={setExpenses} rowId={rowId} setObj={setObj} filterExpense={filterExpense} setEditableMode={setEditableMode} />
      <table className="expense-table" onClick={(e) => {
        if (positionContextMenu.left) {
          console.log('clickeddddddd')
          setPositionContextMenu({ left: 0, top: 0, display: "none" })
        }
      }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>
              <select onChange={(e) => {
                setCategory(e.target.value)
              }}>
                <option value="">All</option>
                <option value="grocery">Grocery</option>
                <option value="clothes">Clothes</option>
                <option value="bills">Bills</option>
                <option value="education">Education</option>
                <option value="medicine">Medicine</option>
              </select>
            </th>
            <th className="amount-column">
              <div className="amountHead">
                <span>Amount</span>
                <span className="shortController">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    className="arrow up-arrow"
                    // onClick={setSortCallBack((pre) => () => a.amount - b.amount)}
                    onClick={() => {
                      setSortCallBack(() => (a, b) => a.amount - b.amount)
                      // console.log(sortCallBack)
                      // console.log(typeof (sortCallBack))
                    }}
                  >
                    <title>Ascending</title>
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    className="arrow down-arrow"
                    //  onClick={setSortCallBack((a, b) => () => b.amount - a.amount)}
                    onClick={() => {
                      setSortCallBack(() => (a, b) => b.amount - a.amount)
                      // console.log(sortCallBack)
                      // console.log(typeof (sortCallBack))
                    }}
                  >
                    <title>Descending</title>
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                  <RxCross2 className="cancalShort" onClick={() => {
                    setSortCallBack(() => (a, b) => { })
                    // console.log(sortCallBack)
                    // console.log(typeof (sortCallBack))
                  }} />

                </span>

              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filterExpense.sort(sortCallBack).map(({ id, title, category, amount }) => (
            <tr key={id} onContextMenu={(e) => {
              e.preventDefault()
              console.log(e.clientX, e.clientY)
              setPositionContextMenu({
                left: e.clientX + 15,
                top: e.clientY + 15,
                display: "unset"
              })
              setRowId(id)
              // rowId = id
              // ref.current = id


            }}>
              <td>{title}</td>
              <td>{category}</td>
              <td>₹{amount}</td>
            </tr>
          ))}
          <tr>
            <th>Total</th>
            <th></th>
            <th>₹{total}</th>
          </tr>
        </tbody>
      </table>
    </>

  )
}