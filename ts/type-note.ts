// 索引 keyof 所有的公有属性key的联合

class Demo1 {
  private name: string;
  public readonly age: number;
  protected home: string;
}

type T = keyof Demo1; // age

// & 交叉类型 多个类型的并集，如果key相同但是类型不同，则该key为never

interface Person {
  name: string;
  age: number;
}

interface People {
  name: string;
  age: string;
  position: string;
}

type T2 = Person & People;
const p: T2 = {
  name: "alex",
  age: (function () {
    throw new Error();
  })(),
  position: "front-end",
};

// extends
// 1.继承
interface Demo2 {
  name: string;
}

interface Demo3 {
  sex: number;
}

interface Demo4 extends Demo2, Demo3 {
  age: number;
}
// type实现extends功能
type Demo4_1 = Demo2 & Demo3 & { age: number };

const d4: Demo4 = {
  age: 18,
  name: "egon",
  sex: 0,
};
const d4_1: Demo4_1 = d4;

// 2. 条件类型
type Condition1 = "x" extends "x" ? 1 : 2;

type Condition2 = "x" | "y" extends "x" ? 1 : 2;
type Condition2_1<T> = T extends "x" ? 1 : 2;

// Condition2_1_1 和 Condition2类型不一样
/**
 * 简单的条件判断，则是直接判断前面的类型是否可分配给后面的类型
 * extends前面的类型是泛型，且泛型传入的是联合类型时，则会依次判断该联合类型的所有子类型是否可分配给extends后面的类型
 */
type Condition2_1_1 = Condition2_1<"x" | "y">;

// 3. 阻止extends关键字对于联合类型的分发特性
type NoDistribute<T> = [T] extends ["x"] ? 1 : 2;
type NodistributeType = NoDistribute<"x" | "y">; // 2

// 类型兼容性  可复制性（可分配性）、协变、逆变、双向协变

interface Animal {
  name: string;
}

interface Dog extends Animal {
  break(): void;
}
// 可赋值性
// let a: Animal
// let b: Dog
// a = b

// 可赋值性在联合类型中的特性

type A = 1 | 2 | 3;
type B = 2 | 3;

let a: A;
let b: B;
a = b;

type AnimalFn = (arg: Animal) => void;
type DogFn = (arg: Dog) => void;

let aFn: AnimalFn;
let dFn: DogFn;

// aFn = dFn
dFn = aFn;

// infer infer推导的名称相同并且都处于逆变的位置，则推导的结果将会是交叉类型。
type Bar<T> = T extends {
  a: (x: infer U) => void;
  b: (x: infer U) => void;
}
  ? U
  : never;

type Bar1 = Bar<{
  a: (x: string) => void;
  b: (x: string) => void;
}>;

type Bar2 = Bar<{ 
  a: (x: string) => void; 
  b: (x: number) => void 
}>;

// infer infer推导的名称相同并且都处于协变的位置，则推导的结果将会是联合类型

type Foo<T> = T extends {
  a: infer U;
  b: infer U;
} ? U : never

type Foo1 = Foo<{ a: string; b: string }>;

type Foo2 = Foo<{ a: string; b: number }>;


// Extract
// type Extract<T, U> = T extends U ? T : never


type Eg = [arg1: string, arg2: number] // 具名 tuple

type Eg1 = [string, number]

// infer 实现一个推到数组所有元素的类型
type FalttenArray<T extends any[]> = T extends Array<infer P> ? P : never


type Faltten1 = FalttenArray<string[] | number[]>


type MyConstructorParameters<
  T extends abstract new (...args: any) => any
> = T extends abstract new (...args: infer P) => any ? P :never


interface ErrorConstructor {
  new(message?: string) : Error;
  (message?: string): Error;
  readonly prototype: Error
}
type Er = MyConstructorParameters<ErrorConstructor>


class People2 {
  public name: string;
  public age: number;
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

type P2 = MyConstructorParameters<typeof People2>




// 后面剩下的todo

