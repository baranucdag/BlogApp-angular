export interface BlogModel{
    id:number;
    userId:number;
    categoryId:number;
    blogTitle:string;
    blogContent:string;
    imagePath:string;
    createdAt:Date;
}