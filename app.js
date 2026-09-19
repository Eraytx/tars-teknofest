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
    
    // Başarı Modalı
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Google Sheets Webhook URL
    const GOOGLE_SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbyjxcAmiW8zqkVCQKuORsJVpeM-OQ3CcDk_nrpKmasvNy9WLt8vF47Yk-S7FqtVoG_s/exec';

    // 1. Dinamik Departman Kontrolü (Mekanik seçildiğinde özel soruları aç)
    departmentSelect.addEventListener('change', () => {
        const selectedVal = departmentSelect.value;
        if (selectedVal === 'Mekanik Tasarım') {
            mechanicBox.classList.add('active');
        } else {
            mechanicBox.classList.remove('active');
        }
    });

    // 2. CAD Checkbox Mantığı (Yok seçildiğinde diğerlerini temizle, Diğer seçildiğinde metin kutusu aç)
    cadCheckboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            if (e.target === cadNoneCheckbox && cadNoneCheckbox.checked) {
                cadCheckboxes.forEach(other => {
                    if (other !== cadNoneCheckbox) other.checked = false;
                });
                cadOtherInputWrap.classList.remove('active');
                cadOtherText.value = '';
            } else if (e.target.checked && e.target !== cadNoneCheckbox) {
                cadNoneCheckbox.checked = false;
            }

            if (cadOtherCheckbox.checked) {
                cadOtherInputWrap.classList.add('active');
                cadOtherText.focus();
            } else {
                cadOtherInputWrap.classList.remove('active');
                cadOtherText.value = '';
            }
        });
    });

    // 3. Form Gönderimi (Doğrudan Google Sheets'e Yazma)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const department = departmentSelect.value;
        let selectedCadList = [];
        let workshopExp = '';

        // Mekanik kontrolü
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

        const submitBtn = document.getElementById('submitBtn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> İLETİLİYOR...';

        try {
            // Google Sheets Webhook'una POST isteği gönder
            await fetch(GOOGLE_SHEETS_WEBHOOK, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newApplicant)
            });

            // Formu sıfırla ve başarı modalını göster
            form.reset();
            mechanicBox.classList.remove('active');
            cadOtherInputWrap.classList.remove('active');
            successModal.classList.add('active');

        } catch (error) {
            alert('Bir hata oluştu, lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.');
            console.error('Gönderim hatası:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });

    // 4. Başarı Modalı Kapatma
    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === successModal) successModal.classList.remove('active');
    });
});
