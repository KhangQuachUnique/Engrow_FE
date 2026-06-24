/**
 * Format date to Vietnamese format: dd/MM/yyyy
 * @param date - Date object or date string
 * @returns Formatted date string
 */
export function formatDateVN(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Format date to full Vietnamese format: Thứ hai, 5 tháng 5, 2026
 * @param date - Date object or date string
 * @returns Formatted date string
 */
export function formatDateFullVN(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format time to HH:mm format
 * @param date - Date object or date string
 * @returns Formatted time string
 */
export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Format date and time: dd/MM/yyyy HH:mm
 * @param date - Date object or date string
 * @returns Formatted date and time string
 */
export function formatDateTime(date: Date | string): string {
  return `${formatDateVN(date)} ${formatTime(date)}`;
}

/**
 * Get relative time (e.g., "2 hours ago", "3 days ago")
 * @param date - Date object or date string
 * @returns Relative time string in Vietnamese
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days < 7) return `${days} ngày trước`;
  if (days < 30) return `${Math.floor(days / 7)} tuần trước`;
  if (days < 365) return `${Math.floor(days / 30)} tháng trước`;
  return `${Math.floor(days / 365)} năm trước`;
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string): boolean {
  const d = typeof date === "string" ? new Date(date) : date;
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if date is yesterday
 */
export function isYesterday(date: Date | string): boolean {
  const d = typeof date === "string" ? new Date(date) : date;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * Smart format: returns "Today", "Yesterday", or relative time
 */
export function formatSmart(date: Date | string): string {
  if (isToday(date)) return "Hôm nay";
  if (isYesterday(date)) return "Hôm qua";
  return formatRelativeTime(date);
}
