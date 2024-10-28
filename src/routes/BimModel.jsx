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
import ThatOpenTry from '../components/ThatOpenTry'
import React from 'react'

const btnList = [
  {
    id: 1,
    title: 'Models',
    tooltip: 'Models (Shift + m)',
    icon: <CubeIcon className="size-5" />,
    class: 'modal',
  },
  {
    id: 2,
    title: 'Scene explorer',
    tooltip: 'Scene explorer (Shift + e)',
    icon: <ShareIcon className="size-5" />,
    class: 'modal',
  },
  {
    id: 3,
    title: 'Discussions',
    tooltip: 'Discussions (Shift + t)',
    icon: <ChatBubbleBottomCenterTextIcon className="size-5" />,
    class: 'modal',
  },
  {
    id: 4,
    title: 'Measure mode',
    tooltip: 'Measure mode (Shift + r)',
    icon: <PencilIcon className="size-5" />,
    class: 'modal',
  },
  {
    id: 5,
    title: 'Views',
    tooltip: 'Views',
    icon: <SparklesIcon className="size-5" />,
    class: 'btn',
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
    class: 'btn',
  },
]

export default function BimModel() {
  const [btnActive, setBtnActive] = useState(1)

  const components = new OBC.Components()
  const fragments = components.get(OBC.FragmentsManager)
  const fragmentIfcLoader = components.get(OBC.IfcLoader)
  const worlds = components.get(OBC.Worlds)
  const world = worlds.create()
  BUI.Manager.init()

  async function loadWorld() {
    if (world.renderer == null) {
      const container = document.getElementById('bim-model-canvas')

      world.scene = new OBC.SimpleScene(components)
      world.renderer = new OBC.SimpleRenderer(components, container)
      world.camera = new OBC.SimpleCamera(components)
      world.scene.setup()
      await world.camera.controls.setLookAt(5, 5, 5, 0, 0, -10)

      components.init()
      world.camera.controls.distance = 70
      world.scene.three.background = new THREE.Color(0xf1f1f1)

      // const cullers = components.get(OBC.Cullers)
      // const culler = cullers.create(world)

      // culler.config.threshold = 200
      // culler.config.renderDebugFrame = true

      // const debugFrame = culler.renderer.domElement
      // document.body.appendChild(debugFrame)
      // debugFrame.style.position = 'fixed'
      // debugFrame.style.left = '0'
      // debugFrame.style.bottom = '0'
      // debugFrame.style.visibility = 'collapse'

      let grids = components.get(OBC.Grids)
      let grid = grids.create(world)

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
      world.camera.controls.dollyTo(25, true)

      // culler.add(model)

      // culler.needsUpdate = true
      // world.camera.controls.addEventListener('controlend', () => {
      //   culler.needsUpdate = true
      // })
      // if (propsBtnActive == 6) world.camera.controls.fitToBox(model)
      const btnContainer = document.getElementById('btn-container')
      const html = `
      
      `

      btnContainer.append()
      console.log(world.components.get())
    }
  }

  useEffect(() => {
    loadWorld()
  }, [])

  return (
    <div className="relative">
      <div className="min-w-min absolute top-4 left-4 flex gap-4">
        <div className="flex flex-col gap-2" id="btn-container">
          {btnList.map((btn, index) => (
            <button
              key={index}
              className={`tooltip w-12 h-12 flex items-center justify-center rounded-xl border z-20 tooltip-right transition ease-in-out duration-500 hover:translate-x-1 ${
                btnActive == btn.id
                  ? 'bg-secondary text-white'
                  : 'bg-white text-slate-800'
              }`}
              data-tip={btn.tooltip}
              onClick={() => setBtnActive(btn.id)}
              id={btn.id}
            >
              {btn.icon}
            </button>
          ))}
        </div>
        <div className="relative min-w-96">
          {btnList.map((btn, index) => (
            <div
              className={`card bg-base-100 w-96 shadow-xl absolute left-0 top-0 p-4 ${
                btnActive === btn.id
                  ? btn.class == 'btn'
                    ? 'invisible'
                    : 'visible'
                  : 'invisible'
              }`}
            >
              <div className="card-body p-0">
                <h2 className="card-title">{btn.title}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[90vh]" id="bim-model-canvas"></div>
    </div>
  )
}
