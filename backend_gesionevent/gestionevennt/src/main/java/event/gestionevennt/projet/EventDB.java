package event.gestionevennt.projet;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class EventDB {
    private static final MongoCollection<Document> collection =
        MongoDBUtil.getDatabase().getCollection("events");

    public static List<Event> getEvents() {
        List<Event> events = new ArrayList<>();
        for (Document doc : collection.find()) {
            events.add(new Event(
                doc.getInteger("id"),
                doc.getString("name"),
                doc.getString("description"),
                doc.getString("date"),
                doc.getString("time")
            ));
        }
        return events;
    }

    public static Event getEventById(int id) {
        
        Document doc = collection.find(Filters.eq("id", id)).first();
        if (doc != null) {
           
            return new Event(
                doc.getInteger("id"),
                doc.getString("name"),
                doc.getString("description"),
                doc.getString("date"),
                doc.getString("time")
            );
        }
        return null; 
    }

    public static void addEvent(Event event) {
        Document doc = new Document("id", event.getId())
            .append("name", event.getName())
            .append("description", event.getDescription())
            .append("date", event.getDate())
            .append("time", event.getTime());
        collection.insertOne(doc);
    }

    public static void removeEvent(int id) {
        collection.deleteOne(Filters.eq("id", id));
    }

    public static void updateEvent(int id, Event updatedEvent) {
        Document updatedDoc = new Document("name", updatedEvent.getName())
            .append("description", updatedEvent.getDescription())
            .append("date", updatedEvent.getDate())
            .append("time", updatedEvent.getTime());
        collection.updateOne(Filters.eq("id", id), new Document("$set", updatedDoc));
    }
}
