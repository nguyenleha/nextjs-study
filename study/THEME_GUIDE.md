# Theme System Guide

Hệ thống theme này cung cấp 5 theme đẹp mắt với khả năng chuyển đổi mượt mà và lưu trữ theme đã chọn.

## 🎨 Các Theme Có Sẵn

1. **Light** ☀️ - Theme sáng với màu xanh dương chủ đạo
2. **Dark** 🌙 - Theme tối với màu xanh dương nhạt
3. **Blue** 💙 - Theme xanh dương với tông màu sky blue
4. **Green** 💚 - Theme xanh lá với tông màu emerald
5. **Purple** 💜 - Theme tím với tông màu violet

## 🚀 Cách Sử Dụng

### 1. Theme Switcher Component

```tsx
import ThemeSwitcher from '@/components/ThemeSwitcher'

// Sử dụng trong component
<ThemeSwitcher />
```

### 2. Sử dụng Theme Context

```tsx
import { useTheme } from '@/contexts/ThemeContext'

function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme()
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>Set Dark Theme</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}
```

### 3. Sử dụng CSS Variables

```css
.my-component {
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
}
```

## 🎯 CSS Variables Có Sẵn

- `--background` - Màu nền chính
- `--foreground` - Màu chữ chính
- `--card` - Màu nền card
- `--card-foreground` - Màu chữ trong card
- `--primary` - Màu chủ đạo
- `--primary-foreground` - Màu chữ trên nền primary
- `--secondary` - Màu phụ
- `--secondary-foreground` - Màu chữ trên nền secondary
- `--muted` - Màu nhạt
- `--muted-foreground` - Màu chữ nhạt
- `--accent` - Màu nhấn
- `--accent-foreground` - Màu chữ trên nền accent
- `--destructive` - Màu cảnh báo/lỗi
- `--destructive-foreground` - Màu chữ trên nền destructive
- `--border` - Màu viền
- `--input` - Màu viền input
- `--ring` - Màu focus ring

## 🔧 Tùy Chỉnh Theme

### Thêm Theme Mới

1. Thêm theme vào `ThemeContext.tsx`:

```tsx
export type Theme = 'light' | 'dark' | 'blue' | 'green' | 'purple' | 'your-theme'
```

2. Thêm CSS variables vào `globals.css`:

```css
[data-theme="your-theme"] {
  --background: #your-color;
  --foreground: #your-color;
  /* ... các variables khác */
}
```

3. Thêm vào theme switcher:

```tsx
const themes = [
  // ... existing themes
  { id: 'your-theme', name: 'Your Theme', icon: '🎨', color: '#your-color' },
]
```

### Tùy Chỉnh Màu Sắc

Chỉnh sửa các CSS variables trong `globals.css` để thay đổi màu sắc của theme.

## 📱 Responsive Design

Theme system hoạt động tốt trên mọi thiết bị và tự động thích ứng với:
- Dark mode preference của hệ thống
- Kích thước màn hình khác nhau
- Touch và hover interactions

## 🎪 Demo

Truy cập `/theme-demo` để xem demo đầy đủ của tất cả các theme và components.

## 💡 Tips

1. **Smooth Transitions**: Tất cả theme changes đều có transition mượt mà
2. **Persistence**: Theme được lưu trong localStorage
3. **System Preference**: Tự động detect dark mode preference của hệ thống
4. **Accessibility**: Theme system tuân thủ accessibility guidelines
5. **Performance**: Sử dụng CSS variables để tối ưu performance

## 🔄 Migration

Nếu bạn đang sử dụng CSS classes cũ, hãy thay thế bằng CSS variables:

```css
/* Cũ */
.my-component {
  background-color: #ffffff;
  color: #000000;
}

/* Mới */
.my-component {
  background-color: var(--background);
  color: var(--foreground);
}
```

