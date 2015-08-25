//CIRC - Pause Game LAyer

//to check whether the layer already exists - prevents duplicates
var PAUSEINITIALIZED = false;

//The main layer of this scene
var PauseLayer = cc.Layer.extend({
    backgroundPic:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        //normalizing the window size and setting the size
        var size = cc.winSize;
        var normalizescale = size.height/640;
        /////////////////////////////
        //background pictures
        this.backgroundPic = new cc.Sprite(res.Background_png);
        this.backgroundPic.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.backgroundPic.setScale(0.8*normalizescale);
        this.addChild(this.backgroundPic, 0);

        //////////////////////////////////////////
        ///////////////////BUTTONS////////////////
        var ResumeButton = new cc.MenuItemImage(
            res.PlayButton_png,
            res.PlayButtonPressed_png,
            function () {
                Unpause();
            }, this);
        ResumeButton.attr({
            x: size.width/3*2,
            y: size.height/2,
            anchorX: 0.5,
            anchorY: 0.5,
            scale:0.8*normalizescale,
        });

        var MainMenuButton = new cc.MenuItemImage(
            res.HomeButton_png,
            res.HomeButtonPressed_png,
            function(){
                GoToMainMenu();
            },this);
        MainMenuButton.attr({
            x : size.width/3,
            y : size.height/2,
            anchorX : 0.5,
            anchorY : 0.5,
            scale: 0.8*normalizescale,
        });


        var menu = new cc.Menu(ResumeButton, MainMenuButton);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        ///////////////BUTTONS/////////////
        /////////////////////////////
        
        //PAUSE TITLE
        var pauseLabel = new cc.LabelBMFont("PAUSE", res.Ethnocentric_BMFont);
        // position the label on the center of the screen
        pauseLabel.x = size.width / 2;
        pauseLabel.y = size.height/4*3;
        pauseLabel.color = cc.color(100,150,150);
        pauseLabel.setScale(2*normalizescale);
        // add the label as a child to this layer
        this.addChild(pauseLabel, 5);


        return true;
    }//ctor function - main code
});//GameLayer

//unpause function-return to game
var Unpause = function(){
    PAUSEINITIALIZED = false;
    cc.director.popScene();
};

//go to main menu
var GoToMainMenu = function (){
    //resetting all the variables
    PAUSEINITIALIZED = false;
    GAMEINITIALIZED = false;

    NEWGAME = true;
    levelInner = 0;//controlling level of inner satellite
    speedInner = 0;//controlling the speed of inner satellite
    levelOuter = 0;//controlling level of outer satellite
    speedOuter = 0;//controlling speed of inner satellite
    currentScore = 0;
    turbofactor = 0.95;
    regularfactor = 1;
    
    
    //checking for consecutive touches
    consecutiveTouches = 0;
    
    //default speed
    baseSpeed = 9;
    
    //turbo tracker
    turboCount = 0;
    turboMode = false;

    //removing the trails
    innerTrail = false;
    outerTrail = false;
    canLose = true;
    
    //resetting music
    cc.audioEngine.stopAllEffects();
    
    if (!cc.audioEngine.isMusicPlaying())
    {
        cc.audioEngine.resumeMusic();
    }
    
    //changing the scene to menu
    var scene = new MenuScene;
    cc.director.runScene(scene);
};


//////////////////////////////////////////////
///////////////////////////////////////////////
var PauseScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        if (PAUSEINITIALIZED == false){
            PAUSEINITIALIZED = true;
            var layer = new PauseLayer();
            this.addChild(layer);
        }//check whether initialized
    }//initiate the scene on enter
});//main function to initiate the scene

