export default class Gateway{

    sendTcp(msg){
        window.apiResponse = {};
        // print("<span style='color:Blue'>Me: </span>"+data);
        window.newResponse = false;
        console.log(msg);
        window.socket.write(msg);  
        

    }

    getResult() {
        if(window.newResponse===true){
            window.newResponse = false;
            return window.apiResponse;
        }
        else{
             setTimeout(() => {return this.getResult()}, 600);
        }
    }
}