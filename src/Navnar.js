import './App.css';
import { useState,useEffect } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(()=>{
    if(menuOpen)
    {
      const x=document.getElementById('contentham');
      x.style.transform='translateX(0)';
    }
    else{
      const x=document.getElementById('contentham');
      x.style.transform='translateX(100%)';
    }
  });

  const openHamburger = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="NAVBAR">
      <div className="Logo">
        <h2>Expense Tracker</h2>
      </div>
      <div id='contentham'>
        <ul>
          <li><a href="#Home">Home</a></li>
          <li><a href="#Add">Add Expense</a></li>
          <li><a href="#Expenses">Expense List</a></li>
        </ul>
      </div>
      <div id='contentt'>
        <ul>
          <li><a href="#Home">Home</a></li>
          <li><a href="#Add">Add Expense</a></li>
          <li><a href="#Expenses">Expense List</a></li>
        </ul>
      </div>
      <div id="hamburger" onClick={openHamburger}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Navbar;
