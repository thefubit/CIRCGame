//CIRC - Main Game LAyer

//to check whether the layer already exists - prevents duplicates
var GAMEOVERINITIALIZED = false;
var MISSLOSS = false;
var UNTOUCHEDLOSS = false; //must test this before misslosss
var SLOWLOSS = false;

//The main layer of this scene
var GameOverLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
        /////////////////////////////
        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.Background_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scaleX : size.width/this.sprite.width,
            scaleY : size.height/this.sprite.height
        });


        this.addChild(this.sprite, 0);

        //display gameover
        //display highscore from local storage
        //display your score
        //set score to high score
        //link to main menu

        //play game over sound
        cc.audioEngine.pauseMusic();
        cc.audioEngine.playEffect(res.GameOverSound,false);
        cc.audioEngine.resumeMusic();


        //default code from setup - REPLACE it as needed
        // add a "close" icon to exit the progress. it's an autorelease object
        //image as a menu 
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
            scale : 0.4
        });

        var menu = new cc.Menu(MainMenuButton);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var gameoverLabel = new cc.LabelBMFont("GAME OVER", res.Ethnocentric_BMFont);
        // position the label on the center of the screen
        gameoverLabel.x = size.width / 2;
        gameoverLabel.y = size.height/5*4;
        gameoverLabel.setScale(2);
        // add the label as a child to this layer
        this.addChild(gameoverLabel, 5);


        //////////////////////////////////
        //////////why you lost/////////////

        var reasonLabel = new cc.LabelBMFont("reason", res.Junegull_BMFont);
        reasonLabel.x = size.width/2;
        reasonLabel.y = size.height/6*4;

        if(UNTOUCHEDLOSS  == true){
            reasonLabel.setString("Where did you go?");
        }
        else if (MISSLOSS == true){
            reasonLabel.setString("You missed 2 in a row!")
        }
        else if (SLOWLOSS == true){
            reasonLabel.setString("You slowed down too much!");
        }
        
        this.addChild(reasonLabel,5);



        ///////////////////////////////////

        ///////////////SCORES///////////////
        highscore = ls.getItem("highscore");

        //var highScoreNum = new cc.LabelTTF("Highscore:"+highscore,"Verdana",30);
        var highScoreNum = new cc.LabelBMFont(highscore, res.Junegull_BMFont);
        highScoreNum.x = size.width/2;
        highScoreNum.y = size.height/6*2;
        this.addChild(highScoreNum,5);

        //var yourScoreNum = new cc.LabelTTF("Your Score:"+currentScore,"Verdana",30);
        var yourScoreNum = new cc.LabelBMFont(""+currentScore,res.Junegull_BMFont);
        yourScoreNum.x = size.width/2;
        yourScoreNum.y = size.height/6*3;
        this.addChild(yourScoreNum,5);



        var highScoreSymbol = new cc.Sprite.create(res.HighScoreSymbol_png);
        highScoreSymbol.attr({
            x: size.width/10*4,
            y: size.height/6*2,
            scale: 1/4,
        });
        this.addChild(highScoreSymbol);

        var yourScoreSymbol = new cc.Sprite.create(res.YourScoreSymbol_png);
        yourScoreSymbol.attr({
            x: size.width/10*4,
            y: size.height/6*3,
            scale: 1/4,
        });
        this.addChild(yourScoreSymbol)


        /////////////////SCORES////////////////////
        //////////////////////////////////////////





        

        


        //enter code above
        return true;
    }//ctor function - main code
});//GameLayer

//insert public functions here

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

