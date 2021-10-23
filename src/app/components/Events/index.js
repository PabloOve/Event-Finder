import React from 'react'
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom'

const Events = () => {
    const [events, setEvent] = React.useState([])
    let isOpen = ""
    React.useEffect(() => {
        obtainEvents()
    }, [])
    
    const obtainEvents = async () => {
        const events = await fetch('https://www.cultura.gob.ar/api/v2.0/convocatorias/?limit=5&offset=5')
        .then(response => response.json())
        .then(data => data.results)
     
        setEvent(events)
    }


    return (
        <div class="container-md">
        <div class="card-header">Events</div>
  
        <h1>{console.log(events)}</h1>

          
            <table class="table table-striped" id="emptableid" width="100%">

            
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>State</th>
                        <th>Start Date</th>
                    </tr>
                </thead>
                <tbody>

    {events.map(
            event => 
                <tr key={event.id}>
                   
                  <th scope='row'>{event.titulo}</th>
                  <th scope='row'>{event.estado}</th>
                  <th scope='row'>{event.fecha_inicio}</th>
                
                  {event.estado == "abierta" ? <Link to={`/event/${event.id}`}>
                      <button className='btn btn-outline-success'>Assist</button>
                    </Link> : 
                    
                    <Link to={`/event/${event.id}`}>
                      <button className='btn btn-outline-info'>Info</button>
                    </Link>
                    }
                  
                </tr>
            )}
    
  </tbody>
  </table>
  <Link to={`/newEvent`}>
                      <button className='btn btn-primary'>Create New Event</button>
                    </Link>
        </div>
    )

}

export default Events