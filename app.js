/**
 * ==============================================================================
 * TARS UGV // TAKIM PORTALI V2.0 - İNTERAKTİF İÇ MANTIK (LOGIC)
 * ==============================================================================
 */

// Tanımlı Takım Hesapları
const TEAM_USERS = {
    'kaptan': {
        name: 'Kaptan Eray',
        role: 'Takım Kaptanı',
        dept: 'Yönetim',
        avatar: '<i class="fa-solid fa-crown"></i>',
        pass: 'tars2027'
    },
    'mekanik': {
        name: 'Mekanik Lideri',
        role: 'Mekanik & Şasi Lideri',
        dept: 'Mekanik',
        avatar: '<i class="fa-solid fa-wrench"></i>',
        pass: 'tars2027'
    },
    'elektronik': {
        name: 'Donanım Lideri',
        role: 'Aviyonik & Güç Lideri',
        dept: 'Elektronik',
        avatar: '<i class="fa-solid fa-bolt"></i>',
        pass: 'tars2027'
    },
    'yazilim': {
        name: 'Otonomi Lideri',
        role: 'Yazılım & Otonomi Lideri',
        dept: 'Yazılım',
        avatar: '<i class="fa-solid fa-laptop-code"></i>',
        pass: 'tars2027'
    }
};

// Başlangıç Görevleri
const DEFAULT_TASKS = [
    {
        id: 'task-1',
        title: 'Monokok Şasi Mukavemet FEA Analizleri',
        desc: 'ANSYS Mechanical ile 3G darbe ve burulma yükleri altında monokok gövde gerilme dağılımı raporlanacak.',
        dept: 'Mekanik',
        priority: 'Kritik',
        assignee: 'Mekanik Ekibi',
        dueDate: '2026-11-15',
        status: 'todo'
    },
    {
        id: 'task-2',
        title: 'Sensör Füzyonu Simülasyon Senaryoları (Gazebo)',
        desc: 'LiDAR pointcloud ve IMU verilerinin EKF (Extended Kalman Filter) ile birleştirilip tünel haritasının çıkarılması.',
        dept: 'Yazılım',
        priority: 'Yüksek',
        assignee: 'Otonomi Lideri',
        dueDate: '2026-11-20',
        status: 'todo'
    },
    {
        id: 'task-3',
        title: 'BMS ve Güç Dağıtım Kartı Prototip Tasarımı',
        desc: '48V LiFePO4 batarya paketi için 60A anlık çekişe uygun bakır hat kalınlıkları ve CANBus telemetri devresi.',
        dept: 'Elektronik',
        priority: 'Kritik',
        assignee: 'Donanım Lideri',
        dueDate: '2026-11-18',
        status: 'in_progress'
    },
    {
        id: 'task-4',
        title: 'LiDAR & OAK-D Derinlik Kamerası Montaj Braketleri',
        desc: 'Titreşim sönümleyici TPU malzemeden 3D baskı montaj yuvalarının üretimi ve açı testleri.',
        dept: 'Mekanik',
        priority: 'Normal',
        assignee: 'Mekanik Lideri',
        dueDate: '2026-11-22',
        status: 'in_progress'
    },
    {
        id: 'task-5',
        title: 'ROS2 Humble Nav2 Engel Aşma Düğümü (Node)',
        desc: 'Costmap üzerinde dinamik engel tespitinde patika planlayıcı costmap ağırlık parametrelerinin ayarlanması.',
        dept: 'Yazılım',
        priority: 'Yüksek',
        assignee: 'Yazılım Ekibi',
        dueDate: '2026-11-25',
        status: 'in_progress'
    },
    {
        id: 'task-6',
        title: 'KTR (Kavramsal Tasarım Raporu) Şasi ve Palet Bölümü',
        desc: 'Palet temas yüzeyi basınç hesaplamaları ve malzeme seçim matrisinin resmi TEKNOFEST şablonuna işlenmesi.',
        dept: 'Yönetim',
        priority: 'Kritik',
        assignee: 'Kaptan Eray',
        dueDate: '2026-11-12',
        status: 'review'
    },
    {
        id: 'task-7',
        title: 'Acil Durum E-Stop Devresi ve RF Link Testi',
        desc: '1 km menzilli telemetri emniyet kesicisi röle gecikme süresinin osiloskop ile doğrulanması.',
        dept: 'Elektronik',
        priority: 'Normal',
        assignee: 'Donanım Lideri',
        dueDate: '2026-11-14',
        status: 'review'
    },
    {
        id: 'task-8',
        title: 'TEKNOFEST 2027 İKA Şartname Analizi',
        desc: 'Parkur boyutları, otonom puanlama kriterleri ve ağırlık sınırlarının tüm ekiple incelenmesi.',
        dept: 'Yönetim',
        priority: 'Normal',
        assignee: 'Tüm Ekip',
        dueDate: '2026-10-15',
        status: 'done'
    },
    {
        id: 'task-9',
        title: 'BLDC Motor ve Planet Redüktör Tork Hesapları',
        desc: '%45 eğimde tırmanma için gerekli tork ve akım gereksinimi MATLAB simulink ile doğrulandı.',
        dept: 'Mekanik',
        priority: 'Yüksek',
        assignee: 'Mekanik Ekibi',
        dueDate: '2026-10-25',
        status: 'done'
    }
];

// Başlangıç Dokümanları
const DEFAULT_DOCUMENTS = [
    {
        id: 'doc-1',
        title: 'TEKNOFEST_2027_IKA_Resmi_Sartnamesi_v1.pdf',
        category: 'Rapor',
        author: 'Kaptan Eray',
        size: '3.4 MB',
        date: '12 Ekim 2026',
        notes: 'Resmi yarışma kuralları ve puanlama tablosu.'
    },
    {
        id: 'doc-2',
        title: 'TARS_Monokok_Sasi_v2_Revize.step',
        category: 'CAD',
        author: 'Mekanik Lideri',
        size: '28.7 MB',
        date: '24 Ekim 2026',
        notes: 'Diferansiyel ve motor yuvaları entegre edilmiş 3D montaj modeli.'
    },
    {
        id: 'doc-3',
        title: 'TARS_Guc_Dagitim_Karti_Gerber_v1.2.zip',
        category: 'Elektronik',
        author: 'Donanım Lideri',
        size: '1.8 MB',
        date: '26 Ekim 2026',
        notes: 'JLCPCB üretime hazır 4 katmanlı PCB Gerber ve Drill dosyaları.'
    },
    {
        id: 'doc-4',
        title: 'ROS2_Humble_Nav2_Pointcloud_Config.yaml',
        category: 'Yazılım',
        author: 'Otonomi Lideri',
        size: '24 KB',
        date: '28 Ekim 2026',
        notes: 'LiDAR ve SLAM Toolbox otonom navigasyon parametreleri.'
    },
    {
        id: 'doc-5',
        title: 'TARS_Kavramsal_Tasarim_Raporu_Taslak_v2.docx',
        category: 'Rapor',
        author: 'Kaptan Eray',
        size: '8.4 MB',
        date: '29 Ekim 2026',
        notes: 'Mekanik ve yazılım bölümleri birleştirilmiş KTR taslak metni.'
    },
    {
        id: 'doc-6',
        title: 'BMS_LiFePO4_Batarya_Termal_Hesaplamalari.xlsx',
        category: 'Elektronik',
        author: 'Donanım Lideri',
        size: '520 KB',
        date: '29 Ekim 2026',
        notes: 'Hücre iç dirençleri ve fan soğutma debisi optimizasyonu tablosu.'
    }
];

// Başlangıç Duyuruları
const DEFAULT_ANNOUNCEMENTS = [
    {
        id: 'ann-1',
        title: 'Atölye Güvenlik Kuralları & Lityum Batarya Şarj Protokolü',
        tag: 'ATÖLYE',
        author: 'Kaptan Eray',
        date: '28 Ekim 2026',
        content: 'Atölyede yapılacak mekanik kesim ve lehimleme işlemlerinde gözlük ve eldiven takılması zorunludur. LiFePO4 batarya paketleri yalnızca yangına dayanıklı batarya çantasında şarj edilecektir.'
    },
    {
        id: 'ann-2',
        title: 'Haftalık KTR Raporu & Şasi Entegrasyon Toplantısı',
        tag: 'TOPLANTI',
        author: 'Kaptan Eray',
        date: '30 Ekim 2026',
        content: '12 Kasım Çarşamba 19:30\'da hem THKÜ Teknoloji Atölyesi\'nde hem de Discord ses odasında hibrit toplantı yapılacaktır. Mekanik ve donanım ekiplerinin son revizyonları getirmesi rica olunur.'
    },
    {
        id: 'ann-3',
        title: 'Sensör ve Mini PC (NVIDIA Jetson Orin) Teslim Alındı',
        tag: 'GENEL',
        author: 'Otonomi Lideri',
        date: '29 Ekim 2026',
        content: 'Sipariş ettiğimiz 16 kanallı 3D LiDAR ve Jetson Orin Nano kartı atölyemize ulaştı. Yazılım ekibi hafta sonu ilk boot ve CUDA kütüphane kurulumlarını gerçekleştirecektir.'
    }
];


// ==============================================================================
// DOM YÜKLENDİĞİNDE BAŞLAT
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {

    // --- State Yönetimi (LocalStorage) ---
    let currentUser = JSON.parse(localStorage.getItem('tars_active_user') || 'null');
    let tasks = JSON.parse(localStorage.getItem('tars_tasks_v2') || JSON.stringify(DEFAULT_TASKS));
    let documents = JSON.parse(localStorage.getItem('tars_docs_v2') || JSON.stringify(DEFAULT_DOCUMENTS));
    let announcements = JSON.parse(localStorage.getItem('tars_ann_v2') || JSON.stringify(DEFAULT_ANNOUNCEMENTS));

    // DOM Elementleri
    const authScreen = document.getElementById('authScreen');
    const portalMainApp = document.getElementById('portalMainApp');
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePwdBtn = document.getElementById('togglePwdBtn');
    const loginErrorMsg = document.getElementById('loginErrorMsg');
    const logoutBtn = document.getElementById('logoutBtn');

    // Profil Widget Elementleri
    const currentUserAvatar = document.getElementById('currentUserAvatar');
    const currentUserName = document.getElementById('currentUserName');
    const currentUserRole = document.getElementById('currentUserRole');
    const welcomeUserName = document.getElementById('welcomeUserName');

    // Navigasyon Sekmeleri
    const tabBtns = document.querySelectorAll('.portal-tab-btn');
    const tabPanels = document.querySelectorAll('.portal-tab-panel');

    // Filtreler & Butonlar
    const taskDeptFilter = document.getElementById('taskDeptFilter');
    const docCatBtns = document.querySelectorAll('.doc-cat-btn');

    // Dropzone
    const fileDropzone = document.getElementById('fileDropzone');
    const realFileInput = document.getElementById('realFileInput');
    const selectedFileBadge = document.getElementById('selectedFileBadge');
    const selectedFileName = document.getElementById('selectedFileName');


    // ==========================================================================
    // 1. KULLANICI GİRİŞ & ÇIKIŞ SİSTEMİ
    // ==========================================================================
    function checkAuth() {
        if (currentUser) {
            authScreen.classList.add('hidden');
            portalMainApp.style.display = 'block';

            // Profil bilgilerini güncelle
            currentUserAvatar.innerHTML = currentUser.avatar;
            currentUserName.textContent = currentUser.name;
            currentUserRole.textContent = currentUser.role;
            welcomeUserName.textContent = currentUser.name.toUpperCase();
        } else {
            authScreen.classList.remove('hidden');
            portalMainApp.style.display = 'none';
        }
    }

    // Şifre Göster/Gizle
    togglePwdBtn.addEventListener('click', () => {
        const isPwd = passwordInput.type === 'password';
        passwordInput.type = isPwd ? 'text' : 'password';
        togglePwdBtn.innerHTML = isPwd ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
    });

    // Form ile Giriş
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = usernameInput.value.trim().toLowerCase();
        const p = passwordInput.value.trim();

        if (TEAM_USERS[u] && TEAM_USERS[u].pass === p) {
            loginErrorMsg.classList.remove('active');
            currentUser = TEAM_USERS[u];
            localStorage.setItem('tars_active_user', JSON.stringify(currentUser));
            checkAuth();
            showToast(`Hoş geldin, ${currentUser.name}! Portal hazır.`);
        } else {
            loginErrorMsg.classList.add('active');
        }
    });

    // Hızlı Ekip Girişi Butonları
    document.querySelectorAll('.quick-user-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const u = btn.dataset.user;
            const p = btn.dataset.pass;
            usernameInput.value = u;
            passwordInput.value = p;
            
            // Otomatik giriş
            currentUser = TEAM_USERS[u];
            localStorage.setItem('tars_active_user', JSON.stringify(currentUser));
            loginErrorMsg.classList.remove('active');
            checkAuth();
            showToast(`${currentUser.name} olarak giriş yapıldı.`);
        });
    });

    // Çıkış Yap
    logoutBtn.addEventListener('click', () => {
        if (confirm('TARS Takım Portalından çıkış yapmak istediğinize emin misiniz?')) {
            currentUser = null;
            localStorage.removeItem('tars_active_user');
            loginForm.reset();
            checkAuth();
            showToast('Oturum kapatıldı.');
        }
    });


    // ==========================================================================
    // 2. SEKME (TAB) DEĞİŞİMİ
    // ==========================================================================
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            switchTab(targetTab);
        });
    });

    function switchTab(tabId) {
        tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
        tabPanels.forEach(p => p.classList.toggle('active', p.id === `tab-${tabId}`));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.getElementById('gotoBulletinBtn')?.addEventListener('click', () => switchTab('bulletin'));
    document.getElementById('btnQuickAddTask')?.addEventListener('click', () => openModal('addTaskModal'));
    document.getElementById('btnQuickUploadDoc')?.addEventListener('click', () => openModal('uploadDocModal'));


    // ==========================================================================
    // 3. TEKNOFEST 2027 GERİ SAYIM & METRİKLER
    // ==========================================================================
    function updateCountdown() {
        const finalDate = new Date('2027-08-25T09:00:00');
        const now = new Date();
        const diffTime = finalDate - now;
        const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
        const daysElem = document.getElementById('daysLeft');
        if (daysElem) daysElem.textContent = diffDays;
    }
    updateCountdown();

    function updateMetrics() {
        // Görev sayaçları
        const inProgress = tasks.filter(t => t.status === 'in_progress').length;
        const review = tasks.filter(t => t.status === 'review').length;
        const done = tasks.filter(t => t.status === 'done').length;
        const total = tasks.length;

        const activeCount = inProgress + review;
        document.getElementById('activeTasksCount').textContent = activeCount;
        document.getElementById('inProgressTasksCount').textContent = `${inProgress} Görev`;

        // Yüzde
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        const pctElem = document.getElementById('overallProgressText');
        if (pctElem) pctElem.textContent = `%${pct}`;
        const fillElem = document.querySelector('.mini-progress-fill');
        if (fillElem) fillElem.style.width = `${pct}%`;

        // Doküman sayaçları
        document.getElementById('docsCount').textContent = documents.length;
        document.getElementById('totalDocsStat').textContent = `${documents.length} Dosya`;
        document.getElementById('catCountAll').textContent = documents.length;
    }


    // ==========================================================================
    // 4. GÖREV YÖNETİMİ & KANBAN
    // ==========================================================================
    function renderTasks() {
        const filterDept = taskDeptFilter ? taskDeptFilter.value : 'all';
        const filteredTasks = filterDept === 'all' ? tasks : tasks.filter(t => t.dept === filterDept);

        const cols = {
            'todo': document.getElementById('cards-todo'),
            'in_progress': document.getElementById('cards-in_progress'),
            'review': document.getElementById('cards-review'),
            'done': document.getElementById('cards-done')
        };

        const counts = { 'todo': 0, 'in_progress': 0, 'review': 0, 'done': 0 };

        // Sütunları temizle
        Object.values(cols).forEach(c => { if (c) c.innerHTML = ''; });

        filteredTasks.forEach(task => {
            counts[task.status] = (counts[task.status] || 0) + 1;
            const container = cols[task.status];
            if (!container) return;

            const card = document.createElement('div');
            card.className = 'task-card';
            card.innerHTML = `
                <div class="task-card-meta">
                    <span class="dept-badge dept-${task.dept}">${task.dept}</span>
                    <span class="priority-badge priority-${task.priority}">${task.priority}</span>
                </div>
                <h4 class="task-title">${escapeHtml(task.title)}</h4>
                <p class="task-desc">${escapeHtml(task.desc || '')}</p>
                <div class="task-card-footer">
                    <span class="task-assignee"><i class="fa-solid fa-user"></i> ${escapeHtml(task.assignee)}</span>
                    <span class="task-due-date"><i class="fa-regular fa-calendar"></i> ${task.dueDate}</span>
                </div>
                <div class="task-actions-bar">
                    ${getMoveButtons(task.status, task.id)}
                    <button type="button" class="task-move-btn" onclick="deleteTask('${task.id}')" title="Görevi Sil">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
            container.appendChild(card);
        });

        // Sayaçları güncelle
        document.getElementById('count-todo').textContent = counts.todo;
        document.getElementById('count-in_progress').textContent = counts.in_progress;
        document.getElementById('count-review').textContent = counts.review;
        document.getElementById('count-done').textContent = counts.done;

        updateMetrics();
    }

    function getMoveButtons(status, taskId) {
        if (status === 'todo') {
            return `<button type="button" class="task-move-btn" onclick="moveTask('${taskId}', 'in_progress')">Başla <i class="fa-solid fa-arrow-right"></i></button>`;
        } else if (status === 'in_progress') {
            return `
                <button type="button" class="task-move-btn" onclick="moveTask('${taskId}', 'todo')"><i class="fa-solid fa-arrow-left"></i></button>
                <button type="button" class="task-move-btn" onclick="moveTask('${taskId}', 'review')">Teste Gönder <i class="fa-solid fa-arrow-right"></i></button>
            `;
        } else if (status === 'review') {
            return `
                <button type="button" class="task-move-btn" onclick="moveTask('${taskId}', 'in_progress')"><i class="fa-solid fa-arrow-left"></i></button>
                <button type="button" class="task-move-btn" onclick="moveTask('${taskId}', 'done')">Onayla <i class="fa-solid fa-check"></i></button>
            `;
        } else if (status === 'done') {
            return `<button type="button" class="task-move-btn" onclick="moveTask('${taskId}', 'review')"><i class="fa-solid fa-rotate-left"></i> Yeniden Aç</button>`;
        }
        return '';
    }

    window.moveTask = function(taskId, newStatus) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.status = newStatus;
            saveTasks();
            renderTasks();
            addActivity(`${currentUser?.name || 'Ekip üyesi'}, "${task.title}" görevini ${statusName(newStatus)} aşamasına taşıdı.`);
            showToast('Görev durumu güncellendi.');
        }
    };

    window.deleteTask = function(taskId) {
        if (confirm('Bu görevi silmek istediğinize emin misiniz?')) {
            tasks = tasks.filter(t => t.id !== taskId);
            saveTasks();
            renderTasks();
            showToast('Görev silindi.');
        }
    };

    function statusName(status) {
        const names = { 'todo': 'Yapılacak', 'in_progress': 'Devam Ediyor', 'review': 'İnceleme & Test', 'done': 'Tamamlandı' };
        return names[status] || status;
    }

    function saveTasks() {
        localStorage.setItem('tars_tasks_v2', JSON.stringify(tasks));
    }

    taskDeptFilter?.addEventListener('change', renderTasks);

    // Yeni Görev Ekleme Formu
    document.getElementById('newTaskForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value.trim();
        const dept = document.getElementById('taskDept').value;
        const priority = document.getElementById('taskPriority').value;
        const assignee = document.getElementById('taskAssignee').value.trim();
        const dueDate = document.getElementById('taskDueDate').value;
        const desc = document.getElementById('taskDesc').value.trim();

        const newTask = {
            id: 'task-' + Date.now(),
            title,
            dept,
            priority,
            assignee,
            dueDate,
            desc,
            status: 'todo'
        };

        tasks.unshift(newTask);
        saveTasks();
        renderTasks();
        closeModal('addTaskModal');
        document.getElementById('newTaskForm').reset();
        addActivity(`${currentUser?.name || 'Bir üye'}, yeni görev ekledi: "${title}" (${dept})`);
        showToast('Yeni görev başarıyla oluşturuldu.');
    });


    // ==========================================================================
    // 5. DOKÜMAN & DOSYA YÜKLEME MERKEZİ
    // ==========================================================================
    let currentDocCategory = 'all';

    function renderDocuments() {
        const tbody = document.getElementById('documentsTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';

        const filteredDocs = currentDocCategory === 'all' 
            ? documents 
            : documents.filter(d => d.category === currentDocCategory);

        filteredDocs.forEach(doc => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="file-item-cell">
                        <div class="file-ext-icon">${getFileIcon(doc.title, doc.category)}</div>
                        <div class="file-name-meta">
                            <h4>${escapeHtml(doc.title)}</h4>
                            <span class="file-notes">${escapeHtml(doc.notes || '')}</span>
                        </div>
                    </div>
                </td>
                <td><span class="dept-badge dept-${doc.category}">${doc.category}</span></td>
                <td><i class="fa-solid fa-user-check"></i> ${escapeHtml(doc.author)}</td>
                <td><strong>${doc.size}</strong></td>
                <td>${doc.date}</td>
                <td style="text-align: right;">
                    <button type="button" class="btn-download-doc" onclick="downloadDocSimulation('${escapeHtml(doc.title)}')">
                        <i class="fa-solid fa-download"></i> İndir
                    </button>
                    <button type="button" class="btn-delete-doc" onclick="deleteDoc('${doc.id}')" title="Dokümanı Sil">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        updateMetrics();
    }

    function getFileIcon(filename, cat) {
        if (filename.endsWith('.pdf')) return '<i class="fa-solid fa-file-pdf" style="color: #ff4d4d;"></i>';
        if (filename.endsWith('.step') || filename.endsWith('.stl')) return '<i class="fa-solid fa-cube" style="color: #ffb800;"></i>';
        if (filename.endsWith('.zip') || filename.endsWith('.rar')) return '<i class="fa-solid fa-file-zipper" style="color: #38bdf8;"></i>';
        if (filename.endsWith('.yaml') || filename.endsWith('.py') || filename.endsWith('.cpp')) return '<i class="fa-solid fa-file-code" style="color: #00ff88;"></i>';
        if (filename.endsWith('.docx')) return '<i class="fa-solid fa-file-word" style="color: #60a5fa;"></i>';
        if (filename.endsWith('.xlsx')) return '<i class="fa-solid fa-file-excel" style="color: #34d399;"></i>';
        return '<i class="fa-solid fa-file-lines"></i>';
    }

    docCatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            docCatBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentDocCategory = btn.dataset.cat;
            renderDocuments();
        });
    });

    window.downloadDocSimulation = function(filename) {
        showToast(`"${filename}" indiriliyor...`);
        // Simüle edilen dosya indirmesi
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`TARS UGV Proje Dokümanı: ${filename}\nTEKNOFEST 2027 İnsansız Kara Aracı Takımı\nİndirme Tarihi: ${new Date().toLocaleString('tr-TR')}`));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    window.deleteDoc = function(docId) {
        if (confirm('Bu teknik dokümanı silmek istediğinize emin misiniz?')) {
            documents = documents.filter(d => d.id !== docId);
            saveDocs();
            renderDocuments();
            showToast('Doküman sistemden kaldırıldı.');
        }
    };

    function saveDocs() {
        localStorage.setItem('tars_docs_v2', JSON.stringify(documents));
    }

    // Dropzone Etkileşimi
    fileDropzone?.addEventListener('click', () => realFileInput.click());
    
    fileDropzone?.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileDropzone.classList.add('dragover');
    });

    fileDropzone?.addEventListener('dragleave', () => fileDropzone.classList.remove('dragover'));

    fileDropzone?.addEventListener('drop', (e) => {
        e.preventDefault();
        fileDropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleSelectedFile(e.dataTransfer.files[0]);
        }
    });

    realFileInput?.addEventListener('change', () => {
        if (realFileInput.files.length > 0) {
            handleSelectedFile(realFileInput.files[0]);
        }
    });

    function handleSelectedFile(file) {
        selectedFileName.textContent = `${file.name} (${formatBytes(file.size)})`;
        selectedFileBadge.style.display = 'inline-flex';
        
        // Form alanlarını otomatik doldur
        const docTitleInput = document.getElementById('docTitle');
        if (!docTitleInput.value) docTitleInput.value = file.name;
        
        const docFileSizeInput = document.getElementById('docFileSize');
        if (docFileSizeInput) docFileSizeInput.value = formatBytes(file.size);
    }

    function formatBytes(bytes) {
        if (!bytes) return '1.5 MB';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    // Yeni Doküman Yükleme Formu
    document.getElementById('newDocForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('docTitle').value.trim();
        const category = document.getElementById('docCategory').value;
        const size = document.getElementById('docFileSize').value.trim() || '2.4 MB';
        const notes = document.getElementById('docNotes').value.trim();

        const newDoc = {
            id: 'doc-' + Date.now(),
            title,
            category,
            author: currentUser?.name || 'Ekip Üyesi',
            size,
            date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
            notes
        };

        documents.unshift(newDoc);
        saveDocs();
        renderDocuments();
        closeModal('uploadDocModal');
        document.getElementById('newDocForm').reset();
        selectedFileBadge.style.display = 'none';

        addActivity(`${currentUser?.name || 'Bir üye'}, yeni doküman yükledi: "${title}"`);
        showToast('Doküman başarıyla yüklendi ve paylaşıldı.');
    });


    // ==========================================================================
    // 6. DUYURULAR & TOPLANTI BÜLTENİ
    // ==========================================================================
    function renderAnnouncements() {
        const container = document.getElementById('announcementsList');
        if (!container) return;
        container.innerHTML = '';

        announcements.forEach(ann => {
            const card = document.createElement('div');
            card.className = 'announcement-card';
            card.innerHTML = `
                <div class="ann-header">
                    <span class="ann-tag tag-${ann.tag}">${ann.tag}</span>
                    <span class="ann-date"><i class="fa-regular fa-calendar"></i> ${ann.date}</span>
                </div>
                <h3 class="ann-title">${escapeHtml(ann.title)}</h3>
                <p class="ann-content">${escapeHtml(ann.content)}</p>
                <div class="ann-footer">
                    <span class="ann-author"><i class="fa-solid fa-user-pen"></i> ${escapeHtml(ann.author)}</span>
                    <button type="button" class="btn-delete-doc" onclick="deleteAnnouncement('${ann.id}')" title="Duyuruyu Sil">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    window.deleteAnnouncement = function(annId) {
        if (confirm('Bu duyuruyu silmek istediğinize emin misiniz?')) {
            announcements = announcements.filter(a => a.id !== annId);
            localStorage.setItem('tars_ann_v2', JSON.stringify(announcements));
            renderAnnouncements();
            showToast('Duyuru silindi.');
        }
    };

    document.getElementById('newAnnouncementForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('annTitle').value.trim();
        const tag = document.getElementById('annTag').value;
        const author = document.getElementById('annAuthor').value.trim();
        const content = document.getElementById('annContent').value.trim();

        const newAnn = {
            id: 'ann-' + Date.now(),
            title,
            tag,
            author,
            date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
            content
        };

        announcements.unshift(newAnn);
        localStorage.setItem('tars_ann_v2', JSON.stringify(announcements));
        renderAnnouncements();
        closeModal('addAnnouncementModal');
        document.getElementById('newAnnouncementForm').reset();

        addActivity(`${author}, yeni duyuru yayınladı: "${title}"`);
        showToast('Duyuru başarıyla yayınlandı.');
    });


    // ==========================================================================
    // 7. AKTİVİTE AKIŞI (ACTIVITY FEED)
    // ==========================================================================
    const DEFAULT_ACTIVITIES = [
        { text: 'Mekanik Lideri, "TARS_Monokok_Sasi_v2_Revize.step" modelini güncelledi.', time: '15 dakika önce', icon: 'fa-cube' },
        { text: 'Otonomi Lideri, "ROS2 Humble Nav2 Engel Aşma Düğümü" görevini incelemeye aldı.', time: '1 saat önce', icon: 'fa-laptop-code' },
        { text: 'Kaptan Eray, haftalık KTR ve Şasi entegrasyon duyurusu paylaştı.', time: 'Bugün 10:30', icon: 'fa-bullhorn' },
        { text: 'Donanım Lideri, "BMS Batarya Termal Hesaplamaları" tablosunu yükledi.', time: 'Dün 18:20', icon: 'fa-bolt' }
    ];

    let activities = JSON.parse(localStorage.getItem('tars_activities_v2') || JSON.stringify(DEFAULT_ACTIVITIES));

    function renderActivities() {
        const feed = document.getElementById('activityFeedList');
        if (!feed) return;
        feed.innerHTML = '';

        activities.slice(0, 5).forEach(act => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            item.innerHTML = `
                <div class="activity-icon"><i class="fa-solid ${act.icon || 'fa-bell'}"></i></div>
                <div class="activity-text">
                    <p class="activity-title">${escapeHtml(act.text)}</p>
                    <span class="activity-time">${act.time}</span>
                </div>
            `;
            feed.appendChild(item);
        });
    }

    function addActivity(text, icon = 'fa-clock-rotate-left') {
        activities.unshift({ text, time: 'Az önce', icon });
        localStorage.setItem('tars_activities_v2', JSON.stringify(activities));
        renderActivities();
    }


    // ==========================================================================
    // 8. MODAL KONTROLLERİ & TOAST
    // ==========================================================================
    document.getElementById('openAddTaskModalBtn')?.addEventListener('click', () => openModal('addTaskModal'));
    document.getElementById('openUploadDocModalBtn')?.addEventListener('click', () => openModal('uploadDocModal'));
    document.getElementById('openAddAnnouncementModalBtn')?.addEventListener('click', () => openModal('addAnnouncementModal'));

    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.dataset.close);
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
        }
    });

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('active');
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    }

    function showToast(msg) {
        const toast = document.getElementById('toastNotification');
        const text = document.getElementById('toastMsg');
        if (toast && text) {
            text.textContent = msg;
            toast.classList.add('active');
            setTimeout(() => toast.classList.remove('active'), 3200);
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>"']/g, function(m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
        });
    }


    // ==========================================================================
    // 9. BAŞLANGIÇ YÜKLEMESİ
    // ==========================================================================
    checkAuth();
    renderTasks();
    renderDocuments();
    renderAnnouncements();
    renderActivities();
    updateMetrics();

});
