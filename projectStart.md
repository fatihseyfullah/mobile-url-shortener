# URL Kısaltma Projesi - Yapay Zeka Asistanı için Dokümantasyon

## Proje Genel Bakış

Bu doküman, bir URL kısaltma uygulaması geliştirmek isteyen geliştiriciye yapay zeka asistanından yardım alabilmesi için hazırlanmıştır. Proje mobil uygulama, admin paneli ve backend API'den oluşmaktadır.

---

## 🎯 Proje Hedefleri

- **Kullanıcı Yönetimi**: Kayıt, giriş ve profil yönetimi
- **URL Kısaltma**: Uzun URL'leri kısa linklere dönüştürme
- **QR Kod Üretimi**: Kısa linkler için QR kod oluşturma
- **Paylaşım Özellikleri**: WhatsApp ve diğer platformlarda paylaşım
- **Admin Paneli**: Sistem yönetimi ve istatistikler
- **Netlify Deployment**: Backend'in Netlify'da deploy edilmesi

---

## 🛠️ Teknoloji Stack'i

### Frontend & Backend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Native** (mobil için) veya **PWA**
- **NextAuth.js** (kimlik doğrulama)

### Database
- **Supabase** (PostgreSQL) veya **MongoDB Atlas**

### Deployment
- **Netlify** (backend functions)
- **Vercel** (frontend) veya **Netlify** (full-stack)

---

## 📋 Yapay Zekadan İstenecek Adımlar

### 1. PROJE KURULUMU VE YAPILANDIRMA
```
"Next.js 14 projesi oluştur, TypeScript ve Tailwind CSS ile yapılandır. App Router kullan. Proje yapısını oluştur."
```

**Beklenen Çıktı:**
- `package.json` with dependencies
- Next.js konfigürasyon dosyaları
- Temel proje dizin yapısı

### 2. VERİTABANI KURULUMU
```
"Supabase veya MongoDB için database modellerini oluştur. Kullanıcı, URL kayıtları ve analytics modellerini tanımla."
```

**Veritabanı Modelleri:**
```sql
-- Users table
-- URLs table  
-- Analytics table (tıklama takibi)
-- Admin settings table
```

### 3. KİMLİK DOĞRULAMA SİSTEMİ
```
"NextAuth.js ile kullanıcı giriş/kayıt sistemini kur. Email/password ve OTP seçenekleri ekle."
```

**Gereken Özellikler:**
- Kullanıcı kaydı
- Email doğrulama
- Şifre sıfırlama
- Session yönetimi

### 4. BACKEND API ROUTES
```
"Next.js API routes oluştur: auth, url shortening, analytics, admin endpoints."
```

**API Endpoints:**
- `POST /api/auth/register`
- `POST /api/auth/login` 
- `POST /api/url/shorten`
- `GET /api/url/[id]`
- `GET /api/url/user/[userId]`
- `GET /api/admin/urls`
- `GET /api/admin/stats`

### 5. URL KISALTMA ALGORİTMASI
```
"URL kısaltma algoritması yaz. Benzersiz hash üret, veritabanına kaydet, analytics başlat."
```

**Algoritma Detayları:**
- Base62 encoding
- Özel hash üretimi
- Çakışma kontrolü
- Süre sonu ayarları

### 6. MOBİL ARAYÜZ KOMPONENTLERİ
```
"React component'leri oluştur: login form, url list, url creation, qr modal, share buttons."
```

**Ana Komponentler:**
- `LoginScreen`
- `Dashboard`
- `UrlList`
- `CreateUrlModal`
- `QrGenerator`
- `ShareOptions`

### 7. QR KOD ÜRETİMİ
```
"QR kod generator entegre et. Kısa URL'ler için dinamik QR kodlar oluştur."
```

**Kütüphane:** `qrcode.react` veya benzeri

### 8. PAYLAŞIM FONKSİYONLARI
```
"WhatsApp, diğer sosyal medya ve kopyalama fonksiyonlarını ekle."
```

**Paylaşım Seçenekleri:**
- WhatsApp
- Telegram
- Email
- Kopyalama (clipboard)

### 9. ADMIN PANELİ
```
"Admin dashboard oluştur: sistem istatistikleri, kullanıcı yönetimi, URL moderasyonu."
```

**Admin Özellikleri:**
- Genel istatistikler
- Kullanıcı yönetimi
- URL moderasyonu
- Sistem ayarları

### 10. DEPLOYMENT KONFİGÜRASYONU
```
"Netlify deployment için gerekli konfigürasyonları hazırla. Environment variables ve build ayarlarını yapılandır."
```

**Netlify Config:**
- `netlify.toml`
- Environment variables
- Build commands
- Function configurations

---

## 🚀 Proje Hayata Geçirme Adımları

### Aşama 1: Başlangıç ve Planlama
1. **Yapay zeka asistanını başlat**
2. **Bu dokümanı paylaş**
3. **Teknoloji seçimlerini onayla**

### Aşama 2: Geliştirme Ortamı Kurulumu
```bash
# 1. Proje oluşturma
npx create-next-app@latest url-shortener --typescript --tailwind --app

# 2. Gerekli paketleri yükleme
npm install next-auth @supabase/supabase-js qrcode.react lucide-react
```

### Aşama 3: Backend Geliştirme
1. **Veritabanı kurulumu** (Supabase/MongoDB)
2. **API routes geliştirme**
3. **Kimlik doğrulama sistemi**
4. **URL kısaltma mantığı**

### Aşama 4: Frontend Geliştirme
1. **Kullanıcı arayüzü komponentleri**
2. **State management**
3. **API entegrasyonu**
4. **Responsive tasarım**

### Aşama 5: Mobil Optimizasyon
1. **PWA konfigürasyonu**
2. **Mobil uyumluluk testleri**
3. **Touch-friendly arayüz**

### Aşama 6: Admin Panel
1. **Admin dashboard**
2. **Yönetim fonksiyonları**
3. **İstatistik görselleri**

### Aşama 7: Test ve Kalite Kontrol
1. **Unit testler**
2. **Integration testler**
3. **Kullanıcı testleri**
4. **Güvenlik testleri**

### Aşama 8: Deployment
1. **Netlify'a deploy**
2. **Domain ayarları**
3. **SSL konfigürasyonu**
4. **Monitoring kurulumu**

---

## 📁 Proje Dizin Yapısı

```
url-shortener/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── urls/
│   │   └── profile/
│   ├── admin/
│   ├── api/
│   │   ├── auth/
│   │   ├── url/
│   │   └── admin/
│   └── globals.css
├── components/
│   ├── ui/
│   ├── forms/
│   ├── dashboard/
│   └── admin/
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   └── utils.ts
├── types/
└── public/
```

---

## 🔐 Environment Variables

```env
# Database
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=

# Authentication
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# App
BASE_URL=
ADMIN_EMAIL=
```

---

## 📞 Yapay Zeka İletişim Örnekleri

**Başlangıç Komutu:**
```
"Merhaba, URL kısaltma projesi geliştirmek istiyorum. Yukarıdaki dokümanda belirtilen adımları takip ederek bana yardımcı olabilir misin? İlk olarak proje kurulumu ile başlayalım."
```

**Spesifik İstek Örnekleri:**
```
"URL kısaltma algoritmasını nasıl implemente edebilirim?"
"NextAuth.js ile email/password authentication kurulumunu gösterir misin?"
"QR kod generator component'i oluşturabilir misin?"
```

---

## ⚠️ Önemli Notlar

1. **Güvenlik**: Tüm input validation'ları ekleyin
2. **Rate Limiting**: API endpoint'lerine rate limit uygulayın
3. **Error Handling**: Kapsamlı hata yönetimi sağlayın
4. **Performance**: Büyük veri setleri için pagination ekleyin
5. **Backup**: Düzenli veritabanı yedekleme planı oluşturun

---
