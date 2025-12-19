-- Run this query in your Supabase SQL Editor to make a user an admin
-- Replace 'your_email@example.com' with the actual email address of the user

UPDATE public.profiles
SET role = 'admin'
WHERE email = 'your_email@example.com';

-- Verify the change
SELECT * FROM public.profiles WHERE role = 'admin';
