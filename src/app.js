//CIRC - Main Game LAyer

//to check whether the layer already exists - prevents duplicates
var GAMEINITIALIZED = false;


//initializing the speed of the satellites
var levelInner = 0;//controlling level of inner satellite
var speedInner = 0;//controlling the speed of inner satellite
var levelOuter = 0;//controlling level of outer satellite
var speedOuter = 0;//controlling speed of inner satellite

//initializing the score
var currentScore = 0;

//checking for consecutive touches - initiating variable
var consecutiveMisses = 0;

//default speed
//change to alter difficulty of the game
var baseSpeed = 9;

//turbo tracker initiation
var turboCount = 0;
var turboMode = false;

// trailingParticletracker initiation
var innerTrail = false;
var outerTrail = false;


//The main layer of this scene
var GameLayer = cc.Layer.extend({
                                
    backgroundPic:null,//background sprite
    
    
    UNTOUCHEDLOSS:false,//checking lose condition
    SLOWUNTOUCHEDLOSS:false,
    normalizedWinDistance:null,//calculate certain distances from the screen resolution
    
    //label initiation
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

    //for sprite animations
    spriteSheet:null,
    animatedAction:null,

    //turbo sound effect
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
    BackgroundSpin:null,//background stars particle
    


    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        

        /////////////////////////////
        //find screen size and normalize the scale
        var size = cc.winSize;
        var normalizescale = size.height/640;

        //setting particle lag distance with regards to size
        particleLagDistance = size;

        //calculate appropriate lengths
        this.normalizedWinDistance = size.height*0.17;
        /////////////////////////////
        
        ////////////BACKGROUND////////////////////
        this.backgroundPic = new cc.Sprite(res.Background_png);
        this.backgroundPic.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.backgroundPic.setScale(0.4*normalizescale);
        this.addChild(this.backgroundPic, 0);
        //////////////BACKGROUND//////////////////
        
        //resetting current score every new game
        currentScore = 0;
        
        ////////////////////////////////
        ////////Satellites/////////////
        

        //the spinning
        //Inner satellite
        this.InnerSat = new cc.Sprite(res.InnerSatellite_png);
        this.InnerSat.attr({
            x: 0,
            y: size.height /8*3,
            scale:0.5*normalizescale,
        });
        
        //Outer Satellite
        this.OuterSat = new cc.Sprite(res.OuterSatellite_png);
        this.OuterSat.attr({
            x: 0,
            y: size.height/16*7,
            scale : 0.5*normalizescale,
        });

        // The specific point where your inner moon will rotate around.
        this.rotationPointIn = new cc.Node();
        this.rotationPointIn.attr({
            // Places this node wherever your earth is.
            x: size.width/2,
            y: size.height/2,
        });
        this.rotationPointIn.addChild(this.InnerSat); // <- Adds your moon to this node.
        this.addChild(this.rotationPointIn); // <- Adds this node to the scene.

        //rotation point of outer satellite
        this.rotationPointOut = new cc.Node();
        this.rotationPointOut.attr({
            x : size.width/2,
            y : size.height/2
        });
        this.rotationPointOut.addChild(this.OuterSat);
        this.addChild(this.rotationPointOut);

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
            x: size.height/10,
            y: size.height/10*9,
            anchorX : 0.5,
            anchorY : 0.5,
            scale:0.2*normalizescale,
        });
        //initiate a menu
        var menu = new cc.Menu(PauseButton);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
        ////////////////BUTTONS/////////////////////
        ////////////////////////////////////////////////
        /////////LABELS FROM TEXT///////////////////////////////
        this.instructionsLabel = new cc.LabelBMFont("TOUCH WHEN THE DOTS MEET",res.Junegull_BMFont);
        this.instructionsLabel.x = size.width / 2;
        this.instructionsLabel.y = size.height/3*2;
        this.instructionsLabel.color = cc.color(100,150,150);
        this.instructionsLabel.setScale(1*normalizescale);
        this.addChild(this.instructionsLabel, 5);
        
        this.turboCountDown = new cc.LabelBMFont("temp",res.Junegull_BMFont);
        this.turboCountDown.x = size.width/2;
        this.turboCountDown.y = size.height/3;
        this.turboCountDown.setOpacity(0);
        this.turboCountDown.setScale(1*normalizescale);
        this.addChild(this.turboCountDown);

        /////////LABELS FROM TEXT/////////////
        /////////////////////////////////////////////
        ////////////////////LABELS FROM PICTURES/////////////////////////
        //perfect 
        this.perfectLabel = new cc.Sprite(res.PerfectText);
        this.perfectLabel.attr({
            x: size.width/2,
            y: size.height/2,
            scale : 0.4*normalizescale,
        });
        this.perfectLabel.setOpacity(0);
        this.addChild(this.perfectLabel);
        //great
        this.greatLabel = new cc.Sprite(res.GreatText);
        this.greatLabel.attr({
            x: size.width/2,
            y: size.height/2,
            scale : 0.4*normalizescale,
        });
        this.greatLabel.setOpacity(0);
        this.addChild(this.greatLabel);
        //miss
        this.missLabel = new cc.Sprite(res.MissText);
        this.missLabel.attr ({
            x: size.width/2,
            y: size.height/2,
            scale : 0.4*normalizescale,
        });
        this.missLabel.setOpacity(0);
        this.addChild(this.missLabel);
        ///////////////////LABELS FROM PICTURES//////////////////////////
        /////////////////////////////////////////////


        /////////////////////////////////////////
        ////////////////TURBO ANIMATED LABEL/////////////////////

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
            scale: 0.4*normalizescale,

        });
        this.turboLabel.setOpacity(0);
        this.turboLabel.runAction(this.runningAction);
        this.spriteSheet.addChild(this.turboLabel);

        /////////////////////TURBO ANIMATED LABEL////////////////////
        //////////////////////////////////////////


        /////////////////////////////////////////////
        //////////////SCORING///////////////////////
        var scoretext = "" + currentScore;
        //bitmap label
        this.scoreLabel = new cc.LabelBMFont(scoretext,res.Junegull_BMFont);
        this.scoreLabel.x = size.width/10*9;
        this.scoreLabel.y = size.height-80;
        this.addChild(this.scoreLabel,5);

        //update the score at every frame
        this.schedule(this.updateScore,0);


        //temp for testing - level 
        /*
        var leveltext = "Speed: " + levelInner;
        this.levelLabel = new cc.LabelTTF(leveltext,"Verdana",35);
        this.levelLabel.x = size.width/10*9;
        this.levelLabel.y = size.height-120;
        this.addChild(this.levelLabel,0);
        */
        //////////////SCORING/////////////////////
        //////////////////////////////////////////         
                                

        ////////////BACKGROUND PARTICLES/////////////
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
        ////////////BACKGROUND PARTICLES

        //////////////////////////////////////////
        ////////////TOUCHING//////////////////////

        if(cc.sys.capabilities.hasOwnProperty('touches')){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,

                onTouchBegan: function(touch,event){
                    
                    //get layer as target
                    var myLayer = event.getCurrentTarget();

                    //get the coordinates of each satellite
                    var InnerPos = myLayer.InnerSat.convertToWorldSpace(myLayer.InnerSat.getPosition());
                    var OuterPos = myLayer.OuterSat.convertToWorldSpace(myLayer.OuterSat.getPosition());
                    

                    //checking distance between the two using coordinates
                    myLayer.checkDistance (myLayer.normalizedWinDistance,InnerPos.x, InnerPos.y,OuterPos.x,OuterPos.y);
                     
                                        
                    //update the speed of spins
                    myLayer.changeSpeed();

                     // If turbo mode is activated, show an explosion when a "great" or "perfect" is acheived.
                    if (turboMode)
                    {
                    myLayer.particleExplosion();
                    }        

                    return true;
                }//onTouchBegan
            },this);//eventManager
        }//if
        ///////////////////////TOUCH FUNCTION///////////////////
        /////////////////////////////////////////

        

        return true;
    },//ctor function - main code


    particleTurbo:function()
    {
    
    innerParticleEmissionRate = innerParticle.getEmissionRate();
   
                                
    outerParticleEmissionRate = outerParticle.getEmissionRate();
    
                                
    innerParticle.setEmissionRate(innerParticleEmissionRate/3);
    innerParticle.setBlendAdditive(false);
                                
    outerParticle.setEmissionRate(outerParticleEmissionRate/3);
    outerParticle.setBlendAdditive(false);
    },
                                
    particleUnturbo:function()
    {
    cc.log("ACTIVATED 2 ")
    innerParticle.setEmissionRate(innerParticleEmissionRate);
    innerParticle.setBlendAdditive(true);
                                
    outerParticle.setEmissionRate(outerParticleEmissionRate);
    outerParticle.setBlendAdditive(true);
    },

    turboStart : function(){//starting turbo mode
        turboMode = true;
        //turning on the turbomode animated label
        this.turboLabel.setOpacity(255);
        //////////////////////MUSIC////////////////////////
        cc.audioEngine.pauseMusic();

        if(musicVolume > 0)
        {
        this.turboMusic = cc.audioEngine.playEffect(res.TurboBackground_music,true);
        }
        //////////////////////MUSIC/////////////////////////
                                
        /////////////////////////// PARTICLES //////////////////////////////
        this.particleTurbo();//initiate the turbo particles
        BackgroundSpin.setTotalParticles(starsParticleCount);
        //darkening the background                        
        var darken = cc.FadeTo(0.5,50);
        this.backgroundPic.runAction(darken);
        ////////////////////PARTICLES[[[[[[[[[[[[[[]]]]]]]]]]]]]]
                                
                                     
        
    },//end of turbo start

    turboEnd:function(){//ending turbo function
        turboMode = false;
        //disabling turbo label, make it disappear
        this.turboLabel.setOpacity(0);
        ////////////////////STOP TURBO MUSIC//////////////
        cc.audioEngine.stopEffect(this.turboMusic);
        cc.audioEngine.resumeMusic();
        ////////////////////STOP TURBO MUSIC////////////////

        /////////////////ENDING PARTICLES //////////////////////
        this.particleUnturbo();
        BackgroundSpin.setTotalParticles(0);
        //get background back to normal                                
        //var brighten = cc.FadeTo(0.5,225);
        //this.backgroundPic.runAction(brighten);
        //////////////////ENDING PARTICLES////////////////////
        },//function to end turbo

    //updating score
    updateScore:function(){
        this.scoreLabel.setString(""+currentScore);

        //temp labels
        //this.levelLabel.setString("Speed: " + levelInner);


    },//update score

    changeSpeed:function(speedIn,speedOut){//changing speed function
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
        /*
        cc.log("perfect"+perfectDistance);
        cc.log("great:"+greatDistance);
        cc.log("between two dots: "+distance);
        */

        //set up actions
        var FadeMessageIn = cc.FadeTo.create(0.1,255);
        var FadeMessageOut = cc.FadeTo.create(0.4,0);
        var FlashMessage = cc.Sequence.create(FadeMessageIn,FadeMessageOut);
        //fade instructions
        var fadeAction = cc.FadeTo.create(1,0);

        ///////////////////PERFECT/////////////////////////
        if (distance <= perfectDistance){
            
            //leveling up and increasing speed, calling levelup function
            levelUp(2, "Perfect");

            // activating autoloss functionality
            this.autoLossSpeed(1.05,1.2);

            
            //playing a sound
            if(turboMode == false){
                cc.audioEngine.playEffect(res.NormalPerfectSound,false);
            }
            else if(turboMode == true){
                cc.audioEngine.playEffect(res.TurboPerfectSound,false);
            }
            //playing a sound

            consecutiveMisses = 0;

            //show "perfect"
            this.perfectLabel.runAction(FlashMessage);

            //starting turbomode
            var showCountDown = cc.FadeTo.create(0.2,255);
            if(turboMode == false && levelInner ==10){
                cc.log(levelInner);
                turboCount ++;
                
                if(turboCount >=2){
                this.turboCountDown.setString("Turbo Mode in " +(5-turboCount)+ "...");
                
                this.turboCountDown.setOpacity(255);
                }//show turbo mode
                
            }//counting turbo

            if(turboCount == 5 && turboMode == false){//launch turbo at 5 consecutive perfects
                
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
                                    
            }//outer trail
 
        }//if perfect


        /////////////////GREAT//////////////////////////////
        else if (distance <=greatDistance){
            //speed up once
            levelUp(1, "Great");
            //missing

            // activating autoloss functionality
            this.autoLossSpeed(1.05,1.2);


            //playing a sound
            if(turboMode == false){
                cc.audioEngine.playEffect(res.NormalGreatSound,false);
            }
            else if(turboMode == true){
                cc.audioEngine.playEffect(res.TurboGreatSound,false);
            }

            //counting miss
            consecutiveMisses = 0;
            //showing a message
            this.greatLabel.runAction(FlashMessage);

            //removing the turbo countdown
            if(turboMode == false){
            turboCount = 0;
            this.turboCountDown.setOpacity(0);
            }//ending turbo count down
                                    
            //trails 
            if (levelOuter > 0 && !outerTrail)
            {
            this.outerStart(particleLagDistance.width);                 
            }//outer particle trail
                                    
                                    
                                    
        }//else if 

        //////////////////////MISS////////////////////
        else{

            //speed control - player doesn't get less than 10 speed
            if(levelInner<10){
            levelDown("Miss");
            }//speed control
                                    
            //activating a slower autoloss functionality for a miss hit. It's easier to put this segment of code in here instead of a method.
           if (UNTOUCHEDLOSS)
            {  
            cc.director.getScheduler().unscheduleCallbackForTarget(this,this.unTouchedLoss);
            UNTOUCHEDLOSS = false 
            } 

          if (levelOuter == 0){
            var missSpeed = speedInner*2.5;
            }

            else{//using some advanced mathmatics to calculate the time at which the auto miss checks
            var innerOmega = 360/speedInner;
            var outerOmega = 360/speedOuter;

            var thetaInner = innerOmega*360/(outerOmega + innerOmega);
            var missSpeed = thetaInner/innerOmega*2.5;
            }


            cc.director.getScheduler().scheduleCallbackForTarget(this,this.unTouchedLoss,missSpeed);
            UNTOUCHEDLOSS = true; // autoloss functionality

            // remove the outer trail        
            if (levelOuter == 0 && outerTrail)
            {
            outerTrail = false;
            this.rotationPointOut.removeChildByTag(2);
            }//disabling outer trail
                     
            //can't miss twice. so must add in the consecutiveness                         
            consecutiveMisses ++;
            

            //playing a sound for miss
            if(turboMode == false){
                cc.audioEngine.playEffect(res.NormalMissSound,false);
            }
            else if(turboMode == true){
                cc.audioEngine.playEffect(res.TurboMissSound,false);
            }
            
            //miss label display
            this.missLabel.runAction(FlashMessage);

            //controlling how many misses in a row a player can have
            if(consecutiveMisses == 2){
                MISSLOSS=true;
                GameOver();
            }//miss loss check

            //reset turbo count down
            turboCount = 0;
            this.turboCountDown.setOpacity(0);

            //ending turbo if miss
            if(turboMode==true){

                //////////////change speed back/////////////
                speedInner = baseSpeed/levelInner;
                speedOuter = baseSpeed / levelOuter;
                /////////////change speed back////////////// 
                this.turboEnd();

                //get background back to normal  
                
        var brighten = cc.FadeTo(0.5,225);
        this.backgroundPic.runAction(brighten);   
                                 
                
            }
        
        }//////////////////////else of miss


        ///////////////////FADING INSTRUCTIONS////////
        if(levelInner == 7 || levelInner == 8){
            
            this.instructionsLabel.runAction(fadeAction);
        }//fade the instructions
        ///////////////////FADING INSTRUCTIONS/////////




        /////////////////////TURBO SPEED OVERRIDE/////////////////////
        //new speed for turbo mode - overrides speed
       if(turboMode == true)
        {
            //speed factor for turbo mode
            //smaller is faster. bigger is slower
            var factor = 0.82;
            //changing the speed based on the factor              
            speedInner = baseSpeed/levelInner*factor;
            speedOuter = baseSpeed/levelOuter*factor;
        }//changing speed for turbo mode - make faster as needed
        /////////////////////TURBO SPEED OVERRIDE/////////////////////
    },//checking distance


    // PARTICLE EXPLOSION EFFECT            
    particleExplosion: function (){
     
    var explosionParticle = new cc.ParticleSystem.create(res.explosionParticle_plist);
    //assign a tag to explosion particle            
    explosionParticle.setTag(3);          
    explosionParticle.attr({
     x: this.InnerSat.x,
     y: this.InnerSat.y,                            
    });
    this.rotationPointIn.addChild(explosionParticle);                   
    }, // particleExplosion
                                
   
                                
    //starting inner explosion                       
    innerStart: function (size){
    

    innerTrail = true;
    innerParticle = new cc.ParticleSystem.create(res.innertrailingParticle_plist);
    //cc.log("LIFE IS " + innerParticle.getLife());
                        
    innerParticleTrailColor = Math.floor(Math.random()*4);
    //cc.log("INNER TRAIL COLOR IS " + innerParticleTrailColor);
                                
    innerParticle.setTag(1);
                                
    innerParticle.attr({
        x: this.InnerSat.x-size/75,
        y: this.InnerSat.y
    });
                                
    switch (innerParticleTrailColor){

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
    }//switch for selecting colour
    //rotate 
    this.rotationPointIn.addChild(innerParticle);
    
                                
    },
         
    //start particles in outer dot                       
    outerStart: function (size){
                                
    outerTrail = true;
    outerParticle = new cc.ParticleSystem.create(res.outertrailingParticle_plist);
                                
    var outerParticleColor = Math.floor(Math.random()*4);
                                
    if (outerParticleColor == innerParticleTrailColor){
        outerParticleColor = 0;
    }
                                
    outerParticle.setTag(2);
                                
                                
    outerParticle.attr({
        x:this.OuterSat.x+size/75,
        y: this.OuterSat.y
    });
                                
    switch (outerParticleColor){

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

    //automiss function
    autoMiss:function()
    {
    var FadeMessageIn = cc.FadeTo.create(0.1,255);
    var FadeMessageOut = cc.FadeTo.create(0.4,0);
    var FlashMessage = cc.Sequence.create(FadeMessageIn,FadeMessageOut);

        //speed control - player doesn't get less than 10 speed
        if(levelInner<10)
        {
                               
        levelDown("Miss");

        }//speed control
                                
        // remove the outer trail
                                
        if (levelOuter == 0 && outerTrail){
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

            //get background back to normal                                
            var brighten = cc.FadeTo(0.5,225);
            this.backgroundPic.runAction(brighten);
        }

        this.changeSpeed();
    //else
    }, //AUTOMISS
    
    //lose when no touch       
    unTouchedLoss:function(){    
        this.autoMiss();
        this.autoLossSpeed(1.05,1);
    },      

    


    //calculating the speed at which the loss check is
    autoLossSpeed:function(innerFactor, combinedFactor){
        if (UNTOUCHEDLOSS){  
            cc.director.getScheduler().unscheduleCallbackForTarget(this,this.unTouchedLoss);
            UNTOUCHEDLOSS = false ;

        }//check whether the speeed 
        

    if (levelOuter == 0){
        var missSpeed = speedInner*innerFactor;
    }

    else{//using some advanced mathmatics to calculate the time at which the auto miss checks
        var innerOmega = 360/speedInner;
        var outerOmega = 360/speedOuter;

        var thetaInner = innerOmega*360/(outerOmega + innerOmega);
        var missSpeed = thetaInner/innerOmega*combinedFactor;
    }
    cc.director.getScheduler().scheduleCallbackForTarget(this,this.unTouchedLoss,missSpeed);
    UNTOUCHEDLOSS = true;
    },//end the thing that calculates the speed             
});//GameLayer

//pause - launch pause scene
var PauseGame = function(){
    //cc.log("pausing the game");
    var scene = new PauseScene();
    cc.director.pushScene(scene);
};//pause

//key function -stops everything and resets all the variables and all the random stuff
var GameOver = function(){
    //resetting all the parameters and variables for new game
    levelInner = 0;
    levelOuter = 0;
    speedInner = 9001;
    speedOuter = 9001;
    
    //allow the game scene to be reinitiated
    GAMEINITIALIZED = false;

    //remove the trails
    innerTrail = false;
    outerTrail = false;

    //set high score
    setHighScore(currentScore);

    ///////launch the game over scene////////
    var scene = new GameOverScene();
    cc.director.runScene(new cc.TransitionFade(0.5,scene));
};//gameover

//leveling up function
var levelUp = function(amount,message){
    //speeding up
    levelInner = levelInner + amount;
    
    //speed limit and control
    if (levelInner >10){//limiting speed
        levelInner = 10;
    }
    
    //speeding up for outer and launching the outer
    if(levelInner>5){//after inner lv 5, start spinning out
        levelOuter ++;
    }
    
    //speed limit for the outer
    if (levelOuter>5){//prevents outer from going past 5
        levelOuter = 5;
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
    //slowing the speed
    levelInner--;
    levelOuter--;

    //speed control
    if (levelOuter<0){
        cc.log("levelouter is now 0");
        levelOuter = 0;
    }
    if (levelInner < 0){
        levelInner = 0;
    }

    //slow loss
    if(levelInner == 0){
        SLOWLOSS = true;
        GameOver();
    }//slow loss

    //setting speed of inner dot
    speedInner = baseSpeed/levelInner;

    //setting speed of outer dot
    if(levelOuter == 0){
        speedOuter = 999;
    }else{
    speedOuter = baseSpeed/levelOuter;
    }

};//leveldown

//set and check high score
var setHighScore = function(currentScore){
    if (currentScore > highScore){
        highScore = currentScore;
    }
    //setting highscore to local storage
    ls.setItem("highscore",highScore);
}//check and set highscore
///////////////////////////////////////////
////////////////////////////////////////////
//////////////////////////////////////////
var GameScene = cc.Scene.extend({
    //to try to access the scene/layer from global function
    AccessLayer:null,

    onEnter:function () {
        this._super();

        if (GAMEINITIALIZED == false){
            GAMEINITIALIZED = true;
            var layer = new GameLayer();
            this.addChild(layer);

        //setting myLayer to something
        this.AccessLayer = layer;
        }//check whether initialized
    }//initiate the scene on enter
});//main function to initiate the scene

