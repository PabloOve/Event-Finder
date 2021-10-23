import React from 'react'
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';

const Event = () => {

  //  console.log(useParams());

    const {id} = useParams();

  //  console.log(id);

    const [event, setEvent] = React.useState([])
    //const data = await fetch(`https://www.cultura.gob.ar/api/v2.0/convocatorias/${id}/`)
    React.useEffect(() => {
        const obtenerDatos = async () => {
            const data = await fetch(`https://www.cultura.gob.ar/api/v2.0/convocatorias/${id}/`)
            const event = await data.json()
            setEvent(event)
            
        }
        obtenerDatos()
    }, []) 
    
//[id]
   
    

    return (
       
        <div class="container-md">
            
            <div class="card mb-3">
  <img class="card-img-top" src={event.imagen} alt="Card image cap" height={250}/>
  <div class="card-body">
    <h5 class="card-title">{event.titulo}</h5>
    <p class="card-text">{event.bajada}</p>
    <p class="card-text"><small class="text-muted">{event.estado}</small></p>
    <a href={event.link} class="card-link">More info</a>
  </div>
</div>
        <Link to={`/events`}>
            <button className='btn btn-primary'>Go back</button>
        </Link>
      </div>
    )

}

export default Event