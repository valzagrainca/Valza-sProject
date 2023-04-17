export default class User {
  constructor(
    public id: number,
    public username: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public phone: string,
    public status: string,
    public profile_picture: string
  ) {
    this.id = id;
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.status = status;
    this.profile_picture = profile_picture;
  }
}
