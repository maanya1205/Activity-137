objects=[];
video= "";
status="";
function preload(){
    video= createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas= createCanvas(480,380);
    canvas.center();
}
function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML= "Status: Object Detected!";
            document.getElementById("number_of_objects").innerHTML = "Number of objects are "+objects.length;
            fill(255,69,0);
            noFill();
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            stroke(61,48,245);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function gotResult(results,error){
if(error){
    console.error(error);
}
else{
    console.log(results);
    objects=results;
}
}
function start(){
    objectDetector= ml5.objectDetector("cocossd",mouse);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";
}
function mouse(){
    console.log("Model is Loaded!!");
    status= true;
    video.loop();
    video.speed(1);
    video.volume(0);
}