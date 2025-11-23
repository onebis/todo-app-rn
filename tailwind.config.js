/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                'app-background': '#E0E0E0',
                'main-list-bg': '#F2F2F2',
                'active-tab': '#F2F2F2',
                'inactive-tab': '#BDBDBD',
                'border-bottom': '#E0E0E0',
                'close-button': '#616161',
                'task-done': '#757575',
                'disabled': '#BDBDBD',
                'will-accept': 'rgba(242, 242, 242, 0.76)',
            },
            spacing: {
                xs: '5px',
                sm: '10px',
                md: '20px',
                lg: '30px',
                xl: '40px',
            },
            borderRadius: {
                main: '24px',
                'task-list': '10px',
                tab: '5px',
                modal: '20px',
            },
            fontSize: {
                'body-large': '16px',
                'body-medium': '14px',
                button: '14px',
            },
            fontWeight: {
                medium: '500',
            },
        },
    },
    plugins: [],
};