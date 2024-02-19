import React from "react";
import ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode;
};
const FullScreenPortal: React.FC<Props> = ({ children }) => {
  // Only render the portal when the app is in fullscreen mode
  const portalContainer = document.getElementById("modal-root");
  return portalContainer
    ? ReactDOM.createPortal(children, portalContainer)
    : children;
};

export default FullScreenPortal;
