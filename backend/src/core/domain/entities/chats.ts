export default class Chat {
    constructor(
      public chat_id:number,
      public chat_name:string,
      public group_picture:string,
      public is_group:boolean,
      public user_id:number,
      public first_name:string,
      public last_name:string,
    ) {
      this.chat_id=chat_id;
      this.chat_name=chat_name;
      this.group_picture=group_picture;
      this.is_group=is_group;
      this.user_id=user_id;
      this.first_name=first_name;
      this.last_name=last_name;
    }
  }
  
