

## Fix Account/Profile Navigation

This plan fixes two issues with the account/profile navigation in the header:
1. Mobile "Account" link shows an error (because the page doesn't exist)
2. Desktop User icon does nothing when clicked

### The Problem

- **Mobile**: The hamburger menu has an "Account" link pointing to `/account`, but this route doesn't exist in your app - it leads to the 404 page
- **Desktop**: The User icon is just a button with no action attached - clicking it does nothing

### Solution Options

Since this is a customer-facing shop with admin-only login (not customer accounts), there are two approaches:

**Option A - Link to Admin Login**
Since there are no customer accounts, redirect both the mobile "Account" and desktop User icon to the admin login page at `/admin/login`. This makes sense if you want quick access to admin functionality.

**Option B - Remove Account/User Elements**
Since customers don't have accounts, remove these elements entirely to avoid confusion:
- Remove the "Account" link from mobile menu
- Remove the User icon from desktop header

### Recommended Approach: Option A

I recommend linking to admin login since it provides useful functionality while maintaining the professional appearance of having an account option.

### Changes Required

**File: `src/components/layout/Header.tsx`**

1. **Desktop User Icon** (line 67-69)
   - Change from a plain `<button>` to a `<Link>` component
   - Navigate to `/admin/login` when clicked

2. **Mobile Account Link** (line 110-116)
   - Update the link from `/account` to `/admin/login`
   - Optionally rename "Account" to "Admin" for clarity

### Technical Details

The changes are minimal - just updating two navigation targets in the Header component. No new pages or routes need to be created.

