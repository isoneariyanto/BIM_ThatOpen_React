import { CubeIcon } from '@heroicons/react/24/outline'

export default function BimModel() {
  return (
    <div className="flex w-full h-full relative">
      <div className="w-3/12 absolute top-4 left-4 border h-screen">
        <button
          className="tooltip w-12 h-12 flex items-center justify-center rounded-md border bg-info text-white z-20 tooltip-right transition ease-in-out duration-300 hover:-translate-y-1"
          data-tip="Models (Shift+m)"
        >
          <CubeIcon className="size-5" />
        </button>
      </div>
      <div
        className="w-full h-screen border border-error"
        id="bim-model-canvas"
      ></div>
    </div>
  )
}
