# CMS Admin Path Testing Guide

## INSTRUCTIONS

1. Restart the dev server:
   ```
   npm run dev
   ```

2. Watch the terminal output for debug messages like:
   ```
   [admin-middleware] Intercepted request: /blog/admin/
   [admin-middleware] Serving: C:\...\public\admin\index.html
   ```

3. Test these URLs in your browser:

## URLS TO TEST

### ✓ These SHOULD work now:
- http://localhost:5173/blog/ → Main blog app
- http://localhost:5173/blog/blog → Blog list page
- http://localhost:5173/blog/admin/ → **Decap CMS admin interface**
- http://localhost:5173/blog/admin/#/collections/blog → **CMS post list**
- http://localhost:5173/blog/admin/#/collections/blog/new → **CMS create post**
- http://localhost:5173/blog/admin/#/collections/blog/urban-farming-benefits → **CMS edit post**
- http://localhost:5173/blog/admin/test.txt → Should show "Middleware is working!" message
- http://localhost:5173/blog/admin/config.yml → CMS configuration file

### ✗ These should NOT work:
- http://localhost:5173/admin/ → Should show React 404 (admin directory at root, not under /blog/)
- http://localhost:5173/blog/nonexistent → Should show React 404

## WHAT TO LOOK FOR

### In the browser:
- `/blog/admin/` should show **Decap CMS interface** (logo, collections list, login)
- Should NOT show "404 — Page Not Found" with blue background

### In the terminal:
- Watch for `[admin-middleware] Intercepted request:` messages
- Should show `Serving:` followed by a file path

## EXPECTED CMS LAYOUT

When `/blog/admin/` loads correctly, you should see:
- "ULN CMS" in the title
- A main editing area for collections
- "Blog Posts" collection visible
- Buttons to: Edit, Delete, Create from each post

## WHAT HAPPENS NEXT

Once CMS loads:

1. **Create New Post**:
   - Click the "New" button or go to `/blog/admin/#/collections/blog/new`
   - Fill in: Title, Description, Date, Author, Body, Tags
   - Click "Publish"
   - Git commit is made automatically
   - Post appears in `/blog/blog` after page refresh

2. **Edit Post**:
   - Click a post from the collection
   - Edit the frontmatter and markdown content
   - Click "Publish"
   - Changes committed to git
   - Refresh blog to see updates

3. **Delete Post**:
   - Select a post
   - Click Delete 
   - File removed from `content/posts/`
   - Changes committed to git

## IF STILL GETTING 404

Check terminal for error messages. If middleware isn't being invoked:
- Vite middleware system might need adjustments
- Will need to create actual `/admin` directory in dist folder for production
- Or use environment-specific routing
