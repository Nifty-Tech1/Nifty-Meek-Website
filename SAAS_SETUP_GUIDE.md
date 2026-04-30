# SaaS Upgrade Setup Guide: Image Upload + Real Progress Dashboard

**Status:** Code complete ✅ | Database schema needed | Environment variables needed

---

## 🚀 QUICK START (35 minutes)

### Step 1: Create Supabase Database Tables (5 min)

1. Go to [Supabase Dashboard](https://supabase.com)
2. Select your project
3. Click **SQL Editor** → **New Query**
4. Paste this SQL:

```sql
-- Create achievements table
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'in-progress', 'completed')),
  progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  target_date DATE,
  completed_at TIMESTAMP,
  icon TEXT,
  order_position INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create images table
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id TEXT NOT NULL UNIQUE,
  secure_url TEXT NOT NULL,
  resource_type TEXT DEFAULT 'image',
  original_filename TEXT NOT NULL,
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  format TEXT,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT,
  description TEXT,
  alt_text TEXT,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX idx_achievements_status ON achievements(status);
CREATE INDEX idx_achievements_category ON achievements(category);
CREATE INDEX idx_achievements_order ON achievements(order_position);
CREATE INDEX idx_images_project_id ON images(project_id);
CREATE INDEX idx_images_category ON images(category);
CREATE INDEX idx_images_created_at ON images(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- RLS Policies for achievements
CREATE POLICY "Achievements are publicly readable"
  ON achievements FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert achievements"
  ON achievements FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only creator can update achievements"
  ON achievements FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "Only creator can delete achievements"
  ON achievements FOR DELETE USING (created_by = auth.uid());

-- RLS Policies for images
CREATE POLICY "Images are publicly readable"
  ON images FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert images"
  ON images FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only uploader can delete images"
  ON images FOR DELETE USING (uploaded_by = auth.uid());
```

5. Click **Run** button
6. Verify tables appear in **Database** → **Tables**

---

### Step 2: Get Cloudinary Credentials (5 min)

1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Copy **Cloud Name** (e.g., `dxyz123`)
3. Click **Settings** → **API Keys**
4. Copy **API Key** and **API Secret**
5. Keep these safe (needed in Step 3)

---

### Step 3: Create `.env.local` (5 min)

1. In project root, create file named `.env.local`
2. Add this content:

```env
# Cloudinary (from Step 2)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxyz123
CLOUDINARY_CLOUD_NAME=dxyz123
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=your_secret_key_here

# Supabase (you already have these)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

3. Save file
4. **Important:** Verify `.gitignore` contains `.env.local`:
   ```bash
   cat .gitignore | grep env.local
   ```
   Should output: `.env.local`

---

### Step 4: Restart Development Server (1 min)

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

---

### Step 5: Seed Initial Achievements (5 min)

1. Go to Supabase Dashboard
2. Click **Data Editor** → **achievements** table
3. Click **Insert Row** 4 times and add:

**Row 1:**

- title: "Foundation Built"
- description: "Core infrastructure and systems established"
- category: "Infrastructure"
- status: "completed"
- progress_percent: 100
- order_position: 1

**Row 2:**

- title: "Alpha Launch"
- description: "First version shipped to early users"
- category: "Launch"
- status: "completed"
- progress_percent: 100
- order_position: 2

**Row 3:**

- title: "Scale to 5k Users"
- description: "Growing user base and global reach"
- category: "Growth"
- status: "in-progress"
- progress_percent: 65
- order_position: 3

**Row 4:**

- title: "Enterprise Features"
- description: "Advanced features for enterprise clients"
- category: "Development"
- status: "in-progress"
- progress_percent: 40
- order_position: 4

---

### Step 6: Test Everything (10 min)

**Test 1: Progress Dashboard**

```bash
npm run dev
# Go to http://localhost:3000
# Verify "Milestones & Goals" section shows:
# - 4 Total Goals
# - 2 Completed
# - 2 In Progress
# - 50% Overall Progress
```

**Test 2: Image Upload**

```bash
# Go to http://localhost:3000/admin/new
# Scroll down, find "Upload Media" form
# Upload a JPG/PNG image
# Verify:
# - Progress bar appears
# - "Image uploaded successfully!" toast shows
# - Image appears in Cloudinary dashboard
```

**Test 3: Build Verification**

```bash
npm run build
# Should complete with "✓ Compiled successfully"
# No TypeScript errors
```

---

### Step 7: Deploy to Production (2 min)

```bash
git add .
git commit -m "SaaS upgrade: image upload + real progress dashboard complete"
git push origin main
```

Vercel auto-deploys. Then add environment variables:

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Add same env vars from `.env.local`
5. Redeploy

---

## 📋 File Reference

| File                                       | Purpose                                  | Status            |
| ------------------------------------------ | ---------------------------------------- | ----------------- |
| `src/lib/cloudinary.ts`                    | Upload/delete from Cloudinary CDN        | ✅ Complete       |
| `src/lib/actions.ts`                       | Server actions for images & achievements | ✅ Complete       |
| `src/app/components/ImageUpload.tsx`       | Upload form component                    | ✅ Complete       |
| `src/app/components/ProgressDashboard.tsx` | Real data progress tracker               | ✅ Complete       |
| `.env.local`                               | Cloudinary credentials                   | ⚠️ Need to create |
| Supabase tables                            | Database schema                          | ⚠️ Need to create |

---

## 🔐 Security Checklist

- ✅ `CLOUDINARY_API_SECRET` never exposed to browser (server-only)
- ✅ Supabase RLS policies enforce user ownership
- ✅ File size validated (10MB max)
- ✅ File type validated (image/video only)
- ✅ `.env.local` in `.gitignore` (secrets safe)
- ✅ HTTPS URLs only (secure_url)

---

## 🐛 Troubleshooting

### "Image table doesn't exist"

**Fix:** Run SQL from Step 1 in Supabase SQL Editor

### "No Cloudinary API key error"

**Fix:**

1. Verify `.env.local` exists
2. Check values match Cloudinary console
3. Restart dev server: `npm run dev`

### "Upload fails silently"

**Fix:** Check browser console (F12) for error messages

### "ProgressDashboard shows empty"

**Fix:** Seed achievements from Step 5

### "Build fails with TypeScript errors"

**Fix:** All errors already fixed in code review

---

## 📞 Support

- Error in upload? Check Cloudinary dashboard for files
- Database issues? Check Supabase logs
- Build failing? Run: `npm run build` locally first

---

## ✅ Success Indicators

When complete, you should see:

- ✅ 4 achievements on home page
- ✅ 50% overall progress bar
- ✅ Upload form in admin panel
- ✅ Images appear in Cloudinary
- ✅ Production build succeeds
- ✅ Zero TypeScript errors

**You're production-ready!** 🚀
