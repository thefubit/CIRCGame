//CIRC - Main Menu LAyer

//to check whether the layer already exists - prevents duplicates
var MENUINITIALIZED = false;
var testspeed = 10;

//The main layer of this scene
var MenuLayer = cc.Layer.extend({
    backgroundPic:null,
    helloLabel:null,
    tempscore:0,
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
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
        /////////////////////////////

        // add "HelloWorld" splash screen"
        
        this.backgroundPic = new cc.Sprite(res.Background_png);
        this.backgroundPic.attr({
            x: size.width / 2,
            y: size.height / 2,
            scaleX : size.width/this.backgroundPic.width,
            scaleY : size.height/this.backgroundPic.height
        });
        this.addChild(this.backgroundPic, 0);
        



        //things to be done in main menu
        //display animated title picture
        //show a spinning game slowly/consistent - 
        //show touch to play in middle - then on touch, initiate the game
        //settings button - leading to settings page
        //display background
        //mail button




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
            scale:0.5
        });

        cc.log(size.width/2);
        cc.log(size.height/10);

        //adding rotationpoint to layer
        this.addChild(this.rotationPoint);
        
        //rotating - works - irrevelevant at the moment
        var rotatePoint = new cc.RotateBy(testspeed,360);
        var rotateForever = new cc.RepeatForever(rotatePoint);
        this.rotationPoint.runAction(rotateForever);
        
        //var repeataction = cc.Repeat.create(this.increasespeed,2);
        //this.runAction(repeataction);


        /////////////////////MAIN MENU ROTATOR//////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////TRAILING EFFECTS/////////////////////////


        var MenuTrail = new cc.ParticleSystem.create(res.TestParticle_plist);

        MenuTrail.setTag(1);

        MenuTrail.attr({
            x: this.dot.x,
            y: this.dot.y,
        });


        //fabulous mode
        //MenuTrail.setStartColor(cc.color(255,0,0));
        //MenuTrail.setEndColor(cc.color(0,255,0));

        this.rotationPoint.addChild(MenuTrail);





        //for testing
        //abyss/background spinning
        var BackgroundSpin = new cc.ParticleSystem.create(res.Abyss_plist);
        BackgroundSpin.setTag(2);

        BackgroundSpin.attr({
            x:size.width/2,
            y: size.height/2,
        });

        this.addChild(BackgroundSpin);



        ////////////////////TRAILING EFFECTS////////////////////////
        ////////////////////////////////////////////////////////////















        //this.scheduleOnce(this.increasespeed,3);
        cc.log("speed"+ testspeed);
        //this.scheduleOnce(this.increasespeed,6);
    

        //default code from setup - REPLACE it as needed
        // add a "close" icon to exit the progress. it's an autorelease object
        //image as a menu 
        var SettingsButton = new cc.MenuItemImage(
            res.SettingsButton_png,
            res.SettingsButtonPressed_png,
            function () {
                cc.log("Menu is clicked!");
                GoToSettings();
                cc.log("go to settings");
            }, this);
        SettingsButton.attr({
            x: 100,
            y: size.height/4*3,
            anchorX: 0.5,
            anchorY: 0.5,
            scale:0.4
        });

        var MailButton = new cc.MenuItemImage(
            res.MailButton_png,
            res.MailButtonPressed_png,
            function(){
                cc.log("Go to mail");
                //StartGame();
                this.increasespeed();
                cc.log("increase speed");




            },this);
        MailButton.attr({
            x : size.width-100,
            y : size.height /4*3,
            anchorX : 0.5,
            anchorY : 0.5,
            scale : 0.4
        });
        MailButton.setScale(0.4);
        



        var menu = new cc.Menu(SettingsButton,MailButton);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        
        var scorelabel = "Touch To Start";
        this.helloLabel = new cc.LabelTTF(scorelabel, "Verdana", 38);
        // position the label on the center of the screen
        this.helloLabel.x = size.width / 2;
        this.helloLabel.y = size.height/2;
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 5);
        
        //this.schedule(this.updatescore,0);











        //////////////////////////////////////
        ////////////TITLE/////////////////////

        /*
        var TitleSprite = new cc.Sprite.create(res.GameTitle_png);
        TitleSprite.setAnchorPoint(cc.p(0.5,0.5));
        TitleSprite.setPosition(size.width/2,size.height/4*3);
        TitleSprite.setScale(0.3);
        this.addChild(TitleSprite);
        */

        


        /*

        //load sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.animatedTitle_plist);

        this.spriteSheet = new cc.SpriteBatchNode(res.animatedTitle_png);
        this.addChild(this.spriteSheet);
        
        //create sprite frame array
        var animFrames = [];
        for (var i = 1; i < 16; i++){
            var str = "circgreen"+i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        
        }
        
        var animation = new cc.Animation(animFrames,0.1);//spriteframe array and period time
        
        //repeating forever
        this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
        this.TitleSprite = new cc.Sprite("#circgreen1.png");

        this.TitleSprite.attr({x:400,y:300,scale:0.25});
        this.TitleSprite.runAction(this.runningAction);
        this.TitleSpriteSheet.addChild(this.TitleSprite);
        
        */

        cc.spriteFrameCache.addSpriteFrames(res.animatedTitle_plist);

        this.spriteSheet = new cc.SpriteBatchNode(res.animatedTitle_png);
        this.addChild(this.spriteSheet);

        //create sprite frame array
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

        this.TitleSprite.attr({x:size.width/2,y:size.height/4*3,scale:1/2.5});
        this.TitleSprite.runAction(this.runningAction);
        this.spriteSheet.addChild(this.TitleSprite);






        ////////////TITLE/////////////////////
        //////////////////////////////////////

        if (cc.sys.capabilities.hasOwnProperty('touches')){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,

                onTouchBegan:function(touch,event){
                    cc.log("touch detected");
                    StartGame();
                    //
                    /*
                    var UpLayer = event.getCurrentTarget();
                    UpLayer.increasespeed();
                    cc.log("increase speed");
                    */


                    return true;
                },

            },this);
        }//if touch








        //enter code above
        return true;
    },//ctor function - main code

    updatescore:function(){
        this.tempscore++;
        this.helloLabel.setString("Score:"+this.tempscore);
    },

    increasespeed:function(){
        cc.log("current speed" +testspeed);

        testspeed=testspeed-4;
        if (testspeed<1){testspeed=1;};
        cc.log("new speed " + testspeed);
        var rotatePoint = new cc.RotateBy(testspeed,360);
        var rotateForever = new cc.RepeatForever(rotatePoint);
        this.rotationPoint.runAction(rotateForever);
    }
    


});//GameLayer

//insert public functions here
var GoToSettings = function(){
    cc.log("test1");
    var scene = new SettingsScene();
    cc.log("test2");
    cc.director.pushScene(scene);

};

var StartGame = function(){
    cc.log("this removes the menu layer");
    MENUINITIALIZED = false;
    var scene = new GameScene();
    cc.director.runScene(new cc.TransitionFade(0.5,scene));
};


//insert go to mail function
var SendMail = function(){
    cc.log("launch go to mail function");



};


var increasespeed = function(){
    testspeed = testspeed-8;
}

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

