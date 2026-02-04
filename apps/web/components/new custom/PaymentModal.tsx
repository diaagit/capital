"use client";

import { CSSProperties, useEffect } from "react";

export default function PaymentModal({ url, onClose }) {
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data === "PAYMENT_SUCCESS") {
        onClose();
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onClose]);

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <button style={closeBtn} onClick={onClose}>✕</button>

        <iframe
          src={url}
          title="Payment Gateway"
          style={iframeStyle}
        />
      </div>
    </div>
  );
}

const overlay: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.65)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modal: CSSProperties = {
  width: "500px",
  height: "680px",
  background: "#fff",
  borderRadius: "16px",
  overflow: "hidden",
  position: "relative",
  boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
};

const iframeStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  border: "none",
};

const closeBtn: CSSProperties = {
  position: "absolute",
  top: 10,
  right: 12,
  zIndex: 10,
  background: "#fff",
  borderRadius: "50%",
  width: 28,
  height: 28,
  cursor: "pointer",
};