import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, limit } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// استبدل ببياناتك من Firebase Console (التي في صورتك 1951.jpg)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "follow-web-9d24b.firebaseapp.com",
  projectId: "follow-web-9d24b",
  storageBucket: "follow-web-9d24b.appspot.com",
  messagingSenderId: "462218767370",
  appId: "1:462218767370:web:5ff9591a3..."
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// التحقق من تسجيل الدخول وعرض البيانات
onAuthStateChanged(auth, (user) => {
    if (user) {
        if(document.getElementById('userEmailDisplay')) {
            document.getElementById('userEmailDisplay').innerText = user.email;
            loadAccounts(); // تحميل الحسابات الموجودة
        }
    } else {
        if (window.location.pathname.includes("dashboard.html")) {
            window.location.href = "login.html";
        }
    }
});

// وظيفة إضافة الحساب إلى Firestore
const addForm = document.getElementById('addAccountForm');
if (addForm) {
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const platform = document.getElementById('platform').value;
        const url = document.getElementById('accountUrl').value;

        try {
            await addDoc(collection(db, "accounts"), {
                platform: platform,
                url: url,
                owner: auth.currentUser.email,
                createdAt: new Date()
            });
            alert("تمت إضافة الحساب بنجاح!");
            location.reload();
        } catch (error) {
            alert("حدث خطأ: " + error.message);
        }
    });
}

// وظيفة عرض الحسابات للآخرين
async function loadAccounts() {
    const q = query(collection(db, "accounts"), limit(10));
    const querySnapshot = await getDocs(q);
    const listDiv = document.getElementById('accountsList');
    
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        listDiv.innerHTML += `
            <div style="border:1px solid #ccc; padding:10px; margin:5px;">
                <strong>${data.platform}</strong>: 
                <a href="${data.url}" target="_blank">زيارة الحساب لمتابعته</a>
            </div>
        `;
    });
}
