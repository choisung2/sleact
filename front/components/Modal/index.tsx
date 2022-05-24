import React, { CSSProperties, FC, ReactNode, useCallback } from 'react';
import { CloseModalButton, CreateModal } from './styles';

interface Props {
  children?: ReactNode;
  show: boolean;
  onCloseModal: () => void;
}

const Modal: FC<Props> = ({ children, show, onCloseModal }) => {
  const stopPropagation = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
