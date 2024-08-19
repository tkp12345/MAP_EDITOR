import { useEffect } from "react";
import styled from "@emotion/styled";
import { useToastStore } from "@/store/toastStore.tsx";

export const Toast = () => {
  const { isOpen, message, hideToast, duration } = useToastStore();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(hideToast, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, hideToast]);

  if (!isOpen) return null;

  return (
    <ToastContainer>
      <h2>
        {message}
      </h2>
    </ToastContainer>
  );
};

const ToastContainer = styled.div`
  position: fixed;
  top: 60px;
  left: 50%;
  width: max-content;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 1);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: slideUp 0.5s ease-out;
  z-index: 99;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
`;
