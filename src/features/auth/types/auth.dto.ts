export type LoginRequestDto = {
  email: string;
  password: string;
};

export type RegisterRequestDto = {
  email: string;
  fullName: string;
  password: string;
};

export type SendRegisterOtpRequestDto = {
  email: string;
};

export type VerifyRegisterOtpRequestDto = {
  email: string;
  otp: string;
};

export type VerifyRegisterOtpResponseDto = {
  registerToken?: string;
};

export type AuthUserResponseDto = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  avatarUrl?: string;
};

export type LoginResponseDto = {
  accessToken: string;
  refreshToken: string;
  user: AuthUserResponseDto;
};

export type RegisterResponseDto = {
  accessToken: string;
  refreshToken: string;
  user: AuthUserResponseDto;
};
