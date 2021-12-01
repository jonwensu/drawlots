export default function PoolContainer({ pool }) {
	return (
		<div>
			<h1>Entries</h1>
			{pool.map((item, i) => (
				<div className='participant' key={`${item}${i}`}>
					{item}
				</div>
			))}
		</div>
	);
}
