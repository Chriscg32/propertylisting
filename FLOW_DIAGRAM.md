# Flow diagram file
Property_Lister project/
├── .env
├── .git/
├── .gitignore
├── docker-compose.yml
├── README.md
├── backend/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── app.js
│   ├── config/
│   │   └── supabase.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Listing.js
│   │   ├── Media.js
│   │   └── User.js
│   ├── package.json
│   ├── routes/
│   │   ├── auth.js
│   │   ├── leads.js
│   │   ├── listings.js
│   │   ├── upload.js
│   │   └── users.js
│   └── services/
│       ├── n8n.js
│       └── openai.js
├── database/
│   └── schema.sql
└── frontend/
    ├── .env.local
    ├── .env.example
    ├── .gitignore
    ├── Dockerfile
    ├── next.config.js
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── README.md
    ├── app/
    │   ├── (auth)/
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   └── register/
    │   │       └── page.tsx
    │   ├── (dashboard)/
    │   │   ├── dashboard/
    │   │   │   └── page.tsx
    │   │   ├── listings/
    │   │   │   └── page.tsx
    │   │   └── create-listing/
    │   │       └── page.tsx
    │   ├── (public)/
    │   │   ├── listings/
    │   │   │   └── page.tsx
    │   │   └── listing/
    │   │       └── [id]/
    │   │           └── page.tsx
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── layout/
    │   ├── property/
    │   ├── dashboard/
    │   └── listing/
    ├── context/
    │   └── AuthContext.tsx
    ├── hooks/
    │   └── useAuth.ts
    ├── lib/
    │   ├── api.ts
    │   └── auth.ts
    ├── public/
    │   ├── favicon.ico
    │   └── images/
    └── types/
        └── index.ts