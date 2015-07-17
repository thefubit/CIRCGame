//CIRC - Settings LAyer

//to check whether the layer already exists - prevents duplicates
var CREDITSINITIALIZED = false;


//The main layer of this scene
var CreditsLayer = cc.Layer.extend({
    sprite:null,

    //trying animations here
    sprite1:null,
    spriteSheet:null,
    animatedAction:null,

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


        //make a UI toggle for volume
        //make a slider for volume - not necessary
        //return to menu - pop this scene



        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.Background_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scaleX : size.width/this.sprite.width,
            scaleY : size.height/this.sprite.height
            
        });
        this.addChild(this.sprite, 0);




        //default code from setup - REPLACE it as needed
        // add a "close" icon to exit the progress. it's an autorelease object
        //image as a menu 
        var MainMenuButton= new cc.MenuItemImage(
            res.HomeButton_png,
            res.HomeButtonPressed_png,
            function () {
                cc.log("Menu is clicked!");
                cc.log(testvar);
                ReturnToMenuFromCredits();
                cc.log("returning to menu")
            }, this);
        MainMenuButton.attr({
            x: size.width/2,
            y: size.height/5,
            anchorX: 0.5,
            anchorY: 0.5,
            scale : 0.4,
        });



        /* POSTPONING THIS FUNCTIONALITY

        var MailButton = new cc.MenuItemImage(
            res.MailButton_png,
            res.MailButtonPressed_png,
            function(){
                cc.log("mail button pressed");
//<<<<<<< HEAD
                //window.location.href = 'mailto:ymotqy@hotmail.com';
//=======
                window.location = 'mailto:this.that@here.com';
                                              
//>>>>>>> origin/master

            },this);

        MailButton.attr({
            x:size.width/6*4,
            y: size.height/4,
            anchorX:0.5,
            anchorY: 0.5,
            scale: 1/2.5,


            });
            */

        var menu = new cc.Menu(MainMenuButton);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        //var helloLabel = new cc.LabelTTF("Settings", "Arial", 38);
        var CreditsLabel = new cc.LabelBMFont("CREDITS",res.Ethnocentric_BMFont);
        // position the label on the center of the screen
        CreditsLabel.x = size.width / 2;
        CreditsLabel.y = size.height/6*5;
        CreditsLabel.setScale(2);
        // add the label as a child to this layer
        this.addChild(CreditsLabel, 5);

        var EmailUs = new cc.LabelBMFont("Email Us At: ttrcgames@outlook.com",res.Junegull_BMFont);
        EmailUs.x = size.width/2;
        EmailUs.y = size.height/3*2;
        EmailUs.setScale(1.2);
        this.addChild(EmailUs);




        //giving knowledge
        var GameMadeBy = new cc.LabelBMFont("Game made with Cocos2d.",res.Junegull_BMFont);
        GameMadeBy.x = size.width/2;
        GameMadeBy.y = size.height/2 - 10;
        GameMadeBy.setScale(0.7);
        this.addChild(GameMadeBy);

        var MusicMadeBy = new cc.LabelBMFont("Music made with AUXY.",res.Junegull_BMFont);
        MusicMadeBy.x = size.width/2;
        MusicMadeBy.y = GameMadeBy.y-40;
        MusicMadeBy.setScale(0.7);
        this.addChild(MusicMadeBy);

        var SFXMadeBy = new cc.LabelBMFont("SFX made with www.bfxr.net", res.Junegull_BMFont);
        SFXMadeBy.x = size.width/2;
        SFXMadeBy.y = MusicMadeBy.y-40;
        SFXMadeBy.setScale(0.7);
        this.addChild(SFXMadeBy);        











        
        
        

























        //enter code above
        return true;
    },//ctor function - main code








});//GameLayer

//insert public functions here
var ReturnToMenuFromCredits = function(){
   CREDITSINITIALIZED = false;
    cc.director.popScene();
    
};


var CreditsScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        if (CREDITSINITIALIZED == false){
            CREDITSINITIALIZED = true;
            var layer = new CreditsLayer();
            this.addChild(layer);
        }//check whether initialized
    }//initiate the scene on enter
});//main function to initiate the scene

