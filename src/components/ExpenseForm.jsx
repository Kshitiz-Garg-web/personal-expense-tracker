import { useState } from "react";

const ExpenseForm = ({ setExpenses, obj, setObj, editableMode, rowId, setEditableMode }) => {

  // const [title,setTitle] = useState('');
  // const [category,setCat] = useState('');
  // const [amount,setAmount] = useState('');

  const [err, setErr] = useState({})

  const validate = (formData) => {
    const errData = {}
    if (!formData.title) {
      errData.title = 'Title is required'
    }
    if (!formData.category) {
      errData.category = 'category is required'
    }
    if (!formData.amount) {
      errData.amount = 'amount is required'
    }
    if ((typeof (formData.amount) !== 'number' || formData.amount <= 0)) {
      errData.amount = 'amount must be a positive no.'
    }
    setErr(errData);
    return errData;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const expense = { ...obj, 'id': crypto.randomUUID() };
    expense.amount = parseFloat(expense.amount);

    const validateResult = validate(expense);
    if (Object.keys(validateResult).length) {
      return;
    }

    if (editableMode) {
      console.log('if wala chl rha h  ')
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === rowId ? expense : item
        )
      )
      console.log('editablevalue', editableMode)
      setEditableMode(false)
    }
    else {
      console.log('else wala chl rha h ')
      setExpenses((pre) => [...pre, expense])
    }

    setObj({
      title: "",
      category: "",
      amount: ""
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setObj((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    setErr({})
  }
  const onlyNumberValidation = (e) => {
    const value = e.target.value;
    let str = ""
    for (let i = 0; i < value.length; i++) {
      const char = value.charAt(i);
      const code = char.charCodeAt(0);
      if (code < 48 || code > 57) {
        if (value.length == 1) {
          e.target.value = "";
        } else {
          e.target.value = str;
        }
        console.log('not a no.')
        return;
      } else {
        str = str + char;
        e.target.value = str;
      }
      console.log(str)
    }
    console.log("valid number");
  };



  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={obj.title}
          onChange={handleChange}
        />
        <p className="err">{err.title}</p>
      </div>
      <div className="input-container">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={obj.category}
          onChange={handleChange}
        >
          <option value="" hidden>Selelect category</option>
          <option value="grocery">Grocery</option>
          <option value="clothes">Clothes</option>
          <option value="bills">Bills</option>
          <option value="education">Education</option>
          <option value="medicine">Medicine</option>
        </select>
        <p className="err">{err.category}</p>
      </div>
      <div className="input-container">
        <label htmlFor="amount">Amount</label>
        <input
          placeholder="0.00"
          id="amount"
          name="amount"
          value={obj.amount}
          // onChange={(e)=>setObj((pre)=>{return {...pre, 
          // amount:e.target.value}
          // })} 
          onChange={handleChange}
          onInput={onlyNumberValidation}

        />
        <p className="err">{err.amount}</p>
      </div>
      <button className="add-btn">{editableMode ? 'Update' : 'Add'}</button>
    </form>
  )
}



export default ExpenseForm