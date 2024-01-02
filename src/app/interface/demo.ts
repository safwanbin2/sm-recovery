interface TDemo<T> {
  name: string;
  gender: "male" | "female";
  random: T;
}

const person: TDemo<boolean> = {
  name: "sa",
  gender: "male",
  random: false,
};

class Person {
  name: string;
  age: number;
  isMarried: boolean;

  constructor(name: string, age: number, isMarried: boolean) {
    this.name = name;
    this.age = age;
    this.isMarried = isMarried;
  }
}

class Animal extends Person {
  species: string;
  constructor(name: string, age: number, isMarried: boolean, species: string) {
    super(name, age, isMarried);
    this.species = species;
  }
}

const p1 = new Person("ds", 1, true);
const a1 = new Animal("sa", 2, false, "dog");

console.log(p1 instanceof Person);
console.log(a1 instanceof Animal);

type PrintTitle = (animals: object[]) => string[];

const animal = [
  { title: "mon", age: 23 },
  { title: "don", age: 23 },
];

const printTitle: PrintTitle = (animal) => {
  let titles = [];
  for (let i = 0; i <= printTitle.length; i++) {
    titles.push(animal[i].title);
  }
  return titles;
};

const result = printTitle(animal);
console.log(result);
