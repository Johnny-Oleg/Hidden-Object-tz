'use strict';

const $start = document.querySelector('.btn.start');
const $info = document.querySelector('.info');
const $infoContent = document.querySelector('.info__content');
const $screen = document.querySelector('.screen');
const $video = document.querySelector('.screen__video');
const $screenSkip = document.querySelector('.screen__skip');
const $skip = document.querySelector('.btn.skip');
const $help = document.querySelector('.btn.help');
const $pay = document.querySelector('.btn.pay');
const $close = document.querySelectorAll('.close');
const $gameOver = document.querySelector('.screen__gameover');

const state = {
	items: [
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
	],
	isFound: [],
	allItemsFound: false,
	isStarted: false,
	counter: 30000,
	gameOver() {
		return this.allItemsFound || this.isFound.length >= 15;
	}
}

const renderElem = ({ id, name }) => {
    const $item = `
		<div class="id-${id} ${name} item">
			<img class="${id}" src="assets/images/${name}.png" alt="image">
		</div>
	`;

    $screen.insertAdjacentHTML('beforeend', $item);
}

const renderElemInfo = ({ name, found }) => {
	const $item = `
		<div class="info__item">
			<span class="info__status">
				${Number(found)}
					<img class="${found && 'visible'}" src="assets/images/check.png" alt="" />
			</span>
			<div class="info__img">
				<img
					src="assets/images/${name.includes('collar-r') ? 'collar' : name}.png" 
					alt="image"
				>
			</div>
		</div>
	`;
	
	$infoContent.insertAdjacentHTML('beforeend', $item);
}

const updateStatus = id => {
	state.items.find(item => {
		if (item.id === id && item.found === false) {

			if (id === 5) {
				item.found = true;

				state.items.find(item => {
					if (item.id === 7 && item.found === false) {
						item.found = true;
						state.isFound.push(item);
					}
				})
			}
			
			item.found = true;
			state.isFound.push(item);
		}
	})

	$infoContent.innerHTML = '';
    renderItemsInfo();
	gameOver();
}

$start.addEventListener('click', () => {
	const $main = document.querySelector('.main');
	const $app = document.querySelector('.app');

	$main.classList.add('hidden');
	$app.classList.remove('hidden');

	state.isStarted = true;
	showAd();
})

$skip.addEventListener('click', () => {
	if ($screenSkip.classList.contains('active')) return;
	if ($video.classList.contains('active')) return;
	if (state.allItemsFound) return;
	if (state.isFound.length >= 15) return;

	$screenSkip.classList.toggle('active');
	
    if ($screenSkip.classList.contains('active')) {
		$screenSkip.scrollIntoView({
			block: 'center',
            behavior: 'smooth',
        })
    } 
})

$help.addEventListener('click', () => {
	$info.classList.toggle('info__active');
	
	if ($info.classList.contains('info__active')) {
		$info.scrollIntoView({
			block: 'end', behavior: 'smooth'
		})
	} else {
		$screen.scrollIntoView({
			block: 'start', behavior: 'smooth'
		})
	}
})

$pay.addEventListener('click', () => {
	const $items = document.querySelectorAll('.item');
	
	$items.forEach(item => item.classList.add('skipped'));
	state.items.forEach(item => item.found = true);

	state.allItemsFound = true;
	$infoContent.innerHTML = '';

	renderItemsInfo();
	setTimeout(() => {
		gameOver();
	}, 3000);

	$pay.parentElement.classList.remove('active');
})

$close.forEach(item => item.addEventListener('click', () => {
	item.parentElement.classList.remove('active');
}))

const showAd = function() {
	if (!state.isStarted) return;

	const $trailer = document.querySelector('.video')
	const $closeAd = document.querySelector('.close.hidden');
	const $counter = document.querySelector('.counter');

	setTimeout(() => {
		if ($gameOver.classList.contains('active')) return;

		$video.classList.add('active');
		$video.scrollIntoView({
			block: 'center', behavior: 'smooth'
		})

		$trailer.play();
		$trailer.setAttribute('autoplay', 'true');
		$trailer.addEventListener('click', () => {
			$trailer.paused ? $trailer.play() : $trailer.pause();
		})

		const interval = setInterval(() => {
			state.counter > 0 && !$trailer.paused && (state.counter -= 1000);
			$counter.textContent = state.counter / 1000;

			if (state.counter === 0)  {
				clearInterval(interval);
				$trailer.addEventListener('ended', () => {
					$counter.classList.add('hidden');
					$closeAd.classList.remove('hidden');
				})				
			}
		}, 1000);
	}, state.counter);
}

const gameOver = () => {
	if (state.gameOver()) {
		const $reload = document.querySelector('.btn.reload');

		$gameOver.classList.add('active');
		$reload.addEventListener('click', () => {
			location.reload();

            return false;
		})
	}
}

const renderItemsInfo = () => state.items.forEach(item => renderElemInfo(item));
const renderItems = () => state.items.forEach(item => renderElem(item));

window.addEventListener('DOMContentLoaded', renderItems);
window.addEventListener('DOMContentLoaded', renderItemsInfo);

window.addEventListener('load', () => {
	const $items = document.querySelectorAll('.item');

    $items.forEach(item => item.addEventListener('click', e => {
		if ($video.classList.contains('active')) return;
		if ($gameOver.classList.contains('active')) return;

		item.classList.add('found');

        const id = e.target.getAttribute('class');

		updateStatus(Number(id));
    }))
})