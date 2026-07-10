const heart = document.getElementById("heart");
const status = document.getElementById("status");

let pressing = false;


function startPress() {

    pressing = true;

    heart.classList.add("beating");

    status.innerHTML = "正在等待另一颗心 ❤️";

}



function endPress() {

    pressing = false;

    heart.classList.remove("beating");

    status.innerHTML = "按住这颗心";

}



// 手机触摸
heart.addEventListener(
    "touchstart",
    function(e){

        e.preventDefault();

        startPress();

    },
    {passive:false}
);


heart.addEventListener(
    "touchend",
    function(){

        endPress();

    }
);


// 电脑鼠标
heart.addEventListener(
    "mousedown",
    function(){

        startPress();

    }
);


heart.addEventListener(
    "mouseup",
    function(){

        endPress();

    }
);