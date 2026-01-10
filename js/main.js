document.addEventListener("DOMContentLoaded", () => {
    const regForm = document.getElementById('registrationForm');
    
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault(); // منع الصفحة من إعادة التحميل
            
            const username = document.getElementById('username').value;
            const message = document.getElementById('message');

            if (username.length < 3) {
                message.innerText = "اسم المستخدم قصير جداً!";
                message.style.color = "red";
            } else {
                message.innerText = "تم التسجيل بنجاح، مرحباً " + username;
                message.style.color = "green";
                // هنا يمكنك توجيه المستخدم لصفحة لوحة التحكم بعد ثانيتين
                setTimeout(() => { window.location.href = "dashboard.html"; }, 2000);
            }
        });
    }
});
