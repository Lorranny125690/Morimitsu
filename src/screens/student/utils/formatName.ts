export const studentName = (student: string) => {
  const firstName = student.split(" ")[0];
  const secondName = student.split(" ")[1];
  if (secondName === "de" || secondName === "do" || secondName === "da") {
    const thirdName = student.split(" ")[2];
    return (`${firstName} ${secondName} ${thirdName}`)
  }

  return (`${firstName} ${secondName}`)
}