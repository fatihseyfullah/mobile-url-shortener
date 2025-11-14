# URL Kısaltıcı - React Native Mobil Uygulama

Bu mobil uygulama, url-shortener Next.js backend'i ile çalışan React Native (Expo) uygulamasıdır.

## Özellikler

- ✅ Kullanıcı kayıt ve giriş
- ✅ URL kısaltma
- ✅ Kısa URL'lerin listelenmesi
- ✅ QR kod oluşturma
- ✅ WhatsApp paylaşımı
- ✅ Panoya kopyalama
- ✅ URL silme

## Kurulum

```bash
cd mobile-app
npm install
```

## Konfigürasyon

`src/services/api.ts` dosyasında API URL'ini düzenleyin:

```typescript
const API_URL = 'http://localhost:3000/api'; // Geliştirme için
// const API_URL = 'https://your-app.netlify.app/api'; // Production için
```

## Çalıştırma

### iOS için
```bash
npm run ios
```

### Android için
```bash
npm run android
```

### Web için
```bash
npm run web
```

## Proje Yapısı

```
mobile-app/
├── src/
│   ├── screens/          # Ekranlar
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   └── CreateUrlScreen.tsx
│   ├── components/       # Bileşenler
│   │   └── UrlItem.tsx
│   ├── services/         # API servisleri
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── urlService.ts
│   ├── contexts/         # Context API
│   │   └── AuthContext.tsx
│   └── types/           # TypeScript tipleri
│       └── index.ts
└── App.tsx              # Ana uygulama
```

## Backend Bağlantısı

Bu uygulama, `url-shortener` Next.js projesindeki backend API'leri kullanır. Backend'in çalışıyor olması gerekir.

### Backend API Endpoints

- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/register` - Kullanıcı kaydı
- `GET /api/url/user` - Kullanıcının URL'lerini getir
- `POST /api/url/shorten` - Yeni URL kısalt
- `DELETE /api/url/:id` - URL sil

## Geliştirme Notları

1. **Backend'i çalıştırın**: Backend projesinin çalışıyor olması gerekir
2. **API URL'i**: Geliştirme için local IP adresi kullanın (simulator/emulator için `localhost` yerine)
3. **QR Kod**: Üretilen QR kodlar, short URL'i içerir
4. **WhatsApp**: WhatsApp yüklü değilse hata verebilir

## Production Build

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android
```

## Bağımlılıklar

- React Native / Expo
- React Navigation
- Axios (API istekleri)
- React Native QRCode SVG (QR kod üretimi)
- Expo Clipboard (kopyalama)
- Expo Sharing (paylaşım)
- AsyncStorage (local storage)
