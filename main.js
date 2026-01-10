// استيراد المكتبات اللازمة من Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, limit, doc, updateDoc, getDoc, increment, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// إعدادات مشروعك الخاصة (Follow-web)
const firebaseConfig = {
  apiKey: "AIzaSyCEMou1W_9FjqZso2TA9TLHLcudkFnScuE",
  authDomain: "follow-web-9d24b.firebaseapp.com",
  projectId: "follow-web-9d24b",
  storageBucket: "follow-web-9d24b.firebasestorage.app",
  messagingSenderId: "462218767370",
  appId: "1:462218767370:web:657ffbb4d158cbfdde03f3",
  measurementId: "G-XS1TN6H0N3"
};

// تهيئة الخدمات
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. إدارة حالة المستخدم (Login Check) ---
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("Logged in as:", user.email);
            if(document.getElementById('userEmailDisplay')) {
                document.getElementById('userEmailDisplay').innerText = user.email;
                updatePointsUI();
                loadAccounts();
            }
        } else {
            // توجيه المستخدم إذا لم يكن مسجلاً ودخل لوحة التحكم
            if (window.location.pathname.includes("dashboard.html")) {
                window.location.href = "login.html";
            }
        }
    });

    // --- 2. إنشاء حساب جديد (Register) ---
    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                // إنشاء وثيقة للمستخدم في Firestore لبدء النقاط من 0
                await setDoc(doc(db, "users", email), { points: 0 });
                window.location.href = "dashboard.html";
            } catch (error) { alert("خطأ في التسجيل: " + error.message); }
        });
    }

    // --- 3. تسجيل الدخول (Login) ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            signInWithEmailAndPassword(auth, email, password)
                .then(() => { window.location.href = "dashboard.html"; })
                .catch((error) => { alert("خطأ: " + error.message); });
        });
    }

    // --- 4. إضافة حساب للتبادل (Add Account) ---
    const addAccountForm = document.getElementById('addAccountForm');
    if (addAccountForm) {
        addAccountForm.addEventListener('submit', async (e) => {
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
                alert("تمت إضافة حسابك بنجاح!");
                location.reload();
            } catch (error) { console.error(error); }
        });
    }

    // --- 5. نظام النقاط (Points System) ---
    const earnBtn = document.getElementById('earnPointsBtn');
    if (earnBtn) {
        earnBtn.addEventListener('click', async () => {
            const q = query(collection(db, "accounts"), limit(1));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((accDoc) => {
                window.open(accDoc.data().url, '_blank');
                // زيادة نقطة للمستخدم
                const userRef = doc(db, "users", auth.currentUser.email);
                updateDoc(userRef, { points: increment(1) }).then(() => updatePointsUI());
            });
        });
    }
});

// وظائف مساعدة
async function updatePointsUI() {
    const userDoc = await getDoc(doc(db, "users", auth.currentUser.email));
    if (userDoc.exists()) {
        document.getElementById('userPoints').innerText = userDoc.data().points || 0;
    }
}

async function loadAccounts() {
    const querySnapshot = await getDocs(collection(db, "accounts"));
    const listDiv = document.getElementById('accountsList');
    if(listDiv) {
        listDiv.innerHTML = ""; // مسح القائمة قبل التحميل
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            listDiv.innerHTML += `<div class="account-card">
                <span>${data.platform}</span>
                <a href="${data.url}" target="_blank">متابعة وكسب نقطة</a>
            </div>`;
        });
    }
}
