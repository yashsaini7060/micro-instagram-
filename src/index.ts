import "reflect-metadata";
import { config } from "dotenv";
import { AppDataSource } from "./data-source";
import { app } from "./app";

config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
