/*
Name:COMP125-M2020-Assignment4
Author:Julian Miguel Alapan
Student#:300836721
WebsiteName:COMP125-2020-Assignment4
Description:Slot Machine
*/
(function(){
    // Function Scoped Variables
    let stage: createjs.Stage;

    function Start():void
    {
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        let stage = new createjs.Stage(canvas)
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);

        console.log("App Started...");
    }

    function Update():void
    {
        stage.update();
    }

    window.addEventListener("load", Start);
})();