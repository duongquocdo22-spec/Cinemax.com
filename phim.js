// CineMax Phim JavaScript
// File này chứa các chức năng liên quan đến trang phim: tìm kiếm phim, trailer, đặt vé, pass vé
// Được tách từ main.js để dễ quản lý

window.addEventListener('DOMContentLoaded', () => {
    console.log('CineMax Phim loaded');

    // Phần tìm kiếm phim
    const searchInput = document.getElementById('searchInput');
    const suggestionsBox = document.getElementById('suggestions');

    // Dữ liệu phim cho tìm kiếm
    const movieData = [
        { title: 'Quỷ Nhập Tràng 2', url: 'phim.html' },
        { title: 'Toy Story 5', url: 'phim_hoat_hinh.html' },
        { title: 'Nhà ba tôi 1 phòng', url: 'nha_ba_toi_1_phong.html' },
        { title: 'Một chuyến xe chiều', url: 'Mot_chuyen_xe_chieu.html' },
        { title: 'Không còn chúng ta', url: 'Khong_con_chung_ta.html' },
        { title: 'Thỏ ơi', url: 'tho_oi.html' },
    ];

    // Dữ liệu phim cho dropdown
    const movies = [
        { title: 'Quỷ nhập tràng', link: 'phim.html' },
        { title: 'Thỏ ơi', link: 'tho_oi.html' },
        { title: 'Nhà ba tôi 1 phòng', link: 'nha_ba_toi_1_phong.html' },
        { title: 'Một chuyến xe chiều', link: 'Mot_chuyen_xe_chieu.html' },
        { title: 'Toy Story 5', link: 'phim_hoat_hinh.html' },
        { title: 'Không còn chúng ta', link: 'Khong_con_chung_ta.html' }
    ];

    // Hàm tạo gợi ý tìm kiếm
    function createSearchSuggestion(movie) {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = movie.title;
        div.addEventListener('click', () => {
            window.location.href = movie.url;
        });
        return div;
    }

    // Khởi tạo dropdown phim
    const dropdown = document.getElementById('movieDropdown');
    if (dropdown) {
        movies.forEach(movie => {
            const a = document.createElement('a');
            a.href = movie.link;
            a.textContent = movie.title;
            dropdown.appendChild(a);
        });
    }

    // Sự kiện tìm kiếm
    if (searchInput && suggestionsBox) {
        searchInput.addEventListener('input', function () {
            const keyword = this.value.toLowerCase().trim();
            suggestionsBox.innerHTML = '';
            if (!keyword) {
                suggestionsBox.style.display = 'none';
                return;
            }
            const filtered = movieData.filter(movie => movie.title.toLowerCase().includes(keyword));
            if (filtered.length > 0) {
                filtered.forEach(movie => suggestionsBox.appendChild(createSearchSuggestion(movie)));
                suggestionsBox.style.display = 'block';
            } else {
                suggestionsBox.style.display = 'none';
            }
        });
        document.addEventListener('click', event => {
            if (event.target !== searchInput && !suggestionsBox.contains(event.target)) {
                suggestionsBox.style.display = 'none';
            }
        });
    }

    // Phần trailer phim
    const posters = document.querySelectorAll('.movie img');
    const trailerPopup = document.getElementById('trailerPopup');
    const video = document.getElementById('trailerVideo');
    const closeTrailer = document.getElementById('closeTrailer');

    if (posters.length && trailerPopup && video && closeTrailer) {
        posters.forEach(poster => {
            poster.addEventListener('click', () => {
                trailerPopup.style.display = 'flex';
                video.src = 'https://www.youtube.com/embed/TcMBFSGVi1c'; // URL trailer mẫu
            });
        });
        closeTrailer.addEventListener('click', () => {
            trailerPopup.style.display = 'none';
            video.src = '';
        });
        trailerPopup.addEventListener('click', event => {
            if (event.target === trailerPopup) {
                trailerPopup.style.display = 'none';
                video.src = '';
            }
        });
    }

    // Phần đặt vé
    const bookBtn = document.querySelector('.book-btn');
    const bookingPopup = document.getElementById('bookingPopup');
    const closeBookingBtn = document.querySelector('.close-btn');
    const seats = Array.from(document.querySelectorAll('.seat'));
    const selectedSeatsText = document.getElementById('selectedSeats');
    const totalPriceText = document.getElementById('totalPrice');
    const timeButtons = document.querySelectorAll('.time');
    const confirmBtn = document.querySelector('.confirm-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const passRecipientInput = document.getElementById('passRecipient');
    const passConfirmBtn = document.querySelector('.pass-confirm-btn');
    const switchToPassBtn = document.querySelector('.switch-to-pass');
    const switchToBookBtn = document.querySelector('.switch-to-book');
    const bookingModeBook = document.querySelector('.booking-mode-book');
    const bookingModePass = document.querySelector('.booking-mode-pass');

    let selectedSeats = [];
    let totalAmount = 0;

    // Hàm cập nhật thông tin ghế đã chọn
    function updateSelectedInfo() {
        if (!selectedSeatsText || !totalPriceText) return;
        selectedSeatsText.textContent = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa chọn';
        totalPriceText.textContent = totalAmount.toLocaleString('vi-VN') + ' VND';
    }

    // Hàm reset hệ thống đặt vé
    function resetBookingSystem() {
        selectedSeats = [];
        totalAmount = 0;
        if (selectedSeatsText) selectedSeatsText.textContent = 'Chưa chọn';
        if (totalPriceText) totalPriceText.textContent = '0 VND';
        if (bookingModeBook) bookingModeBook.classList.remove('hidden');
        if (bookingModePass) bookingModePass.classList.add('hidden');
        if (passRecipientInput) passRecipientInput.value = '';
        const passMessage = document.querySelector('.pass-message');
        if (passMessage) passMessage.textContent = '';
        seats.forEach(seat => seat.classList.remove('selected'));
        timeButtons.forEach(btn => btn.classList.remove('selected'));
        if (confirmBtn) {
            confirmBtn.textContent = '🚀 Xác nhận đặt vé';
            confirmBtn.classList.remove('success');
            confirmBtn.style.pointerEvents = 'auto';
        }
    }

    // Hàm hiển thị chế độ đặt vé
    function showBookingMode() {
        if (bookingModeBook) bookingModeBook.classList.remove('hidden');
        if (bookingModePass) bookingModePass.classList.add('hidden');
    }

    // Hàm hiển thị chế độ pass vé
    function showPassMode() {
        if (bookingModePass) bookingModePass.classList.remove('hidden');
        if (bookingModeBook) bookingModeBook.classList.add('hidden');
    }

    // Hàm mở popup đặt vé
    function openBookingPopup(mode = 'book') {
        if (!bookingPopup) return;
        resetBookingSystem();
        bookingPopup.style.display = 'flex';
        if (mode === 'pass') {
            showPassMode();
        } else {
            showBookingMode();
        }
    }

    // Hàm đóng popup đặt vé
    function closeBookingPopup() {
        if (!bookingPopup) return;
        bookingPopup.style.display = 'none';
        resetBookingSystem();
    }

    // Hàm tải vé dưới dạng hình ảnh
    function downloadTicket(personName) {
        const movieTitle = document.getElementById('movieTitle')?.textContent?.trim() || 'CineMax';
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, 400, 200);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.strokeRect(10, 10, 380, 180);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Arial';
        ctx.fillText('CINEMAX E-TICKET', 80, 40);
        ctx.font = '16px Arial';
        ctx.fillStyle = '#aaa';
        ctx.fillText('Phim:', 30, 80);
        ctx.fillStyle = 'red';
        ctx.fillText(movieTitle, 80, 80);
        ctx.fillStyle = '#aaa';
        ctx.fillText('Ghế:', 30, 110);
        ctx.fillStyle = 'white';
        ctx.fillText(selectedSeats.join(', ') || 'Chưa chọn', 80, 110);
        ctx.fillStyle = '#aaa';
        ctx.fillText('Người nhận:', 30, 140);
        ctx.fillStyle = '#2ecc71';
        ctx.fillText(personName, 130, 140);
        ctx.font = 'italic 12px Arial';
        ctx.fillStyle = '#555';
        ctx.fillText('Chúc bạn xem phim vui vẻ!', 120, 180);
        const link = document.createElement('a');
        link.download = 'Ticket_' + personName + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    // Sự kiện nút đặt vé
    if (bookBtn && bookingPopup) {
        bookBtn.addEventListener('click', () => openBookingPopup('book'));
    }

    // Sự kiện đóng popup
    if (closeBookingBtn) {
        closeBookingBtn.addEventListener('click', closeBookingPopup);
    }

    // Sự kiện chuyển sang chế độ pass
    if (switchToPassBtn) {
        switchToPassBtn.addEventListener('click', showPassMode);
    }

    // Sự kiện chuyển sang chế độ đặt vé
    if (switchToBookBtn) {
        switchToBookBtn.addEventListener('click', showBookingMode);
    }

    // Sự kiện xác nhận pass vé
    if (passConfirmBtn) {
        passConfirmBtn.addEventListener('click', () => {
            const personName = passRecipientInput?.value.trim();
            if (!personName) {
                alert('Vui lòng nhập tên người nhận vé.');
                return;
            }
            alert(`✅ Vé đã được pass cho: ${personName}`);
            downloadTicket(personName);
            const passMessage = document.querySelector('.pass-message');
            if (passMessage) {
                passMessage.textContent = `🎉 Vé đã được pass cho ${personName}!`;
            }
        });
    }

    // Kiểm tra URL parameters để mở popup
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    if ((action === 'book' || action === 'pass') && bookingPopup) {
        openBookingPopup(action);
        history.replaceState(null, '', window.location.pathname);
    }

    // Sự kiện chọn ghế
    if (seats.length && selectedSeatsText && totalPriceText) {
        seats.forEach(seat => {
            if (seat.classList.contains('booked')) return;
            seat.addEventListener('click', function () {
                this.classList.toggle('selected');
                const seatName = this.textContent.trim();
                const price = this.classList.contains('vip') ? 90000 : 70000;
                if (this.classList.contains('selected')) {
                    selectedSeats.push(seatName);
                    totalAmount += price;
                } else {
                    selectedSeats = selectedSeats.filter(name => name !== seatName);
                    totalAmount -= price;
                }
                updateSelectedInfo();
            });
        });
    }

    // Sự kiện chọn giờ chiếu
    if (timeButtons.length) {
        timeButtons.forEach(button => {
            button.addEventListener('click', function () {
                timeButtons.forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }

    // Sự kiện xác nhận đặt vé
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function () {
            const isTimeSelected = document.querySelector('.time.selected');
            if (selectedSeats.length === 0) {
                alert('Vui lòng chọn ít nhất một ghế!');
                return;
            }
            if (!isTimeSelected) {
                alert('Vui lòng chọn giờ chiếu!');
                return;
            }
            this.textContent = '✔ Đã xác nhận đặt vé';
            this.classList.add('success');
            this.style.pointerEvents = 'none';
            setTimeout(() => alert('Chúc mừng bạn đã đặt vé thành công!'), 500);
        });
    }

    // Sự kiện hủy đặt vé
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function () {
            const confirmCancel = confirm('Bạn có chắc chắn muốn hủy bỏ tất cả các ghế đã chọn và giờ chiếu không?');
            if (confirmCancel) {
                resetBookingSystem();
                console.log('Hệ thống đã được reset.');
            }
        });
    }

    // Sự kiện pass vé qua link
    document.addEventListener('click', event => {
        if (event.target && event.target.classList.contains('pass-btn-link')) {
            const isConfirmed = confirmBtn && confirmBtn.classList.contains('success');
            if (!isConfirmed) {
                alert(" Bạn cần bấm 'Xác nhận đặt vé' màu đỏ trước khi thực hiện nhượng vé cho bạn bè nhé!");
                return;
            }
            const personName = prompt(' Nhập tên người bạn muốn nhượng (Pass) vé lại:');
            if (personName && personName.trim()) {
                alert(` Đã chuẩn bị vé cho: ${personName}. Ảnh vé sẽ tự động tải về máy bạn!`);
                downloadTicket(personName.trim());
                const suggestionBox = event.target.closest('.pass-suggestion');
                if (suggestionBox) {
                    suggestionBox.innerHTML = ` Đã chuẩn bị vé nhượng cho: <b style="color: #2ecc71;">${personName.trim()}</b>`;
                }
            }
        }
    });

    // Phần suất chiếu (nếu có)
    const showtimeButtons = document.querySelectorAll('.showtimes button');
    if (showtimeButtons.length) {
        showtimeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                alert('Bạn chọn suất chiếu: ' + btn.innerText);
            });
        });
    }
});