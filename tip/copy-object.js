const person = {
    firstName: 'John',
    lastName: 'Doe'
};


// using spread ...
let p1 = {
    ...person
};

// using  Object.assign() method
let p2 = Object.assign({}, person);

// using JSON
let p3 = JSON.parse(JSON.stringify(person));

let p1a = {
    ...p1
}

let p2a = Object.assign({}, person);

Object.assign({}, person);

let p4 = JSON.parse(JSON.stringify(persion));

// sử dụng lodash
_.cloneDeep(value)



