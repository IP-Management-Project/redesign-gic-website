export type EditField = {
  key: string;
  label: string;
  value: string;
  multiline?: boolean;
  parse?: (value: string) => string | boolean;
};

export type ModalProps = {
  fields: EditField[];
  formValues: Record<string, string>;
  onChange: (key: string, value: string) => void;
};

export type SectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
