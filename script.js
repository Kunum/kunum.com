let toggled = false;

let timeout;

const tileSize = 80;
const wrapper = document.getElementById("root-tiles");


let columns = 0;
let rows = 0;

const toggle = () => {
    document.body.classList.toggle("toggled");
}

const handleClick = index => {
    toggle();

    toggled = !toggled;

    anime({
        targets: ".tile",
        opacity: toggled ? 0 : 1,
        delay: anime.stagger(50, {
            grid: [columns, rows],
            from: index
        })
    });

    if (!toggled){
        window.onresize = () => createGrid();
        clearTimeout(timeout);
    }
    else{
        window.onresize = () => {true}
        timeout = setTimeout(()=>{
            document.body.removeChild(document.getElementById("root-tiles"));
            document.body.removeChild(document.getElementById("root-text"));
            document.body.style.overflowY = "auto";
            document.getElementById("root").style.pointerEvents = "all";
        }, 2000);
    }
    
}

const createTile = index => {
    const tile = document.createElement("div");

    tile.classList.add("tile");
    tile.onclick = e => handleClick(index);

    return tile;
}

const createTiles = quantity => {
    Array.from(Array(quantity)).map((tile, index) => {
        wrapper.appendChild(createTile(index));
    })
}

const createGrid = () => {
    wrapper.innerHTML = "";

    columns = Math.floor(document.body.clientWidth / tileSize);
    rows = Math.floor(document.body.clientHeight / tileSize);

    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);

    createTiles(columns * rows);
}

createGrid();

window.onresize = () => createGrid();
window.onload = () => {
    document.getElementById("beginning-subtitle").style.opacity = 1;
}