import { useEffect, useState, useRef } from "react";
import insertIcon from "~/assets/icons/insertIcon.svg";
import generateIcon from "~/assets/icons/generateIcon.svg";
import regenerateIcon from "~/assets/icons/regenerateIcon.svg";
import Button from "./Button";
import staticResponse from "@/utils/staticResponseMessage";

interface ModalProps {
  setShowModal: (show: boolean) => void;
}

const Modal = ({ setShowModal }: ModalProps) => {
  const [prompt, setPrompt] = useState<string>("");
  const [showGenerateButton, setShowGenerateButton] = useState(true);
  const promptAndResponseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      const msgFormPlaceholder = document.querySelector(
        ".msg-form__placeholder"
      ) as HTMLDivElement;
      document.body.style.overflow = "";
    };
  }, []);

  const addPromptResponseDiv = (message: string, isPrompt: boolean) => {
    if (promptAndResponseRef.current) {
      const messageDiv = document.createElement("div");
      Object.assign(messageDiv.style, {
        backgroundColor: isPrompt ? "#DFE1E7" : "#DBEAFE",
        color: "#666D80",
        borderRadius: "6px",
        padding: "10px",
        marginBottom: "5px",
        textAlign: isPrompt ? "right" : "left",
        maxWidth: "80%",
        alignSelf: isPrompt ? "flex-end" : "flex-start",
        marginLeft: isPrompt ? "auto" : "0",
        marginRight: isPrompt ? "0" : "auto",
        paddingRight: isPrompt ? "5%" : "auto",
        fontSize: "15px",
      });
      const textNode = document.createTextNode(message);
      messageDiv.appendChild(textNode);
      promptAndResponseRef.current.appendChild(messageDiv);
    }
  };

  const generateResponse = (): void => {
    if (prompt === "") return;
    addPromptResponseDiv(prompt, true); 
    const responseText = staticResponse
    addPromptResponseDiv(responseText, false); 
    setPrompt(""); 
    setShowGenerateButton(false); 
  };

  const insertResponse = () => {
    const msgFormContenteditable = document.querySelector(".msg-form__contenteditable") as HTMLDivElement;
    
    
    // Insert the text without being the editable div active.
    // if (msgFormContenteditable) {
    //   const msgFormPlaceholder = document.querySelector(".msg-form__placeholder") as HTMLDivElement;
    //   const paragraph = msgFormContenteditable.querySelector("p") as HTMLParagraphElement; 
    //   if (msgFormPlaceholder) msgFormPlaceholder.remove()
    //   if (paragraph) paragraph.textContent = staticResponse; 
    //   setShowModal(false);
    // }


    // Uncomment this block of code to Insert the text 
    // with send button active just like normal editable div
    if (msgFormContenteditable) {
      msgFormContenteditable.focus();
      document.execCommand("insertText", false, staticResponse);
      setShowModal(false);
    }
    
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if(target.classList.contains("promptModal")) setShowModal(false);
  };

  
  return (
    <div className="promptModal fixed inset-0 bg-black/30 z-[999] flex flex-col justify-center items-center h-screen w-screen" onClick={handleBackdropClick} >
      <div className="bg-white rounded-lg w-[60vw] md:w-[32vw] mx-auto p-6">
        <div ref={promptAndResponseRef} className="flex flex-col justify-center mb-4 gap-3"></div>
        <div className="mb-6">
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Your prompt" autoComplete="on" className="w-full p-2 pl-3 rounded-lg border text-[#666d80] border-gray-300 outline-none"/>
        </div>
        <div className="flex justify-end items-center mt-2">
          {showGenerateButton ? (
            <Button id="generateButton" title="Generate" bgColor="#3b82f6" textColor="white" borderColor="blue-700" cursor="pointer" iconSrc={generateIcon} iconHeight="17px" clickFunction={generateResponse}/>
          ) : (
            <div className="flex justify-center items-center gap-7">
              <Button id="insertButton" title="Insert" bgColor="#f9fafb" textColor="#666d80" borderColor="#666d80" cursor="pointer" iconHeight="13px" iconSrc={insertIcon} clickFunction={insertResponse}/>
              <Button id="reGenerateButton" title="Regenerate" bgColor="#3b82f6" textColor="white" borderColor="#3b82f6" cursor="not-allowed" iconHeight="17px" iconSrc={regenerateIcon}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;