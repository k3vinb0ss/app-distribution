import { PrismaClient } from '@prisma/client';

class Singleton {
    private static _instance: Singleton;
    public prisma: PrismaClient;

    private constructor() {
        this.prisma = new PrismaClient();
    }

    public static get instance(): Singleton {
        if (!Singleton._instance) {
            Singleton._instance = new Singleton();
        }

        return Singleton._instance;
    }
}

export default Singleton;
