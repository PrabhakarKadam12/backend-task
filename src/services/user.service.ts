import { fetchUsers } from "../utils/fetchUsers";

test("fetchUsers should fetch users correctly", async () => {
    const users = await fetchUsers(10);
    expect(users.length).toBe(10);
});
