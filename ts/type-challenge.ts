//1. hello world
// type HelloWord = string


//4. Pick
// interface Todo {
//   title: string
//   desc: string
//   completed: boolean
// }
// type MyPick<T, U extends keyof T> = {
//   [P in U]: T[P]
// } 

// const todoPrview: MyPick<Todo, "desc" | "completed"> = {
//   desc: "hello world",
//   completed: true,
// }



// 7. ReadOnly
// interface Todo {
//   title: string
//   description: string
// }

// type MyReadonly<T> = {
//   readonly [P in keyof T ] : T[P] 
// }

// const todo: MyReadonly<Todo> = {
//   title: "Hey",
//   description: "foobar"
// }
// todo.title = "Hello" 
// todo.description = "googo"





// 11. tuple to object
// type TupleToObject<T extends readonly (number | string)[]> = {
  // [P in T[number]]: P
// }
// const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
// expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
// type result = TupleToObject<typeof tuple> 



// 14. first of Array
// type First<T extends Array<any>> = T[0]
// type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
// type First<T extends Array<any>> = T extends [infer First, ...infer Rest] ? First : never
// type arr1 = ['a', 'b', 'c']
// type arr2 = [3, 2, 1]

// type head1 = First<arr1> // expected to be 'a'
// type head2 = First<arr2> // expected to be 3



// 18. length of tuple
// type Length<T extends any[]> = T["length"] 
// type tesla = ['tesla', 'model 3', 'model X', 'model Y']
// type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

// type teslaLength = Length<tesla>  // expected 4
// type spaceXLength = Length<spaceX> // expected 5



// 43. Exclude
// type MyExclude<T, U> =  T extends U ? never : T
// type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'



// 189. Awaited
// 利用infer推断得到Promise包裹内容，如果仍然是promise那么就递归获取最终类型，最终返回;
// type MyAwaited<T> = T extends Promise<infer R> ? MyAwaited<R> : T
// type ExampleType = Promise<string>
// type Result = MyAwaited<ExampleType> // string


// 268. If
// type If<C extends boolean, T, F> = C extends true ? T : F
// type A = If<true, 'a', 'b'>  // expected to be 'a'
// type B = If<false, 'a', 'b'> // expected to be 'b'


// 533 Concat
// type Concat<T extends any[], U extends any[]> = [...T, ...U]
// type Result = Concat<[1], [2]> // expected to be [1, 2]


// 898 Includes
// type Includes<T extends any[], U> = U extends T[number] ? true : false 
// type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'> // expected to be `false`


// 3057 Push
// type Push<T extends any[], U> = [...T, U]
// type Result = Push<[1, 2], '3'> // [1, 2, '3']


// 3060 Unshift
// type Unshift<T extends any[], U> = [U, ...T]
// type Result = Unshift<[1, 2], 0> // [0, 1, 2,]


// 3312 Parameters
// type MyParameters<T> = T extends (...args: infer R) => any ? R : never
// const foo = (arg1: string, arg2: number): void => {}
// type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]


// 2. get return type
// type MyReturnType<T> =  T extends (...args) => infer R ? R : never
// const fn = (v: boolean) => {
//   if (v)
//     return 1
//   else
//     return 2
// }
// type a = MyReturnType<typeof fn> // should be "1 | 2"




// 15050 Omit
// type MyOmit<T, K extends keyof T> = MyPick<T,MyExclude<keyof T, K>>
// type MyExclude<T, U> = T extends U ? never : T
// type MyPick<T, K extends keyof T> = {
//   [P in K]: T[P]
// }

// interface Todo {
//   title: string
//   description: string
//   completed: boolean
// }

// type TodoPreview = MyOmit<Todo, 'description' | 'title'>
// type TodoKeys = MyExclude<"a" | "b" | "c", "a" >
// const todo: TodoPreview = {
//   completed: false,
// }


// 8 readOnly2
// # 思路
// 1. 类型收窄限定K必须在T里面，如果K不存在就给默认值keyof T
// 2. 如果在K里面的通过in遍历加上readonly
// 3. 如果不在k里面的通过交叉类型保持不变

`interface Todo {
  title: string
  description: string
  completed: boolean
}
type MyOmit<T, R extends keyof T> = {
  // 通过as来remapping
  [P in keyof T as P extends R ? never : P]: T[P];
};
type MyReadonly2<T, K extends keyof T = keyof T> = MyOmit<T, K> & {
  readonly [P in K]: T[P];
};
const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: "Hey",
  description: "foobar",
  completed: false,
}
todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true // OK
`;


// 9: deep readonly
`
type DeepReadonly<T> = {
  readonly [ P in keyof T]: T[P] extends {[K: string]: any} ? DeepReadonly<T[P]> : T[P] 
}
type X = { 
  x: { 
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

let a: DeepReadonly<X> = {
  x: { 
    a: 1,
    b: 'hi',
  },
  y: 'hey'
}
a.x.b = 3
a.x = "go"
`;


// 10 tuple to union
`
type TupleToUnion<T extends any[]> = T[number] extends infer TItem ? TItem : never
type Arr = ['1', '2', '3']
type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
`;


// 12 chainable option
declare const config: Chainable
const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get()

type Chainable<T = {}> = {
  option<K extends string, V>(key: K, value: V): Chainable<
    (K extends keyof T ? Omit<T, K> : T) & Record<K, V>
  >
  get(): T
}