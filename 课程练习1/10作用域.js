var a = 10,
    b = 20;
function fn() {
    var a = 100,
    c = 200;//变量c只能在fn和bar作用域内被访问到
    function bar() {//在bar中访问c时为200 （链式关系）
        var a = 500,//在bar中访问a时为500（覆盖关系）
            d = 600;
        console.log(a,b,c,d); //500 20 200 600
    }
    bar();
    //console.log(a,b,c,d); //d is not defined
}
fn();
var a = 10,
    b = 20;
function fn() {
    var a = 100,
    c = 200;
    function bar() {
        var a = 500;
            d = 600; //全局作用域 
    }
    bar();
    console.log(a,b,c,d); //100 20 200 600 此时的d是全局作用域
}
fn();
/* 词法作用域不会被函数从哪里调用等因素影响，与调用形式无关（体现了静态性）*/
var name = "Jack";
function echo() {
    console.log(name);
}
function foo() {
    var name = "Bill";
    function fee(){
        var name = "Lucy";
        echo();
    }
    fee();
}
foo();//Jack


//通过new Function实例化的函数对象，不一定遵从静态词法作用域
var scope = "g";
function foo(){
    var scope = "l";
    return new Function("console.log(scope);")
}
foo()(); //g

var scope = "g";
function foo(){
    var scope = "l";
    return function{console.log(scope);}
}
foo()(); //l 遵循静态词法作用域
