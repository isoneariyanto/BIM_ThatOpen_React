import Stats from 'three/examples/jsm/libs/stats.module'
import * as BUI from '@thatopen/ui'
import * as OBC from '@thatopen/components'
import * as WEBIFC from 'web-ifc'
import { useEffect, useState } from 'react'

async function ThatOpenTry({}) {
  const components = new OBC.Components()
  const fragments = components.get(OBC.FragmentsManager)
  const fragmentIfcLoader = components.get(OBC.IfcLoader)
  const worlds = components.get(OBC.Worlds)
  const world = worlds.create()
  const container = document.getElementById('contain')
  world.scene = new OBC.SimpleScene(components)
  world.renderer = new OBC.SimpleRenderer(components, container)
  world.camera = new OBC.SimpleCamera(components)
  components.init()

  world.camera.controls.setLookAt(12, 6, 8, 0, 0, -10)
  world.scene.setup()

  const grids = components.get(OBC.Grids)
  grids.create(world)
  world.scene.three.background = ''

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
}

export default ThatOpenTry
