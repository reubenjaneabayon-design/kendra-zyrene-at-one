/**
 * Kendra RSVP collector — Google Apps Script
 * 1. Create a Google Sheet, then Extensions > Apps Script.
 * 2. Replace the editor contents with this code and save.
 * 3. Deploy > New deployment > Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 4. Deploy, authorize, copy the Web app URL ending in /exec.
 * 5. Paste that URL into index.html as RSVP_ENDPOINT.
 */
const SHEET_NAME = "RSVP Responses";

function doGet() {
  return ContentService
    .createTextOutput("Kendra RSVP endpoint is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["Timestamp", "Guest's full name", "Attendance", "Number of attendees", "Message for Kendra"]);
      sheet.setFrozenRows(1);
    }
    const attendance = data.attendance === "No" ? "No" : "Yes";
    const count = attendance === "No" ? 0 : Math.max(1, Math.min(10, Number(data.attendees) || 1));
    sheet.appendRow([
      new Date(),
      String(data.guestName || "").slice(0, 120),
      attendance,
      count,
      String(data.message || "").slice(0, 1000)
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
