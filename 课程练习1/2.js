console.log(false||("2" == 2)); //true
//短路原则
console.log(2&&4);// 4   && 左操作数为true，直接返回右操作数
console.log(0&&4);// 0   && 左操作数为false，直接返回左操作数
console.log(null&&"hello");//null
console.log({}&&"world");//world
console.log(2||4); // 2  || 左操作数为true，直接返回左操作数
console.log(0||4);//  4  || 左操作数为false，直接返回右操作数
console.log(null||"hello"); //hello
console.log({}||"world");   //{}
console.log((new Boolean(false))&&234);//234
console.log((new Boolean(false))||234);//Boolean{false}  所有对象转化成布尔类型都为true
//使用&&和||实现条件语句
var score = 76;
console.log((score>90&&"优")||(score>75&&"良")||(score>60&&"及格")||"不及格");//良
var score = 6
console.log((score>90&&"优")||(score>75&&"良")||(score>60&&"及格")||"不及格");//不及格
//调用时若未传参数则该参数的值取它定义时的默认值 未传实参，形参初始值为undefined，转化成布尔类型为false
var sum = function(a,b,c){
    b = b||4;
    c = c||5;
    return a+b+c;
};
console.log(sum(1,2,3));  //6   1+2+3 
console.log(sum(1,2)); // 8  1+2+5
console.log(sum(1));  //10  1+4+5
console.log(sum(1,0,0)); //10   1+4+5   与预期结果不符
//增加判断，确保实参转换为布尔类型时为true   
var sum = function(a,b,c){
    if(b!=false){b = b||4;}//(b!=false)&&(b=b||4);
    if(c!=false){c = c||5;}//(c!=false)&&(c=c||5);
    return a+b+c;
};
console.log(sum(1,2,3));//6   1+2+3
console.log(sum(1,2));//8  1+2+5   undefined!=false  true
console.log(sum(1)); //10  1+4+5    0!=false      false
console.log(sum(1,0,0));//1 
/*函数*/
// 通过Function构造函数实例化的形式来定义  动态，以字符串形式传递函数体，能通过构造函数实例化对象
var max = new Function("a","b","return a>b?a:b");
max(2,3);  //3               
//通过函数声明的形式来定义（要有函数名） 
function max(a,b){
    return a>b?a:b;
}
max(2,3);//3
//函数表达式方式
var max = function (a,b){
    return a>b?a:b;
};
max(2,3);   //3

Function instanceof Function  //true
Function instanceof Object  //true  必须是大写
function foo(){
	console.log("foo");
	foo===window.foo;
}                          //undefined
function foo(){
	console.log("foo");
	
} 
foo===window.foo;           //true
/*....*/
var x=45;
var test=function(){
	console.log(this.x);
}
var obj={x:23};
obj.test=test   //obj添加方法
obj.test();   //23
test();      //45
/*...*/
var x=45;
var obj={x:23,
  test:function(){
  	function foo(){
  		console.log(this.x); //嵌套函数中this调用主体为window
  	}
  	foo();
  }};
  obj.test(); //45


