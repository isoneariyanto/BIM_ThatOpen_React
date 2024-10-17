import Stats from "three/examples/jsm/libs/stats.module";
import * as BUI from "@thatopen/ui";
import * as OBC from "@thatopen/components";
import * as WEBIFC from "web-ifc";
import { useEffect, useState } from "react";

export default function ThatOpen({}) {
  const [isRender, setIsRender] = useState(false);
  const [getFile, setGetFile] = useState(false);

  const components = new OBC.Components();
  const fragments = components.get(OBC.FragmentsManager);
  const fragmentIfcLoader = components.get(OBC.IfcLoader);
  const worlds = components.get(OBC.Worlds);
  const world = worlds.create();
  async function loadWorld() {
    const container = document.getElementById("canvas-container");
    world.scene = new OBC.SimpleScene(components);
    world.renderer = new OBC.SimpleRenderer(components, container);
    world.camera = new OBC.SimpleCamera(components);
    components.init();

    world.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);
    world.scene.setup();

    const grids = components.get(OBC.Grids);
    grids.create(world);
    world.scene.three.background = "";

    await fragmentIfcLoader.setup();
    const excludedCats = [
      WEBIFC.IFCTENDONANCHOR,
      WEBIFC.IFCREINFORCINGBAR,
      WEBIFC.IFCREINFORCINGELEMENT,
    ];

    for (const cat of excludedCats) {
      fragmentIfcLoader.settings.excludedCategories.add(cat);
    }
    fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
  }

  async function loadIfc(e) {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const buffer = new Uint8Array(data);
    const model = await fragmentIfcLoader.load(buffer);
    model.name = "example";
    world.scene.three.add(model);
  }

  function disposeFragments() {
    fragments.dispose();
  }

  return (
    <div className="flex p-6">
      <div className="flex flex-col items-center gap-4 justify-center h-screen w-4/12">
        <div className="flex flex-col items-center gap-4 justify-center w-fit p-4 rounded-md shadow border">
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs mt-2"
            onChange={loadIfc}
          />
          <button className="btn w-fit" onClick={loadWorld}>
            Load World
          </button>
          <button className="btn w-fit" onClick={disposeFragments}>
            Dispose
          </button>
        </div>
      </div>
      <div id="canvas-container" className="w-8/12 h-fit"></div>
    </div>
  );
}
