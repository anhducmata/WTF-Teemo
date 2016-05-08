

var width = 500,
    height = window.innerHeight, // Chiều cao màn hình
    gLoop, 
    kill = 1,
    points = 0, // điểm
    life = 5,
    state = !0, 
    legend = 0,
    level = 0,
    live = 3;
    BoomImg1 = new Image(),
    BoomImg1.src = "platform1.png",
    BoomImg2 = new Image(),
    BoomImg2.src = "platform2.png",
    BoomImg3 = new Image(),
    BoomImg3.src = "platform3.png",
    BoomImg4 = new Image(),
    BoomImg4.src = "platform4.png",
    AudioRanTee = new Audio("teesmile.ogg");
    AudioRanTee1 = new Audio("teesmile1.ogg");
    AudioRanTee2 = new Audio("teesmile2.ogg");
    AudioLegend1 = new Audio("l1.ogg");
    AudioLegend2 = new Audio("k2.ogg");
    AudioLegend3 = new Audio("k3.ogg");
    AudioLegend4 = new Audio("k4.ogg");
    AudioLegend5 = new Audio("k5.ogg");
    AudioLive = new Audio("live.ogg");
    AudioJump = new Audio("jump.ogg");
    c = document.getElementById("c"),
    ctx = c.getContext("2d");
    c.width = width, c.height = height;
function setAssetReady()
{
    this.ready = true;
}
for (var clear = function() {
        ctx.fillStyle = "#9CECFC", 
        ctx.beginPath(),    // start Draw .nên có để chấm dứt 1 Path cũ
        ctx.rect(0, 0, width, height),  // vẽ khung Game từ điểm (0,0) -> (width, height) bao quanh toàn bộ canvas 
        ctx.closePath(),  // end Draw
        ctx.fill() // Tô màu cho khung
    }, 
    totalCloud = 4, 
    cloud = [], i = 0; totalCloud > i; i++) 
    cloud.push([Math.random() * width, Math.random() * height, 100 * Math.random(), Math.random() / 2]);
var Drawcloud = function() {
        for (var t = 0; totalCloud > t; t++) ctx.fillStyle = "rgba(255, 152, 45, " + cloud[t][3] + ")", ctx.beginPath(), ctx.arc(cloud[t][0], cloud[t][1], cloud[t][2], 0, 2 * Math.PI, !0), ctx.closePath(), ctx.fill()
    },
    crazy = function() {},
    Movecloud = function(t) {
        for (var e = 0; totalCloud > e; e++) 
            cloud[e][1] - cloud[e][2] > height ? (cloud[e][0] = Math.random() * width, 
                cloud[e][2] = 100 * Math.random(), cloud[e][1] = 0 - cloud[e][2], 
                cloud[e][3] = Math.random() / 2) : cloud[e][1] += t
    },
    player = new function() {
        var t = this;   
        t.image = new Image(), 
        t.image.onload = setAssetReady(),
        t.image.src = "angle.png", // tạo image với source image 
        t.width = 65, t.height = 90,    // chiều rộng và cao của image
        t.frames = 1, 
        t.actualFrame = 0, 
        t.X = 0, t.Y = 0,   // vị trí 
        t.isJumping = !1, 
        t.isFalling = !1, 
        t.jumpSpeed = 0, 
        t.fallSpeed = 0,
        t.jump = function() {t.isJumping || t.isFalling || (t.fallSpeed = 0, t.isJumping = !0, t.jumpSpeed = 20)
        },
        
        t.checkJump = function() {
           
            t.Y > .35 * height ? t.setPosition(t.X, t.Y - t.jumpSpeed) : (t.jumpSpeed > 10 && points++, Movecloud(.5 * t.jumpSpeed), 
                platforms.forEach(function(e, o) {
                if (e.y += t.jumpSpeed, e.y > height) {
                    var i = ~~(3 * Math.random());
                    i = 0 == i ? 1 : 0, platforms[o] = new Platform(Math.random() * (width - platformWidth), e.y - height, i)
                }
            })), t.jumpSpeed--, 0 == t.jumpSpeed && (t.isJumping = !1, t.isFalling = !0, t.fallSpeed = 1)
        }, t.fallStop = function() {
            t.isFalling = !1, t.fallSpeed = 0, t.jump()
        }, t.checkFall = function() {
            t.Y < height - t.height ? (t.setPosition(t.X, t.Y + t.fallSpeed), t.fallSpeed++) : 0 == points ? t.fallStop() : CheckLive();
        }, t.moveLeft = function() {
            t.X > 0 && t.setPosition(t.X - 5, t.Y)
        }, t.moveRight = function() {
            t.X + t.width < width && t.setPosition(t.X + 5, t.Y)
        }, t.setPosition = function(e, o) {
            t.X = e, t.Y = o
        }, t.rank = function(){
             document.getElementById("rankicon").innerHTML = '<img src="'+ GameLevel() +'" width="160" height="150">';
            },
         t.interval = 0, t.draw = function() {
            try {
                ctx.drawImage(t.image, 0, t.height * t.actualFrame, t.width, t.height, t.X, t.Y, t.width, t.height)
            } catch (e) {}
            12   == t.interval && (t.actualFrame == t.frames ? t.actualFrame = 0 : t.actualFrame++, t.interval = 0), t.interval++
        }
    };
player.setPosition(~~((width - player.width) / 2), height - player.height), player.jump(), document.onmousemove = function(t) {
    player.X + c.offsetLeft > t.pageX ? player.moveLeft() : player.X + c.offsetLeft < t.pageX && player.moveRight()
};
var totalPlatforms = 4,
    platforms = [],
    platformWidth = 55,
    platformHeight = 30,
    Platform = function(t, e, type) {
        var i = this;
    
        i.image = new Image, 
        i.width = 80, t.height = 20,    // chiều rộng và cao của image
        i.frames = 1, 
        i.image.src = "platform.png", 
        i.image.onload = setAssetReady(),

        i.onCollide = function() {
            legend = 0;
            kill = 1;
             document.getElementById("boom").innerHTML = '';
            player.fallStop()
        }, 
        1 === type && (i.image.src = BoomImg1.src,x = Math.floor((Math.random() * 10) + 1), kill = 1, i.onCollide = function() {
                
                if (x <5) {
                                     
                                    document.getElementById("boom").innerHTML = '<img src="boom.png"  height="40" width="40"/>';
                } else {
                            document.getElementById("boom").innerHTML = '';
                }
                if (kill == 1 ) {
                    if (x < 5) {
                          ranTee = Math.floor(Math.random() * 3) + 1;
                        switch (ranTee){
                        case 1: 
                        var t = AudioRanTee;
                        break;
                        case 2: 
                        var t = AudioRanTee1;
                        break;
                        case 3: 
                        var t = AudioRanTee2;
                        break;
                        } 
                          t.play();
                    }
                    player.fallStop();
                    i.image.src = BoomImg2.src;

                    
                    kill ++;
                }else if (kill == 2 ) {
                    player.fallStop();
                    i.image.src = BoomImg3.src;
                    
                    kill ++;
                } else
                if (kill == 3) {
                    player.fallStop();
                    i.image.src = BoomImg4.src;
                    if (x < 5) {
                        if (life == 0) {
                            CheckLive();
                        } else {
                        life --;
                        player.jumpSpeed = 40, points += 100;
                        legend ++;
                        var t;
                         switch (legend){
                        case 1:
                        t = new Audio("l1.ogg");
                        break;
                        case 2:
                        t = new Audio("k2.ogg");
                        break;
                        case 3:
                        t = new Audio("k3.ogg");
                        break;
                        case 4:
                        t = new Audio("k4.ogg");
                        break;
                        case 5:
                        t = new Audio("k5.ogg");
                        legend = 0;
                        break;
                    };
                       
                        t.play();
                        kill = 1;
                        }
                    }else {
                    player.jumpSpeed = 40, points += 100;
                    var t;
                    legend++;
                    switch (legend){
                        case 1:
                        t = AudioLegend1;
                        break;
                        case 2:
                        t = AudioLegend2;
                        points += 200;
                        break;
                        case 3:
                        t = AudioLegend3;
                        points += 300;
                        break;
                        case 4:
                        t = AudioLegend4;
                        points += 400;
                        break;
                        case 5:
                        t = AudioLegend5;
                        points += 500;
                        legend = 0;
                        break;
                    };
                    t.play();
                    kill = 1;
                    }
                }
        }), i.x = t, 
        i.y = e, 
        i.type = type, 
        i.isMoving = ~~(2 * Math.random()), 
        i.direction = ~~(2 * Math.random()) ? -1 : 1, 
        i.draw = function() {

                ctx.drawImage(i.image,i.x,i.y,platformWidth + 20 ,platformHeight + 10);
            // ctx.fillStyle = "rgba(255, 255, 255, 1)";
            // var t = ctx.createRadialGradient(i.x + platformWidth / 2, i.y + platformHeight / 2, 5, i.x + platformWidth / 2, i.y + platformHeight / 2, 45);
            // t.addColorStop(0, i.firstColor), 
            // t.addColorStop(1, i.secondColor), 
            // ctx.fillStyle = t, 
            // ctx.fillRect(i.x, i.y, platformWidth, platformHeight)

        }, i
    },
    generatePlatforms = function() {
        for (var type, position = 0, i  = 0; totalPlatforms > i; i++) 
            type = 2 * Math.random(), 
            type = 0 == type ? 1 : 0, 
        platforms[i] = new Platform(Math.random() * (width - platformWidth), position, type), 
        height - platformHeight > position && (position += height / totalPlatforms)
    }(),
    checkCollision = function() {
        platforms.forEach(function(t, ind) {
            if (player.isFalling && player.X < t.x + platformWidth && player.X + player.width > t.x && player.Y + player.height > t.y && player.Y + player.height < t.y + platformHeight) {
                t.onCollide();
                var o = AudioJump;
                o.play()
            }
        })
    },
    GameLoop = function() {

        clear(), 
        Drawcloud(), 
        player.isJumping && player.checkJump(), 
        player.isFalling && player.checkFall(), 
        player.draw(), 
        player.rank(),
        platforms.forEach(function(t, e) {
            t.isMoving && (t.x < 0 ? t.direction = 1 : t.x > width - platformWidth && (t.direction = -1), 
            t.x += t.direction * (e / 5) * (points / 100)), 
            t.draw()

        }), 
        checkCollision(), 
        ctx.font = "14pt Arial", 
        ctx.fillStyle = "Black", 
        document.getElementById("pointsicon").innerHTML = '<img src="points.png" width="40" height="40">   '+ points;
        //ctx.fillText(points, 5, height - (height - 30)), 
        document.getElementById("lifeicon").innerHTML = '<img src="life_icon.png" width="40" height="40"> '+ life;
        //ctx.fillText(life, 5 , height - (height - 80)), 
        document.getElementById("liveicon").innerHTML = '<img src="life.png" width="40" height="40"> '+ live;
        state && (gLoop = setTimeout(GameLoop, 20))
    },
  
    CheckLive = function(){
        if (live == 0) {
            GameOver();
        }else {
            live --;
            var t = AudioLive;
            t.play();
            player.isFalling = !1, player.fallSpeed = 0;
            player.isJumping || player.isFalling || (player.fallSpeed = 0, player.isJumping = !0, player.jumpSpeed = 75);
            
        }
    },
    GameLevel = function(){
        var pointsLevel = parseInt(points/1000);
        var resultLevel = level + pointsLevel;
        var rank;
        if (resultLevel == 0){
            rank = 'dong.png';   
        }
        if (resultLevel == 1){
            rank = 'bac.png';   
        }

        if (resultLevel == 2){
            rank = 'vang.png';   
        }

        if (resultLevel == 3){
            rank = 'bachkim.png';   
        }

        if (resultLevel == 4){
            rank = 'kimcuong.png';   
        }


        if (resultLevel == 5){
            rank = 'caothu.png';   
        }

        if (resultLevel > 5){
            rank = 'thachdau.png';   
        }

        return rank;
    },
    GameOver = function() {
        i = Math.floor(Math.random() * 3) + 1;
        switch (i){
            case 1: 
                var t = new Audio("die2.ogg");
                break;
            case 2: 
                var t = new Audio("die3.ogg");
                break;
            case 3: 
                var t = new Audio("die4.ogg");
                break;
        }  
        
        t.play(), state = !1, clearTimeout(gLoop), setTimeout(function() {
            
            clear(), ctx.fillStyle = "Black", 
            ctx.font = "14pt Arial", 
            // ctx.fillText("GAME OVER", width / 2 - 60, height / 2 - 50),             
            // ctx.fillText("Điểm  : " + points, width / 2 - 60, height / 2 - 30), 
            // ctx.fillText("Click để tiếp tục !", width / 2 - 60, height / 2 - 10), 
             // document.getElementById("boom").innerHTML = '';
             document.getElementById("gameovericon").innerHTML = '<img src="gameover.png" width="350" height="200">';
             document.getElementById("play").innerHTML = '<img src="play.png" width="120" height="120">';
             //document.getElementById("pointsicon").innerHTML = '<img src="points.png" width="40" height="40">';
             // document.getElementById("result").innerHTML = '<img src="'+ GameLevel() +'" width="140" height="120">';
             // document.getElementById("lifeicon").innerHTML = '';
             // document.getElementById("pointsicon").innerHTML = '';
             // document.getElementById("rankicon").innerHTML = '';
             $(document).on("click","#play",function() {
                window.location.reload()
    });
        }, 100)
    };
  function buyArmor(event){
           
            var x = event.which || event.keyCode;
             var x = event.keyCode;
            if (x == 32) {
                if (points > 1000) {
                    life += 2;
                    level++;
                    points -= 1000;
                }
            }
            if (x == 113) {
                if (points > 2000) {
                    live += 2;
                    points -= 2000;
                    level += 2;
                }
            }
        }
GameLoop();
