import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userRpository;
    constructor(userRpository: Repository<User>);
    create(createUserDto: CreateUserDto): {
        id: number;
        name: string;
    };
    findAll(): any;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
