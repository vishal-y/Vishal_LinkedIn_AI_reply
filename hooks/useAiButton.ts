import { useEffect } from "react";
import aiIcon from '~/assets/icons/aiIcon.svg'

export const useAIButton = (setShowModal: (show: boolean) => void) => {
  useEffect(() => {
    const addAiButton = (messageEditableDiv: HTMLDivElement) => {
      if (!messageEditableDiv.querySelector(".aiButton")) {
        const newAiButtonDiv = document.createElement("img");
        newAiButtonDiv.className = "aiButton absolute p-2 cursor-pointer z-50";
        newAiButtonDiv.src = aiIcon;
        Object.assign(newAiButtonDiv.style, {
          bottom : "0px",
          right : "8px",
          height : "35px"
        });
        newAiButtonDiv.addEventListener("click", () => setShowModal(true));
        messageEditableDiv.appendChild(newAiButtonDiv);
      }
    };

    const removeAiButton = (messageEditableDiv: HTMLDivElement) => {
      const aiButton = messageEditableDiv.querySelector(".aiButton");
      if (aiButton) {
        messageEditableDiv.removeChild(aiButton);
      }
    };

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          const messageEditableDivs = document.querySelectorAll(".msg-form__contenteditable") as NodeListOf<HTMLDivElement>;
          messageEditableDivs.forEach((messageEditableDiv) => {
            if (!messageEditableDiv.hasAttribute("data-observed")) {
              messageEditableDiv.addEventListener("focus", () => addAiButton(messageEditableDiv));
              messageEditableDiv.addEventListener("blur", () => removeAiButton(messageEditableDiv));
              messageEditableDiv.setAttribute("data-observed", "true");
            }
          });
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [setShowModal]);
};
