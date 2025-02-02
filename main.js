img = "";
status = "";
objects = [];

function preload()
{
    img = loadImage('dog_cat.jpg');
}

function setup()
{
    canvas = createCanvas(600,350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600,350);
    video.hide();
}
function start()
{
    objectdetector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML = "status is detecting objects";
}

function modelloaded()
{
    console.log("modelloaded");
    status = true;
  
}

function gotresult(error,results)
{
    if(error)
    {
        console.log("error");
    }
        console.log("results");

    objects = results;

    
}

function draw()
{
    image(video,0,0,600,350);

    if(status != "")
    
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectdetector.detect(video,gotresult);
        for(i = 0; i < objects.length; i++ )
        {
            document.getElementById("status").innerHTML = "status : object detected";
            document.getElementById("numberofobjects").innerHTML = "number of objects detected are :- " + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100 );
            text(objects[i].label + "" + percent + "%", objects[i].x,objects[i].y - 5);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
                }
    }

}