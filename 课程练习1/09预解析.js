console.log(a);//undefined
var a = 2;
console.log(a);//1

//上边代码等价如下 解析器角度看到的代码
var a;
console.log(a);
a = 2;
console.log(a);
/*预解析：由解析器边解析边执行，解析和执行是不断交替的
全局预解析（全局变量和函数声明前置）
在函数调用时，在执行函数内代码前，进行函数范围内的预解析
函数嵌套时，进行多次函数预解析
预解析主要工作：变量声明和函数声明提升*/
//变量声明提升
console.log(a,b);//undefined undefined  就是在此句之前加var b; var a;
var b = 23;  
console.log(a,b);//undefined  23
var a = b;
console.log(a,b);//23 23

//变量声明提升
console.log(obj1,obj2);//undefined undefined
var obj1 = {x:23};
console.log(obj1,obj2);//{x:23} undefiend
var obj2 = obj1;
console.log(obj1,obj2);//{x:23} {x:23}
obj2.x =25;
console.log(obj1,obj2); //{x:25} {x:25}  obj1和obj2指向相同的堆区空间

//函数声明提升
foo();
function foo(){
    console.log("1");
}
function foo(){
    console.log("2"); //2   只会输出一个2，函数及变量声明重复的话，相当于覆盖
}

//上边代码等价如下 解析器眼角度看到的代码
function foo(){
    console.log("1");
}
function foo(){
    console.log("2");
}
foo();

foo();
var foo = function(){
    console.log("foo");// 报错
};     
//此代码相当于
var foo;
foo();//报错   foo is not a function
foo=function(){
	console.log("foo");
};               

console.log(foo);//undefined  相当于在此句之前加上var foo;
var foo = function(){
    console.log("foo"); //foo
};
foo();
/*同时有var和function关键字时（变量名同函数名）*/
AA();
function AA(){
    console.log("AA_1");
}
var AA = function AA(){
    console.log("AA_2");
};
AA();

//上边代码等价如下
function AA(){      //AA已经声明
    console.log("AA_1");
}
var AA;//在最顶端和在这等效，AA在上面已经声明了，不会进行二次声明，这一行无效
AA();
AA = function AA(){
    console.log("AA_2");
};
AA();

//摘自网上 静态词法作用域关心函数在何处声明，作用域链基于作用域嵌套
//静态作用域查找的是距离当前作用域最近的外层作用域中同名标识符的声明，动态作用域是查找最近的活动记录
var name = "Jack";
function echo() {
    console.log(name);
}
function foo() {
    var name = "Bill";
    echo();
}
foo();// 摘自网上 Jack 因为name函数是在全局声明的，所以输出全局变量a的值

var x = "outside f1";
var f1 = function () {
    var x = "inside f1";//如果没有这行，则两次输出都为outside
    console.log(x); //inside
};
f1();
console.log(x);//outside

/*若函数内未加var 则相当于创建了全局变量*/
var f2 = function () {
    y = "全局";  //var y="局部"；
    console.log(y);
};
f2();
console.log(y);//若函数内有var此行报错，若函数内没有var则此行输出全局变量y值
/*ES5无块级作用域，可以使用函数立即执行表达式来模拟块级作用域*/
if(true){
    var z = 23;
}
console.log(z);//正常输出

if(true){
    (function () { 
        var z = 23;
    }());           
}
console.log(z); //报错，函数立即执行表达式相当于块级作用域，作用域外面不可访问变量。

/*声明前置与全局作用域，函数作用域的关系*/
if(true){
    var i = 0;
}
function foo(){
    console.log(j);//undefined
    var j = 10;
    console.log(j);//10
}
foo();
console.log(i);//0
console.log(j);//报错

//上边代码等价于
var i;
if(true){
    i = 0;
}
function foo(){
    var j;
    console.log(j);//undefined
    j = 10;
    console.log(j);//10
}
foo();
console.log(i);//0
console.log(j);//报错