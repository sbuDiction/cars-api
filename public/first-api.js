const brandsElem = document.querySelector(".brands");
const brandListTemplateElem = document.querySelector(".brandListTemplate");
const brandListTemplate = Handlebars.compile(brandListTemplateElem.innerHTML);
let button = document.querySelector('.add');
let clear = document.querySelector('.clear')
let brand_list = []

//add button
let display = document.querySelector('.brandName');
button.addEventListener('click', function () {
	post_brand()
	setTimeout(function () {
		location.reload(true);
	}, 100);
})
//clear button
clear.addEventListener('click', function () {
	brandsElem.innerHTML = ''
	brand_list = []

})

//api
async function post_brand() {
	let input_value = display.value
	let list = {
		brandName: input_value
	}

	axios.post('/api/brand_add', list)
}

document.addEventListener('DOMContentLoaded', () => {
	axios.get('/api/brand_list')
		.then(function (response) {
			let results = response.data
			brandsElem.innerHTML = brandListTemplate({
				brands: results
			})
		})

})