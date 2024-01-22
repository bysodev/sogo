export const Striped = ({progreso, puntos, total}: {progreso: number, puntos: any, total: any}) => {
  console.log('Este es el progreso' + progreso)
    return <div className="flex w-full justify-between">
      <div className="w-4/5 m-auto">
        <span
          className="block rounded-full bg-gray-200"
        >
          <span
            className={`block h-3 rounded-full bg-[repeating-linear-gradient(45deg,_var(--tw-gradient-from)_0,_var(--tw-gradient-from)_20px,_var(--tw-gradient-to)_20px,_var(--tw-gradient-to)_40px)] from-indigo-400 to-indigo-500`}
            style={{ width: progreso + '%' }}
            // style ="width: 75%"
          ></span>
        </span>
      </div>
      <div className="w-1/5 items-center">
        <span>{puntos} / {total}</span>
      </div>
  </div>
}