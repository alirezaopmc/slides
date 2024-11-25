interface MultiplyInterface {
  multiply(a: number, b: number): number;
}

class MAdd implements MultiplyInterface {
  multiply(a: number, b: number): number {
    let s = 0;
    for (let i = 0; i < b; i++) {
      s += a;
    }
    return s;
  }
}

class MStar implements MultiplyInterface {
  multiply(a: number, b: number): number {
    let s = a * b;
    return s;
  }
}

class App {
  constructor(private m: MultiplyInterface) {}

  setStrategy(s: MultiplyInterface) {
    this.m = s;
  }

  solve(a: number, b: number) {
    this.m.multiply(a, b);
  }
}

let app1 = new App(new MAdd());
/*
something happened
*/
app1.setStrategy(new MStar());
