/*
 step5: 将导航按钮的状态与焦点图片的状态同步。
 */
window.onload = init;

var picList;    // 保存所有的图片链接，全局使用
var btnList;    // 保存所有的导航按钮，全局使用
var currentZIndex = 1;   // 代表当前最大的z-index
var currentPicIndex = 0; // 代表当前焦点图片的索引
var timer;          // 保存定时器变量
var delay = 3000;   // 图片切换的延时

function init(){
    // 初始化banner
    picList = document.getElementById("banner-pic").getElementsByTagName("a");

    // 将第一张图片放在最上面
    picList[0].style.zIndex = currentZIndex;

    /****************以下为增加鼠标悬停事件响应********************/
    // 添加鼠标悬停事件响应
    var banner = document.getElementById("banner");
    banner.onmouseover = function(){
        // 停止图片播放-清除定时器
        clearInterval(timer);
    };
    banner.onmouseout = function(){
        playBanner();   // 继续播放
    };

    /****************以下为动态生成导航按钮********************/
    // 动态生成导航按钮
    var bannerNav = document.getElementById("bannerNav");
    var navContent = "";
    console.log(document.getElementById("banner"))
    console.log(bannerNav)
    console.log(picList.length)
    for(var i=0;i<picList.length;i++){
        navContent += '<span class="normal">'+(i+1)+'</span>';
    }
    // 将生成的5个span添加到bannerNav中
    bannerNav.innerHTML = navContent;
    // 为第一个span设置class=current
    bannerNav.getElementsByTagName("span")[0].className = "current";

    /****************以下为导航按钮添加鼠标移入事件响应********************/
    btnList = bannerNav.getElementsByTagName("span");

    // 遍历按钮集合，为每个按钮添加鼠标移入事件响应
    for(var j=0;j<btnList.length;j++){
        btnList[j].nextNum = j; // 注意这里
        btnList[j].onmouseover = function(){
            //1)重置所有按钮的样式为.normal；
            resetBtn();

            //2)将当前按钮的样式设为.current;
            this.className = "current";

            //3)将对应位置的图片，动态滑入;
            // 将下一张图片向右偏移570px
            picList[this.nextNum].style.left = "570px";
            // 将该图片的z-index值提升
            picList[this.nextNum].style.zIndex = currentZIndex++;
            // 执行滑入运动
            startMove(picList[this.nextNum],0);
            // 将刚滑入的图片的索引设为当前焦点图片的索引
            currentPicIndex = this.nextNum;
        };
    }

    /****************以下为执行图片播放********************/
    //开始执行图片幻灯切换
    playBanner();
}

// 重置所有按钮的样式为.normal
function resetBtn(){
    for(var i=0;i<btnList.length;i++){
        btnList[i].className = "normal";
    }
}

// 轮播图片的方法
function playBanner(){
    clearInterval(timer);
    timer = setInterval(anim,delay);

    function anim(){
        // 选取下一张图片
        var nextIndex = currentPicIndex + 1;
        if(nextIndex == picList.length){
            nextIndex = 0;
        }

        // 将下一张图片向右偏移570px
        picList[nextIndex].style.left = "570px";

        // 将该图片的z-index值提升
        picList[nextIndex].style.zIndex = currentZIndex++;

        /***************同步导航按钮的状态***********************/
        // 重置
        resetBtn();
        // 将当前焦点按钮的样式设为.current
        btnList[nextIndex].className = "current";
        /*****************************************************/

        // 执行滑入运动
        startMove(picList[nextIndex],0);

        // 将刚滑入的图片的索引设为当前焦点图片的索引
        currentPicIndex = nextIndex;
    }
}

/**
 *
 * @param obj       代表要移动的物体
 * @param iTarget   代表物体要运动到的目标值
 */
function startMove(obj, iTarget) {

    clearTimeout(obj.timer);
    obj.timer = setTimeout(anim, 30);

    function anim() {
        // 计算负加速度
        var iSpeed = (iTarget - obj.offsetLeft) / 8;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

        if (obj.offsetLeft == iTarget) {
            clearTimeout(obj.timer);
            return;
        }

        obj.style.left = obj.offsetLeft + iSpeed + "px";

        obj.timer = setTimeout(anim, 30);
    }
}