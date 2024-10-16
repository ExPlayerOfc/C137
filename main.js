video = "";
verificarStatus = "";
objects = [];

function preload(){

  video = createVideo('video.mp4');
  video.hide();

}
function setup() {
    canvas=createCanvas(480, 380);
    canvas.center();
}
function start() {
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status: Detectando Objetos";
}
function draw() {
    image(video, 0,0,480,380);
    if(verificarStatus!="") { 
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML="Status = objetos detectados";
            document.getElementById("numeroDeObjetos").innerHTML="Quantidade de Objetos: " + objects.legth;
            fill("#FF0000");
            porcentagem= floor(objects[i].confidence * 100);
            text(objects[i].label + "" + porcentagem + "%", + objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);  
        } 
    } 
}
function modelLoaded() {
    console.log("Modelo Carregado");
    verificarStatus= true;
    video.loop();
    video.speed(1);
    video.volume(0);
} 
function gotResult(error,results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
}