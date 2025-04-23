import React from 'react';
import { cn } from '@/lib/utils'; // Adjust this path if your cn function is elsewhere

const CornerButton = () => {
  // Define initial corner positions and their corresponding hover translations
  const corners = [
    { position: 'top-1 left-1', hoverTranslate: 'group-hover:translate-x-[86cqw]' }, // TL -> TR
    { position: 'top-1 right-1', hoverTranslate: 'group-hover:translate-y-[1.8cqh]' }, // TR -> BR
    { position: 'bottom-1 right-1', hoverTranslate: 'group-hover:translate-x-[-86cqw]' }, // BR -> BL
    { position: 'bottom-1 left-1', hoverTranslate: 'group-hover:translate-y-[-1.8cqh]' }  // BL -> TL
  ];

  return (
    <a
      href="#"
      className={cn(
        "group @container relative inline-flex items-center justify-center w-36 h-10 cursor-pointer", // Use flex for centering
        "border border-gray-300 bg-gray-100",
        "text-center font-bold text-black no-underline", // text-center is technically redundant with justify-center but harmless
        "transition-colors duration-300 hover:bg-gray-200"
      )}
    >
      <span>Hover Me</span>

      {corners.map((corner, index) => (
        <span
          key={index}
          className={cn(
            "corner",
            "absolute h-3 w-3 text-center text-sm leading-3 text-gray-600",
            "transition-transform duration-300 ease-in-out", /* Adjust timing as needed */
            corner.position,
            corner.hoverTranslate /* Apply specific hover translate */
          )}
        >
          +
        </span>
      ))}
    </a>
  );
};

export default CornerButton;