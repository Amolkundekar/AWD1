// Basic Type Annotations for Variables
let username: string = "Alice"; // String type
let age: number = 25;           // Number type
let isDeveloper: boolean = true; // Boolean type

// Type Annotation for an Array
let skills: string[] = ["JavaScript", "TypeScript", "React"]; // Array of strings

// Type Annotations for Objects
type User = {
  name: string;
  age: number;
  isActive: boolean;
};

const user: User = {
  name: "Bob",
  age: 30,
  isActive: true,
};

// Function with Type Annotations for Parameters and Return Type
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Function with Optional Parameter
function multiply(a: number, b?: number): number {
  return b ? a * b : a * 2; // If 'b' is not provided, multiply 'a' by 2
}

// Function with Default Parameter
function divide(a: number, b: number = 2): number {
  return a / b;
}

// Union Type Annotation (Variable can hold multiple types)
let id: string | number;
id = 101;     // Valid
id = "ID101"; // Valid

// Enum Example
enum Role {
  ADMIN = "Admin",
  USER = "User",
  GUEST = "Guest",
}
const currentRole: Role = Role.ADMIN;

// Using Interface for Objects
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const product: Product = {
  id: 1,
  name: "Laptop",
  price: 1000,
  inStock: true,
};

// Generics in Functions
function getArray<T>(items: T[]): T[] {
  return items;
}

const stringArray = getArray<string>(["TypeScript", "JavaScript"]);
const numberArray = getArray<number>([1, 2,3]);
