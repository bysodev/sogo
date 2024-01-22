export const Striped = ({progreso}: {progreso: number}) => {
    return <div>
    <span id="ProgressLabel" className="sr-only">Loading</span>
  
    <span
      className="block rounded-full bg-gray-200"
    >
      <span
        className="block h-3 rounded-full bg-[repeating-linear-gradient(45deg,_var(--tw-gradient-from)_0,_var(--tw-gradient-from)_20px,_var(--tw-gradient-to)_20px,_var(--tw-gradient-to)_40px)] from-indigo-400 to-indigo-500"
        style={{ width: progreso }}
        // style ="width: 75%"
      ></span>
    </span>
  </div>
}