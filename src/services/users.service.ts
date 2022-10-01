import { CreateUserDto } from '@dtos/users.dto';
import crypto from 'crypto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import Singleton from '@/utils/singleton';

class UserService {
    public users = userModel;
    prisma = Singleton.instance.prisma;

    public async findAllUser(): Promise<User[]> {
        const allUsers = await this.prisma.user.findMany();
        return allUsers;
    }

    public async findUserById(userId: number): Promise<User> {
        const findUser: User = this.users.find(user => user.id === userId);
        if (!findUser) throw new HttpException(409, "You're not user");

        return findUser;
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

    public async updateUser(
        userId: number,
        userData: CreateUserDto,
    ): Promise<User[]> {
        if (isEmpty(userData))
            throw new HttpException(400, "You're not userData");

        const findUser: User = this.users.find(user => user.id === userId);
        if (!findUser) throw new HttpException(409, "You're not user");

        const hashedPassword = crypto
            .createHash('md5')
            .update(userData.password)
            .digest('hex');
        const updateUserData: User[] = this.users.map((user: User) => {
            if (user.id === findUser.id)
                user = { id: userId, ...userData, password: hashedPassword };
            return user;
        });

        return updateUserData;
    }

    public async deleteUser(userId: number): Promise<User[]> {
        const findUser: User = this.users.find(user => user.id === userId);
        if (!findUser) throw new HttpException(409, "You're not user");

        const deleteUserData: User[] = this.users.filter(
            user => user.id !== findUser.id,
        );
        return deleteUserData;
    }
}

export default UserService;
