import { Drawer } from "@mui/material";
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
const DrawerBottonChall = ({ drawer, setDrawer }: { drawer: boolean, setDrawer: Dispatch<SetStateAction<boolean>> }) => {
    const { push } = useRouter();
    return (
        <div>
            <Drawer
                anchor='bottom'
                open={drawer}
                onClose={() => (setDrawer(false))}
            >
                <div className="flex items-center justify-center h-28">
                    <div className="flex justify-around w-full">
                        <div className="gap-3 flex-col">
                            <span className="text-xl font-semibold">¿Estas seguro de salir?</span>
                            <br />
                            <span className="text-lg">Se perdera tu progreso en esta lección.</span>
                        </div>
                        <div className="flex gap-4">
                            <div className="">
                                <button
                                    onClick={() => (setDrawer(false))}
                                    className="mt-2 py-3 px-4 w-full font-bold text-white bg-gray-400 rounded-full hover:bg-gray-600 "
                                    type="submit"
                                    id="submit-login"
                                >
                                    Quedarse
                                </button>
                            </div>
                            <div className="">
                                <button
                                    onClick={() => push('/lesson')}
                                    className="mt-2 py-3 px-4 w-full font-bold text-white bg-red-500 rounded-full hover:bg-red-700 "
                                    type="submit"
                                    id="submit-login"
                                >
                                    Salir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default DrawerBottonChall