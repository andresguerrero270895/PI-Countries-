import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './04_components/Landing/Landing.jsx';
import Home from './04_components/Home/Home.jsx'
import Detail from './04_components/Detail/Detail.jsx'
import AddActivity from './04_components/AddActivity/AddActivity.jsx'
import ActivitiesList from './04_components/ActivitiesList/ActivitiesList';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path ='/home' component ={Home}/>
        <Route exact path ='/activity' component ={AddActivity}/>
        <Route exact path ='/activities' component = {ActivitiesList}/>
        <Route exact path ='/home/:id' component ={Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
