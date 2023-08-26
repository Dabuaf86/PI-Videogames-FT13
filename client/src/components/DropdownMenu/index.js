import React, { useState } from 'react';
// import onClickOutside from 'react-onclickoutside';
// import './dropdownMenu.scss';

const DropdownMenu = ({ title, items = [], multiselect = false }) => {
	const [open, setOpen] = useState(false);
	const [selection, setSelection] = useState([]);
	// DropdownMenu.handleClickOutside = () => setOpen(false);

	const toggle = () => setOpen(!open);

	const handleClick = item => {
		if (!Selection.some(current => current.id === item.id)) {
			if (!multiselect) setSelection([item]);
			else setSelection([...selection, item]);
		} else {
			let selectionAfterRemoval = selection;
			selectionAfterRemoval = selectionAfterRemoval.filter(
				current => current.id !== item.id
			);
			setSelection([...selectionAfterRemoval]);
		}
	};

	const isItemSelected = () => {
		if (selection.find(current => current.id === items.id)) return true;
		else return false;
	};

	return (
		<div className='dd-wrapper'>
			<div
				tabIndex={0}
				className='dd-header'
				role='button'
				onKeyPress={() => toggle(!open)}
				onClick={() => toggle(!open)}
			>
				<div className='dd-header_title'>
					<p className='dd-header_title-bold'>{title}</p>
				</div>
				<div className='dd-header_action'>
					<p>{open ? 'Close' : 'Open'}</p>
				</div>
			</div>
			{open && (
				<ul className='dd-list'>
					{items.map(item => (
						<li
							className='dd-list-item'
							key={item.id}
							onClick={() => handleClick(item)}
						>
							{/* <button type='button' onClick={() => handleClick(item)}> */}
							<span>{item.value}</span>
							<span>{isItemSelected(item) && 'Selected'}</span>
							{/* </button> */}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

// const clickOutsideConfig = {
// 	handleClickOutside: () => DropdownMenu.handleClickOutside,
// };

// export default onClickOutside(DropdownMenu, clickOutsideConfig);
export default DropdownMenu;
