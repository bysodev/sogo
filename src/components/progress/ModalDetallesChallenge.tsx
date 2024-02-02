'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function ModalDetallesChallenge({ open, setOpen, number, name, descripction }: {open: boolean,  setOpen: () => void, number: number, name: string, descripction: string}) {
   
    return (
        <Dialog
            maxWidth='sm'
            open={open}
            onClose={setOpen}
        >
            <DialogTitle>
                <span className="text-zinc-900 dark:text-white font-extrabold text-xl">
                    {`#${number} ${name}`}
                </span>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <span>{descripction}</span>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={setOpen}>Entendido</Button>
            </DialogActions>
        </Dialog>
    )
}
