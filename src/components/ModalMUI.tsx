import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';

interface ModalProps {
    open: boolean;
    handleClose: () => void;
    children: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({ open, handleClose, children }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 450,
                bgcolor: 'background.transparent',
                boxShadow: 24,
                borderRadius: 4,
            }}>
                {children}
            </Box>
        </Modal>
    );
}

export default ModalComponent;