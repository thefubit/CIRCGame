//CIRC - Settings LAyer

//to check whether the layer already exists - prevents duplicates
var SETTINGSINITIALIZED = false;
var musicVolume = 0.5;
var sfxVolume = 1;

//The main layer of this scene
var SettingsLayer = cc.Layer.extend({
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







        //default code from setup - REPLACE it as needed
        // add a "close" icon to exit the progress. it's an autorelease object
        //image as a menu 
        var MainMenuButton= new cc.MenuItemImage(
            res.HomeButton_png,
            res.HomeButtonPressed_png,
            function () {
                cc.log("Menu is clicked!");
                cc.log(testvar);
                ReturnToMenu();
                cc.log("returning to menu")
            }, this);
        MainMenuButton.attr({
            x: size.width/2,
            y: size.height/4,
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
        var helloLabel = new cc.LabelTTF("Settings", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.width/2;
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

        
        //music symbol
        var MusicSymbol = new cc.Sprite.create(res.MusicSymbol_png);
        MusicSymbol.setAnchorPoint(cc.p(0.5,0.5));
        MusicSymbol.setPosition(cc.p(size.width/5*2,size.height/10*7));
        MusicSymbol.setScale(0.25);
        this.addChild(MusicSymbol,0);

        //sfx symbol
        var SFXSymbol = new cc.Sprite.create(res.SoundSymbol_png);
        SFXSymbol.setAnchorPoint(cc.p(0.5,0.5));
        SFXSymbol.setPosition(cc.p(size.width/5*2,size.height/10*5));
        SFXSymbol.setScale(0.25);
        this.addChild(SFXSymbol,0);



        //music checkbox
        var MusicCheckBox = new ccui.CheckBox();
        MusicCheckBox.loadTextures(res.Unchecked_png, res.UncheckedSelected_png,res.Checked_png,res.CheckedSelected_png,res.CheckedDisabled_png);
        MusicCheckBox.x = (size.width/5*3);
        MusicCheckBox.y = (size.height/10*7);
        MusicCheckBox.setScale(0.25);
        MusicCheckBox.addEventListener(this.selectedEventMusic,this);
        
        // Checks to see if the music is on, if it is, the checkbox is automatically selected.
        if (musicVolume > 0)
        {
        console.log("Music is on");
        MusicCheckBox.setSelected(true);
        }
                                    
        this.addChild(MusicCheckBox);


        //SFX checkbox
        var SFXCheckBox = new ccui.CheckBox();
        SFXCheckBox.loadTextures(res.Unchecked_png,res.UncheckedSelected_png, res.Checked_png,res.CheckedSelected_png,res.CheckedDisabled_png);
        SFXCheckBox.x = size.width/5*3;
        SFXCheckBox.y = size.height/10*5;
        SFXCheckBox.setScale(0.25);
        SFXCheckBox.addEventListener(this.selectedEventSFX,this);
        
        // Checks to see if the sound effects are on, if they are, the checkbox is automatically selected.
        if (sfxVolume > 0)
        {
        console.log("Sound effects are on");
        SFXCheckBox.setSelected(true);
        }
                                    
        this.addChild(SFXCheckBox);



























        //enter code above
        return true;
    },//ctor function - main code


    selectedEventMusic: function(sender,type){
    
        switch(type){
            case ccui.CheckBox.EVENT_UNSELECTED:
                cc.log("music check box not selected");
                musicVolume = 0;
                cc.audioEngine.setMusicVolume(musicVolume);
                break;
            case ccui.CheckBox.EVENT_SELECTED:
                cc.log("music box checked");
                musicVolume = 0.5;
                 cc.audioEngine.setMusicVolume(musicVolume);
                break;

        }//switch


    },//function

    selectedEventSFX : function(sender,type){
        switch(type){
            case ccui.CheckBox.EVENT_UNSELECTED:
                cc.log("sfx box unchecked");
                sfxVolume = 0;
                cc.audioEngine.setEffectsVolume(sfxVolume);
                break;
            case ccui.CheckBox.EVENT_SELECTED:
                cc.log("sfx box unchecked");
                sfxVolume = 1;
                cc.audioEngine.setEffectsVolume(sfxVolume);
                break;

        }//switch





    },//function






});//GameLayer

//insert public functions here
var ReturnToMenu = function(){
   SETTINGSINITIALIZED = false;
    cc.director.popScene();
    
};


var SettingsScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        if (SETTINGSINITIALIZED == false){
            SETTINGSINITIALIZED = true;
            var layer = new SettingsLayer();
            this.addChild(layer);
        }//check whether initialized
    }//initiate the scene on enter
});//main function to initiate the scene

