var starttime;
var intervaldata;
var initialtime = 15*1000;

// for show the time in clock
function showcontent(data){
    console.log( data);
    if( data >= 0 && data < 10){
        stopclock();
        document.querySelectorAll(".start")[0].innerHTML = "Times Up";
        document.querySelectorAll(".main")[0].classList.add("wrong");
        document.querySelectorAll(".showlevel")[0].classList.add("wrong");
        nowsound(0);
        setTimeout(function() {
            document.querySelectorAll(".main")[0].classList.remove("wrong");
            document.querySelectorAll(".showlevel")[0].classList.remove("wrong");
        }, 400);
        show = 1;
        setTimeout( function() {
            document.querySelectorAll(".start")[0].innerHTML = "Your score is " + arr.length + ",Press any key to again restart the game";
            initialnumber = 1;
        },1100)
        for(var i = 0 ;i<size;i++){
            arr.pop();
        }
    }
    let milli = Math.floor((data%1000)/10);
    let sec = Math.floor( (data% (1000*60))/(1000) );

    document.querySelectorAll(".start")[0].innerHTML = ( ( sec>9 ? sec : "0" + sec) + "." + ( milli>9 ? milli : "0" + milli));
}

// for start the clock
function startclock() {
    starttime = Date.now();
    document.querySelectorAll(".start")[0].classList.add('increase');
    intervaldata = setInterval(()=>{
        let currenttime = Date.now();
        let realtime = currenttime - starttime;
        console.log(realtime);
        let initial = initialtime - realtime;
        if( initial == 0){
            stopclock();
        }
        showcontent(initial);

    }, 10);
}

// for stop the clock
function stopclock(){
    document.querySelectorAll(".start")[0].classList.remove('increase');
    clearInterval(intervaldata);
}

function navigate() {
    const folder = document.getElementById("folderSelect").value;
    if (folder === "Simon_level_1") {
        window.location.href = "../index.html";
    } else if (folder === "Simon_level_2") {
        window.location.href = "../Simon_level_2/level2.html";
    } else if (folder === "Simon_level_3") {
        window.location.href = "../Simon_level_3/level3.html";
    }
}


var initialnumber = 0;
var arr = []; // in this array we will store all sequence of numbers of sounds
var n = 0; // value that represent the current number that you pressed in sequennce of numbers
var forremove = 0;
var show = 1;

document.addEventListener("keypress",function() {
    if(initialnumber == 0){
        initialnumber = 1;

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
                    startclock();
                    show = 0;
                },300);
                break;
                case 2 : makeanimation("B");
                nowsound(changable);
                setTimeout(function() {
                    startclock();
                    show = 0;
                },300); 
                break;
                case 3 : makeanimation("C");
                nowsound(changable);
                setTimeout(function() {
                    startclock();
                    show = 0;
                },300); 
                break;
                case 4 : makeanimation("D");
                nowsound(changable);
                setTimeout(function() {
                    startclock();
                    show = 0;
                },300);  
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

        case 0 : var forwrong = new Audio("../sounds/wrong.mp3");
            forwrong.play();
            break;
        case 1 : var block_A = new Audio("../sounds/red.mp3");
                block_A.play();
        break;
        case 2 : var block_B = new Audio("../sounds/green.mp3");
            block_B.play();
        break;
        case 3 : var block_C = new Audio("../sounds/yellow.mp3");
            block_C.play();
        break;
        case 4 : var block_D = new Audio("../sounds/blue.mp3");
            block_D.play();
        break;
        default : var last = new Audio("../sounds/start.wav");
            last.play();
    }
    
}

//function for assign number to boxs as 1 to box A, 2 to box B, 3 to box C, 4 to box D.
function makesound(event2){
    switch(event2){

        case "A" : finalsound(1,event2);
        break;
        case "B" : finalsound(2,event2);
        break;
        case "C" : finalsound(3,event2);
        break;
        case "D" : finalsound(4,event2);
        break;
    }
}

// in this function we all see the click box is right or wrong
function finalsound(data,key){

    const currentval = arr[n];
    if(currentval == data){  // if click box is right then make sound and animation and also increase n.
        nowsound(currentval);
        makeanimation(key);
        n++;
    }
    else{  // if wrong then set all to default and make array empty to store new sequence
        stopclock();
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
    }
    if(n == arr.length && forremove == 0){  // if n ( reqresent current index of pressing ) is equal to size of array means all sequence is pressed by user is correct then add new and show new number in sequence
        show = 1;
        stopclock();
        var newnumber = Math.floor(Math.random()*3) + 1;
        arr.push(newnumber);
        var newkey;
        switch(newnumber){
            case 1 : newkey = "A";
            break;
            case 2 : newkey = "B";
            break;
            case 3 : newkey = "C";
            break;
            case 4 : newkey = "D";
            break;
        }
        setTimeout(function() {
            nowsound(newnumber);
            makeanimation(newkey);
            setTimeout( function() {
                startclock();
                show = 0;
            },300)
          }, 500);
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