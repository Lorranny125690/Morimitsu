export const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};