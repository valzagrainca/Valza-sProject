export interface Message {
    id: number,
    user_id: number,
    photo_id: string,
    video_id: string,
    document_id: string,
    text: string,
    sent_at: Date,
    seen_at: Date,
    deleiverd_at: Date
}
  