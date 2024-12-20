package event.gestionevennt.projet;

import java.util.ArrayList;
import java.util.List;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("events")
public class EventResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Event> getEvents() {
        return EventDB.getEvents();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Event getEvent(@PathParam("id") int id) {
        // Fetch an event by ID from MongoDB
        return EventDB.getEventById(id);
    }

    @POST
    @Path("create")
    @Consumes(MediaType.APPLICATION_JSON)
    public void createEvent(Event event) {
        EventDB.addEvent(event);
    }

    @DELETE
    @Path("{id}/remove")
    public void removeEvent(@PathParam("id") int id) {
        // Remove an event by ID from MongoDB
        EventDB.removeEvent(id);
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateEvent(@PathParam("id") int id, Event updatedEvent) {
        // Update an event in MongoDB
        EventDB.updateEvent(id, updatedEvent);
    }

}
