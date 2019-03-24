
function initwebtcp() {
    const script = document.createElement("script");
    script.onload = () => {
        this.loadClientWhenGapiReady(script);
    };
    script.src = "js/webtcp-0.0.1.min.js";
    document.body.appendChild(script);
}

export default class Gateway{

    sendTcp(msg){
        window.newResponse = false;
        window.apiResponse = {};
        var data = msg.split(" ");
        data = data.slice(4);
        data = data.join(" ");
        // print("<span style='color:Blue'>Me: </span>"+data);
        window.socket.write(msg);  

    }

    getResult() {
        if(window.newResponse==true){
            return window.apiResponse;
        }
        else{
             setTimeout(() => {return this.getResult()}, 100);
        }
    }
}