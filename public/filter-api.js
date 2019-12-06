let color_dropdown = document.querySelector('.colorList');
let brand_dropdown = document.querySelector('brandList');
let search_btn = document.querySelector('.btn');

let template_one = document.querySelector('.template_color').innerHTML;
let color_compiled_template = Handlebars.compile(template_one);
let color_template_data = document.querySelector('.color_template');

let brand_template = document.querySelector('.brand');
let compile = Handlebars.compile(brand_template.innerHTML)
let template_data = document.querySelector('.template_brand')


let display_box = document.querySelector('.list')
let compiler = Handlebars.compile(display_box.innerHTML)
let templateData = document.querySelector('.results')

let color_input = document.querySelector('.colorSearch')
// let cars_data = document.querySelector('.cars')

const render_color = async () => {
    axios.get('http://api-tutor.herokuapp.com/v1/colors')
        .then(function (response) {
            let results = response.data
            console.log(results);

            let display_html = color_compiled_template({
                color: results
            });
            color_template_data.innerHTML = display_html;
        })
}

const render_brand = async () => {
    axios.get('http://api-tutor.herokuapp.com/v1/makes')
        .then(function (response) {
            let results = response.data
            console.log(results);

            let display_html = compile({
                brand: results
            });
            template_data.innerHTML = display_html;

        })

}

document.addEventListener('DOMContentLoaded', () => {
    render_color()
    render_brand()
})
search_btn.addEventListener('click', () => {
    console.log(color_input.value);
    axios.get('http://api-tutor.herokuapp.com/v1/cars/color/' + color_input.value)
        .then((response) => {
            let results = response.data
            console.log(results);
            let show_cars = compiler({
                cars: results
            })
            templateData.innerHTML = show_cars

        })

})



