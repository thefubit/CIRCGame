//CIRC - Main Menu LAyer

//to check whether the layer already exists - prevents duplicates
var MENUINITIALIZED = false;
var testspeed = 10;

//The main layer of this scene
var MenuLayer = cc.Layer.extend({
    backgroundPic:null,
    helloLabel:null,
    dot:null,
    rotationPoint:null,
    
    //animated title
    sprite:null,
    spriteSheet:null,
    animatedAction:null,
    runningAction:null,
    TitleSprite:null,


    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        //normalizing and finding screen size
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
        //////////////////////////////////////////////////////
        ////////////////MAIN MENU ROTATOR/////////////////////
        //rotation point
        this.rotationPoint = new cc.Node();
        this.rotationPoint.attr({
            
            x: size.width/2,
            y: size.height/2,
            //anchorX : 0.5,
            //anchorY : 0.5
        });
        
        //making the moon
        this.dot = new cc.Sprite(res.InnerSatellite_png);
        
        //adding moon to rotation point
        this.rotationPoint.addChild(this.dot);

        //setting location of the moon
        this.dot.attr({
            x: 0,
            y: size.height/8*3,
            scale:0.5*normalizescale,
        });

        //adding rotationpoint to layer
        this.addChild(this.rotationPoint);
        
        //rotating - works - irrevelevant at the moment
        var rotatePoint = new cc.RotateBy(testspeed,360);
        var rotateForever = new cc.RepeatForever(rotatePoint);
        this.rotationPoint.runAction(rotateForever);
        /////////////////////MAIN MENU ROTATOR//////////////////////
        ///////////////////////////////////////////////////////////
        //setting the buttons
        //settings button
        var SettingsButton = new cc.MenuItemImage(
            res.SettingsButton_png,
            res.SettingsButtonPressed_png,
            function () {
                GoToSettings();
            }, this);
        SettingsButton.attr({
            x: 100,
            y: size.height/4*3,
            anchorX: 0.5,
            anchorY: 0.5,
            scale:0.8*normalizescale,
        });
        //credits button
        var CreditsButton = new cc.MenuItemImage(
            res.CreditsButton_png,
            res.CreditsButtonPressed_png,
            function(){
                this.increasespeed();
                GoToCredits();
            },this);
        CreditsButton.attr({
            x : size.width-100,
            y : size.height /4*3,
            anchorX : 0.5,
            anchorY : 0.5,
            scale : 0.8*normalizescale,
        });

        var menu = new cc.Menu(SettingsButton,CreditsButton);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
        /////////////BUTTONS///////////////////

        /////////////////////START INSTRUCTIONS LABEL////////
        this.helloLabel = new cc.LabelBMFont("TOUCH TO START",res.Junegull_BMFont);
        this.helloLabel.x = size.width / 2;
        this.helloLabel.y = size.height/2;
        this.helloLabel.color = cc.color(100,150,150);
        this.helloLabel.setScale(2*normalizescale);
        this.addChild(this.helloLabel, 5);
        /////////////////////START INSTRUCTIONS LABEL/////////////

        /////////////////////SHOW HIGHSCORE///////////////////////

        var highScoreNum = new cc.LabelBMFont(highScore, res.Junegull_BMFont);
        highScoreNum.x = size.width/18*10;
        highScoreNum.y = size.height/10*3;
        highScoreNum.setScale(normalizescale);
        this.addChild(highScoreNum,5);

        var highScoreSymbol = new cc.Sprite.create(res.HighScoreSymbol_png);
        highScoreSymbol.x = size.width/18*8;
        highScoreSymbol.y = size.height/10*3;
        highScoreSymbol.setScale(0.5*normalizescale);
        this.addChild(highScoreSymbol);

        ////////////////////SHOW HIGHSCORE//////////////////////////

        //////////////////////////////////////
        ////////////ANIMATED TITLE/////////////////////
        cc.spriteFrameCache.addSpriteFrames(res.animatedTitle_plist);

        this.spriteSheet = new cc.SpriteBatchNode(res.animatedTitle_png);
        this.addChild(this.spriteSheet);

        var animFrames = [];
        for (var i = 1; i < 16; i++){
            var str = circcolor+i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames,0.1);//spriteframe array and period time

        //repeating forever
        this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
        var filename = "#" + circcolor + "1.png";
        this.TitleSprite = new cc.Sprite(filename);

        this.TitleSprite.attr({x:size.width/2,y:size.height/4*3,scale:0.4*normalizescale});
        this.TitleSprite.runAction(this.runningAction);
        this.spriteSheet.addChild(this.TitleSprite);
        ////////////ANIMATED TITLE/////////////////////
        //////////////////////////////////////

        if (cc.sys.capabilities.hasOwnProperty('touches')){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,

                onTouchBegan:function(touch,event){

                    StartGame();
                    return true;
                },

            },this);
        }//if touch

        return true;
    },//ctor function - main code

    increasespeed:function(){
        testspeed=testspeed-4;
        if (testspeed<1){testspeed=1;};
            var rotatePoint = new cc.RotateBy(testspeed,360);
            var rotateForever = new cc.RepeatForever(rotatePoint);
            this.rotationPoint.runAction(rotateForever);
    },//increase speed function
});//GameLayer

//insert public functions here
var GoToSettings = function(){
    cc.log("test1");
    var scene = new SettingsScene();
    cc.log("test2");
    cc.director.pushScene(scene);

};

//go to credits to page
var GoToCredits = function(){
    cc.log("Going to Credits now");
    var scene = new CreditsScene();
    cc.director.pushScene(scene);
};

//starting the game
var StartGame = function(){
    cc.log("this removes the menu layer");
    MENUINITIALIZED = false;
    var scene = new GameScene();
    cc.director.runScene(new cc.TransitionFade(0.5,scene));
};

//just a little demo of increasing the speed
//easter egg
var increasespeed = function(){
    testspeed = testspeed-8;
}


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        

        if (MENUINITIALIZED == false){
            MENUINITIALIZED = true;
            testspeed = 10;
            var layer = new MenuLayer();
            this.addChild(layer);
        }//check whether initialized
    }//initiate the scene on enter
});//main function to initiate the scene

