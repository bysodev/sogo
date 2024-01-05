'use client'

import { Button } from "@mui/material";


export const FooterLesson = ({comprobation, continuar, changeContinue, submit}: {comprobation: Function, continuar: Boolean, changeContinue: Function, submit: Boolean}) => {


    return (
        <div className='w-full flex place-content-center '>

            {
                !continuar &&  
                    <FotterLessonPrincipal  
                        submit={submit}
                        comprobation={comprobation}
                    />
            }
           

            <div className={`w-full flex flex-col place-content-center items-center ${continuar ? '' : 'hidden'} `}>
                <div className='w-full'>
                    <hr />
                </div>
                <div className='flex justify-between p-4 w-3/5'>
                  
                    <div className=''>
                        <div className="flex">
                            <div className="mr-6 grid place-content-center ">
                                {/* <MdOutlineCheck className="text-3xl w-3/3 bg-green-500  text-white rounded-full group-hover:text-white " /> */}
                                <span>Check</span>
                            </div>
                            <div className="flex flex-row flex-wrap">
                                <div className="w-full">
                                    <h5>¡Buen trabajo!</h5>
                                </div>
                                <div className="w-full">
                                    <h5>Sigamos . . .</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button
                            color="secondary"
                            variant="outlined"
                            onClick={() => {
                                changeContinue();
                            }}
                        >
                            CONTINUAR
                        </Button>

                    </div>
                </div>
                <div className='w-full'>
                    <hr />
                </div>
            </div>
            
        </div>
    )
}

const FotterLessonPrincipal = ({comprobation, submit}: {comprobation: Function, submit: Boolean}) => {
    return (
        <div className='flex justify-between p-4 w-3/5'>
            <div>   
                <Button
                    variant="outlined" 
                    color="error"
                    onClick={() => {
                        console.log('Nos regresamos')
                    }}
                >
                    SALIR

                </Button>
                
            </div>
        
            <div>
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => {
                        comprobation();
                    }}
                    disabled={!submit}
                >
                    COMPROBAR
                </Button>
            </div>
        </div>
    )
}