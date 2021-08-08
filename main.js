music = "";
musics = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";


function preload()
{
loadSound();
}

function setup()
{
    video = createCapture(VIDEO);
    video.size(550, 500);


    canvas = createCanvas(500, 500);
    canvas.center()

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw()
{
    image(video, 0, 0, 300, 300);

    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist > 0.2)
    {

    circle(rightWristX, rightWristY,20);

    if(rightWristY >0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML =  "Speed = 0.5x";
        song.rate(0.5);
    }

    else if(rightWristY >0 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML =  "Speed = 1x";
        song.rate(1);
    }

    else if(rightWristY >0 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML =  "Speed = 1.5x";
        song.rate(1.5);
    }

    else if(rightWristY >0 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML =  "Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY >0 && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML =  "Speed = 2.5x";
        song.rate(2.5);
    }
}
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " +leftWristX +"leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX+ "rightWristY = "+ rightWristY);
    }
}