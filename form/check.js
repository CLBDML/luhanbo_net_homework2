// 显示滑块的值
var msg = document.getElementById("msg");
window.onload = function () {
  msg.innerHTML = docu.getElementById("salary").value;
};

document.getElementById("salary").onchange = function () {
  msg.innerHTML = this.value;
};

//读取并展示图片
var fileInput = document.getElementById("test-image-file");
var info = document.getElementById("test-file-info");
var preview = document.getElementById("test-image-preview");
fileInput.addEventListener("change", function () {
  //监听change事件
  preview.style.backgroundImage = ""; //清除背景图片
  if (!fileInput.value) {
    info.innerHTML = "没有选择文件";
    return;
  }
  var file = fileInput.files[0]; //获取File引用
  //获取File信息:
  info.innerHTML =
    "文件:" + file.name + "<br>" + "修改:" + file.lastModifiedDate;
  if (
    file.type !== "image/jpeg" &&
    file.type !== "image/png" &&
    file.type !== "image/gif"
  ) {
    alert("不是有效的图片文件!");
    return;
  }
  var reader = new FileReader(); //读取文件
  reader.onload = function (e) {
    //发起一个异步操作来读取文件内容
    var data = e.target.result; //data串形如:'data:image/jpeg;base64,/9j/4AAQSk……(base64编码)……'
    preview.style.backgroundImage = "url(" + data + ")";
  };
  reader.readAsDataURL(file); //以DataURL的形式读取文件
});

//二级串联
var cityList = new Array();
cityList[0] = new Array("武汉", "黄石", "十堰", "襄阳", "鄂州");
cityList[1] = new Array("石家庄", "唐山", "秦皇岛", "保定");
cityList[2] = new Array("郑州", "开封", "洛阳", "信阳");
cityList[3] = new Array("太原", "大同", "临沂", "运城");
cityList[4] = new Array("济南", "青岛", "淄博", "烟台");

function changeprovince(val) {
  var city = document.getElementById("city");
  city.options.length = 0;
  var arr = cityList[val];
  for (var i = 0; i < arr.length; i++) {
    var option = document.createElement("option");
    option.innerHTML = arr[i];
    option.value = arr[i];
    city.appendChild(option);
  }
}

//验证码
var show_num = [];
draw(show_num);

function cli() {
  draw(show_num);
}

function draw(show_num) {
  var canvas_width = document.getElementById("canvas").clientWidth;
  var canvas_height = document.getElementById("canvas").clientHeight;
  var canvas = document.getElementById("canvas"); //获取到canvas的对象，演员
  var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
  canvas.width = canvas_width;
  canvas.height = canvas_height;
  var sCode =
    "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m";
  var aCode = sCode.split(",");
  var aLength = aCode.length; //获取到数组的长度

  for (var i = 0; i <= 3; i++) {
    var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
    var deg = (Math.random() * 30 * Math.PI) / 180; //产生0~30之间的随机弧度
    var txt = aCode[j]; //得到随机的一个内容
    show_num[i] = txt;
    var x = 5 + i * 10; //文字在canvas上的x坐标
    var y = 10 + Math.random() * 4; //文字在canvas上的y坐标
    context.font = "bold 16px 微软雅黑";

    context.translate(x, y);
    context.rotate(deg);

    context.fillStyle = randomColor();
    context.fillText(txt, 0, 0);
    context.rotate(-deg);
    context.translate(-x, -y);
  }
  for (var i = 0; i <= 5; i++) {
    //验证码上显示线条
    context.strokeStyle = randomColor();
    context.beginPath();
    context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
    context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
    context.stroke();
  }
  for (var i = 0; i <= 30; i++) {
    //验证码上显示小点
    context.strokeStyle = randomColor();
    context.beginPath();
    var x = Math.random() * canvas_width;
    var y = Math.random() * canvas_height;
    context.moveTo(x, y);
    context.lineTo(x + 1, y + 1);
    context.stroke();
  }
}

function randomColor() {
  //得到随机的颜色值
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}
