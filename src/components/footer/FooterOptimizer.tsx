import { ReactNode } from 'react';

interface FooterOptimizerProps {
  children: ReactNode;
}

export function FooterOptimizer({ children }: FooterOptimizerProps) {
  return (
    <div className="footer-container" style={{ contain: 'layout' }}>
      {children}
    </div>
  );
}
