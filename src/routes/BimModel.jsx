import {
  CubeIcon,
  ArrowsPointingOutIcon,
  ShareIcon,
  SunIcon,
  SparklesIcon,
  ChatBubbleBottomCenterTextIcon,
  PencilIcon,
  ClockIcon,
  Square2StackIcon,
  Squares2X2Icon,
  CubeTransparentIcon,
  GlobeAsiaAustraliaIcon,
  KeyIcon,
  LinkIcon,
  PuzzlePieceIcon,
  ScissorsIcon,
  ArrowPathRoundedSquareIcon,
} from '@heroicons/react/24/outline'
import ThatOpen from '../components/ThatOpen'
import Stats from 'three/examples/jsm/libs/stats.module'
import * as BUI from '@thatopen/ui'
import * as OBC from '@thatopen/components'
import * as WEBIFC from 'web-ifc'
import * as THREE from 'three'
import * as OBCF from '@thatopen/components-front'
import { useEffect, useState } from 'react'
import { randInt } from 'three/src/math/MathUtils.js'
import { Link, Navigate, NavLink, useParams } from 'react-router-dom'
import ThatOpenTry from '../components/ThatOpenTry'
import React from 'react'

const btnList = [
  {
    id: 1,
    title: 'Models',
    tooltip: 'Models (Shift + m)',
    icon: <CubeIcon className="size-5" />,
    class: 'modal',
    child: <></>,
  },
  {
    id: 2,
    title: 'Scene explorer',
    tooltip: 'Scene explorer (Shift + e)',
    icon: <ShareIcon className="size-5" />,
    class: 'modal',
    child: <></>,
  },
  {
    id: 3,
    title: 'Discussions',
    tooltip: 'Discussions (Shift + t)',
    icon: <ChatBubbleBottomCenterTextIcon className="size-5" />,
    class: 'modal',
    child: <></>,
  },
  {
    id: 4,
    title: 'Measure mode',
    tooltip: 'Measure mode (Shift + r)',
    icon: <PencilIcon className="size-5" />,
    class: 'modal',
    child: <></>,
  },
  {
    id: 5,
    title: 'Views',
    tooltip: 'Views',
    icon: <SparklesIcon className="size-5" />,
    class: 'dropdown',
    child: (
      <>
        <li className="text-center" id="51">
          <a>Top</a>
        </li>
        <li className="text-center" id="52">
          <a>Front</a>
        </li>
        <li className="text-center" id="53">
          <a>Left</a>
        </li>
        <li className="text-center" id="54">
          <a>Back</a>
        </li>
        <li className="text-center" id="55">
          <a>Right</a>
        </li>
      </>
    ),
  },
  {
    id: 6,
    title: 'Fit to screen',
    tooltip: 'Fit to screen',
    icon: <ArrowsPointingOutIcon className="size-5" />,
    class: 'btn',
  },
  {
    id: 7,
    title: 'Light controls',
    tooltip: 'Light controls',
    icon: <SunIcon className="size-5" />,
    class: 'dropdown',
    child: (
      <>
        <li>
          <a>Top</a>
        </li>
        <li>
          <a>Front</a>
        </li>
        <li>
          <a>Left</a>
        </li>
        <li>
          <a>Back</a>
        </li>
        <li>
          <a>Right</a>
        </li>
      </>
    ),
  },
  {
    id: 8,
    title: 'Section box',
    tooltip: 'Section box',
    icon: <ScissorsIcon className="size-5" />,
    class: 'modal',
    child: (
      <div className="text-start">
        <h6>Double click : Create clipping plane</h6>
        <h6>Delete Key : Delete clipping plane</h6>
      </div>
    ),
  },
  {
    id: 9,
    title: 'Explode',
    tooltip: 'Explode',
    icon: <PuzzlePieceIcon className="size-5" />,
    class: 'btn',
  },
  {
    id: 10,
    title: 'Free orbit',
    tooltip: 'Free orbit',
    icon: <ArrowPathRoundedSquareIcon className="size-5" />,
    class: 'btn',
  },
]

export default function BimModel() {
  const [btnActive, setBtnActive] = useState(1)
  const [isClipper, setIsClipper] = useState(false)

  const components = new OBC.Components()
  const worlds = components.get(OBC.Worlds)
  const fragments = components.get(OBC.FragmentsManager)
  const fragmentIfcLoader = components.get(OBC.IfcLoader)
  const world = worlds.create()
  const casters = components.get(OBC.Raycasters)
  const clipper = components.get(OBC.Clipper)
  const measurements = components.get(OBC.MeasurementUtils)
  const shadows = components.get(OBCF.ShadowDropper)

  async function loadWorld() {
    if (world.renderer == null) {
      const container = document.getElementById('bim-model-canvas')
      world.scene = new OBC.SimpleScene(components)
      world.renderer = new OBCF.RendererWith2D(components, container)
      world.camera = new OBC.OrthoPerspectiveCamera(components)
      components.init()

      await world.camera.controls.setLookAt(5, 5, 5, 0, 0, -10)
      container.appendChild(world.renderer.three2D.domElement)

      // const grids = components.get(OBC.Grids)
      // grids.create(world).config.color.setHex(0xdddddd)

      world.scene.setup()
      world.camera.controls.distance = 70
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
      model.traverse((obj) => (obj.frustumCulled = false))
      world.scene.three.add(model)
      world.meshes.add(model)

      const caster = casters.get(world)

      clipper.enabled = true
      world.camera.controls.dollyTo(25, true)

      shadows.shadowExtraScaleFactor = 3
      shadows.shadowOffset = 0.1
      const shadowID = world.uuid
      shadows.create([model], shadowID, world)

      // button click action here

      let fitScreen = document
        .getElementById('btn-6')
        .addEventListener('click', () => {
          world.camera.controls.fitToSphere(model, true)
        })

      let SectionBox = document
        .getElementById('btn-8')
        .addEventListener('click', () => {
          container.ondblclick = () => {
            if (clipper.enabled) {
              clipper.create(world)
              clipper.config.size = 5
              clipper.config.color = new THREE.Color(0x65cc8a)
              setIsClipper(true)
            }
          }
        })

      let resetPlane = document
        .getElementById('resetPlane')
        .addEventListener('click', () => {
          if (clipper.enabled) {
            clipper.deleteAll()
            setIsClipper(false)
          }
        })

      const view = [51, 52, 53, 54, 55]
      view.map((i) => {
        document.getElementById(i).addEventListener('click', () => {
          if (i == 51)
            world.camera.controls.setLookAt(0, 30, -10, 0, 0, -10, true)
          else if (i == 52)
            world.camera.controls.setLookAt(0, 1, 15, 0, 0, -10, true)
          else if (i == 53)
            world.camera.controls.setLookAt(25, 2, -8, 0, 0, -10, true)
          else if (i == 54)
            world.camera.controls.setLookAt(0, 2, -35, 0, 0, -10, true)
          else world.camera.controls.setLookAt(-25, 0, -9, 0, 0, -10, true)
        })
      })

      world.camera.controls.addEventListener(
        'control',
        (e) => console.log(world.camera.controls.getPosition())
        // console.log(world.camera.controls.getTarget())
      )
    }
  }

  window.onkeydown = (event) => {
    event = event || window.event
    if (event.shiftKey) {
      switch (event.keyCode) {
        case 77: // shift + m
          setBtnActive(1)
          break
        case 69: // shift + e
          setBtnActive(2)
          break
        case 84: // shift + t
          setBtnActive(3)
          break
        case 82: // shift + r
          setBtnActive(4)
          break
      }
    }
  }

  useEffect(() => {
    loadWorld()
  }, [])

  useEffect(() => {
    console.log(isClipper)
  }, [isClipper])

  return (
    <div className="relative" id="bim-wrapper">
      <div className="min-w-min absolute top-4 left-4 flex gap-4">
        <div className="flex flex-col gap-2" id="btn-container">
          {btnList.map((btn, index) => {
            if (btn.class != 'dropdown') {
              return (
                <button
                  key={index}
                  className={`tooltip w-10 h-10 flex items-center justify-center rounded-xl border z-20 tooltip-right transition ease-in-out duration-500 hover:translate-x-1 ${
                    btnActive == btn.id
                      ? 'bg-secondary text-white'
                      : 'bg-white text-slate-800'
                  }`}
                  data-tip={btn.tooltip}
                  onClick={() => setBtnActive(btn.id)}
                  id={`btn-${btn.id}`}
                >
                  {btn.icon}
                </button>
              )
            } else {
              return (
                <div className="dropdown dropdown-right">
                  <button
                    key={index}
                    tabIndex={0}
                    className={`tooltip w-10 h-10 flex items-center justify-center rounded-xl border z-20 tooltip-right transition ease-in-out duration-500 hover:translate-x-1 ${
                      btnActive == btn.id
                        ? 'bg-secondary text-white'
                        : 'bg-white text-slate-800'
                    }`}
                    data-tip={btn.tooltip}
                    onClick={() => setBtnActive(btn.id)}
                    id={`btn-${btn.id}`}
                  >
                    {btn.icon}
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content ms-4 menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    {btn.child}
                  </ul>
                </div>
              )
            }
          })}
        </div>
        <div className="relative min-w-96">
          {btnList.map((btn, index) => (
            <div
              className={`card bg-base-100 w-96 shadow-xl absolute left-0 top-0 p-4 ${
                btnActive === btn.id
                  ? btn.class == 'btn'
                    ? 'invisible'
                    : btn.class == 'dropdown'
                    ? 'invisible'
                    : 'visible'
                  : 'invisible'
              }`}
            >
              <div className="card-body p-0">
                <h2 className="card-title">{btn.title}</h2>
                {btn.child}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[90vh]" id="bim-model-canvas"></div>
      <button
        className={`btn btn-primary text-white absolute bottom-10 left-1/2 -translate-x-1/2 py-2 ${
          isClipper ? 'visible' : 'invisible'
        }`}
        id="resetPlane"
      >
        Delete Plane
      </button>
    </div>
  )
}
