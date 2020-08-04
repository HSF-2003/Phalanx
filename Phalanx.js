const ctx = canvas.getContext('2d');
white = 'rgb(255, 255, 255)'
black = 'rgb(0, 0, 0)'
red = 'rgb(200, 9, 9)'
blue = 'rgb(20, 20, 255)'
highlight = 'rgb(240, 230, 20)'
ghost = 'rgb(250, 250, 175)'


if(width > height) {
    var shortest = height-3
} else {
    var shortest = width-3
}

block = shortest/8

function drawLine(startx, starty, endx, endy) {
    ctx.fillStyle = black;
    ctx.beginPath();
    ctx.moveTo(startx, starty);
    ctx.lineTo(endx, endy);
    ctx.stroke();
}


function cls(){
    ctx.fillStyle = white;
    ctx.fillRect(0, 0, shortest, shortest);
}

function drawMap(){
    ctx.fillStyle = black
    for (i = 0; i <= 8; i++) {
        ctx.fillRect((block*i), 0, 1, shortest);
        ctx.fillRect(0, (block*i), shortest, 1);
    }

    for (i = 1; i <= 4; i++){
        drawLine((shortest/4)*i, 0, shortest, (shortest/4)*(4-i));
        drawLine(0, (shortest/4)*(4-i), (shortest/4)*i, shortest);
        drawLine((shortest/4)*i, 0, 0, (shortest/4)*i);
        drawLine(shortest, (shortest/4)*i, (shortest/4)*i, shortest);
    }
}

function createAux(x, y, rotation, nooutline){
    ctx.beginPath();
    if (rotation == 0) {
        ctx.moveTo(x*block, y*block);
        ctx.lineTo((x+1)*block, (y+1)*block);
        ctx.lineTo(x*block, (y+1)*block);
        ctx.lineTo(x*block, y*block)
    }
    if (rotation == 90) {
        ctx.moveTo(x*block, y*block);
        ctx.lineTo((x+1)*block, y*block);
        ctx.lineTo(x*block, (y+1)*block);
        ctx.lineTo(x*block, y*block)
    }
    if (rotation == 180) {
        ctx.moveTo(x*block, y*block);
        ctx.lineTo((x+1)*block, y*block);
        ctx.lineTo((x+1)*block, (y+1)*block);
        ctx.lineTo(x*block, y*block)
    }
    if (rotation == 270) {
        ctx.moveTo((x+1)*block, y*block);
        ctx.lineTo((x+1)*block, (y+1)*block);
        ctx.lineTo(x*block, (y+1)*block);
        ctx.lineTo((x+1)*block, y*block)
    }
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.stroke()
    ctx.lineWidth = 1
}

function createHoplite(x, y, rotation){
    ctx.beginPath()
    if (rotation == 0){
        ctx.moveTo(x*block, y*block)
        ctx.lineTo((x+1)*block, (y+1)*block)
        ctx.lineTo((x+1)*block, (y+2)*block)
        ctx.lineTo(x*block, (y+2)*block)
        ctx.lineTo(x*block, y*block)
    }
    if (rotation == 90){
        ctx.moveTo((x+1)*block, y*block)
        ctx.lineTo(x*block, (y+1)*block)
        ctx.lineTo(x*block, (y+2)*block)
        ctx.lineTo((x+1)*block, (y+2)*block)
        ctx.lineTo((x+1)*block, y*block)
    }
    if (rotation == 180){
        ctx.moveTo(x*block, y*block)
        ctx.lineTo(x*block, (y+2)*block)
        ctx.lineTo((x+1)*block, (y+1)*block)
        ctx.lineTo((x+1)*block, y*block)
        ctx.lineTo(x*block, y*block)
    }
    if (rotation == 270){
        ctx.moveTo(x*block, y*block)
        ctx.lineTo(x*block, (y+1)*block)
        ctx.lineTo((x+1)*block, (y+2)*block)
        ctx.lineTo((x+1)*block, y*block)
        ctx.lineTo(x*block, y*block)
    }
    ctx.fill()
    ctx.lineWidth = 2;
    ctx.stroke()
    ctx.lineWidth = 1

}


function createSyntagma(x, y, rotation){
    ctx.beginPath()
    if (rotation == 0){
        ctx.moveTo(x*block, (y+1)*block)
        ctx.lineTo((x+2)*block, (y+1)*block)
        ctx.lineTo((x+1)*block, y*block)
        ctx.lineTo(x*block, (y+1)*block)
    }
    if (rotation == 180){
        ctx.moveTo(x*block, y*block)
        ctx.lineTo((x+2)*block, y*block)
        ctx.lineTo((x+1)*block, (y+1)*block)
        ctx.lineTo(x*block, y*block)
    }
    ctx.fill()
    ctx.lineWidth = 2;
    ctx.stroke()
    ctx.lineWidth = 1
}

function createArcher(x, y){
    ctx.beginPath()
    ctx.moveTo(x*block, y*block)
    ctx.lineTo((x+1)*block, y*block)
    ctx.lineTo((x+1)*block, (y+1)*block)
    ctx.lineTo(x*block, (y+1)*block)
    ctx.lineTo(x*block, y*block)
    ctx.fill()
    ctx.lineWidth = 2;
    ctx.stroke()
    ctx.lineWidth = 1;
    
}

ap = []

function refreshAll() {
    for (i = 0; i <= ap.length-1; i++){
        ap[i].refresh()
    }
}


class Syntagma {
    constructor(x, y, team, color){
        this.team = team
        if (team == red){
            this.rotation = 0
        }
        if (team == blue){
            this.rotation = 180
        }
        this.type = Syntagma
        this.x = x
        this.y = y
        this.color = color

        ctx.fillStyle = this.color
        createSyntagma(x, y, this.rotation)
    }
    move(x, y){
        cls()
        drawMap()
        this.x = x
        this.y = y
        refreshAll()
        
    }
    refresh() {
        ctx.fillStyle = this.color
        createSyntagma(this.x, this.y, this.rotation)
    }
}

class Hoplite {
    constructor(x, y, team, side, color){
        this.team = team
        this.side = side
        if (team == red){
            if (side == "left"){
                this.rotation = 90
            }
            if (side == "right"){
                this.rotation = 0
            }
            
        }
        if (team == blue){
            if (side == "left"){
                this.rotation = 270
            }
            if (side == "right"){
                this.rotation = 180
            }
        }
        this.type = Hoplite
        this.x = x
        this.y = y
        this.color = color
        ctx.fillStyle = this.color
        createHoplite(x, y, this.rotation)
    }
    move(x, y){
        cls()
        drawMap()
        this.x = x
        this.y = y
        refreshAll()
        
    }
    refresh() {
        ctx.fillStyle = this.color
        createHoplite(this.x, this.y, this.rotation)
    }
}


class Archer {
    constructor(x, y, color){
        this.x = x
        this.y = y
        this.color = color
        ctx.fillStyle = this.color
        createArcher(x, y)
    }
    move(x, y){
        cls()
        drawMap()
        this.x = x
        this.y = y
        refreshAll()
        
    }
    refresh() {
        ctx.fillStyle = this.color
        createArcher(this.x, this.y)
    }
}

class Auxiliary {
    constructor(x, y, color, direction){
        if (direction == "UR"){
            this.rotation = 90
        }
        if (direction == "UL"){
            this.rotation = 180
        }
        if (direction == "LR"){
            this.rotation = 0
        }
        if (direction == "LL"){
            this.rotation = 270
        }
        this.direction = direction
        this.type = Auxiliary
        this.x = x
        this.y = y
        this.color = color
        ctx.fillStyle = this.color
        createAux(x, y, this.rotation)
    }
    move(x, y){
        cls()
        drawMap()
        this.x = x
        this.y = y
        refreshAll()
        
    }
    refresh() {
        ctx.fillStyle = this.color
        createAux(this.x, this.y, this.rotation)
    }
}


function resetTeam(team){
    if (team == "blue" || team == null){
        color = blue
        BSyntagma = new Syntagma(3, 1, color, color)
        ap.push(BSyntagma)
        
        BHopliteR = new Hoplite(0, 0, color, "right", color)
        BHopliteL = new Hoplite(7, 0, color, "left", color)
        ap.push(BHopliteL, BHopliteR)
        
    
        BArcherR0 = new Archer(1, 1, color)
        BArcherR1 = new Archer(2, 1 ,color)
        BArcherL0 = new Archer(5, 1, color)
        BArcherL1 = new Archer(6, 1, color)
        ap.push(BArcherR0, BArcherR1, BArcherL0, BArcherL1)



        BAux0 = new Auxiliary(1, 0, color, "UR")
        BAux1 = new Auxiliary(1, 0, color, "LL")
        BAux2 = new Auxiliary(2, 0, color, "LR")
        BAux3 = new Auxiliary(3, 0, color, "UR")
        BAux4 = new Auxiliary(4, 0, color, "UL")
        BAux5 = new Auxiliary(5, 0, color, "LL")
        BAux6 = new Auxiliary(6, 0, color, "LR")
        BAux7 = new Auxiliary(6, 0, color, "UL")
        ap.push(BAux0, BAux1, BAux2, BAux3, BAux4, BAux5, BAux6, BAux7)
    }
    if (team == "red" || team == null){
        ctx.fillStyle = red
        
        color = red
        RSyntagma = new Syntagma(3, 6, color, color)
        ap.push(RSyntagma)
        
        RHopliteR = new Hoplite(0, 6, color, "right", color)
        RHopliteL = new Hoplite(7, 6, color, "left", color)
        ap.push(RHopliteL, RHopliteR)
        
    
        RArcherR0 = new Archer(1, 6, color)
        RArcherR1 = new Archer(2, 4 ,color)
        RArcherL0 = new Archer(5, 6, color)
        RArcherL1 = new Archer(6, 6, color)
        ap.push(RArcherR0, RArcherR1, RArcherL0, RArcherL1)



        RAux0 = new Auxiliary(1, 7, color, "LR")
        RAux1 = new Auxiliary(1, 7, color, "UL")
        RAux2 = new Auxiliary(2, 7, color, "UR")
        RAux3 = new Auxiliary(3, 7, color, "LR")
        RAux4 = new Auxiliary(4, 7, color, "LL")
        RAux5 = new Auxiliary(5, 7, color, "UL")
        RAux6 = new Auxiliary(6, 7, color, "UR")
        RAux7 = new Auxiliary(6, 7, color, "LL")
        ap.push(RAux0, RAux1, RAux2, RAux3, RAux4, RAux5, RAux6, RAux7)
    }
}

function getlength(x1, y1, x2, y2){
    difx = Math.abs(x1 - x2)
    dify = Math.abs(y1 - y2)
    length = Math.sqrt(Math.pow(difx, 2) + Math.pow(dify, 2))
    return(length)
}

function getMidpoint(x1, y1, x2, y2){
    midpointx = (x1 + x2) / 2
    midpointy = (y1 + y2) / 2
    return([midpointx, midpointy])
}

function areaTriangle(x1, y1, x2, y2, x3, y3){
    s = (getlength(x1, y1, x2, y2) + getlength(x2, y2, x3, y3) + getlength(x3, y3, x1, y1))/2
    area = Math.sqrt(s * ((s - getlength(x1, y1, x2, y2)) * (s - getlength(x2, y2, x3, y3)) * (s - getlength(x3, y3, x1, y1)))) 
    return(area)
}

function isInsideTriangle(px, py, x1, y1, x2, y2, x3, y3){
    maintriangle = areaTriangle(x1, y1, x2, y2, x3, y3)
    triangle1 = areaTriangle(px, py, x1, y1, x2, y2)
    triangle2 = areaTriangle(px, py, x2, y2, x3, y3)
    triangle3 = areaTriangle(px, py, x3, y3, x1, y1)
    pointtriangle = triangle1 + triangle2 + triangle3
    if (Math.round(maintriangle) == Math.round(pointtriangle)){
        return(true)
    }else{
        return(false)
    }
}

function clicked(){
    ctl = document.getElementById('Javascript_example');
    mousex = event.clientX;     
    mousey = event.clientY;     
    coor = "X coords: " + mousex + ", Y coords: " + mousey;
    currentlyclicked = null
    for (i = 0; i <= ap.length-1; i++){
        if (ap[i] instanceof Archer){
           archpos = [ap[i].x, ap[i].y]
           floorcursorpos = [Math.floor(mousex / block), Math.floor(mousey / block)]
           if (archpos[0] == floorcursorpos[0] && archpos[1] == floorcursorpos[1]){
            currentlyclicked = ap[i]
           }
        }

        
        if (ap[i] instanceof Hoplite){
            Hoplitex = ap[i].x
            Hoplitey = ap[i].y
            HopliteRotation = ap[i].rotation
            p1 = 0
            if (HopliteRotation == 0 || HopliteRotation == 90){
                hopsquarepos = [Hoplitex, Hoplitey + 1]
                if (HopliteRotation == 0){
                    p1 = [Hoplitex, Hoplitey]
                }
                if (HopliteRotation == 90){
                    p1 = [Hoplitex + 1, Hoplitey]
                }
            }
            if (HopliteRotation == 180 || HopliteRotation == 270){
                hopsquarepos = [Hoplitex, Hoplitey]
                if (HopliteRotation == 180){
                    p1 = [Hoplitex, Hoplitey + 2]
                }
                if (HopliteRotation == 270){
                    p1 = [Hoplitex + 1, Hoplitey + 2]
                }
            }
            p2 = [Hoplitex, Hoplitey + 1]
            p3 = [Hoplitex + 1, Hoplitey + 1]
            
            insideTriangle = isInsideTriangle(mousex, mousey, p1[0] * block, p1[1] * block, p2[0] * block, p2[1] * block, p3[0] * block, p3[1] * block)
            
            floorcursorpos = [Math.floor(mousex / block), Math.floor(mousey / block)]
            
            if (hopsquarepos[0] == floorcursorpos[0] && hopsquarepos[1] == floorcursorpos[1]){
                currentlyclicked = ap[i]
            }
            if (insideTriangle){
                currentlyclicked = ap[i]
            }
        }
        
        
        if (ap[i] instanceof Syntagma){
            syntagmax = ap[i].x
            syntagmay = ap[i].y 
            synTip = 0
            synPoint1 = 0
            synPoint2 = 0
            if (ap[i].rotation == 0){
                synTip = [(syntagmax + 1) * block, syntagmay * block]
                synPoint1 = [syntagmax * block, (syntagmay + 1) * block]
                synPoint2 = [(syntagmax + 2) * block, (syntagmay + 1) * block]
            }
            if (ap[i].rotation == 180){
                synTip = [(syntagmax + 1) * block, ((syntagmay + 1) * block)]
                synPoint1 = [syntagmax * block, syntagmay * block]
                synPoint2 = [(syntagmax + 2) * block, syntagmay * block]
            }
            if (isInsideTriangle(mousex, mousey, synTip[0], synTip[1], synPoint1[0], synPoint1[1], synPoint2[0], synPoint2[1]) == true){
                currentlyclicked = ap[i]
            }
        }

        if (ap[i] instanceof Auxiliary){
            auxx = ap[i].x
            auxy = ap[i].y

            if (ap[i].rotation == 0){
                auxtip = [auxx * block, (auxy + 1) * block]
                aux1 = [auxx * block, auxy * block]
                aux2 = [(auxx + 1) * block, (auxy + 1) * block]
            }
            if (ap[i].rotation == 90){
                auxtip = [auxx * block, auxy * block]
                aux1 = [(auxx + 1) * block, auxy * block]
                aux2 = [auxx * block, (auxy + 1) * block]
            }
            if (ap[i].rotation == 180){
                auxtip = [(auxx + 1) * block, auxy * block]
                aux1 = [(auxx + 1) * block, (auxy + 1) * block]
                aux2 = [auxx * block, auxy * block]
            }
            if (ap[i].rotation == 270){
                auxtip = [(auxx + 1) * block, (auxy + 1) * block]
                aux1 = [(auxx + 1) * block, auxy * block]
                aux2 = [auxx * block, (auxy + 1) * block]
            }

            if (isInsideTriangle(mousex, mousey, auxtip[0], auxtip[1], aux1[0], aux1[1], aux2[0], aux2[1]) == true){
                currentlyclicked = ap[i]
            }   
        }
    }
    if (currentlyclicked != null){
        if (currentlyclicked.color != ghost){
            console.log("not ghost")
            initiateMove(currentlyclicked)
            lastclicked = currentlyclicked
            currentlyclicked = null
        }else{
            console.log("ghost")
            lastclicked.move(currentlyclicked.x, currentlyclicked.y)
        }
    } else {
        cls()
        drawMap()
        refreshAll()
    }
}

function searchLoc(x, y, tile){
    if (x > 7 || y > 7 || x < 0 || y < 0){
        return(true)
    }
    


    peices = null
    for (j = 0; j < ap.length; j++){
        if (ap[j].x == x && ap[j].y == y){
            
            peices = ap[j]
        }
        if ((ap[j] instanceof Syntagma && ap[j].x + 1 == x && ap[j].y == y) || (ap[j] instanceof Hoplite && ap[j].y + 1 == y && ap[j].x == x)){
            
            peices = ap[j]
        }
    }


    if (peices != null){
        return(true)
    }else{
        return(false)
    }
}

function drawGhost(x, y, type){
    if (type instanceof Syntagma && x != 7){
        ghosts[x * y] = new Syntagma(x, y, type.team, ghost)
    }
    if (type instanceof Auxiliary){
        ghosts[x * y] = new Auxiliary(x, y, ghost, type.direction)
    }
    if (type instanceof Hoplite){
        ghosts[x * y] = new Hoplite(x, y, type.team, type.side, ghost)
    }
}




function initiateMove(p){
    cls()
    drawMap()
    refreshAll()
    oldcolor = p.color
    p.color = highlight
    p.refresh()
    p.color = oldcolor
    ghosts = new Array()
    finished = []
    if (true){
        if (p instanceof Archer){
            finished = []
            for (i = 1; i < 8; i++){
                if (searchLoc(p.x, p.y - i) == false && finished[0] != true){
                    ghosts[i] = new Archer(p.x, p.y - i, ghost)  
                } else {
                    finished[0] = true 
                }
                if (searchLoc(p.x + i, p.y - i) == false && finished[1] != true){
                    ghosts[i] = new Archer(p.x + i, p.y - i, ghost)
                } else {
                    finished[1] = true  
                }
                if (searchLoc(p.x + i, p.y) == false && finished[2] != true){
                    ghosts[i] = new Archer(p.x + i, p.y, ghost)
                } else {
                    finished[2] = true  
                }
                if (searchLoc(p.x + i, p.y + i) == false && finished[3] != true){
                    ghosts[i] = new Archer(p.x + i, p.y + i, ghost)
                } else {
                    finished[3] = true  
                }
                if (searchLoc(p.x, p.y + i) == false && finished[4] != true){
                    ghosts[i] = new Archer(p.x, p.y + i, ghost)
                } else {
                    finished[4] = true  
                }
                if (searchLoc(p.x - i, p.y + i) == false && finished[5] != true){
                    ghosts[i] = new Archer(p.x - i, p.y + i, ghost)
                } else {
                    finished[5] = true  
                }
                if (searchLoc(p.x - i, p.y) == false && finished[6] != true){
                    ghosts[i] = new Archer(p.x - i, p.y, ghost)
                } else {
                    finished[6] = true  
                }
                if (searchLoc(p.x - i, p.y - i) == false && finished[7] != true){
                    ghosts[i] = new Archer(p.x - i, p.y - i, ghost)
                } else {
                    finished[7] = true  
                }
                
            }
        } else {
            finished = []
            type = p.constructor
            
            for (i = 1; i < 8; i++){
                if (searchLoc(p.x, p.y - (i * 2), p) == false && finished[0] != true){
                    drawGhost(p.x, p.y - (i * 2), p)  
                } else {
                    finished[0] = true 
                }
                if (searchLoc(p.x + i, p.y - i, p) == false && finished[1] != true){
                    drawGhost(p.x + i, p.y - i, p)
                } else {
                    finished[1] = true  
                }
                if (searchLoc(p.x + (i * 2), p.y, p) == false && finished[2] != true){
                    drawGhost(p.x + (i * 2), p.y, p)
                } else {
                    finished[2] = true  
                }
                if (searchLoc(p.x + i, p.y + i, p) == false && finished[3] != true){
                    drawGhost(p.x + i, p.y + i, p)
                } else {
                    finished[3] = true  
                }
                if (searchLoc(p.x, p.y + (i * 2), p) == false && finished[4] != true){
                    drawGhost(p.x, p.y + (i * 2), p)
                } else {
                    finished[4] = true  
                }
                if (searchLoc(p.x - i, p.y + i, p) == false && finished[5] != true){
                    drawGhost(p.x - i, p.y + i, p)
                } else {
                    finished[5] = true  
                }
                if (searchLoc(p.x - (i * 2), p.y, p) == false && finished[6] != true){
                    drawGhost(p.x - (i * 2), p.y, p)
                } else {
                    finished[6] = true  
                }
                if (searchLoc(p.x - i, p.y - i, p) == false && finished[7] != true){
                    drawGhost(p.x - i, p.y - i, p)
                } else {
                    finished[7] = true  
                }
        
            }
        }
    }
    
    
    
    

}



cls()
drawMap()
resetTeam()