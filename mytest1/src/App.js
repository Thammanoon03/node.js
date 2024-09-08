import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicketForm from './TicketForm';
import TicketList from './TicketList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TicketForm />} />
        <Route path="/ticketlist" element={<TicketList />} />
      </Routes>
    </Router>
  );
}

export default App;
