/*
Author: Robert Hashemian
http://www.hashemian.com/
Revised to jQuery June 8, 2013 by Daniel T Sasser II
http://www.s2-designs.com
*/
function onLoad() {
document.addEventListener("deviceready", onDeviceReady, false);



var TargetDate = "06/09/2013 11:59 AM";
var BackColor = "#f9f9f9";
var ForeColor = "red";
var CountActive = true;
var CountStepper = -1;
var LeadingZero = true;
var DisplayFormat = "%%D%%:%%H%%:%%M%%:%%S%%";


function calcage(secs, num1, num2) {
  var s = ((Math.floor(secs/num1))%num2).toString();
  if (LeadingZero && s.length < 2)
    var s = "0" + s;
  return "<b>" + s + "</b>";
}

function CountBack(secs) {
  if (secs < 0) {
	  var detonatePage = '/res/indexNav.html';
var detonateStatus = $("#timer");
 $.get(detonatePage, {}, function(res,code) {
   detonateStatus.html(res);
 });
    return;
  }
  var DisplayStr = DisplayFormat.replace(/%%D%%/g, calcage(secs,86400,100000));
  var DisplayStr = DisplayStr.replace(/%%H%%/g, calcage(secs,3600,24));
  var DisplayStr = DisplayStr.replace(/%%M%%/g, calcage(secs,60,60));
  var DisplayStr = DisplayStr.replace(/%%S%%/g, calcage(secs,1,60));

  $('#cntdwn').html(DisplayStr);
  if (CountActive)
    setTimeout("CountBack(" + (secs+CountStepper) + ")", SetTimeOutPeriod);
}

function putspan(backcolor, forecolor) {
 $('#timer').html("<h1 align='center'>MORE TO COME IN</h1><h1 align='center' id='cntdwn' style='background-color:" + backcolor + 
                "; color:" + forecolor + "'></h1>");
}

if (typeof(BackColor)=="undefined")
  BackColor = "white";
if (typeof(ForeColor)=="undefined")
  ForeColor= "black";
if (typeof(TargetDate)=="undefined")
  TargetDate = "12/31/2020 5:00 AM";
if (typeof(DisplayFormat)=="undefined")
  DisplayFormat = "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.";
if (typeof(CountActive)=="undefined")
  CountActive = true;
if (typeof(FinishMessage)=="undefined")
  FinishMessage = "";
if (typeof(CountStepper)!="number")
  CountStepper = -1;
if (typeof(LeadingZero)=="undefined")
  LeadingZero = true;


CountStepper = Math.ceil(CountStepper);
if (CountStepper == 0)
  var CountActive = false;
var SetTimeOutPeriod = (Math.abs(CountStepper)-1)*1000 + 990;
putspan(BackColor, ForeColor);
var dthen = new Date(TargetDate);
var dnow = new Date();
if(CountStepper>0)
  var ddiff = new Date(dnow-dthen);
else
  var ddiff = new Date(dthen-dnow);
var gsecs = Math.floor(ddiff.valueOf()/1000);
CountBack(gsecs);
}
