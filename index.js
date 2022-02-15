let particleCount = 100

let gIndex = 2, gCorrection = 100

class point {
  constructor(x, y) {
    this.pos = {
      x: x,
      y: y
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.acceleration = {
      x: 0,
      y: 0
    }
  }
}

let x, y

let points = []

function reloadPoints(n) {
  points = []
  for (let i = 0; i < n; i++) points.push(new point(Math.floor(Math.random() * (2 * x)) - x, Math.floor(Math.random() * (2 * y)) - y))
  console.log(x, y)
}

$(() => {
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;

  x = myCanvas.width / 2,
    y = myCanvas.height / 2

  let mousedown = false

  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");


  let mousepos1 = []
  let mouse = {
    x: 0,
    y: 0
  }
  let mousedifference = {
    x: 0,
    y: 0
  }


  for (let i = 0; i < particleCount; i++) {
    points.push(new point(Math.floor(Math.random() * (2 * x)) - x, Math.floor(Math.random() * (2 * y)) - y))
    /*     points.push(new point(Math.floor(Math.random() * 100) - 50, Math.floor(Math.random() * 100) - 50))
        console.log(points) */
  }

  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";
  /* ctx.shadowColor = "white"; */

  function a(val, r) {
    if (r < gCorrection) r = gCorrection
    return gCorrection * val / (r ** gIndex)
  }

  let diff = {},
    r

  setInterval(() => {
    //var lastLoop = new Date();
    /* ctx.shadowBlur = points.length / 100; */


    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight /* 0, 0 */ );

    for (let i in points) {

      while (points[i].pos.x > x) points[i].pos.x -= 2 * x
      while (points[i].pos.y > y) points[i].pos.y -= 2 * y

      while (points[i].pos.x < -x) points[i].pos.x += 2 * x
      while (points[i].pos.y < -y) points[i].pos.y += 2 * y

      if (mousedown) {
        diff = {
          x: x + points[i].pos.x - mouse.x,
          y: y + points[i].pos.y - mouse.y
        }

        r = Math.sqrt(((diff.x) ** 2) + ((diff.y) ** 2))

        points[i].acceleration.x = a(diff.x, r)
        points[i].acceleration.y = a(diff.y, r)

        /* console.log((x + points[i].pos.x), mouse.x, (x + points[i].pos.x) - mouse.x, points[i].pos)
        console.log('kaka')
        console.log(((x + points[i].pos.x) - mouse.x)/30000 * (1*(1/((((x + points[i].pos.x) - mouse.x))**2))), ((y + points[i].pos.y) - mouse.y)/30000 * (1*(1/((((y + points[i].pos.y) - mouse.y))**2)))) */
        /* points[i].acceleration.x += ((x + points[i].pos.x) - mouse.x)/3000 * (1*(1/((((x + points[i].pos.x) - mouse.x))**2)))
        points[i].acceleration.y += ((y + points[i].pos.y) - mouse.y)/3000 * (1*(1/((((y + points[i].pos.y) - mouse.y))**2))) */
        //console.log(points[i].acceleration.y)
        //points[i].acceleration.x = ((x + points[i].pos.x - mouse.x) / 30) * (10 / (Math.sqrt(((x + points[i].pos.x - mouse.x) ** 2) + ((y + points[i].pos.y - mouse.y) ** 2)))) /*  + (Math.floor(Math.random() * 2) - 0)/3000 */
        //points[i].acceleration.y = ((y + points[i].pos.y - mouse.y) / 30) * (10 / (Math.sqrt(((x + points[i].pos.x - mouse.x) ** 2) + ((y + points[i].pos.y - mouse.y) ** 2)))) /*  + (Math.floor(Math.random() * 2) - 10)/3000 */
        //console.log(points[i].acceleration.x, points[i].acceleration.y, points[i].velocity.x, points[i].velocity.y)
        points[i].velocity.x += points[i].acceleration.x
        points[i].velocity.y += points[i].acceleration.y
      }

      function roundy(val) {
        val = val * 100
        val = Math.floor(val)
        return val / 100
      }

      points[i].pos.x -= roundy(points[i].velocity.x)
      points[i].pos.y -= roundy(points[i].velocity.y)

      //console.log(Math.sqrt(points[i].velocity.x**2 + points[i].velocity.y**2), Math.sqrt(points[i].acceleration.x**2 + points[i].acceleration.y**2), r, diff)


      ctx.beginPath()
      ctx.rect(x + points[i].pos.x, y + points[i].pos.y, 1, 1)
      ctx.stroke()
      points[i].velocity.x /= 1.01
      points[i].velocity.y /= 1.01
    }
    /*     ctx.beginPath()
        ctx.moveTo(mousepos1[0], mousepos1[1])
        ctx.lineTo(mousepos1[0] - mousedifference.x, mousepos1[1] - mousedifference.y)
        ctx.stroke()
        ctx.arc(mousepos1[0], mousepos1[1], Math.sqrt(mousedifference.x ** 2 + mousedifference.y ** 2), 0, (2 * Math.PI));*/

    /*       function gameLoop() {
            var thisLoop = new Date();
            var fps = 17 - (thisLoop - lastLoop);
            lastLoop = thisLoop;
            return fps
          }
          console.log((gameLoop()/17)) */

  }, 17);



  $(document).on('mousedown', event => {
    mousedown = true
    mousepos1 = [event.clientX, event.clientY]
    mouse.x = event.clientX
    mouse.y = event.clientY
  })
  $(document).on('mouseup', event => {
    mousedown = false
  })
  $(document).on('vclick', event => {
    mousedown = true
  });
  $(document).on('vmousemove', event => {
    mousedown = true
  });
  $(document).on('mousemove', event => {
    if (mousedown) {
      mouse.x = event.clientX
      mouse.y = event.clientY
      /*       console.log([mousepos1[0] - mouse.x, mousepos1[1] - mouse.y]) */
      /*      for(let i in points) {
             console.log(points[i], points[i].pos.x, mouse.x, points[i].pos.x - mouse.x)
             points[i].acceleration.x = (mousepos1[0] - mouse.x + (Math.floor(Math.random() * 20000) - 10000)) / 3000
             points[i].acceleration.y = (mousepos1[1] - mouse.y + (Math.floor(Math.random() * 20000) - 10000)) / 3000        
           } */
      /*       mousedifference.x = mousepos1[0] - mouse.x
            mousedifference.y = mousepos1[1] - mouse.y */

    }
  })

})