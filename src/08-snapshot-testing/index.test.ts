// Uncomment the code below and write your tests
import { generateLinkedList } from "./index";

describe("generateLinkedList", () => {
  interface Footballer {
    id: number;
    name: string;
    club: string;
  }
  const footballers: Footballer[] = [
    { id: 1, name: "Lionel Messi", club: "Inter Miami" },
    { id: 2, name: "Cristiano Ronaldo", club: "Al Nassr" },
    { id: 3, name: "Erling Haaland", club: "Manchester City" },
  ];
  const footballersInRandomClubs: Footballer[] = [
    { id: 4, name: "Kylian Mbappé", club: "PSG" },
    { id: 5, name: "Kevin De Bruyne", club: "Manchester City" },
    { id: 6, name: "Mohamed Salah", club: "Liverpool" },
  ];
  const expectedLinkedList = {
    value: { id: 1, name: "Lionel Messi", club: "Inter Miami" },
    next: {
      value: { id: 2, name: "Cristiano Ronaldo", club: "Al Nassr" },
      next: {
        value: { id: 3, name: "Erling Haaland", club: "Manchester City" },
        next: { value: null, next: null },
      },
    },
  };

  test("should generate linked list from values 1", () => {
    const result = generateLinkedList(footballers);
    expect(result).toStrictEqual(expectedLinkedList);
  });

  test("should generate linked list from values 2", () => {
    const result = generateLinkedList(footballersInRandomClubs);

    expect(result).toMatchSnapshot();
  });
});
