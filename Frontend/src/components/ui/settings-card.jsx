import React, {useRef} from "react";
import { CSSTransition } from 'react-transition-group';

function CheckIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 fade-in-scale">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    );
}

export default function SettingsCard({ label, mode, modeChangeFunction }) {
    const nodeRef = useRef(null);
    return (
      <div className="border-2 rounded-lg p-4 bg-gray-50 flex flex-row items-center justify-between cursor-pointer" onClick={modeChangeFunction}>
        <label>{label}</label>
        <input type="checkbox" checked={mode} onChange={modeChangeFunction} className="hidden bg-transparent" />
        <CSSTransition in={mode} timeout={300} classNames="fade" unmountOnExit nodeRef={nodeRef}>
          <div ref={nodeRef}>
            <CheckIcon />
          </div>
        </CSSTransition>
      </div>
    );
  }