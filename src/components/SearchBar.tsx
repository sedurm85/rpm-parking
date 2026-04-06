import type { CSSProperties } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const styles: Record<string, CSSProperties> = {
  container: {
    padding: '12px 16px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: 16,
    border: '1px solid #e5e5e5',
    borderRadius: 12,
    outline: 'none',
    backgroundColor: '#f5f5f5',
    boxSizing: 'border-box',
  },
};

export function SearchBar({ value, onChange, placeholder = '주차장 검색' }: SearchBarProps) {
  return (
    <div style={styles.container}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={styles.input}
      />
    </div>
  );
}
