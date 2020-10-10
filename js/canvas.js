$(document).ready(function() {	
// тригерим функцию animate на загрузке картинки
const loader = PIXI.Loader.shared;
               loader.add("img/bg.png") 
               .load(animate); 

function animate() {
// Создаём из фонового изображения текстуру и спрайт
var tx = new PIXI.Texture.from("img/bg.png");
var bg = new PIXI.Sprite(tx);
bg.position.x = 0;
bg.position.y = 0;

// берем ширину и высоту фотовой картинки как основу для ширины и высоты холста
var canvas_width = bg.width;
var canvas_height = bg.height;
var speed = 8.00; // скорость 8 пикселей за тик
var topp = 50; // отступ шаров сверху

// создаем холст
let app = new PIXI.Application({ 
    width: canvas_width, 
    height: canvas_height, 
    antialias: true, 
    transparent: false, 
    resolution: 1  
}); 

// показываем холст
document.body.appendChild(app.view);
// грузим фоновое изображение на холст
app.stage.addChild(bg);

// Создаём из изображения первого шара текстуру и спрайт и грузим его на холст
var texture = new PIXI.Texture.from("img/sphere2.png");
var sphere = new PIXI.Sprite(texture);
var sphere_width = sphere.width;	
sphere.position.x = -sphere_width;
sphere.position.y = topp;
app.stage.addChild(sphere);
// Создаём из изображения второго шара текстуру и спрайт и грузим его на холст
var texture2 = new PIXI.Texture.from("img/sphere2.png");
var sphere2 = new PIXI.Sprite(texture2);
sphere2.position.x = -(canvas_width + sphere_width);
sphere2.position.y = topp;
app.stage.addChild(sphere2);

// двигаем шары с помощью тикера, чтобы создать анимацию бесконечного движения сферы	
app.ticker.add(function() {
sphere.position.x += speed; 
sphere2.position.x += speed;

if (sphere.position.x >= (canvas_width*2-sphere_width)) {
sphere.position.x = -sphere_width;
}

if (sphere2.position.x >= canvas_width) {
sphere2.position.x = -canvas_width;
}
});

// если активируется чекбокс Motion Blur, то блюрим все элементы на сцене. 
$('#MBlur').on('click', function(e) {
var blurFilter = new PIXI.filters.MotionBlurFilter ([100, 100], 25); 
var checkBox = document.getElementById("MBlur");
if (checkBox.checked == true){
bg.filters = [blurFilter];
sphere.filters = [blurFilter];
sphere2.filters = [blurFilter];
app.filters = [blurFilter];
  } 
  else {
bg.filters = []; 
sphere.filters = [];
sphere2.filters = [];   
  }

  });
 }
});