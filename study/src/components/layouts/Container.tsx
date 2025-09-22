import type { PropsWithChildren } from 'react';

export function Container({ children }: PropsWithChildren) {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
      {children}
    </div>
  );
}
