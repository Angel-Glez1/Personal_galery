import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { HomeScreen } from '../components/HomeScreen';
import { NavBar } from '../components/ui/NavBar';


export const DashBordRouter = () => {
	return (
		<>
			<NavBar/>
			
			<div>
				<Switch>
					<Route exact path="/" component={HomeScreen}  />
					<Redirect to="/" />
				</Switch>
			</div>
		</>
	)
}
