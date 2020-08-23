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
    let slotMachineBackground;
    let spinButton;
    let bet1Button;
    let bet10Button;
    let bet100Button;
    let betMaxButton;
    let resetButton;
    let quitButton;
    let jackPotLabel;
    let creditLabel;
    let winningsLabel;
    let betLabel;
    let errorMessageLabel;
    let jackpotMessageLabel;
    let leftReel;
    let middleReel;
    let rightReel;
    let betLine;
    // symbol tallies
    let grapes = 0;
    let bananas = 0;
    let oranges = 0;
    let cherries = 0;
    let bars = 0;
    let bells = 0;
    let sevens = 0;
    let blanks = 0;
    let playerCredits = 1000;
    let winnings = 0;
    let jackpot = 5000;
    let playerBet = 0;
    let manifest = [
        { id: "background", src: "./Assets/images/background.png" },
        { id: "banana", src: "./Assets/images/banana.gif" },
        { id: "bar", src: "./Assets/images/bar.gif" },
        { id: "bell", src: "./Assets/images/bell.gif" },
        { id: "bet_line", src: "./Assets/images/bet_line.gif" },
        { id: "bet1Button", src: "./Assets/images/bet1Button.png" },
        { id: "bet10Button", src: "./Assets/images/bet10Button.png" },
        { id: "bet100Button", src: "./Assets/images/bet100Button.png" },
        { id: "betMaxButton", src: "./Assets/images/betMaxButton.png" },
        { id: "blank", src: "./Assets/images/blank.gif" },
        { id: "cherry", src: "./Assets/images/cherry.gif" },
        { id: "grapes", src: "./Assets/images/grapes.gif" },
        { id: "orange", src: "./Assets/images/orange.gif" },
        { id: "quitButton", src: "./Assets/images/quitButton.png" },
        { id: "resetButton", src: "./Assets/images/resetButton.png" },
        { id: "seven", src: "./Assets/images/seven.gif" },
        { id: "spinButton", src: "./Assets/images/spinButton.png" },
    ];
    // This function triggers first and "Preloads" all the assets
    function Preload() {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);
        assets.loadManifest(manifest);
    }
    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start() {
        console.log("App Started...");
        let canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        Config.Globals.AssetManifest = assets;
        Main();
    }
    // called every fram
    function Update() {
        stage.update();
    }
    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
    /* Utility function to reset all fruit tallies */
    function resetFruitTally() {
        grapes = 0;
        bananas = 0;
        oranges = 0;
        cherries = 0;
        bars = 0;
        bells = 0;
        sevens = 0;
        blanks = 0;
    }
    /* Utility function to reset the player stats */
    function resetAll() {
        playerCredits = 1000;
        winnings = 0;
        jackpot = 5000;
        playerBet = 0;
    }
    /* Check to see if the player won the jackpot */
    function checkJackPot() {
        /* compare two random values */
        let jackPotTry = Math.floor(Math.random() * 51 + 1);
        let jackPotWin = Math.floor(Math.random() * 51 + 1);
        if (jackPotTry == jackPotWin) {
            jackpotMessageLabel.setText("Congratulations! You Won the Jackpot!");
            playerCredits += jackpot;
            jackpot = 1000;
        }
    }
    /* Utility function to show a win message and increase player money */
    function showWinMessage() {
        playerCredits += winnings;
        console.log("You won: " + winnings);
        console.log("Your credits: " + playerCredits);
        // Nice to have: update some kind of message label
        // Update winningsLabel
        winningsLabel.setText(winnings.toString());
        // Update the creditLabel
        creditLabel.setText(playerCredits.toString());
        resetFruitTally();
        checkJackPot();
    }
    /* Utility function to show a loss message and reduce player money */
    function showLossMessage() {
        playerCredits -= playerBet;
        console.log("You lost: " + playerBet);
        console.log("Your credits: " + playerCredits);
        // Update the creditLabel
        creditLabel.setText(playerCredits.toString());
        resetFruitTally();
    }
    /* When this function is called it determines the betLine results.
    e.g. Bar - Orange - Banana */
    function Reels() {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];
        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27): // 41.5% probability
                    betLine[spin] = "blank";
                    blanks++;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "grapes";
                    grapes++;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "banana";
                    bananas++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "orange";
                    oranges++;
                    break;
                case checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "cherry";
                    cherries++;
                    break;
                case checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "bar";
                    bars++;
                    break;
                case checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "bell";
                    bells++;
                    break;
                case checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "seven";
                    sevens++;
                    break;
            }
        }
        return betLine;
    }
    /* This function calculates the player's winnings, if any */
    function determineWinnings() {
        if (blanks == 0) {
            if (grapes == 3) {
                winnings = playerBet * 10;
            }
            else if (bananas == 3) {
                winnings = playerBet * 20;
            }
            else if (oranges == 3) {
                winnings = playerBet * 30;
            }
            else if (cherries == 3) {
                winnings = playerBet * 40;
            }
            else if (bars == 3) {
                winnings = playerBet * 50;
            }
            else if (bells == 3) {
                winnings = playerBet * 75;
            }
            else if (sevens == 3) {
                winnings = playerBet * 100;
            }
            else if (grapes == 2) {
                winnings = playerBet * 2;
            }
            else if (bananas == 2) {
                winnings = playerBet * 2;
            }
            else if (oranges == 2) {
                winnings = playerBet * 3;
            }
            else if (cherries == 2) {
                winnings = playerBet * 4;
            }
            else if (bars == 2) {
                winnings = playerBet * 5;
            }
            else if (bells == 2) {
                winnings = playerBet * 10;
            }
            else if (sevens == 2) {
                winnings = playerBet * 20;
            }
            else if (sevens == 1) {
                winnings = playerBet * 5;
            }
            else {
                winnings = playerBet * 1;
            }
            showWinMessage();
        }
        else {
            showLossMessage();
        }
    }
    function buildInterface() {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true);
        stage.addChild(slotMachineBackground);
        // Buttons
        spinButton = new UIObjects.Button("spinButton", Config.Screen.CENTER_X + 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(spinButton);
        bet1Button = new UIObjects.Button("bet1Button", Config.Screen.CENTER_X - 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet1Button);
        bet10Button = new UIObjects.Button("bet10Button", Config.Screen.CENTER_X - 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet10Button);
        bet100Button = new UIObjects.Button("bet100Button", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet100Button);
        betMaxButton = new UIObjects.Button("betMaxButton", Config.Screen.CENTER_X + 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(betMaxButton);
        resetButton = new UIObjects.Button("resetButton", Config.Screen.CENTER_X + 250, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(resetButton);
        quitButton = new UIObjects.Button("quitButton", Config.Screen.CENTER_X - 255, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(quitButton);
        // Labels
        jackPotLabel = new UIObjects.Label("99999999", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 175, true);
        stage.addChild(jackPotLabel);
        creditLabel = new UIObjects.Label("99999999", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(creditLabel);
        winningsLabel = new UIObjects.Label("99999999", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(winningsLabel);
        betLabel = new UIObjects.Label("9999", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(betLabel);
        errorMessageLabel = new UIObjects.Label(" ", "30px", "Consolas", "#000000", Config.Screen.CENTER_X - 150, Config.Screen.CENTER_Y - 120, false);
        stage.addChild(errorMessageLabel);
        jackpotMessageLabel = new UIObjects.Label(" ", "30px", "Consolas", "#D4AF37", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 120, true);
        stage.addChild(jackpotMessageLabel);
        // Reel GameObjects
        leftReel = new Core.GameObject("bell", Config.Screen.CENTER_X - 79, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(leftReel);
        middleReel = new Core.GameObject("banana", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(middleReel);
        rightReel = new Core.GameObject("bar", Config.Screen.CENTER_X + 78, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(rightReel);
        // Bet Line
        betLine = new Core.GameObject("bet_line", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(betLine);
    }
    function resetInterface() {
        jackPotLabel.setText(jackpot.toString());
        winningsLabel.setText("0");
        creditLabel.setText(playerCredits.toString());
        betLabel.setText("0");
        leftReel.image = assets.getResult("blank");
        middleReel.image = assets.getResult("blank");
        rightReel.image = assets.getResult("blank");
    }
    function interfaceLogic() {
        spinButton.on("click", () => {
            // Clear the winningsLabel
            winningsLabel.setText("0");
            // Clear winnings variable
            winnings = 0;
            // Check if we can spin the reels based on the availability of player money
            // if playerMoney > 0 then check that playerBet <= playerMoney
            // if not don't let the player spin
            if (playerCredits > 0 && playerBet <= playerCredits) {
                // reel test
                let reels = Reels();
                // example of how to replace the images in the reels
                leftReel.image = assets.getResult(reels[0]);
                middleReel.image = assets.getResult(reels[1]);
                rightReel.image = assets.getResult(reels[2]);
                determineWinnings();
                //  Clear the betLabel
                betLabel.setText("0");
                // Clear player bet
                playerBet = 0;
            }
            else {
                console.log("Not enough credits");
                errorMessageLabel.setText("Not Enough Credits");
                //  Clear the betLabel
                betLabel.setText("0");
                // Clear player bet
                playerBet = 0;
            }
        });
        bet1Button.on("click", () => {
            if (playerCredits > 0 && playerBet < playerCredits) {
                // Makes sure that errorMessageLabel won't show
                errorMessageLabel.setText("");
                // Add to playerBet
                playerBet += 1;
                console.log("Player Bet is: " + playerBet);
                // Update betLabel
                betLabel.setText(playerBet.toString());
            }
            else {
                console.log("Not enough credits");
                errorMessageLabel.setText("Not Enough Credits");
            }
        });
        bet10Button.on("click", () => {
            if (playerCredits > 0 && playerBet < playerCredits) {
                // Makes sure that errorMessageLabel won't show
                errorMessageLabel.setText("");
                // Add to playerBet
                playerBet += 10;
                console.log("Player Bet is: " + playerBet);
                // Update betLabel
                betLabel.setText(playerBet.toString());
            }
            else {
                console.log("Not enough credits");
                errorMessageLabel.setText("Not Enough Credits");
            }
        });
        bet100Button.on("click", () => {
            if (playerCredits > 0 && playerBet < playerCredits) {
                // Makes sure that errorMessageLabel won't show
                errorMessageLabel.setText("");
                // Add to playerBet
                playerBet += 100;
                console.log("Player Bet is: " + playerBet);
                // Update betLabel
                betLabel.setText(playerBet.toString());
            }
            else {
                console.log("Not enough credits");
                errorMessageLabel.setText("Not Enough Credits");
            }
        });
        betMaxButton.on("click", () => {
            if (playerCredits > 0 && playerBet < playerCredits) {
                // Makes sure that errorMessageLabel won't show
                errorMessageLabel.setText("");
                // Add to playerBet
                playerBet = playerCredits;
                console.log("Player Bet is: " + playerBet);
                // Update betLabel
                betLabel.setText(playerBet.toString());
            }
            else {
                console.log("Not enough credits");
                errorMessageLabel.setText("Not Enough Credits");
            }
        });
        resetButton.on("click", () => {
            console.log("Reset button clicked");
            resetAll();
            jackPotLabel.setText(jackpot.toString());
            winningsLabel.setText("0");
            creditLabel.setText(playerCredits.toString());
            betLabel.setText("0");
            leftReel.image = assets.getResult("blank");
            middleReel.image = assets.getResult("blank");
            rightReel.image = assets.getResult("blank");
            // Makes sure that errorMessageLabel won't show
            errorMessageLabel.setText("");
        });
        quitButton.on("click", () => {
            console.log("Quit button clicked");
            resetAll();
            jackPotLabel.setText(" ");
            winningsLabel.setText(" ");
            creditLabel.setText(" ");
            betLabel.setText(" ");
            leftReel.image = assets.getResult("blank");
            middleReel.image = assets.getResult("blank");
            rightReel.image = assets.getResult("blank");
            // Makes sure that errorMessageLabel won't show
            errorMessageLabel.setText("");
        });
    }
    // app logic goes here
    function Main() {
        buildInterface();
        resetInterface();
        interfaceLogic();
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=app.js.map