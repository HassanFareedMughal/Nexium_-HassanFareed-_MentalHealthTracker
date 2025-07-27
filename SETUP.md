# Quick Setup Guide

## To Fix the Email Issue (Magic Link Authentication)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project
4. Wait for the project to be ready

### 2. Get Your Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

### 3. Create Environment File
Create a file called `.env.local` in your project root and add:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=any_random_string_here
```

### 4. Enable Email Auth in Supabase
1. Go to **Authentication** → **Settings**
2. Enable **Email Auth**
3. Enable **Magic Links**
4. Save changes

### 5. Test the App
1. Run `npm run dev`
2. Go to http://localhost:3000
3. Enter your email and click "Get Started"
4. Check your email for the magic link

## Alternative: Quick Test Mode

If you want to test the app without setting up Supabase right now, you can temporarily enable a test mode by updating the magic link handler in `app/page.tsx` to always show success:

```typescript
const handleMagicLinkLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setMessage('');

  // Test mode - always show success
  await new Promise(resolve => setTimeout(resolve, 1000));
  setMessage('Test mode: Magic link would be sent to your email!');
  setIsLoading(false);
};
```

## Next Steps After Setup

1. **Set up database tables** (see README.md for SQL)
2. **Configure MongoDB** (optional for now)
3. **Set up n8n** (optional for AI features)
4. **Deploy to Vercel**

## Troubleshooting

- **"Invalid API key"**: Check your Supabase credentials
- **"Email not sent"**: Check Supabase email settings
- **"CORS error"**: Make sure your Supabase URL is correct
- **"Environment variables not found"**: Restart your dev server after creating `.env.local` 