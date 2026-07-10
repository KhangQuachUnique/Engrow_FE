# Google OAuth2 Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Google login and register by redirecting to the backend authorization URL and handling the redirect callback to save access/refresh tokens in localStorage.

**Architecture:** Add OAuth2 redirection triggers to the existing Google buttons on Login and Register forms, implement an OAuth2RedirectPage page to parse callback query parameters, store tokens in localStorage, and redirect the user to the Dashboard path.

**Tech Stack:** React, TypeScript, React Router DOM, Vite

## Global Constraints

- Do NOT modify button designs or UI layouts; only attach the onClick/redirect integration.
- Redirect URI must use the dynamic `window.location.origin`.
- Target endpoint must use the configured `import.meta.env.VITE_BASE_URL` (with fallback to `http://localhost:8080`).
- Both `accessToken` and `refreshToken` must be saved in `localStorage`.
- Redirect to dashboard `/` upon successful OAuth2 callback.

---

### Task 1: Create Token Parsing Utility with Test

**Files:**
- Create: `src/features/auth/utils/oauth.ts`
- Test: `src/features/auth/utils/oauth.test.ts`

**Interfaces:**
- Consumes: `URLSearchParams` object from browser.
- Produces: `parseOAuthTokens(searchParams: URLSearchParams)` returning `{ accessToken: string, refreshToken: string }` or throwing Error.

- [ ] **Step 1: Write the failing test**

  Write test in `src/features/auth/utils/oauth.test.ts`:
  ```typescript
  import { parseOAuthTokens } from "./oauth";
  import assert from "assert";

  // Test Case 1: Valid params
  {
    const params = new URLSearchParams("accessToken=token123&refreshToken=ref456");
    const result = parseOAuthTokens(params);
    assert.deepStrictEqual(result, { accessToken: "token123", refreshToken: "ref456" });
  }

  // Test Case 2: Missing params
  {
    const params = new URLSearchParams("accessToken=token123");
    assert.throws(() => parseOAuthTokens(params), /Missing accessToken or refreshToken/);
  }

  console.log("All oauth helper tests passed!");
  ```

- [ ] **Step 2: Run test to verify it fails**

  Run: `npx tsx src/features/auth/utils/oauth.test.ts`
  Expected: FAIL with module resolution error / function not defined.

- [ ] **Step 3: Write minimal implementation**

  Create `src/features/auth/utils/oauth.ts`:
  ```typescript
  export interface OAuthTokens {
    accessToken: string;
    refreshToken: string;
  }

  export function parseOAuthTokens(searchParams: URLSearchParams): OAuthTokens {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (!accessToken || !refreshToken) {
      throw new Error("Missing accessToken or refreshToken");
    }

    return { accessToken, refreshToken };
  }
  ```

- [ ] **Step 4: Run test to verify it passes**

  Run: `npx tsx src/features/auth/utils/oauth.test.ts`
  Expected: PASS (output "All oauth helper tests passed!")

- [ ] **Step 5: Commit**

  ```bash
  git add src/features/auth/utils/oauth.ts src/features/auth/utils/oauth.test.ts
  git commit -m "feat(auth): add parseOAuthTokens utility and tests"
  ```

---

### Task 2: Create OAuth2RedirectPage and Register Route

**Files:**
- Create: `src/features/auth/pages/OAuth2RedirectPage.tsx`
- Modify: `src/routes/index.tsx`

**Interfaces:**
- Consumes: `/oauth2/redirect` route.
- Produces: Rendering of redirect loading UI, storage of tokens in localStorage, redirection to dashboard.

- [ ] **Step 1: Create OAuth2RedirectPage component**

  Create `src/features/auth/pages/OAuth2RedirectPage.tsx`:
  ```tsx
  import { useEffect, useState } from "react";
  import { useNavigate, useSearchParams } from "react-router-dom";
  import { parseOAuthTokens } from "../utils/oauth";
  import { appConstants } from "@/share/constants/appConstants";
  import { cn } from "@/share/utils/cn";

  export default function OAuth2RedirectPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      try {
        const { accessToken, refreshToken } = parseOAuthTokens(searchParams);
        
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Redirect to dashboard
        navigate(appConstants.DASHBOARD, { replace: true });
      } catch (err) {
        console.error("OAuth2 Redirect Error:", err);
        setError("Authentication failed. Please try again.");
        
        // Redirect back to login after 3 seconds
        const timer = setTimeout(() => {
          navigate(appConstants.LOGIN, { replace: true });
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    }, [searchParams, navigate]);

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md text-center space-y-4">
          {error ? (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Authentication Error
              </h2>
              <p className="text-sm text-gray-600">{error}</p>
              <p className="text-xs text-gray-400">Redirecting to login page...</p>
            </>
          ) : (
            <>
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-brand border-t-transparent"></div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Completing Sign In
              </h2>
              <p className="text-sm text-gray-600">Please wait while we log you in...</p>
            </>
          )}
        </div>
      </div>
    );
  }
  ```

- [ ] **Step 2: Register the /oauth2/redirect route**

  Modify `src/routes/index.tsx` to add `/oauth2/redirect` path:
  ```typescript
  import { createBrowserRouter } from "react-router-dom";
  import LoginPage from "@/features/auth/pages/LoginPage";
  import RegisterPage from "@/features/auth/pages/RegisterPage";
  import OAuth2RedirectPage from "@/features/auth/pages/OAuth2RedirectPage";
  import DashboardPage from "@/pages/DashboardPage";
  import NotFoundPage from "@/pages/NotFoundPage";
  import { appConstants } from "@/share/constants/appConstants";

  export const router = createBrowserRouter([
    {
      path: appConstants.DASHBOARD,
      element: <DashboardPage />,
    },
    {
      path: appConstants.LOGIN,
      element: <LoginPage />,
    },
    {
      path: appConstants.REGISTER,
      element: <RegisterPage />,
    },
    {
      path: "/oauth2/redirect",
      element: <OAuth2RedirectPage />,
    },
    {
      path: appConstants.NOT_FOUND,
      element: <NotFoundPage />,
    },
  ]);
  ```

- [ ] **Step 3: Verify typescript compilation and lints**

  Run: `npm run build`
  Expected: Build succeeds with no TS errors.
  Run: `npm run lint`
  Expected: Lints pass with no errors.

- [ ] **Step 4: Commit**

  ```bash
  git add src/features/auth/pages/OAuth2RedirectPage.tsx src/routes/index.tsx
  git commit -m "feat(auth): create OAuth2RedirectPage and register route"
  ```

---

### Task 3: Update Google Login Button Handlers

**Files:**
- Modify: `src/features/auth/components/login/LoginForm.tsx`
- Modify: `src/features/auth/components/register/RegisterEmailStep.tsx`

**Interfaces:**
- Consumes: Google buttons click events.
- Produces: Redirecting browser window origin to OAuth endpoint.

- [ ] **Step 1: Update LoginForm.tsx to redirect on Google button click**

  Modify the Google button action in `src/features/auth/components/login/LoginForm.tsx`:
  ```tsx
  // Add handler function inside LoginForm component:
  const handleGoogleLogin = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8080";
    const redirectUri = `${window.location.origin}/oauth2/redirect`;
    window.location.href = `${baseUrl}/oauth2/authorization/google?redirect_uri=${redirectUri}`;
  };
  ```
  Update the provider button rendering:
  ```tsx
  {SOCIAL_PROVIDERS.map((provider) => (
    <Button
      key={provider.label}
      className="min-h-11 rounded-xl px-4 py-2.5 font-sans text-sm font-semibold leading-5"
      iconLeft={
        <provider.icon aria-hidden="true" className={socialIconClass} />
      }
      onClick={provider.label === "Google" ? handleGoogleLogin : undefined}
      variant="secondary">
      {provider.label}
    </Button>
  ))}
  ```

- [ ] **Step 2: Update RegisterEmailStep.tsx to redirect on Google button click**

  Modify the Google button action in `src/features/auth/components/register/RegisterEmailStep.tsx`:
  ```tsx
  // Add handler function inside RegisterEmailStep component:
  const handleGoogleLogin = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8080";
    const redirectUri = `${window.location.origin}/oauth2/redirect`;
    window.location.href = `${baseUrl}/oauth2/authorization/google?redirect_uri=${redirectUri}`;
  };
  ```
  Update the provider button rendering:
  ```tsx
  {SOCIAL_PROVIDERS.map((provider) => (
    <Button
      key={provider.label}
      className="min-h-11 rounded-xl px-4 py-2.5 font-sans text-sm font-semibold leading-5"
      iconLeft={
        <provider.icon aria-hidden="true" className={socialIconClass} />
      }
      onClick={provider.label === "Google" ? handleGoogleLogin : undefined}
      variant="secondary">
      {provider.label}
    </Button>
  ))}
  ```

- [ ] **Step 3: Run verify build and lint**

  Run: `npm run build && npm run lint`
  Expected: PASS

- [ ] **Step 4: Commit**

  ```bash
  git add src/features/auth/components/login/LoginForm.tsx src/features/auth/components/register/RegisterEmailStep.tsx
  git commit -m "feat(auth): integrate google login and register redirect triggers"
  ```
