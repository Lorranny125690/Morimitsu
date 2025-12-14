export const formatBirth = (birthDate: string | Date) => {
  const birth = new Date(birthDate);

  const day = String(birth.getDate() + 1).padStart(2, "0");
  const month = String(birth.getMonth() + 1).padStart(2, "0");
  const year = birth.getFullYear();

  return `${day}/${month}/${year}`;
};