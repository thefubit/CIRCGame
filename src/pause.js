//CIRC - Pause Game LAyer

//to check whether the layer already exists - prevents duplicates
var PAUSEINITIALIZED = false;

//The main layer of this scene
var PauseLayer = cc.Layer.extend({
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



        //pause functionality
        //main menu button
        //resume button




        //default code from setup - REPLACE it as needed
        // add a "close" icon to exit the progress. it's an autorelease object
        //image as a menu 

        var ResumeButton = new cc.MenuItemImage(
            res.PlayButton_png,
            res.PlayButtonPressed_png,
            function () {
                
                cc.log(testvar);
                cc.log("unpause");
                Unpause();
            }, this);
        ResumeButton.attr({
            x: size.width/3*2,
            y: size.height/4,
            anchorX: 0.5,
            anchorY: 0.5,
            scale:0.4
        });

        var MainMenuButton = new cc.MenuItemImage(
            res.HomeButton_png,
            res.HomeButtonPressed_png,
            function(){
                cc.log("goes to main menu");
                GoToMainMenu();
            },this);
        MainMenuButton.attr({
            x : size.width/3,
            y : size.height/4,
            anchorX : 0.5,
            anchorY : 0.5,
            scale: 0.4
        });


        var menu = new cc.Menu(ResumeButton, MainMenuButton);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Pause", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height/2;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.Background_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scaleX : size.width/this.sprite.width,
            scaleY : size.height/this.sprite.height
        });
        this.addChild(this.sprite, 0);

        


        //enter code above
        return true;
    }//ctor function - main code
});//GameLayer

//insert public functions here
var Unpause = function(){
    PAUSEINITIALIZED = false;
    cc.director.popScene();
};

var GoToMainMenu = function (){
    PAUSEINITIALIZED = false;

    Unpause();
    cc.log("test whether it'll run")
    //GameOver();
    
    

    var scene = new MenuScene;
    cc.director.runScene(scene);
};

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

