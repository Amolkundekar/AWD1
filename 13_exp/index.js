// Basic Type Annotations for Variables
var username = "Alice"; // String type
var age = 25; // Number type
var isDeveloper = true; // Boolean type
// Type Annotation for an Array
var skills = ["JavaScript", "TypeScript", "React"]; // Array of strings
var user = {
    name: "Bob",
    age: 30,
    isActive: true,
};
// Function with Type Annotations for Parameters and Return Type
function greet(name) {
    return "Hello, ".concat(name, "!");
}
// Function with Optional Parameter
function multiply(a, b) {
    return b ? a * b : a * 2; // If 'b' is not provided, multiply 'a' by 2
}
// Function with Default Parameter
function divide(a, b) {
    if (b === void 0) { b = 2; }
    return a / b;
}
// Union Type Annotation (Variable can hold multiple types)
var id;
id = 101; // Valid
id = "ID101"; // Valid
// Enum Example
var Role;
(function (Role) {
    Role["ADMIN"] = "Admin";
    Role["USER"] = "User";
    Role["GUEST"] = "Guest";
})(Role || (Role = {}));
var currentRole = Role.ADMIN;
var product = {
    id: 1,
    name: "Laptop",
    price: 1000,
    inStock: true,
};
// Generics in Functions
function getArray(items) {
    return items;
}
var stringArray = getArray(["TypeScript", "JavaScript"]);
var numberArray = getArray([1, 2, 3]);
