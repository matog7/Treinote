import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
  expandedText?: string;
  collapsedText?: string;
}

const ExpandButton: React.FC<ExpandButtonProps> = ({
  isExpanded,
  onToggle,
  expandedText = "Réduire l'historique",
  collapsedText = "Voir tout l'historique",
}) => {
  return (
    <button
      onClick={onToggle}
      className='inline-flex items-center px-4 py-2 text-sm font-medium text-teal-700 hover:text-teal-800 hover:bg-teal-50 rounded-lg transition-all duration-200'
    >
      {isExpanded ? (
        <>
          <ChevronUp className='w-4 h-4 mr-2' />
          {expandedText}
        </>
      ) : (
        <>
          <ChevronDown className='w-4 h-4 mr-2' />
          {collapsedText}
        </>
      )}
    </button>
  );
};

export default ExpandButton;
