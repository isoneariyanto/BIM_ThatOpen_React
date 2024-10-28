import {
  CubeIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  Square2StackIcon,
  Squares2X2Icon,
  CubeTransparentIcon,
  GlobeAsiaAustraliaIcon,
  KeyIcon,
  LinkIcon,
} from '@heroicons/react/24/outline'
import ThatOpen from '../components/ThatOpen'
import Stats from 'three/examples/jsm/libs/stats.module'
import * as BUI from '@thatopen/ui'
import * as OBC from '@thatopen/components'
import * as WEBIFC from 'web-ifc'
import * as THREE from 'three'
import { useEffect, useState } from 'react'
import { randInt } from 'three/src/math/MathUtils.js'
import { Link, Navigate, NavLink, useParams } from 'react-router-dom'

export default function DetailProject() {
  const [tabActive, setTabActive] = useState('models')
  const [settingTabActive, setSettingTabActive] = useState('general')

  const [isLoading, setIsLoading] = useState(true)

  async function loadWorld(pos) {
    const components = new OBC.Components()
    const fragments = components.get(OBC.FragmentsManager)
    const fragmentIfcLoader = components.get(OBC.IfcLoader)
    const worlds = components.get(OBC.Worlds)
    const world = worlds.create()
    if (world.renderer == null) {
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
  ]

  const tabEvent = (e) => {
    e.preventDefault()
    const act = e.target.innerText.toLowerCase()
    setTabActive(act)
  }
  const settingTabEvent = (e) => {
    e.preventDefault()
    const act = e.target.innerText.toLowerCase()
    setSettingTabActive(act)
  }

  return (
    <div className="grid grid-flow-row grid-col-12 p-10 gap-4">
      <div className="text-start flex justify-between items-center gap-2 col-span-12">
        <h1 className="text-xl font-medium w-1/2">
          Projects{' '}
          <p className="text-base font-normal text-slate-500">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae
            corporis, maiores, temporibus officia rerum alias, eius quaerat quam
            esse molestias culpa.
          </p>
        </h1>
        <div className="flex items-center gap-2">
          <h6 className="badge badge-outline">Iswan Ari .Y</h6>
          <div className="avatar">
            <div className="mask mask-hexagon w-10">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
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
                <a>Copy Link</a>
              </li>
              <li>
                <a>Move Project</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Tabs Nav */}
      <div className="col-span-12 border-b mt-4">
        <div
          role="tablist"
          className="tabs tabs-bordered w-fit font-medium gap-4"
        >
          <a
            role="tab"
            className={`tab px-2 gap-4 ${
              tabActive == 'models'
                ? 'tab-active text-secondary !border-blue-500 !border-b-[3px]'
                : '!border-b-0'
            }`}
            onClick={tabEvent}
          >
            <span>Models</span>
            <div className="badge badge-secondary text-xs p-2">6</div>
          </a>
          <a
            role="tab"
            className={`tab px-2 gap-4 ${
              tabActive == 'discussions'
                ? 'tab-active text-secondary !border-blue-500 !border-b-[3px]'
                : '!border-b-0'
            }`}
            onClick={tabEvent}
          >
            <span>Discussions</span>
          </a>
          <a
            role="tab"
            className={`tab px-2 gap-4 ${
              tabActive == 'settings'
                ? 'tab-active text-secondary !border-blue-500 !border-b-[3px]'
                : '!border-b-0'
            }`}
            onClick={tabEvent}
          >
            <span>Settings</span>
          </a>
        </div>
      </div>

      {/* Tabs Content */}
      <h1 className="col-span-4 text-start text-xl font-medium">
        {tabActive == 'models'
          ? 'Models'
          : tabActive == 'discussions'
          ? 'Discussions'
          : 'Settings'}
      </h1>
      {tabActive == 'models' ? (
        <>
          <div className="flex col-span-6 gap-2">
            <label className="input input-sm input-bordered flex items-center gap-2 grid-span w-1/3">
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
            <select className="select select-sm select-bordered w-1/3">
              <option disabled selected>
                All Members
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
            <select className="select select-sm select-bordered w-1/3">
              <option disabled selected>
                All Sources
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
          <div className="flex justify-end col-span-2 gap-2">
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
          {/* Models Content */}
          <div className="col-span-12 flex gap-4 mt-4">
            {bimData.map((i) =>
              i.child.map((d) => (
                <div className="card w-1/3 p-0" key={d.id}>
                  <div className="card bg-base-100 w-full p-0 text-start border">
                    <div className="card-body p-6">
                      <h1 className="card-title w-full justify-between">
                        <Link to={`models/${d.id}`}>{d.title}</Link>
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
              ))
            )}
          </div>
        </>
      ) : tabActive == 'discussions' ? (
        ''
      ) : (
        <div className="flex w-full gap-4 justify-end col-span-12 mt-4">
          {/* Setting Tabs */}
          <ul className="menu bg-base-200 rounded-box w-2/12 bg-transparent gap-2">
            <li>
              <a
                className={`text-start ${
                  settingTabActive == 'general' ? 'active' : ''
                }`}
                data-tip="Home"
                onClick={settingTabEvent}
              >
                General
              </a>
            </li>
            <li>
              <a
                className={`text-start ${
                  settingTabActive == 'collaborators' ? 'active' : ''
                }`}
                data-tip="Details"
                onClick={settingTabEvent}
              >
                Collaborators
              </a>
            </li>
            <li>
              <a
                className={`text-start ${
                  settingTabActive == 'webhooks' ? 'active' : ''
                }`}
                data-tip="Stats"
                onClick={settingTabEvent}
              >
                Webhooks
              </a>
            </li>
          </ul>
          {/* Setting Tab Contents */}
          <div className="w-10/12 flex flex-col gap-4">
            {settingTabActive == 'general' ? (
              <>
                <div className="card bg-base-100 w-full border p-0">
                  <div className="card-body">
                    <h2 className="card-title">Project info</h2>
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text font-medium">
                          Project name
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                      />
                    </label>
                    <label className="form-control">
                      <div className="label">
                        <span className="label-text font-medium">
                          Project description (optional)
                        </span>
                      </div>
                      <textarea
                        className="textarea textarea-bordered h-24"
                        placeholder="Bio"
                      ></textarea>
                    </label>
                    <div className="card-actions justify-end mt-4">
                      <button className="btn btn-base-300">Cancel</button>
                      <button className="btn btn-secondary">Update</button>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-100 w-full border p-0">
                  <div className="card-body">
                    <h2 className="card-title">Access</h2>
                    <p className="text-base text-start">
                      Choose how you want to share this project with others.
                    </p>
                    <div className="flex gap-2">
                      <div className="card border w-1/3 p-0 relative">
                        <div className="card-body p-4">
                          <GlobeAsiaAustraliaIcon className="size-8" />
                          <h2 className="card-title mt-2">Discoverable</h2>
                          <p className="text-base text-start">
                            Project is visible to everyone
                          </p>
                          <div className="form-control absolute top-4 right-4">
                            <label className="cursor-pointer label">
                              <input
                                type="checkbox"
                                defaultChecked
                                className="checkbox checkbox-secondary"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="card border w-1/3 p-0 relative">
                        <div className="card-body p-4">
                          <LinkIcon className="size-8" />
                          <h2 className="card-title mt-2">Link shareable</h2>
                          <p className="text-base text-start">
                            Anyone with the link can view
                          </p>
                          <div className="form-control absolute top-4 right-4">
                            <label className="cursor-pointer label">
                              <input
                                type="checkbox"
                                className="checkbox checkbox-secondary"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="card border w-1/3 p-0 relative">
                        <div className="card-body p-4">
                          <KeyIcon className="size-8" />
                          <h2 className="card-title mt-2">Private</h2>
                          <p className="text-base text-start">
                            Onli collaborators can access
                          </p>
                          <div className="form-control absolute top-4 right-4">
                            <label className="cursor-pointer label">
                              <input
                                type="checkbox"
                                className="checkbox checkbox-secondary"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-100 w-full border p-0">
                  <div className="card-body">
                    <h2 className="card-title">Discussions</h2>
                    <p className="text-base text-start">
                      Control who can leave comments on this project.
                    </p>
                    <div className="flex gap-2">
                      <div className="card border w-1/2 p-0 relative">
                        <div className="card-body p-4">
                          <GlobeAsiaAustraliaIcon className="size-8" />
                          <h2 className="card-title mt-2">Anyone</h2>
                          <p className="text-base text-start">
                            Anyone can comment
                          </p>
                          <div className="form-control absolute top-4 right-4">
                            <label className="cursor-pointer label">
                              <input
                                type="checkbox"
                                defaultChecked
                                className="checkbox checkbox-secondary"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="card border w-1/2 p-0 relative">
                        <div className="card-body p-4">
                          <LinkIcon className="size-8" />
                          <h2 className="card-title mt-2">Collaborators</h2>
                          <p className="text-base text-start">
                            Only collaborators can comment
                          </p>
                          <div className="form-control absolute top-4 right-4">
                            <label className="cursor-pointer label">
                              <input
                                type="checkbox"
                                className="checkbox checkbox-secondary"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-100 w-full border p-0">
                  <div className="card-body">
                    <h2 className="card-title mb-4">Delete project</h2>
                    <div role="alert" className="alert">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-info h-6 w-6 shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span>
                        Permanently delete this project and all of its content
                        from the Speckle platform. This action is not
                        reversible.
                      </span>
                      <div>
                        <button className="btn btn-sm">Deny</button>
                        <button className="btn btn-sm btn-primary ms-4">
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : setTabActive == 'collaborators' ? (
              <></>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
