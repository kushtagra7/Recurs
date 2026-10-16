import WebHome from "./pages/WebHome";
import ExtensionHome from "./extension/ExtensionHome";
import { isExtensionEnvironment } from "./utils/environment";

function App(){
  const isExtension = isExtensionEnvironment();
  
  if(isExtension){
    return <ExtensionHome />;
  }

  return <WebHome />;
}
export default App;