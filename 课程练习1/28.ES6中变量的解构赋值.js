
/*ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构赋值
 这种写法属于“ 模式匹配” ，只要等号两边的模式相同，左边的变量就会被赋予对应的值*/
 //不用解构赋值方式定义变量
var a = 1;var b = 2;var c = 3;
console.log(a,b,c);
/*数组的解构赋值 var支持解构赋值，let也支持解构赋值*/
let[a,b,[c],d]=[2,3,[true],'ab'];
console.log(a,b,c,d);

var [a, b, c] = [1, 2, 3];
console.log(a,b,c);

let [foo,[[bar],baz]] = [1,[[2],3]];
console.log(foo,bar,baz);//只要等号两边的模式相同，就会赋值成功 1 2 3

let [x, , y] = [1, 2, 3];
console.log(x,y);//1 3

let [head,tail]=[1,2,3,4];
console.log(head,tail);//1 2  不完全解构情况

let [a2, [b2], d2] = [1, [2, 3], 4];
console.log(a2, b2, d2); // 1 2 4  不完全解构情况
let [head, ...tail] = [1, 2, 3, 4];
console.log(head,tail);//1 [2, 3, 4]

let [d,...f] = ['a'];
console.log(d,f);  //a []

let [d,f] = ['a'];
console.log(d,f);  //a undefined

let [d, e, ...f] = ['a'];
console.log(d,e,f);//"a" undefined []

//如果变量的值解构不成功，值为undefined     如果是...变量名 的形式，解构不成功，值为[]
var [foo2]=[];
var [bar2,fee2]=[1];
console.log(foo2,fee2); //undefined  undefined

var [a,b]=[1,2];
等效于
var a=1,b=2;

var a=[1],b=['2'];
[a,b]=[b,a];//将ab的值互换

//解构赋值中的默认值（解构赋值中的变量允许有默认值）
var [foo3 = true] = [];//foo3 为 true
[x3, y3 = 'b'] = ['a']; // x3='a', y3='b'
[x4, y4 = 'b'] = ['a',undefined]; // x4='a'y4='b   
[x4, y4 = 'b'] = ['a',null]; // x4='a'y4=null   null===undefined  为false 如果不是和undefined严格等的话，使用这个值，不使用默认值

//默认值可以引用解构赋值的其他变量，但该变量必须已经声明
let [m1 = 1, n1 = m1] = []; // m1=1; n1=1
let [m2 = 1, n2 = m2] = [2]; // m2=2; n2=2    
let [m3 = 1, n3 = m3] = [1, 2]; // m3=1; n3=2
//let [m4 = n4, n4 = 1] = []; // ReferenceError 在n4声明之前使用
var [m4 = n4, n4 = 1] = []; // 相当于var m4,n4;  m4=n4; n4=1;   // undefined  1
console.log(m1,n1,m2,n2,m3,n3);

let a = [];
let b=[2,3,4];
[a[0],a[1],a[2]] = b; //只要模式能匹配，就可以赋值
console.log(a);//[2,3,4]
console.log(a == b);//false 指向不同的数组 但是数组的值相同

let a = [];
let b=[2,3,4];
a = b;
console.log(a == b); //true

//将b中奇数赋值给a
var a=[];
var b=[1,2,3,4,5];
[a[0],,a[1],,a[2]]=b;//[a[0],a[1],a[2]]=[b[0],b[2],b[4]];
console.log(a);

/*对象解构赋值*/
// 对象的属性没有次序，变量必须与属性同名，才能取到正确的值
//对象的解构赋值是内部机制，是先找到同名属性，然后再赋值给对应的变量，真正被赋值的是后者，而不是前者，例如：var {foo:baz}={foo:'aaa',bar:'bbb'};
//foo是匹配模式，baz才是变量，真正赋值的是变量baz，而不是模式foo
var { foo1, bar1 } = { foo1: "aaa", bar1: "bbb" };//相当于var { foo1:foo1, bar1:bar1 } = { foo1: "aaa", bar1: "bbb" }; 'aaa'实际就是赋值给键值
console.log(foo1,bar1);

var { bar2, foo2 } = { foo2: "ccc", bar2: "ddd" };//顺序不同，没关系
console.log(foo2,bar2);//ccc  ddd

//左侧为键值对时,注意键值对赋值时的对应关系
var { foo4: baz4 } = { foo4: 'aaa', bar4: 'bbb' };
console.log(baz4);// "aaa"


let obj1 = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj1; //hello赋值给f  world赋值给l
console.log(f,l);//注意和下边写法的区别
let { first, last } = obj1;  //简写形式 实际let { first:first, last:last } = obj1;
console.log(first,last);

//和数组一样，解构也可以用于嵌套结构的对象,如果是键值对的情况，键只用于匹配，真正赋给的是对应的值
var obj2 = {
    p: [
        'Hello',
        { y: 'World' }
    ]
};
var { p: [x, { y }] } = obj2;
console.log(x); // "Hello"
console.log(y); // "World //若上边改为var { p: [x, { y:z }] } = obj2; 报错，y is not defined  ，实际上就是将z赋值给world
console.log(p);//报错 p is not defined    p:[] 有值 没有默认的p

var obj2 = {
    p: [
        'Hello',
        { y: 'World' }
    ]
};
var { p } = obj2;//var { p:p } = obj2;
console.log(p); //["Hello", {y:'World'}]
/*
var node = {
    loc: {
        start: {
            line: 1,
            column: 5
        }
    }
};
var { loc: { start: { line }} } = node;
line // 1
//loc // error: loc is undefined
//start // error: start is undefined
//上面代码中，只有line是变量，loc和start都是模式，不会被赋值。*/

//对象的解构也可以指定默认值
var {x4:y4 = 3} = {};
console.log(y4); // 3

//解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
let {toString: s1} = 123;
console.log(s1); //
//s1 === Number.prototype.toString // true
(1,2,3).toString();
