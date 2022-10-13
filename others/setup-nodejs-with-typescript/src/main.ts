function sayMyName(name: string): void {
  if (name === "Heisenberg") {
    console.log("You're right 👍");
  } else {
    console.log("You're wrong 👎");
  }
}

const arrowFunc = (a: number, b: number) => a + b;

arrowFunc(1, 2)
sayMyName("Heisenberg");