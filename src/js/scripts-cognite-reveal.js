import { CogniteClient } from '@cognite/sdk';
import { Cognite3DViewer } from '@cognite/reveal';

console.log("Authenticate...")

const loginManager = new LoginManager('publicdata', 'api');
const client = new CogniteClient({
  appId: 'myCadAppId',
  project: loginManager.project,
  getToken: async () => loginManager.getToken()
});

await client.authenticate();

// some div in your html page for Cognite3DViewer to insert a canvas
const domElement = document.getElementById('animationCanvas');

async function main() {
  const viewer = new Cognite3DViewer({ sdk: client, domElement });

  // load a model and add it on 3d scene
  // https://publicdata.fusion.cognite.com/publicdata/3d-models/3356984403684032/revisions/6664823881595566
  const model = await viewer.addModel({
    modelId: 3356984403684032,
    revisionId: 6664823881595566,
  });
  viewer.loadCameraFromModel(model);

  // call viewer.dispose() when you don't need the viewer anymore
}
main();