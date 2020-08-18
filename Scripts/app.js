/*
Name:COMP125-M2020-Assignment4
Author:Julian Miguel Alapan
Student#:300836721
WebsiteName:COMP125-2020-Assignment4
Description:Slot Machine
*/
(function () {
    // Function Scoped Variables
    let stage;
    let assets;
    // This function triggers first and "Preloads" all the assets
    function Preload() {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);
    }
    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start() {
        console.log("App Started...");
        let canvas = document.getElementById("canvas");
        let stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        Main();
    }
    // called every fram
    function Update() {
        stage.update();
    }
    // app logic goes here
    function Main() {
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=app.js.map