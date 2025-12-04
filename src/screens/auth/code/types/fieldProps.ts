export type FieldProps = {
  icon: React.ReactNode;
  label: string;
  type?: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};