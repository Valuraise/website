# Valuraise - AI & Data Engineering Consulting Website

A production-ready Next.js 15 website for a tech consulting agency specializing in AI, data engineering, cloud infrastructure, and custom software development.

## Features

- **Modern Design**: Vercel-inspired aesthetic with custom Tailwind CSS theme
- **Responsive Layout**: Mobile-first design that works on all devices
- **Animated Components**: Smooth Framer Motion animations throughout
- **Blog System**: MDX-based blog with reading time and metadata
- **Contact Form**: Server actions for secure form submission with validation
- **SEO Optimized**: Dynamic sitemap, robots.txt, and metadata configuration
- **Performance**: Optimized images, code splitting, and Turbopack support
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML
- **TypeScript**: Fully typed codebase with strict mode enabled

## Project Structure

```
website/
├── app/                          # Next.js app router
│   ├── layout.tsx               # Root layout with fonts
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── sitemap.ts               # Dynamic sitemap
│   ├── robots.ts                # Robots configuration
│   ├── blog/
│   │   ├── page.tsx             # Blog listing
│   │   └── [slug]/page.tsx      # Blog post template
│   ├── methodology/
│   │   └── page.tsx             # Methodology page
│   └── contact/
│       ├── page.tsx             # Contact page
│       └── actions.ts           # Server actions
├── components/                   # React components
│   ├── navigation.tsx           # Header navigation
│   ├── footer.tsx               # Footer with newsletter
│   ├── hero.tsx                 # Landing page hero
│   ├── animated-grid.tsx        # Animated background grid
│   ├── service-card.tsx         # Service showcase card
│   ├── blog-card.tsx            # Blog post card
│   ├── contact-form.tsx         # Contact form component
│   ├── contact-info.tsx         # Contact information
│   ├── cta-section.tsx          # Call-to-action section
│   ├── process-timeline.tsx     # Timeline component
│   ├── mdx-components.tsx       # Custom MDX styling
│   └── newsletter-form.tsx      # Newsletter signup
├── content/
│   └── blog/                    # MDX blog posts
│       ├── ai-implementation-guide.mdx
│       ├── data-engineering-pipelines.mdx
│       └── cloud-migration-strategies.mdx
├── lib/
│   ├── utils.ts                 # Utility functions
│   ├── animations.ts            # Framer Motion variants
│   └── blog.ts                  # Blog utilities
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── postcss.config.js
├── components.json              # shadcn/ui config
└── README.md
```

## Tech Stack

### Core
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Geist Fonts** - Custom typography

### Forms & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation

### Content Management
- **next-mdx-remote** - MDX rendering
- **gray-matter** - Front matter parsing
- **reading-time** - Reading time calculation

### Development
- **Turbopack** - Fast bundler
- **ESLint** - Code linting
- **date-fns** - Date utilities

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd website
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your configuration:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Start development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site.

## Development

### Available Commands

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

### Creating Blog Posts

1. Create a new `.mdx` file in `content/blog/`:
```mdx
---
title: "Your Post Title"
date: "2024-02-04"
author: "Author Name"
excerpt: "Brief description of the post"
tags: ["tag1", "tag2"]
coverImage: "https://example.com/image.jpg"
---

# Post content here
```

2. The post will automatically appear on the blog page at `/blog/your-post-slug`.

### Customizing Design

Edit `tailwind.config.ts` to customize colors, fonts, and spacing:

```typescript
theme: {
  extend: {
    colors: {
      background: "hsl(0, 0%, 100%)",
      foreground: "hsl(0, 0%, 0%)",
      accent: "hsl(0, 0%, 4%)",
      // Add your colors here
    },
  },
}
```

## Pages

### Home (`/`)
- Hero section with animated background
- Service offerings grid
- Statistics and metrics
- Testimonials
- Why choose us section

### Blog (`/blog`)
- Blog post listing with cards
- Automatic MDX rendering
- Reading time and metadata
- Social sharing ready

### Blog Post (`/blog/[slug]`)
- Full article with MDX content
- Author information
- Reading time
- Navigation to previous/next posts

### Methodology (`/methodology`)
- 6-step process timeline
- Success metrics
- Core principles
- Client testimonial

### Contact (`/contact`)
- Contact form with validation
- Contact information cards
- FAQ section
- Map integration ready

## Performance Optimization

- **Image Optimization**: All images use Next.js Image component
- **Code Splitting**: Dynamic imports for heavy components
- **Caching**: Optimized cache headers
- **Minification**: Automatic with Next.js build
- **SEO**: Dynamic metadata and sitemap

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Color contrast compliance (4.5:1 minimum)
- Skip to main content link

## SEO

- Dynamic metadata configuration
- OpenGraph and Twitter card support
- Automatic sitemap generation (`/sitemap.xml`)
- Robots.txt configuration (`/robots.txt`)
- Structured data ready for implementation

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy

### Deploy to Other Platforms

Build and start the application:
```bash
npm run build
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Your site's URL | Yes |
| `RESEND_API_KEY` | Email API key (optional) | No |
| `CONTACT_EMAIL` | Contact form recipient | No |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Metrics

Target Lighthouse scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## Known Limitations & Future Enhancements

- Email integration placeholder (implement with Resend/SendGrid)
- Blog post search (ready for implementation)
- Newsletter signup backend
- Contact form email notifications
- Analytics integration

## Contributing

When contributing, follow these guidelines:

1. Write descriptive commit messages
2. Update tests if needed
3. Follow the existing code style
4. Update documentation

## Support

For issues, questions, or feedback:
- Open an issue on GitHub
- Check existing documentation
- Review the code comments

## License

MIT License - see LICENSE file for details

## Credits

- Design inspired by Vercel and modern SaaS websites
- Built with Next.js, React, and Tailwind CSS
- Icons by Lucide React

---

**Ready to launch your Valuraise website?** Deploy to Vercel with one click or follow the deployment instructions above.
