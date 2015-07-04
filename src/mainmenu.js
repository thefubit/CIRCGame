//CIRC - Main Menu LAyer

//to check whether the layer already exists - prevents duplicates
var MENUINITIALIZED = false;
var testspeed = 10;

//The main layer of this scene
var MenuLayer = cc.Layer.extend({
    sprite:null,
    helloLabel:null,
    tempscore:0,
    dot:null,
    rotationPoint:null,
    earth:null,
    moon:null,
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
        



        //things to be done in main menu
        //display animated title picture
        //show a spinning game slowly/consistent - 
        //show touch to play in middle - then on touch, initiate the game
        //settings button - leading to settings page
        //display background
        //mail button





        
        
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
                StartGame();
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


        

        
        var TitleSprite = new cc.Sprite.create(res.GameTitle_png);
        TitleSprite.setAnchorPoint(cc.p(0.5,0.5));
        TitleSprite.setPosition(size.width/2,size.height/4*3);
        TitleSprite.setScale(0.3);
        this.addChild(TitleSprite);


        if (cc.sys.capabilities.hasOwnProperty('touches')){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,

                onTouchBegan:function(touch,event){
                    cc.log("touch detected");
                    //StartGame();
                    //
                    var UpLayer = event.getCurrentTarget();
                    UpLayer.increasespeed();
                    cc.log("increase speed");



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

