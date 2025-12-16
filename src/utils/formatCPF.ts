export const formatCPF = (cpf_number: string) => {
  const first = cpf_number.slice(0, 3);
  const second = cpf_number.slice(3, 6);
  const third = cpf_number.slice(6, 9);
  const fourth = cpf_number.slice(9, 12);

  return (`${first}.${second}.${third}-${fourth}`)
}