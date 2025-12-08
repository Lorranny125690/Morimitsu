import type { Student } from "./type";

export const studentMock = async (): Promise<Student[]> => {
  return [
    {
      id: 1,
      name: "Deadlock",
      number: "0000-0000",
      beltColor: "Marrom",
      degree: "1°",
      status: "Ativa",
      frequency: 12,
      photo: "url",
    },
    {
      id: 2,
      name: "Deadlock",
      number: "0000-0000",
      beltColor: "Azul",
      degree: "1°",
      status: "Ativa",
      frequency: 12,
      photo: "url",
    },
  ];
};
