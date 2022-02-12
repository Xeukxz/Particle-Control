$(() => {
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;

  let x = myCanvas.width / 2,
    y = myCanvas.height / 2

  let mousedown = false

  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

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


  let mousepos1 = []
  let mouse = {
    x: 0,
    y: 0
  }
  let mousedifference = {
    x: 0,
    y: 0
  }

  let points = [new point(0, 0), new point(0, 10), new point(0, -10)]

  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "white";

  setInterval(() => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight /* 0, 0 */ );

    for (let i in points) {
      points[i].pos.x = points[i].pos.x - points[i].velocity.x
      points[i].pos.y = points[i].pos.y - points[i].velocity.y

      ctx.beginPath()
      ctx.arc(x + points[i].pos.x, y + points[i].pos.y, 3, 0, (2 * Math.PI));
      ctx.stroke()
      ctx.fill()

      points[i].velocity.x += points[i].acceleration.x
      points[i].velocity.y += points[i].acceleration.y

    }

    ctx.beginPath()
    ctx.moveTo(mousepos1[0], mousepos1[1])
    ctx.lineTo(mousepos1[0] - mousedifference.x, mousepos1[1] - mousedifference.y)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(mousepos1[0], mousepos1[1], Math.sqrt(mousedifference.x ** 2 + mousedifference.y ** 2), 0, (2 * Math.PI));
    ctx.stroke()
  }, 10);


  $(document).on('mousedown', event => {
    mousedown = true
    mousepos1 = [event.clientX, event.clientY]
  })
  $(document).on('mouseup', event => {
    mousedown = false
  })

  $(document).on('mousemove', event => {
    if (mousedown) {
      mouse.x = event.clientX
      mouse.y = event.clientY
      console.log([mousepos1[0] - mouse.x, mousepos1[1] - mouse.y])
      for(let i in points) {
        points[i].acceleration.x = (mousepos1[0] - mouse.x + Math.floor(Math.random() * 10) - 5) / 3000
        points[i].acceleration.y = (mousepos1[1] - mouse.y + Math.floor(Math.random() * 10) - 5) / 3000        
      }
      mousedifference.x = mousepos1[0] - mouse.x
      mousedifference.y = mousepos1[1] - mouse.y

    }
  })

})