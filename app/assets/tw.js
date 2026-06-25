/* Avtopakt Fura — Tailwind tokens
   Primary #FFCB00 (yellow) · Secondary #0F0F37 (navy) · Accent #0F0F37 (black) */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      spacing: { '4.5': '1.125rem' },
      colors: {
        primary: {
          25: '#FFFDF2', 50: '#FFF7D6', 100: '#FFEFAD', 200: '#FFE680',
          300: '#FFDB4D', 400: '#FFD220', 500: '#FFCB00', 600: '#E0B200',
          700: '#A37F00', 800: '#6B5300', 900: '#3D2F00',
        },
        navy: {
          25: '#F5F5F8', 50: '#E7E7EE', 100: '#C2C2D6', 200: '#9A9ABA',
          300: '#6E6E97', 400: '#45456E', 500: '#26264F', 600: '#1A1A41',
          700: '#14143A', 800: '#0F0F37', 900: '#08081F', DEFAULT: '#0F0F37',
        },
        // alias so any legacy "brand-*" renders as navy (dark surface)
        brand: {
          25: '#F5F5F8', 50: '#E7E7EE', 100: '#C2C2D6', 200: '#9A9ABA',
          300: '#6E6E97', 400: '#45456E', 500: '#26264F', 600: '#14143A',
          700: '#0F0F37', 800: '#0B0B2A', 900: '#08081F',
        },
        gray: {
          25: '#FCFCFD', 50: '#F9FAFB', 100: '#F2F4F7', 200: '#EAECF0',
          300: '#D0D5DD', 400: '#98A2B3', 500: '#667085', 600: '#475467',
          700: '#344054', 800: '#1D2939', 900: '#101828', 950: '#0C111D',
        },
        error:   { 25:'#FFFBFA',50:'#FEF3F2',100:'#FEE4E2',200:'#FECDCA',300:'#FDA29B',400:'#F97066',500:'#F04438',600:'#D92D20',700:'#B42318' },
        warning: { 25:'#FFFCF5',50:'#FFFAEB',100:'#FEF0C7',200:'#FEDF89',300:'#FEC84B',400:'#FDB022',500:'#F79009',600:'#DC6803',700:'#B54708' },
        success: { 25:'#F6FEF9',50:'#ECFDF3',100:'#DCFAE6',200:'#ABEFC6',300:'#75E0A7',400:'#47CD89',500:'#17B26A',600:'#079455',700:'#067647' },
        blue:    { 50:'#EFF8FF',100:'#D1E9FF',200:'#B2DDFF',300:'#84CAFF',400:'#53B1FD',500:'#2E90FA',600:'#1570EF',700:'#175CD3' },
      },
      borderRadius: { none:'0', sm:'6px', DEFAULT:'8px', md:'8px', lg:'10px', xl:'12px', '2xl':'16px', '3xl':'20px', '4xl':'24px', full:'9999px' },
      boxShadow: {
        xs:'0 1px 2px 0 rgba(16,24,40,0.05)',
        sm:'0 1px 3px 0 rgba(16,24,40,0.10), 0 1px 2px -1px rgba(16,24,40,0.10)',
        md:'0 4px 8px -2px rgba(16,24,40,0.10), 0 2px 4px -2px rgba(16,24,40,0.06)',
        lg:'0 12px 16px -4px rgba(16,24,40,0.08), 0 4px 6px -2px rgba(16,24,40,0.03)',
        xl:'0 20px 24px -4px rgba(16,24,40,0.10), 0 8px 8px -4px rgba(16,24,40,0.04)',
        nav:'0 8px 30px -4px rgba(15,15,55,0.45)',
      },
    },
  },
};
