'use client'

import { EnumCategory } from "@/lib/types/challenge";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function ModalDetalles({ open, handleClose, category }: { open: boolean, handleClose: () => void, category: EnumCategory }) {
    return (
        <Dialog
            maxWidth='sm'
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                <span className="text-zinc-900 dark:text-white font-extrabold text-xl">
                    {EnumCategory.PALABRAS == category && palabras.title}
                    {EnumCategory.NUMEROS == category && numeros.title}
                </span>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {EnumCategory.PALABRAS == category && palabras.contentCategory}
                    {EnumCategory.NUMEROS == category && numeros.contentCategory}
                </DialogContentText>
                <div className="flex justify-around my-2 gap-2">
                    <div className="w-full bg-slate-100 rounded-2xl p-4 flex flex-col justify-center gap-2">
                        <span className="text-center font-mono font-bold">Tipos de retos</span>
                        <div className="grid grid-cols-2 gap-3">
                            {
                                EnumCategory.PALABRAS == category && (
                                    palabras.itemsCategory.map((cat, index) => (
                                        <span
                                            key={index}
                                            className={`inline-flex font-semibold items-center justify-center rounded-full px-2.5 py-0.5 ${colores_tipos.get(index)}`}
                                        >
                                            <p className="whitespace-nowrap text-sm">{cat}</p>
                                        </span>
                                    ))


                                )
                            }
                            {
                                EnumCategory.NUMEROS == category && (
                                    numeros.itemsCategory.map((cat, index) => (
                                        <span
                                            key={index}
                                            className={`inline-flex font-semibold items-center justify-center rounded-full px-2.5 py-0.5 ${colores_tipos.get(index)}`}
                                        >
                                            <p className="whitespace-nowrap text-sm">{cat}</p>
                                        </span>
                                    ))
                                )
                            }
                        </div>
                    </div>
                    <div className="w-1/3 bg-sky-100 rounded-2xl p-4 flex flex-col justify-center gap-2">
                        <span className="text-center font-mono font-bold">Dificultades</span>
                        <div className="grid grid-cols-1 gap-3 font-medium">
                            <div className="flex justify-around">
                                <FacilIcon />
                                <span>Facil</span>
                            </div>
                            <div className="flex justify-around">
                                <MedioIcon />
                                <span>Medio</span>
                            </div>
                            <div className="flex justify-around">
                                <DificilIcon />
                                <span>Dificil</span>
                            </div>

                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    )
}

const palabras = {
    title: 'Retos con Palabras',
    contentCategory: "Los desafíos estarán centrados en las vocales, palabras y objetos, los cuales se utilizarán para llevar a cabo diversas actividades.",
    itemsCategory: ['Deletreo', 'Autocompletado', 'Selección', 'Un intento']
}

const numeros = {
    title: 'Retos con Numeros',
    contentCategory: "En esta cateogría encontrarás retos que te lleven a pensar el resultado de una operación matematica basica y realizar la señas del resultadeasPuede ser por deletreo o en algunos casos solo de una unica imagen deducir los numeros o el resultado por escrito",
    itemsCategory: ['Deletreo', 'Autocompletado', 'Selección', 'Operaciones', 'Un intento']
}

const colores_tipos = new Map<number, string>([
    [0, 'bg-emerald-100 text-emerald-700'],
    [1, 'bg-violet-200 text-violet-700'],
    [2, 'bg-rose-100 text-rose-700'],
    [3, 'bg-yellow-100 text-yellow-700'],
    [4, 'bg-purple-100 text-purple-700'],
    [5, 'bg-red-100 text-red-700'],
    [6, 'bg-teal-100 text-teal-700'],

]);

const FacilIcon = () => {
    return <> 🎉 </>
}

const MedioIcon = () => {
    return <> 🎯 </>
}

const DificilIcon = () => {
    return <> ⚔ </>
}