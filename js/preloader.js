document.body.onload=function () {
    setTimeout(function () {
        var preloader=document.getElementById('page-preloader');
        if(!preloader.classList.add('done')){
            preloader.classList.add('done');
        }
    },100);
}