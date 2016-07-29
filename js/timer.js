
// timer setup variables
var startTime=null; //start of a period
var endTime=null; //end of a period
var myStart=null; // global date object
var myDate =null; // global date object
var myEnd=null; // global date object
var myDiff=null;
var curTimer = null; // length of current period
var timer_is_on=0; //is the timer running?

// interval specific variables
var workTime=20; // secs in work period
var mode=null; // in work period?
var restTime=10; // secs in rest period
var warmup=5; //seconds before first work period
var tabCount=8; // number of tabata intervals
var curTab=null; //current tabata interval


function timedCount() // main timer code
{
	if(!myStart)
  		myStart = new Date();
  	myEnd = new Date();
	myDate = new Date();
	myDiff = myDate.getTime() - myStart.getTime();
	myDate.setTime(myDiff);
	
	var min = convertTime(myDate.getMinutes());
	var sec = convertTime(myDate.getSeconds());
	curTimer = min + ':' + sec;
	
	document.getElementById('clock').innerHTML=curTimer;
	
	timer=setTimeout("timedCount()",1000);
	
	if(mode==1)
	{
		document.getElementById('mode').innerHTML='Warmup';
		if(sec>=warmup){
			mode=2;
			myStart = new Date();
		}
	}else if(mode==2)
	{
		document.getElementById('mode').innerHTML='Work';
		if(sec>=workTime){
			mode=0;
			myStart = new Date();
			}
	}else if(mode==0)
	{
		document.getElementById('mode').innerHTML='Rest';
		if(sec>=restTime){
			mode=1;
			myStart = new Date();
			if(curTab>1){
				curTab--;
				document.getElementById('remaining').innerHTML=curTab;
			}else{
				stopCount();
			}
		}
	}
}

function doTimer()// starts the timer
{
	if (!timer_is_on)
 	 {
 		timer_is_on=1;
 		mode=1; //enter warmup period
  		timedCount();
  		document.getElementById('button-box').innerHTML = "<a href='#' class='startButton' onClick='doTimer()'>Stop</a>";
  		curTab=tabCount;
		document.getElementById('remaining').innerHTML=curTab;
 	 }else{
 	 	stopCount();
 	 }
}

function convertTime(i) // returns proper format for min & sec under 10
{
	if (i<10)
		i="0" + i;
	return i;
}

function stopCount()//stops the timer
{
	if (timer_is_on)
	{
		clearTimeout(timer);
		document.getElementById('button-box').innerHTML = "<a href='#' class='startButton' onClick='doTimer()'>Start</a>";
		document.getElementById('clock').innerHTML="00:00";
		document.getElementById('mode').innerHTML='Interval Timer';
		document.getElementById('remaining').innerHTML=tabCount;
		//saveOutput(); // write output
		myStart=null;
		timer_is_on=0;
		mode=null;
	}
}

function openSettings(){
	stopCount();
	document.getElementById('settingsWindow').style.visibility = 'visible'; 
	
}

function closeSettings(){
	document.getElementById('settingsWindow').style.visibility = 'hidden'; 
	document.getElementById('remaining').innerHTML=tabCount;
}

function incInt(){
	tabCount++;
	document.getElementById('intCount').innerHTML=tabCount;
}

function incIntTime(){
	workTime++;
	document.getElementById('intTime').innerHTML=workTime;
}

function incRest(){
	restTime++;
	document.getElementById('restTime').innerHTML=restTime;
}

function incCount(){
	warmup++;
	document.getElementById('CountTime').innerHTML=warmup;
}

function decInt(){
	if(tabCount >=1)tabCount--;
	document.getElementById('intCount').innerHTML=tabCount;
}

function decIntTime(){
	if(workTime >=1)workTime--;
	document.getElementById('intTime').innerHTML=workTime;
}

function decRest(){
	if(restTime >=1)restTime--;
	document.getElementById('restTime').innerHTML=restTime;
}

function decCount(){
	if(warmup >=1)warmup--;
	document.getElementById('CountTime').innerHTML=warmup;
}


