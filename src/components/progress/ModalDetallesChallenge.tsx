'use client'

import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from "@mui/material";
import { purple } from "@mui/material/colors";
  
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
}));

export default function ModalDetallesChallenge({ open, setOpen, number, name, descripction }: {open: boolean,  setOpen: () => void, number: number, name: string, descripction: string}) {
   
    return (
        <Dialog
            fullWidth={true}
            maxWidth='sm'
            open={open}
            onClose={setOpen}
        >
            <DialogTitle
                sx={{ paddingTop: 6 }}
            >
                <div className="w-full flex justify-center gap-2">
                    <span className="px-2 rounded-md bg-cyan-600 text-white font-extrabold text-xl">
                        {number}
                    </span>
                    <p className="font-extrabold text-xl">{name}</p>                    
                </div>
                
            </DialogTitle>
            <DialogContent
                sx={{ paddingBottom: 4 }}
            >
                <DialogContentText
                    sx={{ textAlign: 'center', fontSize: '1.4rem'}}
                >
                    <span>{descripction}</span>
                </DialogContentText>
            </DialogContent>
            <DialogActions
                sx={{ width: '100%', placeContent: 'center', paddingBottom: 4 }}
            >
                <ColorButton
                    variant="contained"
                    onClick={setOpen}>
                    Entendido
                </ColorButton>
            </DialogActions>
        </Dialog>
    )
}

export function ModalNotParameters({ open, setRouter }: {open: boolean, setRouter: () => void}) {
   
    return (
        <Dialog
            fullWidth={true}
            maxWidth='sm'
            open={open}
            onClose={setRouter}
        >
            <DialogTitle>
                <span className="text-zinc-900 dark:text-white font-extrabold text-xl">
                    Error con los parametros
                </span>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <span>El nombres de los paramtros o incluso su contenido no son los correctos para esta sección</span>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={setRouter}>Regresar</Button>
            </DialogActions>
        </Dialog>
    )
}

export function ModalOutsideTime({ open, setRouter }: {open: boolean, setRouter: () => void}) {
   
    return (
        <Dialog
            fullWidth={true}
            maxWidth='sm'
            open={open}
            onClose={setRouter}
        >
            <DialogTitle>
                <span className="text-zinc-900 dark:text-white font-extrabold text-xl">
                    Se ha pasado del tiempo establecido
                </span>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <span>Puedo seguir el tiempo en la parte inferior de los retos, se mostrara de color rojo el tiempo si ya esta cerca de terminar</span>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={setRouter}>Regresar</Button>
            </DialogActions>
        </Dialog>
    )
}

export function ModalNotChallenge({ open, setRouter }: {open: boolean, setRouter: () => void}) {
   
    return (
        <Dialog
            fullWidth={true}
            maxWidth='sm'
            open={open}
            onClose={setRouter}
        >
            <DialogTitle>
                <span className="text-zinc-900 dark:text-white font-extrabold text-xl">
                    Al parecer no se encuentran retos disponibles
                </span>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <span>Puedo ser que los parametros expresados no sean los correctos o se este forzando el reto</span>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={setRouter}>Regresar</Button>
            </DialogActions>
        </Dialog>
    )
}

export function ModalFullFallos({ open, setRouter }: {open: boolean, setRouter: () => void}) {
   
    return (
        <Dialog
            fullWidth={true}
            maxWidth='sm'
            open={open}
            onClose={setRouter}
        >
            <DialogTitle>
                <span className="text-zinc-900 dark:text-white font-extrabold text-xl">
                    Al parecer sus vidas se terminaron
                </span>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <span>Te deseamos el mejor de los exitos en el proximo reto, no dejes de intentar</span>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={setRouter}>Regresar</Button>
            </DialogActions>
        </Dialog>
    )
}