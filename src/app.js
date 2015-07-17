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
var consecutiveMisses = 0;

//default speed
var baseSpeed = 9;

//turbo tracker
var turboCount = 0;
var turboMode = false;

// trailingParticletracker
var innerTrail = false;
var outerTrail = false;


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

    //turbo mode messaging
    turboLabel:null,
    turboCountDown:null,
    //turboCountDownMessage:"Turbo In...",

    spriteSheet:null,
    animatedAction:null,
    turboMusic: null,

    // variables for manipulating trailing particles
    innerParticle : null,
    outerParticle: null,
    innerParticleEmissionRate : null,
    innerParticleParticleCount: null,
    outerParticleEmissionRate: null,
    outerParticleParticleCount:null,
    innerParticleLife:null,
    outerParticleLife:null,
    innerParticleTrailColor:null,
    particleLagDistance:null,
    starsParticleCount:null,
    BackgroundSpin:null,


    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
        particleLagDistance = size;
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



        
        //this.instructionsLabel = new cc.LabelTTF("Touch when they meet", "Arial", 38);
        
        this.instructionsLabel = new cc.LabelBMFont("TOUCH WHEN THE DOTS MEET",res.Junegull_BMFont);
        // position the label on the center of the screen
        this.instructionsLabel.x = size.width / 2;
        this.instructionsLabel.y = size.height/3*2;
        this.instructionsLabel.color = cc.color(100,150,150);
        // add the label as a child to this layer
        this.addChild(this.instructionsLabel, 5);
        //NEWGAME = false;
        //this.resetGame;

        
        //putting the middle thing on
        
        /////////////////////////////////////////////
        ////////////////////DISPLAY LABELS/////////////////////////

        //randomizeTextColor();

        this.perfectLabel = new cc.Sprite(res.PerfectText);
        this.perfectLabel.attr({
            x: size.width/2,
            y: size.height/2,
            scale : 1/2.5,
        });
        this.perfectLabel.setOpacity(0);
        this.addChild(this.perfectLabel);

        this.greatLabel = new cc.Sprite(res.GreatText);
        this.greatLabel.attr({
            x: size.width/2,
            y: size.height/2,
            scale : 1/2.5,
        });
        this.greatLabel.setOpacity(0);
        this.addChild(this.greatLabel);

        this.missLabel = new cc.Sprite(res.MissText);
        this.missLabel.attr ({
            x: size.width/2,
            y: size.height/2,
            scale : 1/2.5,
        });
        this.missLabel.setOpacity(0);
        this.addChild(this.missLabel);





        ///////////////////DISPLAY LABELS//////////////////////////
        /////////////////////////////////////////////


        /////////////////////////////////////////
        ////////////////TURBO/////////////////////

        cc.spriteFrameCache.addSpriteFrames(res.animatedTurboModeText_plist);
        
        this.spriteSheet = new cc.SpriteBatchNode(res.animatedTurboModeText_png);
        this.addChild(this.spriteSheet);

        var animFrames = [];
        for (var i = 1; i<5; i++){
            var str = "turbomode" + i+".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames,0.1);

        this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
        this.turboLabel = new cc.Sprite("#turbomode1.png");

        this.turboLabel.attr({
            x: size.width/2,
            y: size.height/3,
            scale: 1/2.5,

        });
        this.turboLabel.setOpacity(0);
        this.turboLabel.runAction(this.runningAction);
        this.spriteSheet.addChild(this.turboLabel);


        //for the countdown text
        /*
        this.turboCountDown = new cc.LabelTTF("temp","Verdana",35);
        this.turboCountDown.x = size.width/2;
        this.turboCountDown.y = size.height/3;
        this.turboCountDown.setOpacity(0);
        this.addChild(this.turboCountDown);
        */
        
        this.turboCountDown = new cc.LabelBMFont("temp",res.Junegull_BMFont);
        this.turboCountDown.x = size.width/2;
        this.turboCountDown.y = size.height/3;
        this.turboCountDown.setOpacity(0);
        this.addChild(this.turboCountDown);




        /*
        this.turboLabel = new cc.LabelTTF("TURBO MODE","Verdana",35);
        this.turboLabel.x = size.width/2;
        this.turboLabel.y = size.height/3;
        this.addChild(this.turboLabel,5);
        this.turboLabel.setOpacity(0);//disappear it
        */

        /////////////////////TURBO////////////////////
        //////////////////////////////////////////

        ///////////////////////////////////////////////
        ///////////////////////////////////////////







        /////////////////////////////////////////////
        //////////////SCORING///////////////////////

        //change to bitmap
        var scoretext = "" + currentScore;
        /*
        this.scoreLabel = new cc.LabelTTF(scoretext,"Verdana",35);
        this.scoreLabel.x = size.width/10*9;
        this.scoreLabel.y = size.height-80;
        this.addChild(this.scoreLabel,5);
        */

        


        //bitmap label
        this.scoreLabel = new cc.LabelBMFont(scoretext,res.Junegull_BMFont);
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
                                
                                
        BackgroundSpin = new cc.ParticleSystem.create(res.Stars_plist);
        BackgroundSpin.setTag(4);
                                
        BackgroundSpin.attr
        ({
        x:this.rotationPointOut.x,
        y:this.rotationPointOut.y
        });
        
        starsParticleCount = BackgroundSpin.getTotalParticles();
        
        BackgroundSpin.setTotalParticles(0);
                                
        this.addChild(BackgroundSpin);

        //////////////SCORING/////////////////////
        //////////////////////////////////////////
        ////////////TOUCHING//////////////////////
        //////////////////////////////////////////

        if(cc.sys.capabilities.hasOwnProperty('touches')){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,

                onTouchBegan: function(touch,event){
                    
                    //testing
                    cc.log('touch worked');
                    
                    

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
                     
                    // If turbo mode is activated, show an explosion when a "great" or "perfect" is acheived.
                    if (turboMode)
                    {
                    myLayer.particleExplosion();
                    }
                                        
                   
                                        
                                        
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




        //var fadeAction = cc.FadeTo.create(1,0);
        //this.instructionsLabel.runAction(fadeAction);
    },//start checking for touch

    particleTurbo:function()
    {
    cc.log("ACTIVATED");
    innerParticleEmissionRate = innerParticle.getEmissionRate();
   // innerParticleParticleCount = innerParticle.getTotalParticles();
   // innerParticleLife = innerParticle.getLife();
                                
    outerParticleEmissionRate = outerParticle.getEmissionRate();
    //outerParticleParticleCount = outerParticle.getTotalParticles();
  //  outerParticleLife = outerParticle.getLife();
                                
    //innerParticle.setTotalParticles(innerParticleParticleCount - 40);
    innerParticle.setEmissionRate(innerParticleEmissionRate/2);
    innerParticle.setBlendAdditive(false);
                                
    //outerParticle.setTotalParticles(outerParticleParticleCount - 40);
    outerParticle.setEmissionRate(outerParticleEmissionRate/2);
    outerParticle.setBlendAdditive(false);
    },
                                
    particleUnturbo:function()
    {
    cc.log("ACTIVATED 2 ")
    innerParticle.setEmissionRate(innerParticleEmissionRate);
    //innerParticle.setTotalParticles(innerParticleParticleCount);
    innerParticle.setBlendAdditive(true);
                                
    outerParticle.setEmissionRate(outerParticleEmissionRate);
    //outerParticle.setTotalParticles(outerParticleParticleCount);
    outerParticle.setBlendAdditive(true);
    },

    turboStart : function(){
        turboMode = true;
        cc.log("STARTING TURBO");
        cc.log("Is turbo started?" + turboMode);
        //
        this.turboLabel.setOpacity(255);

                                
    
        
        //////////////////////MUSIC////////////////////////
                                
        
        
        cc.audioEngine.pauseMusic();
        this.turboMusic = cc.audioEngine.playEffect(res.TurboBackground_music,true);
        

        //////////////////////MUSIC/////////////////////////
                                
        /////////////////////////// PARTICLES //////////////////////////////
        this.particleTurbo();
        
        BackgroundSpin.setTotalParticles(starsParticleCount);
       
        //darkening the background                        
        var darken = cc.FadeTo(1,50);
        this.sprite.runAction(darken);
        
        
        ////////////////////PARTICLES[[[[[[[[[[[[[[]]]]]]]]]]]]]]
                                
                                     
        
    },

    turboEnd:function(){
        cc.log("ENDING TURBO MODE");
        turboMode = false;
        cc.log("Is turbo still on?" + turboMode);
        this.turboLabel.setOpacity(0);


        //ending stuff here
        //if (turboMode){
        //var FadeOut = cc.FadeTo.create(0.1,0);
        //this.turboCountDown.setOpacity(0);  
        //}
        





        //play a poop sound to show that turbo mode ended

        ////////////////////STOP TURBO MUSIC//////////////

       cc.audioEngine.stopEffect(this.turboMusic);

        cc.audioEngine.resumeMusic();

        ////////////////////STOP TURBO MUSIC////////////////




        ///////////////// PARTICLES //////////////////////
        
                                
        if (turboMode == false)
        {
        this.particleUnturbo();
        }
                                
        BackgroundSpin.setTotalParticles(0);
                                
        var brighten = cc.FadeTo(0.5,225);
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
    var FadeMessageOut = cc.FadeTo.create(0.4,0);
    var FlashMessage = cc.Sequence.create(FadeMessageIn,FadeMessageOut);
    //fade instructions
    var fadeAction = cc.FadeTo.create(1,0);
    


    



    //note will take two global variables - perfectDistance and greatDistance
    ///////////////////PERFECT/////////////////////////
    if (distance <= perfectDistance){

        //leveling up and increasing speed
        levelUp(2, "Perfect");
        

        if(turboMode == false){
            cc.audioEngine.playEffect(res.NormalPerfectSound,false);
        }
        else if(turboMode == true){
            cc.audioEngine.playEffect(res.TurboPerfectSound,false);
        }

        consecutiveMisses = 0;
        //show "perfect"
        this.perfectLabel.runAction(FlashMessage);

        //starting turbomode
        var showCountDown = cc.FadeTo.create(0.2,255);
        if(turboMode == false && levelInner ==10){
            cc.log(levelInner);
            turboCount ++;
            cc.log("this is running")

            if(turboCount >=2){
            this.turboCountDown.setString("Turbo Mode in " +(5-turboCount)+ "...");
            cc.log("Turbo Mode in " +(6-turboCount)+ "...");
            
            this.turboCountDown.setOpacity(255);
            }
            
            cc.log("should be counting down turbo")
        }//counting turbo

        if(turboCount == 5 && turboMode == false){
            
            this.turboStart();
            this.turboCountDown.setOpacity(0);
        }//turbostart
                                
        
        // start the inner trail
        if (levelInner > 0 && !innerTrail)
        {
        this.innerStart(particleLagDistance.width);
        }
                                
        //setting particles
                                
            
        // start the outer trail
        if (levelOuter > 0 && !outerTrail)
        {
        this.outerStart(particleLagDistance.width);
                                
        }
                                
        

       

    }//if


    /////////////////GREAT//////////////////////////////
    else if (distance <=greatDistance){
        levelUp(1, "Great");
        

        if(turboMode == false){
            cc.audioEngine.playEffect(res.NormalGreatSound,false);
        }
        else if(turboMode == true){
            cc.audioEngine.playEffect(res.TurboGreatSound,false);
        }

        consecutiveMisses = 0;
        this.greatLabel.runAction(FlashMessage);

        if(turboMode == false){
        turboCount = 0;
        //this.turboCountDown.setString("Turbo Mode in " +(6-turboCount)+ "...");
        this.turboCountDown.setOpacity(0);
        }//if false
                                
                                

        //trails 
        if (levelOuter > 0 && !outerTrail)
        {
         
        this.outerStart(particleLagDistance.width);
                                
        }//outer particle
                                
                                
                                
    }//else if 

    //////////////////////MISS////////////////////
    else{

        //speed control - player doesn't get less than 10 speed
        if(levelInner<10){
        levelDown("Miss");
        }//speed control
                                
        // remove the outer trail
                                
        if (levelOuter == 0 && outerTrail)
        {
        
        outerTrail = false;
        this.rotationPointOut.removeChildByTag(2);
        
        }
                                
                                
                                
                                
        consecutiveMisses ++;

        if(turboMode == false){
            cc.audioEngine.playEffect(res.NormalMissSound,false);
        }
        else if(turboMode == true){
            cc.audioEngine.playEffect(res.TurboMissSound,false);
        }
        


        this.missLabel.runAction(FlashMessage);

        //controlling how many misses in a row a player can have
        if(consecutiveMisses == 2){
            MISSLOSS=true;
            //speedInner = 9001;
            //speedOuter = 9001;
            GameOver();

        

        }//if within miss

        turboCount = 0;
        //this.turboCountDown.setString("Turbo Mode in " +(6-turboCount)+ "...");
        this.turboCountDown.setOpacity(0);

        if(turboMode==true){
                                 
            //////////////change speed back/////////////
            speedInner = baseSpeed/levelInner;
            speedOuter = baseSpeed / levelOuter;
            /////////////change speed back////////////// 
            this.turboEnd();
        }
    }//else


    ///////////////////FADING INSTRUCTIONS////////
    if(levelInner == 7 || levelInner == 8){
        
        this.instructionsLabel.runAction(fadeAction);
    }//fade the instructions
    ///////////////////FADING INSTRUCTIONS/////////




    /////////////////////TURBO SPEED OVERRIDE/////////////////////
    //new speed for turbo mode - overrides speed
   if(turboMode == true)
    {
        //change the factor as needed
        //bigger = slower. smaller = faster
        var factor = 0.82;
                                
    speedInner = baseSpeed/levelInner*factor;
    speedOuter = baseSpeed/levelOuter*factor;
                    
    
                                
    
    }//changing speed for turbo mode - make faster as needed
    /////////////////////TURBO SPEED OVERRIDE/////////////////////

    },//checking distance


    // PARTICLE EXPLOSION EFFECT
                                
                                
    particleExplosion: function ()
    {
     
    var explosionParticle = new cc.ParticleSystem.create(res.explosionParticle_plist);
                                
    explosionParticle.setTag(3);
                                
    explosionParticle.attr
    ({
                       
     x: this.InnerSat.x,
     y: this.InnerSat.y
                                
    });
                                
    
    this.rotationPointIn.addChild(explosionParticle);
                                
    }, // particleExplosion
                                
   
                                
                                
    innerStart: function (size)
    {
                    
    innerTrail = true;
    innerParticle = new cc.ParticleSystem.create(res.innertrailingParticle_plist);
    cc.log("LIFE IS " + innerParticle.getLife());
                        
    innerParticleTrailColor = Math.floor(Math.random()*4);
    cc.log("INNER TRAIL COLOR IS " + innerParticleTrailColor);
                                
    innerParticle.setTag(1);
                                
    innerParticle.attr
    ({
     x: this.InnerSat.x-size/90,
    y: this.InnerSat.y
    });
                                
    switch (innerParticleTrailColor)
    {
    case 1:
    innerParticle.setStartColor(cc.color(255,204,51));
    innerParticle.setEndColor(cc.color(255,0,25));
    innerParticle.setStartColorVar(cc.color(0,0,0));
    innerParticle.setEndColorVar(cc.color(0,0,0));
    break;
                                
    case 2:
    innerParticle.setStartColor(cc.color(0,255,0));
    innerParticle.setEndColor(cc.color(255,255,51));
    innerParticle.setStartColorVar(cc.color(0,0,0));
    innerParticle.setEndColorVar(cc.color(0,0,0));
    break;
                                
    case 3:
    innerParticle.setStartColor(cc.color(51,51,255));
    innerParticle.setEndColor(cc.color(255,51,255));
    innerParticle.setStartColorVar(cc.color(0,0,0));
    innerParticle.setEndColorVar(cc.color(0,0,0));
    break;
                                
    default:
                                // don't change the particle color
    break;
    }//switch
                         
    
    this.rotationPointIn.addChild(innerParticle);
    
                                
    },
                                
    outerStart: function (size)
    {
                                
    outerTrail = true;
    outerParticle = new cc.ParticleSystem.create(res.outertrailingParticle_plist);
                                
   
    
    var outerParticleColor = Math.floor(Math.random()*4);
                                
    if (outerParticleColor == innerParticleTrailColor)
    {
    outerParticleColor = 0;
    }
                                
    outerParticle.setTag(2);
                                
                                
    outerParticle.attr
    ({
    x:this.OuterSat.x+size/90,
    y: this.OuterSat.y
    });
                                
    switch (outerParticleColor)
    {
    case 1:
    outerParticle.setStartColor(cc.color(255,204,51));
    outerParticle.setEndColor(cc.color(255,0,25));
    outerParticle.setStartColorVar(cc.color(0,0,0));
    outerParticle.setEndColorVar(cc.color(0,0,0));
    break;
                                
    case 2:
    outerParticle.setStartColor(cc.color(0,255,0));
    outerParticle.setEndColor(cc.color(255,255,51));
    outerParticle.setStartColorVar(cc.color(0,0,0));
    outerParticle.setEndColorVar(cc.color(0,0,0));
    break;
                                
    case 3:
    outerParticle.setStartColor(cc.color(51,51,255));
    outerParticle.setEndColor(cc.color(255,51,255));
    outerParticle.setStartColorVar(cc.color(0,0,0));
    outerParticle.setEndColorVar(cc.color(0,0,0));
    break;
                                
    default:
    // don't change the particle color
    break;
    }
                                
    this.rotationPointOut.addChild(outerParticle);
                                
    },

                                
    
    
                                
    

   



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
    speedInner = 9001;
    speedOuter = 9001;
    //currentScore = 0;
    NEWGAME = true;

    ISITGAMEOVER = true;
    GAMEINITIALIZED = false;

    innerTrail = false;
    outerTrail = false;


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
    
    //display message - just for testing
    //image popping is within the main scene
    if(message == "Perfect"){
        //change to pop the image on the screen

        cc.log("Perfect");
    }
    else if (message == "Great"){
        //change to pop the image
        cc.log("Great");
    }

    //Changing the score
    if(levelInner == 10){
        currentScore += 1;
    }
    if (turboMode){
        currentScore+=1;
    }
    //new scoring system

    //changing the speed accordingly
    speedInner = baseSpeed/levelInner;
    speedOuter = baseSpeed/levelOuter;

    
}//levelup


//level down 
var levelDown = function (message){

    //speed control - so player never gets below lv 10. but must work up there
    //if(levelInner<10){
    levelInner--;
    levelOuter--;
    //}
    cc.log("you leveled down");

    //var myLayer = cc.director.getRunningScene();
    //myLayer.resetGame();



    if (levelOuter<0){
        levelOuter = 0;
    }
    if (levelInner < 0){
        levelInner = 0;
    }

    //just for testing
    if(levelInner == 1){
        cc.log("you're about to lose");
    }

    if(levelInner == 0){

        SLOWLOSS = true;
        GameOver();
    }

    //setting speed of inner dot
    speedInner = baseSpeed/levelInner;

    //setting speed of outer dot
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
    //setting highscore to local storage
    ls.setItem("highscore",highScore);
}//check and set highscore














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

