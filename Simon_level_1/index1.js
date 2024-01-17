var initialnumber = 0;
var arr = []; // in this array we will store all sequence of numbers of sounds
var n = 0; // value that represent the current number that you pressed in sequennce of numbers
var forremove = 0;
var show = 1;

document.addEventListener("keypress",function() {
    if(initialnumber == 0){
        nowsound(10);
        setTimeout(function() {
            initialnumber = 1;
            forremove = 0;
            document.querySelectorAll(".start")[0].innerHTML = "Best of luck";
            const changable = Math.floor(Math.random()*3) + 1;
            arr.push(changable);
            switch(changable){
                case 1 : makeanimation("A");
                nowsound(changable);
                setTimeout(function() {
                    show = 0;
                },400);
                break;
                case 2 : makeanimation("B");
                nowsound(changable);
                setTimeout(function() {
                    show = 0;
                },400);
                break;
                case 3 : makeanimation("C");
                nowsound(changable);
                setTimeout(function() {
                    show = 0;
                },400);
                break;
                case 4 : makeanimation("D");
                nowsound(changable);
                setTimeout(function() {
                    show = 0;
                },400);
                break;
            } 
        }, 2500);   
    }
})

const lengthofbutton = document.querySelectorAll(".click").length;

for(var i=0;i<lengthofbutton;i++){
    document.querySelectorAll(".click")[i].addEventListener("click",function() {

        if(initialnumber == 1 && show == 0){
            makesound(this.innerHTML);
        }
    });
}

// sounds that play on clicks according to number of clicked box
function nowsound(data){
    switch(data){

        case 0 : var forwrong = new Audio("sounds/wrong.mp3");
            forwrong.play();
            break;
        case 1 : var block_A = new Audio("sounds/red.mp3");
                block_A.play();
        break;
        case 2 : var block_B = new Audio("sounds/green.mp3");
            block_B.play();
        break;
        case 3 : var block_C = new Audio("sounds/yellow.mp3");
            block_C.play();
        break;
        case 4 : var block_D = new Audio("sounds/blue.mp3");
            block_D.play();
        break;
        default : var last = new Audio("sounds/suru.wav");
            last.play();
    }
    
}

//function for assign number to boxs as 1 to box A, 2 to box B, 3 to box C, 4 to box D.
function makesound(event2){
    switch(event2){

        case "A" : checkpressend_btn(1,event2);
        break;
        case "B" : checkpressend_btn(2,event2);
        break;
        case "C" : checkpressend_btn(3,event2);
        break;
        case "D" : checkpressend_btn(4,event2);
        break;
    }
}

// function for display full series of sounds from start to new added sound
function fullpath(){

    let index = -1;
    for(let i = 0 ;i<arr.length;i++){
        const number1 = arr[i];
        var value;
        index = i;
        switch(number1){
            case 1 : value = "A";
            break;
            case 2 : value = "B";
            break;
            case 3 : value = "C";
            break;
            case 4 : value = "D";
            break;
        }
        const number2 = value;
        setTimeout(function() {
            nowsound(number1);
            makeanimation(number2);
        }, (i+1)*400);
    }
    setTimeout(function() {
        show = 0;
    }, (index+1)*400+200);
}

// in this function we all see the click box is right or wrong
function checkpressend_btn(data,key){

    const currentval = arr[n];
    if(currentval == data){  // if click box is right then make sound and animation and also increase n.
        nowsound(currentval);
        makeanimation(key);
        n++;
    }
    else{ // if wrong then set all to default and make array empty to store new sequence
        show = 1;
        n = 0;
        initialnumber = 0;
        forremove = 1;
        var size = arr.length;
        document.querySelectorAll(".start")[0].innerHTML = "Your score is " + size + ",Press any key to again restart the game";
        document.querySelectorAll(".main")[0].classList.add("wrong");
        document.querySelectorAll(".showlevel")[0].classList.add("wrong");
        nowsound(0);
        setTimeout(function() {
            document.querySelectorAll(".main")[0].classList.remove("wrong");
            document.querySelectorAll(".showlevel")[0].classList.remove("wrong");
        }, 400);
        for(var i = 0 ;i<size;i++){
            arr.pop();
        }
    } // if n ( reqresent current index of pressing ) is equal to size of array means all sequence is pressed by user is correct then add new and show full sequence in full path function.
    if(n == arr.length && forremove == 0){
        show = 1;
        var newnumber = Math.floor(Math.random()*3) + 1;
        arr.push(newnumber);
        setTimeout(function() {
            fullpath();
        }, 300);
        n = 0; 
    }
}

// function for animation of background white while pressing on box.
function makeanimation(key){
    var activeButton = document.querySelector("." + key);

    activeButton.classList.add("pressed");

    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);
}