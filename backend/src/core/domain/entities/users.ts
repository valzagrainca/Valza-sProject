export default class User {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public phone: string,
    public password: string,
    public first_name: string,
    public last_name: string,
    public status: string,
    public profile_picture: string
  ) {
    this.id=id,
    this.username=username,
    this.email=email,
    this.phone=phone,
    this.password=password,
    this.first_name=first_name,
    this.last_name=last_name,
    this.status=status,
    this.profile_picture=profile_picture
  }
}
