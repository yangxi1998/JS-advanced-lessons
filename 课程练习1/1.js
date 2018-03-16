var obj1={"key":2};//obj1存储在栈区，key:2存储在堆区
var obj2=obj1;//obj2和obj1共同指向堆区key：2
obj2.key=3; //修改obj2指向的堆区，则obj1一同指向的也被修改
console.log(obj1.key); //3
obj2={"key":4};//在栈区新开辟的空间，指向一个新的堆区空间
console.log(obj1.key); //3
/*...*/
var str="Hello World"; //str: Hello World存在栈区中
var obj={value:"Hello World"};//obj存在栈区中，value:"Hello World"存在堆区中
/*...*/
var obj1={v:"a"};
var obj2=obj1;
obj2.v="b"; //通过obj2修改堆内存的变量，堆内存的值为v：b  此时obj1和obj2均指向它
console.log(obj1,obj2);
/*...*/
var c=[1,2];
var d=[1,2];
console.log(c===d);//引用堆区的空间不同false
console.log(c==d);//引用堆区的空间不同false
d=c;
console.log(c===d);//引用堆区空间相同 true
/*...*/
var a=123;
var b=new Number(123);
console.log(a===b);
console.log(a==b);//隐式类型转换，对象类型转换成基本数据类型
//结果 false true
/*...*/
var a =123;
function foo1(x){
	x = 345;
}
foo1(a);
console.log(a);
//结果 123
var a ={y:123};
function foo2(x){
	x.y = 345;
}
foo2(a);       //通过a修改堆内存的变量
console.log(a.y);
/*...*/
var a3 = new Number(200);
var b3 = a3;
console.log(a3 == b3);
console.log(a3 === b3);  //b2 a3指向同一块堆区空间
//结果  true  true
/*...*/
var a5 = {x:1,y:2};
var b5 = {x:1,y:2};
console.log(a5 === b5); //a5 b5指向不同的堆区空间
console.log(a5.x === b5.x);//基本类型，比较时值比较
//结果 false  true
/*...*/
console.log(parseInt === window.parseInt);
console.log(parseFloat === window.parseFloat);//parseInt parseFloat均为window全局对象方法
//结果 true true
/*...*/
var a2 = 23.4;
console.log(Math.ceil(a2)); //24  向上取整
console.log(Math.floor(a2));// 23  向下取整
console.log(Math.round(a2));// 23  四舍五入
a3 = 5e2;
console.log(a3);  //500
console.log(typeof Math); //object
/*...*/
var x = Number("xis021");
console.log(x);//NaN
isNaN(x);//true
typeof NaN;//number
/*...*/
var y1 = 2/0;
console.log(y1);//Infinity  无穷大
var y2 = -2/0;
console.log(y2);//-Infinity  负无穷大
isFinite(y2);  //false  是不是有限的
isFinite(23); //true
/*...*/
var z1 = 1/Infinity;
console.log(z1);//0
var z2 = -1/Infinity;
console.log(zinstance2);//-0
/*...*/
console.log("abc\ndefghi\\\n\'mn\'");
/*abc
  defghi\
  'mn'*/
var str = "abc_def_ghi_jkl_mn";
str.split("_");//["abc", "def", "ghi", "jkl", "mn"]
str.split("_",2);// ["abc", "def"]
str.concat("_opq");//"abc_def_ghi_jkl_mn_opq"
str.substr(4,7);//"def_ghi"
str.substring(4,7);//"def"
str.slice(2);//"c_def_ghi_jkl_mn"
str.slice(2,5);//"c_d"
str.slice(-2);//"mn"
str.slice(2,-2);//"c_def_ghi_jkl_"
/* ...*/
function foo(){}
foo instanceOf Object;  //true 在js中函数也是一个对象
/* ...*/
var str="abcdef";
str.length=1; //基本数据类型装箱和拆箱操作
console.log(str,str.length); // abcdef 6 临时对象已经释放

var arr=[1,2,3,4,5];
arr.length=1;
console.log(arr,arr.length);//[1] 1







