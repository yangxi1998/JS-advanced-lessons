/*事件*/
//html
  /*  <div id="div1" onclick="div1click()">
    </div>
    <div id="div2">
    </div>*/
 //js
 window.onload = function () {  //window.onload 必须等页面内包括图片的所有元素加载完毕后才执行
    console.log("window onload");
    var div2 = document.getElementById("div2");
    div2.onclick = function () {
        console.log("div2 click");
    }
    div2.onmouseover = function () {      //如果将div2放在window.onload外面，那么document.getElementById("div2")，那么div2无法获取，
                       //因为当执行这段代码的时候，div还没有加载（此时script标签在div标签前面），去过script标签在div标签之后，也可以不用window.onload
        console.log("div2 mouseover");   
     }
}
function div1click() {
    console.log("div1 click");
    console.log("this:", this);//此时this指向的是window
}
/*事件对象*/

window.onload = function (e) {
     console.log("window onload");
    console.log("e:", e);  //e：Event
    console.log(e.target);//#document
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var eventHandler = function (e) {
        // 测试0
        console.log(e.type);    //click
        console.log(e.target);//<div id="div1" onclick="div1click()"></div>  或<div id="div2"></div>
        // 测试1
         console.log(e.clientX,e.clientY); //鼠标的xy坐标
         console.log(this, "-----", e.target.id);//<div id="div1" onclick="div1click()"></div> "------" "div1"
                                   //或<div id="div2"></div> "-----" "div2"

        // 事件对象
        console.log(e);//MouseEvent {isTrusted: true, screenX: 149, screenY: 218, clientX: 149, clientY: 152, …}
        console.log(e.__proto__);
        console.log(e.__proto__.__proto__);
         console.log(e.__proto__.__proto__.__proto__);
        console.log(e.__proto__.__proto__.__proto__.__proto__);

        // 将事件对象一一展开
         for(var k in e){
            console.log(k,e[k]);
         }
         for(var k in e.__proto__){
             console.log(k);
         }
         for(var k in e.__proto__.__proto__){
             console.log(k);
         }
         for(var k in e.__proto__.__proto__.__proto__){
             console.log(k);
         }
    }
    div1.onclick = eventHandler;
    div2.onclick = eventHandler;
/*事件处理方式*/
//HTML事件响应处理 
window.onload=function(){
	console.log(e.target);
	var div1=document.getElementById('div1');
	div1.onclick=function(){
		console.log(e.clientX,e.clientY,e.ctrlkey);  
		console.log(e);  //包含鼠标点击过程中所有信息
		console.log(e.target,this);
	}

 console.log(e);
 console.log(e.__proto__);
 console.log(e.__proto__.__proto__);
  console.log(e.__proto__.__proto__.__proto__);
 console.log(e.__proto__.__proto__.__proto__.__proto__);
}
//测试2 DOM0级事件处理

window.onload = function (e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var eventHandler = function (e) {
        console.log(e.clientX,e.clientY);
    }
    div1.onclick = eventHandler;
    div1.onclick = function(){
        console.log("xx");   //第二个onclick事件会将第一个事件覆盖
    };//思考：是覆盖还是两个语句都会输出？
    div2.onclick = eventHandler;
    //div2.onclick = null;//取消事件响应



//测试3 DOM2级事件处理
window.onload = function (e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var eventHandler = function (e) {
        console.log(e.clientX,e.clientY);
    }
    div1.addEventListener("click",eventHandler); //第一个参数click 点击事件（不能写成onclick）    
    // div1.addEventListener("click",eventHandler,false);//第3个参数可选
     //div2.removeEventListener("click",eventHandler);//取消事件响应处理
    div1.addEventListener("click",function(){
        console.log("xx");
    });
    //addEventListener在谁身上定义
    //addEventListener、removeEventListener、dispatchEvent这3个方法都是定义在哪个原型上的？
    // console.log(div2.__proto__);
    // console.log(div2.__proto__.__proto__);
    // console.log(div2.__proto__.__proto__.__proto__);
    // console.log(div2.__proto__.__proto__.__proto__.__proto__);
    // console.log(div2.__proto__.__proto__.__proto__.__proto__);
    // console.log(div2.__proto__.__proto__.__proto__.__proto__.__proto__);

//慕课网
事件流描述的是从页面中接受事件的顺序
IE  事件冒泡：事件最开始由具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播至最不具体的
    那个节点（文档）
    <body>
       <div>
        <input type='button'>
       </div>
    </body>     //在点击页面按钮的时候，也点击了包含按钮的容器div，逐个递推也点击了body HTML，然后document
事件捕获： 不太具体的节点应该更早接收到事件，而最具体的节点最后接收到事件
HTML事件处理程序：直接把事件加在HTML结构的元素上
/*  <body>
       <div>
        <input type='button' onclick='show()'>
       </div>
        <script>
            function show(){
            	alert('hello');
            }
         </scipt>
    </body>*/
  缺点：HTML和JS代码紧密耦合在一起(当修改函数show（）的时候得修改HTML代码和JS代码)
DOM0级事件处理程序：把一个函数赋值给一个事件的处理程序属性
           （先把元素取出来，让事件以这个元素对象属性的形式出现）
             不存在耦合的缺点，修改时直接在js中修改
    /*  <body>
       <div>
        <input type='button' id='btn'>
       </div>
        <script>
            var btn=document.getElementById('btn');
            btn.onclick=function(){
	           alert('hello');
            }
            btn.onclick=null;//删除事件
         </scipt>
    </body>*/
DOM2级事件处理程序：e
      DOM2级事件定义了两个方法：用于处理指定和删除事件处理程序的操作 addEventListener()和removeEventListener()
      每个节点都有addEventListener()和removeEventListener()，均接受三个参数：要处理的事件名、函数，布尔值（true表示在捕获阶段调用事件处理程序，false在冒泡，一般是false）
      addEventListener()和removeEventListener() 添加时用几个参数，删除时也应用几个参数
      DOM0级事件和DOM2级事件可以添加多个事件处理程序，会按照添加顺序执行
   /*  <body>
       <div>
        <input type='button' id='btn2' value='按钮'>
       </div>
        <script>
        	function show(){
            	alert('hello');
            }
            var btn2=document.getElementById('btn2');
            btn2.addEventListener('click,show,false');
            btn2.addEventListener('click,function(){alert(this.value);},false);//先执行show事件再执行function事件
            btn2.removeEventListener('click,show,false');//通过addEventListener()添加，只能用removeEventListener()删除
         </scipt>
    </body>*/   
DOM中的事件对象
   type属性 用于获取事件类型 click
   target属性 用于获取事件目标
阻止事件冒泡 点按钮时，不想再执行div里面的程序 stopPropagation()
阻止事件默认行为 preventDefault()   //慕课网 3-1
