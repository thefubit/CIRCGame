//CIRC - Main Game LAyer

//to check whether the layer already exists - prevents duplicates
var GAMEOVERINITIALIZED = false;
var MISSLOSS = false;
var UNTOUCHEDLOSS = false; //must test this before misslosss
var SLOWLOSS = false;

//The main layer of this scene
var GameOverLayer = cc.Layer.extend({
    backgroundPic:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
                                    
        turbofactor = 1;
        regularfactor = 1;

        /////////////////////////////
        //screen size and normalizing
        var size = cc.winSize;
        var normalizescale = size.height/640;
        /////////////////////////////
        //backgrounds
        this.backgroundPic = new cc.Sprite(res.Background_png);
        this.backgroundPic.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.backgroundPic.setScale(0.8*normalizescale);
        this.addChild(this.backgroundPic, 0);

        //play game over sound
        cc.audioEngine.pauseMusic();
        cc.audioEngine.playEffect(res.GameOverSound,false);
        cc.audioEngine.resumeMusic();

        //main menu button
        var MainMenuButton = new cc.MenuItemImage(
            res.HomeButton_png,
            res.HomeButtonPressed_png,
            function () {
                cc.log("Menu is clicked!");
                RestartMainMenu();
            }, this);
        MainMenuButton.attr({
            x: size.width/2,
            y: size.height/6,
            anchorX: 0.5,
            anchorY: 0.5,
            scale : 0.8*normalizescale,
        });

        var menu = new cc.Menu(MainMenuButton);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        //////////////////LABELS////////////////////////////
        var gameoverLabel = new cc.LabelBMFont("GAME OVER", res.Ethnocentric_BMFont);
        // position the label on the center of the screen
        gameoverLabel.x = size.width / 2;
        gameoverLabel.y = size.height/5*4;
        gameoverLabel.setScale(2*normalizescale);
        gameoverLabel.color = cc.color(100,150,150);
        // add the label as a child to this layer
        this.addChild(gameoverLabel, 5);
        //////////////////////LABELS////////////////////


        //////////////////////////////////
        //////////REASON/////////////

        var reasonLabel = new cc.LabelBMFont("You missed twice in a row!", res.Junegull_BMFont);
        reasonLabel.x = size.width/2;
        reasonLabel.y = size.height/6*4;
        reasonLabel.setScale(normalizescale);
        reasonLabel.color=cc.color(100,150,150);
        this.addChild(reasonLabel,5);


        ///////////////REASON////////////////////
        ///////////////////////////////////

        ///////////////SCORES///////////////
        //score numbers
        var highScoreNum = new cc.LabelBMFont(highScore, res.Junegull_BMFont);
        highScoreNum.x = size.width/2;
        highScoreNum.y = size.height/6*2;
        highScoreNum.setScale(normalizescale);
        this.addChild(highScoreNum,5);

        var yourScoreNum = new cc.LabelBMFont(""+currentScore,res.Junegull_BMFont);
        yourScoreNum.x = size.width/2;
        yourScoreNum.y = size.height/6*3;
        yourScoreNum.setScale(normalizescale);
        this.addChild(yourScoreNum,5);

        //score symbols
        var highScoreSymbol = new cc.Sprite.create(res.HighScoreSymbol_png);
        highScoreSymbol.attr({
            x: size.width/10*4,
            y: size.height/6*2,
            scale: 0.5*normalizescale,
        });
        this.addChild(highScoreSymbol);

        var yourScoreSymbol = new cc.Sprite.create(res.YourScoreSymbol_png);
        yourScoreSymbol.attr({
            x: size.width/10*4,
            y: size.height/6*3,
            scale: 0.5*normalizescale,
        });
        this.addChild(yourScoreSymbol);
        /////////////////SCORES////////////////////
        //////////////////////////////////////////
        return true;
    }//ctor function - main code
});//GameLayer

//Use go to main menu
var RestartMainMenu = function(){
    GAMEOVERINITIALIZED = false;
    MISSLOSS = false;
    UNTOUCHEDLOSS = false;
    currentScore = 0;
    turboMode = false;
    scene = new MenuScene();
    cc.director.runScene(new cc.TransitionFade(0.5,scene));
};

///////////////////////////////////////////////////
///////////////////////////////////////////////////
var GameOverScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        if (GAMEOVERINITIALIZED == false){
            GAMEOVERINITIALIZED = true;
            var layer = new GameOverLayer();
            this.addChild(layer);
        }//check whether initialized
    }//initiate the scene on enter
});//main function to initiate the scene

