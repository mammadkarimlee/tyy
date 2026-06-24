# Teknoloji Yerinde Yeterince anonim sorğusu

GitHub Pages-də işləyən mobil uyğun anonim müəllim sorğusu.

İkonlar Lucide CDN üzərindən yüklənir, əlavə build addımı yoxdur.

## 1. Google Sheets bağlantısı

1. Google Sheets-də yeni fayl açın.
2. `Extensions` > `Apps Script` bölməsinə keçin.
3. `apps-script/Code.gs` faylındakı kodu ora yapışdırın.
4. `Deploy` > `New deployment` seçin.
5. Type: `Web app`
6. Execute as: `Me`
7. Who has access: `Anyone`
8. Deploy edin və Web app URL-ni kopyalayın.
9. `index.html` faylında bu sətri tapın:

```js
const SHEETS_ENDPOINT = "";
```

URL-ni dırnaqların içinə qoyun:

```js
const SHEETS_ENDPOINT = "https://script.google.com/macros/s/.../exec";
```

## 2. GitHub Pages

1. Bu faylları GitHub repository-yə yükləyin.
2. `Settings` > `Pages` bölməsinə keçin.
3. Source: `Deploy from a branch`
4. Branch: `main`, folder: `/root`
5. Save edin.

Səhifə adətən 1-2 dəqiqəyə aktiv olur.

## Qeyd

CSV yükləmə hazırda bağlıdır. Cavabların toplanması üçün `SHEETS_ENDPOINT` mütləq əlavə olunmalıdır.
