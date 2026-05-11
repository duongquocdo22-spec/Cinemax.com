document.addEventListener("DOMContentLoaded", () => {

    // LẤY ELEMENT
    const schedulePopup = document.getElementById("schedulePopup");
    const cinemaTitle = document.getElementById("cinemaTitle");
    const movieList = document.getElementById("movieList");
    const closeBtn = document.querySelector(".close");

    // DATA
    const cinemaData = {
        "CineMax Hà Nội": [
            {
                name: "Quỷ Nhập Tràng 2",
                img: "Quy-nhap-trang-2.jpg",
                times: ["10:00", "13:00", "18:00"]
            },
            {
                name: "Không còn chúng ta",
                img: "Khong con chung ta.png",
                times: ["11:00", "15:00", "20:00"]
            }
        ],

        "CineMax Cầu Giấy": [
            {
                name: "Toy Story 5",
                img: "Toy Story 5.png",
                times: ["09:00", "14:00", "20:00"]
            },
            {
                name: "Thỏ ơi",
                img: "Tho_oi_poster.jpg",
                times: ["10:30", "16:00", "19:30"]
            }
        ],

        "CineMax Bắc Từ Liêm": [
            {
                name: "Nhà ba tôi 1 phòng",
                img: "Nha ba toi 1 phong.png",
                times: ["08:00", "16:00", "22:00"]
            },
            {
                name: "Một chuyến xe chiều",
                img: "Mot chuyen xe chieu.png",
                times: ["09:00", "14:00", "20:00"]
            },
        ]
    };

    // ===== MỞ POPUP =====
    document.querySelectorAll(".cinema-card button").forEach(btn => {
        btn.addEventListener("click", () => {

            const name = btn.closest(".cinema-card").querySelector("h3").innerText;

            cinemaTitle.innerText = "Lịch chiếu - " + name;
            schedulePopup.style.display = "flex";

            movieList.innerHTML = "";

            const movies = cinemaData[name];

            if (movies) {
                movies.forEach(movie => {
                    movieList.innerHTML += `
                        <div class="movie-item">
                            <div class="poster">
                                <img src="${movie.img}">
                            </div>
                            <h3>${movie.name}</h3>
                            <div class="times">
                                ${movie.times.map(t => `<button>${t}</button>`).join("")}
                            </div>
                        </div>
                    `;
                });

            } else {
                movieList.innerHTML = "<p>Chưa có lịch chiếu</p>";
            }
        });
    });

    //CLICK GIỜ  
    movieList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {

            const btn = e.target;
            const movie = btn.closest(".movie-item").querySelector("h3").innerText;
            const time = btn.innerText;

            alert(`🎬 Đặt vé thành công!
${cinemaTitle.innerText}
Phim: ${movie}
Giờ: ${time}`);

            schedulePopup.style.display = "none";
        }
    });

    // NÚT ĐÓNG 
    closeBtn.addEventListener("click", () => {
        schedulePopup.style.display = "none";
    });

    // CLICK NGOÀI 
    schedulePopup.addEventListener("click", (e) => {
        if (e.target === schedulePopup) {
            schedulePopup.style.display = "none";
        }
    });

});