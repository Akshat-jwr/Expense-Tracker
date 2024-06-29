import './App.css';
import { useState, useEffect } from 'react';

export default function AddExpense() {
    const [Expense, Addexp] = useState([]);
    const [formData, setFormData] = useState({ des: "", amt: "", cat: "" });
    const [editIndex, setEditIndex] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    const filteredExpenses = selectedCategory ? Expense.filter(expense => expense.Category === selectedCategory)
        : Expense;

    const filteredTotal = filteredExpenses.reduce((acc, expense) => acc + parseFloat(expense.Amount), 0);

    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        if (storedExpenses.length > 0) {
            Addexp(storedExpenses);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(Expense));
    }, [Expense]);

    function addingexp(evt) {
        evt.preventDefault();
        const date = new Date().toLocaleDateString();
        if (editIndex !== null) {
            const updatedExpenses = Expense.map((expense, index) =>
                index === editIndex ? { ...expense, Description: formData.des, Amount: formData.amt, Category: formData.cat } : expense
            );
            Addexp(updatedExpenses);
            setEditIndex(null);
        } else {
            Addexp([...Expense, { Description: formData.des, Amount: formData.amt, Category: formData.cat, Date: date }]);
        }
        setFormData({ des: "", amt: "", cat: "" });
    }

    function changeFormdata(evt) {
        const changedField = evt.target.name;
        const newValue = evt.target.value;
        setFormData(prevFormData => ({
            ...prevFormData,
            [changedField]: newValue
        }));
    }

    function deleteExpense(index) {
        const updatedExpenses = Expense.filter((_, i) => i !== index);
        Addexp(updatedExpenses);
    }

    function editExpense(index) {
        alert("You can now edit the expense on the expense form");
        const expense = Expense[index];
        setFormData({ des: expense.Description, amt: expense.Amount, cat: expense.Category });
        setEditIndex(index);
        document.getElementById('fff').scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <div className='AddexpForm' id='fff'>
                <div id='form'>
                    <h2 id='Add'>Add Expenses:</h2>

                    <form id='expform' onSubmit={addingexp}>
                        <label htmlFor='des'>Enter Description:</label>
                        <input type='text' placeholder='Description' id='Description' name='des' value={formData.des} onChange={changeFormdata} className='inp' required />
                        <label htmlFor='amt'>Enter Amount(in ₹):</label>
                        <input type='number' placeholder='Amount' id='amount' name='amt' value={formData.amt} onChange={changeFormdata} className='inp' required />
                        <label htmlFor='cat'>Enter Category:</label>
                        <select id='category' name='cat' value={formData.cat} onChange={changeFormdata} className='inp' required>
                            <option value="">Select a Category</option>
                            <option value="Food">Food</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Other">Other</option>
                        </select>
                        <button type='submit'>Add</button>
                    </form>
                </div>
            </div>

            <div id='listof'>
                <div id='expp'>
                    <h2 id='Expenses'>Expense List:</h2>
                    <div id='filter'>
                        <label htmlFor='filterCategory'>Filter by Category: </label>
                        <select id='filterCategory' value={selectedCategory} onChange={handleCategoryChange}>
                            <option value=''>All</option>
                            <option value='Food'>Food</option>
                            <option value='Utilities'>Utilities</option>
                            <option value='Transportation'>Transportation</option>
                            <option value='Entertainment'>Entertainment</option>
                            <option value='Other'>Other</option>
                        </select>
                    </div>
                </div>

                <div className="list">
                    {filteredExpenses.map((obj, index) => (
                        <div key={index} className='card' >
                            <button className='cross' onClick={() => deleteExpense(index)}>X</button>
                            <p>Description: {obj.Description}</p>
                            <p>Amount: ₹ {obj.Amount}</p>
                            <p>Category: {obj.Category}</p>
                            <p>Date: {obj.Date}</p>
                            <button className='edit' onClick={() => editExpense(index)}>Edit</button>
                        </div>
                    ))}
                </div>
            </div>

            <div id='tot'>
                <h3>Total Expense: ₹{filteredTotal}</h3>
            </div>
        </>
    );
}
