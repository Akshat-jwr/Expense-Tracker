import './App.css';
import logo from './phoot.jpg'

export default function HeroSection() {
    return (
        <div id="Home">
            <div id="intro">
                <h1>Expense Tracker:</h1>
                <p>Stay on Track with Every Penny: Your Ultimate Expense Management Solution. You can:</p>
                <ul>
                    <li>1.  Add Expenses</li>
                    <li>2.  View Expenses</li>
                    <li>3.  Remove Expenses</li>
                    <li>4.  Edit Expenses</li>
                </ul>
            </div>
            <div>
                <img src={logo} alt="Logo"/>
            </div>
        </div>
    );
}
