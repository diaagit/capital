"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";

interface OTPModalProps {
  ticketId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const OTPModal = ({ ticketId, onClose, onSuccess }: OTPModalProps) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/validator/otp", { otp_code: otp, ticketId });
      if (res.data.success) {
        setSuccess(true);
        setMessage("Ticket successfully validated!");
        onSuccess();
      } else {
        setSuccess(false);
        setMessage(res.data.message || "OTP verification failed.");
      }
    } catch (err: any) {
      setSuccess(false);
      setMessage(err?.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl p-6 w-80 space-y-4 shadow-xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <h2 className="text-lg font-bold text-gray-900 text-center">Enter OTP</h2>
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            maxLength={4}
            className="text-center"
          />
          <div className="flex justify-between gap-2">
            <Button onClick={handleVerifyOTP} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
          {message && (
            <p className={`text-sm text-center ${success ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

interface ResultModalProps {
  message: string;
  success: boolean;
  onClose: () => void;
}

const ResultModal = ({ message, success, onClose }: ResultModalProps) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`bg-white rounded-xl p-6 w-80 space-y-4 shadow-xl ${
          success ? "border-green-500 border-2" : "border-red-500 border-2"
        }`}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2 className={`text-lg font-bold text-center ${success ? "text-green-600" : "text-red-600"}`}>
          {success ? "Success" : "Failed"}
        </h2>
        <p className="text-sm text-center">{message}</p>
        <Button onClick={onClose}>Close</Button>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const BookMyShowValidator = () => {
  const [ticketCount, setTicketCount] = useState(0);
  const [otpModalTicketId, setOtpModalTicketId] = useState<string | null>(null);
  const [resultModal, setResultModal] = useState<{ show: boolean; success: boolean; message: string }>({
    show: false,
    success: false,
    message: "",
  });

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const divId = "qr-scanner";

  const startScanner = async () => {
    if (!scannerRef.current) return;

    try {
      const cameras = await Html5Qrcode.getCameras();
      if (!cameras || cameras.length === 0) throw new Error("No camera found");

      const environmentCamera = cameras.find((c) => c.label.toLowerCase().includes("back")) || cameras[0];

      const config = { fps: 10, qrbox: 250, disableFlip: false };
      await scannerRef.current.start(
        environmentCamera.id,
        config,
        handleScanSuccess,
        handleScanError
      );
    } catch (err) {
      console.error("Failed to start scanner:", err);
      setResultModal({ show: true, success: false, message: "Camera not found or permission denied." });
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING) {
      await scannerRef.current.stop().catch(() => null);
    }
  };

  const handleScanSuccess = async (decodedText: string) => {
    await stopScanner();

    try {
      const payload = JSON.parse(decodedText);
      const { ciphertext, nonce } = payload;
      if (!ciphertext || !nonce) throw new Error("Invalid QR code");

      const res = await axios.post("/api/validator/validate", { ciphertext, nonce });
      if (res.data.ticketId) {
        setOtpModalTicketId(res.data.ticketId);
      } else {
        setResultModal({ show: true, success: false, message: "Invalid ticket scanned" });
        startScanner();
      }
    } catch (err: any) {
      setResultModal({
        show: true,
        success: false,
        message: err?.response?.data?.message || "Failed to scan QR code",
      });
      startScanner();
    }
  };

  const handleScanError = (errMsg: string) => {
    console.warn("QR scan error:", errMsg);
  };

  useEffect(() => {
    scannerRef.current = new Html5Qrcode(divId);
    startScanner();

    return () => {
      scannerRef.current?.stop().catch(() => null);
      scannerRef.current?.clear();
    };
  }, []);

  const handleOtpSuccess = () => {
    setOtpModalTicketId(null);
    setTicketCount((prev) => prev + 1);
    setResultModal({ show: true, success: true, message: "Ticket successfully validated!" });
    startScanner();
  };

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col justify-center items-center relative">
      <h1 className="text-white text-2xl font-bold absolute top-6 left-6">
        Tickets Validated: {ticketCount}
      </h1>

      <div id={divId} className="w-full h-full" />

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          className="absolute w-full h-[4px] bg-green-400"
          animate={{ y: ["0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </div>

      {otpModalTicketId && (
        <OTPModal ticketId={otpModalTicketId} onClose={() => setOtpModalTicketId(null)} onSuccess={handleOtpSuccess} />
      )}

      {resultModal.show && (
        <ResultModal
          success={resultModal.success}
          message={resultModal.message}
          onClose={() => setResultModal({ ...resultModal, show: false })}
        />
      )}
    </div>
  );
};

export default BookMyShowValidator;