import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/index.ts';
 
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
      async headers(){
        return{
          Authorization:"Bearer 123" // 'Bearer ' + localStorage.get('token')
        }
      }
    }),
   
  ],
});

async function main() {
    const createResponse=await trpc.createTodo.mutate({
        title:"Hello World",
        description:"its a first programmer for beginner's"
    })
    console.log(createResponse)

    const getResponse=await trpc.getTodo.query()
    console.log(getResponse)

    const signUpResponse=await trpc.signUp.mutate({
        email:"amit@gmail.com",
        password:"amit"
    })
    console.log(signUpResponse)
    
}

//Setup = follow tRPC docs
//step 1 = tsc-b or tsc to build .ts file into js 
//step 2 = node .\dist\server\index.js
//step 3 = node .\dist\client\index.js
//Note = Whenever make any changes in file run everthing from step 1 till 3
main()