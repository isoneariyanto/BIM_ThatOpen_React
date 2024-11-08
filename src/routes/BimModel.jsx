import {
  CubeIcon,
  ArrowsPointingOutIcon,
  ShareIcon,
  SunIcon,
  SparklesIcon,
  ChatBubbleBottomCenterTextIcon,
  PencilIcon,
  TrashIcon,
  PuzzlePieceIcon,
  ScissorsIcon,
  ArrowPathRoundedSquareIcon,
  PlusIcon,
  BarsArrowDownIcon,
} from '@heroicons/react/24/outline'
import ThatOpen from '../components/ThatOpen'
import Stats from 'three/examples/jsm/libs/stats.module'
import * as CUI from '@thatopen/ui-obc'
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
import { ArrowTurnDownRightIcon } from '@heroicons/react/24/solid'

export default function BimModel() {
  const [btnActive, setBtnActive] = useState(1)
  const [isClipper, setIsClipper] = useState(false)
  const [freeOrbit, setFreeOrbit] = useState(0)
  const [fitScreen, setFitScreen] = useState(0)
  const [measurementType, setMeasurementType] = useState('')

  const btnList = [
    {
      id: 1,
      title: 'Models',
      tooltip: 'Models (Shift + m)',
      icon: <CubeIcon className="size-5" />,
      class: 'modal',
      child: (
        <>
          <button className="rounded-lg border absolute top-0 right-0 w-7 h-7 flex items-center justify-center w-fit bg-secondary text-white">
            <PlusIcon className="size-4" />
          </button>
          <div className="flex gap-4 border-t p-2">
            <div className="avatar">
              <div className="mask mask-hexagon w-8">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <h6 className="flex flex-col text-start text-base font-medium">
              Dekson Door Handle
              <span className="text-sm font-normal">Latest version</span>
            </h6>
          </div>
        </>
      ),
    },
    {
      id: 2,
      title: 'Scene explorer',
      tooltip: 'Scene explorer (Shift + e)',
      icon: <ShareIcon className="size-5" />,
      class: 'modal',
      child: (
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-2">
            <label className="input input-bordered input-sm flex items-center gap-2 w-full">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                // id="sceneSearch"
              />
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
          </div>
          <div
            id="scene-content"
            className="col-span-5 max-h-96 overflow-y-auto"
          ></div>
        </div>
      ),
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
      child: (
        <div className="flex flex-col items-center">
          <div role="alert" className="alert p-1 rounded-md text-sm ">
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
            <span>Reloading will delete all measurements</span>
          </div>
          <div className="flex flex-col mt-4">
            <h6 className="text-start">Measurement Type</h6>
            <div className="form-control">
              <label className="label cursor-pointer flex justify-start gap-4">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio radioMeasurement checked:bg-blue-500 radio-sm"
                  id="area"
                />
                <h6 className="label-text flex flex-col items-start">
                  <span className="text-base font-medium">Area</span>
                  <span className="text-xs text-slate-400 text-start">
                    Choose two or more points for precise measurements
                  </span>
                </h6>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer flex justify-start gap-4">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio radioMeasurement checked:bg-blue-500 radio-sm"
                  id="angle"
                />
                <h6 className="label-text flex flex-col items-start">
                  <span className="text-base font-medium">Angle</span>
                  <span className="text-xs text-slate-400 text-start">
                    Choose two or more points for precise measurements
                  </span>
                </h6>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer flex justify-start gap-4">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio radioMeasurement checked:bg-blue-500 radio-sm"
                  id="edge"
                />
                <h6 className="label-text flex flex-col items-start">
                  <span className="text-base font-medium">Edge</span>
                  <span className="text-xs text-slate-400 text-start">
                    Choose the edge to capture measurement
                  </span>
                </h6>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer flex justify-start gap-4">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio radioMeasurement checked:bg-blue-500 radio-sm"
                  id="face"
                />
                <h6 className="label-text flex flex-col items-start">
                  <span className="text-base font-medium">Face</span>
                  <span className="text-xs text-slate-400 text-start">
                    Choose one or more side of building to capture measurement
                  </span>
                </h6>
              </label>
            </div>
          </div>
          <button
            className="p-2 rounded text-[#cc0808] flex gap-4 mt-6 justify-center w-fit border rounded-lg"
            id="deleteMeasurement"
          >
            <TrashIcon className="size-5" />
            <span className="text-sm">Delete all measurements</span>
          </button>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Views',
      tooltip: 'Views',
      icon: <SparklesIcon className="size-5" />,
      class: 'dropdown',
      child: (
        <ul
          tabIndex={0}
          className="dropdown-content ms-4 menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
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
        </ul>
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
      class: 'modal',
      child: (
        <div className="h-96 overflow-x-hidden overflow-y-auto pr-4">
          <div className="form-control w-full border-y py-2">
            <h6 className="text-sm font-bold">- GAMMA -</h6>
            <label className="label cursor-pointer justify-start mt-2 p-0 gap-2">
              <input
                type="checkbox"
                className="toggle toggle-secondary toggle-sm"
                id="gammaCorrection"
              />
              <span className="label-text">Gamma Correction</span>
            </label>
          </div>
          <div className="form-control w-full border-b py-2">
            <h6 className="text-sm font-bold">- CUSTOM EFFECT - </h6>
            <label className="label cursor-pointer p-0 justify-start mt-2 gap-2">
              <input
                type="checkbox"
                className="toggle toggle-secondary toggle-sm"
                id="ce"
              />
              <span className="label-text">Custom Effect</span>
            </label>
            <label className="label cursor-pointer p-0 justify-start mt-2 gap-2">
              <input
                type="checkbox"
                className="toggle toggle-secondary toggle-sm"
                id="ceGammaCorrection"
              />
              <span className="label-text">Gamma Correction</span>
            </label>
            <div className="flex gap-4 justify-between mt-2">
              <input
                type="range"
                min={0}
                max="1"
                step={0.01}
                defaultValue="0"
                className="range w-7/12  range-secondary range-xs"
                id="opacity"
              />
              <span className="text-sm w-auto ">Opacity</span>
            </div>
            <div className="flex gap-4 justify-between mt-2">
              <input
                type="range"
                min={0}
                max="6"
                step={0.1}
                defaultValue="0"
                className="range w-7/12  range-secondary range-xs"
                id="tolerance"
              />
              <span className="text-sm w-auto ">Tolerance</span>
            </div>
            <div className="flex gap-4 justify-between mt-2">
              <input
                type="range"
                min={0}
                max="5"
                step={0.1}
                defaultValue="0"
                className="range w-7/12  range-secondary range-xs"
                id="glossExponent"
              />
              <span className="text-sm w-auto ">Gloss exponent</span>
            </div>
            <div className="flex gap-4 justify-between mt-2">
              <input
                type="range"
                min={-2}
                max="2"
                step={0.05}
                defaultValue="0"
                className="range w-7/12  range-secondary range-xs"
                id="maxGloss"
              />
              <span className="text-sm w-auto ">Max gloss</span>
            </div>
            <div className="flex gap-4 justify-between mt-2">
              <input
                type="range"
                min={-2}
                max="2"
                step={0.05}
                defaultValue="-2"
                className="range w-7/12  range-secondary range-xs"
                id="minGloss"
              />
              <span className="text-sm w-auto ">Min gloss</span>
            </div>
          </div>
          <div className="form-control w-full py-2">
            <h6 className="text-sm font-bold">- AMBIENT OCLUSSION - </h6>
            <label className="label cursor-pointer p-0 justify-start mt-2 gap-2">
              <input
                type="checkbox"
                className="toggle toggle-secondary toggle-sm"
                id="aoEnabled"
              />
              <span className="label-text">AO enabled</span>
            </label>
            <label className="label cursor-pointer p-0 justify-start mt-2 gap-2">
              <input
                type="checkbox"
                className="toggle toggle-secondary toggle-sm"
                id="halfResolution"
              />
              <span className="label-text">Half resolution</span>
            </label>
            <label className="label cursor-pointer p-0 justify-start mt-2 gap-2">
              <input
                type="checkbox"
                className="toggle toggle-secondary toggle-sm"
                id="screenSpaceRadius"
              />
              <span className="label-text">Screen space radius</span>
            </label>
            <div className="flex gap-4 justify-between mt-2">
              <input
                type="range"
                min={1}
                max="16"
                step={1}
                defaultValue="1"
                className="range w-7/12  range-secondary range-xs"
                id="aoSamples"
              />
              <span className="text-sm w-auto ">AO Samples</span>
            </div>
            <div className="flex gap-4 justify-between mt-2">
              <input
                type="range"
                min={1}
                max="16"
                step={1}
                defaultValue="7"
                className="range w-7/12  range-secondary range-xs"
                id="denoiseSamples"
              />
              <span className="text-sm w-auto ">Denoise Samples</span>
            </div>
            <div className="flex gap-4 justify-between mt-2">
              <input
                type="range"
                min={0}
                max="16"
                step={1}
                defaultValue="9"
                className="range w-7/12  range-secondary range-xs"
                id="aoRadius"
              />
              <span className="text-sm w-auto ">AO Radius</span>
            </div>
            <div className="flex gap-4 justify-between mt-2">
              <input
                type="range"
                min={0}
                max="100"
                step={1}
                defaultValue="30"
                className="range w-7/12  range-secondary range-xs"
                id="denoiseRadius"
              />
              <span className="text-sm w-auto ">Denoise Radius</span>
            </div>
            <div className="flex gap-4 justify-between mt-2">
              <input
                type="range"
                min={0}
                max="16"
                step={1}
                defaultValue="4"
                className="range w-7/12  range-secondary range-xs"
                id="distanceFalloff"
              />
              <span className="text-sm w-auto ">Distance falloff</span>
            </div>
            <div className="flex gap-4 justify-between mt-2">
              <input
                type="range"
                min={0}
                max="16"
                step={1}
                defaultValue="9"
                className="range w-7/12  range-secondary range-xs"
                id="intensity"
              />
              <span className="text-sm w-auto ">Intensity</span>
            </div>
          </div>
        </div>
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
          <h6>Delete button : Delete clipping plane</h6>
        </div>
      ),
    },
    {
      id: 9,
      title: 'Explode',
      tooltip: 'Explode (Ongoing Feature)',
      icon: <PuzzlePieceIcon className="size-5" />,
      class: 'dropdown',
      child: (
        <ul
          tabIndex={0}
          className="dropdown-content ms-4 menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <div className="flex gap-4">
            <input
              type="range"
              min={0}
              max="100"
              step={1}
              defaultValue={0}
              id="intensity"
              className="range range-success range-sm"
            />
            <h6>Intensity</h6>
          </div>
        </ul>
      ),
    },
    {
      id: 10,
      title: 'Free orbit',
      tooltip: 'Free orbit',
      icon: <ArrowPathRoundedSquareIcon className="size-5" />,
      class: 'btn',
    },
  ]

  const components = new OBC.Components()
  const worlds = components.get(OBC.Worlds)

  const fragmentsManager = components.get(OBC.FragmentsManager)
  const fragmentIfcLoader = components.get(OBC.IfcLoader)
  const world = worlds.create()
  const casters = components.get(OBC.Raycasters)
  const clipper = components.get(OBC.Clipper)
  const measurements = components.get(OBC.MeasurementUtils)
  const shadows = components.get(OBCF.ShadowDropper)
  const area = components.get(OBCF.AreaMeasurement)
  const edge = components.get(OBCF.EdgeMeasurement)
  const face = components.get(OBCF.FaceMeasurement)
  const angles = components.get(OBCF.AngleMeasurement)
  const grids = components.get(OBC.Grids)
  const highlighter = components.get(OBCF.Highlighter)
  const indexer = components.get(OBC.IfcRelationsIndexer)

  async function loadWorld() {
    if (world.renderer == null) {
      const container = document.getElementById('bim-model-canvas')
      world.scene = new OBC.SimpleScene(components)

      world.renderer = new OBCF.PostproductionRenderer(components, container)

      world.camera = new OBC.OrthoPerspectiveCamera(components)

      components.init()

      await world.camera.controls.setLookAt(5, 5, 5, 0, 0, -10)
      container.appendChild(world.renderer.three.domElement)
      world.scene.setup()

      world.scene.three.background = new THREE.Color(0xf1f1f1)
      world.camera.controls.distance = 70

      world.camera.controls.setLookAt(0, 1, 15, 0, 0, -10, true)

      world.camera.controls.maxPolarAngle = 1.55
      const grid = grids.create(world)
      grid.config.visible = false

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

      let model = null
      setTimeout(async () => {
        const file = await fetch(
          'https://thatopen.github.io/engine_components/resources/small.ifc'
        )
        const data = await file.arrayBuffer()
        const buffer = new Uint8Array(data)
        model = await fragmentIfcLoader.load(buffer)
        model.name = 'Small Ifc'
        model.traverse((obj) => {
          obj.frustumCulled = false
        })
        world.scene.three.add(model)
        world.meshes.add(model)
        world.camera.controls.dollyTo(25, true)
      }, 1000)

      // highlight
      highlighter.setup({ world })
      highlighter.enabled = true
      highlighter.zoomToSelection = true
      highlighter.multiple = 'shiftKey'

      const [propertiesTable, updatePropertiesTable] =
        CUI.tables.elementProperties({
          components,
          fragmentIdMap: {},
        })
      const [relationsTree] = CUI.tables.relationsTree({
        components,
        models: [],
      })
      const info = document.getElementById('info-container')
      const element = document.getElementById('elementProp')
      const entity = document.getElementById('entityProp')
      const mainLayout = document.getElementById('scene-content')

      relationsTree.preserveStructureOnFilter = true

      propertiesTable.preserveStructureOnFilter = true
      propertiesTable.indentationInText = false
      propertiesTable.expanded = true
      fragmentsManager.onFragmentsLoaded.add(async (model) => {
        if (model.hasProperties) await indexer.process(model)
      })

      BUI.Manager.init()

      const expandTable = (e) => {
        const button = e.target
        propertiesTable.expanded = !propertiesTable.expanded
        button.label = propertiesTable.expanded ? 'Collapse' : 'Expand'
      }
      const onTextInput = (e) => {
        const input = e.target
        propertiesTable.queryString = input.value !== '' ? input.value : null
      }

      const btnExpand = document.getElementById('btnElementEx')
      btnExpand.addEventListener('click', expandTable)

      const propertiesPanel = BUI.Component.create(() => {
        return BUI.html`
        <bim-panel style="grid-area: viewport; width: 100%; background: transparent">
            ${propertiesTable}
        </bim-panel>
      `
      })

      element.appendChild(propertiesPanel)

      const tableDefinition = {
        Entity: (entity) => {
          let style = {}
          if (entity === OBC.IfcCategoryMap[WEBIFC.IFCPROPERTYSET]) {
            style = {
              ...baseStyle,
              backgroundColor: 'purple',
              color: 'white',
            }
          }
          if (String(entity).includes('IFCWALL')) {
            style = {
              ...baseStyle,
              backgroundColor: 'green',
              color: 'white',
            }
          }
          return BUI.html`<bim-label style=${BUI.styleMap(
            style
          )}>${entity}</bim-label>`
        },
        PredefinedType: (type) => {
          const colors = ['#1c8d83', '#3c1c8d', '#386c19', '#837c24']
          const randomIndex = Math.floor(Math.random() * colors.length)
          const backgroundColor = colors[randomIndex]
          const style = { ...baseStyle, backgroundColor, color: 'white' }
          return BUI.html`<bim-label style=${BUI.styleMap(
            style
          )}>${type}</bim-label>`
        },
        NominalValue: (value) => {
          let style = {}
          if (typeof value === 'boolean' && value === false) {
            style = { ...baseStyle, backgroundColor: '#b13535', color: 'white' }
          }
          if (typeof value === 'boolean' && value === true) {
            style = { ...baseStyle, backgroundColor: '#18882c', color: 'white' }
          }
          return BUI.html`<bim-label style=${BUI.styleMap(
            style
          )}>${value}</bim-label>`
        },
      }

      const [attributesTable, updateAttributesTable] =
        CUI.tables.entityAttributes({
          components,
          fragmentIdMap: {},
          tableDefinition,
          attributesToInclude: () => {
            const attributes = [
              'Name',
              'ContainedInStructure',
              'HasProperties',
              'HasPropertySets',
              (name) => name.includes('Value'),
              (name) => name.startsWith('Material'),
              (name) => name.startsWith('Relating'),
              (name) => {
                const ignore = ['IsGroupedBy', 'IsDecomposedBy']
                return name.startsWith('Is') && !ignore.includes(name)
              },
            ]
            return attributes
          },
        })

      attributesTable.expanded = true
      attributesTable.indentationInText = true
      attributesTable.preserveStructureOnFilter = true

      const entityAttributesPanel = BUI.Component.create(() => {
        return BUI.html`
          <bim-panel style="grid-area: viewport; width: 100%; background: transparent">
            ${attributesTable}
          </bim-panel>
        `
      })

      highlighter.events.select.onHighlight.add((fragmentIdMap) => {
        updatePropertiesTable({ fragmentIdMap })
        updateAttributesTable({ fragmentIdMap })
        if (info.classList.contains('translate-x-[100vw]')) {
          info.classList.remove('translate-x-[100vw]')
          info.classList.add('translate-x-0')
        }
      })

      highlighter.events.select.onClear.add(() => {
        updatePropertiesTable({ fragmentIdMap: {} })
        updateAttributesTable({ fragmentIdMap: {} })
        if (info.classList.contains('translate-x-0')) {
          info.classList.remove('translate-x-0')
          info.classList.add('translate-x-[100vw]')
        }
      })
      // raycaster
      // const caster = casters.get(world)

      // apply shadow
      // shadows.shadowExtraScaleFactor = 3
      // shadows.shadowOffset = 0.1
      // const shadowID = world.uuid
      // shadows.create([model], shadowID, world)

      // apply postproduction render
      const { postproduction } = world.renderer
      postproduction.enabled = true
      postproduction.customEffects.excludedMeshes.push(grid.three)
      const ao = postproduction.n8ao.configuration

      // Light control
      postproduction.setPasses({ gamma: false, custom: false, ao: false })
      postproduction.customEffects.glossEnabled = false
      postproduction.customEffects.opacity = 0
      postproduction.customEffects.tolerance = 0
      postproduction.customEffects.glossExponent = 0
      postproduction.customEffects.maxGloss = 0
      postproduction.customEffects.minGloss = -2
      ao.halfRes = false
      ao.screenSpaceRadius = false
      ao.aoSamples = 1
      ao.denoiseSamples = 7
      ao.denoiseRadius = 30
      ao.aoRadius = 9
      ao.distanceFalloff = 4
      ao.intensity = 9

      // light controll
      document
        .getElementById('gammaCorrection')
        .addEventListener('click', (e) => {
          postproduction.setPasses({ gamma: e.target.checked })
        })
      document.getElementById('ce').addEventListener('click', (e) => {
        postproduction.setPasses({ custom: e.target.checked })
      })
      document
        .getElementById('ceGammaCorrection')
        .addEventListener('click', (e) => {
          postproduction.customEffects.glossEnabled = e.target.checked
        })
      document.getElementById('opacity').addEventListener('change', (e) => {
        postproduction.customEffects.opacity = e.target.value
      })
      document.getElementById('tolerance').addEventListener('change', (e) => {
        postproduction.customEffects.tolerance = e.target.value
      })
      document
        .getElementById('glossExponent')
        .addEventListener('change', (e) => {
          postproduction.customEffects.glossExponent = e.target.value
        })
      document.getElementById('maxGloss').addEventListener('change', (e) => {
        postproduction.customEffects.maxGloss = e.target.value
      })
      document.getElementById('minGloss').addEventListener('change', (e) => {
        postproduction.customEffects.minGloss = e.target.value
      })
      // ------------------------
      document.getElementById('aoEnabled').addEventListener('click', (e) => {
        postproduction.setPasses({ ao: e.target.checked })
      })
      document
        .getElementById('halfResolution')
        .addEventListener('click', (e) => {
          ao.halfRes = e.target.checked
        })
      document
        .getElementById('screenSpaceRadius')
        .addEventListener('click', (e) => {
          ao.screenSpaceRadius = e.target.checked
        })
      document.getElementById('aoSamples').addEventListener('change', (e) => {
        ao.aoSamples = e.target.value
      })
      document
        .getElementById('denoiseSamples')
        .addEventListener('change', (e) => {
          ao.denoiseSamples = e.target.value
        })
      document.getElementById('aoRadius').addEventListener('change', (e) => {
        ao.aoRadius = e.target.value
      })
      document
        .getElementById('denoiseRadius')
        .addEventListener('change', (e) => {
          ao.denoiseRadius = e.target.value
        })
      document
        .getElementById('distanceFalloff')
        .addEventListener('change', (e) => {
          ao.distanceFalloff = e.target.value
        })
      document.getElementById('intensity').addEventListener('change', (e) => {
        ao.intensity = e.target.value
      })

      // measurement
      document.getElementById('area').addEventListener('click', () => {
        area.world = world
        area.enabled = true
        container.ondblclick = () => area.create()
        container.oncontextmenu = () => area.endCreation()
      })
      document.getElementById('angle').addEventListener('click', () => {
        angles.world = world
        angles.enabled = true
        container.ondblclick = () => angles.create()
        container.oncontextmenu = () => angles.endCreation()
      })
      document.getElementById('edge').addEventListener('click', () => {
        edge.world = world
        edge.enabled = true
        container.ondblclick = () => edge.create()
      })
      document.getElementById('face').addEventListener('click', () => {
        face.world = world
        face.enabled = true
        container.ondblclick = () => face.create()
      })

      function delMeas() {
        const radio = document.querySelectorAll('.radioMeasurement')
        for (let i = 0; i < radio.length; i++) radio[i].checked = false
        edge.deleteAll()
        angles.deleteAll()
        area.deleteAll()
        face.deleteAll()
        if (area.enabled) area.enabled = false
        if (angles.enabled) angles.enabled = false
        if (edge.enabled) edge.enabled = false
        if (face.enabled) face.enabled = false
      }
      let deleteMeasurement = document
        .getElementById('deleteMeasurement')
        .addEventListener('click', delMeas())

      // fit screen
      let fitScreen = document
        .getElementById('btn-6')
        .addEventListener('click', () => {
          world.camera.controls.fitToSphere(model, true)
        })

      // section box
      let SectionBox = document
        .getElementById('btn-8')
        .addEventListener('click', () => {
          highlighter.enabled = false
          clipper.enabled = true
          container.ondblclick = () => {
            if (clipper.enabled) {
              clipper.create(world)
              clipper.config.size = 5
              clipper.config.color = new THREE.Color(0xbe1111)
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
            setBtnActive(0)
            clipper.enabled = false
          }
        })

      // ongoing feature
      let intensity = document.getElementById('intensity')
      intensity.addEventListener('change', (e) => {
        e.target.setAttribute('value', e.target.value)
      })

      // views
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

      let isFreeOrbit = false
      document.getElementById('btn-10').addEventListener('click', () => {
        if (isFreeOrbit) {
          isFreeOrbit = false
          world.camera.controls.setLookAt(0, 1, 15, 0, 0, -10, true)
          world.camera.controls.maxPolarAngle = 1.55
        } else {
          isFreeOrbit = true
          world.camera.controls.maxPolarAngle = Math.PI
        }
      })
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

  return (
    <div className="relative" id="bim-wrapper">
      <div className="min-w-min absolute top-4 left-4 flex gap-4">
        <div className="flex flex-col gap-2" id="btn-container">
          {btnList.map((btn, index) => {
            if (btn.class === 'btn') {
              return (
                <button
                  key={index}
                  className={`tooltip w-10 h-10 flex items-center justify-center rounded-xl border z-20 tooltip-right transition ease-in-out duration-500 hover:translate-x-1 bg-white ${
                    btn.id == 10
                      ? freeOrbit == btn.id
                        ? 'text-secondary'
                        : ''
                      : 'focus:text-secondary text-slate-900'
                  }`}
                  data-tip={btn.tooltip}
                  onClick={() => {
                    if (btn.id == 10) {
                      freeOrbit == btn.id
                        ? setFreeOrbit(0)
                        : setFreeOrbit(btn.id)
                    }
                  }}
                  id={`btn-${btn.id}`}
                >
                  {btn.icon}
                </button>
              )
            } else if (btn.class === 'dropdown') {
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
                  {btn.child}
                </div>
              )
            } else {
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
              key={index}
            >
              <div className="card-body p-0 relative">
                <h2 className="card-title text-lg">{btn.title}</h2>
                {btn.child}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="w-80 max-h-[32rem] overflow-y-auto absolute top-4 right-4 rounded-lg bg-white p-4 translate-x-[100vw] transition ease-in-out delay-500 text-start shadow"
        id="info-container"
      >
        <h3 className="font-bold text-lg">Selection Info</h3>
        <h6 className="flex justify-between">
          Entity Properties
          <button
            className="tooltip rounded bg-secondary text-white border flex items-center justify-center w-5 h-5"
            data-tip="Expand/Collapse"
            id="btnEntityEx"
          >
            <BarsArrowDownIcon className="size-3" />
          </button>
        </h6>
        <div id="entityProp"></div>
        <h6 className="flex justify-between">
          Element Properties
          <button
            className="tooltip rounded bg-secondary text-white border flex items-center justify-center w-5 h-5"
            data-tip="Expand/Collapse"
            id="btnElementEx"
          >
            <BarsArrowDownIcon className="size-3" />
          </button>
        </h6>
        <div id="elementProp"></div>
      </div>
      <div className="h-[90vh] overflow-hidden" id="bim-model-canvas"></div>
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
