import { useState } from "@forge/ui";

export const useModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const hideModal = () => setModalIsOpen(false);
  const showModal = () => setModalIsOpen(true);

  return { modalIsOpen, hideModal, showModal };
};
