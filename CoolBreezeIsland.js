<!DOCTYPE html>
<html><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width" charset="utf-8">
   
    <title>Dave Fife</title>


  
  <link rel="stylesheet" href="profile.css">
  
<script src="respond.min.js"></script>
  <style type="text/css"></style>
  
  
  </head>

  
   <body>
 
    <div class="siteblock">
    <header>THE ART OF DAVE FIFE
  </header>   
  
<ul class="nav">
  <div class="navbutton" id=""><li class=""><a href="index.html">OILS</a></li></div>
<div class="navbutton" id=""><li ><a href="drawing.html">DRAWING</a></li></div>
  <div class="navbutton" id="works"> <li><a href="profile.html">PROFILE</a></li></div>
<div class="navbutton" id=""> <li><a href="digipaint.html">2D DIGITAL</a></li></div>
  <div class="navbutton" id=""> <li><a href="digital.html">3D DIGITAL</a></li></div>
  <div class="navbutton" id=""> <li><a href="contact.html">CONTACT</a></li></div>
   <!--<div class="navbutton" id=""><li><a href="#">SEQUENTIAL</a></li></div>
   <div class="navbutton" id=""><li><a href="#">SKETCHES</a></li></div>
  <div class="navbutton" id=""> <li><a href="#">DIGITAL</a></li></div>
  <div class="navbutton" id=""> <li><a href="#">PROFILE</a></li></div>
    <div class="navbutton" id=""> <li><a href="#">!</a></li></div>-->
	
</ul><div class="contentbox">
<h1 id="clearnavbar">Profile</h1><div class="textbox"><p></p><div id="portrait"><img src="webportrait.jpg" id="fixed"></div><div><p>I'm an artist with a BFA from Miami University.  I often work from the mind, but sometimes I'll go outside and paint something. <br></br>

 I also program. As an example, below is a Javascript game I made from scratch.  Most of the other hacks I make are boring, so I thought I would make something entertaining that can run in the browser.  It's fun coming up with my own way to make something work. </p></div>

<p><a href="http://www.davefife.com/DavidFife.htm">resume</a>  and  <a href="https://instagram.com/dave.fife/">Instagram napkin drawings</a></p>





<canvas id="canvas" width="616" height="440">
 
 
     <style>
	 
	 
	 </style>
    <script>
	


	
window.onload = function () {


//utilities

var utils={};  // i'm making a utility object that let's me store boilerplate, will add methods to utility obj on the fly.


//var monloader;

//mouse
utils.captureMouse = function (element){            
	var mouse = {x: 0, y: 0};    //declaring mouse object setting properties

    element.addEventListener('mousemove', function (event){
	
	if ( event.pageX || event.pageY) {                 //  event acts on elements in DOM pageX pageY similar to onclick http://www.w3schools.com/jsref/dom_obj_event.asp
	    x = event.pageX;                                     //returns horizontal
		y = event.pageY;                                    //returns vert
	}  else {
		x= event.clientX + document.body.scrollLeft +       
		     document.documentElement.scrollLeft;
	    y= event.clientY + document.body.scrollTop +            //this is stuff you just have to look up, more DOM interface related than js.
		     document.documentElement.scrollTop;
			 }
			 x -= element.offsetLeft;
			 y -= element.offsetTop;
			 
			 mouse.x = x;
			 mouse.y = y;
			 mouse.event = event;
			 }, false);                                                 //boilerplate, dont always need to reinvent, but work to understand
			 
		return mouse;               
	};
   

utils.parseColor = function (color, toNumber) {
  if (toNumber === true) {
    if (typeof color === 'number') {
      return (color | 0); //chop off decimal
    }
    if (typeof color === 'string' && color[0] === '#') {
      color = color.slice(1);
    }
    return window.parseInt(color, 16);
  } else {
    if (typeof color === 'number') {
      color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
    }
    return color;
  }
};
  
  
  
  

  
   
   
   
   
  /////end utilities /////

///shape///
function Ball (radius, color) {
  if (radius === undefined) { radius = 40; }
  if (color === undefined) { color = "#008888"; }
  this.x = 0;
  this.y = 0;
  this.radius = radius;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = utils.parseColor(color);
  this.lineWidth = 5;
}

Ball.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.rotation);
  context.scale(this.scaleX, this.scaleY);
  
  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  context.beginPath();
  //x, y, radius, start_angle, end_angle, anti-clockwise
  context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
  context.closePath();
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};



///////////////////MAPS




 var mapone=[
 [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
 [3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3],
 [3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3],
 [3,4,4,4,1,1,1,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,4,4,3,3,3],
 [3,4,4,4,1,2,1,2,1,2,2,2,2,1,4,4,4,1,2,2,2,2,6,1,4,4,3,3,3],
 [3,4,4,4,1,2,1,2,2,2,2,2,2,1,4,4,4,1,1,5,5,5,1,1,4,4,3,3,3],
 [3,4,4,4,1,2,1,1,2,2,2,2,2,1,4,4,4,1,2,2,2,2,2,1,4,4,3,3,3],
 [3,4,4,4,1,2,2,2,2,2,2,2,2,1,4,4,4,1,1,1,2,1,1,1,4,4,3,3,3],
 [3,4,4,4,1,2,2,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3],
 [3,4,4,4,4,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3],
 [3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3],
 [3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3],
 [3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3],
 [3,3,3,3,3,4,4,3,3,3,3,4,4,4,3,3,3,3,3,3,3,4,4,4,4,4,3,3,3],
 [3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,4,4,4,3,3,3],
 [3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,4,4,3,3,3],
 [3,4,4,4,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3],
 [3,4,4,4,1,6,1,2,2,2,2,2,2,1,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3],
 [3,4,4,4,1,2,1,2,2,2,2,2,2,1,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3],
 [3,4,4,4,1,2,5,2,2,2,2,2,2,1,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3],
 [3,4,4,4,1,2,5,2,2,2,2,2,2,1,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3],
 [3,4,4,4,1,1,1,2,2,2,2,2,2,2,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3],
 [3,4,4,4,1,2,2,2,2,2,2,2,2,1,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3],
 [3,4,4,4,1,2,2,2,2,2,2,2,2,1,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3],
 [3,4,4,4,1,2,2,2,2,2,2,2,2,1,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3],
 [3,4,4,4,1,2,2,2,2,2,2,2,2,1,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3],
 [3,4,4,4,1,1,1,2,2,2,2,2,2,1,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3],
 [3,4,4,4,1,2,5,2,2,2,2,2,2,1,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3],
 [3,4,4,4,1,2,5,2,2,2,2,2,2,1,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3],
 [3,4,4,4,1,2,1,2,2,2,2,2,2,1,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3],
 [3,4,4,4,1,6,1,2,2,2,2,2,2,1,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3],
 [3,4,4,4,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
 [3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,4,3,3,3],
 [3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,4,3,3,3],
 [3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,4,3,3,3],
 [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],

 ];

 var maptwo =[
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,6,6,6,4,4,4,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,6,6,6,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5],
[5,5,5,5,5,5,6,6,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5],
[5,5,5,5,5,5,6,6,4,4,4,4,4,4,4,4,4,4,4,4,16,16,16,16,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,12,4,4,4,4,4,4,5,5,5,5,5,5],
[5,5,5,5,5,5,6,6,4,4,4,4,4,4,4,4,4,4,16,16,16,16,16,16,16,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5],
[5,5,5,5,5,5,6,6,4,4,4,4,4,4,4,4,4,4,4,4,16,16,16,16,16,16,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,4,4,12,4,4,4,4,4,4,4,4,4,4,4,4,16,16,16,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,6,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,16,16,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,6,6,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,4,4,8,8,8,8,8,8,8,8,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,6,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,4,8,8,9,8,8,8,8,8,8,8,8,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,6,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,4,8,9,9,9,8,8,8,8,9,9,8,8,8,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,6,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,8,8,9,9,9,8,8,8,8,9,9,9,9,8,8,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,6,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,8,9,9,9,9,9,8,8,8,9,9,9,9,8,8,8,8,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,6,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,8,8,9,9,9,9,8,8,8,9,9,9,9,9,9,9,8,8,8,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,4,4,8,9,9,9,8,8,8,8,9,9,9,9,9,8,8,8,8,8,8,8,8,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,4,4,8,8,8,9,8,4,4,8,8,8,9,9,8,8,8,8,8,8,8,8,8,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,4,4,4,4,4,8,8,4,4,4,4,4,4,8,8,8,8,8,9,8,8,8,8,8,8,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,8,8,8,9,9,9,8,8,8,8,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,4,4,4,4,4,4,4,4,4,4,4,4,8,8,8,8,8,8,9,9,9,9,8,8,8,8,8,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,4,4,4,4,4,4,4,4,4,4,4,4,8,8,9,9,9,9,9,9,9,9,9,8,8,8,8,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,4,4,4,4,4,4,4,4,4,4,4,4,8,8,8,9,9,9,9,9,9,8,8,8,9,9,8,8,8,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,6,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,4,4,4,4,4,4,4,4,4,4,4,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,8,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,4,4,4,4,4,4,4,4,4,4,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,8,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,4,4,4,4,4,4,4,4,4,4,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5],
[5,5,5,5,5,5,6,4,4,4,4,4,4,4,4,4,4,4,4,4,8,8,8,9,9,9,9,9,9,9,8,8,4,4,4,4,8,8,9,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5],
[5,5,5,5,5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,8,9,8,8,8,8,8,8,8,9,8,4,4,4,8,8,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5],
[5,5,5,5,5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,8,8,8,4,4,8,8,8,4,4,4,4,4,4,4,4,8,8,8,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5],
[5,5,5,5,5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,8,8,8,8,8,4,4,4,4,4,4,4,6,6,5,5,5,5,5,5],
[5,5,5,5,5,5,4,4,4,4,4,4,4,16,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,8,8,8,8,9,9,8,8,4,4,4,4,4,4,6,5,5,5,5,5,5],
[5,5,5,5,5,5,4,4,4,4,4,4,16,16,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,8,8,9,8,8,14,9,8,4,4,4,4,4,4,4,4,5,5,5,5,5,5],
[5,5,5,5,5,5,6,6,4,4,16,16,16,16,16,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,8,8,4,4,8,9,9,9,9,8,4,4,4,4,4,4,5,5,5,5,5,5,5],
[5,5,5,5,5,5,5,6,4,4,4,16,16,16,16,16,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,8,8,9,9,5,4,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,6,6,4,4,4,4,16,16,16,16,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,8,8,8,5,4,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,6,6,6,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,4,4,4,4,4,4,4,4,4,4,4,4,6,6,6,6,6,6,6,6,6,6,6,4,4,4,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],

 
 ];
 
 
  var mapthree=[
 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
 [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
 [1,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,1,1,1,1,2,2,2,1],
 [1,2,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1,2,1,1,2,2,1,1,2,2,2,2,2,1],
 [1,1,1,2,2,2,2,2,2,2,2,2,2,2,1,1,1,2,1,2,1,2,2,2,1,2,2,1,1,2,1],
 [1,8,1,1,2,1,1,1,1,1,1,1,1,2,1,2,2,2,1,2,1,1,1,2,1,2,2,2,2,2,1],
 [1,2,2,1,2,1,2,2,2,2,2,1,1,2,1,1,1,2,1,2,2,1,2,1,2,2,1,1,2,2,1],
 [1,2,2,1,2,2,2,1,2,2,1,1,1,2,2,2,1,2,1,2,2,1,2,2,2,2,2,1,2,2,1],
 [1,2,2,1,2,1,2,1,2,2,1,2,2,1,1,2,1,2,1,1,2,2,1,1,2,1,1,2,1,2,1],
 [1,2,2,1,2,1,2,1,2,2,1,2,2,1,1,2,1,2,1,2,2,1,1,1,2,1,1,2,2,1,1],
 [1,2,2,1,2,1,2,1,2,2,2,1,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1,1,2,1,1],
 [1,2,2,2,2,2,2,2,2,2,2,1,1,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,1,1],
 [1,2,2,2,2,2,2,2,2,2,2,1,2,1,1,2,1,2,2,2,2,2,2,2,2,2,1,2,2,2,1],
 [1,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,1,1],
 [1,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1],
 [1,2,2,2,2,2,2,2,1,2,1,1,1,2,2,2,1,1,2,2,1,1,2,2,2,2,1,1,2,2,1],
 [1,2,2,2,2,2,2,1,1,2,1,1,1,2,2,2,1,2,2,2,1,1,2,2,2,2,1,2,2,2,1],
 [1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1],
 ];

  var mapfour=[
 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
 [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,1],
 [1,2,2,2,2,2,1,1,1,1,5,5,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,2,2,2,1],
 [1,2,1,1,1,2,2,2,2,2,5,5,2,2,2,1,1,1,2,1,1,2,2,1,1,2,2,2,2,2,1],
 [1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,1,1,2,1,2,1,2,2,2,1,2,2,1,1,2,1],
 [1,8,1,1,2,1,1,1,5,5,5,1,1,2,1,2,2,2,1,2,1,1,1,2,1,2,2,2,2,2,1],
 [1,1,1,1,2,1,2,2,5,5,2,1,1,2,1,1,1,2,1,2,2,1,2,1,2,2,1,1,2,2,1],
 [1,2,2,1,2,2,2,5,5,2,1,1,1,2,2,2,1,2,1,2,2,1,2,2,2,2,2,1,2,2,1],
 [1,2,2,1,2,1,2,5,5,2,1,2,2,1,5,2,1,2,1,1,2,2,5,1,2,1,1,2,1,2,1],
 [1,2,2,1,2,1,5,5,2,2,1,2,2,1,1,2,1,2,1,2,2,1,5,1,2,1,1,2,2,1,1],
 [1,2,2,1,2,1,5,5,2,2,2,1,2,2,2,2,5,2,2,2,2,5,5,2,2,2,1,1,2,1,1],
 [1,2,2,2,2,2,2,2,2,2,2,5,1,2,2,1,5,2,2,2,2,2,2,2,2,2,1,1,2,1,1],
 [1,2,2,2,2,2,2,2,2,2,2,5,2,1,1,2,1,2,2,2,2,2,2,2,2,2,1,2,2,2,1],
 [1,2,2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,1,1],
 [1,2,2,2,2,2,2,1,1,1,1,1,5,2,5,1,5,5,5,1,5,1,1,2,2,1,1,1,1,1,1],
 [1,2,2,2,2,2,2,2,1,2,1,5,5,2,2,2,5,5,2,2,5,1,2,2,2,2,1,1,2,2,1],
 [1,5,5,2,2,2,2,1,1,2,5,5,1,2,2,5,5,2,2,2,1,1,2,2,2,2,1,2,2,2,1],
 [1,5,5,2,2,2,2,2,1,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
 ];

 
 
 var mapfive=[
 [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
 [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
 [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
 [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
 [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
 [4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4],
 [4,4,4,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,4,4,4],
 [4,4,4,1,5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,2,2,2,2,1,4,4,4],
 [4,4,4,1,5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3,2,2,2,2,3,2,3,2,2,2,2,3,2,2,2,3,2,2,2,2,1,4,4,4],
 [4,4,4,1,5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,2,2,2,2,2,2,2,2,2,3,7,7,7,3,2,2,2,2,3,2,3,2,2,2,2,3,7,7,7,3,2,2,2,2,1,4,4,4],
 [4,4,4,1,5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,3,2,3,2,2,2,2,2,2,2,2,3,2,2,2,2,1,4,4,4],
 [4,4,4,1,5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,2,2,2,2,2,3,2,2,2,2,2,2,2,2,3,2,3,2,2,2,2,2,2,2,2,3,2,2,2,2,1,4,4,4],
 [4,4,4,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,2,2,2,2,3,3,3,3,3,3,2,3,3,3,2,3,3,3,2,3,3,3,3,3,3,2,2,2,2,1,4,4,4],
 [4,4,4,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,4,4,4],
 [4,4,4,1,5,5,5,1,1,1,1,1,1,1,1,1,1,1,5,5,1,1,1,1,1,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,4,4,4],
 [4,4,4,1,5,5,5,1,2,2,2,2,2,2,2,2,2,1,1,1,1,2,2,2,1,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,4,4,4],
 [4,4,4,1,5,5,5,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,5,5,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,2,2,2,2,2,1,4,4,4],
 [4,4,4,1,5,5,5,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,5,5,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,2,2,2,2,2,1,4,4,4],
 [4,4,4,1,5,5,5,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,5,5,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,2,2,2,2,2,1,4,4,4],
 [4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,4,4,4],
 [4,4,4,1,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,4,4,4],
 [4,4,4,1,2,1,1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1,5,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,4,4,4],
 [4,4,4,1,2,1,2,2,2,2,2,2,2,2,2,1,1,1,2,2,1,1,1,1,1,1,1,5,5,5,5,5,2,2,2,5,5,5,5,5,2,2,2,5,5,5,5,5,2,2,2,5,5,5,5,1,1,1,4,4,4],
 [4,4,4,1,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2],
 [4,4,4,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
 [4,4,4,1,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2],
 [4,4,4,1,2,1,2,2,2,2,2,2,2,2,2,1,1,1,2,2,1,1,1,1,1,1,1,5,5,5,5,5,2,2,2,5,5,5,5,5,2,2,2,5,5,5,5,5,2,2,2,5,5,5,5,1,1,1,4,4,4],
 [4,4,4,1,2,1,1,2,2,2,2,2,2,2,2,1,5,1,2,2,2,2,2,2,1,5,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,4,4,4],
 [4,4,4,1,2,2,2,2,2,2,2,2,2,2,2,1,5,1,2,2,2,2,2,2,1,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,4,4,4],
 [4,4,4,1,1,1,1,2,1,1,1,1,1,1,1,1,5,1,2,2,2,2,2,2,1,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,4,4,4],
 [4,4,4,1,5,5,1,2,1,5,5,5,5,5,5,1,1,1,2,2,2,2,2,2,1,5,5,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,2,2,2,2,2,3,3,3,3,3,2,2,1,4,4,4],
 [4,4,4,1,5,1,1,2,1,1,1,1,1,1,5,1,2,2,2,2,2,2,2,2,1,5,5,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,2,2,2,3,3,3,2,2,2,3,2,2,1,4,4,4],
 [4,4,4,1,5,1,2,2,2,2,2,2,2,1,5,1,2,2,2,2,2,2,2,2,1,5,5,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,2,2,2,2,2,2,2,2,2,3,2,2,1,4,4,4],
 [4,4,4,1,5,1,2,2,2,2,2,2,2,1,5,1,2,2,2,2,2,2,2,2,1,5,5,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,2,2,3,3,3,2,2,2,2,3,2,2,1,4,4,4],
 [4,4,4,1,5,1,2,2,2,2,2,2,2,1,5,1,2,2,2,2,2,2,2,2,1,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,7,2,2,2,2,3,2,2,1,4,4,4],
 [4,4,4,1,5,1,2,2,2,2,2,2,2,1,5,1,1,1,1,2,2,2,1,1,1,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,7,2,2,3,3,3,2,2,1,4,4,4],
 [4,4,4,1,5,1,2,2,2,2,2,2,2,1,5,1,2,2,2,2,2,2,2,2,1,5,5,2,2,2,2,2,2,2,3,3,3,3,3,2,3,3,3,2,2,2,2,3,3,3,2,2,2,2,3,2,2,1,4,4,4],
 [4,4,4,1,5,1,1,1,1,1,1,2,1,1,1,1,2,2,2,2,2,2,2,2,1,5,5,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,3,2,2,2,2,3,2,2,2,2,2,2,3,2,2,1,4,4,4],
 [4,4,4,1,5,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,5,5,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,3,2,2,2,2,3,2,2,2,3,2,2,3,2,2,1,4,4,4],
 [4,4,4,1,5,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,5,5,2,2,2,2,2,2,2,3,2,3,7,7,7,3,2,3,2,2,2,2,3,2,2,2,3,2,2,3,2,2,1,4,4,4],
 [4,4,4,1,5,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,5,5,2,2,2,2,2,2,2,3,2,3,2,2,2,3,2,3,2,2,2,2,3,3,3,3,3,3,3,3,2,2,1,4,4,4],
 [4,4,4,1,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,4,4,4],
 [4,4,4,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,4,4,4],
 [4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4],
 [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
 [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
 [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
 [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
 [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
 ];
 
//
//definitions of objects to make understand and typing easier
	
		  //definitions of physics
//remember veloc = mass x accel? that stuff can actually be used, along with sohcahtoa and matrices.

//makes random color

	



//alert



//////objects////////

	
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	
	//var canvasb = document.getElementById('background');
	//var contextb = canvas.getContext('2d'),
	
	      mouse = utils.captureMouse(canvas);	
          image = new Image();
		  brick = new Image();
		  wall = new Image();
		  grass = new Image();
		  tree = new Image();
		  elfgirl = new Image();
		  biggs = new Image();
		  fight = new Image();
		  select=new Image();
		  happy=new Image();
		  ocean = new Image();
		  town= new Image();
		  sand = new Image();
		  cave= new Image();
		  hill = new Image();
		  mountain = new Image();
		   woods= new Image();
		  dwarf=new Image();
		  stone=new Image();
		  desk=new Image();
		  greenman=new Image();
		  chest=new Image();
		  testknight=new Image();
		  wedge=new Image();
		  king=new Image();
		  ruffian=new Image();
		  caveraider=new Image();
		  mutation=new Image();
		  grass.src ="grass.png";
		  brick.src = "brick40.png";
		  wall.src = "wall40.png";
		  tree.src = "tree.png";
		  image.src = "cleardw3.png";
		  elfgirl.src = "elfgirl.png";
		  king.src="king.png";
		  mutation.src="mutation.png";
		  wedge.src="biggs.png";
		  fight.src="fight.png";
		   select.src="select.png";
		   happy.src="happy200.png";
		   ocean.src="ocean.png";
		   mountain.src ="mountain.png";
		   hill.src ="hill.png";
		   cave.src ="cave.png";
		   sand.src ="sand.png";
		   town.src ="town.png";
		     woods.src ="woods.png";
			 dwarf.src="dwarf.png";
			stone.src="stone.png";
			desk.src="desk.png";
           greenman.src="greenman.png";
		   chest.src="chest.png";
			testknight.src="testknight.png";
           ruffian.src="ruffian.png";
		   caveraider.src="caveraider.png";
		   var poorbox=false;
			var gold=0;
			 var exp =0;
		    var stepcounter =0;
		    var a=20;
            var b=2;
            var c=16;
            var d=16;
            var e=280;
            var f=200;
            var g=40;
            var h=40;  
		    var z=7;
			
		
			
			
		 var elfe=mapone[3][2];
		  var elfx=9;
		  var elfy =5;
		  var dwarfx = 14;
		  var dwarfy = 1;
		  
		  
		  var monflag=false;
		  
		  
		  
		  
		  
		  ball = new Ball(),
		     vx = 3,           
             vy = 1;
            ax = .1,
		     ay = .3;
      ball.x = 50;
      ball.y = 100;
	    /*  
		  var herolife =40;
		  var maxlife  =80;
		  var ATT = 10;
		  var DEF =2;
		  var MP=12;
		  var MAXMP=12
		  
		  */
		  //factory function returns a new Person object
		  
		  
		  function Monster (name, hp, lifeTotal,mp,maxmp,pow,def,exp){
          this.name = name;
		  this.hp = hp;
		  this.lifeTotal =lifeTotal;
		  this.mp=mp;
		  this.maxmp=maxmp;
		  this.ATT=pow;
		  this.DEF=def;
		  this.exp=exp;
		}
		  
		 var hero = new Monster ("Hero", 40,40,12,12,5,5,0);
		 var level=0;
		 
		 
		// var wedge = new Monster ("Wedge", 20,20,12,12,2,3,0);
		// var testknight = new Monster ("testknight", 40,40,12,12,4,4,0);
	//	 var wedge = new Monster("Wedge",30,30,0,0,4,6,25);
		// var testknight = new Monster("Testknight",20,20,0,0,10,8,40);
		  /*
		 var Bauble = function (name){
		  this.name=name;
		  }
		  Bauble.prototype.action ={
		  
		  
		  };
		  var bandage = new Bauble ("bandage"); 
		  */
		//  function () ={
		  //   this.locationxy = locationxy;
			 
		  
		  
		//  }
		   //var elvengirl = new Person {
		  
		  
		//locationxy = mapone[14] [10];
		
		//locationx =((14*40)-screenx),
		  //var locationy =((10*40)-screeny);
		  
		 // }
		 function Person (locationx, locationy) {
 
  this.locationx = locationx;
  this.locationy = locationy;
  this.locationxy= mapone[locationx][locationy];
}

      var hit =false;
	 
	/*  
	 
	 var  hero ={
	 this totalLife= 80,
	 this HP:totalLife,
	 this pow:10
	 
	 };
	 /*   
     var poacher ={
	 this totalLife: 80,
	 this HP:totalLife,
	 this pow:2
	 
	 };
	    
	
	   
     
	 
	 if (hit==true){
	HP-=5;
	hit=false;
	if(HP<=0){
	return
	}
	  }
	  
	  }   

	*/ 
		  
	/*	  
		  ////collision detection attempt
		  var tilewidth = 40;
		  var tileheight = 40;
		  	for(var q=0;q<mapone.length;q++){
		for(var r=0;r<mapone[q].length;r++){
	if (mapone ==1){r,*tilewidth*tileheight};
	  
	}}
		  
	  
	*/	  
		  
		 var ptiley= playerf/40;
		  
	/////////canvas location
	
		  

		  
		  
	//////EventListeners////////
	

function onTouchEvent(event) {
	var eventTouch;
	var x;
	var y;
	eventTouch = event.changedTouches[0];
	 x=eventTouch.pageX;
	 y=eventTouch.pageY;
var offleft=canvas.offsetLeft;
var offtop = canvas.offsetTop;
var offwid = offleft + canvas.width;
var offhig = offtop + canvas.height;
//document.write(   offhig-offtop );






if (exp>levelup){exp=0; level++;levelbox=true;hero.ATT+=1;hero.DEF+=1;hero.lifeTotal+=8;hero.maxmp+=4;hero.hp=hero.lifeTotal;hero.mp=hero.maxmp;levelup*=1.6;};


if(speechbox==true){
z=5;
}











	var Person = function (name,locx,locy,speech,map){
	this.name=name;
	this.x=locx;
	this.y=locy;
  //  this.speech=speech;
	this.map=map;
	
	

	
	
  	if(stepcounter==5){
		 monloader=Math.floor((Math.random()*4)+1);
		
		};
	
	 if(maplist==this.map){
	//////////////////playercollisionwithperson
	if(screen.width<=370){
	if( y >offtop && y< offtop + canvas.height/5 &&  x >offleft && x> screen.width/4  && x < screen.width*.75)       
	{

		if((playere/40) ==(locx)&& (playerf/40) ==(locy+1)){
	     //  alert("Nice Day.");
	      screeny-=40;
	playerf+=40;
	speechbox=true;
	talk =speech;
	};//up
	
	
	};
	if( y >offtop+(canvas.height/3) && y< offhig &&  x >offleft && x> screen.width/4  && x < screen.width*.75) {
	
	
		if((playere/40) ==(locx) && (playerf/40) ==(locy-1)){
	     //  alert("Nice Day.");
	  screeny+=40;
	playerf-=40;
	speechbox=true;
	talk = speech;
	};//down
	//alert(locx+"  locx and lego "+lego+" playere/40 "+playere/40+ " locy "+locy+"  locy and ego "+ego+" playerf/40 "+playerf/40 );
	};
	if(y >offtop+(canvas.height/4) && y< offhig && x< screen.width/4  ){
		if(((playere/40) ==(locx+1))&& ((playerf/40) ==(locy))){
	     //  alert("Nice Day.");
	    screenx-=40;
	       playere+=40;
		   speechbox=true;
		   talk = speech;
	};//left
	};
	
		if(y >offtop+(canvas.height/4) && y< offhig && x> screen.width*.75  ){
	
	
		if((playere/40) ==(locx-1)&& (playerf/40) ==(locy)){
	     //  alert("Nice Day.");
	      screenx+=40;
	       playere-=40;
		   speechbox=true;
		   talk = speech;
	};//right
	
	
	};
};



if(screen.width>370){




if( y >offtop+(canvas.height/2) && y< offhig  && x> offleft+(canvas.width/4)  &&x< offleft+(canvas.width*.75)) {

	if((playere/40) ==(locx) && (playerf/40) ==(locy-1)){
	     //  alert("Nice Day.");
	  screeny+=40;
	playerf-=40;
	speechbox=true;
	talk = speech;
	};//down


};//down


if(  y >offtop && y< offhig-(canvas.height/2) && x> offwid/4  && x < offwid*.75)       {

if((playere/40) ==(locx)&& (playerf/40) ==(locy+1)){
	     //  alert("Nice Day.");
	      screeny-=40;
	playerf+=40;
	speechbox=true;
	talk =speech;
	};//up

};//up


if(x >offleft && x< offleft+(canvas.width/4) && y< offhig  && y > offtop+canvas.height*.3  ){
	if(((playere/40) ==(locx+1))&& ((playerf/40) ==(locy))){
	     //  alert("Nice Day.");
	    screenx-=40;
	       playere+=40;
		   speechbox=true;
		   talk = speech;
	};

}//left

if( x >offleft+(canvas.width*.75) && x< offwid && y< offhig  && y > offtop+canvas.height*.3 ){
	if((playere/40) ==(locx-1)&& (playerf/40) ==(locy)){
	     //  alert("Nice Day.");
	      screenx+=40;
	       playere-=40;
		   speechbox=true;
		   talk = speech;
	};

}//right

};



		
	};//left

	//alert(locx+"  locx and lego "+lego+" playere/40 "+playere/40+ " locy "+locy+"  locy and ego "+ego+" playerf/40 "+playerf/40 );
	};
	
	


	var bobby = new Person ("Bobby", lego,ego, "Colbreese castle is in the South!",mapone);
	var Jim = new Person ("Jim", lego2,ego2, "I am the armor store's best customer!",mapone);
	var Laura = new Person ("Laura", lego3,ego3, "Pine Shore is to the North!",mapfive);
	var Dave = new Person ("Dave", lego4,ego4, "There's a cave to the East!",mapfive);
	var Riley = new Person ("Riley", lego5,ego5, "Such a beautiful day!",mapfive);
	var Roger = new Person ("Roger", lego6,ego6, "I like to eat at The Blue Banner!",mapfive);
	var Jill = new Person ("Jill", lego7,ego7,"Great Shopping to be had!",mapfive);


























if(screen.width<=370){
if( y >offtop+(canvas.height/3) && y< offhig &&  x >offleft && x> screen.width/4  && x < screen.width*.75) {

     
  
   	 if(maplist==maptwo){
	  if(playere/40==10&&playerf/40==47){
	  
	 maplist=mapfive;
	screenx=-680;
	 screeny=-2000;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	  
	  };
	 
	 
	 }
  
  
  
  
  
  keypressed= 40;
     console.log("down!")
	 ball.y+=10;
	 if(a!=56){a=56;}
	 else a+=18;
	 
	 
	if (yesbox==true){
	if(yncursor==84){
	yncursor+=25;
	}
	}

	 if (sellbox==true){
	if(yncursor==84){
	yncursor+=25;
	}
	}
	 
	 
	
	 
	 
	 
	 
	 
	 
	 
	  if(z %5 != 0 ){
	if((maplist[(playere)/40][(playerf+40)/40] %2)==0 && stepcounter!=40)
	{
		if (maplist==mapthree){
	if((playerf/40-1) ==1 && (playere/40) ==14){

	screeny-=40;
	playerf+=40;
	speechbox=true;

	
	};}
	
	//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	
	if(maplist==mapfive){
	
	if( screenx==-680&&screeny==-2080){
	//to change the starting location on a new map mess with screenx screeny in multiples of 40 
	maplist=maptwo;
		screenx=-120;
	 screeny=-1720;
	 
	 
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	}};
	
		if (maplist==mapone){
	if(((playerf+80)/40-1) ==5 && (playere/40) ==9){
	
	screeny+=40;
	playerf-=40;
	};
		
	if(((playerf+80)/40-1) ==28 && (playere/40) ==31){
	
 //playerf +' '+screeny+'   '+playere+ ' ' +screenx
	maplist =maptwo;
    screenx=-240;
	 screeny=-240;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	}};
	
	if (maplist==maptwo){
	    if(screenx==-240 && screeny==-200){
	
	
 
	maplist =mapone;

	screenx=-960;
	 screeny=-800;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	
	}
	   if(screenx==-1160 && screeny==-1520){
	maplist =mapthree;

	screenx=-400;
	 screeny=-480;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	}
	};
	
	
	
	
	
	screeny-=40;
	tiley-=1;
	playerf+=40;
	stepcounter++;
	};
	}
	
	if(z ===5 ){
if (cursorUp !=190){
cursorUp +=30;

}
}

if(z===15){
if(battleUp != 288){
	battleUp +=30;
}
}

if(batitem==1 || spell==1){
 if(cursorList!=280){
 cursorList+=30;
 
 };
}


if(items==true || magic==true || equip==true||shopOpen==true||sellwindow==true){
	 if(cursorList!=280){
	cursorList+=30;
	
	
	
	};
	};
	
	 if(items==true){
	
	 
	 if(itemarray.length>listlength && cursorList==280){
	liststart++;
	listlength++;
	
	};
	 };
	 
	  if(batitem==1){
	
	 
	 if(itemarray.length>listlength && cursorList==280){
	liststart++;
	listlength++;
	
	};
	 };
	 
	 if(sellwindow==true){
	
	 
	 if(sellList.length>listlength && cursorList==280){
	liststart++;
	listlength++;
	
	};
	 };
	 	 if(equip==true){
	
	 
	 if(equiparray.length>listlength && cursorList==280 && equipscrollflag==true){




	 liststart++;
	listlength++;
	
	};
	
	 if(equiparray.length>listlength && cursorList==280&& equipscrollflag==false){
	 equipscrollflag=true;
	 
	 };
	 
	 
	 
	 
	 
	 

	 };
	 
	  	 if(shopOpen==true){
	
	 
	 if(shoparray.length>listlength && cursorList==280){
	liststart++;
	listlength++;
	
	};
	 };
	
	
	
	};//end of if
	
	
	
	
	if(  x< screen.width/4 && y >offtop && y< offtop + canvas.height/5 ){
	
 
  if (sellbox==true){
  		
     if (yncursor==84){
	    shopOpen=true;
	 sellbox=false;
	 speechbox=false;
	
	 };
     if (yncursor==109){
	 		 if(maplist==mapone){
		     if(playere/40==20 &&playerf/40==7  ){
			    sellList=equiparray;
			 }
			 };
	   

	   sellwindow=true;
		sellbox=false;
	     speechbox=false;
		
		
		
	 };
  
  
  
  }
  
  

	

	

  
if (z%7==0){
 
  z=5;

  
  }
  
  /*
	        this.name = name;
		  this.hp = hp;
		  this.lifeTotal =lifeTotal;
		  this.mp=mp;
		  this.maxmp=maxmp;
		  this.ATT=pow;
		  this.DEF=def;
		  this.exp=exp;
*/

  
  
  else if(z==5){
  
  	  if(items===true){
	  
	
	if (cursorList==160){ hero.hp+=itemarray[0].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[0].mp;itemarray[0]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);     };
	
	//if (cursorList==160){ itemflag=true}; 
	
	if (cursorList==190){ hero.hp+=itemarray[1].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[1].mp;itemarray[1]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);     };
	
	if (cursorList==220){ hero.hp+=itemarray[2].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[2].mp;itemarray[2]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);     };
	
	if (cursorList==250){ hero.hp+=itemarray[3].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[3].mp;itemarray[3]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);     };
	
	if (cursorList==280){ hero.hp+=itemarray[4].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[4].mp;itemarray[4]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);     };

	
	};
	
	
	
	
	
	

	if(shopOpen===true){
	
	//to keep from immediate purchase as soon as window opens
	
	
	if (cursorList==160 && shopflag==true ){  if(gold>=shoparray[liststart].cost){ if(shoparray!=itemshoparray){	equiparray.push(shoparray[liststart]);}   else itemarray.push(shoparray[liststart]);gold=gold-shoparray[liststart].cost;}else{poorbox=true;}};
	
	if (cursorList==160){ shopflag=true}; //must be after so not set to true on open

	if (cursorList==190){  if(gold>=shoparray[liststart+1].cost){ if(shoparray!=itemshoparray){	equiparray.push(shoparray[liststart+1]); }   else itemarray.push(shoparray[liststart+1]);gold=gold-shoparray[liststart+1].cost;}else{poorbox=true;}};
	
	if (cursorList==220){  if(gold>=shoparray[liststart+2].cost){ if(shoparray!=itemshoparray){	equiparray.push(shoparray[liststart+2]);}   else itemarray.push(shoparray[liststart+2]);gold=gold-shoparray[liststart+2].cost;}else{poorbox=true;}};
	
	if (cursorList==250){  if(gold>=shoparray[liststart+3].cost){ if(shoparray!=itemshoparray){	equiparray.push(shoparray[liststart+3]);}   else itemarray.push(shoparray[liststart+3]);gold=gold-shoparray[liststart+3].cost;}else{poorbox=true;}};
	
	if (cursorList==280){  if(gold>=shoparray[liststart+4].cost){ if(shoparray!=itemshoparray){	equiparray.push(shoparray[liststart+4]);}   else itemarray.push(shoparray[liststart+4]);gold=gold-shoparray[liststart+4].cost;}else{poorbox=true;}};

	
	};
		if(sellwindow===true){
		   if(playere/40==6&&playerf/40==20){
		   sellList=itemarray;
		   
		   }
		else{sellList=equiparray;}
		
	if (cursorList==160 && sellflag==true){  gold=gold+Math.floor((sellList[liststart].cost)/2);sellList[liststart]=0;   sellList=arrayClose(sellList);  if(playere/40==6&&playerf/40==20){itemarray=sellList;}else{equiparray=sellList;}; sellflag=false; }
	    

if (cursorList==160){ sellflag=true}; 
	//if(playere/40==20&&playerf/40==7){equiparray=sellList;};
	
	
	if (cursorList==190){  gold=gold+Math.floor((sellList[liststart+1].cost)/2)   ;sellList[liststart+1]=0;    sellList=arrayClose(sellList); if(playere/40==6&&playerf/40==20){itemarray=sellList;}else{equiparray=sellList;};  };
	
	if (cursorList==220){  gold=gold+Math.floor((sellList[liststart+2].cost)/2)  ;sellList[liststart+2]=0;     sellList=arrayClose(sellList); if(playere/40==6&&playerf/40==20){itemarray=sellList;}else{equiparray=sellList;};  }
	
	if (cursorList==250){ gold=gold+Math.floor((sellList[liststart+3].cost)/2)   ;sellList[liststart+3]=0;     sellList=arrayClose(sellList); if(playere/40==6&&playerf/40==20){itemarray=sellList;}else{equiparray=sellList;}; }
	
	if (cursorList==280){  gold=gold+Math.floor((sellList[liststart+4].cost)/2)   ;sellList[liststart+4]=0;     sellList=arrayClose(sellList); if(playere/40==6&&playerf/40==20){itemarray=sellList;}else{equiparray=sellList;}; }

	

	
	
	};

	
	
	
	 if(magic===true){
  	if (cursorList==160){  if (hero.mp>4){if(hero.lifeTotal-hero.hp>10){hero.hp+=10;}else{hero.hp=hero.lifeTotal};hero.mp-=5;};}   
	
	
	if (cursorList==190){  };
	
	if (cursorList==220){  };
	
	if (cursorList==250){ };
	
	if (cursorList==280){  if (hero.mp>15){hero.hp=hero.lifeTotal;hero.mp-=16;} };
  cursorUp=190;
  };
  
  
  
  
   if(equip===true){
  	
	if (cursorList==160&&equipflag==true){  

	

	
	
	if (equiparray[liststart].kind=="W"){ if (kindW!=equiparray[liststart])  {kindW=equiparray[liststart]}   else {kindW=barefist;  }totA=hero.ATT+kindW.att+kindS.att+kindA.att;} ;

if (equiparray[liststart].kind=="S"){ if (kindS!=equiparray[liststart])  {kindS=equiparray[liststart]}   else {kindS=barearm;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;

if (equiparray[liststart].kind=="A"){ if (kindA!=equiparray[liststart])  {kindA=equiparray[liststart]}   else {kindA=bareback;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;
   

	};
		
	if (cursorList==160){ equipflag=true};
	
	if (cursorList==190){ 

	if (equiparray[liststart+1].kind=="W"){ if (kindW!=equiparray[liststart+1])  {kindW=equiparray[liststart+1]}   else {kindW=barefist;  }totA=hero.ATT+kindW.att+kindS.att+kindA.att;} ;

if (equiparray[liststart+1].kind=="S"){ if (kindS!=equiparray[liststart+1])  {kindS=equiparray[liststart+1]}   else {kindS=barearm;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def; } ;

if (equiparray[liststart+1].kind=="A"){ if (kindA!=equiparray[liststart+1])  {kindA=equiparray[liststart+1]}   else {kindA=bareback;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;

      

	};
	
	if (cursorList==220){ 
	
		if (equiparray[liststart+2].kind=="W"){ if (kindW!=equiparray[liststart+2])  {kindW=equiparray[liststart+2]}   else {kindW=barefist;  } totA=hero.ATT+kindW.att+kindS.att+kindA.att;} ;

if (equiparray[liststart+2].kind=="S"){ if (kindS!=equiparray[liststart+2])  {kindS=equiparray[liststart+2]}   else {kindS=barearm;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;

if (equiparray[liststart+2].kind=="A"){ if (kindA!=equiparray[liststart+2])  {kindA=equiparray[liststart+2]}   else {kindA=bareback;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;
	
	
	};
	
	if (cursorList==250){ 
		if (equiparray[liststart+3].kind=="W"){ if (kindW!=equiparray[liststart+3])  {kindW=equiparray[liststart+3]}   else {kindW=barefist;  }totA=hero.ATT+kindW.att+kindS.att+kindA.att;} ;

if (equiparray[liststart+3].kind=="S"){ if (kindS!=equiparray[liststart+3])  {kindS=equiparray[liststart+3]}   else {kindS=barearm;  }totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;

if (equiparray[liststart+3].kind=="A"){ if (kindA!=equiparray[liststart+3])  {kindA=equiparray[liststart+3]}   else {kindA=bareback;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;
	
	 
	
	
	};
	
	if (cursorList==280){ 
	
		if (equiparray[liststart+4].kind=="W"){ if (kindW!=equiparray[liststart+4])  {kindW=equiparray[liststart+4]}   else {kindW=barefist;  } totA=hero.ATT+kindW.att+kindS.att+kindA.att;} ;

if (equiparray[liststart+4].kind=="S"){ if (kindS!=equiparray[liststart+4])  {kindS=equiparray[liststart+4]}   else {kindS=barearm;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;

if (equiparray[liststart+4].kind=="A"){ if (kindA!=equiparray[liststart+4])  {kindA=equiparray[liststart+4]}   else {kindA=bareback;  }totD=hero.DEF+kindS.def+kindA.def+kindW.def; } ;
	
	};

  };
  
  
  
  
    if (cursorLeft== 180 && cursorUp ==190 && shopOpen==false&&sellwindow==false&&yesbox==false&&sellbox==false&&speechbox==false){
	magic  = true;
	//alert("magic is true");
	
	}
	
	 if (cursorLeft== 180 && cursorUp ==160&& shopOpen==false&&sellwindow==false&&yesbox==false&&sellbox==false&&speechbox==false){
	items = true;
	
	}
	 if (cursorLeft== 280 && cursorUp ==160&& shopOpen==false&&sellwindow==false&&yesbox==false&&sellbox==false&&speechbox==false){
	party  = true;
	
	};
	
	  if (cursorLeft== 280 && cursorUp ==190&& shopOpen==false&&sellwindow==false&&yesbox==false&&sellbox==false&&speechbox==false){
	equip = true;
	
	};
	//ITEMZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZzz

	 
	
	
	};
	
	
	
	 if(batitem===1){
	  battleLeft = 160; 
	 battleUp =280;
	
	if (cursorList==160&& itemflag==true){ hero.hp+=itemarray[0].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[0].mp;itemarray[0]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray); itemflag=false  ; if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258;batitem=0;  };
	
	if (cursorList==160){ itemflag=true}; 
	
	if (cursorList==190){ hero.hp+=itemarray[1].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[1].mp;itemarray[1]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray); if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--; battleLeft = 165;  battleUp =258; batitem=0;   };
	
	if (cursorList==220){ hero.hp+=itemarray[2].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[2].mp;itemarray[2]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);  if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--; battleLeft = 165;  battleUp =258; batitem=0;   };
	
	if (cursorList==250){ hero.hp+=itemarray[3].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[3].mp;itemarray[3]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);  if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--; battleLeft = 165;  battleUp =258; batitem=0;   };
	
	if (cursorList==280){ hero.hp+=itemarray[4].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[4].mp;itemarray[4]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);  if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--; battleLeft = 165;  battleUp =258; batitem=0;   };
	
	
	
	};
   
   /*
     	if (cursorList==160){  if (hero.mp>4){if(hero.lifeTotal-hero.hp>10){hero.hp+=10;}else{hero.hp=hero.lifeTotal};hero.mp-=5;};}   
	
	
	if (cursorList==190){  };
	
	if (cursorList==220){  };
	
	if (cursorList==250){ };
	
	if (cursorList==280){  if (hero.mp>14){hero.hp=hero.lifeTotal;hero.mp-=15;} };
  cursorUp=190;
   */
   
   if(spell==1){
	// battleLeft == 165 && battleUp ==288     //need to stop the background from interacting so we change value then change back.
	 battleLeft = 160; 
	 battleUp =280;
	if (cursorList==160&& spellflag==true ){     if (hero.mp>4){if(hero.lifeTotal-hero.hp>10){hero.hp+=10;}else{hero.hp=hero.lifeTotal};hero.mp-=5};spellflag=false;  if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258; spell=0;};
	
	if (cursorList==160 && spellflag==false){ spellflag=true; }; 
	
	if (cursorList==190){    if (hero.mp>3){damage+=15;hero.mp-=4}; if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258;spell=0;     };
	
	if (cursorList==220){ if (hero.mp>7){damage+=Math.floor(poacher.lifeTotal/2);hero.mp-=8}; if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258;spell=0;     };
	
	if (cursorList==250){ if (hero.mp>11){damage+=poacher.lifeTotal;hero.mp-=12}; if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258;spell=0; }
	
	if (cursorList==280) {if (hero.mp>15){hero.hp=hero.lifeTotal;hero.mp-=16}; if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258;spell=0; }
    
	
	};
	
	
	
	
//	if(screenx==-1120 && screeny==-1800){
	
if (yesbox==true){
	if(yncursor==84){
	      ynflag=1;
		  if(maplist==mapone ){
		  	if((playerf/40-1) ==5 && (playere/40) ==9){
			
			
			if(gold<12){
	poorbox=true;
	yesbox=false;
	ynflag=0;
	}
		  
		  if(gold>11){
		  hero.hp=hero.lifeTotal;
	hero.mp=hero.maxmp;
	gold-=12;
	yesbox=false;
	speechbox=false;
	ynflag=0;
	
	
	}
	}
	}
	
	
		
	}
	if(yncursor==109){
	     ynflag=2;
		// alert(ynflag);
		 if((playerf/40-1) ==5 && (playere/40) ==9){
		 	yesbox=false;
	        speechbox=false;
	         ynflag=0;
	}
		 
	}
	
	
	

	}

		if (yesbox==true){
	if(yncursor==84){
	      ynflag=1;
		  if(maplist==mapfive ){
		  	if(screenx==-1120 && screeny==-1800){
			
			
			if(gold<12){
	poorbox=true;
	yesbox=false;
	ynflag=0;
	}
		  
		  if(gold>11){
		  hero.hp=hero.lifeTotal;
	hero.mp=hero.maxmp;
	gold-=12;
	yesbox=false;
	speechbox=false;
	ynflag=0;
	
	
	}
	}
	}
	
	
		
	}
	if(yncursor==109){
	     ynflag=2;
		// alert(ynflag);
		if(screenx==-1120 && screeny==-1800){
		 	yesbox=false;
	        speechbox=false;
	         ynflag=0;
	}
		 
	}
	
	}
	

	
	
	

	if(z==15){
	
  if ( battleLeft == 165 && battleUp ==258 &&spell==0 ){ if(((totA)-poacher.DEF)>1){damage+=((totA)-poacher.DEF)} else damage++; if(((totD)-poacher.DEF)<-1){hero.hp+=totD-poacher.ATT}else hero.hp--;if(hero.hp<1){maplist=mapone;gold=0;

  //rebirth starting state  

  stepcounter =0;
			 a=20;
             b=2;
             c=16;
             d=16;
             e=280;
             f=200;
             g=40;
             h=40;  
		     z=7;
			 screenx=0;
	 screeny=0;
     tilex=screenx/40;
	 tiley=screeny/40;
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
     hero.hp=hero.lifeTotal;
  
  };if (stepcounter==0){damage=0;}
  };
  if ( battleLeft == 165 && battleUp ==288){  spell =1; };
  if ( battleLeft == 265 && battleUp ==258){  batitem =1; };
  if(batitem==1){
   battleLeft = 265;
   battleUp =258;
   
  }
  if ( battleLeft == 265 && battleUp ==288){   if (Math.floor((Math.random()*4)+1)!=4){if(((totD)-poacher.DEF)<-1){hero.hp+=totD-poacher.ATT}else {hero.hp--}; } else{run=1;}}

   };
   
   totD=hero.DEF+kindS.def+kindA.def+kindW.def;
  totA=hero.ATT+kindW.att+kindS.att+kindA.att;
  
 
 
 

		}; // end of if
	
		if( x> screen.width*.75 && y >offtop && y< offtop + canvas.height/5  ){
	
	
  
  z=7;
  if (magic== true){
  magic = false;
  if (magic == false){
  z=5;}
  }
   if (party== true){
  party = false;
  if (party == false){
  z=5;}
  }
   if (items== true){
  items = false;
  cursorList=160;
  liststart=0;
  listlength=5;
  if (items == false){
  z=5;}
  }
   if (equip== true){
  equip = false;
  cursorList=160;
 liststart=0;
 listlength=5;
 equipflag=false;
  if (equip == false){
  z=5;}
  }
  if(speechbox== true){
  speechbox=false};
  if(spell==1){spell=0;  battleLeft = 165;  battleUp =288;};
  if(batitem==1){batitem=0;battleLeft = 165;  battleUp =288;};
  
  if(yesbox==true){
      yesbox=false;
  }

  if(poorbox==true){
		  poorbox=false;
		  speechbox=false;
		  }
if(levelbox==true){
  levelbox=false;
}		  
		  
  if(shopOpen==true){
  
 
  cursorList=160;
  liststart=0;
  listlength=5;
  shopflag=false;//to keep from immediate purchase upon window open
  shopOpen=false;
  
  }
  if(sellbox==true){
  sellflag=false;
  sellbox=false;
  //sellflag=false;
  }
  
  if (sellwindow==true){
       kindWflag=false;
	   kindSflag=false;
	   kindAflag=false;
  	 for(var i=0;i<sellList.length;i++){
	
	   
	   if(equiparray[i]==kindW){
	   
	   kindWflag=true;
	   }
	 if(equiparray[i]==kindA){
	   
	   kindAflag=true;
	   }
	 if(equiparray[i]==kindS){
	   
	   kindSflag=true;
	   }
	 
	 };
  
  sellflag=false;
 
 if(kindWflag==false){
  kindW=barefist;
  }
  
  
   if(kindSflag==false){
  kindS=barearm;
  }
  
  
  
   if(kindAflag==false){
  kindA=bareback;
  }
 
 

 
  sellwindow=false;
  cursorList=160;
  liststart=0;
  listlength=5;
  };
  
	};  //end of if
	
	
	
	
	
if( y >offtop && y< offtop + canvas.height/5 &&  x >offleft && x> screen.width/4  && x < screen.width*.75)       
	{
	  
 
     console.log("up!");  
    
	equipscrollflag=false;
     ////////////////////////////////////////////////////////////////
     ball.y -=10;	 
	 if(a!=20){a=20;}
	 else a+=18;
	 
	  	 if(maplist==maptwo){
	  if(playere/40==10&&playerf/40==49){
	  
	 maplist=mapfive;
	screenx=-680;
	 screeny=-2080;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	  
	  }
	 
	 
	 }
	  		if (maplist==mapfive){
	if(screenx==-600 && screeny==-80){

	screeny-=40;
	playerf+=40;
	talk="Bring peace to the realm";
	speechbox=true;

	
	};
	
		if(screenx==-1120 && screeny==-1800){

	screeny-=40;
	playerf+=40;
	talk="Stay at the inn for 12 gold?";
	speechbox=true;

	yesbox=true;
	
	};
	
	
	
	}
	 
	  if(maplist==mapone ){
	    if (shopOpen!=true&&sellwindow!=true||z!=5){
	      if(playere/40==20&&playerf/40==7){
	           talk="Welcome to Seaside Armor Shop";
			   shoparray=armorshoparray;
	           speechbox =true;
	           sellbox=true;
	 };
	 if(playere/40==27&&playerf/40==7){
	           talk="Buy a Sword at Bob's Blades";
			   shoparray=weaponshoparray;
	           speechbox =true;
	           sellbox=true;
			 //  sellList=
	 };
	 };
	 }
	 
	 
	 
	 	if (yesbox==true){
	if(yncursor==109){
	yncursor=84;
	}
	}
	if (sellbox==true){
	if(yncursor==109){
	yncursor=84;
	}
	}
	 
	 
	 
	 if(z %5 != 0){
	
	//////////////////////////////////////////////////////////////nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
	
	
	
	//nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
	
   
	
	
	
	
	
	if((maplist[playere/40][(playerf-40)/40] %2)==0&& stepcounter!=40) {
	
	
	if (maplist==mapthree){
	if((playerf/40-1) ==1 && (playere/40) ==14){

	screeny-=40;
	playerf+=40;
	speechbox=true;

	
	};}
	
	
	if (maplist==mapone){
	if((playerf/40-1) ==5 && (playere/40) ==9){

	screeny-=40;
	playerf+=40;
	talk="Stay at the Inn for  12 gold!? "
	speechbox=true;
	yesbox=true;

	};
	//if (maplist==mapone){
	if(((playerf+80)/40-1) ==28 && (playere/40) ==31){
	
 //playerf +' '+screeny+'   '+playere+ ' ' +screenx
	maplist =maptwo;
    screenx=-240;
	 screeny=-240;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	}};
		
		
	

	if (maplist==maptwo){
	if(screenx==-240 && screeny==-280){
	
	
 
	maplist =mapone;

	screenx=-960;
	 screeny=-840;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	
	}
	};
		screeny+=40;
		tiley+=1;
	playerf-=40;
	ptiley-=1;
	stepcounter++;
	
}};
if(z ===5){
if (cursorUp !=160){
cursorUp -=30;

}
}

if(z===15 ){
if (battleUp != 258){
	battleUp -=30;
}
}
if(batitem==1 || spell){
 if(cursorList!=160){
 cursorList-=30;
 
 };
}
/*
if(items==true || magic==true || equip==true||shopOpen==true){
	 if(cursorList!=160){
	cursorList-=30;
	};
	};
	/*
	 if(items==true|| shopOpen==true||sellwindow==true){
	
	 
	 if(itemarray[liststart-1]!=undefined && cursorList==160){
	liststart--;
	listlength--;
	
	};
	 }
	 */
	  if(equip==true){
	
	 
	 if(equiparray[liststart-1]!=undefined && cursorList==160){
	liststart--;
	listlength--;
	
	};
	 }
	
if(items==true || magic==true || equip==true||shopOpen==true||sellwindow==true){
	 if(cursorList!=160){
	cursorList-=30;
	
	
	
	};
	};
	
	 if(items==true||batitem===1){
	
	 
	 if(itemarray[liststart-1]!=undefined&& cursorList==160){
	liststart--;
	listlength--;
	
	};
	 };
	 if(sellwindow==true){
	
	 
	 if(sellList[liststart-1]!=undefined && cursorList==160){
	liststart--;
	listlength--;
	
	};
	 };
	 
	  	 if(shopOpen==true){
	
	 
	 if(shoparray[liststart-1]!=undefined && cursorList==160){
	liststart--;
	listlength--;
	
	};
	 };

var playerHoriz=(playerf+80)/40;
var playerVert = playere/40;
	
	
	
	
	
	
	}; // end of if
	
if(y >offtop+(canvas.height/4) && y< offhig && x< screen.width/4  ){
	
   console.log("left!"),
  keypressed= 37;
     console.log("left!"),
	 ball.x-=10;
	 if(a!=128){a=128;}
	 else a+=18;
	

	if(maplist==mapthree){
      if(((playere/40) ==6)&& ( (playerf/40) ==1)  ){
          maplist=mapfour;
};

};
	 
	 	 if(maplist==maptwo){
	  if(playere/40==11&&playerf/40==48){
	  
	 maplist=mapfive;
	screenx=-680;
	 screeny=-2080;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	  
	  }
	 
	 
	 }
	 
	 	  if(maplist==mapfive ){
	    if (shopOpen!=true&&sellwindow!=true||z!=5){
	      if(screenx==-120&& screeny==-1800){
	           talk="Welcome to A Cut Above";
			   shoparray=weaponshoparray2;
	           speechbox =true;
	           sellbox=true;
	 };
	 }
	 };
	 	 	  if(maplist==mapfive ){
	    if (shopOpen!=true&&sellwindow!=true||z!=5){
	      if(screenx==-120&& screeny==-1160){
	           talk="Welcome to the Armadillo";
			   shoparray=armorshoparray2;
	           speechbox =true;
	           sellbox=true;
	 };
	 }
	 }
	 
	  if(maplist==mapone ){
	    if (shopOpen!=true&&sellwindow!=true||z!=5){
	      if(playere/40==6&&playerf/40==20){
	           talk="Welcome to the Emerald Elm";
			   shoparray=itemshoparray;
	           speechbox =true;
	           sellbox=true;
	 };
	 }
	 }
	 
	
	if(z %5 != 0 ){
		if((maplist[(playere-40)/40][playerf/40]%2) ==0 && stepcounter!=20){
		if (maplist==mapthree){
	if((playerf/40-1) ==1 && (playere/40) ==14){

	screeny-=40;
	playerf+=40;
	speechbox=true;

	
	};}
		if (maplist==mapone){
	if((playerf/40-1) ==4 && (playere/40) ==10){
	    //   alert("It's not too warm and not too cold.");
	       screenx-=40;
	       playere+=40;
	};
	
	if(((playerf+80)/40-1) ==28 && (playere/40) ==31){
	
 //playerf +' '+screeny+'   '+playere+ ' ' +screenx
	maplist =maptwo;
    screenx=-240;
	 screeny=-240;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	}};
	
	if (maplist==maptwo){
	if(screenx==-280 && screeny==-240){
	
	
 
	maplist =mapone;

	screenx=-1000;
	 screeny=-840;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	
	}
	};
		screenx+=40;
		tilex+=1;
	playere-=40;

	stepcounter++;
	};
}
	if(z ===5){
if (cursorLeft !=180){
cursorLeft -=100;

}
}
if(z===15){
if(battleLeft!= 165){
	battleLeft -=100;
}
}
	}; // end of if
	
	
	
	if(y >offtop+(canvas.height/4) && y< offhig && x> screen.width*.75  ){
     console.log("right!"),
	      
	 ball.x+=10;
	  if(a!=92){a=92;}
	 else a+=18;
	 
	 
	 	  if(maplist==mapfive ){
	    if (shopOpen!=true&&sellwindow!=true||z!=5){
	      if(screenx==-1240&& screeny==-1320){
	           talk=" Welcome to The Blue Banner";
			   shoparray=itemshoparray;
	           speechbox =true;
	           sellbox=true;
	 };
	 }
	 }
	 
	 
	 
	 if(maplist==maptwo){
	  if(playere/40==9&&playerf/40==48){
	  
	 maplist=mapfive;
	screenx=-680;
	 screeny=-2080;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	  
	  }
	 
	 
	 }
	 
	 
	 
	 
	  if(z %5 != 0){
		if((maplist[(playere+40)/40][playerf/40]%2 )==0 && stepcounter!=20){
		
		
			if (maplist==mapthree){
	if((playerf/40-1) ==1 && (playere/40) ==14){

	screeny-=40;
	playerf+=40;
	speechbox=true;
    
	
	};}
		
		
		
		if (maplist==mapone){
		
		//collision dtection for elf girl//////////////////////////////////////////////////////////////////////////mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm/////////////mmmmmmmmm/////m
			if((playerf/40-1) ==4 && (playere/40) ==8){
			yesbox=true;
	     //  alert("Nice Day.");
	       screenx+=40;
	       playere-=40;
		 
	};

	if(((playerf+80)/40-1) ==28 && (playere/40) ==31){
	
 //playerf +' '+screeny+'   '+playere+ ' ' +screenx
	maplist =maptwo;
    screenx=-240;
	 screeny=-240;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	}};
	
	if (maplist==maptwo){
	if(screenx==-200 && screeny==-240){
	
	
 
	maplist =mapone;

	screenx=-920;
	 screeny=-840;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	
	}
	};
	
	if(maplist==mapthree){
	 if(screenx==-400 && screeny==-520){
	
		maplist =maptwo;
    screenx=-1120;
	 screeny=-1520;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	
	}
	}
		screenx-=40;
		tilex-=1;
	playere+=40;
	stepcounter++;
	};
};
	if(z ===5){
if (cursorLeft !=280){
cursorLeft +=100;

}
}

if(z===15){
if(battleLeft!= 265){
	battleLeft +=100;
}
}


	if(maplist==mapfour){
      if(((playere/40) ==5)&& ( (playerf/40) ==1)  ){
          maplist=mapthree;
};
}
	
	}; // end of if
	
	
	
	}; //endof of Smallscreen//////////////////////////////////////////////////////////////////////gkkFJfjhjfdhdhstestewa



if(screen.width>370){

if( y >offtop+(canvas.height/2) && y< offhig  && x> offleft+(canvas.width/4)  &&x< offleft+(canvas.width*.75)) {

	   console.log("down!")
	   
	  
  
   	 if(maplist==maptwo){
	  if(playere/40==10&&playerf/40==47){
	  
	 maplist=mapfive;
	screenx=-680;
	 screeny=-2000;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	  
	  };
	 
	 
	 }
  
  
  
  
  
 
	 ball.y+=10;
	 if(a!=56){a=56;}
	 else a+=18;
	 
	 
	if (yesbox==true){
	if(yncursor==84){
	yncursor+=25;
	}
	}

	 if (sellbox==true){
	if(yncursor==84){
	yncursor+=25;
	}
	}
	 
	 
	
	 
	 
	 
	 
	 
	 
	 
	  if(z %5 != 0 ){
	if((maplist[(playere)/40][(playerf+40)/40] %2)==0 && stepcounter!=40)
	{
		if (maplist==mapthree){
	if((playerf/40-1) ==1 && (playere/40) ==14){

	screeny-=40;
	playerf+=40;
	speechbox=true;

	
	};}
	
	//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	
	if(maplist==mapfive){
	
	if( screenx==-680&&screeny==-2080){
	//to change the starting location on a new map mess with screenx screeny in multiples of 40 
	maplist=maptwo;
		screenx=-120;
	 screeny=-1720;
	 
	 
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	}};
	
		if (maplist==mapone){
	if(((playerf+80)/40-1) ==5 && (playere/40) ==9){
	
	screeny+=40;
	playerf-=40;
	};
		
	if(((playerf+80)/40-1) ==28 && (playere/40) ==31){
	
 //playerf +' '+screeny+'   '+playere+ ' ' +screenx
	maplist =maptwo;
    screenx=-240;
	 screeny=-240;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	}};
	
	if (maplist==maptwo){
	    if(screenx==-240 && screeny==-200){
	
	
 
	maplist =mapone;

	screenx=-960;
	 screeny=-800;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	
	}
	   if(screenx==-1160 && screeny==-1520){
	maplist =mapthree;

	screenx=-400;
	 screeny=-480;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	}
	};
	
	
	
	
	
	screeny-=40;
	tiley-=1;
	playerf+=40;
	stepcounter++;
	};
	}
	
	if(z ===5 ){
if (cursorUp !=190){
cursorUp +=30;

}
}

if(z===15){
if(battleUp != 288){
	battleUp +=30;
}
}

if(batitem==1 || spell==1){
 if(cursorList!=280){
 cursorList+=30;
 
 };
}


if(items==true || magic==true || equip==true||shopOpen==true||sellwindow==true){
	 if(cursorList!=280){
	cursorList+=30;
	
	
	
	};
	};
	
	 if(items==true){
	
	 
	 if(itemarray.length>listlength && cursorList==280){
	liststart++;
	listlength++;
	
	};
	 };
	 
	  if(batitem==1){
	
	 
	 if(itemarray.length>listlength && cursorList==280){
	liststart++;
	listlength++;
	
	};
	 };
	 
	 if(sellwindow==true){
	
	 
	 if(sellList.length>listlength && cursorList==280){
	liststart++;
	listlength++;
	
	};
	 };
	 	 if(equip==true){
	
	 
	 if(equiparray.length>listlength && cursorList==280 && equipscrollflag==true){




	 liststart++;
	listlength++;
	
	};
	
	 if(equiparray.length>listlength && cursorList==280&& equipscrollflag==false){
	 equipscrollflag=true;
	 
	 };
	 
	 
	 
	 
	 
	 

	 };
	 
	  	 if(shopOpen==true){
	
	 
	 if(shoparray.length>listlength && cursorList==280){
	liststart++;
	listlength++;
	
	};
	 };
	
	
	
	
	};//end of if
	
	
	
	
	if(  x < offleft+(canvas.width/4) && x> offleft && y> offtop  && y < offtop+canvas.height*.3 ){
	
 
  if (sellbox==true){
  		
     if (yncursor==84){
	    shopOpen=true;
	 sellbox=false;
	 speechbox=false;
	
	 };
     if (yncursor==109){
	 		 if(maplist==mapone){
		     if(playere/40==20 &&playerf/40==7  ){
			    sellList=equiparray;
			 }
			 };
	   

	   sellwindow=true;
		sellbox=false;
	     speechbox=false;
		
		
		
	 };
  
  
  
  }
  
  

	

	

  
if (z%7==0){
 
  z=5;

  
  }
  
  /*
	        this.name = name;
		  this.hp = hp;
		  this.lifeTotal =lifeTotal;
		  this.mp=mp;
		  this.maxmp=maxmp;
		  this.ATT=pow;
		  this.DEF=def;
		  this.exp=exp;
*/

  
  
  else if(z==5){
  
  	  if(items===true){
	  
	
	if (cursorList==160){ hero.hp+=itemarray[0].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[0].mp;itemarray[0]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);     };
	
	//if (cursorList==160){ itemflag=true}; 
	
	if (cursorList==190){ hero.hp+=itemarray[1].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[1].mp;itemarray[1]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);     };
	
	if (cursorList==220){ hero.hp+=itemarray[2].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[2].mp;itemarray[2]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);     };
	
	if (cursorList==250){ hero.hp+=itemarray[3].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[3].mp;itemarray[3]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);     };
	
	if (cursorList==280){ hero.hp+=itemarray[4].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[4].mp;itemarray[4]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);     };

	
	};
	
	
	
	
	
	

	if(shopOpen===true){
	
	//to keep from immediate purchase as soon as window opens
	
	
	if (cursorList==160 && shopflag==true ){  if(gold>=shoparray[liststart].cost){ if(shoparray!=itemshoparray){	equiparray.push(shoparray[liststart]);}   else itemarray.push(shoparray[liststart]);gold=gold-shoparray[liststart].cost;}else{poorbox=true;}};
	
	if (cursorList==160){ shopflag=true}; //must be after so not set to true on open

	if (cursorList==190){  if(gold>=shoparray[liststart+1].cost){ if(shoparray!=itemshoparray){	equiparray.push(shoparray[liststart+1]); }   else itemarray.push(shoparray[liststart+1]);gold=gold-shoparray[liststart+1].cost;}else{poorbox=true;}};
	
	if (cursorList==220){  if(gold>=shoparray[liststart+2].cost){ if(shoparray!=itemshoparray){	equiparray.push(shoparray[liststart+2]);}   else itemarray.push(shoparray[liststart+2]);gold=gold-shoparray[liststart+2].cost;}else{poorbox=true;}};
	
	if (cursorList==250){  if(gold>=shoparray[liststart+3].cost){ if(shoparray!=itemshoparray){	equiparray.push(shoparray[liststart+3]);}   else itemarray.push(shoparray[liststart+3]);gold=gold-shoparray[liststart+3].cost;}else{poorbox=true;}};
	
	if (cursorList==280){  if(gold>=shoparray[liststart+4].cost){ if(shoparray!=itemshoparray){	equiparray.push(shoparray[liststart+4]);}   else itemarray.push(shoparray[liststart+4]);gold=gold-shoparray[liststart+4].cost;}else{poorbox=true;}};

	
	};
		if(sellwindow===true){
		   if(playere/40==6&&playerf/40==20){
		   sellList=itemarray;
		   
		   }
		else{sellList=equiparray;}
		
	if (cursorList==160 && sellflag==true){  gold=gold+Math.floor((sellList[liststart].cost)/2);sellList[liststart]=0;   sellList=arrayClose(sellList);  if(playere/40==6&&playerf/40==20){itemarray=sellList;}else{equiparray=sellList;}; sellflag=false; }
	    

if (cursorList==160){ sellflag=true}; 
	//if(playere/40==20&&playerf/40==7){equiparray=sellList;};
	
	
	if (cursorList==190){  gold=gold+Math.floor((sellList[liststart+1].cost)/2)   ;sellList[liststart+1]=0;    sellList=arrayClose(sellList); if(playere/40==6&&playerf/40==20){itemarray=sellList;}else{equiparray=sellList;};  };
	
	if (cursorList==220){  gold=gold+Math.floor((sellList[liststart+2].cost)/2)  ;sellList[liststart+2]=0;     sellList=arrayClose(sellList); if(playere/40==6&&playerf/40==20){itemarray=sellList;}else{equiparray=sellList;};  }
	
	if (cursorList==250){ gold=gold+Math.floor((sellList[liststart+3].cost)/2)   ;sellList[liststart+3]=0;     sellList=arrayClose(sellList); if(playere/40==6&&playerf/40==20){itemarray=sellList;}else{equiparray=sellList;}; }
	
	if (cursorList==280){  gold=gold+Math.floor((sellList[liststart+4].cost)/2)   ;sellList[liststart+4]=0;     sellList=arrayClose(sellList); if(playere/40==6&&playerf/40==20){itemarray=sellList;}else{equiparray=sellList;}; }

	

	
	
	};

	
	
	
	 if(magic===true){
  	if (cursorList==160){  if (hero.mp>4){if(hero.lifeTotal-hero.hp>10){hero.hp+=10;}else{hero.hp=hero.lifeTotal};hero.mp-=5;};}   
	
	
	if (cursorList==190){  };
	
	if (cursorList==220){  };
	
	if (cursorList==250){ };
	
	if (cursorList==280){  if (hero.mp>15){hero.hp=hero.lifeTotal;hero.mp-=16;} };
  cursorUp=190;
  };
  
  
  
  
   if(equip===true){
  	
	if (cursorList==160&&equipflag==true){  

	

	
	
	if (equiparray[liststart].kind=="W"){ if (kindW!=equiparray[liststart])  {kindW=equiparray[liststart]}   else {kindW=barefist;  }totA=hero.ATT+kindW.att+kindS.att+kindA.att;} ;

if (equiparray[liststart].kind=="S"){ if (kindS!=equiparray[liststart])  {kindS=equiparray[liststart]}   else {kindS=barearm;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;

if (equiparray[liststart].kind=="A"){ if (kindA!=equiparray[liststart])  {kindA=equiparray[liststart]}   else {kindA=bareback;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;
   

	};
		
	if (cursorList==160){ equipflag=true};
	
	if (cursorList==190){ 

	if (equiparray[liststart+1].kind=="W"){ if (kindW!=equiparray[liststart+1])  {kindW=equiparray[liststart+1]}   else {kindW=barefist;  }totA=hero.ATT+kindW.att+kindS.att+kindA.att;} ;

if (equiparray[liststart+1].kind=="S"){ if (kindS!=equiparray[liststart+1])  {kindS=equiparray[liststart+1]}   else {kindS=barearm;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def; } ;

if (equiparray[liststart+1].kind=="A"){ if (kindA!=equiparray[liststart+1])  {kindA=equiparray[liststart+1]}   else {kindA=bareback;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;

      

	};
	
	if (cursorList==220){ 
	
		if (equiparray[liststart+2].kind=="W"){ if (kindW!=equiparray[liststart+2])  {kindW=equiparray[liststart+2]}   else {kindW=barefist;  } totA=hero.ATT+kindW.att+kindS.att+kindA.att;} ;

if (equiparray[liststart+2].kind=="S"){ if (kindS!=equiparray[liststart+2])  {kindS=equiparray[liststart+2]}   else {kindS=barearm;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;

if (equiparray[liststart+2].kind=="A"){ if (kindA!=equiparray[liststart+2])  {kindA=equiparray[liststart+2]}   else {kindA=bareback;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;
	
	
	};
	
	if (cursorList==250){ 
		if (equiparray[liststart+3].kind=="W"){ if (kindW!=equiparray[liststart+3])  {kindW=equiparray[liststart+3]}   else {kindW=barefist;  }totA=hero.ATT+kindW.att+kindS.att+kindA.att;} ;

if (equiparray[liststart+3].kind=="S"){ if (kindS!=equiparray[liststart+3])  {kindS=equiparray[liststart+3]}   else {kindS=barearm;  }totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;

if (equiparray[liststart+3].kind=="A"){ if (kindA!=equiparray[liststart+3])  {kindA=equiparray[liststart+3]}   else {kindA=bareback;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;
	
	 
	
	
	};
	
	if (cursorList==280){ 
	
		if (equiparray[liststart+4].kind=="W"){ if (kindW!=equiparray[liststart+4])  {kindW=equiparray[liststart+4]}   else {kindW=barefist;  } totA=hero.ATT+kindW.att+kindS.att+kindA.att;} ;

if (equiparray[liststart+4].kind=="S"){ if (kindS!=equiparray[liststart+4])  {kindS=equiparray[liststart+4]}   else {kindS=barearm;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;

if (equiparray[liststart+4].kind=="A"){ if (kindA!=equiparray[liststart+4])  {kindA=equiparray[liststart+4]}   else {kindA=bareback;  }totD=hero.DEF+kindS.def+kindA.def+kindW.def; } ;
	
	};

  };
  
  
  
  
  
    if (cursorLeft== 180 && cursorUp ==190 && shopOpen==false&&sellwindow==false&&yesbox==false&&sellbox==false&&speechbox==false){
	magic  = true;
	//alert("magic is true");
	
	}
	
	 if (cursorLeft== 180 && cursorUp ==160&& shopOpen==false&&sellwindow==false&&yesbox==false&&sellbox==false&&speechbox==false){
	items = true;
	
	}
	 if (cursorLeft== 280 && cursorUp ==160&& shopOpen==false&&sellwindow==false&&yesbox==false&&sellbox==false&&speechbox==false){
	party  = true;
	
	};
	
	  if (cursorLeft== 280 && cursorUp ==190&& shopOpen==false&&sellwindow==false&&yesbox==false&&sellbox==false&&speechbox==false){
	equip = true;
	
	};
	//ITEMZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZzz

	 
	
	
	};
	
	
	
	 if(batitem===1){
	  battleLeft = 160; 
	 battleUp =280;
	
	if (cursorList==160&& itemflag==true){ hero.hp+=itemarray[0].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[0].mp;itemarray[0]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray); itemflag=false  ; if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258;batitem=0;  };
	
	if (cursorList==160){ itemflag=true}; 
	
	if (cursorList==190){ hero.hp+=itemarray[1].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[1].mp;itemarray[1]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray); if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--; battleLeft = 165;  battleUp =258; batitem=0;   };
	
	if (cursorList==220){ hero.hp+=itemarray[2].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[2].mp;itemarray[2]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);  if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--; battleLeft = 165;  battleUp =258; batitem=0;   };
	
	if (cursorList==250){ hero.hp+=itemarray[3].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[3].mp;itemarray[3]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);  if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--; battleLeft = 165;  battleUp =258; batitem=0;   };
	
	if (cursorList==280){ hero.hp+=itemarray[4].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[4].mp;itemarray[4]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);  if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--; battleLeft = 165;  battleUp =258; batitem=0;   };
	
	
	
	};
   
   /*
     	if (cursorList==160){  if (hero.mp>4){if(hero.lifeTotal-hero.hp>10){hero.hp+=10;}else{hero.hp=hero.lifeTotal};hero.mp-=5;};}   
	
	
	if (cursorList==190){  };
	
	if (cursorList==220){  };
	
	if (cursorList==250){ };
	
	if (cursorList==280){  if (hero.mp>14){hero.hp=hero.lifeTotal;hero.mp-=15;} };
  cursorUp=190;
   */
   
     if(spell==1){
	// battleLeft == 165 && battleUp ==288     //need to stop the background from interacting so we change value then change back.
	 battleLeft = 160; 
	 battleUp =280;
	if (cursorList==160&& spellflag==true ){     if (hero.mp>4){if(hero.lifeTotal-hero.hp>10){hero.hp+=10;}else{hero.hp=hero.lifeTotal};hero.mp-=5};spellflag=false;  if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258; spell=0;};
	
	if (cursorList==160 && spellflag==false){ spellflag=true; }; 
	
	if (cursorList==190){    if (hero.mp>3){damage+=15;hero.mp-=4}; if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258;spell=0;     };
	
	if (cursorList==220){ if (hero.mp>7){damage+=Math.floor(poacher.lifeTotal/2);hero.mp-=8}; if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258;spell=0;     };
	
	if (cursorList==250){ if (hero.mp>11){damage+=poacher.lifeTotal;hero.mp-=12}; if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258;spell=0; }
	
	if (cursorList==280) {if (hero.mp>15){hero.hp=hero.lifeTotal;hero.mp-=16}; if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258;spell=0; }
    
	
	};
	
	
	
	
//	if(screenx==-1120 && screeny==-1800){
	
if (yesbox==true){
	if(yncursor==84){
	      ynflag=1;
		  if(maplist==mapone ){
		  	if((playerf/40-1) ==5 && (playere/40) ==9){
			
			
			if(gold<12){
	poorbox=true;
	yesbox=false;
	ynflag=0;
	}
		  
		  if(gold>11){
		  hero.hp=hero.lifeTotal;
	hero.mp=hero.maxmp;
	gold-=12;
	yesbox=false;
	speechbox=false;
	ynflag=0;
	
	
	}
	}
	}
	
	
		
	}
	if(yncursor==109){
	     ynflag=2;
		// alert(ynflag);
		 if((playerf/40-1) ==5 && (playere/40) ==9){
		 	yesbox=false;
	        speechbox=false;
	         ynflag=0;
	}
		 
	}
	
	
	

	}

		if (yesbox==true){
	if(yncursor==84){
	      ynflag=1;
		  if(maplist==mapfive ){
		  	if(screenx==-1120 && screeny==-1800){
			
			
			if(gold<12){
	poorbox=true;
	yesbox=false;
	ynflag=0;
	}
		  
		  if(gold>11){
		  hero.hp=hero.lifeTotal;
	hero.mp=hero.maxmp;
	gold-=12;
	yesbox=false;
	speechbox=false;
	ynflag=0;
	
	
	}
	}
	}
	
	
		
	}
	if(yncursor==109){
	     ynflag=2;
		// alert(ynflag);
		if(screenx==-1120 && screeny==-1800){
		 	yesbox=false;
	        speechbox=false;
	         ynflag=0;
	}
		 
	}
	
	}
	

	
	
	

	if(z==15){
	
  if ( battleLeft == 165 && battleUp ==258 &&spell==0 ){ if(((totA)-poacher.DEF)>1){damage+=((totA)-poacher.DEF)} else damage++; if(((totD)-poacher.DEF)<-1){hero.hp+=totD-poacher.ATT}else hero.hp--;if(hero.hp<1){maplist=mapone;gold=0;

  //rebirth starting state  

  stepcounter =0;
			 a=20;
             b=2;
             c=16;
             d=16;
             e=280;
             f=200;
             g=40;
             h=40;  
		     z=7;
			 screenx=0;
	 screeny=0;
     tilex=screenx/40;
	 tiley=screeny/40;
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
     hero.hp=hero.lifeTotal;
  
  };if (stepcounter==0){damage=0;}
  };
  if ( battleLeft == 165 && battleUp ==288){  spell =1; };
  if ( battleLeft == 265 && battleUp ==258){  batitem =1; };
  if(batitem==1){
   battleLeft = 265;
   battleUp =258;
   
  }
  if ( battleLeft == 265 && battleUp ==288){   if (Math.floor((Math.random()*4)+1)!=4){if(((totD)-poacher.DEF)<-1){hero.hp+=totD-poacher.ATT}else {hero.hp--}; } else{run=1;}}

   };
   totD=hero.DEF+kindS.def+kindA.def+kindW.def;
  totA=hero.ATT+kindW.att+kindS.att+kindA.att;
   
  

		}; // end of if
	
	if( x >offleft+(canvas.width*.75) && x< offleft+canvas.width && y> offtop  && y < offtop+canvas.height*.3   ){
	
	
 
  z=7;
  if (magic== true){
  magic = false;
  if (magic == false){
  z=5;}
  }
   if (party== true){
  party = false;
  if (party == false){
  z=5;}
  }
   if (items== true){
  items = false;
  cursorList=160;
  liststart=0;
  listlength=5;
  if (items == false){
  z=5;}
  }
   if (equip== true){
  equip = false;
  cursorList=160;
 liststart=0;
 listlength=5;
 equipflag=false;
  if (equip == false){
  z=5;}
  }
  if(speechbox== true){
  speechbox=false};
  if(spell==1){spell=0;  battleLeft = 165;  battleUp =288;};
  if(batitem==1){batitem=0;battleLeft = 165;  battleUp =288;};
  
  if(yesbox==true){
      yesbox=false;
  }

  if(poorbox==true){
		  poorbox=false;
		  speechbox=false;
		  }
if(levelbox==true){
  levelbox=false;
}		  
		  
  if(shopOpen==true){
  
 
  cursorList=160;
  liststart=0;
  listlength=5;
  shopflag=false;//to keep from immediate purchase upon window open
  shopOpen=false;
  
  }
  if(sellbox==true){
  sellflag=false;
  sellbox=false;
  //sellflag=false;
  }
  
  if (sellwindow==true){
       kindWflag=false;
	   kindSflag=false;
	   kindAflag=false;
  	 for(var i=0;i<sellList.length;i++){
	
	   
	   if(equiparray[i]==kindW){
	   
	   kindWflag=true;
	   }
	 if(equiparray[i]==kindA){
	   
	   kindAflag=true;
	   }
	 if(equiparray[i]==kindS){
	   
	   kindSflag=true;
	   }
	 
	 };
  
  sellflag=false;
 
 if(kindWflag==false){
  kindW=barefist;
  }
  
  
   if(kindSflag==false){
  kindS=barearm;
  }
  
  
  
   if(kindAflag==false){
  kindA=bareback;
  }
 
 
 
  sellwindow=false;
  cursorList=160;
  liststart=0;
  listlength=5;
  };
  
	};  //end of if
	
	
	
	
	
	if(  y >offtop && y< offhig-(canvas.height/2) && x> offwid/4  && x < offwid*.75)       
	{
	  
	  

 
     console.log("up!");  
     equipscrollflag=false;
   
     ball.y -=10;	 
	 if(a!=20){a=20;}
	 else a+=18;
	 
	  	 if(maplist==maptwo){
	  if(playere/40==10&&playerf/40==49){
	  
	 maplist=mapfive;
	screenx=-680;
	 screeny=-2080;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	  
	  }
	 
	 
	 }
	  		if (maplist==mapfive){
	if(screenx==-600 && screeny==-80){

	screeny-=40;
	playerf+=40;
	talk="Bring peace to the realm";
	speechbox=true;

	
	};
	
		if(screenx==-1120 && screeny==-1800){

	screeny-=40;
	playerf+=40;
	talk="Stay at the inn for 12 gold?";
	speechbox=true;

	yesbox=true;
	
	};
	
	
	
	}
	 
	  if(maplist==mapone ){
	    if (shopOpen!=true&&sellwindow!=true||z!=5){
	      if(playere/40==20&&playerf/40==7){
	           talk="Welcome to Seaside Armor Shop";
			   shoparray=armorshoparray;
	           speechbox =true;
	           sellbox=true;
	 };
	 if(playere/40==27&&playerf/40==7){
	           talk="Buy a Sword at Bob's Blades";
			   shoparray=weaponshoparray;
	           speechbox =true;
	           sellbox=true;
			 //  sellList=
	 };
	 };
	 }
	 
	 
	 
	 	if (yesbox==true){
	if(yncursor==109){
	yncursor=84;
	}
	}
	if (sellbox==true){
	if(yncursor==109){
	yncursor=84;
	}
	}
	 
	 
	 
	 if(z %5 != 0){
	
	//////////////////////////////////////////////////////////////nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
	
	
	
	//nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
	
   
	
	
	
	
	
	if((maplist[playere/40][(playerf-40)/40] %2)==0&& stepcounter!=40) {
	
	
	if (maplist==mapthree){
	if((playerf/40-1) ==1 && (playere/40) ==14){

	screeny-=40;
	playerf+=40;
	speechbox=true;

	
	};}
	
	
	if (maplist==mapone){
	if((playerf/40-1) ==5 && (playere/40) ==9){

	screeny-=40;
	playerf+=40;
	talk="Stay at the Inn for  12 gold!? "
	speechbox=true;
	yesbox=true;

	};
	//if (maplist==mapone){
	if(((playerf+80)/40-1) ==28 && (playere/40) ==31){
	
 //playerf +' '+screeny+'   '+playere+ ' ' +screenx
	maplist =maptwo;
    screenx=-240;
	 screeny=-240;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	}};
		
		
		

	if (maplist==maptwo){
	if(screenx==-240 && screeny==-280){
	
	
 
	maplist =mapone;

	screenx=-960;
	 screeny=-840;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	
	}
	};
		screeny+=40;
		tiley+=1;
	playerf-=40;
	ptiley-=1;
	stepcounter++;
	
}};
if(z ===5){
if (cursorUp !=160){
cursorUp -=30;

}
}

if(z===15 ){
if (battleUp != 258){
	battleUp -=30;
}
}
if(batitem==1 || spell){
 if(cursorList!=160){
 cursorList-=30;
 
 };
}
/*
if(items==true || magic==true || equip==true||shopOpen==true){
	 if(cursorList!=160){
	cursorList-=30;
	};
	};
	/*
	 if(items==true|| shopOpen==true||sellwindow==true){
	
	 
	 if(itemarray[liststart-1]!=undefined && cursorList==160){
	liststart--;
	listlength--;
	
	};
	 }
	 */
	  if(equip==true){
	
	 
	 if(equiparray[liststart-1]!=undefined && cursorList==160){
	liststart--;
	listlength--;
	
	};
	 }
	
if(items==true || magic==true || equip==true||shopOpen==true||sellwindow==true){
	 if(cursorList!=160){
	cursorList-=30;
	
	
	
	};
	};
	
	 if(items==true||batitem===1){
	
	 
	 if(itemarray[liststart-1]!=undefined&& cursorList==160){
	liststart--;
	listlength--;
	
	};
	 };
	 if(sellwindow==true){
	
	 
	 if(sellList[liststart-1]!=undefined && cursorList==160){
	liststart--;
	listlength--;
	
	};
	 };
	 
	  	 if(shopOpen==true){
	
	 
	 if(shoparray[liststart-1]!=undefined && cursorList==160){
	liststart--;
	listlength--;
	
	};
	 };

var playerHoriz=(playerf+80)/40;
var playerVert = playere/40;

	
	}; // end of if
	
	if(x >offleft && x< offleft+(canvas.width/4) && y< offhig  && y > offtop+canvas.height*.3  ){
	
	    keypressed= 37;
     console.log("left!"),
	 ball.x-=10;
	 if(a!=128){a=128;}
	 else a+=18;
	

	if(maplist==mapthree){
      if(((playere/40) ==6)&& ( (playerf/40) ==1)  ){
          maplist=mapfour;
};

};
	 
	 	 if(maplist==maptwo){
	  if(playere/40==11&&playerf/40==48){
	  
	 maplist=mapfive;
	screenx=-680;
	 screeny=-2080;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	  
	  }
	 
	 
	 }
	 
	 	  if(maplist==mapfive ){
	    if (shopOpen!=true&&sellwindow!=true||z!=5){
	      if(screenx==-120&& screeny==-1800){
	           talk="Welcome to A Cut Above";
			   shoparray=weaponshoparray2;
	           speechbox =true;
	           sellbox=true;
	 };
	 }
	 };
	 	 	  if(maplist==mapfive ){
	    if (shopOpen!=true&&sellwindow!=true||z!=5){
	      if(screenx==-120&& screeny==-1160){
	           talk="Welcome to the Armadillo";
			   shoparray=armorshoparray2;
	           speechbox =true;
	           sellbox=true;
	 };
	 }
	 }
	 
	  if(maplist==mapone ){
	    if (shopOpen!=true&&sellwindow!=true||z!=5){
	      if(playere/40==6&&playerf/40==20){
	           talk="Welcome to the Emerald Elm";
			   shoparray=itemshoparray;
	           speechbox =true;
	           sellbox=true;
	 };
	 }
	 }
	 
	
	if(z %5 != 0 ){
		if((maplist[(playere-40)/40][playerf/40]%2) ==0 && stepcounter!=20){
		if (maplist==mapthree){
	if((playerf/40-1) ==1 && (playere/40) ==14){

	screeny-=40;
	playerf+=40;
	speechbox=true;

	
	};}
		if (maplist==mapone){
	if((playerf/40-1) ==4 && (playere/40) ==10){
	    //   alert("It's not too warm and not too cold.");
	       screenx-=40;
	       playere+=40;
	};
	
	if(((playerf+80)/40-1) ==28 && (playere/40) ==31){
	
 //playerf +' '+screeny+'   '+playere+ ' ' +screenx
	maplist =maptwo;
    screenx=-240;
	 screeny=-240;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	}};
	
	if (maplist==maptwo){
	if(screenx==-280 && screeny==-240){
	
	
 
	maplist =mapone;

	screenx=-1000;
	 screeny=-840;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	
	}
	};
		screenx+=40;
		tilex+=1;
	playere-=40;

	stepcounter++;
	};
}
	if(z ===5){
if (cursorLeft !=180){
cursorLeft -=100;

}
}
if(z===15){
if(battleLeft!= 165){
	battleLeft -=100;
}
}
	}; // end of if
	
	
	
	if( x >offleft+(canvas.width*.75) && x< offwid && y< offhig  && y > offtop+canvas.height*.3 ){
	      
     console.log("right!"),
	     
	 ball.x+=10;
	  if(a!=92){a=92;}
	 else a+=18;
	 
	 
	 	  if(maplist==mapfive ){
	    if (shopOpen!=true&&sellwindow!=true||z!=5){
	      if(screenx==-1240&& screeny==-1320){
	           talk=" Welcome to The Blue Banner";
			   shoparray=itemshoparray;
	           speechbox =true;
	           sellbox=true;
	 };
	 }
	 }
	 
	 
	 
	 if(maplist==maptwo){
	  if(playere/40==9&&playerf/40==48){
	  
	 maplist=mapfive;
	screenx=-680;
	 screeny=-2080;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	  
	  }
	 
	 
	 }
	 
	 
	 
	 
	  if(z %5 != 0){
		if((maplist[(playere+40)/40][playerf/40]%2 )==0 && stepcounter!=20){
		
		
			if (maplist==mapthree){
	if((playerf/40-1) ==1 && (playere/40) ==14){

	screeny-=40;
	playerf+=40;
	speechbox=true;
    
	
	};}
		
		
		
		if (maplist==mapone){
		
		//collision dtection for elf girl//////////////////////////////////////////////////////////////////////////mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm/////////////mmmmmmmmm/////m
			if((playerf/40-1) ==4 && (playere/40) ==8){
			yesbox=true;
	     //  alert("Nice Day.");
	       screenx+=40;
	       playere-=40;
		 
	};

	if(((playerf+80)/40-1) ==28 && (playere/40) ==31){
	
 //playerf +' '+screeny+'   '+playere+ ' ' +screenx
	maplist =maptwo;
    screenx=-240;
	 screeny=-240;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	}};
	
	if (maplist==maptwo){
	if(screenx==-200 && screeny==-240){
	
	
 
	maplist =mapone;

	screenx=-920;
	 screeny=-840;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	
	}
	};
	
	if(maplist==mapthree){
	 if(screenx==-400 && screeny==-520){
	
		maplist =maptwo;
    screenx=-1120;
	 screeny=-1520;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	
	}
	}
		screenx-=40;
		tilex-=1;
	playere+=40;
	stepcounter++;
	};
};
	if(z ===5){
if (cursorLeft !=280){
cursorLeft +=100;

}
}

if(z===15){
if(battleLeft!= 265){
	battleLeft +=100;
}
}


	if(maplist==mapfour){
      if(((playere/40) ==5)&& ( (playerf/40) ==1)  ){
          maplist=mapthree;
};
}
	
	
	
	
	
	
	
	
	}; // end of if
	
	}
	
	
	
	if( x > offleft-10 && x< offwid+10 && y>offtop-10 && y<offhig+10){event.preventDefault();}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	};
	
	
	document.addEventListener('touchstart', onTouchEvent, false);
	//document.addEventListener('touchend', onTouchEvent, false);
	
	
	
//keyboard

var screenx=0;
	var screeny=0;
    var tilex=screenx/40;
	var tiley=screeny/40;
	var locationy = screeny+f;
	var locationx = screenx+e;
	var playere=-(screenx)+280;
    var playerf =-(screeny)+ 200;
    var cursorUp=190;
    var cursorLeft =180;
	var battleUp = 258;
	var battleLeft = 165;
	var itemflag=false;
    var cursorList =160;  ///////////////////////////////////////////////////////////////////xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	var listlength=5;//this is toatal amount that will be shown on scren at once
	var liststart=0;
	var lifeflag=false;
	var shopOpen=false;
	var speechbox = false;
	var yesbox=false;
	var yncursor=84;
	var ynflag=0;
    var magic = false;
    var items = false;
	var party = false;
	var equip = false;
	var fight = false;
	var batitem= 0;
	var maplen;
	var maphig
	var run = false;
	var spell = 0;
	var damage =0;
	var damflash =damage;
	 var zitemflag=false;
	var menu=false;
	var lego=11;
	var ego=7;
	var lego2=20;
	var ego2=16;
	var lego3=34;
	var ego3=27;
	var lego4=20;
	var ego4=16;
	var lego5=30;
	var ego5=40;
	var lego6=20;
	var ego6=36;
	var lego7=23;
	var ego7=17;
	
	
	
	
  var equipscrollflag=false;
	var  monload
	var monflag=false;
	var shopflag;
	var equipflag;
	var sellflag=false;
	var listshift=5;
	var listSpacer;
	var keypressed;
	var quipflag;
	var spellflag=false;
	var batitemflag=false;
	/*
	function walknum(){
	
	return Math.floor((Math.random()*4)+1);
	
	}
	
	//alert(walknum());
	*/
	var itemarray =[];
	var magicarray=[];
	var equiparray=[];
	
	var itemholder=[];
	
	var equipsell=true;//if  true equip list, if false item list sold
	
	
	//sellList[liststart]=0;    arrayClose(sellList);
	
	
	
	function arrayClose(thingarray){
	 this.closearray=thingarray;
	 
	 
	 
	for(var i=0; i<closearray.length; i++){
   if(closearray[i]!=0){
   
      itemholder.push(closearray[i]);
	  
   }
}

closearray=[];

for(var i=0; i<itemholder.length; i++){
closearray.push(itemholder[i]);


}
itemholder=[];

return (closearray);


}


//arrayClose(itemarray);


//	alert(arrayClose(itemarray));

	
	var talk="";
 
 var equipaddress=0;

var Equipment = function(name,kind,att,def,cost,quipped){
      this.name=name;
	  this.kind=kind;
	  this.att=att;
	  this.def=def;
	  this.cost=cost;
	  this.quipped=quipped;
      


}
var Masamune=new Equipment("Masamune","W",10,0,70,false);
var woodenSword = new Equipment ("Wooden Sword", "W",3,0,6, false);
var leatherArmor = new Equipment("Leather Armor", "A",0,4,8,false);
var woodenShield=new Equipment("Wooden Shield","S",0,2,3,false);
var spikeyArmor = new Equipment("Spikey Armor", "A",2,4,20,false);
var spikeyShield=new Equipment("Spikey Shield","S",2,2,18,false);
var glassArmor = new Equipment("Glass Armor", "A",0,5,16,false);
var glassShield=new Equipment("Glass Shield","S",0,4,15,false);
var lacquerArmor = new Equipment("lacquer Armor", "A",0,6,38,false);
var lacquerShield=new Equipment("lacquer Shield","S",0,6,32,false);
var staff=new Equipment("Staff","W",2,0,3,false);
var ironSword=new Equipment("Iron Sword","W",5,0,12,false);
var steelSword=new Equipment("Steel Sword","W",6,0,18,false);
var battleAx=new Equipment("Battle Ax","W",8,0,24,false);
var Gungnir=new Equipment("Gungnir","W",12,0,80,false);
var plateArmor=new Equipment("Plate Armor","A",0,10,100,false);
var battleShield=new Equipment("Battle Shield","S",1,4,34,false);
var trident = new Equipment("Trident","W",7,0,25,false);
var spear=new Equipment("Spear","W",6,0,18,false);
var barefist=new Equipment("Bare Fist","W",0,0,false);
var barearm=new Equipment("Bare Arm","S",0,0,false);
var bareback=new Equipment("Bare Back","A",0,0,false);



var Items = function(name,cost, description,hp,mp){
      this.name=name;
	  this.cost=cost;
	  this.description=description;
      this.hp=hp;
	  this.mp=mp;


}

var potion=new Items("Potion",4,"+15HP",15,0);
var tonic=new Items("Tonic",6,"+15MP",0,15);
var elixer=new Items("Elixer",15,"+20HP +20MP",20,20);
var seanzale=new Items("Sea Soda",25,"+100HP ",100,0);
var hottea=new Items("Hot Tea",3,"+5HP +5MP",5,5);
var rice=new Items("Rice",3,"+7HP +0MP",7,0);
var vegetables=new Items("Veggies",4,"+0HP +7MP",0,7);
var davesart=new Items("Fife's Art",5,"No Effect",0,0);

var armorshoparray=[leatherArmor,woodenShield,spikeyArmor,spikeyShield,glassArmor,glassShield,lacquerArmor,lacquerShield];
var weaponshoparray=[staff,woodenSword,ironSword,steelSword,battleAx,Masamune];
var weaponshoparray2=[spear,trident,ironSword,steelSword,battleAx,Gungnir];
var armorshoparray2=[spikeyArmor,spikeyShield,glassArmor,glassShield,plateArmor,battleShield];
var itemshoparray=[potion,tonic,elixer,seanzale,hottea,rice,vegetables,davesart];
var shoparray=armorshoparray;//we can just assign different shop arrays to this for each shop


var sellbox=false;
var sellwindow=false;
var sellList;
var kindA=bareback;
var kindW=barefist;
var kindS=barearm;
var totA;
var totD;
var fifE;
var levelbox=false;


var Magic = function(name,amount,mpcost){
      this.mpcost=mpcost;
	  this.amount=amount;
	  this.name=name;


};
var heal= new Magic("Heal",5);
var fireball= new Magic("Fireball",4);
var decay= new Magic("Decay",6);
var healmoar= new Magic("Healmore",8);
var doom= new Magic("Doom",20);
var healall= new Magic("Healall",12);

equiparray=[];
 itemarray =[];
 magicarray=[heal,fireball,decay,doom,healall];

totA=hero.ATT+kindW.att+kindS.att+kindA.att;


totD=hero.DEF+kindS.def+kindA.def+kindW.def;



var levelup=10;	

	
	
	
	
	//alert
	
	
	
	window.addEventListener('keydown', function (event) {


if (exp>levelup){exp=0; level++;levelbox=true;hero.ATT+=1;hero.DEF+=1;hero.lifeTotal+=8;hero.maxmp+=4;hero.hp=hero.lifeTotal;hero.mp=hero.mp;levelup*=1.6;};


if(speechbox==true){
z=5;
}











	var Person = function (name,locx,locy,speech,map){
	this.name=name;
	this.x=locx;
	this.y=locy;
  //  this.speech=speech;
	this.map=map;
	
	

	
	
  	if(stepcounter==5){
		 monloader=Math.floor((Math.random()*4)+1);
		
		};
	
	 if(maplist==this.map){
	//////////////////playercollisionwithperson
	if(event.keyCode==38){

		if((playere/40) ==(locx)&& (playerf/40) ==(locy+1)){
	     //  alert("Nice Day.");
	      screeny-=40;
	playerf+=40;
	speechbox=true;
	talk =speech;
	};//up
	
	};
	
	if(event.keyCode==39){
	
		if((playere/40) ==(locx-1)&& (playerf/40) ==(locy)){
	     //  alert("Nice Day.");
	      screenx+=40;
	       playere-=40;
		   speechbox=true;
		   talk = speech;
	};//right
	//alert(locx+"  locx and lego "+lego+" playere/40 "+playere/40+ " locy "+locy+"  locy and ego "+ego+" playerf/40 "+playerf/40 );
	};
		if(event.keyCode==40){
	
		if((playere/40) ==(locx) && (playerf/40) ==(locy-1)){
	     //  alert("Nice Day.");
	  screeny+=40;
	playerf-=40;
	speechbox=true;
	talk = speech;
	};//down
	//alert(locx+"  locx and lego "+lego+" playere/40 "+playere/40+ " locy "+locy+"  locy and ego "+ego+" playerf/40 "+playerf/40 );
	};
		if(event.keyCode==37){
	
		if(((playere/40) ==(locx+1))&& ((playerf/40) ==(locy))){
	     //  alert("Nice Day.");
	    screenx-=40;
	       playere+=40;
		   speechbox=true;
		   talk = speech;
	};//left

	//alert(locx+"  locx and lego "+lego+" playere/40 "+playere/40+ " locy "+locy+"  locy and ego "+ego+" playerf/40 "+playerf/40 );
	};
	};
	};
	//so we arent calling on every keypress
	


	var bobby = new Person ("Bobby", lego,ego, "Colbreese castle is in the South!",mapone);
	var Jim = new Person ("Jim", lego2,ego2, "I am the armor store's best customer!",mapone);
	var Laura = new Person ("Laura", lego3,ego3, "Pine Shore is to the North!",mapfive);
	var Dave = new Person ("Dave", lego4,ego4, "There's a cave to the East!",mapfive);
	var Riley = new Person ("Riley", lego5,ego5, "Such a beautiful day!",mapfive);
	var Roger = new Person ("Roger", lego6,ego6, "I like to eat at The Blue Banner!",mapfive);
	var Jill = new Person ("Jill", lego7,ego7,"Great Shopping to be had!",mapfive);


 
 
 
  switch (event.keyCode){
  case 38:
  
  equipscrollflag=false;
     console.log("up!" + " " +keypressed);  ////////////////////////////////////////////////////////////////
     ball.y -=10;	 
	 if(a!=20){a=20;}
	 else a+=18;
	 
	  	 if(maplist==maptwo){
	  if(playere/40==10&&playerf/40==49){
	  
	 maplist=mapfive;
	screenx=-680;
	 screeny=-2080;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	  
	  }
	 
	 
	 }
	  		if (maplist==mapfive){
	if(screenx==-600 && screeny==-80){

	screeny-=40;
	playerf+=40;
	talk="Bring peace to the realm";
	speechbox=true;

	
	};
	
		if(screenx==-1120 && screeny==-1800){

	screeny-=40;
	playerf+=40;
	talk="Stay at the inn for 12 gold?";
	speechbox=true;

	yesbox=true;
	
	};
	
	
	
	}
	 
	  if(maplist==mapone ){
	    if (shopOpen!=true&&sellwindow!=true||z!=5){
	      if(playere/40==20&&playerf/40==7){
	           talk="Welcome to Seaside Armor Shop";
			   shoparray=armorshoparray;
	           speechbox =true;
	           sellbox=true;
	 };
	 if(playere/40==27&&playerf/40==7){
	           talk="Buy a Sword at Bob's Blades";
			   shoparray=weaponshoparray;
	           speechbox =true;
	           sellbox=true;
			 //  sellList=
	 };
	 };
	 }
	 
	 
	 
	 	if (yesbox==true){
	if(yncursor==109){
	yncursor=84;
	}
	}
	if (sellbox==true){
	if(yncursor==109){
	yncursor=84;
	}
	}
	 
	 
	 
	 if(z %5 != 0){
	
	//////////////////////////////////////////////////////////////nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
	
	
	
	//nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
	
   
	
	
	
	
	
	if((maplist[playere/40][(playerf-40)/40] %2)==0&& stepcounter!=40) {
	
	
	if (maplist==mapthree){
	if((playerf/40-1) ==1 && (playere/40) ==14){

	screeny-=40;
	playerf+=40;
	speechbox=true;

	
	};}
	
	
	if (maplist==mapone){
	if((playerf/40-1) ==5 && (playere/40) ==9){

	screeny-=40;
	playerf+=40;
	talk="Stay at the Inn for  12 gold!? "
	speechbox=true;
	yesbox=true;

	};
	//if (maplist==mapone){
	if(((playerf+80)/40-1) ==28 && (playere/40) ==31){
	
 //playerf +' '+screeny+'   '+playere+ ' ' +screenx
	maplist =maptwo;
    screenx=-240;
	 screeny=-240;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	}};
		
		
		

	if (maplist==maptwo){
	if(screenx==-240 && screeny==-280){
	
	
 
	maplist =mapone;

	screenx=-960;
	 screeny=-840;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	
	}
	};
		screeny+=40;
		tiley+=1;
	playerf-=40;
	ptiley-=1;
	stepcounter++;
	
}};
if(z ===5){
if (cursorUp !=160){
cursorUp -=30;

}
}

if(z===15 ){
if (battleUp != 258){
	battleUp -=30;
}
}
if(batitem==1 || spell){
 if(cursorList!=160){
 cursorList-=30;
 
 };
}
/*
if(items==true || magic==true || equip==true||shopOpen==true){
	 if(cursorList!=160){
	cursorList-=30;
	};
	};
	/*
	 if(items==true|| shopOpen==true||sellwindow==true){
	
	 
	 if(itemarray[liststart-1]!=undefined && cursorList==160){
	liststart--;
	listlength--;
	
	};
	 }
	 */
	  if(equip==true){
	
	 
	 if(equiparray[liststart-1]!=undefined && cursorList==160){
	liststart--;
	listlength--;
	
	};
	 }
	
if(items==true || magic==true || equip==true||shopOpen==true||sellwindow==true){
	 if(cursorList!=160){
	cursorList-=30;
	
	
	
	};
	};
	
	 if(items==true||batitem===1){
	
	 
	 if(itemarray[liststart-1]!=undefined&& cursorList==160){
	liststart--;
	listlength--;
	
	};
	 };
	 if(sellwindow==true){
	
	 
	 if(sellList[liststart-1]!=undefined && cursorList==160){
	liststart--;
	listlength--;
	
	};
	 };
	 
	  	 if(shopOpen==true){
	
	 
	 if(shoparray[liststart-1]!=undefined && cursorList==160){
	liststart--;
	listlength--;
	
	};
	 };

var playerHoriz=(playerf+80)/40;
var playerVert = playere/40;
	 break;
  case 40:
  
  
  
  
   	 if(maplist==maptwo){
	  if(playere/40==10&&playerf/40==47){
	  
	 maplist=mapfive;
	screenx=-680;
	 screeny=-2000;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	  
	  };
	 
	 
	 }
  
  
  
  
  
  keypressed= 40;
     console.log("down!")
	 ball.y+=10;
	 if(a!=56){a=56;}
	 else a+=18;
	 
	 
	if (yesbox==true){
	if(yncursor==84){
	yncursor+=25;
	}
	}

	 if (sellbox==true){
	if(yncursor==84){
	yncursor+=25;
	}
	}
	 
	 
	
	 
	 
	 
	 
	 
	 
	 
	  if(z %5 != 0 ){
	if((maplist[(playere)/40][(playerf+40)/40] %2)==0 && stepcounter!=40)
	{
		if (maplist==mapthree){
	if((playerf/40-1) ==1 && (playere/40) ==14){

	screeny-=40;
	playerf+=40;
	speechbox=true;

	
	};}
	
	//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	
	if(maplist==mapfive){
	
	if( screenx==-680&&screeny==-2080){
	//to change the starting location on a new map mess with screenx screeny in multiples of 40 
	maplist=maptwo;
		screenx=-120;
	 screeny=-1720;
	 
	 
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	}};
	
		if (maplist==mapone){
	if(((playerf+80)/40-1) ==5 && (playere/40) ==9){
	
	screeny+=40;
	playerf-=40;
	};
		
	if(((playerf+80)/40-1) ==28 && (playere/40) ==31){
	
 //playerf +' '+screeny+'   '+playere+ ' ' +screenx
	maplist =maptwo;
    screenx=-240;
	 screeny=-240;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	}};
	
	if (maplist==maptwo){
	    if(screenx==-240 && screeny==-200){
	
	
 
	maplist =mapone;

	screenx=-960;
	 screeny=-800;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	
	}
	   if(screenx==-1160 && screeny==-1520){
	maplist =mapthree;

	screenx=-400;
	 screeny=-480;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	}
	};
	
	
	
	
	
	screeny-=40;
	tiley-=1;
	playerf+=40;
	stepcounter++;
	};
	}
	
	if(z ===5 ){
if (cursorUp !=190){
cursorUp +=30;

}
}

if(z===15){
if(battleUp != 288){
	battleUp +=30;
}
}

if(batitem==1 || spell==1){
 if(cursorList!=280){
 cursorList+=30;
 
 };
}


if(items==true || magic==true || equip==true||shopOpen==true||sellwindow==true){
	 if(cursorList!=280){
	cursorList+=30;
	
	
	
	};
	};
	
	 if(items==true){
	
	 
	 if(itemarray.length>listlength && cursorList==280){
	liststart++;
	listlength++;
	
	};
	 };
	 
	  if(batitem==1){
	
	 
	 if(itemarray.length>listlength && cursorList==280){
	liststart++;
	listlength++;
	
	};
	 };
	 
	 if(sellwindow==true){
	
	 
	 if(sellList.length>listlength && cursorList==280){
	liststart++;
	listlength++;
	
	};
	 };
	 	 if(equip==true){
	
	 
	 if(equiparray.length>listlength && cursorList==280 && equipscrollflag==true){




	 liststart++;
	listlength++;
	
	};
	
	 if(equiparray.length>listlength && cursorList==280&& equipscrollflag==false){
	 equipscrollflag=true;
	 
	 };
	 
	 
	 
	 
	 
	 

	 };
	 
	  	 if(shopOpen==true){
	
	 
	 if(shoparray.length>listlength && cursorList==280){
	liststart++;
	listlength++;
	
	};
	 };
	 
	 
	 break;
  case 37:
  keypressed= 37;
     console.log("left!"),
	 ball.x-=10;
	 if(a!=128){a=128;}
	 else a+=18;
	

	if(maplist==mapthree){
      if(((playere/40) ==6)&& ( (playerf/40) ==1)  ){
          maplist=mapfour;
};

};
	 
	 	 if(maplist==maptwo){
	  if(playere/40==11&&playerf/40==48){
	  
	 maplist=mapfive;
	screenx=-680;
	 screeny=-2080;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	  
	  }
	 
	 
	 }
	 
	 	  if(maplist==mapfive ){
	    if (shopOpen!=true&&sellwindow!=true||z!=5){
	      if(screenx==-120&& screeny==-1800){
	           talk="Welcome to A Cut Above";
			   shoparray=weaponshoparray2;
	           speechbox =true;
	           sellbox=true;
	 };
	 }
	 };
	 	 	  if(maplist==mapfive ){
	    if (shopOpen!=true&&sellwindow!=true||z!=5){
	      if(screenx==-120&& screeny==-1160){
	           talk="Welcome to the Armadillo";
			   shoparray=armorshoparray2;
	           speechbox =true;
	           sellbox=true;
	 };
	 }
	 }
	 
	  if(maplist==mapone ){
	    if (shopOpen!=true&&sellwindow!=true||z!=5){
	      if(playere/40==6&&playerf/40==20){
	           talk="Welcome to the Emerald Elm";
			   shoparray=itemshoparray;
	           speechbox =true;
	           sellbox=true;
	 };
	 }
	 }
	 
	
	if(z %5 != 0 ){
		if((maplist[(playere-40)/40][playerf/40]%2) ==0 && stepcounter!=20){
		if (maplist==mapthree){
	if((playerf/40-1) ==1 && (playere/40) ==14){

	screeny-=40;
	playerf+=40;
	speechbox=true;

	
	};}
		if (maplist==mapone){
	if((playerf/40-1) ==4 && (playere/40) ==10){
	    //   alert("It's not too warm and not too cold.");
	       screenx-=40;
	       playere+=40;
	};
	
	if(((playerf+80)/40-1) ==28 && (playere/40) ==31){
	
 //playerf +' '+screeny+'   '+playere+ ' ' +screenx
	maplist =maptwo;
    screenx=-240;
	 screeny=-240;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	}};
	
	if (maplist==maptwo){
	if(screenx==-280 && screeny==-240){
	
	
 
	maplist =mapone;

	screenx=-1000;
	 screeny=-840;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	
	}
	};
		screenx+=40;
		tilex+=1;
	playere-=40;

	stepcounter++;
	};
}
	if(z ===5){
if (cursorLeft !=180){
cursorLeft -=100;

}
}
if(z===15){
if(battleLeft!= 165){
	battleLeft -=100;
}
}

	 break;
  case 39:
  keypressed= 39;
     console.log("right!"),
	 ball.x+=10;
	  if(a!=92){a=92;}
	 else a+=18;
	 
	 
	 	  if(maplist==mapfive ){
	    if (shopOpen!=true&&sellwindow!=true||z!=5){
	      if(screenx==-1240&& screeny==-1320){
	           talk=" Welcome to The Blue Banner";
			   shoparray=itemshoparray;
	           speechbox =true;
	           sellbox=true;
	 };
	 }
	 }
	 
	 
	 
	 if(maplist==maptwo){
	  if(playere/40==9&&playerf/40==48){
	  
	 maplist=mapfive;
	screenx=-680;
	 screeny=-2080;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	  
	  }
	 
	 
	 }
	 
	 
	 
	 
	  if(z %5 != 0){
		if((maplist[(playere+40)/40][playerf/40]%2 )==0 && stepcounter!=20){
		
		
			if (maplist==mapthree){
	if((playerf/40-1) ==1 && (playere/40) ==14){

	screeny-=40;
	playerf+=40;
	speechbox=true;
    
	
	};}
		
		
		
		if (maplist==mapone){
		
		//collision dtection for elf girl//////////////////////////////////////////////////////////////////////////mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm/////////////mmmmmmmmm/////m
			if((playerf/40-1) ==4 && (playere/40) ==8){
			yesbox=true;
	     //  alert("Nice Day.");
	       screenx+=40;
	       playere-=40;
		 
	};

	if(((playerf+80)/40-1) ==28 && (playere/40) ==31){
	
 //playerf +' '+screeny+'   '+playere+ ' ' +screenx
	maplist =maptwo;
    screenx=-240;
	 screeny=-240;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	}};
	
	if (maplist==maptwo){
	if(screenx==-200 && screeny==-240){
	
	
 
	maplist =mapone;

	screenx=-920;
	 screeny=-840;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	
	}
	};
	
	if(maplist==mapthree){
	 if(screenx==-400 && screeny==-520){
	
		maplist =maptwo;
    screenx=-1120;
	 screeny=-1520;
     tilex=screenx/40;
	 tiley=screeny/40;
	
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
	
	
	}
	}
		screenx-=40;
		tilex-=1;
	playere+=40;
	stepcounter++;
	};
};
	if(z ===5){
if (cursorLeft !=280){
cursorLeft +=100;

}
}

if(z===15){
if(battleLeft!= 265){
	battleLeft +=100;
}
}


	if(maplist==mapfour){
      if(((playere/40) ==5)&& ( (playerf/40) ==1)  ){
          maplist=mapthree;
};
}

  break;
  
  case 90 :
 /* 
  if(maplist==maptwo){

alert(playere/40 +" playere    "+playerf/40+"  playerf")
};
 */
  
  
  
  if (sellbox==true){
  		
     if (yncursor==84){
	    shopOpen=true;
	 sellbox=false;
	 speechbox=false;
	
	 };
     if (yncursor==109){
	 		 if(maplist==mapone){
		     if(playere/40==20 &&playerf/40==7  ){
			    sellList=equiparray;
			 }
			 };
	   

	   sellwindow=true;
		sellbox=false;
	     speechbox=false;
		
		
		
	 };
  
  
  
  }
  
  

	

	

  
if (z%7==0){
 
  z=5;

  
  }
  
  /*
	        this.name = name;
		  this.hp = hp;
		  this.lifeTotal =lifeTotal;
		  this.mp=mp;
		  this.maxmp=maxmp;
		  this.ATT=pow;
		  this.DEF=def;
		  this.exp=exp;
*/

  
  
  else if(z==5){
  
  	  if(items===true){
	  
	
	if (cursorList==160){ hero.hp+=itemarray[0].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[0].mp;itemarray[0]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);     };
	
	//if (cursorList==160){ itemflag=true}; 
	
	if (cursorList==190){ hero.hp+=itemarray[1].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[1].mp;itemarray[1]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);     };
	
	if (cursorList==220){ hero.hp+=itemarray[2].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[2].mp;itemarray[2]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);     };
	
	if (cursorList==250){ hero.hp+=itemarray[3].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[3].mp;itemarray[3]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);     };
	
	if (cursorList==280){ hero.hp+=itemarray[4].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[4].mp;itemarray[4]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);     };

	
	};
	
	
	
	
	
	

	if(shopOpen===true){
	
	//to keep from immediate purchase as soon as window opens
	
	
	if (cursorList==160 && shopflag==true ){  if(gold>=shoparray[liststart].cost){ if(shoparray!=itemshoparray){	equiparray.push(shoparray[liststart]);}   else itemarray.push(shoparray[liststart]);gold=gold-shoparray[liststart].cost;}else{poorbox=true;}};
	
	if (cursorList==160){ shopflag=true}; //must be after so not set to true on open

	if (cursorList==190){  if(gold>=shoparray[liststart+1].cost){ if(shoparray!=itemshoparray){	equiparray.push(shoparray[liststart+1]); }   else itemarray.push(shoparray[liststart+1]);gold=gold-shoparray[liststart+1].cost;}else{poorbox=true;}};
	
	if (cursorList==220){  if(gold>=shoparray[liststart+2].cost){ if(shoparray!=itemshoparray){	equiparray.push(shoparray[liststart+2]);}   else itemarray.push(shoparray[liststart+2]);gold=gold-shoparray[liststart+2].cost;}else{poorbox=true;}};
	
	if (cursorList==250){  if(gold>=shoparray[liststart+3].cost){ if(shoparray!=itemshoparray){	equiparray.push(shoparray[liststart+3]);}   else itemarray.push(shoparray[liststart+3]);gold=gold-shoparray[liststart+3].cost;}else{poorbox=true;}};
	
	if (cursorList==280){  if(gold>=shoparray[liststart+4].cost){ if(shoparray!=itemshoparray){	equiparray.push(shoparray[liststart+4]);}   else itemarray.push(shoparray[liststart+4]);gold=gold-shoparray[liststart+4].cost;}else{poorbox=true;}};

	
	};
		if(sellwindow===true){
		   if(playere/40==6&&playerf/40==20){
		   sellList=itemarray;
		   
		   }
		else{sellList=equiparray;}
		
	if (cursorList==160 && sellflag==true){  gold=gold+Math.floor((sellList[liststart].cost)/2);sellList[liststart]=0;   sellList=arrayClose(sellList);  if(playere/40==6&&playerf/40==20){itemarray=sellList;}else{equiparray=sellList;}; sellflag=false; }
	    

if (cursorList==160){ sellflag=true}; 
	//if(playere/40==20&&playerf/40==7){equiparray=sellList;};
	
	
	if (cursorList==190){  gold=gold+Math.floor((sellList[liststart+1].cost)/2)   ;sellList[liststart+1]=0;    sellList=arrayClose(sellList); if(playere/40==6&&playerf/40==20){itemarray=sellList;}else{equiparray=sellList;};  };
	
	if (cursorList==220){  gold=gold+Math.floor((sellList[liststart+2].cost)/2)  ;sellList[liststart+2]=0;     sellList=arrayClose(sellList); if(playere/40==6&&playerf/40==20){itemarray=sellList;}else{equiparray=sellList;};  }
	
	if (cursorList==250){ gold=gold+Math.floor((sellList[liststart+3].cost)/2)   ;sellList[liststart+3]=0;     sellList=arrayClose(sellList); if(playere/40==6&&playerf/40==20){itemarray=sellList;}else{equiparray=sellList;}; }
	
	if (cursorList==280){  gold=gold+Math.floor((sellList[liststart+4].cost)/2)   ;sellList[liststart+4]=0;     sellList=arrayClose(sellList); if(playere/40==6&&playerf/40==20){itemarray=sellList;}else{equiparray=sellList;}; }

	

	
	
	};

	
	
	
	 if(magic===true){
  	if (cursorList==160){  if (hero.mp>4){if(hero.lifeTotal-hero.hp>10){hero.hp+=10;}else{hero.hp=hero.lifeTotal};hero.mp-=5;};}   
	
	
	if (cursorList==190){  };
	
	if (cursorList==220){  };
	
	if (cursorList==250){ };
	
	if (cursorList==280){  if (hero.mp>14){hero.hp=hero.lifeTotal;hero.mp-=15;} };
  cursorUp=190;
  };
  
  
  
  
   if(equip===true){
  	
	if (cursorList==160&&equipflag==true){  

	

	
	
	if (equiparray[liststart].kind=="W"){ if (kindW!=equiparray[liststart])  {kindW=equiparray[liststart]}   else {kindW=barefist;  }totA=hero.ATT+kindW.att+kindS.att+kindA.att;} ;

if (equiparray[liststart].kind=="S"){ if (kindS!=equiparray[liststart])  {kindS=equiparray[liststart]}   else {kindS=barearm;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;

if (equiparray[liststart].kind=="A"){ if (kindA!=equiparray[liststart])  {kindA=equiparray[liststart]}   else {kindA=bareback;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;
   

	};
		
	if (cursorList==160){ equipflag=true};
	
	if (cursorList==190){ 

	if (equiparray[liststart+1].kind=="W"){ if (kindW!=equiparray[liststart+1])  {kindW=equiparray[liststart+1]}   else {kindW=barefist;  }totA=hero.ATT+kindW.att+kindS.att+kindA.att;} ;

if (equiparray[liststart+1].kind=="S"){ if (kindS!=equiparray[liststart+1])  {kindS=equiparray[liststart+1]}   else {kindS=barearm;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def; } ;

if (equiparray[liststart+1].kind=="A"){ if (kindA!=equiparray[liststart+1])  {kindA=equiparray[liststart+1]}   else {kindA=bareback;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;

      

	};
	
	if (cursorList==220){ 
	
		if (equiparray[liststart+2].kind=="W"){ if (kindW!=equiparray[liststart+2])  {kindW=equiparray[liststart+2]}   else {kindW=barefist;  } totA=hero.ATT+kindW.att+kindS.att+kindA.att;} ;

if (equiparray[liststart+2].kind=="S"){ if (kindS!=equiparray[liststart+2])  {kindS=equiparray[liststart+2]}   else {kindS=barearm;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;

if (equiparray[liststart+2].kind=="A"){ if (kindA!=equiparray[liststart+2])  {kindA=equiparray[liststart+2]}   else {kindA=bareback;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;
	
	
	};
	
	if (cursorList==250){ 
		if (equiparray[liststart+3].kind=="W"){ if (kindW!=equiparray[liststart+3])  {kindW=equiparray[liststart+3]}   else {kindW=barefist;  }totA=hero.ATT+kindW.att+kindS.att+kindA.att;} ;

if (equiparray[liststart+3].kind=="S"){ if (kindS!=equiparray[liststart+3])  {kindS=equiparray[liststart+3]}   else {kindS=barearm;  }totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;

if (equiparray[liststart+3].kind=="A"){ if (kindA!=equiparray[liststart+3])  {kindA=equiparray[liststart+3]}   else {kindA=bareback;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;
	
	 
	
	
	};
	
	if (cursorList==280){ 
	
		if (equiparray[liststart+4].kind=="W"){ if (kindW!=equiparray[liststart+4])  {kindW=equiparray[liststart+4]}   else {kindW=barefist;  } totA=hero.ATT+kindW.att+kindS.att+kindA.att;} ;

if (equiparray[liststart+4].kind=="S"){ if (kindS!=equiparray[liststart+4])  {kindS=equiparray[liststart+4]}   else {kindS=barearm;  } totD=hero.DEF+kindS.def+kindA.def+kindW.def;} ;

if (equiparray[liststart+4].kind=="A"){ if (kindA!=equiparray[liststart+4])  {kindA=equiparray[liststart+4]}   else {kindA=bareback;  }totD=hero.DEF+kindS.def+kindA.def+kindW.def; } ;
	
	};

  };
  
  
  
  
  
    if (cursorLeft== 180 && cursorUp ==190 && shopOpen==false&&sellwindow==false&&yesbox==false&&sellbox==false&&speechbox==false){
	magic  = true;
	//alert("magic is true");
	
	}
	
	 if (cursorLeft== 180 && cursorUp ==160&& shopOpen==false&&sellwindow==false&&yesbox==false&&sellbox==false&&speechbox==false){
	items = true;
	
	}
	 if (cursorLeft== 280 && cursorUp ==160&& shopOpen==false&&sellwindow==false&&yesbox==false&&sellbox==false&&speechbox==false){
	party  = true;
	
	};
	
	  if (cursorLeft== 280 && cursorUp ==190&& shopOpen==false&&sellwindow==false&&yesbox==false&&sellbox==false&&speechbox==false){
	equip = true;
	
	};
	//ITEMZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZzz

	 
	
	
	};
	
	
	
	 if(batitem===1){
	  battleLeft = 160; 
	 battleUp =280;
	
	if (cursorList==160&& itemflag==true){ hero.hp+=itemarray[0].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[0].mp;itemarray[0]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray); itemflag=false  ; if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258;batitem=0;  };
	
	if (cursorList==160){ itemflag=true}; 
	
	if (cursorList==190){ hero.hp+=itemarray[1].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[1].mp;itemarray[1]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray); if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--; battleLeft = 165;  battleUp =258; batitem=0;   };
	
	if (cursorList==220){ hero.hp+=itemarray[2].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[2].mp;itemarray[2]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);  if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--; battleLeft = 165;  battleUp =258; batitem=0;   };
	
	if (cursorList==250){ hero.hp+=itemarray[3].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[3].mp;itemarray[3]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);  if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--; battleLeft = 165;  battleUp =258; batitem=0;   };
	
	if (cursorList==280){ hero.hp+=itemarray[4].hp; if(hero.hp>hero.lifeTotal){hero.hp=hero.lifeTotal}     ;hero.mp+=itemarray[4].mp;itemarray[4]=0; if(hero.mp>hero.maxmp){hero.mp=hero.maxmp};  itemarray=arrayClose(itemarray);  if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--; battleLeft = 165;  battleUp =258; batitem=0;   };
	
	
	
	};
   
   /*
     	if (cursorList==160){  if (hero.mp>4){if(hero.lifeTotal-hero.hp>10){hero.hp+=10;}else{hero.hp=hero.lifeTotal};hero.mp-=5;};}   
	
	
	if (cursorList==190){  };
	
	if (cursorList==220){  };
	
	if (cursorList==250){ };
	
	if (cursorList==280){  if (hero.mp>14){hero.hp=hero.lifeTotal;hero.mp-=15;} };
  cursorUp=190;
   */
   
     if(spell==1){
	// battleLeft == 165 && battleUp ==288     //need to stop the background from interacting so we change value then change back.
	 battleLeft = 160; 
	 battleUp =280;
	if (cursorList==160&& spellflag==true ){     if (hero.mp>4){if(hero.lifeTotal-hero.hp>10){hero.hp+=10;}else{hero.hp=hero.lifeTotal};hero.mp-=5};spellflag=false;  if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258; spell=0;};
	
	if (cursorList==160 && spellflag==false){ spellflag=true; }; 
	
	if (cursorList==190){    if (hero.mp>3){damage+=15;hero.mp-=4}; if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258;spell=0;     };
	
	if (cursorList==220){ if (hero.mp>7){damage+=Math.floor(poacher.lifeTotal/2);hero.mp-=8}; if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258;spell=0;     };
	
	if (cursorList==250){ if (hero.mp>11){damage+=poacher.lifeTotal;hero.mp-=12}; if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258;spell=0; }
	
	if (cursorList==280) {if (hero.mp>15){hero.hp=hero.lifeTotal;hero.mp-=16}; if(((totA)-poacher.DEF)>1){damage-=((totA)-poacher.DEF)} else damage--;battleLeft = 165;  battleUp =258;spell=0; }
    
	
	};
	
	
	
	
//	if(screenx==-1120 && screeny==-1800){
	
if (yesbox==true){
	if(yncursor==84){
	      ynflag=1;
		  if(maplist==mapone ){
		  	if((playerf/40-1) ==5 && (playere/40) ==9){
			
			
			if(gold<12){
	poorbox=true;
	yesbox=false;
	ynflag=0;
	}
		  
		  if(gold>11){
		  hero.hp=hero.lifeTotal;
	hero.mp=hero.maxmp;
	gold-=12;
	yesbox=false;
	speechbox=false;
	ynflag=0;
	
	
	}
	}
	}
	
	
		
	}
	if(yncursor==109){
	     ynflag=2;
		// alert(ynflag);
		 if((playerf/40-1) ==5 && (playere/40) ==9){
		 	yesbox=false;
	        speechbox=false;
	         ynflag=0;
	}
		 
	}
	
	
	

	}

		if (yesbox==true){
	if(yncursor==84){
	      ynflag=1;
		  if(maplist==mapfive ){
		  	if(screenx==-1120 && screeny==-1800){
			
			
			if(gold<12){
	poorbox=true;
	yesbox=false;
	ynflag=0;
	}
		  
		  if(gold>11){
		  hero.hp=hero.lifeTotal;
	hero.mp=hero.maxmp;
	gold-=12;
	yesbox=false;
	speechbox=false;
	ynflag=0;
	
	
	}
	}
	}
	
	
		
	}
	if(yncursor==109){
	     ynflag=2;
		// alert(ynflag);
		if(screenx==-1120 && screeny==-1800){
		 	yesbox=false;
	        speechbox=false;
	         ynflag=0;
	}
		 
	}
	
	}
	

	totD=hero.DEF+kindS.def+kindA.def+kindW.def;
  totA=hero.ATT+kindW.att+kindS.att+kindA.att;
	
	

	if(z==15){
	
  if ( battleLeft == 165 && battleUp ==258 &&spell==0 ){ if(((totA)-poacher.DEF)>1){damage+=((totA)-poacher.DEF)} else damage++; if(((totD)-poacher.DEF)<-1){hero.hp+=totD-poacher.ATT}else hero.hp--;if(hero.hp<1){maplist=mapone;gold=0;

  //rebirth starting state  

  stepcounter =0;
			 a=20;
             b=2;
             c=16;
             d=16;
             e=280;
             f=200;
             g=40;
             h=40;  
		     z=7;
			 screenx=0;
	 screeny=0;
     tilex=screenx/40;
	 tiley=screeny/40;
	 locationy = screeny+f;
	 locationx = screenx+e;
	 playere=-(screenx)+280;
     playerf =-(screeny)+ 200;
     hero.hp=hero.lifeTotal;
  
  };if (stepcounter==0){damage=0;}
  };
  if ( battleLeft == 165 && battleUp ==288){  spell =1; };
  if ( battleLeft == 265 && battleUp ==258){  batitem =1; };
  if(batitem==1){
   battleLeft = 265;
   battleUp =258;
   
  }
  if ( battleLeft == 265 && battleUp ==288){   if (Math.floor((Math.random()*4)+1)!=4){if(((totD)-poacher.DEF)<-1){hero.hp+=totD-poacher.ATT}else {hero.hp--}; } else{run=1;}}

   };
   
   
  
  // alert
   
   
   
	break;
  case 88 :
  

  
  z=7;
  if (magic== true){
  magic = false;
  if (magic == false){
  z=5;}
  }
   if (party== true){
  party = false;
  if (party == false){
  z=5;}
  }
   if (items== true){
  items = false;
  cursorList=160;
  liststart=0;
  listlength=5;
  if (items == false){
  z=5;}
  }
   if (equip== true){
  equip = false;
  cursorList=160;
 liststart=0;
 listlength=5;
 equipflag=false;
  if (equip == false){
  z=5;}
  }
  if(speechbox== true){
  speechbox=false};
  if(spell==1){spell=0;  battleLeft = 165;  battleUp =288;};
  if(batitem==1){batitem=0;battleLeft = 165;  battleUp =288;};
  
  if(yesbox==true){
      yesbox=false;
  }

  if(poorbox==true){
		  poorbox=false;
		  speechbox=false;
		  }
if(levelbox==true){
  levelbox=false;
}		  
		  
  if(shopOpen==true){
  
 
  cursorList=160;
  liststart=0;
  listlength=5;
  shopflag=false;//to keep from immediate purchase upon window open
  shopOpen=false;
  
  }
  if(sellbox==true){
  sellflag=false;
  sellbox=false;
  //sellflag=false;
  }
  
  if (sellwindow==true){
       kindWflag=false;
	   kindSflag=false;
	   kindAflag=false;
  	 for(var i=0;i<sellList.length;i++){
	
	   
	   if(equiparray[i]==kindW){
	   
	   kindWflag=true;
	   }
	 if(equiparray[i]==kindA){
	   
	   kindAflag=true;
	   }
	 if(equiparray[i]==kindS){
	   
	   kindSflag=true;
	   }
	 
	 };
  
  sellflag=false;
 
 if(kindWflag==false){
  kindW=barefist;
  }
  
  
   if(kindSflag==false){
  kindS=barearm;
  }
  
  
  
   if(kindAflag==false){
  kindA=bareback;
  }
 
 
  
 
  sellwindow=false;
  cursorList=160;
  liststart=0;
  listlength=5;
  };
  //alert(playere/40+"playere  ----  playerf "+ playerf/40);
  
  
  break;
  

  
 default:
     //console.log(event.keyCode);

	 }
	event.preventDefault();
	}, false);	
	

	
	
	canvas.addEventListener('mousedown', function(event){          
	console.log("x: " + mouse.x + ", y: " + mouse.y);
	
	}, false)   // false bool value has to do with direction of event propagation, just use false, wonkie stuff: event capturing
	
  
 
 canvas.addEventListener('mouseup', function(event){          
	console.log("mousereleased");}, false) ;
	
  //the function passed in was declared above with case states
	//////////////////////////////////SPRITESTUFF
	/*

	
*/

 
	//for(var q=0;q<mapone.length;q++){
	//context.drawImage(brick,40,40)
//	}
	
//var mapone = startmap;
var monstermaker =stepcounter;
/*
	if(stepcounter ==9){		 
			 z=15;
			 var poacher = new Monster("Wedge",20, 20,2,2,10);
	}
	
	*/
	if (!window.requestAnimationFrame) {                                                           //cross-browser boilerplate
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
                                  window.mozRequestAnimationFrame ||
                                  window.msRequestAnimationFrame ||
                                  window.oRequestAnimationFrame ||
                                  function (callback) {
                                    return window.setTimeout(callback, 17 /*~ 1000/60*/);
                                  });
}
	/*
	var potion = {
 potion.name="potion";
	}
	*/
	var maplist = mapone;
 var firstmap = true;
 var secondmap = false;
	  
		 var Bauble = function (name, description, type){
		  this.name=name;
		  this.description = description;
		  this.type =type;
		  }
		  Bauble.prototype.action ={
		  
		  
		  };
		  var bandage = new Bauble ("Items", "Not implemented yet"); 	
	
	 // var itemList = [ 'bandage','bandage','bandage' ];
	
	var Person = function (name,locx,locy,map,speech){
	this.name=name;
	this.x=locx;
	this.y=locy;
	
	if(keypressed==38){

		if((playerf/40-1) ==(locx -1)&& (playere/40) ==(locy -1)){
	     //  alert("Nice Day.");
	       screenx+=40;
	      playere-=40;
	};//up
	
	};
	};
	
	
	
	  var peoplemarch=1;
	  
	  
	  

	//};
	 var legodir=0;
	var legodir2=6;
	var legodir3=0;
	var legodir4=6;
	var legodir5=0;
	var legodir6=6;
	var legodir7=0;
	
	
	if(yesbox==true){
	z=5;//mod5 stops walking
	
	};
	
	
	

	
	

	
	
	
	
	
	

	
	
	
	
	
	
	
	
	(function drawFrame () {
		window.requestAnimationFrame(drawFrame, canvas);      // we are passing drawFrame back as an argument within its function,  
		                                                                                     //we are making a loop, hence why it is called an animation loop
		context.clearRect(0, 0, canvas.width, canvas.height);		//have to clear before we can draw again or else will be streaks																			 
		//context.drawImage(image, 20, 2,16,16,20,20,20,20);
	  //  drawMap();

	peoplemarch++;
      var eightyeight=88;
	 
	  if((peoplemarch>40) &&(peoplemarch<=80)){
	  
	       eightyeight+=44;
		  // legodir+=40;
	  };
	  if(peoplemarch==40){
	   legodir+=44;
	   legodir2+=44;
	   
	   legodir3+=44;
	   legodir4+=44;
	   legodir5+=44;
	   legodir6+=44;
	   legodir7+=44;
	  }
	  if(peoplemarch==80){
	  legodir-=44;
	  legodir2-=44;
	  
	  legodir3+=44;
	  legodir4+=44;
	  legodir5+=44;
	  legodir6+=44;
	  legodir7+=44;
	  }
	  if (peoplemarch >80){
	      eightyeight=88;

	       peoplemarch=0;
	
	       var spriteholder=eightyeight;
	  	   function walknum(){
	
	       return Math.floor((Math.random()*4)+1);
	
	}
	
   // var walking = function (){
	//if(maplist=mapone)
	var stroll = walknum();
	if(maplist==mapone){
	if ((stroll==1)&&(maplist[lego+1][ego]%2!=1) )  {
	   
	//alert(lego+1);
	legodir=172;
	lego+=1;
	
	//left
	
	}
	else if ((stroll==2)&&(maplist[lego][ego+1]%2!=1)) {
	
	//alert(ego+1);
	//legodir=176;
	legodir=88;
	ego+=1;
	
	//down
	
	}
	else if ((stroll==3)&&(maplist[lego-1][ego]%2!=1)) {
	 
	//alert(maplist[lego-1][ego]);
	//legodir=2;
	legodir=272;
	lego-=1;
	
	//right
	//locx=lego;
	
	}
	
	else if ((stroll==4)&&(maplist[lego][ego-1]%2!=1)) {
	// alert(maplist[lego][ego-1]);
	
	legodir=0;
	ego-=1;
	
	//locy=ego;
	
//up
}






	var stroll2 = walknum();

	if ((stroll2==1)&&(maplist[lego2+1][ego2]%2!=1) )  {
	   legodir2=180;
	//alert(lego+1);
	//legodir=88;
	lego2+=1;
	
	//down
	
	}
	else if ((stroll2==2)&&(maplist[lego2][ego2+1]%2!=1)) {
	
	//alert(ego+1);
	legodir2=90;
	ego2+=1;
	
	//right
	
	}
	else if ((stroll2==3)&&(maplist[lego2-1][ego2]%2!=1)) {
	 
	//alert(maplist[lego-1][ego]);
	legodir2=272;
	lego2-=1;
	//up
	//locx=lego;
	
	}
	
	else if ((stroll2==4)&&(maplist[lego2][ego2-1]%2!=1)) {
	// alert(maplist[lego][ego-1]);
	
	legodir2=2;
	ego2-=1;
	
	//locy=ego;
	
	//left
}  
	  
	 }; 
	 if(maplist==mapfive){
	 var stroll3 = walknum();
	//if(maplist==mapfive){
	if ((stroll3==1)&&(maplist[lego3+1][ego3]%2!=1) )  {
	   legodir3=180;
	//alert(lego+1);
	//legodir=88;
	lego3+=1;
	
	//down
	
	}
	else if ((stroll3==2)&&(maplist[lego3][ego3+1]%2!=1)) {
	
	//alert(ego+1);
	legodir3=90;
	ego3+=1;
	
	//right
	
	}
	else if ((stroll3==3)&&(maplist[lego3-1][ego3]%2!=1)) {
	 
	//alert(maplist[lego-1][ego]);
	legodir3=272;
	lego3-=1;
	//up
	//locx=lego;
	
	}
	
	else if ((stroll3==4)&&(maplist[lego3][ego3-1]%2!=1)) {
	// alert(maplist[lego][ego-1]);
	
	legodir3=2;
	ego3-=1;
	
	//locy=ego;
	
	//left
}  
	  
	
	 
	 var stroll4 = walknum();
	
	if ((stroll4==1)&&(maplist[lego4+1][ego4]%2!=1) )  {
	   legodir4=180;
	//alert(lego+1);
	//legodir=88;
	lego4+=1;
	
	//down
	
	}
	else if ((stroll4==2)&&(maplist[lego4][ego4+1]%2!=1)) {
	
	//alert(ego+1);
	legodir4=90;
	ego4+=1;
	
	//right
	
	}
	else if ((stroll4==3)&&(maplist[lego4-1][ego4]%2!=1)) {
	 
	//alert(maplist[lego-1][ego]);
	legodir4=272;
	lego4-=1;
	//up
	//locx=lego;
	
	}
	
	else if ((stroll4==4)&&(maplist[lego4][ego4-1]%2!=1)) {
	// alert(maplist[lego][ego-1]);
	
	legodir4=2;
	ego4-=1;
	
	//locy=ego;
	
	//left
}  
	  
	 
	 
	 var stroll5 = walknum();
	
	if ((stroll5==1)&&(maplist[lego5+1][ego5]%2!=1) )  {
	   legodir5=180;
	//alert(lego+1);
	//legodir=88;
	lego5+=1;
	
	//down
	
	}
	else if ((stroll5==2)&&(maplist[lego5][ego5+1]%2!=1)) {
	
	//alert(ego+1);
	legodir5=90;
	ego5+=1;
	
	//right
	
	}
	else if ((stroll5==3)&&(maplist[lego5-1][ego5]%2!=1)) {
	 
	//alert(maplist[lego-1][ego]);
	legodir5=272;
	lego5-=1;
	//up
	//locx=lego;
	
	}
	
	else if ((stroll5==4)&&(maplist[lego5][ego5-1]%2!=1)) {
	// alert(maplist[lego][ego-1]);
	
	legodir5=2;
	ego5-=1;
	
	//locy=ego;
	
	//left
}  
	  
	
	 
	 var stroll6 = walknum();
	
	if ((stroll6==1)&&(maplist[lego6+1][ego6]%2!=1) )  {
	   legodir6=180;
	//alert(lego+1);
	//legodir=88;
	lego6+=1;
	
	//down
	
	}
	else if ((stroll6==2)&&(maplist[lego6][ego6+1]%2!=1)) {
	
	//alert(ego+1);
	legodir6=90;
	ego6+=1;
	
	//right
	
	}
	else if ((stroll6==3)&&(maplist[lego6-1][ego6]%2!=1)) {
	 
	//alert(maplist[lego-1][ego]);
	legodir6=272;
	lego6-=1;
	//up
	//locx=lego;
	
	}
	
	else if ((stroll6==4)&&(maplist[lego6][ego6-1]%2!=1)) {
	// alert(maplist[lego][ego-1]);
	
	legodir6=2;
	ego6-=1;
	
	//locy=ego;
	
	//left
}  
	  
	
	 
	 var stroll7 = walknum();
	
	if ((stroll7==1)&&(maplist[lego7+1][ego7]%2!=1) )  {
	   legodir7=180;
	//alert(lego+1);
	//legodir=88;
	lego7+=1;
	
	//down
	
	}
	else if ((stroll7==2)&&(maplist[lego7][ego7+1]%2!=1)) {
	
	//alert(ego+1);
	legodir7=90;
	ego7+=1;
	
	//right
	
	}
	else if ((stroll7==3)&&(maplist[lego7-1][ego7]%2!=1)) {
	 
	//alert(maplist[lego-1][ego]);
	legodir7=272;
	lego7-=1;
	//up
	//locx=lego;
	
	}
	
	else if ((stroll7==4)&&(maplist[lego7][ego7-1]%2!=1)) {
	// alert(maplist[lego][ego-1]);
	
	legodir7=2;
	ego7-=1;
	
	//locy=ego;
	
	//left
}  
	  
	 }; 
	 
	 
	 
	 
	 
	 
	 
	 
	  ;}
	  
	  
		for(var q=0,maplen =maplist.length;q<maplen;q++){
		for(var r=0,maphig=maplist[q].length;r<maphig;r++){
		
	if(maplist==maptwo){
		
	//if((maplist[q][r]===1)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(wall,(screenx)+(q*40),(screeny+r*40))};
	//  if((maplist[q][r]===2)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(brick,(screenx)+(q*40),screeny+r*40)};
	 if((maplist[q][r]===4)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(grass,(screenx)+(q*40),screeny+r*40)};
	 //  if((maplist[q][r]===3)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(tree,(screenx)+(q*40),screeny+r*40)};
        	if((maplist[q][r]===5)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(ocean,(screenx)+(q*40),(screeny+r*40))};
	      if((maplist[q][r]===6)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(sand,(screenx)+(q*40),screeny+r*40)};
	    if((maplist[q][r]===8)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(hill,(screenx)+(q*40),screeny+r*40)};
	    if((maplist[q][r]===9)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(mountain,(screenx)+(q*40),screeny+r*40)};
	    if((maplist[q][r]===12)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(town,(screenx)+(q*40),screeny+r*40)};
	    if((maplist[q][r]===14)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(cave,(screenx)+(q*40),screeny+r*40)};
		  if((maplist[q][r]===16)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(woods,(screenx)+(q*40),screeny+r*40)};
	 }

	 if (maplist== mapone){
			if((maplist[q][r]===1)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(wall,(screenx)+(q*40),(screeny+r*40))};
	        if((maplist[q][r]===2)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(brick,(screenx)+(q*40),screeny+r*40)};
	        if((maplist[q][r]===4)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(grass,(screenx)+(q*40),screeny+r*40)};
	        if((maplist[q][r]===3)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(tree,(screenx)+(q*40),screeny+r*40)};
		    if((maplist[q][r]===5)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(desk,(screenx)+(q*40),(screeny+r*40))};
			if((maplist[q][r]===6)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(chest,(screenx)+(q*40),(screeny+r*40))};
		
		if((q==elfx && r ==elfy)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(elfgirl,eightyeight,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
	   if((q==20 && r ==5)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(greenman,eightyeight,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
        if((q==27 && r ==5)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(greenman,eightyeight,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
		 if((q==4 && r ==20)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(greenman,eightyeight+88,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
		
	
	    if((q===lego && r ===ego)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(elfgirl,legodir,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
	       if((q===lego2 && r ===ego2)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(dwarf,legodir2,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
	};
	
	   if (maplist== mapthree){
	   if((maplist[q][r]===1)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(stone,(screenx)+(q*40),(screeny+r*40))};
	  if((maplist[q][r]===2)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(brick,(screenx)+(q*40),screeny+r*40)};
	   
		if((q==dwarfx&& r ==dwarfy)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(dwarf,eightyeight,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
	

	
	};
	
 if (maplist== mapfour){
	   if((maplist[q][r]===1)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(stone,(screenx)+(q*40),(screeny+r*40))};
	  if((maplist[q][r]===2)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(brick,(screenx)+(q*40),screeny+r*40)};
	if((maplist[q][r]===5)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(ocean,(screenx)+(q*40),(screeny+r*40))};
	};
	
	 if (maplist== mapfive){
	   if((maplist[q][r]===1)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(stone,(screenx)+(q*40),(screeny+r*40))};
	  if((maplist[q][r]===2)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(brick,(screenx)+(q*40),screeny+r*40)};
	if((maplist[q][r]===5)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(ocean,(screenx)+(q*40),(screeny+r*40))};
	if((maplist[q][r]===4)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(grass,(screenx)+(q*40),screeny+r*40)};
	if((maplist[q][r]===7)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(desk,(screenx)+(q*40),(screeny+r*40))};
	if((maplist[q][r]===3)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320))){context.drawImage(wall,(screenx)+(q*40),(screeny+r*40))};
	
	
	if((q==22 && r ==6)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(king,eightyeight,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
	if((q==40 && r ==38)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(greenman,eightyeight+176,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
	if((q==35 && r ==48)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(elfgirl,eightyeight,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
	if((q==8 && r ==34)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(greenman,eightyeight+88,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
	if((q==8 && r ==50)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(greenman,eightyeight+88,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
	 if((q===lego3 && r ===ego3)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(elfgirl,legodir3,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
	 if((q===lego4 && r ===ego4)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(dwarf,legodir4,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
	 	 if((q===lego5 && r ===ego5)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(elfgirl,legodir5,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
	 if((q===lego6 && r ===ego6)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(dwarf,legodir6,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
	  if((q===lego7 && r ===ego7)&&((q*40>=playere-320)&&(r*40>=playerf-320))&&((q*40<=playere+320)&&(((r)*40)<=playerf+320))){context.drawImage(elfgirl,legodir7,0,40,40,(screenx)+(q*40),(screeny+r*40),40,40)};
	 
	};
	
	
	
	
	
	
	}
	}

		//if (((mapone[16]*40>=playere-320)&&(mapone[][8]*40>=playerf-320))&&((q*40<=playere+320)&&(r*40<=playerf+320)))context.drawImage(elfgirl,(screenx)+(q*40),(screeny+r*40),40,40)
	//	alert(mapone[6][8]);
		context.drawImage(image, a, b, c, d, e, f, g, h);
		//context.drawImage(elfgirl, a, b, c, d,mapone[3][4] , mapone[3][4], g, h);
		context.fillStyle = "blue";
		
	if(z===5&& z!=15){context.fillRect( 100, 100, canvas.width/2+16, canvas.height/2+16);
	context.fillStyle = "navy";
	context.fillRect( 108, 108, canvas.width/2, canvas.height/2);
	context.fillStyle = "white";
	context.font = '20px Helvetica';
	context.fillText("Menu" ,240,135);
	context.fillText("Items", 200,170);
	context.fillText("Magic",200,200);
	context.fillText("Equip",300,200);
	context.fillText("Party", 300, 170);
	context.fillRect(cursorLeft, cursorUp,10,10);
	
	context.font = '14px Helvetica';
	//context.fillText(playerf +' '+screeny+'   '+playere+ ' ' +screenx,125,280);
    context.fillText("I update randomly",125,304);

	context.drawImage(happy,120,120,60,60);
	
	};
	
	if(magic == true){
	
	context.fillRect( 100, 100, canvas.width/2+16, canvas.height/2+16);
	context.fillStyle = "navy";
	context.fillRect( 108, 108, canvas.width/2, canvas.height/2);
	context.fillStyle = "white";
	context.font = '20px Helvetica';
	context.fillText("Magic" ,240,135);
	context.font = '18px Helvetica';
//	context.fillText("You havent learned any yet...", 160,170);
	context.font = '14px Helvetica';
	context.fillText("Press X or tap top right touchscreen to exit", 120,370);
	context.fillText( hero.hp +'/'+hero.lifeTotal+' hp' ,320,150,200, 90 );
	context.fillText( hero.mp +'/'+hero.maxmp+' mp' ,320,170,200, 90 );
			  
		for (var i =0; i<magicarray.length; i++){
	var listSpacer= 170 +30 * i;
	
	if(i==1||i==2||i==3){context.fillStyle = "grey";}
	else{context.fillStyle = "white";}
	context.fillText(magicarray[i].name, 160,listSpacer);
	
	};
	
	context.fillRect(140, cursorList,8,8);
	
	
	}
		if(items== true){
	
	context.fillRect( 100, 100, canvas.width/2+16, canvas.height/2+16);
	context.fillStyle = "navy";
	context.fillRect( 108, 108, canvas.width/2, canvas.height/2);
	context.fillStyle = "white";
	context.font = '20px Helvetica';
	context.fillText("Items" ,240,135);
	context.font = '18px Helvetica';
	//context.fillText("No Potions yet...", 160,170);
	context.font = '14px Helvetica';
	context.fillText("Press X or tap top right touchscreen to exit", 120,370);
	context.fillText( hero.hp +'/'+hero.lifeTotal+' hp' ,320,150,200, 90 );
	context.fillText( hero.mp +'/'+hero.maxmp+' mp' ,320,170,200, 90 );

	
	///////////////////scrollingmenu
	for (var i =0; i<5; i++){
	 listSpacer= 170 +30 * i;
	 listshift=i+liststart;
	
	if(itemarray[listshift]!=undefined){
	context.fillText(itemarray[listshift].name, 160,listSpacer);
	//liststart++;
}
	
};	
	
	context.fillRect(140, cursorList,8,8);
	
	
	
	}
	
	
	

	

	
	if(shopOpen==true){
	
	context.fillRect( 100, 80, canvas.width/2+16, canvas.height/2+36);
	context.fillStyle = "navy";
	context.fillRect( 108, 88, canvas.width/2, canvas.height/2+20);
	context.fillStyle = "white";
	context.font = '20px Helvetica';
	context.fillText("What would you like to buy?" ,140,115);
	context.font = '18px Helvetica';
	//context.fillText("No Potions yet...", 160,170);
	context.font = '14px Helvetica';
	context.fillText("Name", 160,145);
	if(shoparray!=itemshoparray){
	context.fillText("Kind", 260,145);
	context.fillText("Att", 300,145);
	context.fillText("Def", 330,145);
	};
	if(shoparray==itemshoparray){
	context.fillText("Description", 230,145);
	};
	context.fillText("cost", 360,145);
context.fillText( gold +' Gold' ,320,310,200, 90 );
	context.fillText("Press X or tap top right touchscreen to exit", 120,370);
	
	context.fillRect(140, cursorList,8,8);
	
	
	///////////////////scrollingmenu
	for (var i =0; i<5; i++){
	var listSpacer= 170 +30 * i;
	 listshift=i+liststart;
	
	if(shoparray[listshift]!=undefined){
	context.fillText(shoparray[listshift].name, 160,listSpacer);
	if(shoparray!=itemshoparray){
	context.fillText(shoparray[listshift].kind, 270,listSpacer);
	context.fillText(shoparray[listshift].att, 300,listSpacer);
	context.fillText(shoparray[listshift].def, 330,listSpacer);
	};
	if(shoparray==itemshoparray){
	context.fillText(shoparray[listshift].description, 230,listSpacer);
	}
	context.fillText(shoparray[listshift].cost, 380,listSpacer);
	//liststart++;
	}
	
	};
	
	
	
	
	
	}
	
			if(sellwindow == true){
	
	context.fillRect( 100, 100, canvas.width/2+16, canvas.height/2+16);
	context.fillStyle = "navy";
	context.fillRect( 108, 108, canvas.width/2, canvas.height/2);
	context.fillStyle = "white";
	context.font = '20px Helvetica';
	context.fillText("What are you selling?" ,140,135);
	context.font = '18px Helvetica';
	//context.fillText("no equipment ...", 160,170);
	context.font = '14px Helvetica';
	context.fillText("Press X or tap top right touchscreen to exit", 120,370);
	

	for (var i =0; i<5; i++){
	listSpacer= 170 +30 * i;
	 listshift=i+liststart;
	
	if(sellList[listshift]!=undefined){
	context.fillText(sellList[listshift].name, 160,listSpacer);
	//liststart++;
	}
	
	};
	
	context.fillRect(140, cursorList,8,8);
	
	


	};
	
	
		if(party == true){
	
	context.fillRect( 100, 100, canvas.width/2+16, canvas.height/2+16);
	context.fillStyle = "navy";
	context.fillRect( 108, 108, canvas.width/2, canvas.height/2);
	context.fillStyle = "white";
	context.font = '20px Helvetica';
	context.fillText("Stats" ,240,135);
	context.font = '18px Helvetica';
	
	 context.fillText( hero.hp +'/'+hero.lifeTotal+' hp' ,160,170,200, 90 );
	 context.fillText( hero.mp +'/'+hero.maxmp+' mp' ,160,195,200, 90 );
		 context.fillText("Att is "+ hero.ATT,160,220);
	context.fillText('Def is '+hero.DEF,160,245);
	 
	 context.fillText("Gold is "+ gold,160,270);
	context.fillText('Exp is '+exp,160,295);
	
	context.font = '14px Helvetica';
	context.fillText("Press X or tap top right touchscreen to exit", 120,370);
	
	
	
	
	
	};
		if(equip == true){
	
	context.fillRect( 100, 100, canvas.width/2+16, canvas.height/2+16);
	context.fillStyle = "navy";
	context.fillRect( 108, 108, canvas.width/2, canvas.height/2);
	context.fillStyle = "white";
	context.font = '20px Helvetica';
	context.fillText("Equip" ,240,135);
	context.font = '18px Helvetica';
	//context.fillText("no equipment ...", 160,170);
	context.font = '14px Helvetica';
	context.fillText("Press X or tap top right touchscreen to exit", 120,370);
	context.fillText("Attack= " +totA ,320,140);
	context.fillText("Defense= "+ totD ,320,160);



//totD=hero.DEF+kindS.def+kindA.def
	
		for (var i =0; i<5; i++){
	listSpacer= 170 +30 * i;
	 listshift=i+liststart;
	
	if(equiparray[listshift]!=undefined){
	if(kindW==equiparray[listshift] ||kindS==equiparray[listshift]||kindA==equiparray[listshift] ){
	context.fillText("E", 120,listSpacer);}

	context.fillText(equiparray[listshift].name, 160,listSpacer);
	//liststart++;
//	if(kindW==equiparray[listshift]){}
//	context.fillText("E", 120);
	}
	
	};
	
	context.fillRect(140, cursorList,8,8);
	
	
	
	}
/*
		for (var i =0; i<equiparray.length; i++){
			
	var listSpacer= 170 +30 *i;
		listshift=i+liststart;
			if(shoparray[listshift]!=undefined){
	context.fillText(equiparray[i].name, 160,listSpacer);
	context.fillText(equiparray[i].att, 320,listSpacer);
	context.fillText(equiparray[i].def, 360,listSpacer);
	if(equiparray[i].quipped==true){context.fillText("E", 120,listSpacer);}
	
	};
	};
	
	context.fillRect(140, cursorList,8,8);
	
	
	

	}
	*/
	
	if(speechbox==true){
		context.fillRect( 100, 100, canvas.width/2+16, canvas.height/2+16);
	context.fillStyle = "navy";
	context.fillRect( 108, 108, canvas.width/2, canvas.height/2);
	context.fillStyle = "white";
    
	context.font = '14px Helvetica';
	if(maplist==mapone||maplist==mapfive){
	
	context.fillText(talk, 160,170);
	
}
	if(maplist==mapthree){
	context.fillText("living here saves money", 160,170);
}

	context.font = '14px Helvetica';
	context.fillText("Press X or tap top right touchscreen to exit", 120,270);
	}
	if(poorbox==true){
	context.fillStyle = "white";
	context.fillRect( 330, 40, canvas.width/3, canvas.height/8);
		context.fillStyle = "navy";
	context.fillRect( 338, 48, canvas.width/3-16, canvas.height/8-16);
	context.fillStyle = "white";

	context.font = '18px Helvetica';
	context.fillText("Not enough gold!!", 364,70);
	
	}
	
	if(yesbox==true){
	
context.fillStyle = "white";
	context.fillRect( 330, 40, canvas.width/6, canvas.height/4);
		context.fillStyle = "black";
	context.fillRect( 338, 48, canvas.width/6-16, canvas.height/4-16);
	context.fillStyle = "white";

	context.font = '18px Helvetica';
	context.fillText("Y/N?", 364,70);
	context.fillText("Yes", 374,96);
	context.fillText("No", 374,120);
	
	context.fillRect(360, yncursor,8,8);
	
	}
	
	if(levelbox==true){
	
context.fillStyle = "white";
	context.fillRect( 330, 40, canvas.width/6, canvas.height/4+50);
		context.fillStyle = "navy";
	context.fillRect( 338, 48, canvas.width/6-16, canvas.height/4+34);
	context.fillStyle = "white";

	context.font = '18px Helvetica';
	context.fillText("Level Up", 344,70);
	context.fillText("ATT+1", 354,96);
	context.fillText("DEF+1", 354,120);
	context.fillText("MP+4", 354,144);
	context.fillText("HP+8", 354,168);
	
	}
	
	
	
		if(sellbox==true){
	
context.fillStyle = "white";
	context.fillRect( 330, 40, canvas.width/6, canvas.height/4);
		context.fillStyle = "black";
	context.fillRect( 338, 48, canvas.width/6-16, canvas.height/4-16);
	context.fillStyle = "white";

	context.font = '18px Helvetica';
	context.fillText("B/S?", 364,70);
	context.fillText("Buy", 374,96);
	context.fillText("Sell", 374,120);
	
	context.fillRect(360, yncursor,8,8);
	
	}
	
		//ball.x += vx,//velocityz
		 // vx+=ax,
		  //ball.x +=vx,
		   //ball.y +=vy;
        //ball.draw(context);                                                                                  //animcode goes here
			
			// name, hp, lifeTotal,pow,def,exp
			if(maplist==mapone||maplist==mapfive){
			stepcounter=0;
			  //so we only call random once
			 
			}
			
	
		
		
			if(stepcounter ==20){
			
			
			
			
			
		
			
			 z=15;
			 context.fillStyle ="white";
			 context.fillRect( 92, 92, canvas.width/2+16, canvas.height/2+26);
			context.fillStyle ="black";
		 context.fillRect( 100, 100, canvas.width/2, canvas.height/2+10);
            
			//	if(monload%2==0){		
					
		//  var poacher = new Monster("Wedge",20, 20,2,2,10);
			
			if(monloader%2==1&& maplist==maptwo){
				
			  poacher = new Monster("ruffian",20, 20,0,0,2,2,5); //this just does name
			  context.drawImage(ruffian,200,120,90, 90);
			  
			};
          if(monloader%2==1&&(( maplist==mapthree)||(maplist==mapfour))){
				
			  poacher = new Monster("caveraider",30, 30,0,0,10,10,10); //this just does name
			  context.drawImage(caveraider,200,120,90, 90);
			  
			};
		    if(monloader%2==0&&(( maplist==mapthree)||(maplist==mapfour))){
				
			  poacher = new Monster("mutation",40, 40,0,0,13,13,8); //this just does name
			  context.drawImage(mutation,200,120,90, 90);
			  
			};
			if(monloader%2==0&& maplist==maptwo){
					
			  poacher = new Monster("testknight",25, 25,0,0,7,7,7);
              context.drawImage(testknight,200,120,90, 90);
			  //this just does name
			};
			  
			//  context.drawImage(testknight,200,120,90, 90);    //this draw image
			 
			  context.font = '14px Helvetica';
			  context.fillStyle ="white";
              context.fillText( poacher.name ,120,130,200, 90);
			  context.fillText( poacher.hp -damage +'/'+poacher.lifeTotal+' hp' ,120,150,200, 90 );
			  context.fillText( "Enemy appeared!",120,230,200, 90 );
			  
			  context.fillText( hero.name ,320,130,200, 90);
			  context.fillText( hero.hp +'/'+hero.lifeTotal+' hp' ,320,150,200, 90 );
			  context.fillText( hero.mp +'/'+hero.maxmp+' mp' ,320,170,200, 90 );
			  //context.drawImage(select,157,250);
             context.font = '20px Helvetica ';
			  context.fillText( "Fight",180,270,200, 90 );
              context.fillText( "Spell",180,300,200, 90 );
			  context.fillText( "Item",280,270,200, 90 );
			  context.fillText( "Run",280,300,200, 90 );
			  context.fillStyle ="white";
			  context.fillRect(battleLeft, battleUp,10,10);
			 if (damage>damflash){
			 context.fillRect( 100, 100, canvas.width/2, canvas.height/2);
			 context.fillStyle ="black";
			 context.fillRect( 100, 100, canvas.width/2, canvas.height/2);
			 context.fillStyle ="white";
			 context.fillRect( 100, 100, canvas.width/2, canvas.height/2);
			 damflash=damage;
			 };
			
			 if (damage>= poacher.hp){
			 gold+=3;
			 exp+=10;
			 stepcounter=0;
			 z=7;
			 damage=0;
			 damflash=0;}
			
			  
			  
			  if (run ==1){
			 stepcounter=0;
			 z=7;
			 damage=0;
			 damflash=0;
			 run=0;}
			  }
				
             if (spell ==1){
				context.fillRect( 100, 100, canvas.width/2+16, canvas.height/2+16);
	context.fillStyle = "black";
	context.fillRect( 108, 108, canvas.width/2, canvas.height/2);
	context.fillStyle = "white";
	context.font = '20px Helvetica';
	context.fillText("Spells" ,240,135);
	context.font = '18px Helvetica';
//	context.fillText("No Magic yet..", 160,170);
	context.font = '14px Helvetica';
	context.fillText("Press X or tap top right touchscreen to exit", 120,370);
					for (var i =0; i<magicarray.length; i++){
	var listSpacer= 170 +30 * i;
	context.fillText(magicarray[i].name, 160,listSpacer);
	
	};
	
	context.fillRect(140, cursorList,8,8);




			if(z%7==0){spell=0}
			 }
			 
			



			if (batitem==1){
				context.fillRect( 100, 100, canvas.width/2+16, canvas.height/2+16);
	context.fillStyle = "black";
	context.fillRect( 108, 108, canvas.width/2, canvas.height/2);
	context.fillStyle = "white";
	context.font = '20px Helvetica';
	context.fillText("Items" ,240,135);
	context.font = '18px Helvetica';
	//context.fillText("No Potions yet...", 160,170);
	context.font = '14px Helvetica';
	context.fillText("Press X or tap top right touchscreen to exit", 120,370);
	
	for (var i =0; i<5; i++){
	 listSpacer= 170 +30 * i;
	 listshift=i+liststart;
	
	if(itemarray[listshift]!=undefined){
	context.fillText(itemarray[listshift].name, 160,listSpacer);
	//liststart++;
	}
	
};	
	

	
	context.fillRect(140, cursorList,8,8);
	
	
	
	
	
			 if(z%7==0){batitem=0}
			 }
			 
 // if ( battleLeft == 265 && battleUp ==258){  batitem =1; };  
				
			
				context.fillStyle = "white";
			context.font = '20px Helvetica';	
			context.fillText('Z',40,30);
			context.fillText('Up',canvas.width/2.2,30);
context.fillText('X',canvas.width/1.1,30);
context.fillText('Left',10,canvas.height/1.5)
context.fillText('Down',(canvas.width/2.25),canvas.height/1.05);

context.fillText('Right',canvas.width/1.1,canvas.height/1.5);
			context.font = '12px Helvetica';	
		context.fillText('Touchscreen controls',(canvas.width/2.5),canvas.height/1.02)	;	
				
				
				
				if(hero.hp<1){maplist=mapone;}
				
				
				
																							 
}());  //  () immedi invokes the function without having to call it
	
	
	
	
	
	
	
};
	
	 
    </script>	 
	



 
	
		 
	

<p>arrow keys to move; z is action, x is cancel. Works in Firefox, Chrome, Safari, and Opera.  Maybe not in IE.</p>

<p>I'm coding this from scratch, needs balanced and debugging.  also, You can scroll the menus if you get more than five items</p>





<div>
</div>

</div>
<div class="textbox"><p>arrow keys to move; z is action, x is cancel. Works in Firefox, Chrome, Safari, and Opera.  Maybe not in IE.</p>

<p><!--There is a castle to the south of the world map and a cave to the south east.  Running has a 1/4 chance of working, but run from the test knight until you earn some money to buy equipment.  Wait for ruffian to show up, sometimes he doesn't though, it's random. Or you can use fireball spell to get some gold from testknight. Level up refills life but not magic.  Soon, you'll become so powerful nothing can stop you, which is how you are in real life.--></p></div>
<div class="push"></div></div>

<div class="pagefooter">Website and work by David Fife, all rights reserved.</div>

 
	
	</body></html>
