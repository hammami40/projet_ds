package event.gestionevennt.projet;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class MongoDBUtil {
    private static final String CONNECTION_STRING = "mongodb://localhost:27017"; // Replace with your connection string
    private static final String DATABASE_NAME = "gestionevennt";
    private static MongoDatabase database;

    static {
        MongoClient client = MongoClients.create(CONNECTION_STRING);
        database = client.getDatabase(DATABASE_NAME);
    }

    public static MongoDatabase getDatabase() {
        return database;
    }
}
