
song = "";
objects = [];
status = "";

function preload()
{
	song = loadSound("alert.mp3");
}

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
}

function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}

function modelLoaded() {
  console.log("Modelo Carregado!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);
      if(status != "")
      {
        r =  random(255);
        g =  random(255);
        b =  random(255);      
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status: Objetos Detectados";
 
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         
          if(objects[i].label == "person")
          {
            document.getElementById("numberOfObjects").innerHTML = "Bebê encontrado";
            console.log("stop");
            song.stop();
          }
          else
          {
            document.getElementById("numberOfObjects").innerHTML = "Bebê não encontrado";
            console.log("play"); 
            song.play();
          }
         }

        if(objects.length == 0)
        {
          document.getElementById("numberOfObjects").innerHTML = "Bebê não encontrado";
          console.log("play"); 
          song.play();
        }
      }
}
