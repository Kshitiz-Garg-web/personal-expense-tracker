const ContextMenu = ({ positionContextMenu, setPositionContextMenu, setExpenses, rowId, setObj, filterExpense, setEditableMode }) => {
  // console.log("------->" + positionContextMenu)
  // console.log('id-> ', rowId)
  if (!positionContextMenu) {
    // console.log("sesese__", positionContextMenu)
    return
  }
  return (
    <div className="context-menu" style={{
      ...positionContextMenu,
    }}
    >
      <div onClick={() => {
        console.log("Edit clicked")
        // console.log("filterExpense -> ",filterExpense)
        const foundExpense = filterExpense.find((expense) => expense.id===rowId)
        // console.log("foundExpense -> ",foundExpense)
        setObj({
          "title": foundExpense.title,
          "category": foundExpense.category,
          "amount": foundExpense.amount,
          "id": foundExpense.id
        })
        setPositionContextMenu({ left: 0, top: 0, display: "none" })
        setEditableMode(true)

      }

      }>Edit
      </div>
      <div onClick={() => {
        console.log("Delete clicked")
        setPositionContextMenu({ left: 0, top: 0, display: "none" })
        setExpenses((pre) => pre.filter(expense => expense.id != rowId))
      }

      }>Delete</div>
    </div>
  )
}

export default ContextMenu