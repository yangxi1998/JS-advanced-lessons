//ES6中提供了新的语法规则来描述函数（箭头函数=>） 
//箭头函数语法简单地描述为：参数 => 函数体 或 （参数） => { 函数体 } 
//优点：可减少冗余的代码（如function关键字等）节省空间，避免this指向错误 

/*ES5写法*/
var max=function(a,b){
    return a>b?a:b;
}
max(2,3);
/*ES6*/
var max=(a,b)=>a>b?a:b;
max(2,3);

var f=v=>v+1;  //或var f=(v)=>v+1; //单参数可以不用（），无参数或多参数必须加（），单语句可以不用return关键字
f(2);

var f=(v)=>{return v+1;}; //涉及大括号时，必须加return，否则返回undefined，没有大括号，默认为直接返回

var f=()=>5; //没有参数和有多个参数的情况下，需要使用小括号来表示参数
f();

var foo=(num1,num2)=>{            //如果有多条语句则需要有大括号表示函数体
  if(num1>num2){return num1*2;}
  else{return num2*2;}
};
foo(2,3);

//箭头函数可以与变量解构结合使用
const full=({first,last})=>last+''+first;
full({first:'yixing',last:'zhang'});
// 等同于
function full({ first, last }) {
  return last + ' ' + first;
}
full({first:"yixing",last:"zhang"});
//函数内的 this是与函数定义时所在的对象绑定，而不是使用时所在的对象（避免this缺陷） 
// 大括号被解释为代码块，所以如果箭头函数直接返回一个对象，需在对象外面加上括号
var Temp=it=>{id:it,name:2}; //大括号默认为语句，如果想返回对象,最外层加（）
var Temp=it=>({id:it,name:2}); 
Temp(1);

//ES6中 箭头函数中this是与函数定义时所在的对象绑定，而不是使用时所在的对象（避免this缺陷）
//箭头函数导致this总是指向函数定义生效时所在的对象
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        //内部嵌套函数
        var moveToX = ()=>this.x=x;  //this指向的是point
        //内部嵌套函数
        var moveToY = ()=>this.y=y;
        moveToX();
        moveToY();
    }
};
point.moveTo(2,2);
console.log(point);  //{x: 2, y: 2, moveTo: ƒ}
//console.log(window.x,window.y); //undefined undefined

function foo() {
    setTimeout(function(){
        console.log('id:', this.id); //this指向window
    }, 100);
}
var id = 21;
foo.call({ id: 42 });// id: 21    //foo绑定了{ id: 42 }对象，但this指向的是window，不会改变id的值

function foo() {
    setTimeout(() => {
        console.log('id:', this.id);//this指向foo对象
    }, 100);
}
var id = 21;
foo.call({ id: 42 });// id: 42 // //foo绑定了{ id: 42 }对象，this指向的是foo，会改变id的值
///////////////////////////////////////////////////////////////////////
//其实箭头函数里面没有自己的this，而是引用外层的this
//由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向，call可以接受任何类型的参数，apply只能接收数组参数
//不论怎么绑定，指向最外层对象
function foo() {
    return () => {
        return () => {
            return () => {
                console.log('id:', this.id); 
            };
        };
    };
}
var f = foo.call({id: 1});
var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1

//Rest将散列的参数放到一个数组里
//...Rest 相当于合并若干参数为一个数组，主要用于函数定义时，代替 arguments，组解决arguments的弊端
function f(...y){
    console.log(y);
}
f("a","b","c");//输出 ["a","b","c"]

function a(x,y){
    console.log(x,y);
}
var arr=[1,2];
a.apply({},arr);
a.call({},arr[0],arr[1]);// 等效于a.call({},...arr);

function test() {
    console.log(arguments);//arguments类数组对象
}
test("a","b","c");
function test() {
    console.log(Array.from(arguments);//arguments类数组对象
}
test("a","b","c");
function test() {
    console.log(...arguments);//arguments类数组对象
}
test("a","b","c");
