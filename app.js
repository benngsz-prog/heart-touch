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


    for(let i=0;i<80;i++){


        let heartParticle =
        document.createElement("div");


        heartParticle.innerHTML="❤️";


        heartParticle.style.position="fixed";

        heartParticle.style.left="50%";

        heartParticle.style.top="50%";

        heartParticle.style.fontSize =
        Math.random()*30+15+"px";


        let x =
        (Math.random()-0.5)*window.innerWidth;


        let y =
        (Math.random()-0.5)*window.innerHeight;



        heartParticle.animate([

            {
                transform:"translate(0,0)",
                opacity:1
            },

            {
                transform:
                `translate(${x}px,${y}px)`,
                opacity:0
            }


        ],{

            duration:1500

        });



        document.body.appendChild(
            heartParticle
        );


        setTimeout(()=>{

            heartParticle.remove();

        },1500);


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