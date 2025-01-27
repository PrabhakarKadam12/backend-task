import PQueue from "p-queue";
import { fetchUsers } from "./fetchUsers";
import { User } from "../models/user.model";
import { config } from "../config";

const queue = new PQueue({ concurrency: config.requestsPerSecond });

export const processQueue = async () => {
    const totalBatches = Math.ceil(5000 / config.batchSize);

    for (let batch = 1; batch <= totalBatches; batch++) {
        const users = await fetchUsers(config.batchSize);
        const userDocs = users.map((user) => ({
            id: user.login.uuid,
            gender: user.gender,
            name: `${user.name.first} ${user.name.last}`,
            address: {
                city: user.location.city,
                state: user.location.state,
                country: user.location.country,
                street: `${user.location.street.number} ${user.location.street.name}`,
            },
            email: user.email,
            age: user.dob.age,
            picture: user.picture.large,
        }));

        await User.insertMany(userDocs);
        console.log(`Batch ${batch} inserted`);
        if (batch < totalBatches) {
            console.log(`Sleeping for ${config.sleepTime} seconds...`);
            await new Promise((resolve) =>
                setTimeout(resolve, config.sleepTime * 1000)
            );
        }
    }
};
