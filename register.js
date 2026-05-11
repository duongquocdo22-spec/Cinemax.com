// CineMax Register JavaScript
// Xử lý validation và submit form đăng ký

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn form submit mặc định

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();

    // Kiểm tra nếu chưa nhập đủ thông tin
    if (!name || !email || !password || !confirmPassword) {
        alert('Chưa nhập thông tin! Vui lòng nhập đầy đủ tất cả các trường.');
        return;
    }

    // Kiểm tra mật khẩu khớp
    if (password !== confirmPassword) {
        alert('Mật khẩu nhập lại không khớp! Vui lòng kiểm tra lại.');
        return;
    }

    // Nếu nhập đủ và khớp, hiện thông báo thành công
    alert('Đăng ký thành công! Chào mừng bạn đến với CineMax.');
    // Có thể thêm logic chuyển trang hoặc lưu dữ liệu ở đây
});