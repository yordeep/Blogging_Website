import Config from "../Config/Config";
import { Client,Databases,Storage,Query,ID } from "appwrite";

export class Service{
    client = new Client();
    databases;
    buket;

    constructor(){
        this.client
        .setEndpoint(Config.appwriteUrl)
        .setProject(Config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.buket = new Storage(this.client);
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.databases.createDocument(Config.appwriteDatabaseId,Config.appwriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status,
                userId,
            })
        }
        catch(error){
            throw error;
        }
    }


    async updatePost (slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(Config.appwriteDatabaseId,Config.appwriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status,
            })
            
        } catch (error) {
            throw error;
        }
    }

    async deletePost (slug){
        try {
             await this.databases.deleteDocument(Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                slug)
                return true;
            
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                slug)
            
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPosts(quaries = [Query.equal("status",'active')]){
        try {
            return await this.databases.listDocuments(Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                quaries,)
        } catch (error) {
            throw error;
            return false;
        }
    }

    async uploadeFile(file){
        try {
            return await this.buket.createFile(
                Config.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            throw error;
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.buket.deleteFile(
                Config.appwriteBucketId,
                fileId
            )
            
        } catch (error) {
            throw error;
            return false;
        }
    }

    getFilePreview(fileId){
        return this.buket.getFilePreview(
            Config.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();

export default service;