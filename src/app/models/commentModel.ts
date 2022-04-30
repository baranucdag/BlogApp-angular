export interface CommentModel{
    id:number;
    blogId:number,
    userId:number,
    commentContent:string,
    createdTime:Date
}