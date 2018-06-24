/*属性名的冲突问题，以及Symbol的提出 */
/*Symbol变量属于基本数据类型（不是对象）， Symbol前不能使用new命令*/
/* ES5里面对象的属性名都是字符串，
如果你需要使用一个别人提供的对象，你对这个对象有哪些属性也不是很清楚，
 但又想为这个对象新增一些属性，那么你新增的属性名就很可能和原来的属性名发送冲突*/
 var obj = {
    x:1,
    y:2,
    moveTo:function(x,y){
        this.x = x;
        this.y = y;
    }
}
obj.moveTo = function(x,y){
    console.log("方法被覆盖了");//添加相同名称的属性，属性会覆盖，ES6里就引入了Symbol，用它来产生一个独一无二的值。
};
obj.moveTo(0,0); //方法被覆盖了

let s=Symbol();
typeof s;  //"symbol"
s instanceof Object; //false

/*Symbol函数的参数只是表示Symbol值的描述， 相同参数的Symbol函数的返回值是不相等,无参数情况下也不相等*/
var s1 = Symbol("foo");
var s2 = Symbol("foo");
s1 === s2 // false          虽然symbol是基本数据类型，但具有独特性，唯一的

var s1=Symbol();
var s2=Symbol();
s1===s2;   //false     
//不能进行运算，只能进行字符串的类型转换
//Symbol值不能与其他类型的值进行运算，会报错。
var sym = Symbol('My symbol');
//"your symbol is " + sym;//报错
//但是，Symbol值可以显式转为字符串。
var sym = Symbol('My symbol');
String(sym); // 'Symbol(My symbol)'        String()和toString()都能将数据转换字符串
sym.toString(); // 'Symbol(My symbol)'    toString()将数据转换成字符串（除了null和undefined，会报错）

const obj = {
    toString() {     
        return 'abc';
    }
};
const sym = Symbol(obj);
sym // Symbol(abc)
//????、/、、?、/、/、//???、/、、？/
const obj = {
    a:1
};
const sym = Symbol(obj);  //Symbol([object Object])  默认调用对象的toString方法 Object.prototype上
sym; 
/*由于每一个Symbol值都是不相等的，这意味着Symbol值可以作为标识符，用于对象的属性
名，就能保证不会出现同名的属性。 这对于一个对象由多个模块构成的情况非常有用，能防
止某一个键被不小心改写或覆盖*/
//使用Symbol是用[]，而不是用点操作符
var mySymbol = Symbol();
// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';//注意中括号内不要加引号，后面介绍加引号和不加引号的区别
// 第二种写法
var a = {
    [mySymbol]: 'Hello!'
};
// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// 以上写法都得到同样结果
a[mySymbol] // "Hello!"

var aSymbol = Symbol("abc");
var obj = {
    [aSymbol]: 'Hello!'
};
Object.defineProperty(obj, Symbol("abc"), { value: 'World!' });
console.log(obj);//{Symbol(abc): "Hello!", Symbol(abc): "World!"}

var sym1=Symbol('xx');
var sym2=Symbol('xx');
var str1='xx';
var str2='xx';
var obj={};
obj[sym1]='12';
obj[sym2]='34';
obj[str1]='56';
obj[str2]='78'; //覆盖
obj;             //{xx: "78", Symbol(xx): "12", Symbol(xx): "34"}

/*区分使用点操作符和中括号操作符时，访问对象属性的不同， Symbol需使用[ ]，而不是点*/
//注意，Symbol值作为对象属性名时，不能用点运算符，使用中括号是注意使用引号和不用引号的区别
var mySymbol = Symbol();
var a = {};
a.mySymbol = 'Hello!';  
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
a; //{mySymbol: "Hello"}   a里面只有一个属性
a[mySymbol]=22;
a; //{mySymbol: "Hello!", Symbol(): 22}

var a={};
a.my=11;
a['my'];//11

var myS1 = Symbol("xx");
var myS2 = "xx";
var obj = {
    [myS1]:123,
    [myS2]:456
};
console.log(obj[myS1],obj[Symbol("xx")]);//123 undefined   独一无二的Symbol("xx")是一个新的
console.log(obj[myS2],obj["xx"]); //456 456 

var myS2 = "xx";
var obj = {
    myS2:456
};
console.log(obj['myS2']);//456

//在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中,如果不用[]的话相当于使用s对应的字符串定义属性
let s = Symbol();
let obj = {
    [s]: function (arg) {console.log("xx");}
};
obj[s]();//'xx'
/*Symbol作为属性名，该属性不会出现在for...in、 for...of循环中
也不会被Object.keys()、 Object.getOwnPropertyNames()返回，但它也不是私有属性
使用Object.getOwnPropertySymbols方法，可以获取指定对象的所有Symbol属性名*/
var obj = {};
var foo = Symbol("foo");
Object.defineProperty(obj, foo, {
    value: "foo bar",
});
for (var i in obj) {
    console.log(i); // 无输出
}
Object.getOwnPropertyNames(obj);// []
Object.getOwnPropertySymbols(obj);// [Symbol(foo)]   返回的是Symbol属性名,返回值是数组

var obj={};
var s1=Symbol();
var s2=Symbol();
obj[s1]=123;
obj[s2]=456;
obj['s1']=567;
obj.s2=789;
for(var k in obj){
    console.log(k,typeof k); //s1 string   s2 string
}
//Object.getOwnPropertySymbols(obj);//[Symbol(), Symbol()]
Object.getOwnPropertySymbols(obj).forEach(function(v){console.log(obj[v])});//123  456
//Object.getOwnPropertySymbols(obj).forEach((v)=>{console.log(obj[v])});
/*Symbol.for( )接受一个字符串作为参数，搜索有没有以该参数作为名称的Symbol值。 如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值 
如果你调用Symbol.for("cat")30次，每次都会返回同一个Symbol值，但是调用Symbol("cat")30次，会返回30个不同的Symbol值。
利用Symbol.for( )可以使用同一个Symbol值
 Symbol.keyFor( )方法返回一个已登记的Symbol类型值的key，字符串类型*/
var s1 = Symbol.for('foo'); //系统没有。创建
var s2 = Symbol.for('foo');  //系统有，返回原来
console.log(s1 === s2); // true
console.log(Symbol.for("bar") === Symbol.for("bar"));// true   第一次Symbol.for("bar")系统中没有，创建，第二次，系统中有，返回
console.log(Symbol("bar") === Symbol("bar"));// false
console.log(Symbol.for("bar") === Symbol("bar"));// false  Symbol.for("bar")系统中没有，创建  Symbol("bar")不论有没有，都要创建 两个不同
console.log(Symbol("bar") === Symbol.for("bar")); //false
//Symbol.keyFor方法返回一个已登记的Symbol类型值的key。
//什么是已登记？ Symbol.for('a' )的创建方式会在全局中寻找，有没有Symbol.for()的方式，（如果创建了就会在全局中登记），直接用已创建的（已登记的）
//而Symbol('a')的创建是不会检索全局的。（即不会登记）
var s1 = Symbol.for("foo");
console.log(Symbol.keyFor(s1)); // "foo"
var s2 = Symbol("foo");
console.log(Symbol.keyFor(s2)); // undefined

var s3 = Symbol(Symbol.keyFor(s1));
console.log(s1 === s3);  //false
console.log(s2 === s3);  //false
var s4 = Symbol.for(Symbol.keyFor(s1));
console.log(s1 === s4); //true
console.log(s2 === s4);  //false
/*ES6提供了新的数据结构Set
- 它类似于数组，但是成员的值都是唯一的，没有重复的值
- 用Set构造函数来生成Set对象，用法类似实例化数组对象，通过new实例化Set对象
- 通过add方法向Set结构加入成员， Set结构不会添加重复的值*/
var s1 = new Set([1,2,3,4,5,5,6,2,2]);
console.log(s1);  //Set(6) {1, 2, 3, 4, 5,6}

var s2 = new Set();
[2, 3, 5, 4, 5, 2, 2].map(x => s2.add(x));
console.log(s2); //Set(5) {2, 3, 4, 5, 6}
for (var i of s2) {
    console.log(i);
}// 2 3 5 4         通过add方法向Set结构加入成员， Set结构不会添加重复的值

//利用set的不可重复性，可用来数组去重
var set=new Set([1,2,3,3,4,4]); //去重
//console.log(set); //{1,2,3,4}
console.log([...set]); //[1,2,3,4]  散列

//区分基本类型和引用（对象）类型，两个对象总是不相等的，思考下述代码
var set = new Set();
set.add({});
console.log(set.size); // 1      length用于返回数组和字符串长度，size用于获取泛型集合的长度
set.add({});//指向不同的堆区空间
console.log(set.size); // 2

var set = new Set();
var a={};
var b=a;
set.add(a)
console.log(set.size); // 1
set.add(b);//指向相同的堆区空间
console.log(set.size); // 1

var s= new Set();
s.add(1).add(2).add(2);// 注意2被加入了两次
s.size // 2
s.has(1); // true
s.has(2); // true
s.has(3); // false
s.delete(2);
s.has(2); // false

//Array.from方法可以将Set结构转为数组。
var items = new Set([1, 2, 3, 4, 5]);
var array = Array.from(items); //(5) [1, 2, 3, 4, 5]
//...也可以将set转换成数组 散列
console.log([...(new Set([1, 2, 3, 4, 5]))]);//[1, 2, 3, 4, 5]
//如果不加[]就是散列的元素
console.log(...(new Set([1, 2, 3, 4, 5])));//1, 2, 3, 4, 5

var set = new Set();
set.__proto__===Set.prototype;

//关于Set的遍历方法
var set = new Set(['red', 'green', 'blue']);
for (var item of set.keys()) {      //或set或set.values()
    console.log(item);
}
// red
// green
// blue
for (var item of set.entries()) {
    console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
//使用解构赋值，将数据提取
for (var [key,value] of set.entries()) {
    console.log(key,value);
}    //red red      green green    blue blue

//Set结构的实例的forEach方法，用于对每个成员执行某种操作，没有返回值。
var set = new Set([1, 2, 3]);
set.forEach((value, key) => console.log(value * 2) );  //key有无都可
// 2
// 4
// 6

//数组的map和filter方法也可以间接用于Set了，通过...转成数组后调用后再生成set
var set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}
var set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}
