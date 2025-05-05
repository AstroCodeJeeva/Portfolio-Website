import { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
}

const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-4xl font-bold inline-block relative">
        {children}
        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
      </h2>
    </div>
  );
};

export default SectionTitle;