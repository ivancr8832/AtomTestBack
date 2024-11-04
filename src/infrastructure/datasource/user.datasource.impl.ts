import { collection, getDocs, query, where } from "firebase/firestore";
import { FirebaseDb } from "../../data/firebase";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/DTOs/user/create-user.dto";
import { UserEntity } from '../../domain/entities/user.entity';

export class UserDatasourceImpl implements UserDatasource {

    async login(email: string): Promise<UserEntity | null> {
        try {

            const collectionRef = collection(FirebaseDb.db, "users");
            const queryRef = query(collectionRef, where('email', '==', email));
            const snapshot = await getDocs(queryRef);

            if (snapshot.empty) return null;
            return UserEntity.fromObject({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
        } catch(error) {
            throw error;
        }
    }

    async create(userCreateDto: CreateUserDto): Promise<UserEntity> {
        try {
            const { id } = await FirebaseDb.insert("users", { ...userCreateDto });
            return UserEntity.fromObject({ id, ...userCreateDto })
        } catch (error) {
            throw error;
        }
    }

}