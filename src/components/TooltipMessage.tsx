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
    <div
      className="absolute end-4 grid bottom-1/2 translate-y-1/2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isTooltipVisible && (
        <div className="text-red-500 relative grid place-items-center">
          <div
            ref={tooltipRef}
            className="right-0 mr-6 -mt-5 lg:-mt-20 lg:right-auto absolute px-4 py-2 border border-blue-gray-50 bg-white z-10 shadow-sm shadow-black/10 rounded-full"
          >
            <p className="font-semibold text-sm whitespace-nowrap">{text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function TooltipMessage({ message }: { message: string }) {
  return (
    <Tooltip text={message}>
      <RiErrorWarningLine size={20} />
    </Tooltip>
  );
}
