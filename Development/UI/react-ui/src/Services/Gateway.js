export default class Gateway{

    sendTcp(msg){
        window.newResponse = false;
        window.apiResponse = {};
        // print("<span style='color:Blue'>Me: </span>"+data);
        window.socket.write(msg);  

    }

    getResult() {
        if(window.newResponse===true){
            return window.apiResponse;
        }
        else{
             setTimeout(() => {return this.getResult()}, 100);
        }
    }
}