/*
Name:COMP125-M2020-Assignment4
Author:Julian Miguel Alapan
Student#:300836721
WebsiteName:COMP125-2020-Assignment4
Description:Slot Machine
*/
(function () {
    // Function Scoped Variables
    var stage;
    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start() {
        console.log("App Started...");
        var canvas = document.getElementById("canvas");
        var stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);
        Main();
    }
    // called every fram
    function Update() {
        stage.update();
    }
    // app logic goes here
    function Main() {
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map