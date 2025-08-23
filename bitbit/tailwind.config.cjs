module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 自定义颜色系统
      colors: {
        // 主品牌色 - 活力蓝
        primary: {
          50: "#F0F4FF",
          100: "#CCE1FF",
          200: "#7D95FF",
          500: "#4E6FFF",
          600: "#3050E0",
        },
        // 辅助色
        coral: {
          100: "#FFCCD6",
          500: "#FF6B8B",
        },
        mint: {
          100: "#CCF5E8",
          500: "#65D1AA",
        },
        sunflower: {
          100: "#FFECCB",
          500: "#FFB951",
        },
        lavender: {
          100: "#E6DDFF",
          500: "#8F7CFF",
        },
        // 中性色
        text: {
          primary: "#222222",
          secondary: "#666666",
          tertiary: "#999999",
        },
        // 状态色
        error: "#FF5252",
        success: "#12B76A",
        warning: "#FFC107",
        info: "#0096FF",
      },
      // 字体大小系统
      fontSize: {
        "title-1": ["32px", { lineHeight: "42px", fontWeight: "700" }],
        "title-2": ["28px", { lineHeight: "36px", fontWeight: "700" }],
        "title-3": ["24px", { lineHeight: "31px", fontWeight: "600" }],
        "title-4": ["20px", { lineHeight: "26px", fontWeight: "600" }],
        subtitle: ["18px", { lineHeight: "24px", fontWeight: "500" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        body: ["14px", { lineHeight: "21px", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "18px", fontWeight: "400" }],
      },
      // 圆角系统
      borderRadius: {
        xs: "4px",
        sm: "8px",
        lg: "16px",
      },
      // 阴影系统
      boxShadow: {
        light: "0px 1px 2px rgba(0,0,0,0.05)",
        card: "0px 4px 8px rgba(0,0,0,0.08)",
        modal: "0px 8px 24px rgba(0,0,0,0.12)",
        focus: "0px 12px 32px rgba(0,0,0,0.16)",
      },
      // 动画时长
      transitionDuration: {
        250: "250ms",
      },
      // 字体族
      fontFamily: {
        sans: [
          "Inter",
          "PingFang SC",
          "Microsoft YaHei",
          "SF Pro",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
