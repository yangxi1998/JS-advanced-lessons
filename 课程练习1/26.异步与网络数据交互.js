//单线程
//JS是单线程的（是指在JS引擎中负责解释和执行JS代码的线程只有一个，又称主线程），但实际上还存在其它线程（工作线程）




// 案例二 异步执行的回调(通过定时器模拟)
var LTimeOperation = function(taskID){
    var id = taskID;
    //思考什么时候将方法定义在构造函数内，什么时候定义在构造函数的prototype属性上
    this.go = function(callback){
        console.log('Start LTimeOperation #'+id);
        var delay = parseInt((Math.random() * 10000000) % 5000);
        setTimeout(function(){
            console.log('task #'+id+' cost '+delay+' ms.');
            callback();
        },delay);
    }
};
function f2(){
    console.log('this is f2, i am callback!\n');
}
for(var i = 0;i<5;i++){
    var task = new LTimeOperation(i);
    task.go(f2);
}                          //发了5个请求，后端处理的顺序不一样

ctrl+c 2次 
cls 清屏


var xhr = new XMLHttpRequest(); 
// if (!xhr) {
//     console.log("xhr 创建失败！！");
// }
xhr.onreadystatechange = function () {               //所有都执行完了，执行，异步                 
    //console.log(xhr.readyState,xhr.status);
    if (xhr.readyState == 4) {               //前端通了
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {            //后端通了
            var message = xhr.responseText;
            console.log(message);
        }
    }
};
xhr.open("get", "http://127.0.0.1:8080?getInfo=MyGetInformation", true);  //建立请求
//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//post需增加
xhr.send();       //发起请求




//慕课网
//AJAX（异步的Javascript和XML），是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术
//使用了ajax技术的网页，通过在后台跟服务器进行少量的数据交换，网页就可以实现异步局部更新
//AJAX出现，变成了异步（表单），XMLHttpRequest对象是同步变成了异步（实现后台和服务器交换数据，在无需重新加载整个网页的情况下，能够更新部分网页）
var request=new XMLHttpRequest;//实例化一个XMLHttpRequest对象
//http是计算机通过网络进行通信的规则（不建立持久的连接，没有记忆，后续处理需要前面的信息，需重新建立连接）
/*HTTP请求
1.建立TCB连接 2.Web浏览器向Web服务器发送请求命令 3.Web浏览器发送请求头信息
4.Web服务器应答 5.Web服务器发送应答头信息 6.Web服务器向浏览器发送数据 7.Web服务器关闭TCP连接*/
//get请求一般用于信息的获取  post 一般用于修改服务器上的资源
//http请求 http响应
//http状态码  
//   2XX： 成功（200）  4XX：客户端错误   5XX：服务器错误
//XMLHttpRequest发送http请求
//open(发送方法，发送地址，async)    //发送方法：GET  POST  async （true异步（默认）  false（同步））
//send(发送内容)  //发送内容有无都可

//request.open('POST'.'get.php',true);//发送一个王二狗的表单
//request.setRequestHeader("content-type",'application/x-www-form-urlencoded');//设置http头信息 如果要写，必须在open和send之间
//request.send('name=王二狗&sex=男');
//XMLHttpRequest取得响应
///readyState属性  代表服务器相应的变化 
//0 ：请求未初始化  1：服务器连接已建立 open已经调用
//2：请求已接收到头信息 3：接收到响应主体  4：响应已完成  
/*
request.onreadyStatechange=function(){ //通过事件监听服务器响应
    if(request.readyState===4&&request.status===200){ //相应完成且请求成功
        做事
    }
}

var request=new XMLHttpRequest;
request.open('POST'.'get.php',true);
request.send();
request.onreadyStatechange=function(){ //通过事件监听服务器响应
    if(request.readyState===4&&request.status===200){ //相应完成且请求成功
        做事
    }
}
//php是一种创建动态交互站点的服务器端脚本语言
<body>
    <h1>员工编号</h1>
    <table>请输入员工编号：</table>
    <input type='test'id='no'><br/>
    <table>请输入员工姓名：</table>
    <input type='test'id='name'>
</body>
*/
