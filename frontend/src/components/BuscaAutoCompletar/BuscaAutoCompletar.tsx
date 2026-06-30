import { useState } from "react";
import styles from "./BuscaAutoCompletar.module.css";

type AutoCompleteProps<T> = {
  items: T[];
  value: string;
  placeholder?: string;
  getLabel: (item: T) => string;
  onChange: (texto: string) => void;
  onSelect: (item: T) => void;
};

export default function BuscaAutoCompletar<T>({
  items,
  value,
  placeholder,
  getLabel,
  onChange,
  onSelect,
}: AutoCompleteProps<T>) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className={styles.container}>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          setAberto(true);
        }}
      />

      {aberto && value && items.length > 0 && (
        <ul className={styles.lista}>
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(item);
                setAberto(false);
              }}
            >
              {getLabel(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
