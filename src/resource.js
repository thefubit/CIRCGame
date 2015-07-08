var folder = "";//to allow selective folder directories

if (!cc.sys.isNative)//if not native, meaning it is on the computer/web. then use medRes
{
	folder = "res/mediumRes";
}

//global variables
testvar = "this is a global variable";


//setting what color to display for animated title
var colorselect=0;
while(colorselect == 0){
colorselect = Math.floor(Math.random()*4);
}

if(colorselect == 1){
    titlefolder = "animatedgreen/";
    circcolor = "circgreen";
}
else if (colorselect == 2){
    titlefolder = "animatedred/";
    circcolor = "circred";
}
else if (colorselect == 3){
    titlefolder = "animatedteal/";
    circcolor = "circteal";
}
else if (colorselect == 4){
    titlefolder = "animatedyellow/";
    circcolor = "circyellow";
}



//list out all the resources that the game needs
//REMEMBER THE COMMAS!!!!!!!!!!!
var res = {

	//Background image
    Background_png : "res/goodresbackground.png",

    //for temporary testing
    //CloseNormal_png : "res/CloseNormal.png",
    //CloseSelected_png : "res/CloseSelected.png",

    //Music
    MusicSymbol_png : "res/symbols/musicsymbol.png",
    Background_music : "res/sound/Prototyperaptor-timeless.mp3",
    //Sound
    SoundSymbol_png : "res/symbols/sfxsymbol.png",
    PerfectSound : "res/sound/KH-select.mp3",//note sonic ring sound ideal, but needs to be cut shorter
    GreatSound : "res/sound/Sonic-ring.mp3",
    MissSound : "res/sound/Quack-sound.mp3",
    GameOverSound : "res/sound/Megaman-death.mp3",

    //Button images -settings/mainmenu/mail/resume/ -for pressing
    HomeButton_png : "res/buttons/home.png",
    HomeButtonPressed_png : "res/buttons/homeselected.png",

    SettingsButton_png : "res/buttons/settings.png",
    SettingsButtonPressed_png : "res/buttons/settingsselected.png",

    MailButton_png : "res/buttons/mail.png",
    MailButtonPressed_png : "res/buttons/mailselected.png",

    PauseButton_png : "res/buttons/pause.png",
    PauseButtonPressed_png : "res/buttons/pauseselected.png",

    PlayButton_png : "res/buttons/play.png",
    PlayButtonPressed_png : "res/buttons/playselected.png",

    //symbols
    HighScoreSymbol_png : "res/symbols/highscore.png",
    YourScoreSymbol_png : "res/symbols/score.png",

    //game items/sprites
    InnerSatellite_png : "res/rectsmall.png",
    OuterSatellite_png : "res/rectsmall.png",

    //checkboxes, both selected and unselected
    Checked_png : "res/checkboxes/Checked.png",
    CheckedDisabled_png : "res/checkboxes/CheckedDisabled.png",
    CheckedSelected_png : "res/checkboxes/CheckedSelected.png",
    Unchecked_png : "res/checkboxes/Unchecked.png",
    UncheckedDisabled_png : "res/checkboxes/UncheckedDisabled.png",
    UncheckedSelected_png : "res/checkboxes/UncheckedSelected.png",

    //Title
    GameTitle_png : "res/placeholdertitle.png",//non animated
    
    //animated title
    animatedTitle_plist: "res/animated/"+titlefolder+"sprites.plist",
    animatedTitle_png : "res/animated/" + titlefolder+"sprites.png",
    
    // Particles
    
    particle_texture_plist: "res/particle_texture.plist",
    particle_texture_png: "res/particle_texture.png"









    //effects?





};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}