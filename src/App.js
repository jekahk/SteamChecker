import React, { useEffect, useState } from 'react';
import { TextField, Container, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './index.css';
import axios from 'axios';
import animegrill from './images/anime-dance-gif-png.gif';
import github from './images/github.png';
import headerlogo from './images/headerlogo.png';


const App = () => {

	//hooks for the Steam ID/URL that will be sent and the object that will be received
	const [ SteamId, giveSteamId ] = useState('');
	const [ data, setData ] = useState({});
	const [history, setHistory] = useState([]);

	//defines the url of API
	//axios.defaults.baseURL = 'https://www.steam-check-api.xyz/';
	axios.defaults.baseURL = 'http://127.0.0.1:5000/';

	useEffect(() => {
		getHistory();
	},[data])


	const getHistory = () => {
		axios.get('get_history').then((res) => {
			const rows = [];
			res.data.map((item) => {
				rows.push(createHistoryData(item[0], item[1], item[2], item[3]));
			})
			return setHistory(rows)
		})
	}

	//function that makes the received object from API set to variable data
	const getData = () => {
		axios.post('give_id', { SteamId: SteamId }).then((res) => {
			console.log(res.data);
			setData(res.data);
		});
	};

	function createHistoryData(name, level, badge, xp) {
		return { name, level, badge, xp};
	  }

	//styles fro material-ui components
	const useStyles = makeStyles((theme) => ({
		root: {
			flexGrow: 1
		},
		paper: {
			padding: theme.spacing(2),
			background: '#333',
			color: 'whitesmoke',
			textAlign: 'center',
			fontSize: 15
		},
		steamName: {
			textAlign: 'center',
			fontSize: 40,
			color: '#333'
		},
		warning: {
			textAlign: 'center',
			fontSize: 20,
			color: 'red'
		}
	}));

	const classes = useStyles();

	return (
		<React.Fragment>
			<div>
			
			<header>
				<img className="logo" src={headerlogo} alt="Steam Checker" />
			</header>

			<main>
				<Container className="anime" style={{ marginTop: 93, width: '15%', display: 'flex', alignItems: 'flex-end' }}>
					<img src={animegrill} alt="grill" />
				</Container> 
				<Container style={{ marginTop: 25, width: '85%', overflowX: 'auto' }}>
					<div>
						<form noValidate autoComplete="off">
							<TextField
								id="id-field"
								label="Enter Steam ID here"
								onChange={(e) => giveSteamId(e.target.value)}
								fullWidth
								style={{ marginBottom: 10 }}
							/>
						</form>
						<form>
							<Button
								variant="contained"
								style={{ marginBottom: 45, color: 'whitesmoke', backgroundColor: '#333', fontSize: 'small' }}
								onClick={getData}
							>
								<div className='font'>Find</div>
							</Button>
						</form>
						<div className={classes.root}>
							<Grid>
								{!data.name ? <div /> : <img className="profilepicture" src={data.picture} alt="profilepicture" />}
							</Grid>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<h1 className={classes.steamName}>{data.name}</h1>
								</Grid>
								<Grid item xs={12}>
									<h2 className={classes.warning}>{data.private}</h2>
								</Grid>
								<Grid item xs={6}>
									<Paper className={classes.paper}>Level {data.level}</Paper>
								</Grid>
								<Grid item xs={6}>
									<Paper className={classes.paper}>Badges {data.badge}</Paper>
								</Grid>
								{!data.xp ? (
									<Grid item xs={12}>
										<Paper className={classes.paper}>XP</Paper>
									</Grid>
								) : (
									<Grid item xs={12}>
										<Paper className={classes.paper}>
											Current {data.xp} | {data.nxp}
										</Paper>
									</Grid>
								)}
							</Grid>
						</div>
					</div>
					<div className={classes.root} style={{marginTop: 25}}>
						<div style={{marginBottom: 10, color: '#333'}}>History</div>
						<TableContainer component={Paper}>
							<Table className={classes.paper} sx={{ minWidth: 650 }} size="small" aria-label="history table">
								<TableHead>
									<TableRow>
										<TableCell><div className="font">Name</div></TableCell>
										<TableCell align="right"><div className="font">Level</div></TableCell>
										<TableCell align="right"><div className="font">Badges</div></TableCell>
										<TableCell align="right"><div className="font">XP</div></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{history.map((row, index) => (
										<TableRow
										key={index}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
										<TableCell component="th" scope="row">
										<div className="font">{row.name}</div>
										</TableCell>
										<TableCell align="right"><div className="font">{row.level}</div></TableCell>
										<TableCell align="right"><div className="font">{row.badge}</div></TableCell>
										<TableCell align="right"><div className="font">{row.xp}</div></TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</Container>
			</main>
			<footer>
				<a style={{ display: 'table-cell' }} href="https://github.com/jekahk" target="_blank" rel="noopener noreferrer">
					<img className="github" src={github} alt="github" />
				</a>
			</footer>
			</div>
		</React.Fragment>
	);
};

export default App;
