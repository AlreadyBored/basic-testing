# 🧪 Basic Testing Assignment

This repository contains solutions for the [RS School Basic Testing](https://github.com/AlreadyBored/basic-testing) assignment. The goal is to write unit tests using **Jest** for various JavaScript/TypeScript modules that demonstrate different testing techniques.

---

## 📦 Tech Stack

- TypeScript  
- Jest  
- Node.js (v24+ recommended)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/toby-28/basic-testing.git
cd basic-testing
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run tests

```bash
npm run test
```

For verbose output:

```bash
npm run test:verbose
```

---

## 📁 Project Structure

```
basic-testing/
├── src/
│   ├── 01-simple-tests/
│   ├── 02-table-tests/
│   ├── 03-error-handling-async/
│   ├── 04-test-class/
│   ├── 05-partial-mocking/
│   ├── 06-mocking-node-api/
│   ├── 07-mocking-lib-api/
│   └── 08-snapshot-testing/
├── package.json
├── tsconfig.json
└── README.md
```

Each folder contains:
- `index.ts` → source code to be tested  
- `index.test.ts` → your test implementation

---

## ✅ Assignment Requirements

- Write tests for each section using Jest  
- Avoid TypeScript or linter errors  
- Each test must complete within **30 seconds**  
- Do not modify original source files  
- Do not submit PRs to this repo — it's for local development only

---

## 🧠 Topics Covered

| Section | Focus |
|--------|-------|
| 01 | Basic assertions and input validation |
| 02 | Table-driven tests |
| 03 | Error handling and async functions |
| 04 | Testing classes and internal logic |
| 05 | Partial mocking with Jest |
| 06 | Mocking Node.js APIs (`fs`, timers) |
| 07 | Mocking external libraries (`axios`, `lodash`) |
| 08 | Snapshot testing |

---

## 📜 License

This project is for educational use under RS School guidelines.
