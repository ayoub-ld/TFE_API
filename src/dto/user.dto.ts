import User from "../models/user.model";

export class UserDTO {
  id_user: string;
  google_id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  profile_picture: string | null;
  created_at: Date;
  updated_at: Date | null;

  constructor(user: User) {
    this.id_user = user.id_user;
    this.google_id = user.google_id;
    this.email = user.email;
    this.username = user.username;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.profile_picture = user.profile_picture;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}
