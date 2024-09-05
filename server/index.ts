import { publicProcedure, router } from './trpc';
import {z} from 'zod'
import { createHTTPServer } from '@trpc/server/adapters/standalone';

 //.query = get , .mutation = update, delete, create
const appRouter = router({
    signUp:publicProcedure
     .input(z.object({
        email:z.string(),
        password:z.string()
    }))
    .mutation(async(opts)=>{
        const email=opts.input.email;
        const password=opts.input.password;
        
        //use database queries here && do validation && create jwt token

        const token='123456'
        return {
            token
        };
    }),
    createTodo: publicProcedure
    .input(z.object({
        title:z.string(),
        description:z.string()
    }))  
    .mutation(async (opts) => {
        //context
        const username=opts.ctx.username;
        console.log(username)
        const title=opts.input.title;
        const description=opts.input.description;
        
        //use database queries here 
        return {
            id:'1',
            title:title,
            description:description
        };
    }),
    getTodo:publicProcedure
    .query(async () => {
        //database call here
        return [
            {id:1,title:'hello'},
            {id:2,title:'world'}
        ]
    }),  
});

const server = createHTTPServer({
    router: appRouter,
    createContext(opts){
        let authHeader=opts.req.headers['authorization'];
        console.log(authHeader)
        //do jwt.verify()

        return {
            username:'123'
        }
    }
});
   
server.listen(3000);

export type AppRouter=typeof appRouter
