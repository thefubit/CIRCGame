//CIRC - Main Game LAyer

//to check whether the layer already exists - prevents duplicates
var GAMEINITIALIZED = false;
var ISITGAMEOVER = false;
var NEWGAME = true;
var levelInner = 0;//controlling level of inner satellite
var speedInner = 0;//controlling the speed of inner satellite
var levelOuter = 0;//controlling level of outer satellite
var speedOuter = 0;//controlling speed of inner satellite
var currentScore = 0;
var highScore = 0;//must grab from local storage

//checking for consecutive touches
var consecutiveTouches = 0;

//default speed
var baseSpeed = 9;

//turbo tracker
var turboCount = 0;
var turboMode = false;

//The main layer of this scene
var GameLayer = cc.Layer.extend({
    sprite:null,
    //RotationSpeedOuter:null,//changing outer speed
    //RotationSpeedInner:null,//changing inner speed
    //currentScore:null,//tracking current score
    touched:true,//autolose if no touch
    normalizedWinDistance:null,
    GameStarted:false,
    scoreLabel:null,
    levelLabel:null,
    instructionsLabel:null,
    perfectLabel:null,
    greatLabel:null,
    missLabel:null,
    turboLabel:null,

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
        //cc.audioEngine.playMusic(res.Background_music, true);
        //this.schedule(cc.audioEngine.setMusicVolume(musicVolume),1);




        //calculate appropriate lengths
        this.normalizedWinDistance = size.height*0.17;
        currentScore = 0;

        //provide empty node and outer node
        //provide empty node and inner node
        //spin them both - accordingly - using global speed variables
        //level system - hidden
        //track score and show score
        //touch event
        //levelup
        //leveldown
        //pause the game
        //lose the game - auto check and consecutivity



        //default code from setup - REPLACE it as needed
        // add a "close" icon to exit the progress. it's an autorelease object
        //image as a menu 
        
        ////////////////////////////////
        ////////Satellites/////////////
        

        //the spinning
        // Your earth.
        this.InnerSat = new cc.Sprite(res.InnerSatellite_png);
        this.InnerSat.attr({
            x: 0,
            y: size.height /8*3,
            scale:0.5,
        });
        //this.addChild(this.InnerSat); // <- Adds your earth to the scene.

        // Your moon.
        this.OuterSat = new cc.Sprite(res.OuterSatellite_png);
        this.OuterSat.attr({
            x: 0,
            y: size.height/16*7,
            scale : 0.5,
        });
        //this.addChild(this.OuterSat);

        // The specific point where your moon will rotate around.
        this.rotationPointIn = new cc.Node();
        this.rotationPointIn.attr({
            // Places this node wherever your earth is.
            x: size.width/2,
            y: size.height/2,
        });
        this.rotationPointIn.addChild(this.InnerSat); // <- Adds your moon to this node.
        this.addChild(this.rotationPointIn); // <- Adds this node to the scene.

        this.rotationPointOut = new cc.Node();
        this.rotationPointOut.attr({
            x : size.width/2,
            y : size.height/2
        });
        this.rotationPointOut.addChild(this.OuterSat);
        this.addChild(this.rotationPointOut);

        //temp speed
        this.RotationSpeedInner = 2;
        this.RotationSpeedOuter = 5;


        // Revolve your inner satellite around center
        /*
        if(this.GameStarted == true){
        var rotatePointIn = new cc.RotateBy(speedInner, 360); // <- Rotate the node by 360 degrees in 5 seconds.
        var rotateForeverIn = new cc.RepeatForever(rotatePointIn); // <- Keeps the node rotating forever.
        this.rotationPointIn.runAction(rotateForeverIn); //

        //revolve outer satellite around center
        var rotatePointOut = new cc.RotateBy(speedOuter, -360);
        var rotateForeverOut = new cc.RepeatForever(rotatePointOut);
        this.rotationPointOut.runAction(rotateForeverOut);
        }
        */
        //note must change RotationSpeedInner and outer according to level

        ///////////////satellites/////////////////
        ////////////////////////////////
        /////////////BUTTONS/////////
        

        var PauseButton = new cc.MenuItemImage(
            res.PauseButton_png,
            res.PauseButtonPressed_png,
            function(){
                cc.log("Pause");
                
                PauseGame();
            },this);
        PauseButton.attr({
            x: 80,
            y: size.height/10*9,
            anchorX : 0.5,
            anchorY : 0.5,
            scale:0.15
        });


        var menu = new cc.Menu(PauseButton);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        ////////////////////////////////////////////////



        if(NEWGAME == true){
        this.instructionsLabel = new cc.LabelTTF("Touch when they meet", "Arial", 38);
        // position the label on the center of the screen
        this.instructionsLabel.x = size.width / 2;
        this.instructionsLabel.y = size.height/2;
        // add the label as a child to this layer
        this.addChild(this.instructionsLabel, 5);
        //NEWGAME = false;
        //this.resetGame;

        
        }//putting the middle thing on
        
        /////////////////////////////////////////////
        ////////////////////DISPLAY LABELS/////////////////////////

        this.perfectLabel = new cc.LabelTTF("PERFECT!!","Verdana",55);
        this.perfectLabel.x = size.width/2;
        this.perfectLabel.y = size.height/2;
        this.perfectLabel.setOpacity(0);
        this.addChild(this.perfectLabel,5);


        this.greatLabel = new cc.LabelTTF("GREAT!","Verdana",55);
        this.greatLabel.x = size.width/2;
        this.greatLabel.y = size.height/2;
        this.greatLabel.setOpacity(0);
        this.addChild(this.greatLabel,5);

        this.missLabel = new cc.LabelTTF("MISS!!", "Verdana",55);
        this.missLabel.x = size.width/2;
        this.missLabel.y = size.height/2;
        this.missLabel.setOpacity(0);
        this.addChild(this.missLabel,5);



        ///////////////////DISPLAY LABELS//////////////////////////
        /////////////////////////////////////////////


        /////////////////////////////////////////
        ////////////////TURBO/////////////////////


        




        this.turboLabel = new cc.LabelTTF("TURBO MODE","Verdana",35);
        this.turboLabel.x = size.width/2;
        this.turboLabel.y = size.height/3;
        this.addChild(this.turboLabel,5);
        this.turboLabel.setOpacity(0);//disappear it


        /////////////////////TURBO////////////////////
        //////////////////////////////////////////




        /////////////////////////////////////////////
        //////////////SCORING///////////////////////


        var scoretext = "" + currentScore;
        this.scoreLabel = new cc.LabelTTF(scoretext,"Verdana",35);
        this.scoreLabel.x = size.width/10*9;
        this.scoreLabel.y = size.height-80;
        this.addChild(this.scoreLabel,5);

        this.schedule(this.updateScore,0);


        //temp for testing - level 
        var leveltext = "Speed: " + levelInner;
        this.levelLabel = new cc.LabelTTF(leveltext,"Verdana",35);
        this.levelLabel.x = size.width/10*9;
        this.levelLabel.y = size.height-120;

        this.addChild(this.levelLabel,0);

        //////////////////////////////////////////
        ////////////TOUCHING//////////////////////
        //////////////////////////////////////////

        if(cc.sys.capabilities.hasOwnProperty('touches')){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,

                onTouchBegan: function(touch,event){
                    
                    //testing
                    cc.log('touch worked');
                    
                    testing;

                    //tracking untouched loss
                    UNTOUCHEDLOSS = false;



                    //get layer as target
                    var myLayer = event.getCurrentTarget();

                    //get the coordinates
                    var InnerPos = myLayer.InnerSat.convertToWorldSpace(myLayer.InnerSat.getPosition());
                    var OuterPos = myLayer.OuterSat.convertToWorldSpace(myLayer.OuterSat.getPosition());
                    cc.log("innerx" + InnerPos.x);
                    cc.log("outerx" + OuterPos.x);

                    //checking distance between the two
                    myLayer.checkDistance (myLayer.normalizedWinDistance,InnerPos.x, InnerPos.y,OuterPos.x,OuterPos.y);

                    //update the speed
                    myLayer.changeSpeed();

                    


                    //player has touched
                    myLayer.touched=true;
                    
                    //start checking for no touch on game start
                    if(myLayer.GameStarted==false){
                        myLayer.startCheckingForTouch();

                    }

                    //understand that the game has started
                    myLayer.GameStarted = true;



                    return true;
                }//onTouchBegan
            },this);//eventManager
        }//if
        //////////////////////////////////////////
        ///////////AUTO LOSE////////////////////

        //if(this.GameStarted== true){
            cc.log("test for touch function" + this.GameStarted);
        while(this.GameStarted){
        this.scheduleOnce(this.didPlayerTouch(),5);
        cc.log("touched?" +this.touched)
        }
        /////////////////////////////////////////

        

        return true;
    },//ctor function - main code



    startCheckingForTouch : function(){
        cc.log("started checking for touch")
        this.schedule(this.didPlayerTouch,baseSpeed/1.1);
        var fadeAction = cc.FadeTo.create(1,0);
        this.instructionsLabel.runAction(fadeAction);
    },//start checking for touch



    turboStart : function(){
        turboMode = true;
        cc.log("STARTING TURBO");
        cc.log("Is turbo started?" + turboMode);
        this.turboLabel.setOpacity(255);

        //do something here
        //changing up music
        //flash messages
        //rainbows/stars going across at small opacity
        //
                                
        /////////////////////////// PARTICLES //////////////////////////////
                                
        // creates the particle emitter. The plist file can be generated  manually I think, or you can use a website to design the particle emitter for you. This is what I did. Saves lots of trial and error. I can send you the link for the particle emitter generator website.
                                
        var TurboInnerParticles = new cc.ParticleSystem.create(res.TurboInner_plist);
                                
        // Giving the particle system a tag so I can remove it later
        TurboInnerParticles.setTag(9001);
                                
        // Setting the attributes so that it follows the inner square. We can tweak this a bit if we want.
                                
        TurboInnerParticles.attr
        ({
         x: this.InnerSat.x,
         y: this.InnerSat.y
         
                                });
        // ParticleSystem has a bunch of methods you can use to change the particle emitter. Uncomment the two lines below if you want to have a very merry emitter. Hohoho.
        
       // TurboInnerParticles.setStartColor(cc.color(255,0,0));
       // TurboInnerParticles.setEndColor(cc.color(0,255,0));
                                
        // Adds the particle emitter to the rotating node.
        
        this.rotationPointIn.addChild(TurboInnerParticles);
                                

        ////////turbo outer
        var TurboOuterParticles = new cc.ParticleSystem.create(res.TurboOuter_plist);
        TurboOuterParticles.setTag(9002);

        TurboOuterParticles.attr({
            x: this.OuterSat.x,
            y: this.OuterSat.y,
        });

        this.rotationPointOut.addChild(TurboOuterParticles);


        ////////Background Particles
        var BackgroundParticles = new cc.ParticleSystem.create(res.Stars_plist);
        BackgroundParticles.setTag(9003);

        BackgroundParticles.attr({
            x: this.rotationPointOut.x,
            y: this.rotationPointOut.y,
        });

        this.addChild(BackgroundParticles);




        ////////////////// PARTICLES//////////////////////
                                
        var darken = cc.FadeTo(1,50);
        this.sprite.runAction(darken);


    },

    turboEnd:function(){
        cc.log("ENDING TURBO MODE");
        turboMode = false;
        cc.log("Is turbo still on?" + turboMode);
        this.turboLabel.setOpacity(0);


        //ending stuff here
        //play a poop sound to show that turbo mode ended

        ///////////////// PARTICLES //////////////////////
        
        // Removes the trailing particle. The tag is over 9000! 
                                
                                
        this.rotationPointIn.removeChildByTag(9001,true);
        this.rotationPointOut.removeChildByTag(9002,true);
        this.removeChildByTag(9003,true);
                                
                                
        ////////////////////PARTICLES///////////////////

        var brighten = cc.FadeTo(0.5,255);
        this.sprite.runAction(brighten);
                                


    },












    //checking whether player touched
    didPlayerTouch:function(){
        cc.log("checked for touch"); 
        if (this.touched == false){
            UNTOUCHEDLOSS = true;

            //ending turbo
            this.turboEnd();

            levelDown("Miss");
            levelDown("Miss");
            levelDown("Miss");
            this.changeSpeed();
        }//if
        this.touched = false;
    },//checking player touch

    //updating score
    updateScore:function(){
        this.scoreLabel.setString(""+currentScore);

        //temp labels
        this.levelLabel.setString("Speed: " + levelInner);


    },//update score



    //insert methods here
    changeSpeed:function(speedIn,speedOut){
        //change speed here
        // change inner to new speed
        var rotatePointIn = new cc.RotateBy(speedInner, 360); // <- Rotate the node by 360 degrees in 5 seconds.
        var rotateForeverIn = new cc.RepeatForever(rotatePointIn); // <- Keeps the node rotating forever.
        this.rotationPointIn.runAction(rotateForeverIn); //

        //change outer to new speed
        var rotatePointOut = new cc.RotateBy(speedOuter, -360);
        var rotateForeverOut = new cc.RepeatForever(rotatePointOut);
        this.rotationPointOut.runAction(rotateForeverOut);
    },//change speed

    //resetting after a gameover
    resetGame:function(){
        this.GameStarted = false;
        this.touched = false;

        var resetLocation = cc.RotateTo.create(4,0);
        this.rotationPointIn.runAction(resetLocation);
        this.rotationPointOut.runAction(resetLocation);




    },//reset


    //checking distance
    checkDistance : function(d,x1,y1,x2,y2){
    var perfectDistance = d;//preset perfect
    var greatDistance = d *2;//preset great

    //calculate the distance between the two
    var distance = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

    //for console logging and debugging
    cc.log("perfect"+perfectDistance);
    cc.log("great:"+greatDistance);
    cc.log("between two dots: "+distance);

    //set up actions
    var FadeMessageIn = cc.FadeTo.create(0.1,255);
    var FadeMessageOut = cc.FadeTo.create(0.2,0);
    var FlashMessage = cc.Sequence.create(FadeMessageIn,FadeMessageOut);
    
    //note will take two global variables - perfectDistance and greatDistance
    if (distance <= perfectDistance){
        levelUp(2, "Perfect");
        cc.audioEngine.playEffect(res.PerfectSound,false);
        consecutiveTouches = 0;
        //show "perfect"
        this.perfectLabel.runAction(FlashMessage);

        //starting turbomode
        if(turboMode == false && levelInner ==10){
            cc.log(levelInner);
            turboCount ++;
            cc.log("turbo countdown: " + turboCount);
        }

        if(turboCount == 3 && turboMode == false){
            
            this.turboStart();
        }
        


       

    }//if
    else if (distance <=greatDistance){
        levelUp(1, "Great");
        cc.audioEngine.playEffect(res.GreatSound,false);
        consecutiveTouches = 0;
        this.greatLabel.runAction(FlashMessage);

        if(turboMode == false){
        turboCount = 0;
        }//if false
    }//else if 
    else{
        levelDown("Miss");
        consecutiveTouches ++;
        cc.audioEngine.playEffect(res.MissSound,false);
        this.missLabel.runAction(FlashMessage);
        if(consecutiveTouches == 3){
            MISSLOSS=true;
            GameOver();

        

        }//if within else

        turboCount = 0;

        if(turboMode==true){
            
            this.turboEnd();
        }
    }//else

    //new speed for turbo mode - overrides speed
    if(turboMode == true){
    speedInner = (baseSpeed/levelInner)*3;
    speedOuter = (baseSpeed/levelOuter)*3;
    }//changing speed for turbo mode - make faster as needed

    },//checking distance








});//GameLayer




var testing = function(){
    cc.log("continual test");
};


//pause
var PauseGame = function(){
    cc.log("pausing the game");
    var scene = new PauseScene();
    cc.director.pushScene(scene);
};//pause


//key function -stops everything and resets all the variables and all the random stuff
var GameOver = function(){


    

    
    //myLayer.resetGame();
    var currentScene = cc.director.getRunningScene();
    var gamelayer = currentScene.AccessLayer;
    //var myLayer2 = myLayer.getCurrentTarget();
    //var layername = myLayer.getName();
    cc.log("the current layer is:"+gamelayer.GameStarted);


    //gamelayer.resetGame();
    //var resetRotation = cc.RotateTo.create(3,1);

    //gamelayer.rotationPointIn.runAction(resetRotation);
    //gamelayer.rotationPointOut.runAction(resetRotation);


    //set high score
    setHighScore(currentScore);
    cc.log("CurrentScore = " + currentScore);
    cc.log("HighScore = " + highScore);



    cc.log("go to gameover menu and record score and stop moving");
    //must reset everything. ie, move everything to starting point


    levelInner = 0;
    levelOuter = 0;
    speedInner = 0;
    speedOuter = 0;
    currentScore = 0;
    NEWGAME = true;

    ISITGAMEOVER = true;
    GAMEINITIALIZED = false;


    //var scene = new GameOverScene();
    //use rotateto to rotate to 0
    //cc.director.pushScene(scene);



    ///////ADD REPLACE TO GAMEOVER
    var scene = new GameOverScene();
    cc.director.runScene(new cc.TransitionFade(0.5,scene));
    



};//gameover






//leveling up function
var levelUp = function(amount,message){
    //message sent in is either excellent or great
    //change speed by amount
    levelInner = levelInner + amount;
    
    if (levelInner >10){//limiting speed
        levelInner = 10;
    }
    
    if(levelInner>5){//after inner lv 5, start spinning out
        levelOuter ++;
    }
    
    if (levelOuter>5){//prevents outer from going past 5
        levelOuter = 5;
    }
    
    //display message
    if(message == "Perfect"){
        //change to pop the image on the screen

        cc.log("Perfect");
    }
    else if (message == "Great"){
        //change to pop the image
        cc.log("Great");
    }

    currentScore += levelInner + levelOuter;

    //changing the speed accordingly
    speedInner = baseSpeed/levelInner;
    speedOuter = baseSpeed/levelOuter;

    
}//levelup


//level down 
var levelDown = function (message){
    levelInner--;
    levelOuter--;
    cc.log("you leveled down");

    //var myLayer = cc.director.getRunningScene();
    //myLayer.resetGame();



    if (levelOuter<0){
        levelOuter = 0;
    }
    if (levelInner < 0){
        levelInner = 0;
    }

    if(levelInner == 1){
        cc.log("you're about to lose");
    }

    if(levelInner == 0){

        SLOWLOSS = true;
        GameOver();
    }
    speedInner = baseSpeed/levelInner;
    if(levelOuter == 0){
        speedOuter = 999;
    }else{
    speedOuter = baseSpeed/levelOuter;
    }

};//leveldown




//check and set highScore
var setHighScore = function(currentScore){
    if (currentScore > highScore){
        highScore = currentScore;
    }
}//check and set highscore




//










///////////////////////////////////////////
var GameScene = cc.Scene.extend({
    //to try to access the scene/layer from global function
    AccessLayer:null,

    onEnter:function () {
        this._super();

        cc.log("testing if gamescene actually starts")


        if (GAMEINITIALIZED == false){
            GAMEINITIALIZED = true;
            var layer = new GameLayer();
            this.addChild(layer);

        //setting myLayer to something
        this.AccessLayer = layer;
        }//check whether initialized
    }//initiate the scene on enter
});//main function to initiate the scene

