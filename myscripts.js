const DIR = {
    "BACK":"./root/front.png",
    "FRONT":"./root/back.png",
    "LEFT":"./root/side-left.png",
    "RIGHT":"./root/side-right.png",
}
const DIRSTR = {
    "./root/front.png":"DOWN",
    "./root/back.png":"UP",
    "./root/side-left.png":"LEFT",
    "./root/side-right.png":"RIGHT",
}
const CHANGESTATE = {
    "DIRECTION":"direction",
    "MOVEMENT": "movement",
    "CANNOT": "cannot"
}
const getPosition = (x) => { return x*10+10 }
const myGirl = document.getElementById("my-girl")
const myGirlImg = document.getElementById("my-girl-img")
const globe = document.getElementById("globe")
const myLog = document.getElementById("my-log")
let girlStatus = {
    pos: {x:0, y:0},
    dir: DIR.FRONT
}
const addLog = (isDirection) => {
    const newLog = document.createElement('p')
    switch(isDirection){
        case CHANGESTATE.DIRECTION:
            newLog.innerHTML = `My girl changed the direction to <b>${DIRSTR[girlStatus.dir]}</b>`
            break
        case CHANGESTATE.MOVEMENT:
            newLog.innerHTML = `My girl went 1 step to <b>${DIRSTR[girlStatus.dir]}</b>`
            break
        case CHANGESTATE.CANNOT:
            newLog.innerHTML = `My girl cannto move to <b>${DIRSTR[girlStatus.dir]}</b>.`
            break
        
        default: break
    }
    if(myLog.childNodes.length > 29)
        myLog.removeChild(myLog.childNodes[29])
    myLog.prepend(newLog)
}
// chech if girl is movable
const canMove = (expectPos) => {
    if(expectPos.x < 0 || expectPos.x > globe.clientWidth/10-2 ) 
        return false
    else if(expectPos.y < 0 || expectPos.y > globe.clientHeight/10-6 )
        return false
    return true
}
// move girl
const moveGirl = () => {
    myGirl.style.left   = getPosition(girlStatus.pos.x)+"px"
    myGirl.style.top    = getPosition(girlStatus.pos.y)+"px"
    myGirlImg.src = girlStatus.dir
}
// 
const changeStatus = ( newPos ) => {
    if(girlStatus.dir === newPos.dir) {
        expectPos = {
            x: girlStatus.pos.x + newPos.pos.x, 
            y: girlStatus.pos.y + newPos.pos.y
        }
        if(canMove(expectPos)){
            girlStatus.pos = expectPos
            moveGirl()
            addLog(CHANGESTATE.MOVEMENT)
        }
        else addLog(CHANGESTATE.CANNOT)
    } else {
        girlStatus.dir = newPos.dir
        moveGirl()
        addLog(CHANGESTATE.DIRECTION)
    }
} 

globe.onkeydown = (ev) => {
    let newPos = {}
    switch(ev.key){
        case 'ArrowUp':
            changeStatus({
                dir: DIR.FRONT,
                pos: { x:0, y:-1 }
            })
            break
        case 'ArrowDown':
            changeStatus({
                dir: DIR.BACK,
                pos: { x:0, y:1 }
            })
            break
        case 'ArrowRight':
            changeStatus({
                dir: DIR.RIGHT,
                pos: { x:1, y:0 }
            })
            break
        case 'ArrowLeft':
            changeStatus({
                dir: DIR.LEFT,
                pos: { x:-1, y:0 }
            })
            break
        default: break
    }
}