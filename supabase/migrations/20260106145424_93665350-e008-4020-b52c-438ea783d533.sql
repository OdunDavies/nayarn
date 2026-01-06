-- Add explicit restrictive policy to deny SELECT for non-admin users
-- This ensures role information remains protected even if other policies change
CREATE POLICY "Non-admins cannot view roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (false);