const heart = document.getElementById("heart");
const status = document.getElementById("status");


// 每个用户随机一个身份
const userId = Math.random().toString(36).substring(2);


// 当前是否按住
let pressing = false;


// Firebase 数据位置
const room = database.ref("heart-touch");



// 开始按
function startPress() {

    if (pressing) return;

    pressing = true;


    // 写入自己的状态

    room.child(userId).set({
        pressing: true
    });


    heart.classList.add("beating");

    status.innerHTML =
        "等待另一颗心 ❤️";

}



// 松开

function endPress(){

    pressing = false;


    room.child(userId).set({
        pressing:false
    });


    heart.classList.remove("beating");


    status.innerHTML =
        "按住这颗心";

}



// 监听两个人状态

room.on("value", snapshot => {


    let users = snapshot.val();


    if(!users) return;


    let count = 0;


    Object.values(users).forEach(user=>{

        if(user.pressing){
            count++;
        }

    });



    if(count >= 2){

        status.innerHTML =
        "两颗心连接成功 ❤️✨";


        heart.classList.add(
            "beating"
        );


        createHearts();

    }


});




// 爱心烟花

function createHearts(){

    // 创建中心闪光

    const flash = document.createElement("div");

    flash.innerHTML = "💖";

    flash.style.position = "fixed";
    flash.style.left = "50%";
    flash.style.top = "50%";
    flash.style.transform = "translate(-50%,-50%)";

    flash.style.fontSize = "120px";

    document.body.appendChild(flash);


    flash.animate(
        [
            {
                transform:
                "translate(-50%,-50%) scale(0)",
                opacity:0
            },
            {
                transform:
                "translate(-50%,-50%) scale(1.5)",
                opacity:1
            },
            {
                transform:
                "translate(-50%,-50%) scale(1)",
                opacity:0
            }
        ],
        {
            duration:1000
        }
    );


    setTimeout(()=>{
        flash.remove();
    },1000);



    // 爆炸粒子

    for(let i=0;i<120;i++){


        const heart =
        document.createElement("div");


        heart.innerHTML =
        ["❤️","💖","💕","💗"]
        [Math.floor(Math.random()*4)];


        heart.style.position="fixed";


        heart.style.left="50%";
        heart.style.top="50%";


        heart.style.fontSize =
        Math.random()*25+15+"px";


        document.body.appendChild(heart);



        let angle =
        Math.random()*Math.PI*2;


        let distance =
        Math.random()*350+100;



        let x =
        Math.cos(angle)*distance;


        let y =
        Math.sin(angle)*distance;



        heart.animate(
            [
                {
                    transform:
                    "translate(-50%,-50%) scale(0)",
                    opacity:1
                },

                {
                    transform:
                    `translate(${x}px,${y}px) scale(1)`,
                    opacity:1
                },

                {
                    transform:
                    `translate(${x}px,${y-200}px) scale(0.5)`,
                    opacity:0
                }

            ],
            {
                duration:
                1800+Math.random()*1000,
                easing:"cubic-bezier(.17,.67,.83,.67)"
            }
        );


        setTimeout(()=>{
            heart.remove();
        },3000);

    }

}





// 手机触摸

heart.addEventListener(
"touchstart",
e=>{

e.preventDefault();

startPress();

},
{passive:false}
);



heart.addEventListener(
"touchend",
()=>{

endPress();

}
);



// 鼠标

heart.addEventListener(
"mousedown",
()=>{

startPress();

}
);


heart.addEventListener(
"mouseup",
()=>{

endPress();

}
);