/**
 * TARS İnsansız Kara Aracı - Başvuru ve Dinamik Form Yönetimi
 * TEKNOFEST 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elementleri
    const form = document.getElementById('tarsApplyForm');
    const departmentSelect = document.getElementById('department');
    const mechanicBox = document.getElementById('mechanicDynamicBox');
    const cadNoneCheckbox = document.getElementById('cadNoneCheckbox');
    const cadOtherCheckbox = document.getElementById('cadOtherCheckbox');
    const cadOtherInputWrap = document.getElementById('cadOtherInputWrap');
    const cadOtherText = document.getElementById('cadOtherText');
    const cadCheckboxes = document.querySelectorAll('input[name="cad_experience"]');
    
    // Modal Elementleri
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    // Admin / Excel Elementleri
    const openAdminNavBtn = document.getElementById('openAdminNavBtn');
    const openAdminFloatingBtn = document.getElementById('openAdminFloatingBtn');
    const closeAdminModalBtn = document.getElementById('closeAdminModalBtn');
    const adminModal = document.getElementById('adminModal');
    const exportExcelBtn = document.getElementById('exportExcelBtn');
    const clearDataBtn = document.getElementById('clearDataBtn');
    const applicantCountBadge = document.getElementById('applicantCountBadge');
    const totalApplicantsCount = document.getElementById('totalApplicantsCount');
    const applicantTableBody = document.getElementById('applicantTableBody');
    const googleSheetsWebhookInput = document.getElementById('googleSheetsWebhookInput');
    const saveWebhookBtn = document.getElementById('saveWebhookBtn');

    // LocalStorage anahtarları
    const STORAGE_KEY = 'tars_teknofest_applicants';
    const WEBHOOK_KEY = 'tars_google_sheets_webhook';
    const DEFAULT_WEBHOOK = 'https://script.google.com/macros/s/AKfycbyjxcAmiW8zqkVCQKuORsJVpeM-OQ3CcDk_nrpKmasvNy9WLt8vF47Yk-S7FqtVoG_s/exec';

    // 1. Kayıtlı Webhook URL'sini yükle veya varsayılanı ata
    let savedWebhook = localStorage.getItem(WEBHOOK_KEY);
    if (!savedWebhook) {
        savedWebhook = DEFAULT_WEBHOOK;
        localStorage.setItem(WEBHOOK_KEY, DEFAULT_WEBHOOK);
    }
    if (googleSheetsWebhookInput) {
        googleSheetsWebhookInput.value = savedWebhook;
    }

    if (saveWebhookBtn) {
        saveWebhookBtn.addEventListener('click', () => {
            const url = googleSheetsWebhookInput.value.trim();
            localStorage.setItem(WEBHOOK_KEY, url);
            alert('Google Sheets Webhook URL başarıyla kaydedildi!');
        });
    }

    // 2. Dinamik Departman Kontrolü (Mekanik seçildiğinde özel soruları aç)
    departmentSelect.addEventListener('change', () => {
        const selectedVal = departmentSelect.value;
        if (selectedVal === 'Mekanik Tasarım') {
            mechanicBox.classList.add('active');
        } else {
            mechanicBox.classList.remove('active');
        }
    });

    // 3. CAD Checkbox Mantığı (Yok seçildiğinde diğerlerini temizle, Diğer seçildiğinde metin kutusu aç)
    cadCheckboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            if (e.target === cadNoneCheckbox && cadNoneCheckbox.checked) {
                // 'Yok' seçildiyse diğer tüm kutuları kaldır
                cadCheckboxes.forEach(other => {
                    if (other !== cadNoneCheckbox) other.checked = false;
                });
                cadOtherInputWrap.classList.remove('active');
                cadOtherText.value = '';
            } else if (e.target.checked && e.target !== cadNoneCheckbox) {
                // Başka bir program seçildiyse 'Yok' kutusunu kaldır
                cadNoneCheckbox.checked = false;
            }

            // 'Diğer' kontrolü
            if (cadOtherCheckbox.checked) {
                cadOtherInputWrap.classList.add('active');
                cadOtherText.focus();
            } else {
                cadOtherInputWrap.classList.remove('active');
                cadOtherText.value = '';
            }
        });
    });

    // 4. Form Gönderimi
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const department = departmentSelect.value;

        // Mekanik seçildiyse en az 1 CAD seçeneği kontrolü
        let selectedCadList = [];
        let workshopExp = '';

        if (department === 'Mekanik Tasarım') {
            const checkedCad = Array.from(cadCheckboxes).filter(c => c.checked);
            if (checkedCad.length === 0) {
                alert('Lütfen CAD programı deneyiminizle ilgili en az bir seçenek işaretleyin.');
                return;
            }

            checkedCad.forEach(c => {
                if (c.value === 'Diğer') {
                    const extra = cadOtherText.value.trim();
                    selectedCadList.push(extra ? `Diğer (${extra})` : 'Diğer');
                } else {
                    selectedCadList.push(c.value);
                }
            });

            workshopExp = document.getElementById('workshopExp').value.trim();
        }

        const now = new Date();
        const dateStr = now.toLocaleDateString('tr-TR') + ' ' + now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

        const newApplicant = {
            id: 'TARS-' + Date.now().toString().slice(-5),
            date: dateStr,
            fullname: document.getElementById('fullname').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            university: document.getElementById('university').value.trim(),
            department: department,
            cad_experience: selectedCadList.length > 0 ? selectedCadList.join(', ') : '-',
            workshop_experience: workshopExp || '-',
            experience: document.getElementById('experience').value.trim()
        };

        // Butonu yükleniyor moduna al
        const submitBtn = document.getElementById('submitBtn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> İLETİLİYOR...';

        try {
            // A) LocalStorage'a kaydet (Anında Excel için)
            saveApplicantToLocal(newApplicant);

            // B) Eğer Google Sheets Webhook varsa oraya da POST isteği at
            const webhookUrl = localStorage.getItem(WEBHOOK_KEY);
            if (webhookUrl) {
                try {
                    await fetch(webhookUrl, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newApplicant)
                    });
                } catch (err) {
                    console.warn('Google Sheets webhook hatası:', err);
                }
            }

            // Formu sıfırla ve başarı modalını aç
            form.reset();
            mechanicBox.classList.remove('active');
            cadOtherInputWrap.classList.remove('active');

            renderApplicantsTable();
            successModal.classList.add('active');

        } catch (error) {
            alert('Bir hata oluştu, lütfen tekrar deneyiniz.');
            console.error(error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });

    // 5. Başarı Modalı Kapatma
    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });

    // 6. Admin Modalı Açma / Kapatma
    const openAdmin = () => {
        renderApplicantsTable();
        adminModal.classList.add('active');
    };

    const closeAdmin = () => {
        adminModal.classList.remove('active');
    };

    if (openAdminNavBtn) openAdminNavBtn.addEventListener('click', openAdmin);
    if (openAdminFloatingBtn) openAdminFloatingBtn.addEventListener('click', openAdmin);
    if (closeAdminModalBtn) closeAdminModalBtn.addEventListener('click', closeAdmin);

    // Dışarı tıklandığında modalları kapat
    window.addEventListener('click', (e) => {
        if (e.target === successModal) successModal.classList.remove('active');
        if (e.target === adminModal) adminModal.classList.remove('active');
    });

    // 7. LocalStorage İşlemleri & Tablo Çizimi
    function getApplicants() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            // İlk açılış için örnek bir test başvurusu ekleyelim
            const sample = [
                {
                    id: 'TARS-001',
                    date: '18.09.2026 22:30',
                    fullname: 'Ahmet Yılmaz',
                    email: 'ahmet.yilmaz@thk.edu.tr',
                    phone: '0555 123 45 67',
                    university: 'Türk Hava Kurumu Üniversitesi - Havacılık ve Uzay Mühendisliği',
                    department: 'Mekanik Tasarım',
                    cad_experience: 'SolidWorks, Fusion 360, Diğer (Ansys)',
                    workshop_experience: '3D yazıcı parça üretimi ve CNC freze kullanımı tecrübem var.',
                    experience: 'Daha önce Formula Student şasi tasarım ekibinde yer aldım.'
                }
            ];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sample));
            return sample;
        }
        try {
            return JSON.parse(data);
        } catch (e) {
            return [];
        }
    }

    function saveApplicantToLocal(applicant) {
        const list = getApplicants();
        list.unshift(applicant); // En yeni başvuru en başa
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        updateBadge(list.length);
    }

    function updateBadge(count) {
        if (applicantCountBadge) applicantCountBadge.textContent = count;
        if (totalApplicantsCount) totalApplicantsCount.textContent = count;
    }

    function renderApplicantsTable() {
        const list = getApplicants();
        updateBadge(list.length);

        if (list.length === 0) {
            applicantTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-state">
                        <i class="fa-solid fa-inbox"></i>
                        <p>Henüz kayıtlı başvuru bulunmamaktadır.</p>
                    </td>
                </tr>
            `;
            return;
        }

        applicantTableBody.innerHTML = list.map(app => `
            <tr>
                <td style="white-space:nowrap; font-size:0.85rem; color:#888;">${escapeHtml(app.date)}</td>
                <td style="font-weight:700; color:#fff;">${escapeHtml(app.fullname)}</td>
                <td><span class="tag-badge">${escapeHtml(app.department)}</span></td>
                <td style="max-width:200px; font-size:0.9rem;">${escapeHtml(app.cad_experience)}</td>
                <td style="max-width:220px; font-size:0.9rem; color:#aaa;">${escapeHtml(app.workshop_experience)}</td>
                <td style="font-size:0.85rem;">
                    <div><i class="fa-solid fa-envelope" style="color:var(--primary); width:16px;"></i> ${escapeHtml(app.email)}</div>
                    <div><i class="fa-solid fa-phone" style="color:var(--primary); width:16px;"></i> ${escapeHtml(app.phone)}</div>
                </td>
                <td style="font-size:0.85rem; max-width:200px;">${escapeHtml(app.university)}</td>
            </tr>
        `).join('');
    }

    // 8. EXCEL (.XLSX / .CSV) OLARAK İNDİRME MOTORU
    // Türkçe karakterleri (ğ, ü, ş, ı, ö, ç) Excel'in kusursuz açabilmesi için UTF-8 BOM (\uFEFF) ile kodlanır.
    exportExcelBtn.addEventListener('click', () => {
        const list = getApplicants();
        if (list.length === 0) {
            alert('İndirilecek başvuru verisi bulunmuyor.');
            return;
        }

        const headers = [
            'Başvuru No',
            'Tarih & Saat',
            'Ad Soyad',
            'E-posta',
            'Telefon',
            'Üniversite ve Bölüm',
            'Hedeflenen Departman',
            'CAD Programı Deneyimi (Mekanik)',
            'Atölye / İmalat Deneyimi',
            'Teknik Yetkinlikler ve Projeler'
        ];

        // CSV satırlarını oluştur (Noktalı virgül Excel Türkiye ayarlarında doğrudan sütunlara böler)
        let csvContent = '\uFEFF'; // Excel UTF-8 BOM
        csvContent += headers.map(h => `"${h.replace(/"/g, '""')}"`).join(';') + '\r\n';

        list.forEach(app => {
            const row = [
                app.id || '',
                app.date || '',
                app.fullname || '',
                app.email || '',
                app.phone || '',
                app.university || '',
                app.department || '',
                app.cad_experience || '',
                app.workshop_experience || '',
                app.experience || ''
            ];
            csvContent += row.map(cell => `"${String(cell).replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`).join(';') + '\r\n';
        });

        // İndirme tetikleme
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const nowStr = new Date().toISOString().slice(0, 10);
        link.setAttribute('href', url);
        link.setAttribute('download', `TARS_Teknofest_Basvurulari_${nowStr}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });

    // 9. Verileri Sıfırlama
    clearDataBtn.addEventListener('click', () => {
        if (confirm('Tüm yerel başvuru kayıtlarını temizlemek istediğinizden emin misiniz?')) {
            localStorage.removeItem(STORAGE_KEY);
            renderApplicantsTable();
        }
    });

    // XSS Koruması için yardımcı fonksiyon
    function escapeHtml(text) {
        if (!text) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Başlangıç çizimi
    renderApplicantsTable();
});
