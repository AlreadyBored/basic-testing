# Basic testing

---

### Prerequisites

1. Install [Node.js](https://nodejs.org/en/download/)
2. Fork this repository: https://github.com/AlreadyBored/basic-testing
3. Clone your newly created repo locally: https://github.com/<%your_github_username%>/basic-testing/
4. Go to folder `basic-testing`
5. To install all dependencies use [`npm install`](https://docs.npmjs.com/cli/install)
6. Run **test scripts** in command line.
7. You will see the number of skipped, passing and failing tests.

---

### Test scripts

```bash
# run unit tests
$ npm run test

# with logging
$ npm run test:verbose
```

---

#### Notes

1. We recommend you to use Node.js of version 18.x.x LTS. If you use any of features, that does not supported by Node.js v18, there may be problems with task submit.
2. Please, be sure that each of your tests is limited to 30 sec.

---

## General task description

Your task is to write unit tests for code, provided in file `index.ts`.

---

### **Simple tests**

Write unit tests for the `simpleCalculator` function, which performs basic mathematical operations - addition, subtraction, division, multiplication, and exponentiation. Your task is to verify that the operations are executed correctly and that the function returns `null` for invalid input.

---

### **Table tests**

Your task is to rewrite the tests written in the previous task using the table-driven testing approach, utilizing the appropriate Jest API.

---

### **Error handling & async**

Your task is to test functions that work asynchronously/throw/reject exceptions..

---

### **Testing class**

Your task is to test a class representing a bank account that implements corresponding operations. Please note that some methods of the class invoke others, some operations result in errors, and the implementation is asynchronous and involves the native JS API. These aspects should be taken into account when writing the tests.

---

### **Partial mocking**

Your task is to utilize the Jest API to partially mock the contents of a module.

---

### **Mocking Node.js API**

Your task is to test the proper usage of the Node.js API based on commonly used APIs such as the `fs` module, as well as `setTimeout` and `setInterval`. Remember that the tests should not interact with the actual file system and should not rely on real-time!

---

### **Mocking library API**

Your task is to test that function that utilize library APIs is working correctly (with commonly used libraries such as `axios` and `lodash` as examples).

---

### **Snapshot testing**

Your task is to use snapshot testing with Jest and compare it to regular comparison testing.

---
