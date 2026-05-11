// CineMax Login JavaScript
// Xử lý validation và submit form đăng nhập

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn form submit mặc định

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    // Kiểm tra nếu chưa nhập đủ thông tin
    if (!email || !password) {
        alert('Chưa nhập thông tin! Vui lòng nhập đầy đủ email và mật khẩu.');
        return;
    }

    // Nếu nhập đủ, hiện thông báo thành công
    alert('Đăng nhập thành công! Chào mừng bạn đến với CineMax.');
    // Có thể thêm logic chuyển trang hoặc lưu session ở đây
});