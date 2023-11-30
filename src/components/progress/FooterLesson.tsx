'use client'

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
                        <button
                            onClick={() => {
                                changeContinue();
                            }}
                            type="button"
                            className="px-6 pb-2 pt-2.5 inline-block bg-green-600 shadow-sm rounded-full bg-primary text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out">
                            CONTINUAR
                        </button>
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
                <button
                    onClick={() => {
                    console.log('Nos regresamos')
                    }}
                    type="button"
                    className="px-6 pb-2 pt-2.5 inline-block bg-slate-500 shadow-sm rounded-full bg-primary text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out">
                    SALIR
                </button>
            </div>
        
            <div>
                <button
                    onClick={() => {
                        comprobation();
                    }}
                    type="button"
                    className="px-6 pb-2 pt-2.5 inline-block bg-green-600 shadow-sm rounded-full bg-primary text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out"
                    disabled={!submit}
                >
                    COMPROBAR
                </button>
            </div>
        </div>
    )
}