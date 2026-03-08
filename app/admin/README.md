# Admin

Admin is **not linked** from the public site (Header/Footer). Visit `/admin` by typing the URL when you need it.

**To reconnect admin to the public site later** (e.g. show an "Admin" link in the main nav):

1. Open `app/components/Header.tsx`.
2. Add a link to `/admin`, for example in `NAV_LINKS` or as a separate item:
   ```ts
   { href: "/admin", label: "Admin" }
   ```
3. Optionally do the same in `app/components/Footer.tsx` in `FOOTER_LINKS` if you want it in the footer.

The dashboard does not fetch counts on load, so the homepage and `/admin` never call admin APIs until you open Work, Testimonials, or Enquiries.
