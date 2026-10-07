# Recap AI Studio — Final Free-First Build

## What this is
A GitHub + Vercel friendly AI video recap platform foundation with Supabase Auth, Database, private video storage, credits, admin approvals, project history and a one-click workflow UI.

## 1. Create Supabase (Free)
1. Create a Supabase project.
2. Open SQL Editor.
3. Paste all of `supabase/schema.sql` and run it.
4. In Project Settings → API, copy the Project URL and the `anon` public key.
5. Never put the `service_role` key in `index.html`.

## 2. Run the site
The project is intentionally a static app. Upload `index.html` to GitHub and import the repository into Vercel.
On first open, paste the Supabase URL and anon key into the setup screen.

## 3. Make yourself admin
After creating your account, run this in Supabase SQL Editor, replacing the email:

update public.profiles set role='admin' where email='YOUR_EMAIL';

## 4. Storage
The SQL creates a private `videos` bucket and owner/admin storage policy.

## 5. Free-first AI
The UI and database are ready, but live AI providers are not magically free. When you choose a provider, add its secret only to Supabase Edge Function secrets. The included `ai-pipeline` function is the server-side adapter point.

## 6. Video rendering
Vercel/Supabase are not ideal for long-running FFmpeg jobs. For a production render worker, use a server/worker or a video API and call it from the Edge Function. The app already stores `source_path` and project status for that integration.

## 7. Credit flow
- User requests a plan.
- Admin reviews request.
- Admin approval calls `approve_credit_request`.
- Credits are added to the user's balance and ledger.
- A one-click job spends credits through `spend_credits`.

## 8. Important limits
Free tiers have quotas. Video files consume storage quickly, and AI/TTS/render providers may have separate quotas or charges. This build avoids paid dependencies by default but cannot make third-party AI compute permanently free.

## 9. Recommended production hardening
- Add email verification.
- Add rate limits and abuse protection.
- Add signed upload URLs for larger videos.
- Add a queue + render worker for long jobs.
- Add server-side device/IP trial enforcement before granting credits.
- Add payment provider only after the core workflow is stable.
