# TARS UGV // Takım İçi Görev, Doküman ve Süreç Portalı (V2.0)

Bu portal, **TEKNOFEST 2027 TARS İnsansız Kara Aracı (İKA)** ekibi üyelerinin proje geliştirme sürecini şeffaf şekilde takip edebilmeleri, kendilerine atanan iş paketlerini yönetebilmeleri ve teknik dokümanları (CAD, PCB, Raporlar) güvenle paylaşabilmeleri amacıyla geliştirilmiş iç yönetim platformudur.

---

## 🚀 Öne Çıkan Modüller

1. **Yetkili Giriş Sistemi (Authentication):**
   - Kullanıcı adı ve şifre doğrulaması.
   - Hızlı test için hazır demo hesaplar:
     - 👑 **Takım Kaptanı (Admin):** Kullanıcı: `kaptan` | Şifre: `tars2027`
     - ⚙️ **Mekanik & Şasi Lideri:** Kullanıcı: `mekanik` | Şifre: `tars2027`
     - ⚡ **Aviyonik & Güç Lideri:** Kullanıcı: `elektronik` | Şifre: `tars2027`
     - 💻 **Yazılım & Otonomi Lideri:** Kullanıcı: `yazilim` | Şifre: `tars2027`

2. **Görev Takip Panosu (Kanban):**
   - 4 Aşamalı İş Paketi Akışı: *Yapılacak*, *Devam Ediyor*, *İnceleme & Test*, *Tamamlandı*.
   - Departman bazlı (Mekanik, Elektronik, Yazılım, Yönetim) ve öncelik bazlı (Kritik, Yüksek, Normal) filtreleme.
   - Yeni görev ekleme, aşamalar arası tek tıkla taşıma ve silme.

3. **Doküman & Dosya Merkezi (Deliverables Hub):**
   - Sürükle-bırak destekli teknik doküman yükleme merkezi.
   - CAD (.step, .stl), PCB Gerber (.zip), Rapor (.pdf, .docx) ve Yazılım (.yaml, .py) dosya formatları.
   - İndirme simülasyonu, yükleyen kişi ve versiyon notları.

4. **TEKNOFEST 2027 Proje Zaman Çizelgesi (Timeline):**
   - 6 Aşamalı interaktif yarışma yol haritası (Konseptten Final yarışmasına kadar).
   - Canlı gün geri sayımı ve genel hazırlık yüzdesi göstergesi.

5. **Takım İçi Duyurular & Toplantı Takvimi:**
   - Atölye çalışma saatleri, acil bildirimler ve haftalık toplantı gündemleri.

---

## 🛠️ Yerel Çalıştırma

Projeyi tarayıcınızda açmak için `index.html` dosyasına çift tıklayabilir veya yerel sunucu başlatabilirsiniz:

```bash
python -m http.server 4173
```
Tarayıcınızdan: `http://localhost:4173`
