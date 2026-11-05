export function PaymentBadges() {
  return (
    <div
      className="flex items-center gap-1.5"
      aria-label="Supported payment methods"
    >
      {/* Visa */}
      <div
        className="h-6 px-2 bg-white/70 border border-caramel/20 rounded flex items-center justify-center shadow-xs"
        title="Visa"
      >
        <span className="font-sans font-extrabold text-[11px] tracking-wider text-[#1A1F71] italic">
          VISA
        </span>
      </div>

      {/* Mastercard */}
      <div
        className="h-6 px-2 bg-white/70 border border-caramel/20 rounded flex items-center justify-center gap-0.5 shadow-xs"
        title="Mastercard"
      >
        <div className="w-3 h-3 rounded-full bg-[#EB001B] opacity-90 -mr-1.5" />
        <div className="w-3 h-3 rounded-full bg-[#F79E1B] opacity-90" />
      </div>

      {/* Apple Pay */}
      <div
        className="h-6 px-2 bg-white/70 border border-caramel/20 rounded flex items-center justify-center gap-1 shadow-xs"
        title="Apple Pay"
      >
        <svg
          className="w-2.5 h-2.5 fill-current text-mocha/80"
          viewBox="0 0 170 170"
        >
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.7-11.71-13.98-6.19-9.57-11.08-20.44-14.67-32.61-3.59-12.18-5.38-23.82-5.38-34.93 0-15.01 3.8-27.18 11.41-36.5 7.6-9.33 17.06-14.07 28.37-14.23 4.89 0 10.15 1.25 15.77 3.75 5.62 2.5 9.77 3.78 12.44 3.84 2.11 0 6.46-1.34 13.06-4.03 6.6-2.69 12.18-3.86 16.74-3.51 12.43.99 22.18 5.62 29.27 13.9-10.88 6.57-16.21 15.64-16 27.21.21 9.17 3.7 16.96 10.46 23.36 6.77 6.41 14.83 10.18 24.19 11.33-2.07 6.13-4.58 12.35-7.53 18.66zM119.22 33.15c0-7.39 2.66-14.42 7.97-21.09 5.31-6.66 12.18-11.05 20.61-13.16.22 1.77.33 3.34.33 4.7 0 7.39-2.8 14.54-8.4 21.45-5.6 6.9-12.45 11.38-20.51 13.43a28.7 28.7 0 0 1 0-5.33z" />
        </svg>
        <span className="font-sans font-semibold text-[10px] text-mocha/80">
          Pay
        </span>
      </div>

      {/* Google Pay */}
      <div
        className="h-6 px-2 bg-white/70 border border-caramel/20 rounded flex items-center justify-center text-[10px] font-sans font-semibold text-mocha/80 shadow-xs"
        title="Google Pay"
      >
        <span className="text-[#4285F4] mr-0.5">G</span>Pay
      </div>
    </div>
  );
}
