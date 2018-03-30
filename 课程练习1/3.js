function foo(){}
console.log(foo); //function foo(){}
console.log(typeof foo); //function 如果变量是函数对象(函数）时，typeof此对象，返回function，而非object 
console.log(foo instanceof Object); //true JS中每个函数都是作为对象来维护和运行的 
console.log(foo instanceof Function); //true
/* 内置的函数对象Array、Function、Date，内置的非函数对象Math、JSON*/
console.log(typeof Function);//function
console.log(typeof Array);//function
console.log(typeof Date);//function
console.log(typeof Error); //function
console.log(typeof Math);//object
console.log(typeof JSON);//object
console.log(typeof new Function());//function
console.log(typeof new Array());//object	 
console.log(typeof new Date());	//object
console.log(Math instanceof Function);//false
console.log(JSON instanceof Function);//false
/*.....*/
var foo = function (a,b){
    console.log(arguments);//是一个数组类型对象，包含着传入函数中所有的参数
    console.log(arguments.length); //4  实际传入参数个数
    console.log(foo.length);  //2   形参个数
    var args = Array.prototype.splice.call(arguments,0);/*[1,2,3,4] 达到把传入的参数变成array的目的  
    prototype返回对象类型原型，splice(0,2)删除数组的前两项*/
    var args = Array.prototype.splice.call(arguments,1); //[2,3,4]
    var args = Array.prototype.splice.call(arguments,2); //[3,4]
    console.log(args);
};
foo(1,2,3,4);	

var obj = {
    foo1:function(){
        console.log(this.foo1.caller);
    },
    foo2:function abc(){
        this.foo1();
    }
};
obj.foo1();//null caller追踪被调用的外层函数，追踪调用foo1的函数，没有，返回null
obj.foo2();//ƒ abc(){this.foo1();}

function add(x, y, f) {
    return f(x) + f(y);
}
add(2,3,function(z){return z*z;}); //13 2*2+3*3
function add(x, y, f) {
    return f(x) + f(y);
}
add(2,-3,Math.abs);//5 绝对值

function foo(x,y,c1,c2){
	return 2*c1(x)-4*c2(y);
}
function f1(x){
	return x+1;
}
function f3(x){
	return x*x;
}
foo(1,1,f1,f3);//0  2*（1+1）-4*1*1

var x=12;
var obj = {
    x:34,
    fun2:function(){
        console.log(this.x,this);
    }
};
var fun1 = function () {
    return function fun2() {
        return this.x;//若改为 return this;
    }
};
obj.fun3 = fun1;
obj.fun4 = fun1();
console.log("输出：",obj.fun3());//相当于fun1()   ƒ fun2() {return this.x;}
console.log("输出：",obj.fun3()());//12
console.log("输出：",obj.fun4());//34