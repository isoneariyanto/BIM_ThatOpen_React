import Stats from "three/examples/jsm/libs/stats.module";
import * as BUI from "@thatopen/ui";
import * as OBC from "@thatopen/components";
import * as WEBIFC from "web-ifc";
import { useEffect, useState } from "react";

export default function ThatOpen({}) {
  const [isRender, setIsRender] = useState(false);

  const components = new OBC.Components();
  const fragments = components.get(OBC.FragmentsManager);
  const worlds = components.get(OBC.Worlds);
  const fragmentIfcLoader = components.get(OBC.IfcLoader);

  const grids = components.get(OBC.Grids);
  const world = worlds.create();
  components.init();

  async function loadIfc(e) {
    const container = document.getElementById("canvas-container");
    world.scene = new OBC.SimpleScene(components);
    world.renderer = new OBC.SimpleRenderer(components, container);
    world.camera = new OBC.SimpleCamera(components);
    world.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);
    world.scene.setup();

    world.scene.three.background = null;
    grids.create(world);

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

  // useEffect(() => {
  //   console.log(isRender);
  //   if (!isRender) fragmentBbox.reset();
  //   else get();
  // }, [isRender]);

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs mt-2"
          onChange={loadIfc}
        />
        <button className="btn w-fit" onClick={disposeFragments}>
          Dispose
        </button>
      </div>
      <div id="canvas-container"></div>
    </>
  );
}
