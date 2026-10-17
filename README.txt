# Kendra Zyrene Co. RSVP Website

## Files
- `index.html` — mobile-friendly RSVP webpage
- `kendra-invitation.jpg` — uploaded invitation image
- `Code.gs` — Google Apps Script backend that records RSVP submissions in Google Sheets

## Connect response collection (Google Sheets)
1. Create a Google Sheet named **Kendra's RSVP Responses**.
2. In the sheet, choose **Extensions → Apps Script**.
3. Replace the editor code with the contents of `Code.gs`, then Save.
4. In Apps Script choose **Deploy → New deployment → Web app**.
5. Set **Execute as: Me** and **Who has access: Anyone**, then Deploy and approve permissions.
6. Copy the deployed Web app URL ending in `/exec`.
7. Open `index.html` in a text editor and replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with that URL.
8. Upload `index.html` and `kendra-invitation.jpg` to the same GitHub repository. Keep both in the repository root. Enable GitHub Pages in **Settings → Pages** and open the published site URL.
9. Test a response, then check the Google Sheet for a new row. Test both Yes and No.

## Important
- The page does not save responses until the endpoint URL is added and the Apps Script web app is deployed with the correct access settings.
- The browser uses `no-cors` for the Apps Script request, so the page cannot confirm whether Google Sheets accepted the row. Always test the sheet directly before sharing the RSVP link.
- Anyone with the deployed endpoint URL can submit responses. Keep the Sheet private; do not share its editor link with guests.
- If you edit `Code.gs` after deployment, go to **Deploy → Manage deployments → Edit**, select a new version, and redeploy.
- For a No response, the number of attendees is automatically set to 0.
