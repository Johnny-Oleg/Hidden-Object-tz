'use strict';

const $info = document.querySelector('.info');
const $screen = document.querySelector('.screen');

const items = [
	{id: 1, name: 'bear', found: false},
	{id: 2, name: 'bottle', found: false},
	{id: 3, name: 'cat', found: false},
	{id: 4, name: 'coin', found: false},
	{id: 5, name: 'collar-r', found: false},
	{id: 6, name: 'diary', found: false},
	{id: 7, name: 'dog', found: false},
	{id: 8, name: 'keys', found: false},
	{id: 9, name: 'lock', found: false},
	{id: 10, name: 'note', found: false},
	{id: 11, name: 'pc', found: false},
	{id: 12, name: 'phone', found: false},
	{id: 13, name: 'photo', found: false},
	{id: 14, name: 'socks', found: false},
	{id: 15, name: 'spider', found: false},
	{id: 16, name: 'switch', found: false},
]

const state = {
	
}

const renderElem = ({ name, found }) => {
    const $item = `
		<div class="item__${name} item">
			<img src="assets/images/${name}.png" alt="image">
		</div>
	`;

    $screen.insertAdjacentHTML('beforeend', $item);
}

const renderElemInfo = ({ name, found }) => {
	const $item = `
		<div class="info__item">
			<span class="info__status">${Number(found)}</span>
			<div class="info__img">
				<img 
					src="assets/images/${name.includes('collar-r') ? 'collar' : name}.png" 
					alt="image"
				>
			</div>
		</div>
	`;

	$info.insertAdjacentHTML('beforeend', $item);
}

const renderItemsInfo = () => items.forEach(item => renderElemInfo(item));
const renderItems = () => items.forEach(item => renderElem(item));

window.addEventListener('DOMContentLoaded', renderItems);
window.addEventListener('DOMContentLoaded', renderItemsInfo);