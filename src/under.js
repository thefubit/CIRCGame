//CIRC - Main Game LAyer

//to check whether the layer already exists - prevents duplicates
var UNDERINITIALIZED = false;
var TurboMusic = null;

//The main layer of this scene
var UnderLayer = cc.Layer.extend({
    backgroundPic:null,
    
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
        //normalizing scale according to current screen size
        var normalizescale = size.height/640;
        /////////////////////////////




        // add "HelloWorld" splash screen"
        this.backgroundPic = new cc.Sprite(res.TTRCGamesLogo_png);
        this.backgroundPic.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.backgroundPic.setScale(0.4*normalizescale);
        this.addChild(this.backgroundPic, 0);

        //start playing music
        cc.audioEngine.playMusic(res.Background_music, true);
        this.schedule(cc.audioEngine.setMusicVolume(musicVolume),1);

        
        //preload into system
        cc.audioEngine.playEffect(res.TurboBackground_music,false);
        cc.audioEngine.stopAllEffects();




        this.scheduleOnce(GoStraightToMainMenu(),2);
        

        return true;
    },//ctor function - main code






});//GameLayer



var GoStraightToMainMenu = function(){
    var scene = new MenuScene();
    cc.director.pushScene(new cc.TransitionFade(0.5,scene));
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

