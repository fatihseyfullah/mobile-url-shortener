# URL Kısaltıcı - Mobil Odaklı

Next.js 14 + TypeScript + Tailwind CSS + Supabase ile geliştirilmiş URL shortener uygulaması.

## Özellikler

- 🔐 NextAuth.js ile kimlik doğrulama
- 🔗 Base62 ile benzersiz kısa link oluşturma
- 📊 Tıklama analytics ve tracking
- 📱 Mobil-first responsive tasarım
- 🎯 QR kod üretimi
- 🔗 Native share API ile kolay paylaşım
- 👨‍💼 Admin paneli ve istatistikler
- 🌙 Dark mode

## Kurulum

```bash
npm install
```

`.env.local` oluşturun:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
BASE_URL=http://localhost:3000
```

Supabase'de `supabase/schema.sql` dosyasını çalıştırın.

```bash
npm run dev
```

## Deployment

Netlify için hazır. Environment değişkenlerini Netlify'da ayarlayın.

## API

- `POST /api/auth/register` - Kayıt
- `POST /api/url/shorten` - URL kısaltma
- `GET /[code]` - Redirect
- `GET /api/admin/stats` - Admin istatistikleri

Detaylı dokümantasyon için projectStart.md dosyasına bakın.
