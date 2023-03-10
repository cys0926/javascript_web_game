const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
};

// Proxy 패턴의 장점은 값을 더 의미 있는 출력으로 변환해 줄 수 있다는 것이다.
const personProxy1 = new Proxy(person, {
  get(obj, prop) {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set(obj, prop, value) {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
    return true;
  },
});

personProxy1.name;
personProxy1.age = 43;
console.log("--------------------");

// Proxy 패턴을 사용하면 유효성 검사가 가능하다.
const personProxy2 = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(`해당 객체에는 ${prop} 속성이 존재하지 않습니다.`);
    } else {
      console.log(`이 객체의 ${prop} 값은 ${obj[prop]}입니다.`);
    }
  },
  set: (obj, prop, value, receiver) => {
    if (prop === "age" && typeof value !== "number") {
      console.log(`${prop}는 숫자만 가능합니다.`);
    } else if (prop === "name" && value.length < 2) {
      console.log(`유효하지 않은 ${prop}입니다.`);
    } else {
      console.log(`${prop}을 ${obj[prop]}에서 ${value}로 변경합니다. `);
      obj[prop] = value;
    }
    return true;
  },
});

personProxy2.nonExistentProperty;
personProxy2.age = "44";
personProxy2.name = "";
console.log("--------------------");

// Reflect를 사용하여 Proxy 객체의 값에 접근할 수 있다.
const personProxy3 = new Proxy(person, {
  get(obj, prop) {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
    return Reflect.get(obj, prop);
  },
  set(obj, prop, value) {
    console.log(`Changed ${prop} from ${Reflect.get(obj, prop)} to ${value}`);
    Reflect.set(obj, prop, value);
    return true;
  },
});

personProxy3.name;
personProxy3.age = 43;
personProxy3.name = "Jane Doe";
console.log("--------------------");

// Proxy 패턴은 유효성 검사, 서식 지정, 로깅, 알림 또는 디버깅에 도움이 된다.
// 성능이 중요한 코드에는 Proxy를 사용하지 않는 것이 좋다.

/**
 * Proxy Exercise
 *
 * The username property has to be a string that only contains of letters, and is at least 3 characters long
 * The email property has to be a valid email address.
 * The age property has to be a number, and has to be at least 18
 * When a property is retrieved, change the output to ${new Date()} | The value of ${property}} is ${target[property]}. For example if we get user.name, it needs to log 2022-05-31T15:29:15.303Z | The value of name is John
 *
 * const user = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   username: 'johndoe',
 *   age: 42,
 *   email: 'john@doe.com',
 * };
 * */

const user = {
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
  age: 42,
  email: "john@doe.com",
};

const userProxy = new Proxy(user, {
  get: (obj, prop) => {
    console.log(
      `${new Date()} | The value of ${prop} is ${Reflect.get(obj, prop)}`
    );
    return Reflect.get(obj, prop);
  },
  set: (obj, prop, value) => {
    if (prop === "email" && !isValidEmail(value)) {
      console.log("유효한 이메일이 아닙니다.");
    } else if (
      prop === "username" &&
      (value.length < 3 || !isAllLetters(value))
    ) {
      console.log("username은 3글자 이상의 문자만 가능합니다.");
    } else if (prop === "age" && (typeof value !== "number" || value < 18)) {
      console.log("age는 18이상의 숫자만 가능합니다.");
    } else {
      console.log(`${prop}을 ${obj[prop]}에서 ${value}로 변경합니다. `);
    }

    return Reflect.set(obj, prop, value);

    function isValidEmail(email) {
      const tester =
        /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

      return tester.test(email);
    }

    function isAllLetters(char) {
      if (typeof char !== "string") {
        return false;
      }

      return /^[a-zA-Z]+$/.test(char);
    }
  },
});

userProxy.age = 13;
userProxy.age = 21;
userProxy.age;
