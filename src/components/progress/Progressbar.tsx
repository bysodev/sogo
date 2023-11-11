export const Progressbar = ({porcentaje}: {porcentaje: number}) => {

    // let wid = `h-5 bg-slate-600 w-${porcentaje}`

    return (
    <div className='w-4/5 mt-6'>
        <h6 className='text-center'>Progress</h6>
        <div className="mb-6 h-px w-full bg-neutral-200 dark:bg-neutral-600">
            <div className="h-px bg-primary w-1/4"></div>
        </div>
        <div className="mb-6 h-5 w-full bg-neutral-200 dark:bg-neutral-600">
            {/* <div className={`h-5 bg-slate-600 w-${porcentaje}`}></div> */}
            <div className='h-5 bg-slate-600' style={{width: `${porcentaje}%`}} ></div>
        </div>
    </div>
    );
}