import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

let clients = [
    {clientSurname: "Иванов", clientName: "Иван", balance: 100, id: 1},
    {clientSurname: "Петров", clientName: "Петр", balance: 300, id: 2},
    {clientSurname: "Сидоров", clientName: "Сидор", balance: 230, id: 3},
    {clientSurname: "Григорьев", clientName: "Григорий", balance: -100, id: 4},
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App clients={clients}/>
);


