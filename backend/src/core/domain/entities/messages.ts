export default class Message{
    constructor(
        public chat_id:number,
        public text:string,
        public image_url:string,
        public video_url:string,
        public document_url:string,
        public user_id:number,
        public name:string
    ){
        this.chat_id=chat_id;
        this.text=text;
        this.image_url=image_url;
        this.video_url=video_url;
        this.document_url=document_url;
        this.user_id=user_id;
        this.name=name;
    }
}