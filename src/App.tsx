import React from 'react';

import './App.sass';
import { Todos } from './components/Todos/Todos';
import { Layout } from './components/Layout/Layout';

const App: React.FC = () => {
	return (
		<div className="App">
			<Layout>
				<Todos></Todos>
			</Layout>
		</div>
	);
};

export default App;
