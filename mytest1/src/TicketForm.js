import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './TicketForm.css'; 

function TicketForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [alertMessage, setAlertMessage] = useState(''); 
  const [alertType, setAlertType] = useState(''); 

  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
    
      const response = await axios.post('http://localhost:5000/api/tickets', {
        title,
        description,
        contactInfo,
      });

      console.log('Response:', response.data);

     
      setAlertMessage('Ticket created successfully!');
      setAlertType('success');

    } catch (error) {
      console.error('Error:', error);

      
      setAlertMessage('Failed to create ticket. Please try again.');
      setAlertType('error');
    }
  };

  const handleGoToTicketList = () => {
    navigate('/ticketlist'); 
  };

  return (
    <div className="ticket-form">
      <h1>Create New Ticket</h1>
      {alertMessage && (
        <div className={`alert ${alertType}`}>
          {alertMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contactInfo">Contact Info:</label>
          <input
            type="text"
            id="contactInfo"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleGoToTicketList} className="go-to-ticketlist">
         to Ticket List
      </button>
    </div>
  );
}

export default TicketForm;
