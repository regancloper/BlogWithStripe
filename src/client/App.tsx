import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './scss/app';
import Blogs from './components/public/Blogs';
import Details from './components/public/Details';
import NewPost from './components/admin/NewPost';
import EditPost from './components/admin/EditPost';
import Login from './components/admin/Login';
import Navbar from './components/shared/Navbar';
import Donate from './components/shared/Donate';


const App: React.FC<IAppProps> = props => {

	return (


		<BrowserRouter>

			<Navbar />

			<Switch>
				<Route exact path="/" component={Blogs}/>
				<Route exact path="/details/:id" component={Details} />
				<Route exact path="/newpost" component={NewPost} />
				<Route exact path="/edit/:id" component={EditPost} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/donate" component={Donate} />
			</Switch>
		</BrowserRouter>

	);
}


export default App;

interface IAppProps { }
