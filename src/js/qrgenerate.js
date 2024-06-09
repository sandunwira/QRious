const qrgenerateform = document.getElementById('qrgenerateform');
const qrcode = document.getElementById('qrcode');
const qrgenerateforminput = document.getElementById('qrgenerateforminput');
const generateIcon = document.getElementById('generateIcon');
const inputText = document.getElementById('inputText');
const qrgenerate = document.getElementById('generate');
const qrdownload = document.getElementById('qrdownload');
const qrclear = document.getElementById('qrclear');
let inputValue = '';

qrgenerateform.addEventListener('submit', (e) => {
	e.preventDefault();

	if (qrgenerateforminput.value.trim() === '' || qrgenerateforminput.value.trim() === ' ') {
		return false;
	}

	inputValue = qrgenerateforminput.value;

	qrcodemessage();
	qrcode.innerHTML = '';
	new QRCode(qrcode, qrgenerateforminput.value);
	inputText.innerHTML = qrgenerateforminput.value;
	qrgenerateforminput.value = '';
	updateInputs();
	updateDownload();
});

qrdownload.addEventListener('click', () => {
	const canvas = document.querySelector('canvas');
	const image = canvas.toDataURL('image/png');
	const link = document.createElement('a');
	link.href = image;
	link.download = `qrious_${inputValue}.png`;
	link.click();
});

qrclear.addEventListener('click', () => {
	qrcode.innerHTML = '';
	qrcodemessage();
});

qrgenerateforminput.addEventListener('input', () => {
	if (qrgenerateforminput.value.length > 0) {
		generateIcon.style.filter = 'invert(67%) sepia(0%) saturate(1281%) hue-rotate(151deg) brightness(200%) contrast(91%)';
		qrgenerate.style.cursor = 'pointer';
	} else {
		generateIcon.style.filter = 'invert(67%) sepia(0%) saturate(1281%) hue-rotate(151deg) brightness(130%) contrast(91%)';
		qrgenerate.style.cursor = 'not-allowed';
	}
});

function updateDownload() {
	if (qrcode.innerHTML === '') {
		qrdownload.style.opacity = '0.5';
		qrdownload.style.cursor = 'not-allowed';
		qrclear.style.opacity = '0.5';
		qrclear.style.cursor = 'not-allowed';
	} else {
		qrdownload.style.opacity = '1';
		qrdownload.style.cursor = 'pointer';
		qrclear.style.opacity = '1';
		qrclear.style.cursor = 'pointer';
	}
}

function updateInputs() {
	if (qrgenerateforminput.value.length > 0) {
		generateIcon.style.filter = 'invert(67%) sepia(0%) saturate(1281%) hue-rotate(151deg) brightness(200%) contrast(91%)';
	} else {
		generateIcon.style.filter = 'invert(67%) sepia(0%) saturate(1281%) hue-rotate(151deg) brightness(130%) contrast(91%)';
	}
}

function qrcodemessage() {
	if (qrcode.innerHTML === '') {
		qrcode.innerHTML = `<p style="z-index: 10;">QR Code Will Appear Here</p>`;
		inputText.innerHTML = 'none';
	} else if (qrcode.innerHTML === `<p style="z-index: 10;">QR Code Will Appear Here</p>`) {
		qrcode.innerHTML = '';
		inputText.innerHTML = 'none';
	}
}

window.addEventListener('keydown', (e) => {
	if (e.ctrlKey && e.key === 'a') {
		e.preventDefault();
		qrcode.innerHTML = '';
		qrcodemessage();
		if (qrcode.innerHTML === '') {
			qrclear.style.opacity = '0.5';
			qrclear.style.cursor = 'not-allowed';
			qrdownload.style.opacity = '0.5';
			qrdownload.style.cursor = 'not-allowed';
		} else if (qrcode.innerHTML === `<p style="z-index: 10;">QR Code Will Appear Here</p>`) {
			qrclear.style.opacity = '0.5';
			qrclear.style.cursor = 'not-allowed';
			qrdownload.style.opacity = '0.5';
			qrdownload.style.cursor = 'not-allowed';
		}
		qrgenerateforminput.focus();
	}
});

window.addEventListener('keydown', (e) => {
	if (e.ctrlKey && e.key === 's') {
		e.preventDefault();
		qrgenerateforminput.focus();
	}
});

window.addEventListener('keydown', (e) => {
	if (e.ctrlKey && e.key === 'd') {
		qrdownload.click();
	}
});

window.addEventListener('load', () => {
	qrcodemessage();
	generateIcon.style.filter = 'invert(67%) sepia(0%) saturate(1281%) hue-rotate(151deg) brightness(130%) contrast(91%)';
});