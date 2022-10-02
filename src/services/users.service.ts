import { CreateUserDto } from '@dtos/users.dto';
import crypto from 'crypto';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import Singleton from '@/utils/singleton';

class UserService {
    public users = userModel;
    prisma = Singleton.instance.prisma;

    public async findAllUser(): Promise<User[]> {
        const allUsers = await this.prisma.user.findMany();
        return allUsers;
    }

    public async findUserById(userId: number): Promise<User | undefined> {
        return await this.prisma.user.findFirst({
            where: {
                id: userId,
            },
        });
    }

    public async createUser(userData: CreateUserDto): Promise<User> {
        const hashedPassword = crypto
            .createHash('SHA256')
            .update(userData.password)
            .digest('hex');
        const createUserData: User = {
            ...userData,
            password: hashedPassword,
        };

        const userResult = await this.prisma.user.create({
            data: createUserData,
        });

        return userResult;
    }
}

export default UserService;
