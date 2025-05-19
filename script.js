// one-time use --> generates actual numbers
function generateElement() {
	return Math.floor(Math.random() * 100) + 1;
}

// one-time use --> makes an array of 5 numbers
function generateArray() {
	const arr = [];
	for (let i = 0; i < 5; i++) {
		arr.push(generateElement());
	}
	return arr;
}

const generateContainer = () => document.createElement("div");

function fillArrContainer(html, arr) {
	return arr.forEach((number) => (html.innerHTML += `<span>${number}</span>`));
}

const isOrdered = (a, b) => a <= b;

function swapElements(arr, index) {
	if (!isOrdered(arr[index], arr[index + 1])) {
		let temp = arr[index];
		arr[index] = arr[index + 1];
		arr[index + 1] = temp;
	}
	return arr;
}

function highlightCurrentEls(html, index) {
	let element = [...html.children][index];
	let nextElement = [...html.children][index + 1];
	if (!element || !nextElement) {
		return;
	}
	element.style.border = "2px dashed red";
	nextElement.style.border = "2px dashed red";
}

const generateBtn = document.getElementById("generate-btn");
const arrayContainer = document.getElementById("array-container");
const firstContainer = document.getElementById("starting-array"); // this is a <div></div>
let firstArray = [];

generateBtn.addEventListener("click", () => {
	[...arrayContainer.children].forEach((item) => {
		if (item !== firstContainer) {
			arrayContainer.removeChild(item);
		}
	});
	firstContainer.innerText = "";
	firstArray = generateArray();
	fillArrContainer(firstContainer, firstArray);
});

const sortBtn = document.getElementById("sort-btn");
sortBtn.addEventListener("click", () => {
	highlightCurrentEls(firstContainer, 0);
	final(firstArray, firstContainer);
});

function final(firstArray, firstContainer) {
	let boolArray = [];
	firstArray.forEach((item, index) => {
		let shouldContinue = Boolean(firstArray[index + 1]);
		if (shouldContinue) {
			highlightCurrentEls(firstContainer, index);
			if (!isOrdered(item, firstArray[index + 1])) {
				boolArray.push(false);
				firstArray = swapElements(firstArray, index);
			}
			firstContainer = generateContainer();
			arrayContainer.appendChild(firstContainer);
			fillArrContainer(firstContainer, firstArray);
		}
	});
	if (boolArray.every(Boolean)) {
		firstContainer.classList.add("last-one");
		return firstArray;
	}
	final(firstArray, firstContainer);
}
