/* eslint-disable react/prop-types */
import {
  FloatingPortal,
  arrow,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react-dom-interactions";
import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, useState } from "react";

export default function Popover({
  children,
  renderPopover,
  className,
  placement,
  element,
  initialOpen,
}) {
  const [open, setOpen] = useState(initialOpen || false);
  const arrowRef = useRef(null);
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(10), shift(), arrow({ element: arrowRef })],
    placement,
  });
  const showPopover = () => {
    setOpen(true);
  };
  const id = useId();
  const hidePopover = () => {
    setOpen(false);
  };
  const Element = element || "div";
  return (
    <Element
      className={className}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
      ref={reference}
    >
      {children}

      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: "max-content",
                transformOrigin: `${middlewareData.arrow?.x}px top`, // de hover thi zoom tu vi tri mui ten
              }}
              initial={{ opacity: 0, transform: "scale(0)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              exit={{ opacity: 0, transform: "scale(0)" }}
              transition={{ duration: 0.2 }}
            >
              <span
                // mui ten
                ref={arrowRef}
                className="absolute translate-y-[-90%] border-[11px] border-x-transparent border-b-white border-t-transparent"
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y,
                  zIndex: 1,
                }}
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  );
}
