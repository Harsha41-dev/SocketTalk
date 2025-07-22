const { log } = require('node:console');
const { chmod } = require('node:fs');
const net = require('node:net');
 
let clients=[];
let server=net.createServer((socket)=>
{
    clients.push(socket);
    socket.write('Welcome to the chat/n');
     socket.on('data',(chunk)=>{
        let message=chunk.toString();
           clients.forEach((client)=>
        {
            if(clients.indexOf(client)!=clients.indexOf(socket))
                 client.write(`client says: ${message}\n`);
        })
     })

     socket.on('end',()=>
    {
            clients.splice(clients.indexOf(socket),1);
            console.log('one of the client disconnected\n');
    });
     
});

server.listen(1337,()=>
{
    console.log('listening from port 1337\n');    
})