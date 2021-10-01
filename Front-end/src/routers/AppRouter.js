import React, { useEffect } from 'react';
import { AuthRouter } from './AuthRouter';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRouters } from './PrivateRouters';
import { useDispatch, useSelector } from 'react-redux';
import { startCheckig } from '../actions/auth';
import { Spinner } from '../components/ui/Spinner';
import { DashBordRouter } from './DashBordRouter';



// Componet main the routers public and private
export const AppRouter = () => {

	const { checking, uid } = useSelector(state => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {

		dispatch(startCheckig());

	}, [dispatch])

	if (checking) {
		return (
			<Spinner />
		);
	}

	return (
		<Router>
			<div>
				<Switch>

					<PublicRoute
						isAuthenticated={!!uid}
						path="/auth"
						component={AuthRouter} />

					<PrivateRouters
						exact
						isAuthenticated={!!uid}
						path="/"
						component={ DashBordRouter } />

					<Redirect to="/auth/login" />
				</Switch>
			</div>
		</Router>
	)
}
