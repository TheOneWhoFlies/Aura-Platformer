document.addEventListener('DOMContentLoaded',() => {
    const ad_panel = document.getElementById('advert');
    const ad_button = document.getElementById('ad-link');
    const folder = "/Web_Assets/Banners/";
    const bannerList = [
        "Daniels Cameos.png",
        "Dantes Delivery Services.png", 
        "Hey, Teach!.png", 
        "T&Js.png"];
    const linkList = [
        "https://www.instagram.com/reel/DVrFUSIDHU8/?igsh=MW53Zm91cGY3NnR6YQ==",
        "https://www.instagram.com/reel/DZLGyc9M6AI/?igsh=YmdxeW52N3Ywbnlt",
        "https://youtu.be/dQw4w9WgXcQ?si=wzRuvNyWep9x4DMd",
        "https://youtu.be/e8OlWcLg5zI?si=nnl_8A5fqVCPrTy1"
    ]
    
    function loadAd() {
        const randomIndex = Math.floor(Math.random() * bannerList.length);
        const img = bannerList[randomIndex];
        const link = linkList[randomIndex];
        ad_panel.src = folder + img;
        ad_button.href = link;
    }

    function startRefreshLoop() {
        const min = 30000;
        const max = 120000;
        const randomDelay = Math.floor(Math.random() * (max - min + 1)) + min;
        setTimeout (() => {
            loadAd();
            startRefreshLoop();
        },randomDelay);
    }
    loadAd();
    startRefreshLoop();
});