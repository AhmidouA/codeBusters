const { PrismaClient } = require("@prisma/client");
const fs = require("fs").promises;
const path = require("path");

const prisma = new PrismaClient();

async function migrateJsonToDatabase() {
    try {
        // Delete all existing records from the table
        await prisma.station.deleteMany({});

        console.log("All existing records deleted");

        // Read and parse the JSON file
        const jsonData = await fs.readFile(
            path.join(__dirname, "config", "seeds", "all_stations.json"),
            "utf8"
        );
        const data = JSON.parse(jsonData);

        // Insert data into the table
        for (const item of data) {
            await prisma.station.create({
                data: {
                    station_type: item.station_type,
                    name: item.name || null,
                    address: item.address || null,
                    city: item.city || null,
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude),
                    total_spot: parseInt(item.total_spot),
                    indoor: item.indoor || null,
                    id_api: item.id_api,
                },
            });
        }

        console.log("Migration completed successfully");
    } catch (error) {
        console.error("Error during migration:", error);
    } finally {
        await prisma.$disconnect();
    }
}

migrateJsonToDatabase();
