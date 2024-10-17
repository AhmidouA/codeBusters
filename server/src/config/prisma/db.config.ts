import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});

prisma.$on("query", (e: any) => {
    console.log("Query: " + e.query);
    console.log("Params: " + e.query);
});

export default prisma;
