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
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheets()[0];
    
    // Eğer tablo boşsa veya başlıkları güncellemek gerekirse
    var headers = [
      "Başvuru ID",
      "Tarih & Saat",
      "Ad Soyad",
      "E-Posta",
      "Telefon",
      "Bölüm & Sınıf",
      "Hedeflenen Departman",
      "CAD Yetkinlikleri (Mekanik)",
      "Atölye / İmalat Deneyimi",
      "PCB Tasarım Deneyimi",
      "Mikrodenetleyici Deneyimi",
      "Güç Elektroniği Deneyimi",
      "Programlama Dilleri",
      "ROS2 Deneyimi",
      "OpenCV / Görüntü İşleme / Derin Öğrenme",
      "Proje & Yarışma Deneyimi (TEKNOFEST vb.)"
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#B71C1C"); // Koyu Kırmızı
      headerRange.setFontColor("#FFFFFF"); // Beyaz Yazı
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    var data = JSON.parse(e.postData.contents);

    var row = [
      data.id || ("TARS-" + Math.floor(1000 + Math.random() * 9000)),
      data.date || new Date().toLocaleString("tr-TR"),
      data.fullname || "",
      data.email || "",
      data.phone || "",
      data.university || "", // Bölüm & Sınıf
      data.department || "",
      data.cad_experience || "-",
      data.workshop_experience || "-",
      data.pcb_experience || "-",
      data.mcu_experience || "-",
      data.power_experience || "-",
      data.programming_languages || "-",
      data.ros2_experience || "-",
      data.opencv_experience || "-",
      data.experience || ""
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
