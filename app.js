/**
 * TARS İnsansız Kara Aracı - Başvuru ve Dinamik Form Yönetimi
 * TEKNOFEST 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elementleri
    const form = document.getElementById('tarsApplyForm');
    const departmentSelect = document.getElementById('department');
    
    // Dinamik Kutular
    const mechanicBox = document.getElementById('mechanicDynamicBox');
    const electronicsBox = document.getElementById('electronicsDynamicBox');
    const softwareBox = document.getElementById('softwareDynamicBox');

    // Mekanik Elementleri
    const cadNoneCheckbox = document.getElementById('cadNoneCheckbox');
    const cadOtherCheckbox = document.getElementById('cadOtherCheckbox');
    const cadOtherInputWrap = document.getElementById('cadOtherInputWrap');
    const cadOtherText = document.getElementById('cadOtherText');
    const cadCheckboxes = document.querySelectorAll('input[name="cad_experience"]');
    const workshopExp = document.getElementById('workshopExp');

    // Elektronik Elementleri
    const pcbNoneCheckbox = document.getElementById('pcbNoneCheckbox');
    const pcbOtherCheckbox = document.getElementById('pcbOtherCheckbox');
    const pcbOtherInputWrap = document.getElementById('pcbOtherInputWrap');
    const pcbOtherText = document.getElementById('pcbOtherText');
    const pcbCheckboxes = document.querySelectorAll('input[name="pcb_experience"]');

    const mcuNoneCheckbox = document.getElementById('mcuNoneCheckbox');
    const mcuOtherCheckbox = document.getElementById('mcuOtherCheckbox');
    const mcuOtherInputWrap = document.getElementById('mcuOtherInputWrap');
    const mcuOtherText = document.getElementById('mcuOtherText');
    const mcuCheckboxes = document.querySelectorAll('input[name="mcu_experience"]');

    // Yazılım Elementleri
    const progLangOtherCheckbox = document.getElementById('progLangOtherCheckbox');
    const progLangOtherInputWrap = document.getElementById('progLangOtherInputWrap');
    const progLangOtherText = document.getElementById('progLangOtherText');
    const progLangCheckboxes = document.querySelectorAll('input[name="programming_languages"]');
    const opencvExp = document.getElementById('opencvExp');

    // Seviye Seçim Butonları (Görsel Seçim Efekti)
    const levelLabels = document.querySelectorAll('.level-option');
    levelLabels.forEach(label => {
        const radio = label.querySelector('input[type="radio"]');
        if (radio) {
            radio.addEventListener('change', () => {
                const groupName = radio.name;
                document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => {
                    r.closest('.level-option')?.classList.remove('selected');
                });
                if (radio.checked) {
                    label.classList.add('selected');
                }
            });
        }
    });

    // Başarı Modalı
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Google Sheets Webhook URL
    const GOOGLE_SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbyjxcAmiW8zqkVCQKuORsJVpeM-OQ3CcDk_nrpKmasvNy9WLt8vF47Yk-S7FqtVoG_s/exec';

    // 1. Dinamik Departman Kontrolü
    departmentSelect.addEventListener('change', () => {
        const val = departmentSelect.value;
        
        // Önce hepsini kapat
        mechanicBox.classList.remove('active');
        electronicsBox.classList.remove('active');
        softwareBox.classList.remove('active');

        if (val.startsWith('Mekanik')) {
            mechanicBox.classList.add('active');
        } else if (val.startsWith('Elektrik Elektronik')) {
            electronicsBox.classList.add('active');
        } else if (val.startsWith('Yazılım')) {
            softwareBox.classList.add('active');
        }
    });

    // 2. Yardımcı Checkbox Fonksiyonu (Yok seçilince diğerlerini kaldır, Diğer seçilince metin kutusunu aç)
    function setupCheckboxGroup(checkboxes, noneCheckbox, otherCheckbox, otherInputWrap, otherInputText) {
        checkboxes.forEach(cb => {
            cb.addEventListener('change', (e) => {
                if (noneCheckbox && e.target === noneCheckbox && noneCheckbox.checked) {
                    checkboxes.forEach(other => {
                        if (other !== noneCheckbox) other.checked = false;
                    });
                    if (otherInputWrap) otherInputWrap.classList.remove('active');
                    if (otherInputText) otherInputText.value = '';
                } else if (e.target.checked && noneCheckbox && e.target !== noneCheckbox) {
                    noneCheckbox.checked = false;
                }

                if (otherCheckbox && otherInputWrap) {
                    if (otherCheckbox.checked) {
                        otherInputWrap.classList.add('active');
                        otherInputText?.focus();
                    } else {
                        otherInputWrap.classList.remove('active');
                        if (otherInputText) otherInputText.value = '';
                    }
                }
            });
        });
    }

    // Grupları bağla
    setupCheckboxGroup(cadCheckboxes, cadNoneCheckbox, cadOtherCheckbox, cadOtherInputWrap, cadOtherText);
    setupCheckboxGroup(pcbCheckboxes, pcbNoneCheckbox, pcbOtherCheckbox, pcbOtherInputWrap, pcbOtherText);
    setupCheckboxGroup(mcuCheckboxes, mcuNoneCheckbox, mcuOtherCheckbox, mcuOtherInputWrap, mcuOtherText);
    setupCheckboxGroup(progLangCheckboxes, null, progLangOtherCheckbox, progLangOtherInputWrap, progLangOtherText);

    // Seçili kutuları metin olarak topla
    function getSelectedOptions(checkboxes, otherCheckbox, otherInputText) {
        const checked = Array.from(checkboxes).filter(c => c.checked);
        const list = [];
        checked.forEach(c => {
            if (otherCheckbox && c === otherCheckbox) {
                const extra = otherInputText ? otherInputText.value.trim() : '';
                list.push(extra ? `Diğer (${extra})` : 'Diğer');
            } else {
                list.push(c.value);
            }
        });
        return list;
    }

    // 3. Form Gönderimi
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const department = departmentSelect.value;
        if (!department) {
            alert('Lütfen bir hedef departman seçiniz.');
            return;
        }

        let cadExpStr = '-';
        let workshopExpStr = '-';
        let pcbExpStr = '-';
        let mcuExpStr = '-';
        let powerExpStr = '-';
        let progLangStr = '-';
        let ros2ExpStr = '-';
        let opencvExpStr = '-';

        // Mekanik Doğrulama
        if (department.startsWith('Mekanik')) {
            const cadList = getSelectedOptions(cadCheckboxes, cadOtherCheckbox, cadOtherText);
            if (cadList.length === 0) {
                alert('Lütfen CAD programı deneyiminizle ilgili en az bir seçenek işaretleyin.');
                return;
            }
            cadExpStr = cadList.join(', ');
            workshopExpStr = workshopExp.value.trim() || '-';
        }

        // Elektronik Doğrulama
        else if (department.startsWith('Elektrik Elektronik')) {
            const pcbList = getSelectedOptions(pcbCheckboxes, pcbOtherCheckbox, pcbOtherText);
            if (pcbList.length === 0) {
                alert('Lütfen PCB tasarım deneyiminizle ilgili en az bir seçenek işaretleyin.');
                return;
            }
            const mcuList = getSelectedOptions(mcuCheckboxes, mcuOtherCheckbox, mcuOtherText);
            if (mcuList.length === 0) {
                alert('Lütfen Mikrodenetleyici deneyiminizle ilgili en az bir seçenek işaretleyin.');
                return;
            }
            const selectedPower = document.querySelector('input[name="power_experience"]:checked');
            if (!selectedPower) {
                alert('Lütfen Güç elektroniği deneyim seviyenizi seçiniz.');
                return;
            }

            pcbExpStr = pcbList.join(', ');
            mcuExpStr = mcuList.join(', ');
            powerExpStr = selectedPower.value;
        }

        // Yazılım Doğrulama
        else if (department.startsWith('Yazılım')) {
            const langList = getSelectedOptions(progLangCheckboxes, progLangOtherCheckbox, progLangOtherText);
            if (langList.length === 0) {
                alert('Lütfen bildiğiniz programlama dillerinden en az birini işaretleyin.');
                return;
            }
            const selectedRos2 = document.querySelector('input[name="ros2_experience"]:checked');
            if (!selectedRos2) {
                alert('Lütfen ROS2 deneyim seviyenizi seçiniz.');
                return;
            }
            const opencvVal = opencvExp.value.trim();
            if (!opencvVal) {
                alert('Lütfen OpenCV veya görüntü işleme / derin öğrenme deneyiminizden kısaca bahsediniz.');
                opencvExp.focus();
                return;
            }

            progLangStr = langList.join(', ');
            ros2ExpStr = selectedRos2.value;
            opencvExpStr = opencvVal;
        }

        const now = new Date();
        const dateStr = now.toLocaleDateString('tr-TR') + ' ' + now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

        const newApplicant = {
            id: 'TARS-' + Date.now().toString().slice(-5),
            date: dateStr,
            fullname: document.getElementById('fullname').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            university: document.getElementById('university').value.trim(), // Bölüm & Sınıf
            department: department,
            cad_experience: cadExpStr,
            workshop_experience: workshopExpStr,
            pcb_experience: pcbExpStr,
            mcu_experience: mcuExpStr,
            power_experience: powerExpStr,
            programming_languages: progLangStr,
            ros2_experience: ros2ExpStr,
            opencv_experience: opencvExpStr,
            experience: document.getElementById('experience').value.trim()
        };

        const submitBtn = document.getElementById('submitBtn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> İLETİLİYOR...';

        try {
            await fetch(GOOGLE_SHEETS_WEBHOOK, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newApplicant)
            });

            // Formu sıfırla
            form.reset();
            mechanicBox.classList.remove('active');
            electronicsBox.classList.remove('active');
            softwareBox.classList.remove('active');
            cadOtherInputWrap.classList.remove('active');
            pcbOtherInputWrap.classList.remove('active');
            mcuOtherInputWrap.classList.remove('active');
            progLangOtherInputWrap.classList.remove('active');
            document.querySelectorAll('.level-option').forEach(l => l.classList.remove('selected'));

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
