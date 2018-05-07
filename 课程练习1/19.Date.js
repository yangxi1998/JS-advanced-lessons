//数组静态方法  Array.from(...) 、Array.isArray(...) 、Array.of(...)
const bar = ["a", "b", "c"];   // Array.from(...)可以将类数组对象或可迭代对象转化成真正的数组，就是将传入的参数返回成数组
Array.from(bar);// ["a", "b", "c"]
Array.from('foo');// ["f", "o", "o"]
//Array.of(...)就是将传入的参数返回成数组，of（）参数类型以及固定长度不限制
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]
Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]

var arr1 = [1,3,4];
console.log(Array.isArray(arr1)); //true
//数组原型方法   Array.prototype.shift() 
var arr1=[2,5,8];
arr1.forEach(function(a){
	console.log(a,this);//this指的是window
});
var arr1=[2,5,8];
var arr2=[1,6,7];
arr1.forEach(function(a){
	console.log(a,this);//this指的是arr2
},arr2);
var arr1=[2,5,8];
var arr2=[1,6,7];
arr1.forEach(function(a,i){                 //forEach第二个参数是this对象，回调函数中的i表示索引
	console.log(a,i,this);//this指的是arr2
},arr2); 


var arr1=[2,5,8];
var arr2=[1,6,7];
var arr3=[];
arr1.forEach(function(a,i){
	arr3[i]=a>arr2[i]?a:arr2[i];
},arr2);
console.log(arr3); 

function printArgs(prev,cur,i) {
    console.log("prev",prev,",cur:",cur,",i:",i);
    return prev+cur;
}
var arr4 = ["a","b","c","d"];
console.log(arr4.reduce(printArgs));
console.log(arr4.reduce(printArgs,"x"));//从x开始迭代操作

/*通过构造函数创建Date对象的4种形式 */
//1.new Date(year,month,date?,hours?,minutes?,seconds?,milliseconds?)  //注意起始索引,date?,hours?,minutes?,seconds?,milliseconds可选项 
var a = new Date(2018,4);
console.log(a);//Tue May 01 2018 00:00:00 GMT+0800 (中国标准时间)

var date1 = new Date(2017,9,18,12,34,1);//10月 索引从0开始
console.log(date1);//Wed Oct 18 2017 12:34:01 GMT+0800 (中国标准时间)

var date2 = new Date(17,9,18,12,34,1);//若years为2位的话自动加1900
console.log(date2);//Thu Oct 18 1917 12:34:01 GMT+0800 (中国标准时间) 

//2.new Date(dateTimeStr)  //参数为字符串类型，注意格式，参见日期格式章节 
var date3 = new Date("2017-08-09");//此处的08代表8月
console.log(date3);//Wed Aug 09 2017 08:00:00 GMT+0800 (中国标准时间)  （时间00:00:00,但因为中国在东八区，差8个小时）

//3.new Date(timeValue)  //参数为数字类型，以毫秒为单位 
var date4 = new Date(0);    // 1970-01-01:00:00:00
var date4 = new Date(1000); //1970-01-01:00:00:01
console.log(date4);//逆运算是date4.getTime();

//4.new Date( ) //返回当前时间
var date5 = new Date();//相当于var date5=new Date(Date.now());
console.log(date5);

//无效日期
var date6 = new Date(NaN);
console.log(date6);//Invalid Date（无效的日期） 不是构造无效，是创建成功后是无效日期
date6 instanceof Date;//true
date6 instanceof Object;//true

var d1 = new Date();
var d2 = Date();
console.log(d1);//Mon May 07 2018 17:57:01 GMT+0800 (中国标准时间)
console.log(d2);//Mon May 07 2018 17:57:01 GMT+0800 (中国标准时间)
typeof d1;//"object"
typeof d2;//"string"

var n1 = new Number("123");
var n2 = Number("123");
console.log(n1,typeof n1);//Number {123} "object"
console.log(n2,typeof n2);//123 "number"

/* Date方法（静态方法、原型方法）*/
/*静态方法 Date.now( ) Date.parse(dateTimeString) Date.UTC(year,month,date?,hours?,minutes?,seconds?,milliseconds?) */
console.log(Date.now());//  以毫秒为单位返回当前时间（从1970年1月1日00:00:00开始计算） 
console.log((new Date()).getTime());//原型方法，创建新对象，返回当前时间  也是以毫秒为单位返回时间
console.log(Date.UTC(2018,5,7));//标准时间  将给定的日期转换成毫秒  从1970年1月1日 00:00:00开始计算

console.log(Date.parse("1970-01-01"));//0   dateTimeString字符串转换成毫秒，从1970年1月1日 00:00:00开始计算 
console.log(Date.parse("1970-01-02"));

console.log(Date.parse("2018-05-07"));//输出结果一样
console.log(Date.UTC(2018,4,7)); //输出结果一样
console.log((new Date()).getTime());//输出结果与前面两个不同，结果再加现在时间-8小时
/*原型方法*/
//计算7月的今天是星期几
var today=new Date();
today.setMonth(6);//索引从0开始  7月份
console.log(today.getDay()); //6     7月7号是星期六

var d = new Date("1978-11-25");
console.log(d.getFullYear(),d.getMonth(),d.getDay(),d.getDate(),d.getHours());//1978 10 6 25 8  getMonth()是索引值   从1970-01-01:00:00:00开始计算，中国在东八区，差8个小时
console.log(d.getTimezoneOffset());//-480  返回格林时间和本地时间之差，以分钟为单位
d.setDate(11);
console.log(d.getFullYear(),d.getMonth(),d.getDay(),d.getDate(),d.getHours());//1978 10 6 11 8
d.setFullYear(1999,5,3);
console.log(d.getFullYear(),d.getMonth(),d.getDay(),d.getDate(),d.getHours());//1999 5 4 3 8

var d = new Date(2012,3,21,15,7,23,234);
console.log(d.toTimeString(),"___",d.toLocaleTimeString());//15:07:23 GMT+0800 (中国标准时间) ___ 下午3:07:23
console.log(d.toDateString(),"___",d.toLocaleDateString());//Sat Apr 21 2012 ___ 2012/4/21
//getDay()返回的是星期几 toLocalString( )  获取当前日期时间
console.log(new Date("1970-01-02") > new Date("1970-01-01"));//true 隐式类型转换，转换成标准的毫秒值
console.log(new Date("1970-01-02") - new Date("1970-01-01"));//86400000

/*时间综合练习 输出50天后是几月几号，星期几？*/
var today=new Date();
//today.getTime();//今天的毫秒数
//today+1000*3600*24;   //先算1天后 毫秒
var newDate=new Date(today.getTime()+1000*3600*24*50);
console.log(newDate);
