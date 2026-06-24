# Base React - Production-Grade Frontend Architecture

A scalable, enterprise-ready React project demonstrating best practices for building maintainable frontend applications. Built with TypeScript, React Hook Form, Zod, React Query, and Axios—designed for team reusability and long-term maintainability.

## 🎯 Project Overview

**Base React** is not just a starter template—it's a reference implementation for building scalable React applications. It establishes a clear architectural foundation with proven patterns for:

- **Separation of Concerns**: UI, business logic, and data fetching are clearly separated
- **Type Safety**: End-to-end TypeScript ensures compile-time safety
- **Reusability**: Feature-based modular structure enables code sharing across features
- **Scalability**: Clear conventions make it easy to add new features without degrading the codebase
- **Testability**: Isolated layers and dependency injection patterns facilitate testing
- **Developer Experience**: Centralized config, clear error handling, and consistent patterns reduce cognitive load

This is ideal as a foundation for teams building web applications at scale.

---

## 💻 Tech Stack & Rationale

### Core Framework
- **React 19** — Modern hooks-first approach with improved DX
- **TypeScript 6** — Strict typing prevents runtime errors and improves IDE support

### Build & Dev Tools
- **Vite 8** — Lightning-fast dev server and build (10x faster than Webpack for this scale)
- **Tailwind CSS 4** — Utility-first CSS with custom color system via CSS variables for theming
- **PostCSS 8** — CSS transformation pipeline

### Data & Forms
- **React Query 5** — Server state management with automatic caching, deduplication, and background sync
- **Axios 1.16** — Centralized HTTP client with interceptors for auth and error handling
- **React Hook Form 7** — Lightweight, performant form state management (minimal re-renders)
- **Zod 4** — TypeScript-first schema validation with runtime safety

### Routing & Context
- **React Router 7** — File-system-like routing with lazy loading support
- **React Context API** — Minimal global state for app-level configuration

### Code Quality
- **ESLint 10** — Type-aware linting with React hooks rules
- **TypeScript ESLint** — Strict static analysis for TypeScript code

---

## 📁 Folder Structure & Architecture

```
src/
├── config/                  # Application configuration
│   └── axios/               # Centralized HTTP client setup
│       └── axios.ts         # Axios instance with interceptors
│
├── features/                # Feature modules (scalable!)
│   └── auth/                # Example: Authentication feature
│       ├── components/      # React components
│       │   └── LoginForm.tsx
│       ├── hooks/           # Custom hooks (queries & mutations)
│       │   ├── mutations/
│       │   │   └── useLogin.ts
│       │   ├── queries/
│       │   │   └── useGetMe.ts
│       │   └── useLoginForm.ts
│       ├── services/        # API service functions
│       │   ├── login.ts
│       │   └── getMe.ts
│       ├── types/           # Feature-specific types
│       │   └── loginPayload.ts
│       └── utils/           # Feature-specific utilities
│           └── authErrors.ts
│
├── layouts/                 # Page layout components
│   └── RootLayout.tsx       # Shared layout wrapper
│
├── pages/                   # Page components (connected to routes)
│   ├── DashboardPage.tsx
│   ├── NotFoundPage.tsx
│   └── auth/
│       └── LoginPage.tsx
│
├── routes/                  # Route configuration
│   └── index.tsx            # React Router setup
│
├── share/                   # Shared across all features
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── constants/           # Global constants
│   │   ├── apiConstants.ts  # API endpoint paths
│   │   └── appConstants.ts  # App-wide constants
│   ├── contexts/            # Global contexts
│   │   └── AppContext.tsx   # App-level provider setup
│   ├── hooks/               # Shared custom hooks
│   │   └── useDebounce.ts
│   ├── schemas/             # Zod validation schemas
│   │   ├── auth.ts
│   │   └── index.ts
│   ├── types/               # Global TypeScript types
│   │   ├── api.ts           # API response wrapper type
│   │   └── user/
│   │       └── User.ts
│   └── utils/               # Shared utility functions
│       ├── dateFormat.ts
│       └── index.ts
│
├── main.tsx                 # React entry point
├── App.tsx                  # Root component
├── index.css                # Global styles
└── App.css
```

### Layer Explanation

| Layer | Purpose | Example |
|-------|---------|---------|
| **Pages** | Screen-level components that compose features | `LoginPage` renders `LoginForm` |
| **Components** | Reusable UI (form fields, buttons, dialogs) | `LoginForm.tsx` with inputs and buttons |
| **Hooks** | Encapsulate data fetching and form logic | `useLogin()` mutation, `useGetMe()` query |
| **Services** | Pure API functions (type-safe, framework-agnostic) | `login(payload)`, `getMe()` |
| **Types** | TypeScript interfaces for feature and global data | `LoginPayload`, `User`, `ApiResponse<T>` |
| **Schemas** | Zod validation schemas for forms | `loginSchema` validates email & password |
| **Utils** | Helper functions (formatters, parsers) | `AuthErrorHandler.parse()` |

---

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
Each layer has a single responsibility:
- **UI Components** → Display and user interaction
- **Hooks** → State management and side effects (via React Query)
- **Services** → Pure API calls (no business logic)
- **Types & Schemas** → Contract definitions

**Benefit**: Easy testing, clear dependencies, reduced coupling.

### 2. **Feature-Based Structure**
Organize code by business domain, not technical layer:
```
features/
├── auth/           ← Authentication domain
├── products/       ← Products domain
└── settings/       ← Settings domain
```

**Benefit**: Easier to scale to multiple teams, enables code splitting and lazy loading.

### 3. **Type Safety Throughout**
- API responses are typed: `api.post<ApiResponse<{accessToken: string}>>`
- Form data is inferred from Zod schemas: `type LoginFormData = z.infer<typeof loginSchema>`
- No `any` types

**Benefit**: Catch errors at compile time, IDE autocomplete, self-documenting code.

### 4. **Centralized API Configuration**
All HTTP requests go through a single Axios instance (`config/axios/axios.ts`):
- Auth interceptors automatically attach tokens
- 401 errors redirect to login
- Timeout and base URL configured in one place

**Benefit**: Consistency, easy to add logging, audit trails, or rate limiting.

### 5. **Server State Management with React Query**
React Query handles all API data:
- Automatic caching and deduplication
- Background refetching (stale-while-revalidate pattern)
- Built-in loading and error states
- Optimistic updates support

**Benefit**: No Redux boilerplate, less code, better UX (automatic retry, caching).

---

## 📋 Form Handling Strategy

### Why Zod + React Hook Form?

| Aspect | Solution | Benefit |
|--------|----------|---------|
| **Validation** | Zod schemas | Type-safe, composable, TypeScript inference |
| **State Management** | React Hook Form | Minimal re-renders, small bundle (~8.5kb) |
| **Error Handling** | Field-level errors | User-friendly feedback per field |

### Form Architecture

```
Schema (Zod)
    ↓
Form Hook (React Hook Form)
    ↓
Component (renders inputs, errors)
    ↓
API Service (via React Query mutation)
```

### Example: Login Form

**1. Define Schema** (`share/schemas/auth.ts`):
```typescript
export const loginSchema = z.object({
  email: z.string().min(1).email("Invalid email"),
  password: z.string().min(6),
  rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

**2. Form Hook** (`features/auth/hooks/useLoginForm.ts`):
```typescript
export const useLoginForm = () => {
  const loginMutation = useLogin();
  
  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      const result = await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });
      return result;
    },
    [loginMutation],
  );

  return {
    onSubmit,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};
```

**3. Component** (`features/auth/components/LoginForm.tsx`):
```typescript
export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  
  const loginMutation = useLogin();
  
  return (
    <form onSubmit={handleSubmit((data) => loginMutation.mutate(data))}>
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}
      {/* password field */}
    </form>
  );
}
```

**Benefits**:
- Single source of truth for validation logic
- Type-safe form data
- No manual error management
- Reusable schemas across components

---

## 🔄 Data Fetching Strategy

### React Query Pattern

All API calls use React Query's **queries** (GET) and **mutations** (POST/PUT/DELETE) patterns.

#### Queries (Read Operations)

```typescript
// services/getMe.ts
export const getMe = async () => {
  const res = await api.get<ApiResponse<User>>(apiConstants.AUTH.GET_ME);
  return res.data;
};

// hooks/queries/useGetMe.ts
export const GET_ME_QUERY_KEY = "getMe";

export const useGetMe = () => {
  return useQuery({
    queryKey: [GET_ME_QUERY_KEY],
    queryFn: getMe,
  });
};

// In component
const { data, isLoading, error } = useGetMe();
```

#### Mutations (Write Operations)

```typescript
// services/login.ts
export const login = async (payload: LoginPayload) => {
  const res = await api.post<ApiResponse<{ accessToken: string }>>(
    apiConstants.AUTH.LOGIN,
    payload,
  );
  return res.data;
};

// hooks/mutations/useLogin.ts
export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await login(payload);
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
      return response;
    },
    onSuccess: () => {
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.error("Login failed:", AuthErrorHandler.parse(error));
    },
  });
};

// In component
const loginMutation = useLogin();
loginMutation.mutate(loginData);
```

### Configuration (`main.tsx`)

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // Refetch if data older than 5 min
      gcTime: 10 * 60 * 1000,        // Keep cached data for 10 min
    },
  },
});
```

**Benefits**:
- Automatic caching and deduplication (same query called twice = one API call)
- Background refetching (keep data fresh)
- Built-in loading/error states
- Optimistic updates support
- DevTools for debugging

---

## 🔌 API Layer Design

### Centralized Axios Instance

**File**: `config/axios/axios.ts`

```typescript
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Attach auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
```

### Type-Safe API Functions

All API service functions are typed end-to-end:

```typescript
// services/login.ts
export const login = async (payload: LoginPayload) => {
  const res = await api.post<ApiResponse<{ accessToken: string }>>(
    apiConstants.AUTH.LOGIN,
    payload,
  );
  return res.data;  // Typed as ApiResponse<{accessToken: string}>
};
```

### Global API Response Wrapper

```typescript
// share/types/api.ts
export interface ApiResponse<T> {
  code: number;
  data: T;
  message?: string;
}
```

**Benefits**:
- All API logic centralized in one place
- Auth token automatically attached
- 401 errors automatically redirect to login
- Consistent error handling
- Easy to add logging, rate limiting, or analytics

---

## 🔄 Example Flow: Complete Login Flow

Let's trace the complete flow from UI to API to understand how all pieces connect:

### 1. User visits LoginPage

```typescript
// pages/auth/LoginPage.tsx
export default function LoginPage() {
  return <LoginForm />;
}
```

### 2. LoginForm Component Renders

```typescript
// features/auth/components/LoginForm.tsx
export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  
  const loginMutation = useLogin();
  
  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}
      
      <input {...register("password")} type="password" placeholder="Password" />
      {errors.password && <p>{errors.password.message}</p>}
      
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

### 3. Form Validation (Zod Schema)

```typescript
// share/schemas/auth.ts
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});
```

### 4. useLogin Hook (React Query Mutation)

```typescript
// features/auth/hooks/mutations/useLogin.ts
export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      return await login(payload);  // Call service function
    },
    onSuccess: (response) => {
      // Save token
      localStorage.setItem("accessToken", response.data.accessToken);
      // Redirect to dashboard
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      // Error displayed in component via mutation.error
      console.error("Login failed:", error);
    },
  });
};
```

### 5. Service Function (API Call)

```typescript
// features/auth/services/login.ts
export const login = async (payload: LoginPayload) => {
  const res = await api.post<ApiResponse<{ accessToken: string }>>(
    apiConstants.AUTH.LOGIN,
    payload,
  );
  return res.data;
};
```

### 6. Axios Interceptor (Automatic)

```typescript
// config/axios/axios.ts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
```

### 7. HTTP Request Sent

```
POST /api/auth/login HTTP/1.1
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### 8. Response Handled

```json
{
  "code": 200,
  "data": {
    "accessToken": "eyJhbGc..."
  }
}
```

### 9. Token Saved & User Redirected

Token stored in localStorage, user navigated to `/dashboard`.

### 10. (Optional) Fetch Current User

```typescript
// On app load, fetch current user
const { data: user } = useGetMe();

if (user) {
  // Update app state with user info
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Base_React

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_BASE_URL=http://localhost:3001/api
```

### Development Server

```bash
npm run dev
```

Starts Vite dev server at `http://localhost:5173` with HMR enabled.

### Build for Production

```bash
npm run build
```

Outputs optimized bundle to `dist/`.

### Linting

```bash
npm run lint
```

Runs ESLint with TypeScript type checking.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally.

---

## 🔧 How to Extend: Adding a New Feature

Follow this step-by-step guide to add a new feature (e.g., "Products Management").

### Step 1: Create Feature Directory Structure

```bash
src/features/products/
├── components/
│   ├── ProductList.tsx
│   └── ProductForm.tsx
├── hooks/
│   ├── mutations/
│   │   └── useCreateProduct.ts
│   │   └── useUpdateProduct.ts
│   │   └── useDeleteProduct.ts
│   └── queries/
│       └── useGetProducts.ts
├── services/
│   └── productService.ts
├── types/
│   └── Product.ts
└── utils/
    └── productValidation.ts
```

### Step 2: Define Types

```typescript
// features/products/types/Product.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  createdAt: string;
}
```

### Step 3: Create Zod Schema

```typescript
// share/schemas/product.ts
export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be positive"),
  description: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
```

### Step 4: Create API Service Functions

```typescript
// features/products/services/productService.ts
import { api } from "@/config/axios/axios";
import { apiConstants } from "@/share/constants/apiConstants";
import type { ApiResponse } from "@/share/types/api";
import type { Product } from "../types/Product";

export const getProducts = async () => {
  const res = await api.get<ApiResponse<Product[]>>(
    apiConstants.PRODUCTS.LIST,
  );
  return res.data;
};

export const createProduct = async (payload: ProductFormData) => {
  const res = await api.post<ApiResponse<Product>>(
    apiConstants.PRODUCTS.CREATE,
    payload,
  );
  return res.data;
};

export const updateProduct = async (id: number, payload: ProductFormData) => {
  const res = await api.put<ApiResponse<Product>>(
    apiConstants.PRODUCTS.UPDATE(id),
    payload,
  );
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await api.delete<ApiResponse<void>>(
    apiConstants.PRODUCTS.DELETE(id),
  );
  return res.data;
};
```

### Step 5: Create React Query Hooks

```typescript
// features/products/hooks/queries/useGetProducts.ts
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productService";

export const PRODUCTS_QUERY_KEY = "products";

export const useGetProducts = () => {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn: getProducts,
  });
};
```

```typescript
// features/products/hooks/mutations/useCreateProduct.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../services/productService";
import type { ProductFormData } from "@/share/schemas/product";
import { PRODUCTS_QUERY_KEY } from "../queries/useGetProducts";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate cache to refetch products
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
    },
  });
};
```

### Step 6: Create Components

```typescript
// features/products/components/ProductForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "@/share/schemas/product";
import { useCreateProduct } from "../hooks/mutations/useCreateProduct";

export default function ProductForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const createMutation = useCreateProduct();

  const onSubmit = (data: ProductFormData) => {
    createMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Product Name</label>
        <input {...register("name")} placeholder="Enter product name" />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input {...register("price", { valueAsNumber: true })} type="number" />
        {errors.price && <p>{errors.price.message}</p>}
      </div>

      <button type="submit" disabled={createMutation.isPending}>
        {createMutation.isPending ? "Creating..." : "Create Product"}
      </button>
    </form>
  );
}
```

### Step 7: Create Page Component

```typescript
// pages/ProductsPage.tsx
import ProductList from "@/features/products/components/ProductList";
import ProductForm from "@/features/products/components/ProductForm";

export default function ProductsPage() {
  return (
    <div>
      <h1>Products Management</h1>
      <ProductForm />
      <ProductList />
    </div>
  );
}
```

### Step 8: Add Route

```typescript
// routes/index.tsx
import ProductsPage from "@/pages/ProductsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/products",
        element: <ProductsPage />,
      },
    ],
  },
]);
```

### Step 9: Add API Constants

```typescript
// share/constants/apiConstants.ts
export const apiConstants = {
  PRODUCTS: {
    LIST: "/api/products",
    CREATE: "/api/products",
    UPDATE: (id: number) => `/api/products/${id}`,
    DELETE: (id: number) => `/api/products/${id}`,
  },
};
```

---

## ✅ Best Practices Enforced in This Project

### 1. **Type Safety**
- All API responses are typed
- Form data types inferred from schemas
- No `any` types

### 2. **Component Composition**
- Components are small and focused
- Props are typed
- One component = one responsibility

### 3. **Error Handling**
```typescript
// Centralized error handling
export class AuthErrorHandler {
  static parse(error: unknown): AuthError {
    // Parse Axios errors, network errors, etc.
  }
  
  static getMessage(error: unknown): string {
    // User-friendly error messages
  }
}
```

### 4. **API Layer Abstraction**
- All HTTP requests go through service functions
- Components never call `api.get/post` directly
- Easy to mock for testing

### 5. **State Management Separation**
- **Server State** (React Query): User data, products, etc.
- **Client State** (useState): Form state, UI toggles
- **Context** (AppContext): Global app config

### 6. **Query Key Management**
```typescript
// Named constants for React Query keys
export const PRODUCTS_QUERY_KEY = "products";
export const GET_ME_QUERY_KEY = "getMe";
```

### 7. **Interceptor Pattern**
- Authentication automatically attached
- 401 errors globally handled
- Centralized configuration

### 8. **Feature Isolation**
- Each feature has its own folder
- Share utilities only in `share/`
- Features don't depend on each other

### 9. **Validation at Multiple Layers**
```
Zod Schema (client-side)
    ↓
React Hook Form (form state)
    ↓
API Service (pre-validation)
    ↓
Backend (final validation)
```

### 10. **Tailwind + CSS Variables for Theming**
```css
/* Allows dynamic theme switching */
:root {
  --color-primary-500: 59 130 246; /* blue-500 */
}

/* Tailwind config */
primary: {
  500: "rgb(var(--color-primary-500) / <alpha-value>)"
}
```

### 11. **ESLint + TypeScript Strict Mode**
- React hooks rules enforced
- Unused variables caught
- Type checking in CI/CD

### 12. **Environment-Based Configuration**
```typescript
baseURL: import.meta.env.VITE_BASE_URL
```

---

## 🔮 Future Improvements

### Phase 1: Testing Infrastructure
- **Unit tests** (Vitest)
- **Component tests** (React Testing Library)
- **E2E tests** (Playwright)
- Test coverage reporting

### Phase 2: Performance Optimization
- Code splitting by feature
- Lazy-loaded routes
- Bundle size monitoring
- Web Vitals tracking

### Phase 3: Developer Experience
- Storybook for component library
- Pre-commit hooks (Husky + Lint-staged)
- Changelog automation
- API mocking (MSW) for development

### Phase 4: Monitoring & Analytics
- Error tracking (Sentry)
- Performance monitoring (Web Vitals, Datadog)
- User analytics
- A/B testing framework

### Phase 5: Advanced State Management
- Zustand for client state (if Context becomes insufficient)
- Optimistic updates with React Query
- Offline-first with local sync

### Phase 6: Internationalization (i18n)
- Multi-language support
- Dynamic locale switching
- Translation management

---

## 📚 Key References

| Topic | Link |
|-------|------|
| React Query Docs | https://tanstack.com/query/latest |
| Zod Documentation | https://zod.dev/ |
| React Hook Form | https://react-hook-form.com/ |
| Axios | https://axios-http.com/ |
| React Router | https://reactrouter.com/ |
| Tailwind CSS | https://tailwindcss.com/ |
| TypeScript | https://www.typescriptlang.org/ |
| Vite | https://vitejs.dev/ |

---

## 💡 Tips for Developers

### How to Debug API Issues
1. Check `config/axios/axios.ts` for interceptors
2. Look at `share/constants/apiConstants.ts` for endpoint paths
3. Use React Query DevTools: Add `import { ReactQueryDevtools } from '@tanstack/react-query-devtools'` to `main.tsx`
4. Check Network tab in browser DevTools

### How to Add a Global Loading State
```typescript
// share/contexts/AppContext.tsx
interface AppContextType {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export const useAppContext = () => {
  return useContext(AppContext);
};
```

### How to Share Data Between Routes
Use React Query with shared query keys:
```typescript
// Feature A writes
queryClient.setQueryData([SHARED_KEY], newData);

// Feature B reads
const { data } = useQuery({ queryKey: [SHARED_KEY] });
```

---

## 🤝 Contributing

When adding new features:
1. Follow the feature-based folder structure
2. Create types before components
3. Add Zod schema for validation
4. Create service functions before hooks
5. Write components last
6. Run `npm run lint` before committing

---

## 📄 License

This project is provided as-is for team reference and reuse. Customize as needed for your organization.

---

**Happy coding! 🚀**
