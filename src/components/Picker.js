import {
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Grid,
	TextField,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { pick, shuffle } from '../utlis/RngUtil';
import PoolContainer from './PoolContainer';

const dancers = ['rickroll.gif', 'carlton.gif', 'partyfrog.gif', 'catjam.gif'];

const Picker = () => {
	const [dancer, setDancer] = useState(null);
	const [picked, setPicked] = useState(null);
	const [picking, setPicking] = useState(false);
	const [removeWhenPicked, setRemoveWhenPicked] = useState(false);
	const [blackList, setBlackList] = useState([]);
	const [pool, setPool] = useState([]);
	const [entry, setEntry] = useState('');
	const handleSubmit = useSubmit({ entry, setEntry, pool, setPool });
	const handlePick = usePick({
		pool,
		setPool,
		setPicked,
		setPicking,
		picking,
		setDancer,
		removeWhenPicked,
		blackList,
		setBlackList,
	});
	const handleClear = useClear({ setPool, setPicked });

	useEffect(() => {
		const stored = localStorage.getItem('__pool');

		if (stored) {
			setPool(JSON.parse(stored));
		}
	}, []);

	return (
		<>
			<Grid className='picker-container' container spacing={3}>
				<Grid item container justify='center' xs={12}>
					<Grid item container xs={12}>
						<Grid item xs={4}>
							{picked && (
								<img
									className='dancer'
									src={picking ? `assets/${dancer}` : 'assets/willsmith.png'}
									alt='carlton'
								/>
							)}
						</Grid>
						<Grid item xs={4}>
							<div className='picked'>{picked}</div>
						</Grid>
						<Grid item xs={4}>
							{picked && (
								<img
									className='dancer flip'
									src={picking ? `assets/${dancer}` : 'assets/willsmith.png'}
									alt='carlton'
								/>
							)}
						</Grid>
					</Grid>
					<Grid item xs={1}>
						<Button
							onClick={handlePick}
							disabled={pool.length === 0 || picking}
							variant='contained'
							color='primary'
							fullWidth
						>
							Pick
						</Button>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={
								<Checkbox
									checked={removeWhenPicked}
									onChange={(event) =>
										setRemoveWhenPicked(event.target.checked)
									}
									name='checkedB'
									color='primary'
								/>
							}
							label='Remove from list when Picked'
						/>
					</Grid>
				</Grid>
				<Grid container item xs={12} justify='center'>
					<Grid item xs={4}>
						<FormGroup>
							<form onSubmit={handleSubmit}>
								<Grid container justify='center' spacing={1}>
									<Grid item xs={12}>
										<TextField
											label='Participant'
											value={entry}
											spacing
											variant='outlined'
											onChange={(e) => setEntry(e.target.value)}
											fullWidth
										/>
									</Grid>
									<Grid item xs={3}>
										<Button
											type='submit'
											fullWidth
											color='primary'
											variant='contained'
											disabled={!entry.trim()}
										>
											Add
										</Button>
									</Grid>
									<Grid item xs={3}>
										<Button
											disabled={pool.length === 0}
											onClick={handleClear}
											fullWidth
											color='default'
											variant='contained'
										>
											Clear
										</Button>
									</Grid>
								</Grid>
							</form>
						</FormGroup>
					</Grid>
					<Grid item xs={12} style={{ marginTop: '2em' }}>
						{pool.length > 0 && <PoolContainer pool={pool} />}
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

function useSubmit({ entry, setEntry, pool, setPool }) {
	return (e) => {
		e.preventDefault();
		const newPool = [
			...new Set(pool.concat(entry).map((e) => e.toLowerCase().trim())),
		];
		setPool(newPool);
		setEntry('');
		localStorage.setItem('__pool', JSON.stringify(newPool));
	};
}

async function delay(ms = 500) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}

function useClear({ setPool, setPicked }) {
	return () => {
		localStorage.removeItem('__pool');
		setPool([]);
		setPicked(null);
	};
}

function usePick({
	pool,
	setPool,
	setPicked,
	setPicking,
	setDancer,
	removeWhenPicked,
	blackList,
	setBlackList,
}) {
	const filler = [
		'Naruto',
		'Sasuke',
		'Shrek',
		'Doge',
		'Catto',
		'Ricardo',
		'Rick Astley',
		'Rick Sanchez',
		'Walter White',
		'Keanu Reeves',
		'Gandalf',
		'Spongebob',
		'Patrick',
		'Jollibee',
		'Joe Momma',
		'Jeff',
		'Elon Musk',
	];
	return async () => {
		const picked = pick(pool);
		setPicking(true);

		const padding = pool
			.filter((p) => p.toLowerCase() !== picked.toLowerCase())
			.concat(filler);

		for (const pad of shuffle(padding).slice(0, 10)) {
			await delay(200);
			setPicked(pad);
		}
		await delay(300);

		setPicked(picked);
		setPicking(false);
		setDancer(pick(dancers));
		if (removeWhenPicked) {
			setBlackList([...new Set(blackList.concat(picked))]);
			setPool(pool.filter((p) => p.toLowerCase() !== picked.toLowerCase()));
		}
	};
}

export default Picker;
