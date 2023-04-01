class Ground{

constructor(x, y, height, width) {

    var options = {
        isStatic:true
    }
        this.body = Bodies.rectangle(x, y, height, width, options);
        this.height = height;
        this.width = width;
World.add(world, this.body);    
}
 show() {
    push()
fill(148,127,147);
noStroke();
rect(this.body.position.x, this.body.position.y, this.height, this.width);
    pop()
 }

}