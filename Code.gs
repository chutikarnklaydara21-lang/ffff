/**
 * เธฃเธฐเธเธเธฃเธฑเธเธชเธกเธฑเธเธฃเน€เธฃเธตเธขเธเธญเธญเธเนเธฅเธเน (เนเธเธงเธ•เธฒ) เธงเธดเธ—เธขเธฒเธฅเธฑเธขเน€เธ—เธเธเธดเธเธ—เนเธฒเธซเธฅเธงเธเธเธดเน€เธกเธเธ•เนเนเธ—เธขเธญเธเธธเธชเธฃเธ“เน
 * เนเธเธฅเน: Config.js
 * เธซเธเนเธฒเธ—เธตเน: เธเธฑเธ”เธเธฒเธฃเธเนเธฒเธเธเธ—เธตเน, เธเธทเนเธญเธเธตเธ•, เนเธฅเธฐเธเธฒเธฃเน€เธเนเธฒเธ–เธถเธ Script Properties เธญเธขเนเธฒเธเธเธฅเธญเธ”เธ เธฑเธข
 */

// เธเธทเนเธญเธเธตเธ•เธ—เธฑเนเธเธซเธกเธ”เนเธเธฃเธฐเธเธ
const SHEETS = {
  APPLICANTS: 'Applicants',
  DOCUMENTS: 'Documents',
  STATUS_LOG: 'StatusLog',
  ADMINS: 'Admins',
  CONFIG: 'Config',
  TEMPLATES: 'Templates',
  ENROLLMENTS: 'Enrollments',
  AUDIT_LOG: 'AuditLog'
};

// เธชเธ–เธฒเธเธฐเธเธฒเธฃเธชเธกเธฑเธเธฃ
const APPLICATION_STATUS = {
  PENDING: 'เธฃเธญเธ•เธฃเธงเธเธชเธญเธ',
  INCOMPLETE: 'เน€เธญเธเธชเธฒเธฃเนเธกเนเธเธฃเธ',
  PASSED: 'เธเนเธฒเธเธเธฒเธฃเธเธฑเธ”เน€เธฅเธทเธญเธ',
  FAILED: 'เนเธกเนเธเนเธฒเธเธเธฒเธฃเธเธฑเธ”เน€เธฅเธทเธญเธ',
  ENROLLED: 'เธกเธญเธเธ•เธฑเธงเนเธฅเนเธง'
};

// เธชเธดเธ—เธเธดเนเธเธนเนเนเธเนเธเธฒเธเธฃเธฐเธเธ
const ADMIN_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN', // เธชเธดเธ—เธเธดเนเธชเธนเธเธชเธธเธ” เธ—เธณเนเธ”เนเธ—เธธเธเธญเธขเนเธฒเธ
  REGISTRAR: 'REGISTRAR'      // เธชเธดเธ—เธเธดเนเน€เธเนเธฒเธซเธเนเธฒเธ—เธตเนเธ—เธฐเน€เธเธตเธขเธ เธ”เธน/เธ•เธฃเธงเธ/เน€เธเธฅเธตเนเธขเธเธชเธ–เธฒเธเธฐ (เธซเนเธฒเธกเธฅเธ/เนเธเนเนเธเธฃเธฐเธเธ)
};

// เธเนเธฒเธ•เธฑเนเธเธ•เนเธเธเธญเธเธฃเธฐเธเธ
const DEFAULT_CONFIG = {
  ACADEMIC_YEAR: '2570',
  COLLEGE_NAME: 'เธงเธดเธ—เธขเธฒเธฅเธฑเธขเน€เธ—เธเธเธดเธเธ—เนเธฒเธซเธฅเธงเธเธเธดเน€เธกเธเธ•เนเนเธ—เธขเธญเธเธธเธชเธฃเธ“เน',
  QUOTA_PREFIX: 'Q70-',
  STUDENT_ID_PREFIX: '7020101',
  MAX_FILE_SIZE_MB: 5,
  ALLOWED_MIME_TYPES: [
    'image/jpeg',
    'image/png',
    'application/pdf'
  ]
};

/**
 * เธ”เธถเธเธเนเธฒ Script Property เธ•เธฒเธก Key
 * @param {string} key 
 * @param {string} defaultValue 
 * @returns {string}
 */
function getProp(key, defaultValue = '') {
  try {
    const value = PropertiesService.getScriptProperties().getProperty(key);
    return value !== null && value !== undefined ? value : defaultValue;
  } catch (error) {
    console.error(`เนเธกเนเธชเธฒเธกเธฒเธฃเธ–เธญเนเธฒเธเธเนเธฒ Property: ${key}`, error);
    return defaultValue;
  }
}

/**
 * เธเธฑเธเธ—เธถเธเธเนเธฒ Script Property
 * @param {string} key 
 * @param {string} value 
 */
function setProp(key, value) {
  try {
    PropertiesService.getScriptProperties().setProperty(key, value);
  } catch (error) {
    console.error(`เนเธกเนเธชเธฒเธกเธฒเธฃเธ–เธเธฑเธเธ—เธถเธเธเนเธฒ Property: ${key}`, error);
    throw error;
  }
}

/**
 * เธ”เธถเธ ID เธเธญเธ Spreadsheet เธเธฒเธเธเนเธญเธกเธนเธฅ
 */
function getSpreadsheetId() {
  return getProp('SPREADSHEET_ID', SpreadsheetApp.getActiveSpreadsheet() ? SpreadsheetApp.getActiveSpreadsheet().getId() : '');
}

/**
 * เธ”เธถเธ ID เธเธญเธเนเธเธฅเน€เธ”เธญเธฃเน Google Drive เน€เธเนเธเนเธเธฅเนเนเธเธ
 */
function getDriveFolderId() {
  return getProp('DRIVE_FOLDER_ID', '');
}

/**
 * เธ”เธถเธ Token เธเธญเธ LINE Messaging API
 */
function getLineChannelAccessToken() {
  return getProp('LINE_CHANNEL_ACCESS_TOKEN', '');
}

/**
 * เธ”เธถเธ Group ID เธซเธฃเธทเธญ User ID เธเธฅเธฒเธขเธ—เธฒเธเธชเธณเธซเธฃเธฑเธเนเธเนเธเน€เธ•เธทเธญเธเน€เธเนเธฒเธซเธเนเธฒเธ—เธตเน
 */
function getLineAdminTargetId() {
  return getProp('LINE_ADMIN_TARGET_ID', '');
}

/**
 * เธ”เธถเธ ID เธเธญเธ Google Docs Template เธชเธณเธซเธฃเธฑเธเนเธเธชเธกเธฑเธเธฃ
 */
function getAppTemplateDocId() {
  return getProp('APP_TEMPLATE_DOC_ID', '');
}

/**
 * เธ”เธถเธ ID เธเธญเธ Google Docs Template เธชเธณเธซเธฃเธฑเธเนเธเธกเธญเธเธ•เธฑเธง
 */
function getEnrollTemplateDocId() {
  return getProp('ENROLL_TEMPLATE_DOC_ID', '');
}

/**
 * เธ”เธถเธเธฃเธซเธฑเธชเธเนเธฒเธเธฅเธฑเธ / Master PIN เนเธญเธ”เธกเธดเธ (เธชเธณเธฃเธญเธเธเธฃเธ“เธตเนเธกเนเนเธ”เนเนเธเน Google Session)
 */
function getAdminSecretPin() {
  return getProp('ADMIN_SECRET_PIN', '70201');
}
/**
 * เธฃเธฐเธเธเธฃเธฑเธเธชเธกเธฑเธเธฃเน€เธฃเธตเธขเธเธญเธญเธเนเธฅเธเน (เนเธเธงเธ•เธฒ) เธงเธดเธ—เธขเธฒเธฅเธฑเธขเน€เธ—เธเธเธดเธเธ—เนเธฒเธซเธฅเธงเธเธเธดเน€เธกเธเธ•เนเนเธ—เธขเธญเธเธธเธชเธฃเธ“เน
 * เนเธเธฅเน: Database.js
 * เธซเธเนเธฒเธ—เธตเน: เธเธฑเธ”เธเธฒเธฃเธเธฒเธฃเน€เธเธทเนเธญเธกเธ•เนเธญ, เน€เธเธดเนเธก, เธเนเธเธซเธฒ, เนเธเนเนเธ เธเนเธญเธกเธนเธฅเนเธ Google Sheets เธญเธขเนเธฒเธเน€เธเนเธเธฃเธฐเธเธ
 */

/**
 * เธ”เธถเธเธญเธญเธเน€เธเนเธเธ•เน Google Spreadsheet เธซเธฅเธฑเธ
 * @returns {GoogleAppsScript.Spreadsheet.Spreadsheet}
 */
function getDb() {
  const ssId = getSpreadsheetId();
  if (ssId) {
    return SpreadsheetApp.openById(ssId);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * เธ”เธถเธเนเธเนเธเธเธฒเธ (Sheet) เธ•เธฒเธกเธเธทเนเธญ
 * @param {string} sheetName 
 * @returns {GoogleAppsScript.Spreadsheet.Sheet}
 */
function getSheet(sheetName) {
  const ss = getDb();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`เนเธกเนเธเธเนเธเนเธเธเธฒเธเธเธทเนเธญ: ${sheetName}`);
  }
  return sheet;
}

/**
 * เนเธเธฅเธเนเธ–เธงเธเนเธญเธกเธนเธฅเนเธเธเธตเธ•เนเธซเนเน€เธเนเธ Array of Objects เนเธ”เธขเนเธเนเธซเธฑเธงเธเธญเธฅเธฑเธกเธเนเนเธเนเธ–เธงเธ—เธตเน 1 เน€เธเนเธ key
 * @param {string} sheetName 
 * @returns {Array<Object>}
 */
function getSheetDataAsObjects(sheetName) {
  const sheet = getSheet(sheetName);
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  const headers = data[0].map(h => String(h).trim());
  const rows = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    // เธเนเธฒเธกเนเธ–เธงเธ—เธตเนเธเธญเธฅเธฑเธกเธเนเนเธฃเธเธงเนเธฒเธเน€เธเธฅเนเธฒ
    if (row[0] === '' && row[1] === '') continue;

    const rowObj = { _rowIndex: i + 1 }; // เน€เธเนเธ index เนเธ–เธงเธเธฃเธดเธเนเธ Sheet เนเธงเนเธชเธณเธซเธฃเธฑเธเธญเธฑเธเน€เธ”เธ•
    for (let j = 0; j < headers.length; j++) {
      rowObj[headers[j]] = row[j];
    }
    rows.push(rowObj);
  }
  return rows;
}

/**
 * เน€เธเธดเนเธกเนเธ–เธงเนเธซเธกเนเธฅเธเนเธเธเธตเธ• เนเธ”เธขเธเธฑเธเธเธนเน field เธ•เธฒเธกเธเธทเนเธญเธซเธฑเธงเธ•เธฒเธฃเธฒเธ
 * @param {string} sheetName 
 * @param {Object} dataObj 
 * @returns {number} เนเธ–เธงเธ—เธตเนเธ–เธนเธเน€เธเธดเนเธก
 */
function appendRowObject(sheetName, dataObj) {
  const sheet = getSheet(sheetName);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const newRow = headers.map(header => {
    const key = String(header).trim();
    return dataObj[key] !== undefined && dataObj[key] !== null ? dataObj[key] : '';
  });

  sheet.appendRow(newRow);
  return sheet.getLastRow();
}

/**
 * เธเนเธเธซเธฒเธเนเธญเธกเธนเธฅเนเธ–เธงเนเธฃเธเธ—เธตเนเธ•เธฃเธเธเธฑเธเน€เธเธทเนเธญเธเนเธ Key Column
 * @param {string} sheetName 
 * @param {string} keyColumn 
 * @param {any} keyValue 
 * @returns {Object|null}
 */
function findRowObject(sheetName, keyColumn, keyValue) {
  const rows = getSheetDataAsObjects(sheetName);
  const target = String(keyValue).trim();
  const found = rows.find(r => String(r[keyColumn]).trim() === target);
  return found || null;
}

/**
 * เธเนเธเธซเธฒเนเธ–เธงเธ—เธฑเนเธเธซเธกเธ”เธ•เธฒเธกเธเธดเธฅเน€เธ•เธญเธฃเน
 * @param {string} sheetName 
 * @param {Function} predicateFn 
 * @returns {Array<Object>}
 */
function filterRowObjects(sheetName, predicateFn) {
  const rows = getSheetDataAsObjects(sheetName);
  return rows.filter(predicateFn);
}

/**
 * เธญเธฑเธเน€เธ”เธ•เธเนเธญเธกเธนเธฅเนเธเธเธตเธ•เธ•เธฒเธก Key Column
 * @param {string} sheetName 
 * @param {string} keyColumn 
 * @param {any} keyValue 
 * @param {Object} updateFields 
 * @returns {boolean} เธชเธณเน€เธฃเนเธเธซเธฃเธทเธญเนเธกเน
 */
function updateRowByKeyValue(sheetName, keyColumn, keyValue, updateFields) {
  const sheet = getSheet(sheetName);
  const rows = getSheetDataAsObjects(sheetName);
  const target = String(keyValue).trim();
  const targetRow = rows.find(r => String(r[keyColumn]).trim() === target);

  if (!targetRow) {
    console.warn(`เนเธกเนเธเธเธเนเธญเธกเธนเธฅเธชเธณเธซเธฃเธฑเธเธญเธฑเธเน€เธ”เธ•เนเธเธเธตเธ• ${sheetName} เนเธ”เธขเธ—เธตเน ${keyColumn} = ${keyValue}`);
    return false;
  }

  const rowIndex = targetRow._rowIndex;
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  headers.forEach((header, colIndex) => {
    const key = String(header).trim();
    if (updateFields[key] !== undefined) {
      sheet.getRange(rowIndex, colIndex + 1).setValue(updateFields[key]);
    }
  });

  return true;
}

/**
 * เธชเธฃเนเธฒเธเน€เธฅเธเธ—เธตเนเนเธเธชเธกเธฑเธเธฃเนเธซเธกเนเนเธเธเน€เธฃเธตเธขเธเธฅเธณเธ”เธฑเธเธญเธฑเธ•เนเธเธกเธฑเธ•เธด (เน€เธเนเธ Q70-0001) เธเธฃเนเธญเธกเธฃเธฐเธเธ Lock เธเนเธญเธเธเธฑเธเธเธฒเธฃเธเนเธณ
 * @returns {string} เน€เธฅเธเธ—เธตเนเนเธเธชเธกเธฑเธเธฃเนเธซเธกเน
 */
function generateNextApplicationNo() {
  const lock = LockService.getScriptLock();
  // เธฃเธญ lock เธชเธนเธเธชเธธเธ” 30 เธงเธดเธเธฒเธ—เธต
  lock.waitLock(30000);

  try {
    const sheet = getSheet(SHEETS.APPLICANTS);
    const lastRow = sheet.getLastRow();
    let nextRunning = 1;

    if (lastRow > 1) {
      const appNos = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
      const currentYear = DEFAULT_CONFIG.ACADEMIC_YEAR.slice(-2); // "70"
      const prefix = `Q${currentYear}-`;

      for (let i = appNos.length - 1; i >= 0; i--) {
        const val = String(appNos[i][0]).trim();
        if (val.startsWith(prefix)) {
          const numPart = parseInt(val.replace(prefix, ''), 10);
          if (!isNaN(numPart) && numPart >= nextRunning) {
            nextRunning = numPart + 1;
            break;
          }
        }
      }
    }

    const paddedNo = String(nextRunning).padStart(4, '0');
    const newAppNo = `${DEFAULT_CONFIG.QUOTA_PREFIX}${paddedNo}`;
    return newAppNo;
  } finally {
    lock.releaseLock();
  }
}

/**
 * เธชเธฃเนเธฒเธเธฃเธซเธฑเธชเธเธฑเธเน€เธฃเธตเธขเธเนเธซเธกเนเธญเธฑเธ•เนเธเธกเธฑเธ•เธดเธชเธณเธซเธฃเธฑเธเธเธฒเธฃเธกเธญเธเธ•เธฑเธง (เน€เธเนเธ 70201010001)
 * @returns {string} เธฃเธซเธฑเธชเธเธฑเธเน€เธฃเธตเธขเธเนเธซเธกเน
 */
function generateNextStudentId() {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const sheet = getSheet(SHEETS.ENROLLMENTS);
    const lastRow = sheet.getLastRow();
    let nextRunning = 1;
    const prefix = DEFAULT_CONFIG.STUDENT_ID_PREFIX;

    if (lastRow > 1) {
      const studentIds = sheet.getRange(2, 3, lastRow - 1, 1).getValues(); // เธเธญเธฅเธฑเธกเธเน student_id
      for (let i = studentIds.length - 1; i >= 0; i--) {
        const val = String(studentIds[i][0]).trim();
        if (val.startsWith(prefix)) {
          const numPart = parseInt(val.replace(prefix, ''), 10);
          if (!isNaN(numPart) && numPart >= nextRunning) {
            nextRunning = numPart + 1;
            break;
          }
        }
      }
    }

    const paddedNo = String(nextRunning).padStart(4, '0');
    return `${prefix}${paddedNo}`;
  } finally {
    lock.releaseLock();
  }
}

/**
 * เธ”เธถเธเธฃเธฒเธขเธเธฒเธฃเธชเธฒเธเธฒเธงเธดเธเธฒเธ—เธตเนเน€เธเธดเธ”เธฃเธฑเธเธเธฒเธเธเธตเธ• Config
 * @returns {Array<Object>} เธฃเธฒเธขเธเธฒเธฃเธชเธฒเธเธฒ { level, code, name, limit }
 */
function getActiveMajorsFromConfig() {
  try {
    const configSheet = getSheet(SHEETS.CONFIG);
    const data = configSheet.getDataRange().getValues();
    // เธเนเธเธซเธฒเธชเนเธงเธเธซเธฑเธงเธเธญเธเธ•เธฒเธฃเธฒเธเธชเธฒเธเธฒเธงเธดเธเธฒ (เน€เธฃเธดเนเธกเธเธฒเธเธเธฃเธฃเธ—เธฑเธ”เธ—เธตเนเธกเธต major_code)
    let majorHeaderIndex = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === 'level' && data[i][1] === 'major_code') {
        majorHeaderIndex = i;
        break;
      }
    }

    if (majorHeaderIndex === -1) {
      // เธซเธฒเธเนเธกเนเธกเธตเธ•เธฒเธฃเธฒเธ เนเธซเนเนเธเนเธเนเธฒเน€เธฃเธดเนเธกเธ•เนเธ
      return getDefaultMajors();
    }

    const majors = [];
    for (let i = majorHeaderIndex + 1; i < data.length; i++) {
      const row = data[i];
      if (!row[0] || !row[1]) continue;
      const isActive = row[4] === true || String(row[4]).toUpperCase() === 'TRUE' || row[4] === 1;
      if (isActive) {
        majors.push({
          level: String(row[0]).trim(),
          major_code: String(row[1]).trim(),
          major_name: String(row[2]).trim(),
          quota_limit: Number(row[3]) || 0
        });
      }
    }
    return majors.length > 0 ? majors : getDefaultMajors();
  } catch (err) {
    console.error('เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เนเธเธเธฒเธฃเธญเนเธฒเธเธชเธฒเธเธฒเธงเธดเธเธฒเธเธฒเธเธเธตเธ• Config:', err);
    return getDefaultMajors();
  }
}

/**
 * เธฃเธฒเธขเธเธฒเธฃเธชเธฒเธเธฒเธงเธดเธเธฒเธกเธฒเธ•เธฃเธเธฒเธเน€เธฃเธดเนเธกเธ•เนเธ เธงเธดเธ—เธขเธฒเธฅเธฑเธขเน€เธ—เธเธเธดเธเธ—เนเธฒเธซเธฅเธงเธเธเธดเน€เธกเธเธ•เนเนเธ—เธขเธญเธเธธเธชเธฃเธ“เน
 */
function getDefaultMajors() {
  return [
    { level: 'เธเธงเธ.', major_code: '20101', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเธเนเธฒเธเธขเธเธ•เน', quota_limit: 40 },
    { level: 'เธเธงเธ.', major_code: '20102', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเธเนเธฒเธเธเธฅเนเธฃเธเธเธฒเธ', quota_limit: 40 },
    { level: 'เธเธงเธ.', major_code: '20103', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเธเนเธฒเธเน€เธเธทเนเธญเธกเนเธฅเธซเธฐ', quota_limit: 30 },
    { level: 'เธเธงเธ.', major_code: '20104', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเธเนเธฒเธเนเธเธเนเธฒเธเธณเธฅเธฑเธ', quota_limit: 40 },
    { level: 'เธเธงเธ.', major_code: '20105', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเธเนเธฒเธเธญเธดเน€เธฅเนเธเธ—เธฃเธญเธเธดเธเธชเน', quota_limit: 35 },
    { level: 'เธเธงเธ.', major_code: '20201', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเธเธฒเธฃเธเธฑเธเธเธต', quota_limit: 40 },
    { level: 'เธเธงเธ.', major_code: '20204', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเน€เธ—เธเนเธเนเธฅเธขเธตเธเธธเธฃเธเธดเธเธ”เธดเธเธดเธ—เธฑเธฅ', quota_limit: 40 },

    { level: 'เธเธงเธช. (เธชเธฒเธขเธ•เธฃเธ)', major_code: '30101', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเน€เธ—เธเธเธดเธเน€เธเธฃเธทเนเธญเธเธเธฅ (เน€เธ—เธเธเธดเธเธขเธฒเธเธขเธเธ•เน)', quota_limit: 30 },
    { level: 'เธเธงเธช. (เธชเธฒเธขเธ•เธฃเธ)', major_code: '30102', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเน€เธ—เธเธเธดเธเธเธฒเธฃเธเธฅเธดเธ• (เน€เธเธฃเธทเนเธญเธเธกเธทเธญเธเธฅ)', quota_limit: 30 },
    { level: 'เธเธงเธช. (เธชเธฒเธขเธ•เธฃเธ)', major_code: '30104', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเนเธเธเนเธฒเธเธณเธฅเธฑเธ', quota_limit: 35 },
    { level: 'เธเธงเธช. (เธชเธฒเธขเธ•เธฃเธ)', major_code: '30105', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเธญเธดเน€เธฅเนเธเธ—เธฃเธญเธเธดเธเธชเน', quota_limit: 25 },
    { level: 'เธเธงเธช. (เธชเธฒเธขเธ•เธฃเธ)', major_code: '30201', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเธเธฒเธฃเธเธฑเธเธเธต', quota_limit: 35 },
    { level: 'เธเธงเธช. (เธชเธฒเธขเธ•เธฃเธ)', major_code: '30204', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเน€เธ—เธเนเธเนเธฅเธขเธตเธเธธเธฃเธเธดเธเธ”เธดเธเธดเธ—เธฑเธฅ', quota_limit: 35 },

    { level: 'เธเธงเธช. (เธก.6/เธเธงเธ. เธ•เนเธฒเธเธชเธฒเธเธฒ)', major_code: '30101-B', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเน€เธ—เธเธเธดเธเน€เธเธฃเธทเนเธญเธเธเธฅ (เธก.6/เธ•เนเธฒเธเธชเธฒเธเธฒ)', quota_limit: 20 },
    { level: 'เธเธงเธช. (เธก.6/เธเธงเธ. เธ•เนเธฒเธเธชเธฒเธเธฒ)', major_code: '30104-B', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเนเธเธเนเธฒเธเธณเธฅเธฑเธ (เธก.6/เธ•เนเธฒเธเธชเธฒเธเธฒ)', quota_limit: 25 },
    { level: 'เธเธงเธช. (เธก.6/เธเธงเธ. เธ•เนเธฒเธเธชเธฒเธเธฒ)', major_code: '30201-B', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเธเธฒเธฃเธเธฑเธเธเธต (เธก.6/เธ•เนเธฒเธเธชเธฒเธเธฒ)', quota_limit: 30 },
    { level: 'เธเธงเธช. (เธก.6/เธเธงเธ. เธ•เนเธฒเธเธชเธฒเธเธฒ)', major_code: '30204-B', major_name: 'เธชเธฒเธเธฒเธงเธดเธเธฒเน€เธ—เธเนเธเนเธฅเธขเธตเธเธธเธฃเธเธดเธเธ”เธดเธเธดเธ—เธฑเธฅ (เธก.6/เธ•เนเธฒเธเธชเธฒเธเธฒ)', quota_limit: 30 }
  ];
}
/**
 * เธฃเธฐเธเธเธฃเธฑเธเธชเธกเธฑเธเธฃเน€เธฃเธตเธขเธเธญเธญเธเนเธฅเธเน (เนเธเธงเธ•เธฒ) เธงเธดเธ—เธขเธฒเธฅเธฑเธขเน€เธ—เธเธเธดเธเธ—เนเธฒเธซเธฅเธงเธเธเธดเน€เธกเธเธ•เนเนเธ—เธขเธญเธเธธเธชเธฃเธ“เน
 * เนเธเธฅเน: Security.js
 * เธซเธเนเธฒเธ—เธตเน: เธเธงเธฒเธกเธเธฅเธญเธ”เธ เธฑเธข, PDPA, เธเธฒเธฃเธ•เธฃเธงเธเธชเธญเธ Checksum เธเธฑเธ•เธฃเธเธฃเธฐเธเธฒเธเธ, Rate Limiting, Audit Log
 */

/**
 * เธ•เธฃเธงเธเธชเธญเธเธเธงเธฒเธกเธ–เธนเธเธ•เนเธญเธเธเธญเธเน€เธฅเธเธเธฃเธฐเธเธณเธ•เธฑเธงเธเธฃเธฐเธเธฒเธเธเนเธ—เธข 13 เธซเธฅเธฑเธ (Thai Citizen ID Checksum)
 * @param {string} id เน€เธฅเธเธเธฃเธฐเธเธณเธ•เธฑเธงเธเธฃเธฐเธเธฒเธเธ 13 เธซเธฅเธฑเธ
 * @returns {boolean} เธ–เธนเธเธ•เนเธญเธเธ•เธฒเธกเธญเธฑเธฅเธเธญเธฃเธดเธ—เธถเธกเธซเธฃเธทเธญเนเธกเน
 */
function validateThaiCitizenId(id) {
  if (!id) return false;
  const cleanId = String(id).replace(/[^0-9]/g, '');
  if (cleanId.length !== 13) return false;

  // เธ•เธฃเธงเธเธชเธญเธเธซเธฅเธฑเธเนเธฃเธเธ•เนเธญเธเนเธกเนเน€เธเนเธ 0 เธซเธฃเธทเธญ 9 (เธซเธฅเธฑเธเธ—เธตเน 0 เนเธฅเธฐ 9 เนเธกเนเธญเธญเธเนเธเธเธฑเธ•เธฃเธเธฃเธฐเธเธฒเธเธเธเธเธ•เธด)
  if (cleanId.charAt(0) === '0') return false;

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanId.charAt(i), 10) * (13 - i);
  }

  const checkDigit = (11 - (sum % 11)) % 10;
  return checkDigit === parseInt(cleanId.charAt(12), 10);
}

/**
 * เธเนเธญเธเน€เธฅเธเธเธฑเธ•เธฃเธเธฃเธฐเธเธฒเธเธเธ•เธฒเธกเธกเธฒเธ•เธฃเธเธฒเธ PDPA (เน€เธเนเธ x-xxxx-xxxxx-12-3)
 * @param {string} id เน€เธฅเธเธเธฑเธ•เธฃเธเธฃเธฐเธเธฒเธเธ 13 เธซเธฅเธฑเธ
 * @returns {string} เน€เธฅเธเธ—เธตเนเธ–เธนเธ mask เน€เธฃเธตเธขเธเธฃเนเธญเธขเนเธฅเนเธง
 */
function maskCitizenId(id) {
  if (!id) return '';
  const cleanId = String(id).replace(/[^0-9]/g, '');
  if (cleanId.length !== 13) return id;
  // x-xxxx-xxxxx-12-3
  return `x-xxxx-xxxxx-${cleanId.substring(10, 12)}-${cleanId.substring(12, 13)}`;
}

/**
 * เธเธฑเธเธเนเธเธฑเธเธ—เธณเธเธงเธฒเธกเธชเธฐเธญเธฒเธ”เธเนเธญเธเธงเธฒเธกเน€เธเธทเนเธญเธเนเธญเธเธเธฑเธ XSS / Injection
 * @param {string} input 
 * @returns {string}
 */
function sanitizeInput(input) {
  if (input === null || input === undefined) return '';
  if (typeof input !== 'string') return String(input);
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}

/**
 * เธ•เธฃเธงเธเธชเธญเธ Honeypot Field เน€เธเธทเนเธญเธเนเธญเธเธเธฑเธเธเธญเธ—เธชเนเธเธชเนเธเธก
 * @param {Object} formData 
 * @returns {boolean} เน€เธเนเธเธชเนเธเธกเธซเธฃเธทเธญเนเธกเน (เธ–เนเธฒเน€เธเนเธเธชเนเธเธกเธเธฐเธเธทเธเธเนเธฒ true)
 */
function isSpamSubmission(formData) {
  // เธเธดเธฅเธ”เน honeypot เธ—เธตเนเธเนเธญเธเนเธงเนเนเธเธเธญเธฃเนเธก เธเธนเนเนเธเนเธเธฃเธดเธเธเธฐเนเธกเนเน€เธซเนเธเนเธฅเธฐเนเธกเนเธเธฃเธญเธ
  if (formData.hp_email || formData.website_url_honeypot) {
    console.warn('เธ•เธฃเธงเธเธเธเธเธญเธ—เธเธฃเธญเธเธเธดเธฅเธ”เน Honeypot!');
    return true;
  }
  return false;
}

/**
 * เธฃเธฐเธเธ Rate Limiter เธเนเธญเธเธเธฑเธเธเธฒเธฃเธชเธธเนเธกเธเนเธเธซเธฒเน€เธฅเธเธเธฑเธ•เธฃเธเธฃเธฐเธเธฒเธเธเนเธเธซเธเนเธฒเธ•เธฃเธงเธเธชเธญเธเธชเธ–เธฒเธเธฐ
 * @param {string} keyIdentifier เธเนเธฒเธฃเธฐเธเธธเธ•เธฑเธงเธ•เธ (เน€เธเนเธ citizenId)
 * @param {number} maxAttempts เธเธณเธเธงเธเธเธฃเธฑเนเธเธชเธนเธเธชเธธเธ”เธ—เธตเนเธญเธเธธเธเธฒเธ• (เธเนเธฒเน€เธฃเธดเนเธกเธ•เนเธ 5 เธเธฃเธฑเนเธ)
 * @param {number} lockSeconds เธฃเธฐเธขเธฐเน€เธงเธฅเธฒเธฅเนเธญเธเนเธเธซเธเนเธงเธขเธงเธดเธเธฒเธ—เธต (เธเนเธฒเน€เธฃเธดเนเธกเธ•เนเธ 3600 เธงเธด = 1 เธเธก.)
 * @returns {Object} { allowed: boolean, remainingAttempts: number, message: string }
 */
function checkRateLimit(keyIdentifier, maxAttempts = 5, lockSeconds = 3600) {
  const cache = CacheService.getScriptCache();
  const cacheKey = `rate_limit_${keyIdentifier}`;
  const currentCount = parseInt(cache.get(cacheKey) || '0', 10);

  if (currentCount >= maxAttempts) {
    return {
      allowed: false,
      remainingAttempts: 0,
      message: 'เธเธธเธ“เธฃเธฐเธเธธเธเนเธญเธกเธนเธฅเนเธกเนเธ–เธนเธเธ•เนเธญเธเน€เธเธดเธเธเธณเธเธงเธเธเธฃเธฑเนเธเธ—เธตเนเธเธณเธซเธเธ” เธเธฃเธธเธ“เธฒเธฃเธญ 1 เธเธฑเนเธงเนเธกเธเธเนเธญเธเธฅเธญเธเนเธซเธกเนเธญเธตเธเธเธฃเธฑเนเธเน€เธเธทเนเธญเธเธงเธฒเธกเธเธฅเธญเธ”เธ เธฑเธข'
    };
  }

  return {
    allowed: true,
    remainingAttempts: maxAttempts - currentCount,
    message: ''
  };
}

/**
 * เธเธฑเธเธ—เธถเธเธเธฒเธฃเธเนเธเธซเธฒเธ—เธตเนเธเธดเธ”เธเธฅเธฒเธ”เน€เธเธทเนเธญเน€เธเธดเนเธกเธ•เธฑเธงเธเธฑเธ Rate Limit
 * @param {string} keyIdentifier 
 * @param {number} lockSeconds 
 */
function recordFailedAttempt(keyIdentifier, lockSeconds = 3600) {
  const cache = CacheService.getScriptCache();
  const cacheKey = `rate_limit_${keyIdentifier}`;
  const currentCount = parseInt(cache.get(cacheKey) || '0', 10);
  const newCount = currentCount + 1;
  cache.put(cacheKey, String(newCount), lockSeconds);
}

/**
 * เธฃเธตเน€เธเนเธ•เธ•เธฑเธงเธเธฑเธ Rate Limit เน€เธกเธทเนเธญเธเธนเนเนเธเนเธเธฃเธญเธเธเนเธญเธกเธนเธฅเธ–เธนเธเธ•เนเธญเธเธชเธณเน€เธฃเนเธ
 * @param {string} keyIdentifier 
 */
function resetRateLimit(keyIdentifier) {
  const cache = CacheService.getScriptCache();
  cache.remove(`rate_limit_${keyIdentifier}`);
}

/**
 * เธเธฑเธเธ—เธถเธ Audit Log เธฅเธเนเธเธเธตเธ• AuditLog เธ•เธฒเธก เธ.เธฃ.เธ. เธเธธเนเธกเธเธฃเธญเธเธเนเธญเธกเธนเธฅเธชเนเธงเธเธเธธเธเธเธฅ (PDPA)
 * @param {string} action เธเธฒเธฃเธเธฃเธฐเธ—เธณ เน€เธเนเธ VIEW_APPLICANT, CHANGE_STATUS, EXPORT_CSV
 * @param {string} targetId เธฃเธซเธฑเธชเน€เธเนเธฒเธซเธกเธฒเธข เน€เธเนเธ เน€เธฅเธเธ—เธตเนเนเธเธชเธกเธฑเธเธฃ
 * @param {string} details เธฃเธฒเธขเธฅเธฐเน€เธญเธตเธขเธ”เน€เธเธดเนเธกเน€เธ•เธดเธก
 * @param {string} userEmail เธญเธตเน€เธกเธฅเธเธนเนเนเธเนเธเธฒเธ เธซเธฃเธทเธญ APPLICANT
 */
function logAudit(action, targetId, details, userEmail = '') {
  try {
    let email = userEmail;
    if (!email) {
      try {
        email = Session.getActiveUser().getEmail();
      } catch (e) {
        email = 'GUEST_OR_SYSTEM';
      }
    }

    const auditData = {
      audit_id: 'AUD-' + Utilities.getUuid().substring(0, 8),
      user_identity: email || 'GUEST',
      action: action,
      target_id: targetId || '-',
      details: typeof details === 'object' ? JSON.stringify(details) : String(details),
      timestamp: Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyyy-MM-dd HH:mm:ss')
    };

    appendRowObject(SHEETS.AUDIT_LOG, auditData);
  } catch (err) {
    console.error('เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เนเธเธเธฒเธฃเธเธฑเธเธ—เธถเธ Audit Log:', err);
  }
}

/**
 * เธ•เธฃเธงเธเธชเธญเธเธชเธดเธ—เธเธดเนเน€เธเนเธฒเธซเธเนเธฒเธ—เธตเนเธเธฒเธเธญเธตเน€เธกเธฅ
 * @param {string} email 
 * @returns {Object} { authorized: boolean, role: string, name: string }
 */
function verifyAdminEmail(email) {
  if (!email) return { authorized: false, role: '', name: '' };
  const cleanEmail = String(email).trim().toLowerCase();

  const admins = getSheetDataAsObjects(SHEETS.ADMINS);
  const admin = admins.find(a => 
    String(a.email).trim().toLowerCase() === cleanEmail && 
    (a.is_active === true || String(a.is_active).toUpperCase() === 'TRUE' || a.is_active === 1)
  );

  if (admin) {
    return {
      authorized: true,
      role: String(admin.role).toUpperCase(),
      name: admin.full_name || cleanEmail
    };
  }

  return { authorized: false, role: '', name: '' };
}
/**
 * เธฃเธฐเธเธเธฃเธฑเธเธชเธกเธฑเธเธฃเน€เธฃเธตเธขเธเธญเธญเธเนเธฅเธเน (เนเธเธงเธ•เธฒ) เธงเธดเธ—เธขเธฒเธฅเธฑเธขเน€เธ—เธเธเธดเธเธ—เนเธฒเธซเธฅเธงเธเธเธดเน€เธกเธเธ•เนเนเธ—เธขเธญเธเธธเธชเธฃเธ“เน
 * เนเธเธฅเน: DocumentService.js
 * เธซเธเนเธฒเธ—เธตเน: เธเธฑเธ”เธเธฒเธฃเนเธเธฅเนเนเธเธเนเธ Google Drive (Private), เธชเธฃเนเธฒเธ PDF เธเธฒเธ Google Docs Template
 */

/**
 * เธ”เธถเธเนเธเธฅเน€เธ”เธญเธฃเน Google Drive เธชเธณเธซเธฃเธฑเธเน€เธเนเธเน€เธญเธเธชเธฒเธฃ (เธซเธฒเธเนเธกเนเธกเธตเธเธฐเธชเธฃเนเธฒเธเนเธซเนเธญเธฑเธ•เนเธเธกเธฑเธ•เธด)
 * @returns {GoogleAppsScript.Drive.Folder}
 */
function getOrCreateUploadFolder() {
  const folderId = getDriveFolderId();
  if (folderId) {
    try {
      return DriveApp.getFolderById(folderId);
    } catch (e) {
      console.warn('เนเธกเนเธเธเนเธเธฅเน€เธ”เธญเธฃเนเธเธฒเธ DRIVE_FOLDER_ID เธฃเธฐเธเธเธเธฐเธเนเธเธซเธฒเธซเธฃเธทเธญเธชเธฃเนเธฒเธเนเธเธฅเน€เธ”เธญเธฃเนเนเธซเธกเน');
    }
  }

  const folderName = `เน€เธญเธเธชเธฒเธฃเธฃเธฑเธเธชเธกเธฑเธเธฃเนเธเธงเธ•เธฒ_${DEFAULT_CONFIG.ACADEMIC_YEAR}_เธงเธดเธ—เธขเธฒเธฅเธฑเธขเน€เธ—เธเธเธดเธเธ—เนเธฒเธซเธฅเธงเธ`;
  const folders = DriveApp.getFoldersByName(folderName);
  let targetFolder;

  if (folders.hasNext()) {
    targetFolder = folders.next();
  } else {
    targetFolder = DriveApp.createFolder(folderName);
    // เธ•เธฑเนเธเธเนเธฒเนเธเธฅเน€เธ”เธญเธฃเนเน€เธเนเธเธชเนเธงเธเธ•เธฑเธง เนเธกเนเนเธเธฃเนเธชเธฒเธเธฒเธฃเธ“เธฐ (PDPA)
    targetFolder.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);
  }

  setProp('DRIVE_FOLDER_ID', targetFolder.getId());
  return targetFolder;
}

/**
 * เธเธฑเธเธ—เธถเธเนเธเธฅเน Base64 เธ—เธตเนเธเธนเนเธชเธกเธฑเธเธฃเธญเธฑเธเนเธซเธฅเธ”เธฅเธเนเธเนเธเธฅเน€เธ”เธญเธฃเน Google Drive
 * @param {string} applicationNo เน€เธฅเธเธ—เธตเนเนเธเธชเธกเธฑเธเธฃ เน€เธเนเธ Q70-0001
 * @param {string} docType เธเธเธดเธ”เน€เธญเธเธชเธฒเธฃ เน€เธเนเธ photo_1inch, transcript_5term
 * @param {string} originalFileName เธเธทเนเธญเนเธเธฅเนเธ•เนเธเธเธเธฑเธ
 * @param {string} mimeType MIME Type เน€เธเนเธ image/jpeg, application/pdf
 * @param {string} base64Data เธเนเธญเธกเธนเธฅเนเธเธฅเน Base64 (เธ•เธฑเธ” prefix data:image/...;base64, เธญเธญเธเนเธฅเนเธง)
 * @returns {Object} { fileId: string, fileName: string, fileSize: number, mimeType: string }
 */
function saveUploadedFile(applicationNo, docType, originalFileName, mimeType, base64Data) {
  // เธ•เธฃเธงเธเธชเธญเธ MIME Type
  if (!DEFAULT_CONFIG.ALLOWED_MIME_TYPES.includes(mimeType)) {
    throw new Error(`เนเธกเนเธญเธเธธเธเธฒเธ•เนเธซเนเธญเธฑเธเนเธซเธฅเธ”เนเธเธฅเนเธเธฃเธฐเน€เธ เธ— ${mimeType} (เธญเธเธธเธเธฒเธ•เน€เธเธเธฒเธฐ JPG, PNG, PDF)`);
  }

  // เนเธเธฅเธ base64 เน€เธเนเธ Blob
  const decodedBytes = Utilities.base64Decode(base64Data);
  const fileSizeInBytes = decodedBytes.length;
  const maxBytes = DEFAULT_CONFIG.MAX_FILE_SIZE_MB * 1024 * 1024;

  if (fileSizeInBytes > maxBytes) {
    throw new Error(`เธเธเธฒเธ”เนเธเธฅเนเน€เธเธดเธเธเธณเธซเธเธ” (${(fileSizeInBytes / (1024 * 1024)).toFixed(2)} MB เน€เธเธดเธเธเธงเนเธฒ ${DEFAULT_CONFIG.MAX_FILE_SIZE_MB} MB)`);
  }

  // เธเธฒเธกเธชเธเธธเธฅเนเธเธฅเน
  let ext = 'bin';
  if (mimeType.includes('jpeg') || mimeType.includes('jpg')) ext = 'jpg';
  else if (mimeType.includes('png')) ext = 'png';
  else if (mimeType.includes('pdf')) ext = 'pdf';

  const cleanFileName = `${applicationNo}_${docType}_${new Date().getTime()}.${ext}`;
  const blob = Utilities.newBlob(decodedBytes, mimeType, cleanFileName);

  const folder = getOrCreateUploadFolder();
  const driveFile = folder.createFile(blob);

  // เธ•เธฑเนเธเธเธณเธญเธเธดเธเธฒเธขเนเธเธฅเน
  driveFile.setDescription(`เน€เธญเธเธชเธฒเธฃเธเธฃเธฐเธเธญเธเธเธฒเธฃเธชเธกเธฑเธเธฃเนเธเธงเธ•เธฒ เธเธตเธเธฒเธฃเธจเธถเธเธฉเธฒ ${DEFAULT_CONFIG.ACADEMIC_YEAR} เน€เธฅเธเธ—เธตเน ${applicationNo} เธเธเธดเธ”: ${docType}`);

  return {
    fileId: driveFile.getId(),
    fileName: cleanFileName,
    fileSize: fileSizeInBytes,
    mimeType: mimeType
  };
}

/**
 * เธ”เธถเธเธเนเธญเธกเธนเธฅเนเธเธฅเนเน€เธเธทเนเธญเนเธชเธ”เธเธเธฅ (File Proxy) เธชเธณเธซเธฃเธฑเธเน€เธเธดเธ”เธ”เธนเนเธเธฅเนเนเธเธฃเธฐเธเธเนเธ”เธขเนเธกเนเธ•เนเธญเธเน€เธเธดเธ”เนเธเธฃเนเธชเธฒเธเธฒเธฃเธ“เธฐ
 * @param {string} fileId 
 * @returns {Object} { base64: string, mimeType: string, name: string }
 */
function getFileAsBase64(fileId) {
  try {
    const file = DriveApp.getFileById(fileId);
    const blob = file.getBlob();
    const bytes = blob.getBytes();
    const base64 = Utilities.base64Encode(bytes);
    return {
      success: true,
      fileName: file.getName(),
      mimeType: blob.getContentType(),
      base64: base64
    };
  } catch (err) {
    console.error('เนเธกเนเธชเธฒเธกเธฒเธฃเธ–เน€เธเธดเธ”เนเธเธฅเนเธเธฒเธ Drive:', err);
    return { success: false, error: 'เนเธกเนเธเธเนเธเธฅเนเธซเธฃเธทเธญเนเธกเนเธกเธตเธชเธดเธ—เธเธดเนเน€เธเนเธฒเธ–เธถเธ' };
  }
}

/**
 * เธชเธฃเนเธฒเธเนเธเธชเธกเธฑเธเธฃ PDF เธเธฒเธ Google Docs Template
 * @param {Object} applicant เธเนเธญเธกเธนเธฅเธเธนเนเธชเธกเธฑเธเธฃ
 * @param {string} photoFileId ID เนเธเธฅเนเธฃเธนเธเธ–เนเธฒเธข 1 เธเธดเนเธงเธเธญเธเธเธนเนเธชเธกเธฑเธเธฃ
 * @returns {string} Drive File ID เธเธญเธเนเธเธฅเน PDF เธ—เธตเนเธชเธฃเนเธฒเธเธชเธณเน€เธฃเนเธ
 */
function generateApplicationPdf(applicant, photoFileId) {
  const templateId = getAppTemplateDocId();
  if (!templateId) {
    console.warn('เธขเธฑเธเนเธกเนเนเธ”เนเธฃเธฐเธเธธ APP_TEMPLATE_DOC_ID เธฃเธฐเธเธเธเธฐเธชเธฃเนเธฒเธ PDF เนเธเธเธกเธฒเธ•เธฃเธเธฒเธเนเธซเนเธญเธฑเธ•เนเธเธกเธฑเธ•เธด');
  }

  const folder = getOrCreateUploadFolder();
  let tempDoc;

  if (templateId) {
    // เธ—เธณเธชเธณเน€เธเธฒเธเธฒเธ Template
    const templateFile = DriveApp.getFileById(templateId);
    const copyFile = templateFile.makeCopy(`temp_app_${applicant.application_no}`, folder);
    tempDoc = DocumentApp.openById(copyFile.getId());
  } else {
    // เธชเธฃเนเธฒเธ Document เธชเธณเธฃเธญเธเธเธฃเธ“เธตเนเธกเนเธกเธต Template ID
    tempDoc = createDefaultApplicationDoc(applicant, folder);
  }

  const docId = tempDoc.getId();
  const body = tempDoc.getBody();

  // เนเธ—เธเธ—เธตเนเธเนเธฒเธ•เธฑเธงเนเธเธฃเนเธ Template (Placeholders)
  const replaceMap = {
    '{{APP_NO}}': applicant.application_no || '',
    '{{APPLY_DATE}}': formatThaiDate(applicant.apply_date || new Date()),
    '{{YEAR}}': DEFAULT_CONFIG.ACADEMIC_YEAR,
    '{{COLLEGE_NAME}}': DEFAULT_CONFIG.COLLEGE_NAME,
    '{{LEVEL}}': applicant.education_level || '',
    '{{FULL_NAME}}': `${applicant.title || ''}${applicant.first_name || ''} ${applicant.last_name || ''}`,
    '{{CITIZEN_ID}}': applicant.citizen_id || '',
    '{{BIRTH_DATE}}': formatThaiDate(applicant.birth_date),
    '{{FATHER_NAME}}': applicant.father_name || '-',
    '{{FATHER_AGE}}': applicant.father_age ? String(applicant.father_age) : '-',
    '{{FATHER_OCCUPATION}}': applicant.father_occupation || '-',
    '{{MOTHER_NAME}}': applicant.mother_name || '-',
    '{{MOTHER_AGE}}': applicant.mother_age ? String(applicant.mother_age) : '-',
    '{{MOTHER_OCCUPATION}}': applicant.mother_occupation || '-',
    '{{FULL_ADDRESS}}': formatFullAddress(applicant),
    '{{PHONE}}': applicant.phone || '-',
    '{{CURRENT_SCHOOL}}': `${applicant.current_school_name || '-'} (${applicant.current_school_level || '-'})`,
    '{{SCHOOL_ADDRESS}}': `${applicant.school_address_no || ''} เธ•.${applicant.school_subdistrict || ''} เธญ.${applicant.school_district || ''} เธ.${applicant.school_province || ''}`,
    '{{GPAX}}': applicant.gpax ? Number(applicant.gpax).toFixed(2) : '0.00',
    '{{PREV_MAJOR}}': applicant.prev_major || '-',
    '{{MAJOR_1}}': applicant.quota_major_1 || '-',
    '{{MAJOR_2}}': applicant.quota_major_2 || '-',
    '{{REFERRAL_SOURCE}}': applicant.referral_source || '-',
    '{{SIGNATURE}}': applicant.applicant_signature_text || `${applicant.first_name} ${applicant.last_name}`
  };

  for (const [key, val] of Object.entries(replaceMap)) {
    body.replaceText(key, val);
  }

  // เนเธ—เธฃเธเธฃเธนเธเธ–เนเธฒเธขเธเธนเนเธชเธกเธฑเธเธฃเนเธ—เธเธ—เธตเน {{PHOTO}} เธซเธฒเธเธกเธตเธฃเธนเธเธ–เนเธฒเธข
  if (photoFileId) {
    try {
      const photoFile = DriveApp.getFileById(photoFileId);
      const photoBlob = photoFile.getBlob();
      const photoFound = body.findText('{{PHOTO}}');
      if (photoFound) {
        const elem = photoFound.getElement();
        const parent = elem.getParent();
        elem.asText().setText('');
        // เธเธเธฒเธ”เธฃเธนเธเธ–เนเธฒเธข 1 เธเธดเนเธง (เธเธงเนเธฒเธ 100 pt, เธชเธนเธ 130 pt เนเธ”เธขเธเธฃเธฐเธกเธฒเธ“)
        const image = parent.asParagraph().appendInlineImage(photoBlob);
        image.setWidth(100);
        image.setHeight(130);
      }
    } catch (err) {
      console.warn('เนเธกเนเธชเธฒเธกเธฒเธฃเธ–เนเธ—เธฃเธเธฃเธนเธเธ–เนเธฒเธขเธฅเธเนเธ PDF เนเธ”เน:', err);
      body.replaceText('{{PHOTO}}', '[เธฃเธนเธเธ–เนเธฒเธข 1 เธเธดเนเธง]');
    }
  } else {
    body.replaceText('{{PHOTO}}', '[เธฃเธนเธเธ–เนเธฒเธข 1 เธเธดเนเธง]');
  }

  tempDoc.saveAndClose();

  // เนเธเธฅเธ Document เน€เธเนเธ PDF
  const pdfBlob = DriveApp.getFileById(docId).getAs('application/pdf');
  pdfBlob.setName(`เนเธเธชเธกเธฑเธเธฃ_${applicant.application_no}_${applicant.first_name}.pdf`);
  const pdfFile = folder.createFile(pdfBlob);

  // เธฅเธเนเธเธฅเน Document เธเธฑเนเธงเธเธฃเธฒเธง
  DriveApp.getFileById(docId).setTrashed(true);

  return pdfFile.getId();
}

/**
 * เธชเธฃเนเธฒเธเนเธเธกเธญเธเธ•เธฑเธง PDF เธเธฒเธ Google Docs Template
 * @param {Object} enroll เธเนเธญเธกเธนเธฅเธเธฒเธฃเธกเธญเธเธ•เธฑเธง
 * @param {Object} applicant เธเนเธญเธกเธนเธฅเธเธนเนเธชเธกเธฑเธเธฃ
 * @returns {string} Drive File ID เธเธญเธเนเธเธฅเน PDF เนเธเธกเธญเธเธ•เธฑเธง
 */
function generateEnrollmentPdf(enroll, applicant) {
  const templateId = getEnrollTemplateDocId();
  const folder = getOrCreateUploadFolder();
  let tempDoc;

  if (templateId) {
    const templateFile = DriveApp.getFileById(templateId);
    const copyFile = templateFile.makeCopy(`temp_enroll_${enroll.student_id}`, folder);
    tempDoc = DocumentApp.openById(copyFile.getId());
  } else {
    tempDoc = createDefaultEnrollmentDoc(enroll, applicant, folder);
  }

  const docId = tempDoc.getId();
  const body = tempDoc.getBody();

  const replaceMap = {
    '{{ENROLL_NO}}': enroll.enrollment_no || '',
    '{{STUDENT_ID}}': enroll.student_id || '',
    '{{APP_NO}}': applicant.application_no || '',
    '{{YEAR}}': DEFAULT_CONFIG.ACADEMIC_YEAR,
    '{{COLLEGE_NAME}}': DEFAULT_CONFIG.COLLEGE_NAME,
    '{{STUDENT_NAME}}': `${applicant.title || ''}${applicant.first_name || ''} ${applicant.last_name || ''}`,
    '{{CITIZEN_ID}}': applicant.citizen_id || '',
    '{{ASSIGNED_MAJOR}}': enroll.assigned_major || applicant.quota_major_1 || '',
    '{{LEVEL}}': applicant.education_level || '',
    '{{GUARDIAN_NAME}}': enroll.guardian_name || '-',
    '{{GUARDIAN_RELATION}}': enroll.guardian_relation || '-',
    '{{GUARDIAN_PHONE}}': enroll.guardian_phone || '-',
    '{{GUARDIAN_OCCUPATION}}': enroll.guardian_occupation || '-',
    '{{WITNESS_1}}': enroll.witness_1_name || '-',
    '{{WITNESS_2}}': enroll.witness_2_name || '-',
    '{{ENROLL_DATE}}': formatThaiDate(enroll.enroll_date || new Date()),
    '{{OFFICER_EMAIL}}': enroll.officer_email || '-'
  };

  for (const [key, val] of Object.entries(replaceMap)) {
    body.replaceText(key, val);
  }

  tempDoc.saveAndClose();

  const pdfBlob = DriveApp.getFileById(docId).getAs('application/pdf');
  pdfBlob.setName(`เนเธเธกเธญเธเธ•เธฑเธง_${enroll.student_id}_${applicant.first_name}.pdf`);
  const pdfFile = folder.createFile(pdfBlob);

  DriveApp.getFileById(docId).setTrashed(true);
  return pdfFile.getId();
}

/**
 * เธชเธฃเนเธฒเธ Google Docs เนเธเธชเธกเธฑเธเธฃเนเธกเนเนเธเธเธญเธฑเธ•เนเธเธกเธฑเธ•เธด (A4 1 เธซเธเนเธฒ เธเธฑเธ”เธซเธเนเธฒเธกเธฒเธ•เธฃเธเธฒเธ TH Sarabun New)
 */
function createDefaultApplicationDoc(applicant, folder) {
  const doc = DocumentApp.create(`เนเธเธชเธกเธฑเธเธฃเนเธเธงเธ•เธฒ_${applicant.application_no}`);
  const body = doc.getBody();

  // เธ•เธฑเนเธเธฃเธฐเธขเธฐเธเธญเธเธเธฃเธฐเธ”เธฒเธฉ 0.5 เธเธดเนเธง (36 pt) เน€เธเธทเนเธญเนเธซเนเธเธญเธ”เธต 1 เธซเธเนเธฒ A4
  body.setMarginTop(36);
  body.setMarginBottom(36);
  body.setMarginLeft(36);
  body.setMarginRight(36);

  // เธซเธฑเธงเธเธฃเธฐเธ”เธฒเธฉ
  const title1 = body.appendParagraph(DEFAULT_CONFIG.COLLEGE_NAME);
  title1.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  title1.setAlignment(DocumentApp.TextAlignment.CENTER);

  const title2 = body.appendParagraph(`เนเธเธชเธกเธฑเธเธฃเน€เธเนเธฒเธฃเธฑเธเธเธฒเธฃเธเธฑเธ”เน€เธฅเธทเธญเธเน€เธเธทเนเธญเธจเธถเธเธฉเธฒเธ•เนเธญเน€เธเนเธเธเธฃเธ“เธตเธเธดเน€เธจเธฉ (เนเธเธงเธ•เธฒ) เธเธฃเธฐเธเธณเธเธตเธเธฒเธฃเธจเธถเธเธฉเธฒ {{YEAR}}`);
  title2.setHeading(DocumentApp.ParagraphHeading.HEADING2);
  title2.setAlignment(DocumentApp.TextAlignment.CENTER);

  // เธ•เธฒเธฃเธฒเธเธเนเธญเธกเธนเธฅเนเธฅเธฐเธเนเธญเธเธฃเธนเธเธ เธฒเธ
  const headerTable = body.appendTable([
    [`เน€เธฅเธเธ—เธตเนเนเธเธชเธกเธฑเธเธฃ: {{APP_NO}}\nเธฃเธฐเธ”เธฑเธเธ—เธตเนเธชเธกเธฑเธเธฃ: {{LEVEL}}\nเธงเธฑเธเธ—เธตเนเธชเธกเธฑเธเธฃ: {{APPLY_DATE}}`, `{{PHOTO}}`]
  ]);
  headerTable.setBorderWidth(0);

  // เธเนเธญเธกเธนเธฅเธเนเธญ 1-6
  body.appendParagraph('เธเนเธญ 1 เธเนเธญเธกเธนเธฅเธเธนเนเธชเธกเธฑเธเธฃ: เธเธทเนเธญ-เธชเธเธธเธฅ: {{FULL_NAME}}  เน€เธฅเธเธเธฑเธ•เธฃเธเธฃเธฐเธเธฒเธเธ: {{CITIZEN_ID}}  เธงเธฑเธเน€เธเธดเธ”: {{BIRTH_DATE}}');
  body.appendParagraph('เธเนเธญ 2 เธเนเธญเธกเธนเธฅเธเธดเธ”เธฒ: {{FATHER_NAME}}  เธญเธฒเธขเธธ: {{FATHER_AGE}} เธเธต  เธญเธฒเธเธตเธ: {{FATHER_OCCUPATION}}');
  body.appendParagraph('เธเนเธญ 3 เธเนเธญเธกเธนเธฅเธกเธฒเธฃเธ”เธฒ: {{MOTHER_NAME}}  เธญเธฒเธขเธธ: {{MOTHER_AGE}} เธเธต  เธญเธฒเธเธตเธ: {{MOTHER_OCCUPATION}}');
  body.appendParagraph('เธเนเธญ 4 เธ—เธตเนเธญเธขเธนเนเธเธฑเธเธเธธเธเธฑเธ: {{FULL_ADDRESS}}  เนเธ—เธฃเธจเธฑเธเธ—เน: {{PHONE}}');
  body.appendParagraph('เธเนเธญ 5 เธชเธ–เธฒเธเธจเธถเธเธฉเธฒเน€เธ”เธดเธก: {{CURRENT_SCHOOL}}  เธ—เธตเนเธ•เธฑเนเธ: {{SCHOOL_ADDRESS}}  เน€เธเธฃเธ”เน€เธเธฅเธตเนเธข (GPAX): {{GPAX}}  เธชเธฒเธเธฒเน€เธ”เธดเธก: {{PREV_MAJOR}}');
  body.appendParagraph('เธเนเธญ 6 เธชเธฒเธเธฒเธงเธดเธเธฒเธ—เธตเนเน€เธฅเธทเธญเธเธชเธกเธฑเธเธฃ: เธฅเธณเธ”เธฑเธเธ—เธตเน 1: {{MAJOR_1}}  |  เธฅเธณเธ”เธฑเธเธ—เธตเน 2: {{MAJOR_2}}');
  body.appendParagraph('เธเนเธญเธเธ—เธฒเธเธ—เธตเนเธฃเธนเนเธเธฑเธเธงเธดเธ—เธขเธฒเธฅเธฑเธข: {{REFERRAL_SOURCE}}');

  body.appendParagraph('\nเธเนเธฒเธเน€เธเนเธฒเธเธญเธฃเธฑเธเธฃเธญเธเธงเนเธฒเธเนเธญเธกเธนเธฅเนเธฅเธฐเน€เธญเธเธชเธฒเธฃเธซเธฅเธฑเธเธเธฒเธเธ—เธฑเนเธเธซเธกเธ”เน€เธเนเธเธเธงเธฒเธกเธเธฃเธดเธเธ—เธธเธเธเธฃเธฐเธเธฒเธฃ เธซเธฒเธเธ•เธฃเธงเธเธเธเธงเนเธฒเนเธกเนเธ•เธฃเธเธ•เธฒเธกเน€เธเธ“เธ‘เน เธเนเธฒเธเน€เธเนเธฒเธขเธดเธเธขเธญเธกเนเธซเนเธ•เธฑเธ”เธชเธดเธ—เธเธดเนเธเธฒเธฃเน€เธเนเธฒเธจเธถเธเธฉเธฒเธ—เธฑเธเธ—เธต');
  
  const signPara = body.appendParagraph('\nเธฅเธเธเธทเนเธญ..........................................................เธเธนเนเธชเธกเธฑเธเธฃ\n( {{SIGNATURE}} )\nเธงเธฑเธเธ—เธตเน {{APPLY_DATE}}');
  signPara.setAlignment(DocumentApp.TextAlignment.RIGHT);

  // เธขเนเธฒเธขเน€เธเนเธฒเนเธเธฅเน€เธ”เธญเธฃเนเน€เธเนเธฒเธซเธกเธฒเธข
  const file = DriveApp.getFileById(doc.getId());
  folder.addFile(file);
  DriveApp.getRootFolder().removeFile(file);

  return doc;
}

/**
 * เธชเธฃเนเธฒเธ Google Docs เนเธเธกเธญเธเธ•เธฑเธงเนเธกเนเนเธเธเธญเธฑเธ•เนเธเธกเธฑเธ•เธด
 */
function createDefaultEnrollmentDoc(enroll, applicant, folder) {
  const doc = DocumentApp.create(`เนเธเธกเธญเธเธ•เธฑเธง_${enroll.student_id}`);
  const body = doc.getBody();

  body.setMarginTop(36);
  body.setMarginBottom(36);
  body.setMarginLeft(36);
  body.setMarginRight(36);

  const title1 = body.appendParagraph(DEFAULT_CONFIG.COLLEGE_NAME);
  title1.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  title1.setAlignment(DocumentApp.TextAlignment.CENTER);

  const title2 = body.appendParagraph(`เนเธเธกเธญเธเธ•เธฑเธงเนเธฅเธฐเธชเธฑเธเธเธฒเธกเธญเธเธ•เธฑเธงเน€เธเนเธเธเธฑเธเน€เธฃเธตเธขเธ-เธเธฑเธเธจเธถเธเธฉเธฒ เธเธฃเธฐเธเธณเธเธตเธเธฒเธฃเธจเธถเธเธฉเธฒ {{YEAR}}`);
  title2.setHeading(DocumentApp.ParagraphHeading.HEADING2);
  title2.setAlignment(DocumentApp.TextAlignment.CENTER);

  body.appendParagraph(`เน€เธฅเธเธ—เธตเนเธกเธญเธเธ•เธฑเธง: {{ENROLL_NO}}    เธฃเธซเธฑเธชเธเธฑเธเน€เธฃเธตเธขเธ: {{STUDENT_ID}}    เธงเธฑเธเธ—เธตเนเธกเธญเธเธ•เธฑเธง: {{ENROLL_DATE}}`);
  body.appendParagraph(`เธเธทเนเธญเธเธนเนเธกเธญเธเธ•เธฑเธง (เธเธฑเธเน€เธฃเธตเธขเธ-เธเธฑเธเธจเธถเธเธฉเธฒ): {{STUDENT_NAME}}    เน€เธฅเธเธเธฑเธ•เธฃเธเธฃเธฐเธเธฒเธเธ: {{CITIZEN_ID}}`);
  body.appendParagraph(`เน€เธเนเธฒเธจเธถเธเธฉเธฒเนเธเธฃเธฐเธ”เธฑเธ: {{LEVEL}}    เธชเธฒเธเธฒเธงเธดเธเธฒ: {{ASSIGNED_MAJOR}}`);
  body.appendParagraph(`เธเธทเนเธญเธเธนเนเธเธเธเธฃเธญเธ: {{GUARDIAN_NAME}}    เธเธงเธฒเธกเน€เธเธตเนเธขเธงเธเนเธญเธ: {{GUARDIAN_RELATION}}`);
  body.appendParagraph(`เธญเธฒเธเธตเธเธเธนเนเธเธเธเธฃเธญเธ: {{GUARDIAN_OCCUPATION}}    เน€เธเธญเธฃเนเนเธ—เธฃเธจเธฑเธเธ—เน: {{GUARDIAN_PHONE}}`);
  body.appendParagraph(`เธเธขเธฒเธเธเธเธ—เธตเน 1: {{WITNESS_1}}    เธเธขเธฒเธเธเธเธ—เธตเน 2: {{WITNESS_2}}`);
  body.appendParagraph(`เน€เธเนเธฒเธซเธเนเธฒเธ—เธตเนเธเธนเนเธฃเธฑเธเธกเธญเธเธ•เธฑเธง: {{OFFICER_EMAIL}}`);

  const signPara = body.appendParagraph('\n\nเธฅเธเธเธทเนเธญ..........................................................เธเธนเนเธเธเธเธฃเธญเธ\nเธฅเธเธเธทเนเธญ..........................................................เธเธฑเธเน€เธฃเธตเธขเธ/เธเธฑเธเธจเธถเธเธฉเธฒ\nเธฅเธเธเธทเนเธญ..........................................................เน€เธเนเธฒเธซเธเนเธฒเธ—เธตเนเธฃเธฑเธเธกเธญเธเธ•เธฑเธง');
  signPara.setAlignment(DocumentApp.TextAlignment.CENTER);

  const file = DriveApp.getFileById(doc.getId());
  folder.addFile(file);
  DriveApp.getRootFolder().removeFile(file);

  return doc;
}

/**
 * เธเธฑเธ”เธฃเธนเธเนเธเธเธงเธฑเธเธ—เธตเนเน€เธเนเธเธ เธฒเธฉเธฒเนเธ—เธข เธ.เธจ. (เน€เธเนเธ 15 เธกเธเธฃเธฒเธเธก 2570)
 */
function formatThaiDate(dateStr) {
  if (!dateStr) return '-';
  const thaiMonths = [
    'เธกเธเธฃเธฒเธเธก', 'เธเธธเธกเธ เธฒเธเธฑเธเธเน', 'เธกเธตเธเธฒเธเธก', 'เน€เธกเธฉเธฒเธขเธ', 'เธเธคเธฉเธ เธฒเธเธก', 'เธกเธดเธ–เธธเธเธฒเธขเธ',
    'เธเธฃเธเธเธฒเธเธก', 'เธชเธดเธเธซเธฒเธเธก', 'เธเธฑเธเธขเธฒเธขเธ', 'เธ•เธธเธฅเธฒเธเธก', 'เธเธคเธจเธเธดเธเธฒเธขเธ', 'เธเธฑเธเธงเธฒเธเธก'
  ];

  let d;
  if (typeof dateStr === 'string' && dateStr.includes('-')) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      let year = parseInt(parts[0], 10);
      if (year < 2400) year += 543; // เนเธเธฅเธ เธ.เธจ. เน€เธเนเธ เธ.เธจ.
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      return `${day} ${thaiMonths[month]} ${year}`;
    }
  }

  d = new Date(dateStr);
  if (isNaN(d.getTime())) return String(dateStr);

  const day = d.getDate();
  const month = thaiMonths[d.getMonth()];
  const year = d.getFullYear() + 543;
  return `${day} ${month} ${year}`;
}

/**
 * เธฃเธงเธกเธเนเธญเธกเธนเธฅเธ—เธตเนเธญเธขเธนเนเนเธซเนเน€เธเนเธเธเนเธญเธเธงเธฒเธกเน€เธ•เนเธก
 */
function formatFullAddress(applicant) {
  const parts = [];
  if (applicant.address_no) parts.push(`เธเนเธฒเธเน€เธฅเธเธ—เธตเน ${applicant.address_no}`);
  if (applicant.address_moo && applicant.address_moo !== '-') parts.push(`เธซเธกเธนเน ${applicant.address_moo}`);
  if (applicant.address_soi && applicant.address_soi !== '-') parts.push(`เธเธญเธข${applicant.address_soi}`);
  if (applicant.address_road && applicant.address_road !== '-') parts.push(`เธ–เธเธ${applicant.address_road}`);
  if (applicant.subdistrict) parts.push(`เธ•เธณเธเธฅ${applicant.subdistrict}`);
  if (applicant.district) parts.push(`เธญเธณเน€เธ เธญ${applicant.district}`);
  if (applicant.province) parts.push(`เธเธฑเธเธซเธงเธฑเธ”${applicant.province}`);
  if (applicant.zipcode) parts.push(applicant.zipcode);
  return parts.join(' ');
}
/**
 * เธฃเธฐเธเธเธฃเธฑเธเธชเธกเธฑเธเธฃเน€เธฃเธตเธขเธเธญเธญเธเนเธฅเธเน (เนเธเธงเธ•เธฒ) เธงเธดเธ—เธขเธฒเธฅเธฑเธขเน€เธ—เธเธเธดเธเธ—เนเธฒเธซเธฅเธงเธเธเธดเน€เธกเธเธ•เนเนเธ—เธขเธญเธเธธเธชเธฃเธ“เน
 * เนเธเธฅเน: NotificationService.js
 * เธซเธเนเธฒเธ—เธตเน: เธเธฒเธฃเนเธเนเธเน€เธ•เธทเธญเธเธเนเธฒเธ LINE Messaging API เนเธฅเธฐเธญเธตเน€เธกเธฅ (Gmail)
 */

/**
 * เธชเนเธเธเนเธญเธเธงเธฒเธกเธเนเธฒเธ LINE Messaging API (Push Message)
 * @param {string} toTargetId User ID เธซเธฃเธทเธญ Group ID เนเธ LINE
 * @param {Array<Object>|string} messages เธเนเธญเธเธงเธฒเธกเนเธเธ string เธซเธฃเธทเธญ array เธเธญเธ LINE Message objects
 * @returns {boolean} เธชเธณเน€เธฃเนเธเธซเธฃเธทเธญเนเธกเน
 */
function sendLineMessage(toTargetId, messages) {
  const token = getLineChannelAccessToken();
  const targetId = toTargetId || getLineAdminTargetId();

  if (!token || !targetId) {
    console.warn('เนเธกเนเนเธ”เนเธ•เธฑเนเธเธเนเธฒ LINE_CHANNEL_ACCESS_TOKEN เธซเธฃเธทเธญ LINE Target ID เธฃเธฐเธเธเธเธฐเธเนเธฒเธกเธเธฒเธฃเธชเนเธ LINE');
    return false;
  }

  const url = 'https://api.line.me/v2/bot/message/push';

  let messagePayload = [];
  if (typeof messages === 'string') {
    messagePayload = [{ type: 'text', text: messages }];
  } else if (Array.isArray(messages)) {
    messagePayload = messages;
  }

  const payload = {
    to: targetId,
    messages: messagePayload
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const statusCode = response.getResponseCode();
    if (statusCode === 200) {
      console.log(`เธชเนเธเธเนเธญเธเธงเธฒเธก LINE เธชเธณเน€เธฃเนเธเนเธเธขเธฑเธ: ${targetId}`);
      return true;
    } else {
      console.error(`เธชเนเธเธเนเธญเธเธงเธฒเธก LINE เนเธกเนเธชเธณเน€เธฃเนเธ [${statusCode}]:`, response.getContentText());
      return false;
    }
  } catch (err) {
    console.error('เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เนเธเธเธฒเธฃเน€เธเธทเนเธญเธกเธ•เนเธญ LINE Messaging API:', err);
    return false;
  }
}

/**
 * เธชเนเธเธเธฒเธฃเนเธเนเธเน€เธ•เธทเธญเธเธ—เธฒเธเธญเธตเน€เธกเธฅเธเนเธฒเธ Gmail Service
 * @param {string} toEmail เธญเธตเน€เธกเธฅเธเธนเนเธฃเธฑเธ
 * @param {string} subject เธซเธฑเธงเธเนเธญเธญเธตเน€เธกเธฅ
 * @param {string} htmlBody เน€เธเธทเนเธญเธซเธฒเธญเธตเน€เธกเธฅเนเธเธฃเธนเธเนเธเธ HTML
 * @returns {boolean}
 */
function sendEmailNotification(toEmail, subject, htmlBody) {
  if (!toEmail || !toEmail.includes('@')) {
    console.warn(`เธญเธตเน€เธกเธฅเธเธนเนเธฃเธฑเธเนเธกเนเธ–เธนเธเธ•เนเธญเธ: ${toEmail}`);
    return false;
  }

  try {
    MailApp.sendEmail({
      to: toEmail,
      subject: subject,
      htmlBody: htmlBody,
      name: `${DEFAULT_CONFIG.COLLEGE_NAME} (เธเธฒเธเธฃเธฑเธเธชเธกเธฑเธเธฃเนเธเธงเธ•เธฒ)`
    });
    console.log(`เธชเนเธเธญเธตเน€เธกเธฅเธชเธณเน€เธฃเนเธเนเธเธขเธฑเธ: ${toEmail}`);
    return true;
  } catch (err) {
    console.error(`เธชเนเธเธญเธตเน€เธกเธฅเนเธกเนเธชเธณเน€เธฃเนเธเนเธเธขเธฑเธ ${toEmail}:`, err);
    return false;
  }
}

/**
 * เธ”เธถเธเน€เธ—เธกเน€เธเธฅเธ•เธเนเธญเธเธงเธฒเธกเนเธฅเธฐเนเธ—เธเธ—เธตเนเธเนเธฒเธ•เธฑเธงเนเธเธฃ (Placeholder)
 * @param {string} templateKey เธฃเธซเธฑเธชเน€เธ—เธกเน€เธเธฅเธ• เน€เธเนเธ NEW_APPLICANT_LINE, STATUS_CHANGE_EMAIL
 * @param {Object} dataObj เธเนเธญเธกเธนเธฅเธ—เธตเนเธเธฐเธเธณเนเธเนเธ—เธเธ—เธตเน เน€เธเนเธ { name, app_no, status, remarks }
 * @returns {Object|null} { channel, subject, body }
 */
function getRenderedTemplate(templateKey, dataObj) {
  try {
    const templates = getSheetDataAsObjects(SHEETS.TEMPLATES);
    const tmpl = templates.find(t => t.template_key === templateKey);

    if (!tmpl) {
      console.warn(`เนเธกเนเธเธเน€เธ—เธกเน€เธเธฅเธ•เธเนเธญเธเธงเธฒเธก: ${templateKey}`);
      return null;
    }

    let subject = tmpl.subject || '';
    let body = tmpl.body_template || '';

    // เธ—เธณเธเธฒเธฃเนเธ—เธเธ—เธตเนเธ•เธฑเธงเนเธเธฃ เน€เธเนเธ {{name}} -> dataObj.name
    for (const [k, v] of Object.entries(dataObj)) {
      const regex = new RegExp(`{{${k}}}`, 'gi');
      const valStr = v !== null && v !== undefined ? String(v) : '';
      subject = subject.replace(regex, valStr);
      body = body.replace(regex, valStr);
    }

    return {
      channel: tmpl.channel,
      subject: subject,
      body: body
    };
  } catch (err) {
    console.error('เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เนเธเธเธฒเธฃ Render Template:', err);
    return null;
  }
}

/**
 * เนเธเนเธเน€เธ•เธทเธญเธเน€เธเนเธฒเธซเธเนเธฒเธ—เธตเนเน€เธกเธทเนเธญเธกเธตเธเธนเนเธชเธกเธฑเธเธฃเธฃเธฒเธขเนเธซเธกเน
 * @param {Object} applicant เธเนเธญเธกเธนเธฅเธเธนเนเธชเธกเธฑเธเธฃ
 */
function notifyOfficerNewApplicant(applicant) {
  const lineText = `๐“ข เนเธเนเธเน€เธ•เธทเธญเธ: เธกเธตเธเธนเนเธชเธกเธฑเธเธฃเนเธเธงเธ•เธฒเนเธซเธกเน!
----------------------------------
๐“ เน€เธฅเธเธ—เธตเนเนเธเธชเธกเธฑเธเธฃ: ${applicant.application_no}
๐‘ค เธเธทเนเธญ-เธชเธเธธเธฅ: ${applicant.title}${applicant.first_name} ${applicant.last_name}
๐“ เธฃเธฐเธ”เธฑเธ: ${applicant.education_level}
๐  เธชเธฒเธเธฒเธงเธดเธเธฒ: ${applicant.quota_major_1}
๐ซ เนเธฃเธเน€เธฃเธตเธขเธเน€เธ”เธดเธก: ${applicant.current_school_name}
๐“ เน€เธเธฃเธ”เน€เธเธฅเธตเนเธข (GPAX): ${applicant.gpax}
๐“ เนเธ—เธฃเธจเธฑเธเธ—เน: ${applicant.phone}
โฐ เธงเธฑเธเธ—เธตเนเธชเธกเธฑเธเธฃ: ${formatThaiDate(applicant.apply_date)}
----------------------------------
เธเธฃเธธเธ“เธฒเน€เธเนเธฒเธชเธนเนเธฃเธฐเธเธเธเธฒเธเธฃเธฑเธเธชเธกเธฑเธเธฃเน€เธเธทเนเธญเธ•เธฃเธงเธเธชเธญเธเน€เธญเธเธชเธฒเธฃ`;

  // เธชเนเธเนเธเนเธเน€เธ•เธทเธญเธ LINE เนเธเธขเธฑเธเธเธฅเธธเนเธกเน€เธเนเธฒเธซเธเนเธฒเธ—เธตเน
  sendLineMessage(getLineAdminTargetId(), lineText);
}

/**
 * เนเธเนเธเน€เธ•เธทเธญเธเธเธนเนเธชเธกเธฑเธเธฃเน€เธกเธทเนเธญเธชเธ–เธฒเธเธฐเนเธเธชเธกเธฑเธเธฃเน€เธเธฅเธตเนเธขเธเนเธเธฅเธ
 * @param {Object} applicant เธเนเธญเธกเธนเธฅเธเธนเนเธชเธกเธฑเธเธฃ
 * @param {string} newStatus เธชเธ–เธฒเธเธฐเนเธซเธกเน
 * @param {string} remarks เธซเธกเธฒเธขเน€เธซเธ•เธธ/เธชเธดเนเธเธ—เธตเนเธ•เนเธญเธเนเธเนเนเธ
 */
function notifyApplicantStatusChanged(applicant, newStatus, remarks) {
  const subject = `[${DEFAULT_CONFIG.COLLEGE_NAME}] เนเธเนเธเธเธฅเธเธฒเธฃเธ•เธฃเธงเธเธชเธญเธเนเธเธชเธกเธฑเธเธฃเนเธเธงเธ•เธฒ (${applicant.application_no})`;

  let statusBadgeColor = '#2563eb';
  if (newStatus === APPLICATION_STATUS.PASSED) statusBadgeColor = '#16a34a';
  else if (newStatus === APPLICATION_STATUS.FAILED) statusBadgeColor = '#dc2626';
  else if (newStatus === APPLICATION_STATUS.INCOMPLETE) statusBadgeColor = '#d97706';
  else if (newStatus === APPLICATION_STATUS.ENROLLED) statusBadgeColor = '#7c3aed';

  const htmlBody = `
    <div style="font-family: 'Sarabun', Tahoma, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #ffffff;">
      <div style="text-align: center; border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="color: #0f172a; margin: 0;">${DEFAULT_CONFIG.COLLEGE_NAME}</h2>
        <p style="color: #64748b; margin: 4px 0 0 0;">เธฃเธฐเธเธเธฃเธฑเธเธชเธกเธฑเธเธฃเน€เธฃเธตเธขเธเธญเธญเธเนเธฅเธเน (เนเธเธงเธ•เธฒ) เธเธฃเธฐเธเธณเธเธตเธเธฒเธฃเธจเธถเธเธฉเธฒ ${DEFAULT_CONFIG.ACADEMIC_YEAR}</p>
      </div>

      <p>เน€เธฃเธตเธขเธเธเธธเธ“ <strong>${applicant.title}${applicant.first_name} ${applicant.last_name}</strong>,</p>
      <p>เน€เธเนเธฒเธซเธเนเธฒเธ—เธตเนเธเธฒเธเธฃเธฑเธเธชเธกเธฑเธเธฃเนเธ”เนเธ•เธฃเธงเธเธชเธญเธเนเธเธชเธกเธฑเธเธฃเน€เธฅเธเธ—เธตเน <strong>${applicant.application_no}</strong> เน€เธฃเธตเธขเธเธฃเนเธญเธขเนเธฅเนเธง เนเธ”เธขเธกเธตเธชเธ–เธฒเธเธฐเธเธฑเธเธเธธเธเธฑเธเธ”เธฑเธเธเธตเน:</p>

      <div style="text-align: center; margin: 24px 0;">
        <span style="background-color: ${statusBadgeColor}; color: white; padding: 8px 24px; border-radius: 20px; font-size: 18px; font-weight: bold;">
          ${newStatus}
        </span>
      </div>

      ${remarks ? `
      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin-bottom: 20px; border-radius: 4px;">
        <strong style="color: #92400e;">เธซเธกเธฒเธขเน€เธซเธ•เธธเธเธฒเธเน€เธเนเธฒเธซเธเนเธฒเธ—เธตเน:</strong>
        <p style="color: #78350f; margin: 4px 0 0 0;">${remarks}</p>
      </div>` : ''}

      ${newStatus === APPLICATION_STATUS.INCOMPLETE ? `
      <p style="color: #b45309; font-weight: bold;">
        โ ๏ธ เธเธฃเธธเธ“เธฒเน€เธเนเธฒเธชเธนเนเธฃเธฐเธเธเธซเธเนเธฒ "เธ•เธฃเธงเธเธชเธญเธเธชเธ–เธฒเธเธฐ" เน€เธเธทเนเธญเธญเธฑเธเนเธซเธฅเธ”เน€เธญเธเธชเธฒเธฃเธ—เธตเนเธ•เนเธญเธเนเธเนเนเธเน€เธเธดเนเธกเน€เธ•เธดเธกเนเธ”เธขเธ”เนเธงเธ
      </p>` : ''}

      ${newStatus === APPLICATION_STATUS.PASSED ? `
      <p style="color: #15803d; font-weight: bold;">
        ๐ เธเธญเนเธชเธ”เธเธเธงเธฒเธกเธขเธดเธเธ”เธตเธ”เนเธงเธขเธเธฃเธฑเธ! เธเธฃเธธเธ“เธฒเธ•เธดเธ”เธ•เธฒเธกเธเธณเธซเธเธ”เธเธฒเธฃเธฃเธฒเธขเธเธฒเธเธ•เธฑเธงเนเธฅเธฐเธกเธญเธเธ•เธฑเธงเธ•เธฒเธกเธเธฃเธฐเธเธฒเธจเธเธญเธเธงเธดเธ—เธขเธฒเธฅเธฑเธข
      </p>` : ''}

      <div style="border-top: 1px solid #e2e8f0; margin-top: 24px; padding-top: 16px; font-size: 13px; color: #64748b;">
        <p>เธซเธฒเธเธกเธตเธเนเธญเธชเธเธชเธฑเธขเธเธฃเธฐเธเธฒเธฃเนเธ” เธชเธฒเธกเธฒเธฃเธ–เธ•เธดเธ”เธ•เนเธญเธชเธญเธเธ–เธฒเธกเนเธ”เนเธ—เธตเน เธเธฒเธเธ—เธฐเน€เธเธตเธขเธเนเธฅเธฐเธงเธฑเธ”เธเธฅ ${DEFAULT_CONFIG.COLLEGE_NAME}</p>
        <p><em>(เธเนเธญเธเธงเธฒเธกเธเธตเนเน€เธเนเธเธฃเธฐเธเธเนเธเนเธเน€เธ•เธทเธญเธเธญเธฑเธ•เนเธเธกเธฑเธ•เธด เธเธฃเธธเธ“เธฒเธญเธขเนเธฒเธ•เธญเธเธเธฅเธฑเธเธญเธตเน€เธกเธฅเธเธตเน)</em></p>
      </div>
    </div>
  `;

  // เธชเนเธเธญเธตเน€เธกเธฅเธ–เธถเธเธเธนเนเธชเธกเธฑเธเธฃ
  if (applicant.email) {
    sendEmailNotification(applicant.email, subject, htmlBody);
  }

  // เธซเธฒเธเธเธนเนเธชเธกเธฑเธเธฃเธกเธต LINE User ID
  if (applicant.line_user_id) {
    const lineMsg = `๐”” เนเธเนเธเน€เธ•เธทเธญเธเธชเธ–เธฒเธเธฐเนเธเธชเธกเธฑเธเธฃ (${applicant.application_no})\nเธเธธเธ“${applicant.first_name} ${applicant.last_name}\nเธชเธ–เธฒเธเธฐ: ${newStatus}\n${remarks ? 'เธซเธกเธฒเธขเน€เธซเธ•เธธ: ' + remarks : ''}`;
    sendLineMessage(applicant.line_user_id, lineMsg);
  }
}
/**
 * เธฃเธฐเธเธเธฃเธฑเธเธชเธกเธฑเธเธฃเน€เธฃเธตเธขเธเธญเธญเธเนเธฅเธเน (เนเธเธงเธ•เธฒ) เธงเธดเธ—เธขเธฒเธฅเธฑเธขเน€เธ—เธเธเธดเธเธ—เนเธฒเธซเธฅเธงเธเธเธดเน€เธกเธเธ•เนเนเธ—เธขเธญเธเธธเธชเธฃเธ“เน
 * เนเธเธฅเน: ApplicantService.js
 * เธซเธเนเธฒเธ—เธตเน: เธเธฃเธฐเธกเธงเธฅเธเธฅเธ•เธฃเธฃเธเธฐเธเธฑเนเธเธเธนเนเธชเธกเธฑเธเธฃ (เธชเนเธเนเธเธชเธกเธฑเธเธฃ, เธ•เธฃเธงเธเธชเธญเธเธชเธ–เธฒเธเธฐ, เธชเนเธเน€เธญเธเธชเธฒเธฃเนเธเนเนเธ)
 */

/**
 * เธเธฑเธเธ—เธถเธเธเธฒเธฃเธชเนเธเนเธเธชเธกเธฑเธเธฃเนเธซเธกเน (Phase 1)
 * @param {Object} formData เธเนเธญเธกเธนเธฅเธเธฒเธเธเธญเธฃเนเธกเนเธเธชเธกเธฑเธเธฃ
 * @returns {Object} เธเธฅเธเธฒเธฃเธชเธกเธฑเธเธฃ { success: boolean, applicationNo: string, message: string, pdfId: string }
 */
function submitApplication(formData) {
  try {
    // 1. เธ•เธฃเธงเธเธเธฑเธเธเธญเธ—เธ”เนเธงเธข Honeypot
    if (isSpamSubmission(formData)) {
      return { success: false, message: 'เธเธฒเธฃเธชเนเธเธเนเธญเธกเธนเธฅเธ–เธนเธเธเธเธดเน€เธชเธเน€เธเธทเนเธญเธเธเธฒเธเธ•เธฃเธงเธเธเธเธเธคเธ•เธดเธเธฃเธฃเธกเธเธดเธ”เธเธเธ•เธด' };
    }

    // 2. เธ•เธฃเธงเธเธชเธญเธเธชเธ–เธฒเธเธฐเธเธฒเธฃเน€เธเธดเธ”เธฃเธฑเธเธชเธกเธฑเธเธฃเธเธฒเธเธฃเธฐเธเธ
    const configRows = getSheetDataAsObjects(SHEETS.CONFIG);
    const systemStatus = configRows.find(r => r.key === 'SYSTEM_STATUS');
    if (systemStatus && String(systemStatus.value).toUpperCase() === 'CLOSED') {
      return { success: false, message: 'เธฃเธฐเธเธเธเธดเธ”เธฃเธฑเธเธชเธกเธฑเธเธฃเน€เธฃเธตเธขเธเธฃเนเธญเธขเนเธฅเนเธง เนเธกเนเธชเธฒเธกเธฒเธฃเธ–เธชเนเธเนเธเธชเธกเธฑเธเธฃเนเธ”เน' };
    }

    // 3. เธ•เธฃเธงเธเธชเธญเธเธเธงเธฒเธกเธ–เธนเธเธ•เนเธญเธเธเธญเธเน€เธฅเธเธเธฃเธฐเธเธณเธ•เธฑเธงเธเธฃเธฐเธเธฒเธเธ 13 เธซเธฅเธฑเธ
    const citizenId = sanitizeInput(formData.citizen_id).replace(/[^0-9]/g, '');
    if (!validateThaiCitizenId(citizenId)) {
      return { success: false, message: 'เน€เธฅเธเธเธฃเธฐเธเธณเธ•เธฑเธงเธเธฃเธฐเธเธฒเธเธ 13 เธซเธฅเธฑเธเนเธกเนเธ–เธนเธเธ•เนเธญเธเธ•เธฒเธกเธชเธนเธ•เธฃเธเธณเธเธงเธ“เธเธญเธเธเธฃเธฐเธ—เธฃเธงเธเธกเธซเธฒเธ”เนเธ—เธข' };
    }

    // 4. เธ•เธฃเธงเธเธชเธญเธเธเธฒเธฃเธชเธกเธฑเธเธฃเธเนเธณเนเธเธเธตเธเธฒเธฃเธจเธถเธเธฉเธฒเน€เธ”เธตเธขเธงเธเธฑเธ
    const existing = findRowObject(SHEETS.APPLICANTS, 'citizen_id', citizenId);
    if (existing && String(existing.academic_year) === DEFAULT_CONFIG.ACADEMIC_YEAR) {
      return {
        success: false,
        message: `เธเธธเธ“เนเธ”เนเธขเธทเนเธเนเธเธชเธกเธฑเธเธฃเนเธงเนเนเธฅเนเธงเธ”เนเธงเธขเน€เธฅเธเธ—เธตเน ${existing.application_no} (เธชเธ–เธฒเธเธฐ: ${existing.current_status}) เธเธฃเธธเธ“เธฒเนเธเนเน€เธกเธเธน "เธ•เธฃเธงเธเธชเธญเธเธชเธ–เธฒเธเธฐ" เน€เธเธทเนเธญเธ•เธดเธ”เธ•เธฒเธกเธเธฅเธเธฒเธฃเธชเธกเธฑเธเธฃ`
      };
    }

    // 5. เธ•เธฃเธงเธเธชเธญเธเน€เธเธญเธฃเนเนเธ—เธฃเธจเธฑเธเธ—เนเนเธฅเธฐ GPAX
    const phone = sanitizeInput(formData.phone).replace(/[^0-9]/g, '');
    if (phone.length !== 10 || !phone.startsWith('0')) {
      return { success: false, message: 'เน€เธเธญเธฃเนเนเธ—เธฃเธจเธฑเธเธ—เนเธ•เนเธญเธเน€เธเนเธเธ•เธฑเธงเน€เธฅเธ 10 เธซเธฅเธฑเธเนเธฅเธฐเธเธถเนเธเธ•เนเธเธ”เนเธงเธข 0' };
    }

    const gpax = parseFloat(formData.gpax);
    if (isNaN(gpax) || gpax < 0.00 || gpax > 4.00) {
      return { success: false, message: 'เน€เธเธฃเธ”เน€เธเธฅเธตเนเธขเธชเธฐเธชเธก (GPAX) เธ•เนเธญเธเธญเธขเธนเนเธฃเธฐเธซเธงเนเธฒเธ 0.00 เธ–เธถเธ 4.00' };
    }

    // 6. เธ•เธฃเธงเธเธชเธญเธเน€เธญเธเธชเธฒเธฃเธเธฑเธเธเธฑเธ
    if (!formData.file_photo || !formData.file_transcript || !formData.file_id_card) {
      return { success: false, message: 'เธเธฃเธธเธ“เธฒเนเธเธเน€เธญเธเธชเธฒเธฃเธเธฑเธเธเธฑเธเนเธซเนเธเธฃเธเธ—เธฑเนเธ 3 เธฃเธฒเธขเธเธฒเธฃ (เธฃเธนเธเธ–เนเธฒเธข, เธเธ.1, เธชเธณเน€เธเธฒเธเธฑเธ•เธฃ/เธ—เธฐเน€เธเธตเธขเธเธเนเธฒเธ)' };
    }

    // 7. เธชเธฃเนเธฒเธเน€เธฅเธเธ—เธตเนเนเธเธชเธกเธฑเธเธฃเนเธซเธกเน (Q70-xxxx)
    const newAppNo = generateNextApplicationNo();
    const applyDateStr = Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyyy-MM-dd HH:mm:ss');

    // 8. เธเธฑเธเธ—เธถเธเนเธเธฅเนเนเธเธเธฅเธเนเธ Google Drive (Private Folder)
    let photoFileId = '';
    const uploadedDocs = [];

    // เธฃเธนเธเธ–เนเธฒเธข 1 เธเธดเนเธง
    if (formData.file_photo && formData.file_photo.base64) {
      const res = saveUploadedFile(newAppNo, 'photo_1inch', formData.file_photo.name, formData.file_photo.mimeType, formData.file_photo.base64);
      photoFileId = res.fileId;
      uploadedDocs.push({
        doc_type: 'photo_1inch',
        file_name: res.fileName,
        drive_file_id: res.fileId,
        mime_type: res.mimeType,
        file_size: res.fileSize
      });
    }

    // เนเธ เธเธ.1
    if (formData.file_transcript && formData.file_transcript.base64) {
      const res = saveUploadedFile(newAppNo, 'transcript_5term', formData.file_transcript.name, formData.file_transcript.mimeType, formData.file_transcript.base64);
      uploadedDocs.push({
        doc_type: 'transcript_5term',
        file_name: res.fileName,
        drive_file_id: res.fileId,
        mime_type: res.mimeType,
        file_size: res.fileSize
      });
    }

    // เธชเธณเน€เธเธฒเธเธฑเธ•เธฃ เธเธเธ. / เธ—เธฐเน€เธเธตเธขเธเธเนเธฒเธ
    if (formData.file_id_card && formData.file_id_card.base64) {
      const res = saveUploadedFile(newAppNo, 'id_card_house_reg', formData.file_id_card.name, formData.file_id_card.mimeType, formData.file_id_card.base64);
      uploadedDocs.push({
        doc_type: 'id_card_house_reg',
        file_name: res.fileName,
        drive_file_id: res.fileId,
        mime_type: res.mimeType,
        file_size: res.fileSize
      });
    }

    // เน€เธเธตเธขเธฃเธ•เธดเธเธฑเธ•เธฃ (เธ–เนเธฒเธกเธต)
    if (formData.file_certificate && formData.file_certificate.base64) {
      const res = saveUploadedFile(newAppNo, 'certificate_special', formData.file_certificate.name, formData.file_certificate.mimeType, formData.file_certificate.base64);
      uploadedDocs.push({
        doc_type: 'certificate_special',
        file_name: res.fileName,
        drive_file_id: res.fileId,
        mime_type: res.mimeType,
        file_size: res.fileSize
      });
    }

    // 9. เธเธฃเธฐเธเธญเธเธเนเธญเธกเธนเธฅเธเธนเนเธชเธกเธฑเธเธฃเธฅเธเนเธเธฃเธเธชเธฃเนเธฒเธเธเธตเธ• Applicants
    const applicantRecord = {
      application_no: newAppNo,
      apply_date: applyDateStr,
      academic_year: DEFAULT_CONFIG.ACADEMIC_YEAR,
      education_level: sanitizeInput(formData.education_level),
      title: sanitizeInput(formData.title),
      first_name: sanitizeInput(formData.first_name),
      last_name: sanitizeInput(formData.last_name),
      citizen_id: citizenId,
      birth_date: sanitizeInput(formData.birth_date),
      father_name: sanitizeInput(formData.father_name),
      father_age: sanitizeInput(formData.father_age),
      father_occupation: sanitizeInput(formData.father_occupation),
      mother_name: sanitizeInput(formData.mother_name),
      mother_age: sanitizeInput(formData.mother_age),
      mother_occupation: sanitizeInput(formData.mother_occupation),
      address_no: sanitizeInput(formData.address_no),
      address_moo: sanitizeInput(formData.address_moo),
      address_soi: sanitizeInput(formData.address_soi),
      address_road: sanitizeInput(formData.address_road),
      subdistrict: sanitizeInput(formData.subdistrict),
      district: sanitizeInput(formData.district),
      province: sanitizeInput(formData.province),
      zipcode: sanitizeInput(formData.zipcode),
      phone: phone,
      email: sanitizeInput(formData.email),
      current_school_level: sanitizeInput(formData.current_school_level),
      current_school_name: sanitizeInput(formData.current_school_name),
      school_address_no: sanitizeInput(formData.school_address_no),
      school_subdistrict: sanitizeInput(formData.school_subdistrict),
      school_district: sanitizeInput(formData.school_district),
      school_province: sanitizeInput(formData.school_province),
      gpax: gpax.toFixed(2),
      prev_major: sanitizeInput(formData.prev_major),
      quota_major_1: sanitizeInput(formData.quota_major_1),
      quota_major_2: sanitizeInput(formData.quota_major_2),
      referral_source: sanitizeInput(formData.referral_source),
      current_status: APPLICATION_STATUS.PENDING,
      rejection_remarks: '',
      pdpa_consent: formData.pdpa_consent === true || formData.pdpa_consent === 'true',
      applicant_signature_text: sanitizeInput(formData.applicant_signature_text),
      pdf_drive_id: '',
      line_user_id: sanitizeInput(formData.line_user_id || ''),
      updated_at: applyDateStr
    };

    // 10. เธชเธฃเนเธฒเธเนเธเธชเธกเธฑเธเธฃ PDF เธเธฒเธ Google Docs Template
    let pdfId = '';
    try {
      pdfId = generateApplicationPdf(applicantRecord, photoFileId);
      applicantRecord.pdf_drive_id = pdfId;
    } catch (err) {
      console.error('เธชเธฃเนเธฒเธ PDF เนเธกเนเธชเธณเน€เธฃเนเธ:', err);
    }

    // 11. เธเธฑเธเธ—เธถเธเธฅเธเธเธตเธ• Applicants
    appendRowObject(SHEETS.APPLICANTS, applicantRecord);

    // 12. เธเธฑเธเธ—เธถเธเธเธฃเธฐเธงเธฑเธ•เธดเนเธเธฅเนเธฅเธเธเธตเธ• Documents
    uploadedDocs.forEach((doc, idx) => {
      appendRowObject(SHEETS.DOCUMENTS, {
        doc_id: `DOC-${newAppNo}-${idx + 1}`,
        application_no: newAppNo,
        doc_type: doc.doc_type,
        file_name: doc.file_name,
        drive_file_id: doc.drive_file_id,
        mime_type: doc.mime_type,
        file_size: doc.file_size,
        upload_date: applyDateStr,
        verification_status: APPLICATION_STATUS.PENDING,
        feedback_note: ''
      });
    });

    // 13. เธเธฑเธเธ—เธถเธเธฅเธ StatusLog
    appendRowObject(SHEETS.STATUS_LOG, {
      log_id: 'LOG-' + Utilities.getUuid().substring(0, 8),
      application_no: newAppNo,
      old_status: '-',
      new_status: APPLICATION_STATUS.PENDING,
      remarks: 'เธชเนเธเนเธเธชเธกเธฑเธเธฃเน€เธเนเธฒเธฃเธฐเธเธเน€เธฃเธตเธขเธเธฃเนเธญเธขเนเธฅเนเธง',
      changed_by: 'APPLICANT',
      timestamp: applyDateStr
    });

    // 14. เนเธเนเธเน€เธ•เธทเธญเธเน€เธเนเธฒเธซเธเนเธฒเธ—เธตเนเธ—เธฒเธ LINE เนเธฅเธฐเธเธนเนเธชเธกเธฑเธเธฃเธ—เธฒเธ Email
    notifyOfficerNewApplicant(applicantRecord);
    if (applicantRecord.email) {
      const emailSubject = `[เธงเธดเธ—เธขเธฒเธฅเธฑเธขเน€เธ—เธเธเธดเธเธ—เนเธฒเธซเธฅเธงเธเธฏ] เนเธ”เนเธฃเธฑเธเนเธเธชเธกเธฑเธเธฃเนเธเธงเธ•เธฒเน€เธฃเธตเธขเธเธฃเนเธญเธขเนเธฅเนเธง (${newAppNo})`;
      const emailBody = `
        <div style="font-family: Sarabun, sans-serif; padding: 20px;">
          <h3>เธฃเธฐเธเธเนเธ”เนเธฃเธฑเธเนเธเธชเธกเธฑเธเธฃเนเธเธงเธ•เธฒเธเธญเธเธเธธเธ“เน€เธฃเธตเธขเธเธฃเนเธญเธขเนเธฅเนเธง</h3>
          <p>เน€เธฃเธตเธขเธเธเธธเธ“ ${applicantRecord.title}${applicantRecord.first_name} ${applicantRecord.last_name}</p>
          <p>เน€เธฅเธเธ—เธตเนเนเธเธชเธกเธฑเธเธฃเธเธญเธเธเธธเธ“เธเธทเธญ: <strong style="font-size: 18px; color: #0284c7;">${newAppNo}</strong></p>
          <p>เธฃเธฐเธ”เธฑเธเธ—เธตเนเธชเธกเธฑเธเธฃ: ${applicantRecord.education_level}</p>
          <p>เธชเธฒเธเธฒเธงเธดเธเธฒเธ—เธตเนเน€เธฅเธทเธญเธ: ${applicantRecord.quota_major_1}</p>
          <p>เธเธธเธ“เธชเธฒเธกเธฒเธฃเธ–เธ•เธฃเธงเธเธชเธญเธเธชเธ–เธฒเธเธฐเธเธฒเธฃเธชเธกเธฑเธเธฃเนเธฅเธฐเธ”เธฒเธงเธเนเนเธซเธฅเธ”เนเธเธชเธกเธฑเธเธฃเนเธ”เนเธ—เธตเนเธซเธเนเธฒเน€เธงเนเธเนเธเธ•เน เนเธ”เธขเนเธเนเน€เธฅเธเธเธฑเธ•เธฃเธเธฃเธฐเธเธฒเธเธเนเธฅเธฐเธงเธฑเธเน€เธเธดเธ”</p>
        </div>
      `;
      sendEmailNotification(applicantRecord.email, emailSubject, emailBody);
    }

    // 15. เธเธฑเธเธ—เธถเธ Audit Log
    logAudit('SUBMIT_APPLICATION', newAppNo, `เธเธนเนเธชเธกเธฑเธเธฃเธขเธทเนเธเน€เธญเธเธชเธฒเธฃเธชเธณเน€เธฃเนเธ ${applicantRecord.first_name} ${applicantRecord.last_name}`, applicantRecord.email);

    return {
      success: true,
      applicationNo: newAppNo,
      pdfId: pdfId,
      message: 'เธขเธทเนเธเนเธเธชเธกเธฑเธเธฃเธชเธณเน€เธฃเนเธเน€เธฃเธตเธขเธเธฃเนเธญเธขเนเธฅเนเธง'
    };

  } catch (error) {
    console.error('เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เนเธเธเธฒเธฃเธขเธทเนเธเนเธเธชเธกเธฑเธเธฃ:', error);
    return {
      success: false,
      message: 'เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เนเธเธฃเธฐเธเธ: ' + error.message
    };
  }
}

/**
 * เธเนเธเธซเธฒเนเธฅเธฐเธ•เธฃเธงเธเธชเธญเธเธชเธ–เธฒเธเธฐเธเธฒเธฃเธชเธกเธฑเธเธฃ (Phase 1)
 * เธเธฑเธเธเธฑเธเธฃเธฐเธเธธเธ—เธฑเนเธเน€เธฅเธเธเธฃเธฐเธเธณเธ•เธฑเธงเธเธฃเธฐเธเธฒเธเธ 13 เธซเธฅเธฑเธ เนเธฅเธฐ เธงเธฑเธเน€เธเธดเธ” (เธ.เธจ.) เธเธฃเนเธญเธกเธฃเธฐเธเธ Rate Limiting
 * @param {string} citizenId เน€เธฅเธเธเธฃเธฐเธเธณเธ•เธฑเธงเธเธฃเธฐเธเธฒเธเธ 13 เธซเธฅเธฑเธ
 * @param {string} birthDate เธงเธฑเธเน€เธเธดเธ” (เธฃเธนเธเนเธเธ YYYY-MM-DD เธซเธฃเธทเธญ เธงเธง/เธ”เธ”/เธเธเธเธ)
 * @returns {Object} เธเนเธญเธกเธนเธฅเธชเธ–เธฒเธเธฐ เธซเธฃเธทเธญ เธเนเธญเธเธงเธฒเธกเธเธเธดเน€เธชเธ
 */
function checkApplicantStatus(citizenId, birthDate) {
  try {
    const cleanId = String(citizenId).replace(/[^0-9]/g, '');
    const cleanBirth = String(birthDate).trim();

    // 1. เธ•เธฃเธงเธเธชเธญเธ Rate Limiting (เธญเธเธธเธเธฒเธ•เนเธซเนเธเนเธเธซเธฒเธเธดเธ”เนเธกเนเน€เธเธดเธ 5 เธเธฃเธฑเนเธ/เธเธก.)
    const rateCheck = checkRateLimit(cleanId, 5, 3600);
    if (!rateCheck.allowed) {
      logAudit('RATE_LIMIT_TRIGGERED', cleanId, 'เธเนเธเธซเธฒเธชเธ–เธฒเธเธฐเน€เธเธดเธเนเธเธงเธ•เนเธฒเธ—เธตเนเธญเธเธธเธเธฒเธ•');
      return { success: false, message: rateCheck.message };
    }

    // 2. เธเนเธเธซเธฒเนเธเธเธตเธ• Applicants
    const applicant = findRowObject(SHEETS.APPLICANTS, 'citizen_id', cleanId);

    // 3. เธ•เธฃเธงเธเธชเธญเธเธงเนเธฒเธเธเธเนเธญเธกเธนเธฅเนเธฅเธฐเธงเธฑเธเน€เธเธดเธ”เธ•เธฃเธเธเธฑเธเธซเธฃเธทเธญเนเธกเน
    if (!applicant) {
      recordFailedAttempt(cleanId);
      return { success: false, message: 'เนเธกเนเธเธเธเนเธญเธกเธนเธฅเธเธฒเธฃเธชเธกเธฑเธเธฃ เธซเธฃเธทเธญเน€เธฅเธเธเธฃเธฐเธเธณเธ•เธฑเธงเธเธฃเธฐเธเธฒเธเธเนเธกเนเธ–เธนเธเธ•เนเธญเธ' };
    }

    // เน€เธเธฃเธตเธขเธเน€เธ—เธตเธขเธเธงเธฑเธเน€เธเธดเธ”
    const appBirth = String(applicant.birth_date).trim();
    if (appBirth !== cleanBirth) {
      recordFailedAttempt(cleanId);
      return { success: false, message: 'เธเนเธญเธกเธนเธฅเธงเธฑเธเน€เธเธดเธ”เนเธกเนเธ•เธฃเธเธเธฑเธเธเนเธญเธกเธนเธฅเนเธเธฃเธฐเธเธ เธเธฃเธธเธ“เธฒเธ•เธฃเธงเธเธชเธญเธเธญเธตเธเธเธฃเธฑเนเธ' };
    }

    // เน€เธกเธทเนเธญเธ–เธนเธเธ•เนเธญเธ เนเธซเนเธฃเธตเน€เธเนเธ• Rate Limit
    resetRateLimit(cleanId);

    // 4. เธ”เธถเธเธฃเธฒเธขเธเธฒเธฃเน€เธญเธเธชเธฒเธฃเธ—เธตเนเน€เธเธตเนเธขเธงเธเนเธญเธ
    const allDocs = getSheetDataAsObjects(SHEETS.DOCUMENTS);
    const applicantDocs = allDocs
      .filter(d => d.application_no === applicant.application_no)
      .map(d => ({
        doc_id: d.doc_id,
        doc_type: d.doc_type,
        file_name: d.file_name,
        verification_status: d.verification_status,
        feedback_note: d.feedback_note
      }));

    // เธเธฑเธเธ—เธถเธ Audit Log
    logAudit('CHECK_STATUS', applicant.application_no, 'เธเธนเนเธชเธกเธฑเธเธฃเธ•เธฃเธงเธเธชเธญเธเธชเธ–เธฒเธเธฐเธ•เธเน€เธญเธ');

    return {
      success: true,
      data: {
        application_no: applicant.application_no,
        full_name: `${applicant.title}${applicant.first_name} ${applicant.last_name}`,
        masked_citizen_id: maskCitizenId(applicant.citizen_id),
        education_level: applicant.education_level,
        quota_major_1: applicant.quota_major_1,
        quota_major_2: applicant.quota_major_2,
        current_status: applicant.current_status,
        rejection_remarks: applicant.rejection_remarks,
        apply_date: formatThaiDate(applicant.apply_date),
        pdf_drive_id: applicant.pdf_drive_id,
        documents: applicantDocs
      }
    };
  } catch (err) {
    console.error('เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เนเธเธเธฒเธฃเธ•เธฃเธงเธเธชเธญเธเธชเธ–เธฒเธเธฐ:', err);
    return { success: false, message: 'เธฃเธฐเธเธเน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”: ' + err.message };
  }
}

/**
 * เธญเธฑเธเนเธซเธฅเธ”เน€เธญเธเธชเธฒเธฃเนเธซเธกเนเน€เธเธดเนเธกเน€เธ•เธดเธก เน€เธกเธทเนเธญเธ–เธนเธเธ•เธตเธเธฅเธฑเธเธชเธ–เธฒเธเธฐเน€เธเนเธ "เน€เธญเธเธชเธฒเธฃเนเธกเนเธเธฃเธ"
 * @param {string} applicationNo เน€เธฅเธเธ—เธตเนเนเธเธชเธกเธฑเธเธฃ
 * @param {string} citizenId เน€เธฅเธเธเธฑเธ•เธฃเธเธฃเธฐเธเธฒเธเธเน€เธเธทเนเธญเธขเธทเธเธขเธฑเธเธ•เธฑเธงเธ•เธ
 * @param {string} docType เธเธเธดเธ”เน€เธญเธเธชเธฒเธฃ
 * @param {Object} fileData { name, mimeType, base64 }
 * @returns {Object}
 */
function reuploadDocument(applicationNo, citizenId, docType, fileData) {
  try {
    const cleanId = String(citizenId).replace(/[^0-9]/g, '');
    const applicant = findRowObject(SHEETS.APPLICANTS, 'application_no', applicationNo);

    if (!applicant || String(applicant.citizen_id) !== cleanId) {
      return { success: false, message: 'เธเนเธญเธกเธนเธฅเธเธฒเธฃเธขเธทเธเธขเธฑเธเธ•เธฑเธงเธ•เธเนเธกเนเธ–เธนเธเธ•เนเธญเธ' };
    }

    if (applicant.current_status !== APPLICATION_STATUS.INCOMPLETE) {
      return { success: false, message: 'เนเธเธชเธกเธฑเธเธฃเธเธตเนเนเธกเนเธญเธขเธนเนเนเธเธชเธ–เธฒเธเธฐเธ—เธตเนเธ•เนเธญเธเนเธเนเนเธเน€เธญเธเธชเธฒเธฃ' };
    }

    // เธเธฑเธเธ—เธถเธเนเธเธฅเนเนเธซเธกเนเธฅเธ Drive
    const uploadRes = saveUploadedFile(applicationNo, docType, fileData.name, fileData.mimeType, fileData.base64);

    // เธญเธฑเธเน€เธ”เธ•เนเธเธเธตเธ• Documents
    const docs = getSheetDataAsObjects(SHEETS.DOCUMENTS);
    const targetDoc = docs.find(d => d.application_no === applicationNo && d.doc_type === docType);

    const nowStr = Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyyy-MM-dd HH:mm:ss');

    if (targetDoc) {
      updateRowByKeyValue(SHEETS.DOCUMENTS, 'doc_id', targetDoc.doc_id, {
        file_name: uploadRes.fileName,
        drive_file_id: uploadRes.fileId,
        mime_type: uploadRes.mimeType,
        file_size: uploadRes.fileSize,
        upload_date: nowStr,
        verification_status: APPLICATION_STATUS.PENDING,
        feedback_note: 'เธญเธฑเธเนเธซเธฅเธ”เน€เธญเธเธชเธฒเธฃเธเธเธฑเธเนเธเนเนเธเนเธฅเนเธง'
      });
    } else {
      appendRowObject(SHEETS.DOCUMENTS, {
        doc_id: `DOC-${applicationNo}-${new Date().getTime().toString().slice(-4)}`,
        application_no: applicationNo,
        doc_type: docType,
        file_name: uploadRes.fileName,
        drive_file_id: uploadRes.fileId,
        mime_type: uploadRes.mimeType,
        file_size: uploadRes.fileSize,
        upload_date: nowStr,
        verification_status: APPLICATION_STATUS.PENDING,
        feedback_note: 'เธญเธฑเธเนเธซเธฅเธ”เน€เธญเธเธชเธฒเธฃเน€เธเธดเนเธกเน€เธ•เธดเธก'
      });
    }

    // เธเธฃเธฑเธเธชเธ–เธฒเธเธฐเนเธเธชเธกเธฑเธเธฃเธเธฅเธฑเธเน€เธเนเธ "เธฃเธญเธ•เธฃเธงเธเธชเธญเธ"
    updateRowByKeyValue(SHEETS.APPLICANTS, 'application_no', applicationNo, {
      current_status: APPLICATION_STATUS.PENDING,
      updated_at: nowStr
    });

    // เธเธฑเธเธ—เธถเธ Log
    appendRowObject(SHEETS.STATUS_LOG, {
      log_id: 'LOG-' + Utilities.getUuid().substring(0, 8),
      application_no: applicationNo,
      old_status: APPLICATION_STATUS.INCOMPLETE,
      new_status: APPLICATION_STATUS.PENDING,
      remarks: `เธเธนเนเธชเธกเธฑเธเธฃเธญเธฑเธเนเธซเธฅเธ”เน€เธญเธเธชเธฒเธฃเนเธเนเนเธ: ${docType}`,
      changed_by: 'APPLICANT',
      timestamp: nowStr
    });

    logAudit('REUPLOAD_DOCUMENT', applicationNo, `เธญเธฑเธเนเธซเธฅเธ”เน€เธญเธเธชเธฒเธฃเนเธเนเนเธเธเธเธดเธ” ${docType}`, applicant.email);

    return {
      success: true,
      message: 'เธญเธฑเธเนเธซเธฅเธ”เน€เธญเธเธชเธฒเธฃเธเธเธฑเธเนเธเนเนเธเน€เธฃเธตเธขเธเธฃเนเธญเธขเนเธฅเนเธง เธชเธ–เธฒเธเธฐเธ–เธนเธเธเธฃเธฑเธเน€เธเนเธ "เธฃเธญเธ•เธฃเธงเธเธชเธญเธ"'
    };
  } catch (err) {
    console.error('เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เนเธเธเธฒเธฃเธญเธฑเธเนเธซเธฅเธ”เน€เธญเธเธชเธฒเธฃเธเนเธณ:', err);
    return { success: false, message: 'เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”: ' + err.message };
  }
}
/**
 * เธฃเธฐเธเธเธฃเธฑเธเธชเธกเธฑเธเธฃเน€เธฃเธตเธขเธเธญเธญเธเนเธฅเธเน (เนเธเธงเธ•เธฒ) เธงเธดเธ—เธขเธฒเธฅเธฑเธขเน€เธ—เธเธเธดเธเธ—เนเธฒเธซเธฅเธงเธเธเธดเน€เธกเธเธ•เนเนเธ—เธขเธญเธเธธเธชเธฃเธ“เน
 * เนเธเธฅเน: AdminService.js
 * เธซเธเนเธฒเธ—เธตเน: เธ•เธฃเธฃเธเธฐเธเธฑเนเธเน€เธเนเธฒเธซเธเนเธฒเธ—เธตเนเนเธฅเธฐเนเธญเธ”เธกเธดเธ (Phase 2)
 * เธ•เธฃเธงเธเธชเธญเธเธเธนเนเธชเธกเธฑเธเธฃ, เน€เธเธฅเธตเนเธขเธเธชเธ–เธฒเธเธฐ, เธกเธญเธเธ•เธฑเธง, เนเธ”เธเธเธญเธฃเนเธ”, เธชเนเธเธญเธญเธเธเนเธญเธกเธนเธฅ เธจเธ.02, เธเธฑเธ”เธเธฒเธฃ Config
 */

/**
 * เธ•เธฃเธงเธเธชเธญเธเธเธฒเธฃเน€เธเนเธฒเธชเธนเนเธฃเธฐเธเธเธเธญเธเน€เธเนเธฒเธซเธเนเธฒเธ—เธตเน
 * @param {string} email เธญเธตเน€เธกเธฅเน€เธเนเธฒเธซเธเนเธฒเธ—เธตเน
 * @param {string} pin เธฃเธซเธฑเธช PIN เธเธฅเธญเธ”เธ เธฑเธข
 * @returns {Object}
 */
function adminLogin(email, pin) {
  try {
    const adminAuth = verifyAdminEmail(email);
    if (!adminAuth.authorized) {
      logAudit('LOGIN_FAILED', email, 'เธญเธตเน€เธกเธฅเนเธกเนเธกเธตเธชเธดเธ—เธเธดเนเน€เธเนเธฒเนเธเนเธเธฒเธเธฃเธฐเธเธ');
      return { success: false, message: 'เธญเธตเน€เธกเธฅเธเธตเนเนเธกเนเนเธ”เนเธฃเธฑเธเธชเธดเธ—เธเธดเนเน€เธเนเธฒเนเธเนเธเธฒเธเธฃเธฐเธเธเน€เธเนเธฒเธซเธเนเธฒเธ—เธตเน' };
    }

    // เธ•เธฃเธงเธเธชเธญเธ PIN เธชเธณเธฃเธญเธ (เธซเธฃเธทเธญ Master PIN)
    const masterPin = getAdminSecretPin();
    if (pin && pin !== masterPin) {
      logAudit('LOGIN_FAILED', email, 'เธฃเธซเธฑเธช PIN เนเธกเนเธ–เธนเธเธ•เนเธญเธ');
      return { success: false, message: 'เธฃเธซเธฑเธช PIN เธชเธณเธซเธฃเธฑเธเน€เธเนเธฒเธซเธเนเธฒเธ—เธตเนเนเธกเนเธ–เธนเธเธ•เนเธญเธ' };
    }

    // เธชเธฃเนเธฒเธ Token เธเธฃเธฐเธเธณ Session (เธซเธกเธ”เธญเธฒเธขเธธเนเธ 8 เธเธฑเนเธงเนเธกเธ)
    const sessionToken = Utilities.base64Encode(
      JSON.stringify({
        email: email,
        role: adminAuth.role,
        exp: new Date().getTime() + (8 * 60 * 60 * 1000)
      })
    );

    logAudit('LOGIN_SUCCESS', email, `เน€เธเนเธฒเธชเธนเนเธฃเธฐเธเธเธชเธณเน€เธฃเนเธเนเธเธเธ—เธเธฒเธ— ${adminAuth.role}`, email);

    return {
      success: true,
      token: sessionToken,
      user: {
        email: email,
        name: adminAuth.name,
        role: adminAuth.role
      }
    };
  } catch (err) {
    console.error('เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เนเธเธเธฒเธฃเธฅเนเธญเธเธญเธดเธ:', err);
    return { success: false, message: 'เธฃเธฐเธเธเน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”: ' + err.message };
  }
}

/**
 * เธ”เธถเธเธฃเธฒเธขเธเธฒเธฃเธเธนเนเธชเธกเธฑเธเธฃเธ•เธฒเธกเน€เธเธทเนเธญเธเนเธเธ•เธฑเธงเธเธฃเธญเธ (เธ•เธฒเธฃเธฒเธเธฃเธงเธก: เธเนเธญเธเน€เธฅเธเธเธฑเธ•เธฃ เธเธเธ. เธ•เธฒเธก PDPA)
 * @param {Object} filter { search, academicYear, level, major, status, province, page, pageSize }
 * @param {string} adminEmail 
 * @returns {Object}
 */
function getApplicantsList(filter = {}, adminEmail = '') {
  try {
    const auth = verifyAdminEmail(adminEmail);
    if (!auth.authorized) {
      return { success: false, message: 'เนเธกเนเธกเธตเธชเธดเธ—เธเธดเนเน€เธเนเธฒเธ–เธถเธเธเนเธญเธกเธนเธฅเธชเนเธงเธเธเธตเน' };
    }

    let rows = getSheetDataAsObjects(SHEETS.APPLICANTS);

    // เธ•เธฑเธงเธเธฃเธญเธ
    if (filter.academicYear) {
      rows = rows.filter(r => String(r.academic_year) === String(filter.academicYear));
    }
    if (filter.level) {
      rows = rows.filter(r => r.education_level === filter.level);
    }
    if (filter.major) {
      rows = rows.filter(r => r.quota_major_1 === filter.major || r.quota_major_2 === filter.major);
    }
    if (filter.status) {
      rows = rows.filter(r => r.current_status === filter.status);
    }
    if (filter.province) {
      rows = rows.filter(r => r.province === filter.province);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase().trim();
      rows = rows.filter(r => 
        (r.application_no && r.application_no.toLowerCase().includes(q)) ||
        (r.first_name && r.first_name.toLowerCase().includes(q)) ||
        (r.last_name && r.last_name.toLowerCase().includes(q)) ||
        (r.phone && r.phone.includes(q)) ||
        (r.current_school_name && r.current_school_name.toLowerCase().includes(q))
      );
    }

    // เน€เธฃเธตเธขเธเธฅเธณเธ”เธฑเธเธฅเนเธฒเธชเธธเธ”เธเธถเนเธเธเนเธญเธ
    rows.sort((a, b) => new Date(b.apply_date) - new Date(a.apply_date));

    const totalCount = rows.length;
    const page = parseInt(filter.page || '1', 10);
    const pageSize = parseInt(filter.pageSize || '20', 10);
    const startIndex = (page - 1) * pageSize;
    const paginatedRows = rows.slice(startIndex, startIndex + pageSize);

    // เธเนเธญเธเน€เธฅเธเธเธฑเธ•เธฃเธเธฃเธฐเธเธฒเธเธ (PDPA Masking) เนเธเธ•เธฒเธฃเธฒเธเธฃเธงเธก
    const safeData = paginatedRows.map(r => ({
      application_no: r.application_no,
      apply_date: formatThaiDate(r.apply_date),
      education_level: r.education_level,
      full_name: `${r.title}${r.first_name} ${r.last_name}`,
      masked_citizen_id: maskCitizenId(r.citizen_id),
      phone: r.phone,
      current_school_name: r.current_school_name,
      gpax: r.gpax,
      quota_major_1: r.quota_major_1,
      quota_major_2: r.quota_major_2,
      current_status: r.current_status,
      rejection_remarks: r.rejection_remarks,
      pdf_drive_id: r.pdf_drive_id
    }));

    return {
      success: true,
      totalCount: totalCount,
      page: page,
      totalPages: Math.ceil(totalCount / pageSize),
      data: safeData
    };
  } catch (err) {
    console.error('เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เนเธเธเธฒเธฃเธ”เธถเธเธฃเธฒเธขเธเธฒเธฃเธเธนเนเธชเธกเธฑเธเธฃ:', err);
    return { success: false, message: 'เธฃเธฐเธเธเน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”: ' + err.message };
  }
}

/**
 * เธ”เธถเธเธฃเธฒเธขเธฅเธฐเน€เธญเธตเธขเธ”เธเธนเนเธชเธกเธฑเธเธฃเธฃเธฒเธขเธเธธเธเธเธฅเนเธเธเน€เธ•เนเธก (เน€เธเธเธฒเธฐเธเธนเนเธกเธตเธชเธดเธ—เธเธดเน) เธเธฃเนเธญเธกเธฃเธฒเธขเธเธฒเธฃเนเธเธฅเนเนเธเธเนเธฅเธฐเธเธฃเธฐเธงเธฑเธ•เธด Log
 * @param {string} applicationNo 
 * @param {string} adminEmail 
 * @returns {Object}
 */
function getApplicantDetails(applicationNo, adminEmail) {
  try {
    const auth = verifyAdminEmail(adminEmail);
    if (!auth.authorized) {
      return { success: false, message: 'เนเธกเนเธกเธตเธชเธดเธ—เธเธดเนเน€เธเนเธฒเธ–เธถเธเธเนเธญเธกเธนเธฅเธชเนเธงเธเธเธตเน' };
    }

    const applicant = findRowObject(SHEETS.APPLICANTS, 'application_no', applicationNo);
    if (!applicant) {
      return { success: false, message: 'เนเธกเนเธเธเธเนเธญเธกเธนเธฅเธเธนเนเธชเธกเธฑเธเธฃ' };
    }

    // เธ”เธถเธเธฃเธฒเธขเธเธฒเธฃเน€เธญเธเธชเธฒเธฃเนเธเธ
    const allDocs = getSheetDataAsObjects(SHEETS.DOCUMENTS);
    const applicantDocs = allDocs.filter(d => d.application_no === applicationNo);

    // เธ”เธถเธเธเธฃเธฐเธงเธฑเธ•เธดเธชเธ–เธฒเธเธฐ (StatusLog)
    const allLogs = getSheetDataAsObjects(SHEETS.STATUS_LOG);
    const applicantLogs = allLogs.filter(l => l.application_no === applicationNo);

    logAudit('VIEW_APPLICANT', applicationNo, `เน€เธเธดเธ”เธ”เธนเธฃเธฒเธขเธฅเธฐเน€เธญเธตเธขเธ”เธเธนเนเธชเธกเธฑเธเธฃ ${applicant.first_name}`, adminEmail);

    return {
      success: true,
      applicant: applicant,
      documents: applicantDocs,
      statusLogs: applicantLogs
    };
  } catch (err) {
    console.error('เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เนเธเธเธฒเธฃเธ”เธถเธเธฃเธฒเธขเธฅเธฐเน€เธญเธตเธขเธ”เธเธนเนเธชเธกเธฑเธเธฃ:', err);
    return { success: false, message: 'เธฃเธฐเธเธเน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”: ' + err.message };
  }
}

/**
 * เน€เธเธฅเธตเนเธขเธเธชเธ–เธฒเธเธฐเนเธเธชเธกเธฑเธเธฃ (เนเธเธเธฃเธฒเธขเธเธธเธเธเธฅ)
 * @param {string} applicationNo เน€เธฅเธเธ—เธตเนเนเธเธชเธกเธฑเธเธฃ
 * @param {string} newStatus เธชเธ–เธฒเธเธฐเนเธซเธกเน
 * @param {string} remarks เธซเธกเธฒเธขเน€เธซเธ•เธธ
 * @param {Array<Object>} docFeedbacks เธชเธ–เธฒเธเธฐเน€เธญเธเธชเธฒเธฃเธฃเธฒเธขเธเธดเนเธ [{ doc_id, verification_status, feedback_note }]
 * @param {string} adminEmail 
 * @returns {Object}
 */
function updateApplicantStatus(applicationNo, newStatus, remarks, docFeedbacks = [], adminEmail = '') {
  try {
    const auth = verifyAdminEmail(adminEmail);
    if (!auth.authorized) {
      return { success: false, message: 'เนเธกเนเธกเธตเธชเธดเธ—เธเธดเนเธ”เธณเน€เธเธดเธเธเธฒเธฃเธเธตเน' };
    }

    const applicant = findRowObject(SHEETS.APPLICANTS, 'application_no', applicationNo);
    if (!applicant) {
      return { success: false, message: 'เนเธกเนเธเธเธเนเธญเธกเธนเธฅเนเธเธชเธกเธฑเธเธฃ' };
    }

    const oldStatus = applicant.current_status;
    const nowStr = Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyyy-MM-dd HH:mm:ss');

    // 1. เธญเธฑเธเน€เธ”เธ•เนเธ Applicants
    updateRowByKeyValue(SHEETS.APPLICANTS, 'application_no', applicationNo, {
      current_status: newStatus,
      rejection_remarks: remarks || '',
      updated_at: nowStr
    });

    // 2. เธญเธฑเธเน€เธ”เธ•เธเธฅเธเธฒเธฃเธ•เธฃเธงเธเน€เธญเธเธชเธฒเธฃเธฃเธฒเธขเธเธดเนเธ (เธ–เนเธฒเธกเธต)
    if (docFeedbacks && docFeedbacks.length > 0) {
      docFeedbacks.forEach(docFeedback => {
        if (docFeedback.doc_id) {
          updateRowByKeyValue(SHEETS.DOCUMENTS, 'doc_id', docFeedback.doc_id, {
            verification_status: docFeedback.verification_status,
            feedback_note: docFeedback.feedback_note || ''
          });
        }
      });
    }

    // 3. เธเธฑเธเธ—เธถเธเธเธฃเธฐเธงเธฑเธ•เธดเนเธ StatusLog
    appendRowObject(SHEETS.STATUS_LOG, {
      log_id: 'LOG-' + Utilities.getUuid().substring(0, 8),
      application_no: applicationNo,
      old_status: oldStatus,
      new_status: newStatus,
      remarks: remarks || '',
      changed_by: adminEmail || 'OFFICER',
      timestamp: nowStr
    });

    // 4. เนเธเนเธเน€เธ•เธทเธญเธเธเธนเนเธชเธกเธฑเธเธฃเธญเธฑเธ•เนเธเธกเธฑเธ•เธด (Email + LINE)
    notifyApplicantStatusChanged(applicant, newStatus, remarks);

    // 5. เธเธฑเธเธ—เธถเธ Audit Log
    logAudit('CHANGE_STATUS', applicationNo, `เน€เธเธฅเธตเนเธขเธเธชเธ–เธฒเธเธฐเธเธฒเธ ${oldStatus} เน€เธเนเธ ${newStatus} (${remarks})`, adminEmail);

    return {
      success: true,
      message: `เน€เธเธฅเธตเนเธขเธเธชเธ–เธฒเธเธฐเนเธเธชเธกเธฑเธเธฃ ${applicationNo} เน€เธเนเธ "${newStatus}" เน€เธฃเธตเธขเธเธฃเนเธญเธขเนเธฅเนเธง`
    };
  } catch (err) {
    console.error('เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เนเธเธเธฒเธฃเน€เธเธฅเธตเนเธขเธเธชเธ–เธฒเธเธฐ:', err);
    return { success: false, message: 'เธฃเธฐเธเธเน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”: ' + err.message };
  }
}

/**
 * เน€เธเธฅเธตเนเธขเธเธชเธ–เธฒเธเธฐเธเธนเนเธชเธกเธฑเธเธฃเนเธเธเน€เธฅเธทเธญเธเธเธฃเนเธญเธกเธเธฑเธเธซเธฅเธฒเธขเธฃเธฒเธข (Batch Update)
 * @param {Array<string>} applicationNos เธฃเธฒเธขเธเธฒเธฃเน€เธฅเธเธ—เธตเนเนเธเธชเธกเธฑเธเธฃ
 * @param {string} newStatus เธชเธ–เธฒเธเธฐเนเธซเธกเน
 * @param {string} remarks เธซเธกเธฒเธขเน€เธซเธ•เธธ
 * @param {string} adminEmail 
 * @returns {Object}
 */
function batchUpdateApplicantStatus(applicationNos, newStatus, remarks, adminEmail) {
  try {
    const auth = verifyAdminEmail(adminEmail);
    if (!auth.authorized) {
      return { success: false, message: 'เนเธกเนเธกเธตเธชเธดเธ—เธเธดเนเธ”เธณเน€เธเธดเธเธเธฒเธฃเธเธตเน' };
    }

    let successCount = 0;
    applicationNos.forEach(appNo => {
      const res = updateApplicantStatus(appNo, newStatus, remarks, [], adminEmail);
      if (res.success) successCount++;
    });

    return {
      success: true,
      message: `เธเธฃเธฑเธเธชเธ–เธฒเธเธฐเธชเธณเน€เธฃเนเธเธ—เธฑเนเธเธซเธกเธ” ${successCount} เธเธฒเธ ${applicationNos.length} เธฃเธฒเธขเธเธฒเธฃ`
    };
  } catch (err) {
    return { success: false, message: 'เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”: ' + err.message };
  }
}

/**
 * เธเธฑเธเธ—เธถเธเธเธฒเธฃเธกเธญเธเธ•เธฑเธงเธเธฑเธเน€เธฃเธตเธขเธ-เธเธฑเธเธจเธถเธเธฉเธฒเนเธซเธกเน (Phase 2)
 * @param {Object} enrollData เธเนเธญเธกเธนเธฅเธเธฒเธฃเธกเธญเธเธ•เธฑเธง
 * @param {string} adminEmail 
 * @returns {Object}
 */
function enrollApplicant(enrollData, adminEmail) {
  try {
    const auth = verifyAdminEmail(adminEmail);
    if (!auth.authorized) {
      return { success: false, message: 'เนเธกเนเธกเธตเธชเธดเธ—เธเธดเนเธ”เธณเน€เธเธดเธเธเธฒเธฃเธเธตเน' };
    }

    const applicationNo = enrollData.application_no;
    const applicant = findRowObject(SHEETS.APPLICANTS, 'application_no', applicationNo);

    if (!applicant) {
      return { success: false, message: 'เนเธกเนเธเธเธเนเธญเธกเธนเธฅเนเธเธชเธกเธฑเธเธฃ' };
    }

    if (applicant.current_status !== APPLICATION_STATUS.PASSED && applicant.current_status !== APPLICATION_STATUS.ENROLLED) {
      return { success: false, message: 'เธเธนเนเธชเธกเธฑเธเธฃเธ•เนเธญเธเธญเธขเธนเนเนเธเธชเธ–เธฒเธเธฐ "เธเนเธฒเธเธเธฒเธฃเธเธฑเธ”เน€เธฅเธทเธญเธ" เธเธถเธเธเธฐเธชเธฒเธกเธฒเธฃเธ–เธ—เธณเธเธฒเธฃเธกเธญเธเธ•เธฑเธงเนเธ”เน' };
    }

    // เธชเธฃเนเธฒเธเธฃเธซเธฑเธชเธเธฑเธเน€เธฃเธตเธขเธเนเธซเธกเน
    const studentId = enrollData.student_id || generateNextStudentId();
    const enrollNo = 'ENR-' + studentId;
    const nowStr = Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyyy-MM-dd HH:mm:ss');

    const enrollRecord = {
      enrollment_no: enrollNo,
      application_no: applicationNo,
      student_id: studentId,
      assigned_major: enrollData.assigned_major || applicant.quota_major_1,
      guardian_name: sanitizeInput(enrollData.guardian_name),
      guardian_relation: sanitizeInput(enrollData.guardian_relation),
      guardian_phone: sanitizeInput(enrollData.guardian_phone),
      guardian_occupation: sanitizeInput(enrollData.guardian_occupation),
      witness_1_name: sanitizeInput(enrollData.witness_1_name),
      witness_2_name: sanitizeInput(enrollData.witness_2_name),
      enroll_date: nowStr,
      officer_email: adminEmail,
      enroll_pdf_id: ''
    };

    // เธชเธฃเนเธฒเธ PDF เนเธเธกเธญเธเธ•เธฑเธง
    let enrollPdfId = '';
    try {
      enrollPdfId = generateEnrollmentPdf(enrollRecord, applicant);
      enrollRecord.enroll_pdf_id = enrollPdfId;
    } catch (err) {
      console.warn('เธชเธฃเนเธฒเธ PDF เนเธเธกเธญเธเธ•เธฑเธงเนเธกเนเธชเธณเน€เธฃเนเธ:', err);
    }

    // เธเธฑเธเธ—เธถเธเธฅเธเธเธตเธ• Enrollments
    appendRowObject(SHEETS.ENROLLMENTS, enrollRecord);

    // เธเธฃเธฑเธเธชเธ–เธฒเธเธฐเธเธนเนเธชเธกเธฑเธเธฃเน€เธเนเธ "เธกเธญเธเธ•เธฑเธงเนเธฅเนเธง"
    updateRowByKeyValue(SHEETS.APPLICANTS, 'application_no', applicationNo, {
      current_status: APPLICATION_STATUS.ENROLLED,
      updated_at: nowStr
    });

    // เธเธฑเธเธ—เธถเธ StatusLog
    appendRowObject(SHEETS.STATUS_LOG, {
      log_id: 'LOG-' + Utilities.getUuid().substring(0, 8),
      application_no: applicationNo,
      old_status: applicant.current_status,
      new_status: APPLICATION_STATUS.ENROLLED,
      remarks: `เธกเธญเธเธ•เธฑเธงเน€เธฃเธตเธขเธเธฃเนเธญเธขเนเธฅเนเธง เนเธ”เนเธฃเธฑเธเธฃเธซเธฑเธชเธเธฑเธเน€เธฃเธตเธขเธ: ${studentId}`,
      changed_by: adminEmail,
      timestamp: nowStr
    });

    logAudit('ENROLL_STUDENT', applicationNo, `เธเธฑเธเธ—เธถเธเธกเธญเธเธ•เธฑเธงเธฃเธซเธฑเธชเธเธฑเธเน€เธฃเธตเธขเธ ${studentId}`, adminEmail);

    return {
      success: true,
      studentId: studentId,
      enrollPdfId: enrollPdfId,
      message: `เธเธฑเธเธ—เธถเธเธเธฒเธฃเธกเธญเธเธ•เธฑเธงเธชเธณเน€เธฃเนเธ เธฃเธซเธฑเธชเธเธฑเธเน€เธฃเธตเธขเธ: ${studentId}`
    };
  } catch (err) {
    console.error('เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เนเธเธเธฒเธฃเธกเธญเธเธ•เธฑเธง:', err);
    return { success: false, message: 'เธฃเธฐเธเธเน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”: ' + err.message };
  }
}

/**
 * เธ”เธถเธเธเนเธญเธกเธนเธฅเธชเธ–เธดเธ•เธดเธชเธณเธซเธฃเธฑเธ Dashboard (Phase 2)
 * @param {string} adminEmail 
 * @returns {Object}
 */
function getDashboardStats(adminEmail) {
  try {
    const auth = verifyAdminEmail(adminEmail);
    if (!auth.authorized) {
      return { success: false, message: 'เนเธกเนเธกเธตเธชเธดเธ—เธเธดเนเน€เธเนเธฒเธ–เธถเธ' };
    }

    const applicants = getSheetDataAsObjects(SHEETS.APPLICANTS);
    const total = applicants.length;

    // เนเธขเธเธ•เธฒเธกเธชเธ–เธฒเธเธฐ
    const statusCounts = {};
    Object.values(APPLICATION_STATUS).forEach(s => statusCounts[s] = 0);
    applicants.forEach(a => {
      const s = a.current_status || APPLICATION_STATUS.PENDING;
      statusCounts[s] = (statusCounts[s] || 0) + 1;
    });

    // เนเธขเธเธ•เธฒเธกเธฃเธฐเธ”เธฑเธ
    const levelCounts = {};
    applicants.forEach(a => {
      const l = a.education_level || 'เนเธกเนเธฃเธฐเธเธธ';
      levelCounts[l] = (levelCounts[l] || 0) + 1;
    });

    // เนเธขเธเธ•เธฒเธกเธชเธฒเธเธฒเธงเธดเธเธฒ (เธญเธฑเธเธ”เธฑเธ 1)
    const majorCounts = {};
    applicants.forEach(a => {
      const m = a.quota_major_1 || 'เนเธกเนเธฃเธฐเธเธธ';
      majorCounts[m] = (majorCounts[m] || 0) + 1;
    });

    // เนเธขเธเธ•เธฒเธกเธเนเธญเธเธ—เธฒเธเธ—เธตเนเธฃเธนเนเธเธฑเธเธงเธดเธ—เธขเธฒเธฅเธฑเธข
    const referralCounts = {};
    applicants.forEach(a => {
      const r = a.referral_source || 'เนเธกเนเธฃเธฐเธเธธ';
      referralCounts[r] = (referralCounts[r] || 0) + 1;
    });

    // เนเธขเธเธ•เธฒเธกเธเธฑเธเธซเธงเธฑเธ”เธ—เธตเนเธญเธขเธนเน
    const provinceCounts = {};
    applicants.forEach(a => {
      const p = a.province || 'เนเธกเนเธฃเธฐเธเธธ';
      provinceCounts[p] = (provinceCounts[p] || 0) + 1;
    });

    // เธชเธ–เธดเธ•เธดเธฃเธฒเธขเธงเธฑเธ (7 เธงเธฑเธเธฅเนเธฒเธชเธธเธ”)
    const dailyCounts = {};
    applicants.forEach(a => {
      if (a.apply_date) {
        const dateKey = String(a.apply_date).split(' ')[0];
        dailyCounts[dateKey] = (dailyCounts[dateKey] || 0) + 1;
      }
    });

    return {
      success: true,
      stats: {
        totalApplicants: total,
        pendingReview: statusCounts[APPLICATION_STATUS.PENDING] || 0,
        passed: statusCounts[APPLICATION_STATUS.PASSED] || 0,
        enrolled: statusCounts[APPLICATION_STATUS.ENROLLED] || 0,
        incomplete: statusCounts[APPLICATION_STATUS.INCOMPLETE] || 0,
        statusCounts: statusCounts,
        levelCounts: levelCounts,
        majorCounts: majorCounts,
        referralCounts: referralCounts,
        provinceCounts: provinceCounts,
        dailyCounts: dailyCounts
      }
    };
  } catch (err) {
    console.error('เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เนเธเธเธฒเธฃเธเธณเธเธงเธ“เนเธ”เธเธเธญเธฃเนเธ”:', err);
    return { success: false, message: 'เธฃเธฐเธเธเน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”: ' + err.message };
  }
}

/**
 * เธชเนเธเธญเธญเธเธเนเธญเธกเธนเธฅเธเธนเนเธชเธกเธฑเธเธฃเนเธเธฃเธนเธเนเธเธ CSV (UTF-8 with BOM) เธชเธณเธซเธฃเธฑเธเธเธณเน€เธเนเธฒ เธจเธ.02
 * @param {Object} filter 
 * @param {string} adminEmail 
 * @returns {Object} { csvContent: string, fileName: string }
 */
function exportApplicantsCsv(filter = {}, adminEmail = '') {
  try {
    const auth = verifyAdminEmail(adminEmail);
    if (!auth.authorized) {
      return { success: false, message: 'เนเธกเนเธกเธตเธชเธดเธ—เธเธดเนเธชเนเธเธญเธญเธเธเนเธญเธกเธนเธฅ' };
    }

    const res = getApplicantsList(filter, adminEmail);
    if (!res.success) return res;

    // เน€เธเธทเนเธญเธเธฒเธฃเธเธณเน€เธเนเธฒเธฃเธฐเธเธเธ—เธฐเน€เธเธตเธขเธ เธจเธ.02 เธเธฐเธ”เธถเธเธเนเธญเธกเธนเธฅเธเธเธฑเธเน€เธ•เนเธก
    let allApplicants = getSheetDataAsObjects(SHEETS.APPLICANTS);
    if (filter.status) allApplicants = allApplicants.filter(r => r.current_status === filter.status);
    if (filter.level) allApplicants = allApplicants.filter(r => r.education_level === filter.level);
    if (filter.major) allApplicants = allApplicants.filter(r => r.quota_major_1 === filter.major);

    // เธซเธฑเธงเธ•เธฒเธฃเธฒเธเธกเธฒเธ•เธฃเธเธฒเธ เธจเธ.02
    const csvHeaders = [
      'เน€เธฅเธเธ—เธตเนเนเธเธชเธกเธฑเธเธฃ', 'เธงเธฑเธเธ—เธตเนเธชเธกเธฑเธเธฃ', 'เธฃเธฐเธ”เธฑเธเธเธฑเนเธ', 'เธเธณเธเธณเธซเธเนเธฒ', 'เธเธทเนเธญ', 'เธเธฒเธกเธชเธเธธเธฅ',
      'เน€เธฅเธเธเธฃเธฐเธเธณเธ•เธฑเธงเธเธฃเธฐเธเธฒเธเธ', 'เธงเธฑเธเน€เธ”เธทเธญเธเธเธตเน€เธเธดเธ”', 'เน€เธเธญเธฃเนเนเธ—เธฃเธจเธฑเธเธ—เน', 'เธญเธตเน€เธกเธฅ',
      'เน€เธเธฃเธ”เน€เธเธฅเธตเนเธข_GPAX', 'เนเธฃเธเน€เธฃเธตเธขเธเน€เธ”เธดเธก', 'เธเธฑเธเธซเธงเธฑเธ”เนเธฃเธเน€เธฃเธตเธขเธ', 'เธชเธฒเธเธฒเธ—เธตเนเธชเธกเธฑเธเธฃ_1', 'เธชเธฒเธเธฒเธ—เธตเนเธชเธกเธฑเธเธฃ_2',
      'เธเธทเนเธญเธเธดเธ”เธฒ', 'เธญเธฒเธเธตเธเธเธดเธ”เธฒ', 'เธเธทเนเธญเธกเธฒเธฃเธ”เธฒ', 'เธญเธฒเธเธตเธเธกเธฒเธฃเธ”เธฒ',
      'เธเนเธฒเธเน€เธฅเธเธ—เธตเน', 'เธซเธกเธนเน', 'เธ•เธณเธเธฅ', 'เธญเธณเน€เธ เธญ', 'เธเธฑเธเธซเธงเธฑเธ”', 'เธฃเธซเธฑเธชเนเธเธฃเธฉเธ“เธตเธขเน', 'เธชเธ–เธฒเธเธฐเนเธเธชเธกเธฑเธเธฃ'
    ];

    const escapeCsv = (val) => {
      const s = String(val !== undefined && val !== null ? val : '').replace(/"/g, '""');
      return `"${s}"`;
    };

    let csvString = '\uFEFF'; // เนเธชเน UTF-8 BOM เน€เธเธทเนเธญเนเธซเนเน€เธเธดเธ”เนเธ Microsoft Excel เธ เธฒเธฉเธฒเนเธ—เธขเนเธกเนเน€เธเนเธเธ เธฒเธฉเธฒเธ•เนเธฒเธเธ”เธฒเธง
    csvString += csvHeaders.map(escapeCsv).join(',') + '\r\n';

    allApplicants.forEach(a => {
      const row = [
        a.application_no, a.apply_date, a.education_level, a.title, a.first_name, a.last_name,
        // เธชเธณเธซเธฃเธฑเธ เธจเธ.02 เนเธชเธ”เธเน€เธฅเธเธเธฑเธ•เธฃเธเธฃเธฐเธเธฒเธเธเธเธฃเธเธ–เนเธงเธ (เธเธนเนเธชเนเธเธญเธญเธเธกเธตเธชเธดเธ—เธเธดเน)
        a.citizen_id, a.birth_date, a.phone, a.email,
        a.gpax, a.current_school_name, a.school_province, a.quota_major_1, a.quota_major_2,
        a.father_name, a.father_occupation, a.mother_name, a.mother_occupation,
        a.address_no, a.address_moo, a.subdistrict, a.district, a.province, a.zipcode, a.current_status
      ];
      csvString += row.map(escapeCsv).join(',') + '\r\n';
    });

    logAudit('EXPORT_CSV', `${allApplicants.length}_RECORDS`, 'เธชเนเธเธญเธญเธเธเนเธญเธกเธนเธฅเธเธนเนเธชเธกเธฑเธเธฃเน€เธเนเธ CSV เธชเธณเธซเธฃเธฑเธเธฃเธฐเธเธ เธจเธ.02', adminEmail);

    const fileName = `เธฃเธฒเธขเธเธทเนเธญเธเธนเนเธชเธกเธฑเธเธฃเนเธเธงเธ•เธฒ_${DEFAULT_CONFIG.ACADEMIC_YEAR}_${Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyyyMMdd_HHmm')}.csv`;

    return {
      success: true,
      fileName: fileName,
      csvContent: Utilities.base64Encode(Utilities.newBlob(csvString).getBytes())
    };
  } catch (err) {
    console.error('เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เนเธเธเธฒเธฃเธชเนเธเธญเธญเธ CSV:', err);
    return { success: false, message: 'เธฃเธฐเธเธเน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”: ' + err.message };
  }
}
/**
 * เธฃเธฐเธเธเธฃเธฑเธเธชเธกเธฑเธเธฃเน€เธฃเธตเธขเธเธญเธญเธเนเธฅเธเน (เนเธเธงเธ•เธฒ) เธงเธดเธ—เธขเธฒเธฅเธฑเธขเน€เธ—เธเธเธดเธเธ—เนเธฒเธซเธฅเธงเธเธเธดเน€เธกเธเธ•เนเนเธ—เธขเธญเธเธธเธชเธฃเธ“เน
 * เนเธเธฅเน: Setup.js
 * เธซเธเนเธฒเธ—เธตเน: เธชเธเธฃเธดเธเธ•เนเธ•เธดเธ”เธ•เธฑเนเธเธฃเธฐเธเธเธญเธฑเธ•เนเธเธกเธฑเธ•เธด (setup()) เธชเธฃเนเธฒเธเธเธตเธ• 8 เนเธเนเธเธเธฒเธ, เธเนเธฒเธ•เธฑเนเธเธ•เนเธ, เธชเธดเธ—เธเธดเนเนเธญเธ”เธกเธดเธ, เนเธเธฅเน€เธ”เธญเธฃเน Drive เนเธฅเธฐ Docs Template
 */

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create('เธเธฒเธเธเนเธญเธกเธนเธฅเธฃเธฐเธเธเธฃเธฑเธเธชเธกเธฑเธเธฃเนเธเธงเธ•เธฒ 2570 - เธงเธ—.เธ—เนเธฒเธซเธฅเธงเธเธฏ');
  const ssId = ss.getId();
  setProp('SPREADSHEET_ID', ssId);

  console.log('เน€เธฃเธดเนเธกเธเธฒเธฃเธ•เธฑเนเธเธเนเธฒเธฃเธฐเธเธเนเธฅเธฐเธชเธฃเนเธฒเธเธเธตเธ•เธเธฒเธเธเนเธญเธกเธนเธฅ...');

  // 1. เธเธดเธขเธฒเธกเนเธเธฃเธเธชเธฃเนเธฒเธเธเธญเธฅเธฑเธกเธเนเธเธญเธเธ—เธฑเนเธ 8 เธเธตเธ•
  const sheetDefinitions = {
    [SHEETS.APPLICANTS]: [
      'application_no', 'apply_date', 'academic_year', 'education_level',
      'title', 'first_name', 'last_name', 'citizen_id', 'birth_date',
      'father_name', 'father_age', 'father_occupation',
      'mother_name', 'mother_age', 'mother_occupation',
      'address_no', 'address_moo', 'address_soi', 'address_road',
      'subdistrict', 'district', 'province', 'zipcode', 'phone', 'email',
      'current_school_level', 'current_school_name',
      'school_address_no', 'school_subdistrict', 'school_district', 'school_province',
      'gpax', 'prev_major', 'quota_major_1', 'quota_major_2',
      'referral_source', 'current_status', 'rejection_remarks',
      'pdpa_consent', 'applicant_signature_text', 'pdf_drive_id', 'line_user_id', 'updated_at'
    ],
    [SHEETS.DOCUMENTS]: [
      'doc_id', 'application_no', 'doc_type', 'file_name',
      'drive_file_id', 'mime_type', 'file_size', 'upload_date',
      'verification_status', 'feedback_note'
    ],
    [SHEETS.STATUS_LOG]: [
      'log_id', 'application_no', 'old_status', 'new_status',
      'remarks', 'changed_by', 'timestamp'
    ],
    [SHEETS.ADMINS]: [
      'admin_id', 'email', 'full_name', 'role', 'is_active', 'created_at'
    ],
    [SHEETS.CONFIG]: [
      'key', 'value', 'description'
    ],
    [SHEETS.TEMPLATES]: [
      'template_key', 'channel', 'subject', 'body_template'
    ],
    [SHEETS.ENROLLMENTS]: [
      'enrollment_no', 'application_no', 'student_id', 'assigned_major',
      'guardian_name', 'guardian_relation', 'guardian_phone', 'guardian_occupation',
      'witness_1_name', 'witness_2_name', 'enroll_date', 'officer_email', 'enroll_pdf_id'
    ],
    [SHEETS.AUDIT_LOG]: [
      'audit_id', 'user_identity', 'action', 'target_id', 'details', 'timestamp'
    ]
  };

  // 2. เธชเธฃเนเธฒเธเธเธตเธ•เนเธฅเธฐเนเธชเนเธซเธฑเธงเธ•เธฒเธฃเธฒเธ
  Object.keys(sheetDefinitions).forEach(sheetName => {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      console.log(`เธชเธฃเนเธฒเธเธเธตเธ•: ${sheetName}`);
    }

    const headers = sheetDefinitions[sheetName];
    // เธ–เนเธฒเนเธ–เธงเนเธฃเธเธขเธฑเธเนเธกเนเธกเธตเธเนเธญเธกเธนเธฅ
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // เธเธฑเธ”เธฃเธนเธเนเธเธเธซเธฑเธงเธ•เธฒเธฃเธฒเธ: เธชเธตเธเนเธณเน€เธเธดเธเน€เธเนเธก เธ•เธฑเธงเธญเธฑเธเธฉเธฃเธเธฒเธง เธซเธเธฒ เนเธฅเธฐเธ•เธฃเธถเธเนเธ–เธงเธ—เธตเน 1
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#1e3a8a')
                 .setFontColor('#ffffff')
                 .setFontWeight('bold')
                 .setHorizontalAlignment('center');
      sheet.setFrozenRows(1);
    }
  });

  // เธฅเธ Sheet1 เน€เธฃเธดเนเธกเธ•เนเธเธ–เนเธฒเธกเธต
  const defaultSheet = ss.getSheetByName('Sheet1') || ss.getSheetByName('เนเธเนเธเธเธฒเธ1');
  if (defaultSheet && ss.getSheets().length > 1) {
    try { ss.deleteSheet(defaultSheet); } catch (e) {}
  }

  // 3. เธเธณเธซเธเธ”เธเนเธญเธกเธนเธฅเธ•เธฑเนเธเธ•เนเธเนเธเธเธตเธ• Config
  const configSheet = ss.getSheetByName(SHEETS.CONFIG);
  if (configSheet.getLastRow() <= 1) {
    const configData = [
      ['ACADEMIC_YEAR', '2570', 'เธเธตเธเธฒเธฃเธจเธถเธเธฉเธฒเธ—เธตเนเน€เธเธดเธ”เธฃเธฑเธเธชเธกเธฑเธเธฃ'],
      ['COLLEGE_NAME', 'เธงเธดเธ—เธขเธฒเธฅเธฑเธขเน€เธ—เธเธเธดเธเธ—เนเธฒเธซเธฅเธงเธเธเธดเน€เธกเธเธ•เนเนเธ—เธขเธญเธเธธเธชเธฃเธ“เน', 'เธเธทเนเธญเธชเธ–เธฒเธเธจเธถเธเธฉเธฒ'],
      ['SYSTEM_STATUS', 'OPEN', 'เธชเธ–เธฒเธเธฐเธฃเธฐเธเธเธฃเธฑเธเธชเธกเธฑเธเธฃ (OPEN / CLOSED)'],
      ['OPEN_DATE', '2026-11-01', 'เธงเธฑเธเธ—เธตเนเน€เธฃเธดเนเธกเน€เธเธดเธ”เธฃเธฑเธเธชเธกเธฑเธเธฃ'],
      ['CLOSE_DATE', '2027-02-28', 'เธงเธฑเธเธ—เธตเนเธเธดเธ”เธฃเธฑเธเธชเธกเธฑเธเธฃ'],
      ['QUOTA_PREFIX', 'Q70-', 'เธเธณเธเธณเธซเธเนเธฒเน€เธฅเธเธ—เธตเนเนเธเธชเธกเธฑเธเธฃ'],
      ['STUDENT_ID_PREFIX', '7020101', 'เธเธณเธเธณเธซเธเนเธฒเธฃเธซเธฑเธชเธเธฑเธเน€เธฃเธตเธขเธเนเธซเธกเน'],
      ['', '', ''],
      ['--- เธ•เธฒเธฃเธฒเธเธชเธฒเธเธฒเธงเธดเธเธฒเธ—เธตเนเน€เธเธดเธ”เธฃเธฑเธเธชเธกเธฑเธเธฃ ---', '', ''],
      ['level', 'major_code', 'major_name', 'quota_limit', 'is_active']
    ];

    getDefaultMajors().forEach(m => {
      configData.push([m.level, m.major_code, m.major_name, m.quota_limit, true]);
    });

    configSheet.getRange(2, 1, configData.length, 5).setValues(
      configData.map(r => [r[0] || '', r[1] || '', r[2] || '', r[3] || '', r[4] !== undefined ? r[4] : ''])
    );
  }

  // 4. เธเธฑเธเธ—เธถเธเนเธญเธ”เธกเธดเธเน€เธฃเธดเนเธกเธ•เนเธเนเธเธเธตเธ• Admins
  const adminSheet = ss.getSheetByName(SHEETS.ADMINS);
  if (adminSheet.getLastRow() <= 1) {
    let currentEmail = '';
    try {
      currentEmail = Session.getActiveUser().getEmail();
    } catch (e) {}

    const defaultAdminEmail = currentEmail || 'admin@thaluang.ac.th';
    adminSheet.appendRow([
      'ADM-001',
      defaultAdminEmail,
      'เธเธนเนเธ”เธนเนเธฅเธฃเธฐเธเธเธซเธฅเธฑเธ (Super Admin)',
      ADMIN_ROLES.SUPER_ADMIN,
      true,
      Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyyy-MM-dd HH:mm:ss')
    ]);
  }

  // 5. เธเธฑเธเธ—เธถเธเธเนเธญเธเธงเธฒเธกเน€เธฃเธดเนเธกเธ•เนเธเนเธเธเธตเธ• Templates
  const templateSheet = ss.getSheetByName(SHEETS.TEMPLATES);
  if (templateSheet.getLastRow() <= 1) {
    const defaultTemplates = [
      [
        'APPLY_SUCCESS_EMAIL',
        'EMAIL',
        'เนเธ”เนเธฃเธฑเธเนเธเธชเธกเธฑเธเธฃเน€เธฃเธตเธขเธเนเธเธงเธ•เธฒเน€เธฃเธตเธขเธเธฃเนเธญเธขเนเธฅเนเธง ({{app_no}})',
        'เน€เธฃเธตเธขเธเธเธธเธ“ {{name}} เธงเธดเธ—เธขเธฒเธฅเธฑเธขเน€เธ—เธเธเธดเธเธ—เนเธฒเธซเธฅเธงเธเธฏ เนเธ”เนเธฃเธฑเธเนเธเธชเธกเธฑเธเธฃเนเธเธงเธ•เธฒเน€เธฅเธเธ—เธตเน {{app_no}} เน€เธฃเธตเธขเธเธฃเนเธญเธขเนเธฅเนเธง'
      ],
      [
        'STATUS_CHANGE_NOTIFY',
        'EMAIL',
        'เนเธเนเธเธเธฅเธเธฒเธฃเธ•เธฃเธงเธเธชเธญเธเนเธเธชเธกเธฑเธเธฃเนเธเธงเธ•เธฒ ({{app_no}})',
        'เน€เธฃเธตเธขเธเธเธธเธ“ {{name}} เนเธเธชเธกเธฑเธเธฃเน€เธฅเธเธ—เธตเน {{app_no}} เธกเธตเธชเธ–เธฒเธเธฐเน€เธเนเธ: {{status}} เธซเธกเธฒเธขเน€เธซเธ•เธธ: {{remarks}}'
      ],
      [
        'LINE_OFFICER_NOTIFY',
        'LINE',
        '-',
        '๐“ข เธกเธตเธเธนเนเธชเธกเธฑเธเธฃเนเธซเธกเน: {{app_no}} เธเธธเธ“{{name}} เธฃเธฐเธ”เธฑเธ {{level}} เธชเธฒเธเธฒ {{major}}'
      ]
    ];
    defaultTemplates.forEach(t => templateSheet.appendRow(t));
  }

  // 6. เธชเธฃเนเธฒเธเนเธเธฅเน€เธ”เธญเธฃเน Google Drive เน€เธเนเธเนเธเธฅเนเนเธเธเนเธเธ Private
  const uploadFolder = getOrCreateUploadFolder();
  console.log('เนเธเธฅเน€เธ”เธญเธฃเน Google Drive เธชเธณเธซเธฃเธฑเธเธเธฑเธ”เน€เธเนเธเนเธเธฅเนเนเธเธ:', uploadFolder.getName(), `[ID: ${uploadFolder.getId()}]`);

  // 7. เธชเธฃเนเธฒเธเธ•เธฑเธงเธญเธขเนเธฒเธ Google Docs Templates เธชเธณเธซเธฃเธฑเธเนเธเธชเธกเธฑเธเธฃ เนเธฅเธฐเนเธเธกเธญเธเธ•เธฑเธง
  createInitialDocTemplates(uploadFolder);

  console.log('โ… เธเธฒเธฃเธ•เธดเธ”เธ•เธฑเนเธเธฃเธฐเธเธ (Setup) เน€เธชเธฃเนเธเธชเธกเธเธนเธฃเธ“เนเน€เธฃเธตเธขเธเธฃเนเธญเธขเนเธฅเนเธง!');
  return {
    success: true,
    spreadsheetId: ssId,
    driveFolderId: uploadFolder.getId(),
    message: 'เธ•เธดเธ”เธ•เธฑเนเธเธฃเธฐเธเธเนเธฅเธฐเธชเธฃเนเธฒเธเธเธฒเธเธเนเธญเธกเธนเธฅเธเธฃเนเธญเธกเนเธเนเธเธฒเธเน€เธฃเธตเธขเธเธฃเนเธญเธขเนเธฅเนเธง'
  };
}

/**
 * เธชเธฃเนเธฒเธเนเธเธฅเน Google Docs เนเธกเนเนเธเธเธ•เธฑเธงเธญเธขเนเธฒเธเนเธ Drive เธเธฃเนเธญเธกเธเธฑเธเธ—เธถเธ ID เธฅเธเนเธ Script Properties
 */
function createInitialDocTemplates(folder) {
  // 1. Template เนเธเธชเธกเธฑเธเธฃ
  if (!getAppTemplateDocId()) {
    try {
      const appDoc = DocumentApp.create('เนเธเธเธเธญเธฃเนเธกเนเธเธชเธกเธฑเธเธฃเนเธเธงเธ•เธฒ_Template_เธงเธ—.เธ—เนเธฒเธซเธฅเธงเธเธฏ');
      const body = appDoc.getBody();
      body.setMarginTop(36).setMarginBottom(36).setMarginLeft(36).setMarginRight(36);

      body.appendParagraph(DEFAULT_CONFIG.COLLEGE_NAME)
          .setHeading(DocumentApp.ParagraphHeading.HEADING1)
          .setAlignment(DocumentApp.TextAlignment.CENTER);

      body.appendParagraph('เนเธเธชเธกเธฑเธเธฃเน€เธเนเธฒเธฃเธฑเธเธเธฒเธฃเธเธฑเธ”เน€เธฅเธทเธญเธเน€เธเธทเนเธญเธจเธถเธเธฉเธฒเธ•เนเธญเน€เธเนเธเธเธฃเธ“เธตเธเธดเน€เธจเธฉ (เนเธเธงเธ•เธฒ) เธเธฃเธฐเธเธณเธเธตเธเธฒเธฃเธจเธถเธเธฉเธฒ {{YEAR}}')
          .setHeading(DocumentApp.ParagraphHeading.HEADING2)
          .setAlignment(DocumentApp.TextAlignment.CENTER);

      body.appendParagraph('เน€เธฅเธเธ—เธตเนเนเธเธชเธกเธฑเธเธฃ: {{APP_NO}}    เธงเธฑเธเธ—เธตเนเธชเธกเธฑเธเธฃ: {{APPLY_DATE}}    เธฃเธฐเธ”เธฑเธเธ—เธตเนเธชเธกเธฑเธเธฃ: {{LEVEL}}');
      body.appendParagraph('{{PHOTO}}');
      body.appendParagraph('----------------------------------------------------------------------------------------------------');
      body.appendParagraph('เธเนเธญ 1 เธเนเธญเธกเธนเธฅเธเธนเนเธชเธกเธฑเธเธฃ: เธเธทเนเธญ-เธชเธเธธเธฅ {{FULL_NAME}}  เน€เธฅเธเธเธฃเธฐเธเธณเธ•เธฑเธงเธเธฃเธฐเธเธฒเธเธ {{CITIZEN_ID}}  เธงเธฑเธเน€เธเธดเธ” {{BIRTH_DATE}}');
      body.appendParagraph('เธเนเธญ 2 เธเนเธญเธกเธนเธฅเธเธดเธ”เธฒ: {{FATHER_NAME}}  เธญเธฒเธขเธธ {{FATHER_AGE}} เธเธต  เธญเธฒเธเธตเธ {{FATHER_OCCUPATION}}');
      body.appendParagraph('เธเนเธญ 3 เธเนเธญเธกเธนเธฅเธกเธฒเธฃเธ”เธฒ: {{MOTHER_NAME}}  เธญเธฒเธขเธธ {{MOTHER_AGE}} เธเธต  เธญเธฒเธเธตเธ {{MOTHER_OCCUPATION}}');
      body.appendParagraph('เธเนเธญ 4 เธ—เธตเนเธญเธขเธนเนเธเธฑเธเธเธธเธเธฑเธ: {{FULL_ADDRESS}}  เนเธ—เธฃเธจเธฑเธเธ—เน {{PHONE}}');
      body.appendParagraph('เธเนเธญ 5 เธชเธ–เธฒเธเธจเธถเธเธฉเธฒเน€เธ”เธดเธก: {{CURRENT_SCHOOL}}  เธ—เธตเนเธ•เธฑเนเธ: {{SCHOOL_ADDRESS}}  เน€เธเธฃเธ”เน€เธเธฅเธตเนเธข (GPAX): {{GPAX}}  เธชเธฒเธเธฒเน€เธ”เธดเธก: {{PREV_MAJOR}}');
      body.appendParagraph('เธเนเธญ 6 เธชเธฒเธเธฒเธงเธดเธเธฒเธ—เธตเนเธชเธกเธฑเธเธฃ: เธฅเธณเธ”เธฑเธเธ—เธตเน 1: {{MAJOR_1}}  |  เธฅเธณเธ”เธฑเธเธ—เธตเน 2: {{MAJOR_2}}');
      body.appendParagraph('เธเนเธญเธเธ—เธฒเธเธ—เธตเนเธฃเธนเนเธเธฑเธเธงเธดเธ—เธขเธฒเธฅเธฑเธข: {{REFERRAL_SOURCE}}');
      body.appendParagraph('\nเธเนเธฒเธเน€เธเนเธฒเธเธญเธฃเธฑเธเธฃเธญเธเธงเนเธฒเธเนเธญเธเธงเธฒเธกเนเธฅเธฐเธซเธฅเธฑเธเธเธฒเธเธ—เธฑเนเธเธซเธกเธ”เน€เธเนเธเธเธงเธฒเธกเธเธฃเธดเธเธ—เธธเธเธเธฃเธฐเธเธฒเธฃ\n');
      body.appendParagraph('เธฅเธเธเธทเนเธญ..........................................................เธเธนเนเธชเธกเธฑเธเธฃ\n( {{SIGNATURE}} )\nเธงเธฑเธเธ—เธตเน {{APPLY_DATE}}')
          .setAlignment(DocumentApp.TextAlignment.RIGHT);

      appDoc.saveAndClose();

      const appFile = DriveApp.getFileById(appDoc.getId());
      folder.addFile(appFile);
      DriveApp.getRootFolder().removeFile(appFile);

      setProp('APP_TEMPLATE_DOC_ID', appDoc.getId());
      console.log('เธชเธฃเนเธฒเธ Google Docs Template เนเธเธชเธกเธฑเธเธฃเธชเธณเน€เธฃเนเธ ID:', appDoc.getId());
    } catch (e) {
      console.warn('เนเธกเนเธชเธฒเธกเธฒเธฃเธ–เธชเธฃเนเธฒเธ Template เนเธเธชเธกเธฑเธเธฃเธญเธฑเธ•เนเธเธกเธฑเธ•เธด:', e);
    }
  }

  // 2. Template เนเธเธกเธญเธเธ•เธฑเธง
  if (!getEnrollTemplateDocId()) {
    try {
      const enrollDoc = DocumentApp.create('เนเธเธเธเธญเธฃเนเธกเนเธเธกเธญเธเธ•เธฑเธง_Template_เธงเธ—.เธ—เนเธฒเธซเธฅเธงเธเธฏ');
      const body = enrollDoc.getBody();
      body.setMarginTop(36).setMarginBottom(36).setMarginLeft(36).setMarginRight(36);

      body.appendParagraph(DEFAULT_CONFIG.COLLEGE_NAME)
          .setHeading(DocumentApp.ParagraphHeading.HEADING1)
          .setAlignment(DocumentApp.TextAlignment.CENTER);

      body.appendParagraph('เนเธเธกเธญเธเธ•เธฑเธงเนเธฅเธฐเธชเธฑเธเธเธฒเธกเธญเธเธ•เธฑเธงเน€เธเนเธเธเธฑเธเน€เธฃเธตเธขเธ-เธเธฑเธเธจเธถเธเธฉเธฒ เธเธฃเธฐเธเธณเธเธตเธเธฒเธฃเธจเธถเธเธฉเธฒ {{YEAR}}')
          .setHeading(DocumentApp.ParagraphHeading.HEADING2)
          .setAlignment(DocumentApp.TextAlignment.CENTER);

      body.appendParagraph('เน€เธฅเธเธ—เธตเนเธกเธญเธเธ•เธฑเธง: {{ENROLL_NO}}    เธฃเธซเธฑเธชเธเธฑเธเน€เธฃเธตเธขเธ: {{STUDENT_ID}}    เธงเธฑเธเธ—เธตเนเธกเธญเธเธ•เธฑเธง: {{ENROLL_DATE}}');
      body.appendParagraph('เธเธทเนเธญเธเธฑเธเน€เธฃเธตเธขเธ-เธเธฑเธเธจเธถเธเธฉเธฒ: {{STUDENT_NAME}}    เน€เธฅเธเธเธฑเธ•เธฃเธเธฃเธฐเธเธฒเธเธ: {{CITIZEN_ID}}');
      body.appendParagraph('เธฃเธฐเธ”เธฑเธ: {{LEVEL}}    เธชเธฒเธเธฒเธงเธดเธเธฒ: {{ASSIGNED_MAJOR}}');
      body.appendParagraph('เธเธนเนเธเธเธเธฃเธญเธ: {{GUARDIAN_NAME}}    เธเธงเธฒเธกเน€เธเธตเนเธขเธงเธเนเธญเธ: {{GUARDIAN_RELATION}}    เนเธ—เธฃ: {{GUARDIAN_PHONE}}    เธญเธฒเธเธตเธ: {{GUARDIAN_OCCUPATION}}');
      body.appendParagraph('เธเธขเธฒเธ 1: {{WITNESS_1}}    เธเธขเธฒเธ 2: {{WITNESS_2}}    เน€เธเนเธฒเธซเธเนเธฒเธ—เธตเนเธฃเธฑเธเธกเธญเธเธ•เธฑเธง: {{OFFICER_EMAIL}}');
      body.appendParagraph('\n\nเธฅเธเธเธทเนเธญ..........................................................เธเธนเนเธเธเธเธฃเธญเธ\nเธฅเธเธเธทเนเธญ..........................................................เธเธฑเธเน€เธฃเธตเธขเธ/เธเธฑเธเธจเธถเธเธฉเธฒ\nเธฅเธเธเธทเนเธญ..........................................................เน€เธเนเธฒเธซเธเนเธฒเธ—เธตเนเธฃเธฑเธเธกเธญเธเธ•เธฑเธง')
          .setAlignment(DocumentApp.TextAlignment.CENTER);

      enrollDoc.saveAndClose();

      const enrollFile = DriveApp.getFileById(enrollDoc.getId());
      folder.addFile(enrollFile);
      DriveApp.getRootFolder().removeFile(enrollFile);

      setProp('ENROLL_TEMPLATE_DOC_ID', enrollDoc.getId());
      console.log('เธชเธฃเนเธฒเธ Google Docs Template เนเธเธกเธญเธเธ•เธฑเธงเธชเธณเน€เธฃเนเธ ID:', enrollDoc.getId());
    } catch (e) {
      console.warn('เนเธกเนเธชเธฒเธกเธฒเธฃเธ–เธชเธฃเนเธฒเธ Template เนเธเธกเธญเธเธ•เธฑเธงเธญเธฑเธ•เนเธเธกเธฑเธ•เธด:', e);
    }
  }
}
/**
 * เธฃเธฐเธเธเธฃเธฑเธเธชเธกเธฑเธเธฃเน€เธฃเธตเธขเธเธญเธญเธเนเธฅเธเน (เนเธเธงเธ•เธฒ) เธงเธดเธ—เธขเธฒเธฅเธฑเธขเน€เธ—เธเธเธดเธเธ—เนเธฒเธซเธฅเธงเธเธเธดเน€เธกเธเธ•เนเนเธ—เธขเธญเธเธธเธชเธฃเธ“เน
 * เนเธเธฅเน: Code.js
 * เธซเธเนเธฒเธ—เธตเน: เธเธธเธ”เน€เธฃเธดเนเธกเธ•เนเธ Web App (doGet), เธ•เธฑเธงเธเธฑเธ”เธเธฒเธฃ Include Template, เนเธฅเธฐ Server-side API เธชเธณเธซเธฃเธฑเธ Client
 */

/**
 * เธเธฑเธเธเนเธเธฑเธเธซเธฅเธฑเธเนเธเธเธฒเธฃเนเธชเธ”เธเธเธฅเธซเธเนเธฒเน€เธงเนเธเธเธญเธ Google Apps Script Web App
 */
function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};

  // เธเธฃเธ“เธตเธ”เธฒเธงเธเนเนเธซเธฅเธ” PDF เนเธ”เธขเธ•เธฃเธเธเนเธฒเธ URL (?action=download_pdf&id=xxx)
  if (params.action === 'download_pdf' && params.id) {
    try {
      const file = DriveApp.getFileById(params.id);
      return file.getBlob();
    } catch (err) {
      return HtmlService.createHtmlOutput('<h3>เนเธกเนเธเธเนเธเธฅเนเน€เธญเธเธชเธฒเธฃเธซเธฃเธทเธญเนเธเธฅเนเธ–เธนเธเธเธณเธเธฑเธ”เธเธฒเธฃเน€เธเนเธฒเธ–เธถเธ</h3>');
    }
  }

  // เนเธซเธฅเธ”เธซเธเนเธฒเน€เธงเนเธเธซเธฅเธฑเธ index.html
  const template = HtmlService.createTemplateFromFile('index');
  template.initialPage = params.page || 'form'; // 'form', 'status', 'admin'
  template.appNo = params.appNo || '';

  return template.evaluate()
    .setTitle('เธฃเธฐเธเธเธฃเธฑเธเธชเธกเธฑเธเธฃเน€เธฃเธตเธขเธเธญเธญเธเนเธฅเธเน (เนเธเธงเธ•เธฒ) 2570 | เธงเธ—.เธ—เนเธฒเธซเธฅเธงเธเธเธดเน€เธกเธเธ•เนเนเธ—เธขเธญเธเธธเธชเธฃเธ“เน')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * เธเธฑเธเธเนเธเธฑเธเน€เธชเธฃเธดเธกเธชเธณเธซเธฃเธฑเธ include เนเธเธฅเน HTML เธขเนเธญเธขเน€เธเนเธฒเธกเธฒเนเธ index.html
 * @param {string} filename เธเธทเนเธญเนเธเธฅเน เน€เธเนเธ 'css', 'applicant_form'
 * @returns {string} เน€เธเธทเนเธญเธซเธฒเนเธเธฅเน HTML
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// =========================================================================
// API เธชเธณเธซเธฃเธฑเธ Client เน€เธฃเธตเธขเธเธเนเธฒเธ google.script.run
// =========================================================================

/**
 * API: เธ”เธถเธเธฃเธฒเธขเธเธทเนเธญเธชเธฒเธเธฒเธงเธดเธเธฒเธ—เธตเนเน€เธเธดเธ”เธฃเธฑเธเธ•เธฒเธกเธฃเธฐเธ”เธฑเธเธเธฒเธฃเธจเธถเธเธฉเธฒ
 */
function apiGetMajors() {
  return getActiveMajorsFromConfig();
}

/**
 * API: เธขเธทเนเธเนเธเธชเธกเธฑเธเธฃเนเธซเธกเน (Phase 1)
 */
function apiSubmitApplication(formData) {
  return submitApplication(formData);
}

/**
 * API: เธ•เธฃเธงเธเธชเธญเธเธชเธ–เธฒเธเธฐเธเธฒเธฃเธชเธกเธฑเธเธฃ (Phase 1)
 */
function apiCheckApplicantStatus(citizenId, birthDate) {
  return checkApplicantStatus(citizenId, birthDate);
}

/**
 * API: เธญเธฑเธเนเธซเธฅเธ”เน€เธญเธเธชเธฒเธฃเนเธซเธกเนเน€เธเธดเนเธกเน€เธ•เธดเธก (Phase 1)
 */
function apiReuploadDocument(applicationNo, citizenId, docType, fileData) {
  return reuploadDocument(applicationNo, citizenId, docType, fileData);
}

/**
 * API: เน€เธเนเธฒเธชเธนเนเธฃเธฐเธเธเน€เธเนเธฒเธซเธเนเธฒเธ—เธตเน (Phase 2)
 */
function apiAdminLogin(email, pin) {
  return adminLogin(email, pin);
}

/**
 * เธ–เธญเธ”เธฃเธซเธฑเธช Token เนเธฅเธฐเธ”เธถเธเธญเธตเน€เธกเธฅเน€เธเนเธฒเธซเธเนเธฒเธ—เธตเน
 */
function getEmailFromSessionToken(token) {
  try {
    if (!token) return '';
    const decoded = JSON.parse(Utilities.newBlob(Utilities.base64Decode(token)).getDataAsString());
    if (decoded.exp && new Date().getTime() > decoded.exp) {
      return ''; // เธซเธกเธ”เธญเธฒเธขเธธ
    }
    return decoded.email || '';
  } catch (e) {
    return '';
  }
}

/**
 * API: เธ”เธถเธเธฃเธฒเธขเธเธฒเธฃเธเธนเนเธชเธกเธฑเธเธฃเธชเธณเธซเธฃเธฑเธเนเธญเธ”เธกเธดเธ (Phase 2)
 */
function apiGetApplicantsList(filter, token) {
  const email = getEmailFromSessionToken(token);
  return getApplicantsList(filter, email);
}

/**
 * API: เธ”เธถเธเธฃเธฒเธขเธฅเธฐเน€เธญเธตเธขเธ”เธเธนเนเธชเธกเธฑเธเธฃเธฃเธฒเธขเธเธธเธเธเธฅเธชเธณเธซเธฃเธฑเธเนเธญเธ”เธกเธดเธ (Phase 2)
 */
function apiGetApplicantDetails(applicationNo, token) {
  const email = getEmailFromSessionToken(token);
  return getApplicantDetails(applicationNo, email);
}

/**
 * API: เธเธฃเธฑเธเน€เธเธฅเธตเนเธขเธเธชเธ–เธฒเธเธฐเนเธเธชเธกเธฑเธเธฃ (Phase 2)
 */
function apiUpdateApplicantStatus(applicationNo, newStatus, remarks, docFeedbacks, token) {
  const email = getEmailFromSessionToken(token);
  return updateApplicantStatus(applicationNo, newStatus, remarks, docFeedbacks, email);
}

/**
 * API: เธเธฃเธฑเธเธชเธ–เธฒเธเธฐเธเธฃเนเธญเธกเธเธฑเธเธซเธฅเธฒเธขเธฃเธฒเธขเธเธฒเธฃ (Batch) (Phase 2)
 */
function apiBatchUpdateStatus(applicationNos, newStatus, remarks, token) {
  const email = getEmailFromSessionToken(token);
  return batchUpdateApplicantStatus(applicationNos, newStatus, remarks, email);
}

/**
 * API: เธเธฑเธเธ—เธถเธเธเธฒเธฃเธกเธญเธเธ•เธฑเธงเธเธฑเธเน€เธฃเธตเธขเธเนเธซเธกเน (Phase 2)
 */
function apiEnrollApplicant(enrollData, token) {
  const email = getEmailFromSessionToken(token);
  return enrollApplicant(enrollData, email);
}

/**
 * API: เธ”เธถเธเธเนเธญเธกเธนเธฅเธชเธ–เธดเธ•เธดเธชเธณเธซเธฃเธฑเธ Dashboard (Phase 2)
 */
function apiGetDashboardStats(token) {
  const email = getEmailFromSessionToken(token);
  return getDashboardStats(email);
}

/**
 * API: เธชเนเธเธญเธญเธเนเธเธฅเน CSV เธชเธณเธซเธฃเธฑเธเธฃเธฐเธเธ เธจเธ.02 (Phase 2)
 */
function apiExportApplicantsCsv(filter, token) {
  const email = getEmailFromSessionToken(token);
  return exportApplicantsCsv(filter, email);
}

/**
 * API: เน€เธเธดเธ”เธ”เธนเนเธเธฅเนเน€เธญเธเธชเธฒเธฃเนเธเธเธเนเธฒเธ Base64 Proxy เนเธ”เธขเนเธกเนเธ•เนเธญเธเน€เธเธดเธ” Drive เธชเธฒเธเธฒเธฃเธ“เธฐ
 */
function apiGetFileProxy(fileId, token) {
  const email = getEmailFromSessionToken(token);
  const auth = verifyAdminEmail(email);
  if (!auth.authorized) {
    return { success: false, message: 'เนเธกเนเธกเธตเธชเธดเธ—เธเธดเนเน€เธเนเธฒเธ–เธถเธเนเธเธฅเนเธเธตเน' };
  }
  return getFileAsBase64(fileId);
}
