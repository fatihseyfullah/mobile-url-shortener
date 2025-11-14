# Netlify Deployment Rehberi

## 1. Netlify Hesabı Oluştur
- https://netlify.com adresine git
- GitHub ile giriş yap

## 2. Supabase Veritabanını Hazırla

### Supabase'de yeni proje oluştur:
1. https://supabase.com
2. "New Project" oluştur
3. Proje ayarlarından API keys'i al

### Veritabanı tablolarını oluştur:

```sql
-- Users tablosu
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- URLs tablosu
CREATE TABLE urls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  original_url TEXT NOT NULL,
  short_code TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics tablosu
CREATE TABLE analytics (
  id SERIAL PRIMARY KEY,
  url_id UUID REFERENCES urls(id) ON DELETE CASCADE,
  clicked_at TIMESTAMPTZ DEFAULT NOW(),
  referer TEXT,
  user_agent TEXT,
  ip_address TEXT
);

-- Admin settings tablosu
CREATE TABLE admin_settings (
  id SERIAL PRIMARY KEY,
  maintenance_mode BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index'ler
CREATE INDEX idx_urls_short_code ON urls(short_code);
CREATE INDEX idx_urls_user_id ON urls(user_id);
CREATE INDEX idx_analytics_url_id ON analytics(url_id);
```

## 3. Netlify'a Deploy Et

### A. GitHub üzerinden (Önerilen)
1. Netlify dashboard → "Add new site" → "Import an existing project"
2. GitHub reposunu seç
3. Build ayarları:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
4. "Deploy site" tıkla

### B. Netlify CLI ile
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## 4. Environment Variables Ekle

Netlify Dashboard → Site settings → Environment variables:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXTAUTH_URL=https://your-app.netlify.app
NEXTAUTH_SECRET=generate_random_secret_here
BASE_URL=https://your-app.netlify.app
```

**NEXTAUTH_SECRET oluşturmak için:**
```bash
openssl rand -base64 32
```

## 5. Mobil Uygulamayı Güncelle

`mobile-app/src/services/api.ts` dosyasını güncelle:

```typescript
const API_URL = 'https://your-app.netlify.app/api';
```

## 6. Test Et

1. Netlify URL'ini aç
2. Kayıt ol
3. Giriş yap
4. URL oluştur
5. Kısa URL'i test et

## Troubleshooting

### Build hatası alıyorsanız:
- Environment variables doğru mu kontrol edin
- Supabase bağlantısı çalışıyor mu test edin
- Netlify build log'larını inceleyin

### "Module not found" hatası:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Database bağlantı hatası:
- Supabase URL ve key'leri kontrol edin
- Supabase dashboard'dan test query çalıştırın

## Sonraki Adımlar

- [ ] Custom domain ekle
- [ ] SSL otomatik aktif olur
- [ ] Analytics kontrol et
- [ ] Mobil uygulamadan test et
