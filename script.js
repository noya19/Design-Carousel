const section_arr = document.querySelectorAll('.project_section .items');
// console.log(section_arr);
let previous = section_arr[0];
let postion_arr = [0, -455, -910, -1365];
let cur_idx = 0;
var px = 0;
let active_card_index = 0;
let next_card_index = 0;

const offset = [0, -990, -1980, -2970];
const dir_btn = document.querySelectorAll(".buttons .directions div");
let prev_dir_btn = dir_btn[0];

section_arr.forEach(cur_section => {
    cur_section.addEventListener('click', () => {

        cur_idx = [...section_arr].indexOf(cur_section);


        // 1. change the colors of selected

        previous.querySelector('div').classList.remove('selected_div');
        previous.querySelector('p').classList.remove('selected_p');

        cur_section.querySelector('div').classList.add('selected_div');
        cur_section.querySelector('p').classList.add('selected_p');

        previous = cur_section;


        // 2. translate the position of the frames
        const section_mvmt = document.querySelector(".project_cards .section_mvmt");
        section_mvmt.style.transform = `translateY(${postion_arr[cur_idx]}px)`;


        // 3. Reset active_index and also slides;
        const dots = document.querySelectorAll(".directions div");
        dots[active_card_index].classList.remove("first");


        prev_dir_btn = dir_btn[0];
        prev_dir_btn.classList.remove("first");

        // add first class to the first dot.
        dots[0].classList.add("first");
        active_card_index = 0;
        next_card_index = 0;

        const slide = document.querySelectorAll(".slides")[cur_idx];
        slide.style.transform = `translateX(${0}px)`;

        // set px = 0;
        px = 0;

    })
})


// selecting the button by the custom attribute
const buttons = document.querySelectorAll("[data-carousel-buttons]");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const mvmt = button.dataset.carouselButtons === "next" ? -990 : 990;
        const mvmt_dots = button.dataset.carouselButtons === "next" ? 1 : -1;

        // for the movement of slides ( cur_idx is refered from the section)
        const slide = document.querySelectorAll(".slides")[cur_idx];

        if (px === -2970 && mvmt < 0) {
            px = 0;
        } else if (px === 0 && mvmt > 0) {
            px = -2970;
        }
        else {
            px += mvmt;
        }
        // console.log(px);

        slide.style.transform = `translateX(${px}px)`;


        next_card_index = active_card_index + mvmt_dots;
        if (next_card_index < 0) next_card_index = 3;
        else if (next_card_index >= 4) next_card_index = 0;

        // console.log(active_card_index + " " + next_card_index);

        // code to change the dots
        const dots = document.querySelectorAll(".directions div");
        dots[active_card_index].classList.remove("first");
        dots[next_card_index].classList.add("first");

        active_card_index = next_card_index;

    })
})


// To load random images

const img_elements = document.querySelectorAll(".card");
// console.log(img_elements.length);
img_elements.forEach(img => {
    img.src = `https://source.unsplash.com/random/architecture-interior&${Math.random() * 1000}`;
})


dir_btn.forEach(cur => {
    cur.addEventListener("click", () => {
        const dir_btn_idx = [...dir_btn].indexOf(cur);
        // console.log(dir_btn_idx);

        const slide = document.querySelectorAll(".slides")[cur_idx];
        slide.style.transform = `translateX(${offset[dir_btn_idx]}px)`;

        const dots = document.querySelectorAll(".directions div");

        next_card_index = dir_btn_idx;
        dots[active_card_index].classList.remove("first");
        dots[next_card_index].classList.add("first");

        // console.log(active_card_index + " " + next_card_index);

        active_card_index = next_card_index;
    });
})