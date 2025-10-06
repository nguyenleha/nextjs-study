# Redux Setup cho Sidebar

## Tổng quan
Dự án đã được cập nhật để sử dụng Redux Toolkit thay vì React Context cho việc quản lý state của sidebar. Điều này giúp:

- Loại bỏ hoàn toàn việc sử dụng `document.getElementById()` và `document.getComputedStyle()`
- Quản lý state tập trung và dễ dàng debug
- Tối ưu performance với Redux Toolkit
- Dễ dàng mở rộng và maintain

## Cấu trúc Redux

### Store
- **File**: `src/store/index.ts`
- **Chức năng**: Cấu hình Redux store với sidebar reducer

### Sidebar Slice
- **File**: `src/store/slices/sidebarSlice.ts`
- **State**: 
  - `isOpen`: Trạng thái mở/đóng sidebar
  - `isCollapsed`: Trạng thái thu gọn sidebar
  - `isHovered`: Trạng thái hover trên sidebar
  - `isMobile`: Trạng thái mobile/desktop
  - `openDropdowns`: Set các dropdown đang mở

### Actions
- `setOpen(boolean)`: Đặt trạng thái mở/đóng
- `toggle()`: Chuyển đổi trạng thái mở/đóng
- `setCollapsed(boolean)`: Đặt trạng thái thu gọn
- `setHovered(boolean)`: Đặt trạng thái hover
- `setMobile(boolean)`: Đặt trạng thái mobile
- `toggleDropdown(string)`: Chuyển đổi dropdown
- `setOpenDropdowns(Set<string>)`: Đặt danh sách dropdown mở

### Provider
- **File**: `src/store/provider.tsx`
- **Chức năng**: Redux Provider wrapper cho Next.js

### Hooks
- **File**: `src/store/hooks.ts`
- **Chức năng**: Typed hooks cho TypeScript
  - `useAppDispatch()`: Dispatch actions
  - `useAppSelector()`: Select state

## Cách sử dụng

### Trong Component
```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setOpen, toggle } from '@/store/slices/sidebarSlice'

function MyComponent() {
  const dispatch = useAppDispatch()
  const { isOpen, isCollapsed } = useAppSelector((state) => state.sidebar)
  
  const handleToggle = () => {
    dispatch(toggle())
  }
  
  return (
    <button onClick={handleToggle}>
      {isOpen ? 'Close' : 'Open'} Sidebar
    </button>
  )
}
```

## Thay đổi chính

### 1. Sidebar Component (`src/components/shared/sidebar.tsx`)
- Thay thế `useSidebarConfig()` bằng `useAppSelector()`
- Thay thế local state bằng Redux state
- **Loại bỏ hoàn toàn `document.getElementById()` và `document.getComputedStyle()`**
- Sử dụng Redux actions thay vì local state setters
- Loại bỏ DOM manipulation effects

### 2. SidebarToggle Component (`src/components/shared/sidebar-toggle.tsx`)
- Thay thế `useSidebarConfig()` bằng Redux hooks
- Cập nhật mobile detection logic với Redux
- **Loại bỏ hoàn toàn `document.getElementById()`**

### 3. SidebarLayout Component (`src/components/shared/sidebar-layout.tsx`) - MỚI
- Component mới để quản lý layout dựa trên Redux state
- Tính toán width và padding dựa trên Redux state thay vì DOM manipulation
- Sử dụng CSS classes và inline styles dựa trên Redux state

### 4. Layout (`src/app/[locale]/(authorization)/layout.tsx`)
- Thay thế `SidebarConfigProvider` bằng `ReduxProvider`
- Sử dụng `SidebarLayout` component thay vì DOM manipulation

### 5. Xóa Context
- Xóa `src/libs/sidebar-config.tsx` (không còn cần thiết)

## Cách hoạt động mới

### Trước đây (với DOM manipulation):
```typescript
// ❌ Cách cũ - sử dụng document.getElementById
const sidebar = document.getElementById('desktop-sidebar')
const mainContent = document.getElementById('main-content')
sidebar.style.width = '16rem'
mainContent.style.paddingLeft = '16rem'
```

### Bây giờ (với Redux):
```typescript
// ✅ Cách mới - sử dụng Redux state
const { isOpen, isHovered, isMobile, isCollapsed } = useAppSelector((state) => state.sidebar)
const isExpanded = isMobile ? isOpen : isOpen || isHovered || !isCollapsed
const sidebarWidth = isMobile ? '0px' : isExpanded ? '16rem' : '5rem'
const mainPaddingLeft = isMobile ? '0px' : isExpanded ? '16rem' : '5rem'

// Sử dụng trong JSX
<div style={{ width: sidebarWidth }}>
<div style={{ paddingLeft: mainPaddingLeft }}>
```

## Lợi ích

1. **Performance**: Redux Toolkit tối ưu re-renders
2. **Debugging**: Redux DevTools hỗ trợ debug dễ dàng
3. **Maintainability**: Code dễ đọc và maintain hơn
4. **Scalability**: Dễ dàng thêm state mới
5. **Type Safety**: TypeScript support đầy đủ
6. **No DOM Manipulation**: Không cần `document.getElementById()` nữa
7. **Reactive**: UI tự động cập nhật khi Redux state thay đổi

## Cài đặt

Redux đã được cài đặt với các package:
- `@reduxjs/toolkit`: Redux Toolkit
- `react-redux`: React bindings cho Redux

## Chạy dự án

```bash
npm run dev
```

Sidebar sẽ hoạt động bình thường với Redux state management thay vì DOM manipulation.
