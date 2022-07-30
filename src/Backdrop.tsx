import React, { memo } from "react";
import clsx from "clsx";

interface BackdropProps {
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}

const Backdrop = ({ onClick, style = {}, className = "" }: BackdropProps) => (
  <div
    onClick={onClick}
    className={clsx("Modal__backdrop", className)}
    style={style}
  />
);

export default memo(Backdrop);
