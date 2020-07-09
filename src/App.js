import React, { useState, useEffect } from 'react';
import { TextField, Container, Typography, Button, Grid } from '@material-ui/core';
import './index.css';
import axios from 'axios';
import animegrill from './images/anime-dance-gif-png.gif';
import catgrill from './images/catgrill.gif';

const App = () => {
	const [ SteamId, giveSteamId ] = useState('');
	const [ data, setData ] = useState({});

	const getData = () => {
		axios.post('give_id', { SteamId: SteamId }).then((res) => {
			console.log(res.data);
			setData(res.data);
		});
	};

	return (
		<body>
			<header className="navbar">
				<Typography component="h1" variant="h3" style={{ color: 'black' }}>
					Steam Profile Checker
				</Typography>
			</header>
			<main>
				<Container style={{ marginTop: 50, marginLeft: 400 }} component="main">
					<div>
						<form noValidate autoComplete="off">
							<TextField
								id="id-field"
								label="Enter Steam ID here"
								onChange={(e) => giveSteamId(e.target.value)}
								fullWidth
							/>
						</form>
						<form>
							<Button variant="contained" style={{ marginTop: 10 }} onClick={getData}>
								Find
							</Button>
						</form>
						<div>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<h3>{data.name}</h3>
								</Grid>
								<Grid item xs={6}>
									<h3>Level:{data.level}</h3>
								</Grid>
								<Grid item xs={6}>
									<h3>Badges:{data.badge}</h3>
								</Grid>
								<Grid item xs={3}>
									<h3>{data.xp}</h3>
								</Grid>
								<Grid item xs={3}>
									<h3>{data.nxp}</h3>
								</Grid>
							</Grid>
						</div>
					</div>
				</Container>
			</main>
			<footet />
			<img src={animegrill} style={{ marginTop: 85 }} alt="shit" />
		</body>
	);
};

export default App;
