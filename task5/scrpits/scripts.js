function generateCar(name, picture_path, speed, cost){
    //name-pic-speed-cost
    let car = {
        name: name + '',
        picture_path: picture_path,
        speed: speed,
        cost: cost
    };
    return car;
}

let car_template_html = `
<div class="car">
<img src="{{car_picture}}" alt="image not found">
<ul class="info">
    <li>{{name}}</li>
    <li>{{speed}}mph</li>
    <li>{{cost}}$</li>
</ul>
</div>
`;

function car_html(data){
    let car = car_template_html;
    car = car.replace('{{car_picture}}', data.pic_path);
    car = car.replace('{{name}}', data.name);
    car = car.replace('{{speed}}', data.speed);
    car = car.replace('{{cost}}', data.cost);
    return car;
}

module.exports = {car_template_html, car_html};