# Login Troubleshooting Guide

## Quick Diagnosis

If login is still not working, follow these steps:

### 1. **Check Environment Variables**

```bash
# Make sure you have a .env.local file with:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc... (your anon key)
```

**If you don't have these:**

- Go to your Supabase project settings
- Copy the "Project URL" and "Project API Key (anon, public)"
- Create `.env.local` file in the root directory
- Add these variables

### 2. **Browser Console Check**

1. Open DevTools (F12)
2. Go to Console tab
3. Try logging in and watch for errors
4. Look for:
   - Network errors
   - Auth errors
   - Cookie warnings

### 3. **Check Network Tab**

1. Open DevTools (F12)
2. Click "Network" tab
3. Try logging in
4. Look at the `/api/auth/` requests:
   - Should see POST to supabase auth endpoint
   - Check "Response" tab for errors

### 4. **Common Issues & Fixes**

#### Issue: "Missing environment variables"

**Fix**: Make sure `.env.local` exists with correct Supabase keys

#### Issue: "Invalid login credentials"

**Fix**: Verify the email/password are correct in your Supabase Auth dashboard

#### Issue: Login submits but page doesn't redirect

**Possible causes**:

- Cookie not being set by Supabase
- Session not syncing between client and server
- Try hard refresh (Ctrl+Shift+R)

**Fix**: Try these in order:

1. Hard refresh the page
2. Clear browser cookies and try again
3. Check if Supabase project is accessible:
   ```js
   // Paste in browser console:
   const { createBrowserClient } = await import("@supabase/ssr");
   const client = createBrowserClient("YOUR_URL", "YOUR_KEY");
   const res = await client.auth.getSession();
   console.log("Session:", res);
   ```

#### Issue: "Redirect loop" (login → admin → login)

**Cause**: Middleware can't see the session

**Fix**:

- This is usually a cookie issue
- Restart development server: Press Ctrl+C and run `npm run dev` again
- Clear `.next` folder: `rm -r .next` then `npm run dev`

#### Issue: Admin page shows but logout doesn't work

**Fix**: Make sure you're calling `getSupabase()` instead of importing static `supabase`

---

## The Root Problem (FIXED)

The login wasn't working because:

1. **Client and server used different Supabase clients**
   - Client: `createClient()` from supabase-js
   - Server: `createServerClient()` from @supabase/ssr
   - They didn't share cookies!

2. **Solution Applied**:
   - Changed to `createBrowserClient()` from @supabase/ssr
   - Uses `getSupabase()` function for all client components
   - Server uses `getServerSupabase()` from auth.ts
   - Both properly handle cookies through middleware

3. **Session Flow**:
   ```
   Login Page (getSupabase)
       → signIn → sets cookies in browser
       → redirect to /admin
       → middleware reads cookies ✓
       → updateSession refreshes auth ✓
       → Admin page loads with user ✓
   ```

---

## Testing Checklist

- [ ] Env variables are set in `.env.local`
- [ ] Can see "Secure authentication powered by Supabase" on login page
- [ ] Enter valid email/password
- [ ] Click "Login"
- [ ] Should redirect to `/admin` with user dashboard
- [ ] See "Welcome back, your@email.com" on dashboard
- [ ] Logout button works
- [ ] Redirects to login
- [ ] Can login again

---

## Development Tips

### Run in Verbose Mode

```bash
npm run dev
```

Watch the terminal for auth-related messages.

### Test Auth Directly

```js
// In browser console on login page:
const { getSupabase } = window.__NEXT_P;
// Or manually:
const { createBrowserClient } = await import("@supabase/ssr");
const supabase = createBrowserClient("YOUR_URL", "YOUR_KEY");
const res = await supabase.auth.signInWithPassword({
  email: "test@example.com",
  password: "password",
});
console.log(res);
```

### Reset Everything

```bash
# Stop dev server (Ctrl+C)
rm -rf .next
npm run dev
```

---

## Files Modified for Auth Fix

- `src/lib/supabase.ts` - Now uses `createBrowserClient()`
- `src/app/login/page.tsx` - Uses `getSupabase()`
- `src/app/components/LogoutButton.tsx` - Uses `getSupabase()`
- `src/app/components/AdminProjectItem.tsx` - Uses `getSupabase()`
- `src/app/components/LogsPreview.tsx` - Uses `getSupabase()`
- `src/app/admin/logs/new/NewLog.tsx` - Uses `getSupabase()`
- `src/app/admin/new/page.tsx` - Uses `getSupabase()`
- `src/lib/auth.ts` - Updated with cookie handling
- `src/middleware.ts` - Handles session refresh

---

## Contact Supabase Support

If you're still having issues:

1. Verify your Supabase project is active
2. Check rate limits aren't exceeded
3. Verify email exists in your Supabase Auth users
4. Check Supabase logs for auth errors

Visit: https://supabase.com/docs/guides/auth/auth-helpers/nextjs
