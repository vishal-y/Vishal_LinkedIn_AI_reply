import { useState } from "react";
import Modal from "@/components/Modal";
import { useAIButton } from "@/hooks/useAiButton";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  useAIButton(setShowModal);

  return (
    <>
      {showModal && <Modal setShowModal={setShowModal} />}
    </>
  );
};

export default App;
