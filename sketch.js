//Create variables here
var dogImage1;
var dogImage2;
var foodV;
var database;
var dogSprite;
var lastFed=0;
function preload()
{
  //load images here
  dogImage1=loadImage("images/dogImg.png")
  dogImage2=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(1000, 700);
  database=firebase.database()
  var child= database.ref("food")
  child.on("value", readValue, showError)
  dogSprite=createSprite(850,250)
  dogSprite.addImage("dogImg.png", dogImage1)
  dogSprite.addImage("dogImg1.png", dogImage2)
  dogSprite.scale=0.5
  f= new Food()
  feedButton=createButton("Feed The Dog")
  feedButton.position(700,95)
  feedButton.mousePressed(feedtheDog)
  addButton=createButton("ADD food")
  addButton.position(850,95)
  addButton.mousePressed(addFood)
}
function feedtheDog(){
if(foodV>0){
  foodV=foodV-1
  dogSprite.changeImage("dogImg1.png", dogImage2)
  childref=database.ref("/")
  childref.update({
  food:foodV,
  feedTime: hour()
  })
}
}
function addFood(){
  foodV=foodV+1
  childref=database.ref("/")
  childref.update({
  food:foodV
  })
}
function readValue(data){
foodV= data.val()
}
function showError(){
  console.log("error")
}

function draw() {  
  background("blue")
  
  drawSprites();
  textSize(20);
  fill("white");
  
  text("Food="+foodV, 500, 250)
  f.display()
var feedTime= database.ref("feedTime")
feedTime.on("value",function(data){
  lastFed=data.val()
})
  //add styles here
  text("Last Fed="+lastFed, 600, 250)
}



