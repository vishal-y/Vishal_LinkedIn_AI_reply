import { useEffect, useState } from "react";
import staticResponse from "@/utils/staticResponseMessage";

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [prompt, setPrompt] = useState<string>("");

  const generateResponse = (): string => {
    return prompt ? staticResponse : "";
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let target = e.target as HTMLElement
    if (target.classList.contains("promptModal")) {
      setShowModal(false);
    }
  };

  return {
    showModal,
    setShowModal,
    prompt,
    setPrompt,
    generateResponse,
    handleBackdropClick,
  };
};
