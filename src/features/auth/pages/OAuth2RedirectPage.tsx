import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { parseOAuthTokens } from "../utils/oauth";
import { appConstants } from "@/share/constants/appConstants";

export default function OAuth2RedirectPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const parseResult = useMemo(() => {
    try {
      const tokens = parseOAuthTokens(searchParams);
      return { tokens, error: null };
    } catch (err) {
      console.error("OAuth2 Redirect Error:", err);
      return { tokens: null, error: "Authentication failed. Please try again." };
    }
  }, [searchParams]);

  useEffect(() => {
    if (parseResult.tokens) {
      const { accessToken, refreshToken } = parseResult.tokens;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Redirect to dashboard
      navigate(appConstants.DASHBOARD, { replace: true });
    } else {
      // Redirect back to login after 3 seconds
      const timer = setTimeout(() => {
        navigate(appConstants.LOGIN, { replace: true });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [parseResult, navigate]);

  const error = parseResult.error;


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
