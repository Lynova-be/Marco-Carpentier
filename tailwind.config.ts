import type { Config } from 'tailwindcss'

export default {
    darkMode: ['class'],
    content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './App.tsx'
  ],
  theme: {
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			blue: {
  				'500': 'hsl(var(--primary))',
  				'600': 'hsl(var(--primary))',
  				'700': 'hsl(var(--primary))'
  			},
  			purple: {
  				'500': 'hsl(var(--dark))',
  				'600': 'hsl(var(--dark))',
  				'700': 'hsl(var(--dark))'
  			},
  			cyan: {
  				'500': 'hsl(var(--primary))'
  			},
  			teal: {
  				'500': 'hsl(var(--primary))'
  			},
  			green: {
  				'500': 'hsl(var(--primary))'
  			},
  			orange: {
  				'500': 'hsl(var(--primary))'
  			},
  			red: {
  				'500': 'hsl(var(--primary))'
  			},
  			pink: {
  				'500': 'hsl(var(--primary))'
  			},
  			indigo: {
  				'500': 'hsl(var(--primary))'
  			},
  			gray: {
  				'100': 'hsl(var(--muted))',
  				'400': 'hsl(var(--muted-foreground))',
  				'600': 'hsl(var(--foreground))',
  				'900': 'hsl(var(--dark))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config
