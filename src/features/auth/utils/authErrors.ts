/**
 * Auth error types and utilities
 */

export interface AuthError {
  code: string;
  message: string;
  statusCode?: number;
}

export class AuthErrorHandler {
  static parse(error: unknown): AuthError {
    // Axios error
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as any;
      const status = axiosError.response?.status;
      const data = axiosError.response?.data;

      // API error with message
      if (data?.message) {
        return {
          code: data.code || `ERROR_${status}`,
          message: data.message,
          statusCode: status,
        };
      }

      // Generic HTTP errors
      const messages: Record<number, string> = {
        400: "Thông tin không hợp lệ",
        401: "Email hoặc mật khẩu không đúng",
        403: "Bạn không có quyền truy cập",
        404: "Tài nguyên không tìm thấy",
        500: "Lỗi máy chủ, vui lòng thử lại sau",
        503: "Máy chủ tạm thời không khả dụng",
      };

      return {
        code: `HTTP_${status}`,
        message: messages[status] || "Có lỗi xảy ra",
        statusCode: status,
      };
    }

    // Network error
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

    // Unknown error
    return {
      code: "UNKNOWN_ERROR",
      message: "Có lỗi không xác định xảy ra",
    };
  }

  static getMessage(error: unknown): string {
    return this.parse(error).message;
  }
}
