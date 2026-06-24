const SHEET_NAME = "Responses";

function doPost(e) {
  const sheet = getSheet();
  const payload = JSON.parse(e.postData.contents || "{}");
  const row = buildRow(payload);

  ensureHeader(sheet, row);
  sheet.appendRow(Object.values(row));

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeader(sheet, row) {
  const headers = Object.keys(row);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    return;
  }

  const currentHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  if (currentHeaders.join("|") !== headers.join("|")) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function buildRow(payload) {
  const devices = ["phone", "tv", "computer", "tablet"];

  const row = {
    submittedAt: payload.submittedAt || new Date().toISOString(),
    anonymous: payload.anonymous === true,
    reduce: payload.reduce || "",
    increase: payload.increase || "",
    note: payload.note || ""
  };

  devices.forEach((device) => {
    row[`quick_${device}`] = payload.quick && payload.quick[device] ? payload.quick[device] : "";
  });

  return row;
}
