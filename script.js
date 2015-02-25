
document.getElementById("anleitung").addEventListener("click", show);


function show(id) {
    if(document.getElementById) {
        var mydiv = document.getElementById(id);

        mydiv.style.display = (mydiv.style.display=='block'?'none':'block');
    }
}
