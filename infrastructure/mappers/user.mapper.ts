import { User, UserResponse } from "../interfaces/auth.interface";

export class UserMapper {
  static fromUserResponse = (user: UserResponse): User => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      contactNumber: user.contact_number,
      country: user.country,
      rol: user.rol,
    };
  };
}
