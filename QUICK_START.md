# Quick Start Guide

Get your TechConsult website up and running in minutes.

## Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

## Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```

Update `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Common Tasks

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Type Check
```bash
npm run type-check
```

### Lint Code
```bash
npm run lint
```

## Project Structure Quick Reference

```
website/
├── app/                    # Next.js pages and routes
├── components/             # React components
├── content/blog/           # MDX blog posts
├── lib/                    # Utilities and helpers
├── public/                 # Static files
└── README.md              # Full documentation
```

## Customization Essentials

### Change Site Name (e.g., for Valuraise)
Edit `app/layout.tsx`:
```typescript
title: {
  default: "Valuraise - Your Tagline",
  template: "%s | Valuraise",
}
```

### Update Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  accent: "hsl(your, saturation, lightness)",
  // Update other colors
}
```

### Add Blog Post
1. Create `content/blog/your-post.mdx`
2. Add frontmatter:
```mdx
---
title: "Your Post Title"
date: "2024-02-04"
author: "Your Name"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
coverImage: "https://example.com/image.jpg"
---

# Your content here
```

### Update Contact Email
Edit `components/footer.tsx` and `components/contact-info.tsx`:
```typescript
<a href="mailto:your-email@domain.com">
  your-email@domain.com
</a>
```

## Testing Checklist

Visit these URLs to verify everything works:

- [ ] `http://localhost:3000` - Home page
- [ ] `http://localhost:3000/blog` - Blog listing
- [ ] `http://localhost:3000/blog/ai-implementation-guide` - Blog post
- [ ] `http://localhost:3000/methodology` - Methodology page
- [ ] `http://localhost:3000/contact` - Contact page
- [ ] `http://localhost:3000/sitemap.xml` - Sitemap
- [ ] `http://localhost:3000/robots.txt` - Robots.txt

## Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy
5. Add environment variables in project settings

### Deploy to Other Platforms
```bash
npm run build
npm start
```

Then deploy the `.next` folder to your hosting provider.

## Next Steps

1. **Customize Content**: Update company info, services, and blog posts
2. **Add Email Integration**: Connect Resend or SendGrid in `app/contact/actions.ts`
3. **Deploy**: Follow deployment instructions above
4. **Monitor**: Set up analytics and error tracking
5. **Maintain**: Update blog posts regularly, monitor performance

## Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### TypeScript Errors
```bash
npm run type-check
```

### Build Fails
```bash
rm -rf .next
npm run build
```

## Support

- Check `README.md` for detailed documentation
- Review component code comments for implementation details
- See `IMPLEMENTATION_SUMMARY.md` for complete feature list

---

**You're all set!** Happy coding! 🚀
