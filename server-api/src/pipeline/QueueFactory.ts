import { BullQueueAdapter } from "../queues-providers/BullQueueAdapter";
import { RabbitMQQueueAdapter } from "../queues-providers/RabbitQueueAdapter";
import { IQueue } from "../queues-providers/IQueue";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

export class QueueFactory {
  static getQueueFactory<T>(queueName: string): IQueue<T> {
    const queueType = process.env.QUEUE_TYPE || "BULL";

    switch (queueType) {
      case "BULL":
        return new BullQueueAdapter<T>(queueName);
      case "RABBITMQ":
        return new RabbitMQQueueAdapter<T>(queueName);
      default:
        throw new Error(`Tipo de cola no soportado: ${queueType}`);
    }
  }
}
