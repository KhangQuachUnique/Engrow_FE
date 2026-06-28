import { isAxiosError } from "axios";

export interface AuthError {
  code: string;
  message: string;
  statusCode?: number;
}

interface AuthErrorResponse {
  code?: string;
  message?: string;
}

export class AuthErrorHandler {
  static parse(error: unknown): AuthError {
    if (isAxiosError<AuthErrorResponse>(error)) {
      const status = error.response?.status;
      const data = error.response?.data;

      if (data?.message) {
        return {
          code: data.code || (status ? `ERROR_${status}` : "ERROR"),
          message: data.message,
          statusCode: status,
        };
      }

      const messages: Record<number, string> = {
        400: "Thông tin không hợp lệ",
        401: "Email hoặc mật khẩu không đúng",
        403: "Bạn không có quyền truy cập",
        404: "Tài nguyên không tìm thấy",
        500: "Lỗi máy chủ, vui lòng thử lại sau",
        503: "Máy chủ tạm thời không khả dụng",
      };

      return {
        code: status ? `HTTP_${status}` : "HTTP_ERROR",
        message: status ? messages[status] || "Có lỗi xảy ra" : "Có lỗi xảy ra",
        statusCode: status,
      };
    }

    if (error && typeof error === "object" && "message" in error) {
      const err = error as Error;
      if (err.message.includes("timeout")) {
        return {
          code: "NETWORK_TIMEOUT",
          message: "Kết nối timed out, vui lòng thử lại",
        };
      }
      if (err.message.includes("Network")) {
        return {
          code: "NETWORK_ERROR",
          message: "Lỗi kết nối, kiểm tra internet của bạn",
        };
      }
    }

    return {
      code: "UNKNOWN_ERROR",
      message: "Có lỗi không xác định xảy ra",
    };
  }

  static getMessage(error: unknown): string {
    return this.parse(error).message;
  }
}
