import { useRef, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";

const Tooltip = ({ text, children }: { text: any; children: any }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <section className="absolute end-0 me-2">
      <div
        className="text-red-500 relative grid place-items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        {isTooltipVisible && (
          <div
            ref={tooltipRef}
            className="-mt-16 right-0 sm:right-auto absolute px-4 py-2 border border-blue-gray-50 bg-white z-10 hadow-sm shadow-black/10 rounded-full"
          >
            <p className="font-semibold text-sm whitespace-nowrap">{text}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default function TooltipMessage({ message }: { message: string }) {
  return (
    <Tooltip text={message}>
      <RiErrorWarningLine size={20} />
    </Tooltip>
  );
}
