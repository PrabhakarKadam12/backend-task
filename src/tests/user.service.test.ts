import { fetchUsers } from "../utils/fetchUsers";
import { User, IItems } from "../models/user.model";
import mongoose from "mongoose";
import { config } from "../config";

// Test MongoDB connection string (use an in-memory database for testing purposes)
const TEST_MONGO_URI = "mongodb://localhost:27017/testBackendTask";

beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect(TEST_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Drop the database and disconnect
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe("User Service Tests", () => {
  it("should fetch users from the external API", async () => {
    const users = await fetchUsers(10); // Fetch 10 users
    expect(users.length).toBe(10); // Ensure 10 users were fetched
    expect(users[0]).toHaveProperty("gender");
    expect(users[0]).toHaveProperty("email");
  });

  it("should save users to the database", async () => {
    const users = [
      {
        id: "test-1",
        gender: "male",
        name: "John Doe",
        address: {
          city: "New York",
          state: "NY",
          country: "USA",
          street: "123 Main St",
        },
        email: "johndoe@test.com",
        age: 30,
        picture: "http://example.com/picture.jpg",
      },
    ];

    await User.insertMany(users); // Insert mock users
    const savedUsers = await User.find(); // Query the database
    expect(savedUsers.length).toBe(1);
    expect(savedUsers[0].email).toBe("johndoe@test.com");
  });

  it("should fetch users from the database with filters", async () => {
    const results = await User.find({ gender: "male" });
    expect(results.length).toBe(1);
    expect(results[0].gender).toBe("male");
  });
});
