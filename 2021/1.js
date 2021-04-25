//1. 箭头函数
var b = x => {
    x
}
console.log(b(1)); // undefined

var c = x => ({
    x
})
console.log(c(1));  // {x: 1}

//2. let

