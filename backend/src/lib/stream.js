import {StreamChat} from 'stream-chat';
 import 'dotenv/config'

 const apikey = process.env.STREAM_API_KEY;
 const apiSecret = process.env.STREAM_API_SECRET;

 console.log(apiSecret , apikey);
 

 if(!apiSecret || !apikey) {
    console.error('Please set STREAM_API_KEY and STREAM_API_SECRET in your .env file.');
 }

 const streamClient  = StreamChat.getInstance(apikey, apiSecret) 
 export const upsertStreamUser = async(userData)=>{
    try {
        await streamClient.upsertUsers([userData])
        return userData ; 
    } catch (error) {
        console.log("error creating  stream user");
        console.log(error);
        
        
    }
 }

 export const generateStreamToken = async (userId) =>{}
