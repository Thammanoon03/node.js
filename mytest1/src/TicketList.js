import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TicketList.css';

function TicketList() {
    const [tickets, setTickets] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('updated_time DESC');
  
    useEffect(() => {
      const fetchTickets = async () => {
        const response = await axios.get('http://localhost:5000/api/tickets', {
          params: { status: filter, sortBy },
        });
        setTickets(response.data);
      };
      fetchTickets();
    }, [filter, sortBy]);
  
    const onDragEnd = (result) => {
      if (!result.destination) return;
  
      const updatedTickets = Array.from(tickets);
      const [movedTicket] = updatedTickets.splice(result.source.index, 1);
      updatedTickets.splice(result.destination.index, 0, movedTicket);
  
      setTickets(updatedTickets);
  
    };
  
    return (
      <div>
        <h1>Tickets Kanban Board</h1>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="updated_time DESC">Latest Update</option>
          <option value="created_time DESC">Creation Time</option>
        </select>
  
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="ticket-list"
              >
                {tickets.map((ticket, index) => (
                  <Draggable key={ticket.id} draggableId={ticket.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="ticket-card"
                      >
                        <h3>{ticket.title}</h3>
                        <p>{ticket.description}</p>
                        <p>Status: {ticket.status}</p>
                        <p>Last Updated: {ticket.updated_time}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
  
  export default TicketList;
  