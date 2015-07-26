//CIRC - Settings LAyer

//to check whether the layer already exists - prevents duplicates
var SETTINGSINITIALIZED = false;
var musicVolume = 0.5;
var sfxVolume = 1;

//The main layer of this scene
var SettingsLayer = cc.Layer.extend({
    backgroundPic:null,

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        //normalizing sizes and setting the size
        var size = cc.winSize;
        var normalizescale = size.height/640;
        /////////////////////////////

        // background pictures
        this.backgroundPic = new cc.Sprite(res.Background_png);
        this.backgroundPic.attr({
            x: size.width / 2,
            y: size.height / 2,   
        });
        this.backgroundPic.setScale(0.4*normalizescale);
        this.addChild(this.backgroundPic, 0);

        ////////////////////////////////////////////
        /////////////////BUTTONS//////////////////////
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
            y: size.height/3,
            anchorX: 0.5,
            anchorY: 0.5,
            scale : 0.4*normalizescale,
        });

        var menu = new cc.Menu(MainMenuButton);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        //////////////////BUTTONS////////////////////////////
        ///////////////////////////////////////
        
        //settings title 
        var settingsLabel = new cc.LabelBMFont("SETTINGS",res.Ethnocentric_BMFont);
        // position the label on the center of the screen
        settingsLabel.x = size.width / 2;
        settingsLabel.y = size.height/6*5;
        settingsLabel.setScale(2*normalizescale);
        // add the label as a child to this layer
        this.addChild(settingsLabel, 5);

        //music symbol
        var MusicSymbol = new cc.Sprite.create(res.MusicSymbol_png);
        MusicSymbol.setAnchorPoint(cc.p(0.5,0.5));
        MusicSymbol.setPosition(cc.p(size.width/10*4,size.height/10*7));
        MusicSymbol.setScale(0.25*normalizescale);
        this.addChild(MusicSymbol,0);

        //sfx symbol
        var SFXSymbol = new cc.Sprite.create(res.SoundSymbol_png);
        SFXSymbol.setAnchorPoint(cc.p(0.5,0.5));
        SFXSymbol.setPosition(cc.p(size.width/10*4,size.height/10*5));
        SFXSymbol.setScale(0.25*normalizescale);
        this.addChild(SFXSymbol,0);

        //music checkbox
        var MusicCheckBox = new ccui.CheckBox();
        MusicCheckBox.loadTextures(res.Unchecked_png, res.UncheckedSelected_png,res.Checked_png,res.CheckedSelected_png,res.CheckedDisabled_png);
        MusicCheckBox.x = (size.width/10*6);
        MusicCheckBox.y = (size.height/10*7);
        MusicCheckBox.setScale(0.25*normalizescale);
        MusicCheckBox.addEventListener(this.selectedEventMusic,this);
        
        // Checks to see if the music is on, if it is, the checkbox is automatically selected.
        if (musicVolume > 0){
            MusicCheckBox.setSelected(true);
        }                 
        this.addChild(MusicCheckBox);

        //SFX checkbox
        var SFXCheckBox = new ccui.CheckBox();
        SFXCheckBox.loadTextures(res.Unchecked_png,res.UncheckedSelected_png, res.Checked_png,res.CheckedSelected_png,res.CheckedDisabled_png);
        SFXCheckBox.x = size.width/10*6;
        SFXCheckBox.y = size.height/10*5;
        SFXCheckBox.setScale(0.25*normalizescale);
        SFXCheckBox.addEventListener(this.selectedEventSFX,this);
        
        // Checks to see if the sound effects are on, if they are, the checkbox is automatically selected.
        if (sfxVolume > 0){
        SFXCheckBox.setSelected(true);
        }
                                    
        this.addChild(SFXCheckBox);
        return true;
    },//ctor function - main code

    //function of the checkbox
    selectedEventMusic: function(sender,type){
    
        switch(type){
            case ccui.CheckBox.EVENT_UNSELECTED:
                musicVolume = 0;
                cc.audioEngine.setMusicVolume(musicVolume);
                break;
            case ccui.CheckBox.EVENT_SELECTED:
                musicVolume = 0.5;
                 cc.audioEngine.setMusicVolume(musicVolume);
                break;
        }//switch
    },//function

    //function of the checkbox for SFX
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

//returning to menu
var ReturnToMenu = function(){
    SETTINGSINITIALIZED = false;
    cc.director.popScene();
};

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
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

