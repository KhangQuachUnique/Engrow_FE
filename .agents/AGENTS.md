# Engrow Coding Guide For AI Agents

Tài liệu này là context bắt buộc cho AI/dev khi code hoặc sửa code trong project Engrow.
Mục tiêu: giữ kiến trúc gọn, dễ đọc, đúng flow, không tự ý thêm abstraction khi chưa cần.

## Tinh Thần Chung

- Code theo hướng pragmatic.
- Ưu tiên đọc flow hiện có trước khi sửa.
- Không refactor lan rộng nếu request chỉ cần sửa hẹp.
- Không tạo file `index.ts` barrel mặc định.
- Không tạo abstraction chỉ vì "có vẻ clean"; chỉ tạo khi có reuse thật hoặc giảm rối rõ ràng.
- Import thẳng file cụ thể để dễ trace.
- Không đưa logic feature vào `share`.
- Không đưa shell/layout vào form component.

## Cấu Trúc Tổng Quan

```txt
src/
  config/             cấu hình app, axios, client setup
  features/           module nghiệp vụ
  pages/              page generic không thuộc riêng feature nào
  routes/             khai báo route
  share/              code dùng lại giữa nhiều feature
```

Feature nên đi theo cấu trúc:

```txt
features/<feature>/
  components/         UI thuộc feature
  hooks/
    mutations/        React Query mutation
    queries/          React Query query
  layouts/            layout dùng lại trong feature
  pages/              page được route gọi vào
  schemas/            schema validate form
  services/           hàm gọi API thuần
  types/              DTO và type nghiệp vụ FE nếu có
  utils/              helper riêng của feature
```

Không phải feature nào cũng cần đủ folder. Chỉ tạo folder khi có nhiệm vụ thật.

## Flow Chuẩn Một Feature

Flow UI/API nên đi như sau:

```txt
routes
  -> pages
    -> layouts
      -> components/forms
        -> hooks/queries hoặc hooks/mutations
          -> services
            -> config/axios
```

Ví dụ auth login:

```txt
routes/index.tsx
  -> features/auth/pages/LoginPage.tsx
    -> features/auth/layouts/AuthLayout.tsx
      -> features/auth/components/login/LoginForm.tsx
        -> features/auth/hooks/mutations/useLogin.ts
          -> features/auth/services/login.ts
            -> config/axios/axios.ts
```

## Pages

Page chỉ compose route-level UI.

Page được phép:

- gọi layout
- truyền title/description cơ bản
- render form/component chính

Page không nên:

- chứa API logic
- chứa schema validation
- chứa form fields chi tiết
- chứa styling dài của component con

Ví dụ:

```tsx
export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Please enter your details to sign in.">
      <LoginForm />
    </AuthLayout>
  );
}
```

## Layouts

Layout giữ khung dùng lại.

Layout được phép chứa:

- background
- card shell
- logo/hero copy
- trust row
- placement của title/description
- structure dùng chung giữa Login/Register

Layout không nên chứa:

- form state
- form submit
- API call
- mutation/query trực tiếp

Auth hiện tại dùng `AuthLayout` cho Login và Register.

## Form Components

Form component chỉ lo form.

Form được phép chứa:

- `react-hook-form`
- `zodResolver`
- render input/button của chính form
- error message của form/API
- map form data sang DTO
- gọi mutation hook

Form không nên chứa:

- full-page layout
- background
- hero bên trái
- trust row
- route-level composition

## Hooks

React Query hook nằm trong:

```txt
hooks/queries/
hooks/mutations/
```

Mutation hook được phép xử lý side effect liên quan server state:

- gọi service
- save token
- navigate sau success
- invalidate query
- parse/log error

Query hook nên expose query key và query function.

Không nhét UI JSX vào hook.

## Services

Service là hàm API thuần.

Service được phép:

- gọi axios instance
- dùng endpoint constants
- dùng DTO type
- trả `res.data`

Service không nên:

- dùng React hook
- navigate
- render UI
- xử lý form
- thao tác localStorage, trừ khi có lý do rất rõ

Ví dụ:

```ts
export const login = async (payload: LoginRequestDto) => {
  const res = await api.post<ApiResponse<LoginResponseDto>>(
    apiConstants.AUTH.LOGIN,
    payload,
  );

  return res.data;
};
```

## Types: DTO, Schema, Model

### DTO

DTO là contract với backend.

Đặt trong:

```txt
features/<feature>/types/<feature>.dto.ts
```

Ví dụ:

```ts
export type LoginRequestDto = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  accessToken: string;
  refreshToken: string;
  user: AuthUserResponseDto;
};
```

Rule:

- BE trả gì thì DTO mô tả shape đó.
- Service dùng DTO trực tiếp.
- Hook có thể dùng DTO khi gọi service.
- Không để DTO import schema/form type.
- Không map DTO sang model nếu BE response đã dùng được.

### Schema/FormData

Schema dùng cho validate form runtime.

Đặt trong:

```txt
features/<feature>/schemas/<feature>.ts
```

Ví dụ:

```ts
export const loginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(6),
  rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

Rule:

- Schema là cho form/input UI.
- `FormData` infer từ schema và đặt cạnh schema.
- FormData không phải API DTO.
- Nếu form có field UI-only như `rememberMe`, `confirmPassword`, `captcha`, chỉ map field BE cần sang DTO trước khi mutate.

Ví dụ:

```ts
const onSubmit = (data: LoginFormData) => {
  const payload: LoginRequestDto = {
    email: data.email,
    password: data.password,
  };

  loginMutation.mutate(payload);
};
```

### Model

Model chỉ dùng cho type nghiệp vụ nội bộ FE.

Đặt trong:

```txt
features/<feature>/types/<feature>.model.ts
```

Chỉ tạo model khi có type trung gian phục vụ logic FE, ví dụ:

```ts
export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  isLoggedIn: boolean;
};

export type PermissionMap = {
  canReviewEssay: boolean;
  canManageUsers: boolean;
};
```

Rule:

- Không tạo model chỉ để copy DTO.
- Không map data nếu chưa có nhu cầu nghiệp vụ FE.
- Nếu BE response dùng trực tiếp được thì dùng DTO trực tiếp.

## API Response Và Error Message

API response wrapper chung đặt ở:

```txt
share/types/api.ts
```

FE đang giả định response success dạng:

```ts
export interface ApiResponse<T> {
  code: number;
  data: T;
  message?: string;
}
```

Nếu BE chốt shape khác, sửa file này trước rồi sửa service theo lỗi type.

Error nên xử lý theo code:

```txt
BE trả code + message
  -> FE parse code
  -> map code sang localized message
  -> fallback BE message
  -> fallback default message
```

Rule:

- Component không hardcode API error text.
- BE `code` là key ổn định.
- BE `message` chỉ là fallback/debug nếu cần đa ngôn ngữ.
- Error message common để trong `share`.
- Error message chỉ riêng feature thì để trong feature.

## Register 3-Step Flow

Register nên là một flow nhiều step trong cùng feature, không nhét tất cả vào một form khổng lồ.

Structure đề xuất:

```txt
features/auth/
  pages/
    RegisterPage.tsx
  components/
    register/
      RegisterFlow.tsx
      RegisterEmailStep.tsx
      RegisterOtpStep.tsx
      RegisterProfileStep.tsx
  hooks/
    mutations/
      useSendRegisterOtp.ts
      useVerifyRegisterOtp.ts
      useRegister.ts
  services/
    sendRegisterOtp.ts
    verifyRegisterOtp.ts
    register.ts
  schemas/
    auth.ts
  types/
    auth.dto.ts
```

Flow:

```txt
RegisterPage
  -> AuthLayout
    -> RegisterFlow
      -> RegisterEmailStep
      -> RegisterOtpStep
      -> RegisterProfileStep
```

`RegisterFlow` giữ state step:

```ts
type RegisterStep = "email" | "otp" | "profile";
```

Mỗi step có schema riêng:

```ts
registerEmailSchema
registerOtpSchema
registerProfileSchema
```

Mỗi API có service/hook riêng:

```txt
sendRegisterOtp -> useSendRegisterOtp
verifyRegisterOtp -> useVerifyRegisterOtp
register -> useRegister
```

Chưa cần route riêng cho từng step, trừ khi cần refresh/share link từng bước.

## Shared Code

`src/share` chỉ chứa thứ dùng lại giữa nhiều feature.

Ví dụ hiện tại:

```txt
share/components/Button.tsx
share/components/Input.tsx
share/utils/cn.ts
share/types/api.ts
share/constants/apiConstants.ts
```

Rule:

- Shared component phải generic.
- Không đặt text/logic feature vào shared component.
- `Input` có thể nhận `icon` optional, nhưng không đặt tên là `IconInput`.
- Import trực tiếp:

```ts
import Button from "@/share/components/Button";
import Input from "@/share/components/Input";
import { cn } from "@/share/utils/cn";
```

Không tạo barrel `index.ts` trong shared nếu chưa thống nhất pattern.

## Styling

Project dùng Tailwind CSS v4.

Theme token khai báo trong `src/index.css` bằng `@theme`:

```css
@theme {
  --color-brand: #3abef9;
  --color-primary-hover: #25b5f3;
  --font-heading: Quicksand, Inter, system-ui, sans-serif;
}
```

Dùng utility được sinh ra:

```tsx
className="bg-brand hover:bg-primary-hover font-heading"
```

Không dùng class kiểu `color-brand`.

Nên gom class bằng `cn()` theo cụm để dễ debug:

```ts
const cardClass = cn(
  "flex w-full flex-col gap-[26px] rounded-3xl border",
  "border-white/50 bg-white/85 px-9 py-[34px]",
  "shadow-[0_0_20px_-5px_rgba(58,190,249,0.1)]",
);
```

## Naming

Tên nên nhất quán:

- `*Dto`: backend request/response type.
- `*FormData`: type infer từ schema.
- `*Page`: route-level page.
- `*Layout`: reusable page shell.
- `use*`: hook.
- `*Schema`: Zod schema.

Ví dụ:

```txt
LoginRequestDto
LoginResponseDto
LoginFormData
LoginPage
AuthLayout
useLogin
loginSchema
```

## Checklist Khi Code/Sửa Code

Trước khi code:

1. Xác định code thuộc feature hay shared.
2. Xác định layer cần sửa: page, layout, component, hook, service, schema, dto.
3. Đọc flow import hiện tại trước khi thêm file.
4. Không tự tạo index/barrel.
5. Không tự tạo model nếu DTO dùng trực tiếp được.

Khi code:

1. Giữ form tách khỏi layout.
2. Giữ service thuần API.
3. Giữ DTO độc lập với schema.
4. Dùng `cn()` cho Tailwind class dài.
5. Dùng token trong `@theme` thay vì hardcode màu lặp lại.

Sau khi code:

1. Chạy `npm run lint`.
2. Chạy `npm run build`.
3. Search import cũ/file cũ nếu có rename/delete.

## Những Điều Cần Tránh

- Không để DTO import `LoginFormData` hoặc schema type.
- Không để service gọi hook/router.
- Không để form component chứa full page shell.
- Không tạo model chỉ để mirror DTO.
- Không map backend data nếu FE chưa có nhu cầu nghiệp vụ.
- Không hardcode API error message trong component.
- Không tạo shared component cho thứ mới dùng một feature.
- Không tạo barrel `index.ts` mặc định.
