const reg = /a(?=b)/g
const reg2 = /a(?!b)/g
const reg3 = /a(?:b)/g
const string = "abcdddabddcbcbabac"

console.log(string.match(reg))  //[ 'a', 'a', 'a' ] 匹配b前面的a(结果不包含b)
console.log(string.match(reg2))  // ['a']           匹配不是b前面的a 
console.log(string.match(reg3))  // [ 'ab', 'ab', 'ab' ]  匹配b前面的a(结果包含b)





