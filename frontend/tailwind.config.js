module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
	  extend: {
		animation: {
		  'fade-in': 'fadeIn 0.3s ease-in-out forwards',
		},
		keyframes: {
		  fadeIn: {
			'0%': { opacity: '0', transform: 'scale(0.9)' },
			'100%': { opacity: '1', transform: 'scale(1)' },
		  },
		},
	  },
	},
	plugins: [],
  };
  