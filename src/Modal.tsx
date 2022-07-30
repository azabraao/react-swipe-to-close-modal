import React, { memo, useCallback, useEffect } from "react";
import Backdrop from "./Backdrop";

import Draggable, {
  DraggableData,
  DraggableEvent,
} from "@azabraao/react-draggable";
import clsx from "clsx";
import {
  getAxisOrientedOpacity,
  lockBodyScroll,
  unlockBodyScroll,
} from "./utils";

import "./styles.css";

interface ModalProps {
  children: React.ReactNode;
  close: VoidFunction;
  isOpen: boolean;
  classNames?: {
    modal?: string;
    backdrop?: string;
    draggable?: string;
    window?: {
      wrap?: string;
      content?: string;
    };
  };
  styles?: {
    modal?: React.CSSProperties;
    backdrop?: React.CSSProperties;
    draggable?: React.CSSProperties;
    window?: {
      wrap?: React.CSSProperties;
      content?: React.CSSProperties;
    };
  };
}

const Modal = ({
  children,
  isOpen,
  close,
  styles = {},
  classNames = {
    modal: "",
    backdrop: "",
    draggable: "",
    window: {
      wrap: "",
      content: "",
    },
  },
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) lockBodyScroll();
    else unlockBodyScroll();
  }, [isOpen]);

  const onDragging = useCallback(
    (_: DraggableEvent, { y, x, node }: DraggableData) => {
      node.style.opacity = `${getAxisOrientedOpacity(x, y)}`;
    },
    [isOpen]
  );

  const onStopDragging = useCallback(
    (_: DraggableEvent, { y, x, node }: DraggableData) => {
      const opacity = getAxisOrientedOpacity(x, y);
      const shouldClose = opacity < 0.4;

      if (!shouldClose) node.style.opacity = "1";

      if (shouldClose && isOpen) {
        node.style.removeProperty("opacity");
        close();
      }
    },
    [isOpen]
  );

  return (
    <div
      className={clsx(
        "Modal",
        isOpen ? "Modal--open" : "Modal--closed",
        classNames.modal
      )}
    >
      <Backdrop
        onClick={close}
        className={classNames.backdrop}
        style={styles.backdrop}
      />
      <Draggable
        position={{ x: 0, y: 0 }}
        defaultClassName={clsx("Modal__draggable", classNames.draggable)}
        onStop={onStopDragging}
        onDrag={onDragging}
      >
        <div
          className={clsx("Modal__window-wrap", classNames.window?.wrap)}
          style={styles.window?.wrap}
        >
          <div className={clsx("Modal__window", classNames.window?.content)}>
            {children}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default memo(Modal);