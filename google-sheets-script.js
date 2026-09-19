/**
 * ==============================================================================
 * TARS İnsansız Kara Aracı - Google E-Tablolar (Google Sheets) Otomasyon Kodu
 * ==============================================================================
 */

// Sizin Google E-Tablo Kimliğiniz (ID)
var SPREADSHEET_ID = "1jfwSPIYbr9Ej1EqBRe4OjMJOYiQxF40SUJH0thuu1sw";

function doGet(e) {
  return ContentService
    .createTextOutput("TARS İnsansız Kara Aracı Başvuru Sistemi Aktif! (Webhook çalışıyor)")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // Doğrudan tablonuzu açar
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheets()[0];
    
    // Eğer tablo boşsa başlıkları otomatik ekle ve biçimlendir
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Başvuru ID",
        "Tarih & Saat",
        "Ad Soyad",
        "E-Posta",
        "Telefon",
        "Üniversite & Bölüm",
        "Hedeflenen Departman",
        "CAD Yetkinlikleri (Mekanik)",
        "Atölye / İmalat Deneyimi",
        "Teknik Yetkinlikler ve Projeler"
      ];
      
      sheet.appendRow(headers);
      
      // Başlık satırını kırmızı/beyaz olarak biçimlendir
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#B71C1C"); // Koyu Kırmızı
      headerRange.setFontColor("#FFFFFF"); // Beyaz Yazı
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);

      // Sütun genişliklerini otomatik ayarla
      for (var col = 1; col <= headers.length; col++) {
        sheet.autoResizeColumn(col);
      }
    }

    var data = JSON.parse(e.postData.contents);

    var row = [
      data.id || ("TARS-" + Math.floor(1000 + Math.random() * 9000)),
      data.date || new Date().toLocaleString("tr-TR"),
      data.fullname || "",
      data.email || "",
      data.phone || "",
      data.university || "",
      data.department || "",
      data.cad_experience || "-",
      data.workshop_experience || "-",
      data.experience || ""
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Başvuru başarıyla Google E-Tabloya eklendi!" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
