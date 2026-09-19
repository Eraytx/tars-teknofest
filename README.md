# TARS İnsansız Kara Aracı - TEKNOFEST 2026 Başvuru Portalı

Bu proje, **TEKNOFEST 2026 TARS İnsansız Kara Aracı** başvuru web sitesinin birebir tasarımı, departmana özel dinamik soru sistemi ve temiz Excel dışa aktarım altyapısıyla yeniden kodlanmış halidir.

---

## 🚀 Öne Çıkan Özellikler

1. **Birebir ve Yüksek Kaliteli Tasarım:**
   - Orijinal sitenin renk paleti (`#FF2A2A` Teknofest kırmızısı ve `#050505` siyah), `Orbitron` ve `Rajdhani` fontları ile modern savunma sanayii / insansız araç estetiği.
   - Sistem mimarisi ve departman kartları (Mekanik, Donanım, Yazılım).

2. **Dinamik Başvuru Formu (Mekanik Özel Alanı):**
   - Aday *"Mekanik Tasarım ve Analiz"* departmanını seçtiğinde özel bölüm akıcı bir animasyonla açılır:
     - **CAD Programı Deneyimi:** *SolidWorks*, *Fusion 360*, *AutoCAD*, *Yok*, *Diğer* (özel metin kutusu ile).
     - **Atölye / İmalat Deneyimi:** CNC, 3D baskı, kaynak vb. tecrübeler için detaylı açıklama alanı.
   - Aday başka bir departman seçtiğinde mekanik soruları gizlenir (ileride eklenecek yazılım/elektronik sorularına hazır modüler mimari).

3. **Temiz Excel Altyapısı (2 Seçenekli):**
   - **Seçenek A (Doğrudan Tarayıcıdan Excel İndirme):** Sayfanın sağ alt köşesindeki *"BAŞVURULAR (EXCEL)"* butonuna basarak gelen tüm başvuruları Türkçe karakter (UTF-8 BOM) uyumlu tek tıkla `.xlsx / .csv` olarak indirebilirsiniz.
   - **Seçenek B (Canlı Google E-Tablolar Entegrasyonu):** `google-sheets-script.js` dosyasındaki ücretsiz script ile her başvuru anında Google Drive tablonuza yeni bir satır olarak yansır.

---

## 📊 Google Sheets ile Canlı Excel Kurulumu (2 Dakika)

1. Yeni bir tablo oluşturun: [Google Sheets](https://sheets.new)
2. Üst menüden **Uzantılar (Extensions) > Apps Script** bölümüne gidin.
3. Editördeki mevcut kodları silip, bu projedeki [`google-sheets-script.js`](./google-sheets-script.js) dosyasının içeriğini yapıştırın ve kaydedin.
4. Sağ üstteki mavi **Dağıt (Deploy) > Yeni dağıtım (New deployment)** butonuna basın:
   - Tür: **Web uygulaması (Web app)**
   - Erişimi olanlar: **Herkes (Anyone)** seçin.
5. "Dağıt" butonuna basın ve size verilen `https://script.google.com/macros/s/.../exec` adresini kopyalayın.
6. Web sitesini açıp sağ alttaki **BAŞVURULAR (EXCEL)** panelinden bu URL'yi yapıştırıp "KAYDET" butonuna basın. Artık her başvuru doğrudan canlı Google tablonuza akacaktır!

---

## 🌐 Sayfayı Çalıştırma ve Yayına Alma

- **Yerel Açma:** `index.html` dosyasını çift tıklayarak doğrudan herhangi bir tarayıcıda (Chrome, Edge, Brave vb.) açabilirsiniz.
- **GitHub Pages'de Yayınlama:** Bu klasördeki dosyaları doğrudan bir GitHub reposuna yükleyip `Settings > Pages` kısmından saniyeler içinde yayına alabilirsiniz.
