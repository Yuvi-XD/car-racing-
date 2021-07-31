var ball;
var database,position
var ballposition




function preload(){


hotairballonimage=loadImage("ballon.png")

}






function setup(){
    database=firebase.database()
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.scale=0.2
ball.addImage(hotairballonimage)
    //first we will refer to the database node we want to reach
    var ballposition=database.ref("ball/position")
    //learning to read the values from the database using on function 
    //on position will be started on the variable in which we have stored the refrence 
    ballposition.on("value",readPosition)

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    //even to update value in the database we will refer to the node using database.ref
    //set an update function that is used to update the values in the database
    database.ref("ball/position").set({
        x:position.x+x,y:position.y+y
    })
    }

function readPosition (data){
    position=data.val()
    ball.x=position.x   
    ball.y=position.y
}
