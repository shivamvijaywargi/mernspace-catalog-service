import app from "./app";
import { CONFIG } from "./config";
import { logger } from "./config/logger";

const PORT = parseInt(CONFIG.PORT || "5502", 10);

const startServer = (PORT: number) => {
  try {
    // Handling uncaught exceptions
    process.on("uncaughtException", (err) => {
      logger.error(`Error: ${err.message}`);
      logger.error("Shutting down the server due to uncaught exceptions");

      process.exit(1);
    });

    const server = app.listen(PORT, () => {
      logger.info(`App is running at http://localhost:${PORT}`);
    });

    // Handling Unhandled exceptions
    process.on("unhandledRejection", (err: Error) => {
      logger.error(`Error: ${err.message}`);
      logger.error(
        "Shutting down the server due to unhandled promise rejections",
      );

      server.close(() => {
        process.exit(1);
      });
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(`Error while starting the server: ${err.message}`);

      setTimeout(() => {
        process.exit(1);
      }, 1000);
    }
  }
};

void startServer(PORT);
