import {
  CubeIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  Square2StackIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'
import ThatOpen from '../components/ThatOpen'
import Stats from 'three/examples/jsm/libs/stats.module'
import * as BUI from '@thatopen/ui'
import * as OBC from '@thatopen/components'
import * as WEBIFC from 'web-ifc'
import * as THREE from 'three'
import { useEffect, useState } from 'react'
import { randInt } from 'three/src/math/MathUtils.js'
import { Link, Navigate, NavLink } from 'react-router-dom'

const bimData = [
  {
    id: 1,
    title: 'Dekson',
    desc: 'If a dog chews shoes whose shoes does he choose?',
    modelCount: 3,
    link: '1',
    child: [
      {
        id: randInt(1, 50),
        title: 'Dekson',
        commentCount: 3,
        link: 'https://',
        updateAt: 'Aug 25',
        clock: 12,
      },
      {
        id: randInt(1, 50),
        title: 'Dekson Door Handle',
        commentCount: 5,
        link: 'https://',
        updateAt: 'Jul 02',
        clock: 2,
      },
      {
        id: randInt(1, 50),
        title: 'Dekson Door Handle',
        commentCount: 5,
        link: 'https://',
        updateAt: 'Jul 02',
        clock: 2,
      },
    ],
  },
  {
    id: 2,
    title: 'Dekson',
    desc: 'If a dog chews shoes whose shoes does he choose?',
    modelCount: 6,
    link: '2',
    child: [
      {
        id: randInt(1, 50),
        title: 'Dekson',
        commentCount: 3,
        link: 'https://',
        updateAt: 'Aug 25',
        clock: 12,
      },
      {
        id: randInt(1, 50),
        title: 'Dekson Door Handle',
        commentCount: 5,
        link: 'https://',
        updateAt: 'Jul 02',
        clock: 2,
      },
    ],
  },
]

export default function Project({}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(
      () =>
        bimData.map((it) => {
          it.child.map((d) => {
            loadWorld(d.id)
            setIsLoading(false)
          })
        }),
      1000
    )
  })

  async function loadWorld(pos) {
    if (world.renderer == null) {
      const components = new OBC.Components()
      const fragments = components.get(OBC.FragmentsManager)
      const fragmentIfcLoader = components.get(OBC.IfcLoader)
      const worlds = components.get(OBC.Worlds)
      const world = worlds.create()
      const container = document.getElementById('canvas-container-' + pos)
      world.scene = new OBC.SimpleScene(components)
      world.renderer = new OBC.SimpleRenderer(components, container)
      world.camera = new OBC.SimpleCamera(components)
      components.init()

      world.camera.controls.distance = 50
      world.camera.controls.setLookAt(5, 5, 5, 0, 0, -10)
      world.scene.setup()

      world.scene.three.background = new THREE.Color(0xf1f1f1)
      await fragmentIfcLoader.setup()
      const excludedCats = [
        WEBIFC.IFCTENDONANCHOR,
        WEBIFC.IFCREINFORCINGBAR,
        WEBIFC.IFCREINFORCINGELEMENT,
      ]

      for (const cat of excludedCats) {
        fragmentIfcLoader.settings.excludedCategories.add(cat)
      }
      fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true

      const file = await fetch(
        'https://thatopen.github.io/engine_components/resources/small.ifc'
      )
      const data = await file.arrayBuffer()
      const buffer = new Uint8Array(data)
      const model = await fragmentIfcLoader.load(buffer)
      model.name = 'example'
      world.scene.three.add(model)
      world.camera.controls.dollyTo(20, true)
    }
  }

  return (
    <div className="grid grid-flow-row grid-col-8 p-10 gap-4">
      <h1 className="text-start flex items-center gap-2 col-span-8 text-xl font-medium">
        <CubeIcon className="size-6" />
        Projects
      </h1>
      <label className="input input-sm input-bordered flex items-center gap-2 grid-span">
        <input type="text" className="grow" placeholder="Search" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <select className="select select-sm select-bordered w-full max-w-xs">
        <option disabled selected>
          Who shot first?
        </option>
        <option>Han Solo</option>
        <option>Greedo</option>
      </select>
      <div className="col-span-6 text-end">
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => document.getElementById('my_modal_1').showModal()}
        >
          New Project
        </button>
        <dialog id="my_modal_1" className="modal text-start">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Create a new project</h3>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Project name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  Project description (optional)
                </span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Description"
              ></textarea>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Access permissions</span>
              </div>
              <select className="select select-bordered">
                <option>Discoverable</option>
                <option>Link shareable</option>
                <option>Private</option>
              </select>
            </label>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn py-1 px-6">Cancel</button>
              </form>
              <button className="btn py-1 px-6 btn-primary">Create</button>
            </div>
          </div>
        </dialog>
      </div>
      {bimData.map((i) => (
        <div
          className="card bg-base-100 col-span-8 p-2 w-full shadow-xl border mt-4"
          key={i.id}
        >
          <div className="card-body flex items-start justify-start flex-row gap-8">
            <div className="w-3/12 h-full flex flex-col justify-between">
              <div className="text-start">
                <h2 className="card-title">{i.title}</h2>
                <p>{i.desc}</p>
              </div>
              <div className="card-actions">
                <Link
                  to={i.link}
                  className="border py-1 px-2 rounded-md hover:shadow text-sm w-fit bg-white"
                >
                  {i.modelCount} Models &gt;
                </Link>
              </div>
            </div>
            <div className="w-9/12 flex gap-4 justify-end">
              {i.child.map((d) => (
                <div className="card w-1/3 p-0" key={d.id}>
                  <div className="card bg-base-100 w-full p-0 text-start border">
                    <div className="card-body p-6">
                      <h1 className="card-title w-full justify-between">
                        <Link to={`${i.link}/models/${d.id}`}>{d.title}</Link>
                        <div className="dropdown dropdown-end">
                          <button
                            tabIndex={0}
                            className="border p-2 rounded-md hover:shadow text-sm w-fit bg-white"
                          >
                            <Squares2X2Icon className="size-5" />
                          </button>
                          <ul
                            tabIndex={0}
                            className="dropdown-content border mt-2 menu bg-base-100 rounded-md z-[1] w-52 p-2 shadow"
                          >
                            <li>
                              <a>Edit model</a>
                            </li>
                            <li>
                              <a>View versions</a>
                            </li>
                            <li>
                              <a>Upload new version</a>
                            </li>
                            <li>
                              <a>Copy link</a>
                            </li>
                            <li>
                              <a>Copy ID</a>
                            </li>
                            <li>
                              <a>Embed model</a>
                            </li>
                            <li>
                              <a>Delete</a>
                            </li>
                          </ul>
                        </div>
                      </h1>
                      <div className="card border p-0 my-2">
                        <div className="card-body p-0 overflow-hidden rounded-xl">
                          <div
                            className="w-full h-48 relative bg-[#f1f1f1]"
                            id={`canvas-container-${d.id}`}
                          >
                            {isLoading ? (
                              <span className="loading loading-dots absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading-lg"></span>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="card-actions justify-between">
                        <p>Updated on {d.updateAt}</p>
                        <div className="flex gap-4">
                          <span className="flex items-center gap-2">
                            <ChatBubbleBottomCenterTextIcon className="size-5" />
                            {d.commentCount}
                          </span>
                          <span className="flex items-center gap-2">
                            <ClockIcon className="size-5" />
                            {d.clock}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
