/*预解析*/
var obj1={
	x:12;
	foo:function(){
		console.log(this.x,y);
	}
}
var obj2={
	x:34;
}
obj1.foo.call(obj2,"xx"); //34 "xx"  这时this指针指向obj2
var fee=obj1.foo.bind(obj2);
fee();                    //调用主体为obj2
 
 foo();
 var foo=function(){
 	console.log("foo");
 }

console.log(foo);
var foo=function(){
console.log("foo");
};
foo();  // undefined  foo