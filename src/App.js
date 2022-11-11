import './App.css';
import MapContainer from './component/MapContainer';
import DefaultPage from './component/about/About.js'
import {Route} from 'react-router-dom'

function App() {
  return (
    <div>
      {/* <Route exact path='/'> */}
        <MapContainer />
      {/* </Route>
      <Route path='/about'>
        <DefaultPage />
      </Route> */}
    </div>
  );
}

export default App;
