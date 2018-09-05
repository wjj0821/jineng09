require.config({
    baseUrl: "/js/",
    paths: {
        "jquery": "lib/jquery-3.3.1.min",
        "swiper": "lib/swiper-4.1.6.min",
        "index": "app/index"
    }
})
require(["index"])