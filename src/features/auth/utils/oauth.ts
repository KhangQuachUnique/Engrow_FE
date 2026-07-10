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
