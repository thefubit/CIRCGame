//CIRC - Main Game LAyer

//to check whether the layer already exists - prevents duplicates
var UNDERINITIALIZED = false;

//The main layer of this scene
var UnderLayer = cc.Layer.extend({
    sprite:null,
    
    //consecutiveTouches:0,
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
        //this.sprite.setScale(0.5);
        this.addChild(this.sprite, 0);

        //start playing music
        cc.audioEngine.playMusic(res.Background_music, true);
        this.schedule(cc.audioEngine.setMusicVolume(musicVolume),1);


        GoStraightToMainMenu();
        

        return true;
    },//ctor function - main code






});//GameLayer



var GoStraightToMainMenu = function(){
    var scene = new MenuScene();
    cc.director.pushScene(scene);
}


///////////////////////////////////////////
var UnderScene = cc.Scene.extend({
    //to try to access the scene/layer from global function
    AccessLayer:null,

    onEnter:function () {
        this._super();

        


        if (UNDERINITIALIZED == false){
            UNDERINITIALIZED = true;
            var layer = new UnderLayer();
            this.addChild(layer);

        //setting myLayer to something
        this.AccessLayer = layer;
        }//check whether initialized
    }//initiate the scene on enter
});//main function to initiate the scene

