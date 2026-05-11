# Vercel Deployment Instructions

## Quick Start

### 1. Import Repository to Vercel
1. Go to https://vercel.com/new
2. Import Git Repository: https://github.com/safir2310/ayamgeprek-apps26
3. Click "Import"

### 2. Configure Environment Variables
In Vercel project settings, add these environment variables:

#### DATABASE_URL
```
Key: DATABASE_URL
Value: file:/var/data/custom.db
```

#### JWT_SECRET
```
Key: JWT_SECRET
Value: ayam-geprek-secret-key-production-2024-secure
```

**Note:** In production, use a stronger JWT_SECRET!
Generate a new secure secret and use it instead.

### 3. Configure Database
Since this uses SQLite, Vercel serverless functions will need:
- A persistent storage solution
- OR migrate to PostgreSQL/MySQL with connection pooling

### Recommended: Use Neon PostgreSQL for Production
1. Sign up at https://neon.tech
2. Create a new project
3. Get the connection string (DATABASE_URL)
4. Update .env locally and in Vercel settings:
   ```
   DATABASE_URL=postgresql://user:password@ep-name.aws.neon.tech/dbname
   ```

### 4. Deploy
Click "Deploy" and wait for the deployment to complete.

## Deployment Checklist

- [ ] Repository imported to Vercel
- [ ] Environment variables configured (DATABASE_URL, JWT_SECRET)
- [ ] Database configured (PostgreSQL recommended)
- [ ] Build successful
- [ ] Deployment complete
- [ ] Test all features on production URL

## Post-Deployment Testing

### Test These Features:
1. **Authentication**
   - [ ] User login
   - [ ] User registration
   - [ ] Token persistence

2. **Checkout**
   - [ ] Add to cart
   - [ ] Place order
   - [ ] Verify token works
   - [ ] Test invalid token handling

3. **Admin Features**
   - [ ] Login with admin account
   - [ ] Access admin dashboard
   - [ ] Manage products
   - [ ] Manage orders

4. **Database**
   - [ ] User data persistence
   - [ ] Order creation
   - [ ] Cart functionality

## Troubleshooting

### Build Fails
- Check environment variables in Vercel dashboard
- Review Vercel build logs
- Check Next.js version compatibility

### Database Errors
- Verify DATABASE_URL is correct
- Check database connection pooling
- Review Prisma schema

### Token Errors
- Verify JWT_SECRET is set
- Check token expiration (7 days)
- Review auth.ts token verification logic

## Production URLs

After deployment:
- **Preview:** https://ayamgeprek-apps26-[random].vercel.app
- **Production:** https://ayamgeprek-apps26.vercel.app (after adding custom domain)

---

**Last Updated:** 2026-05-11
**Status:** Ready for Deployment
