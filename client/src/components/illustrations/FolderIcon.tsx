const FolderIcon = ({ className = '' }: { className?: string }) => {
  return (
    <svg className={className} width="147" height="111" viewBox="0 0 147 111" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="project file">
        <g id="Rectangle 18" filter="url(#filter0_d_folder)">
          <path
            d="M9 15C9 9.47715 13.4772 5 19 5H69.266C71.9724 5 74.5632 6.09695 76.4467 8.04033L77.0744 8.68795C78.958 10.6313 81.5488 11.7283 84.2552 11.7283H128C133.523 11.7283 138 16.2054 138 21.7283V101C138 106.523 133.523 111 128 111H19C13.4771 111 9 106.523 9 101V15Z"
            fill="#D0CE9D"
          />
          <path
            d="M19 5.5H69.2656C71.8367 5.5 74.2985 6.54246 76.0879 8.38867L76.7158 9.03613C78.6935 11.0764 81.4134 12.2284 84.2549 12.2285H128C133.247 12.2285 137.5 16.4818 137.5 21.7285V101C137.5 106.247 133.247 110.5 128 110.5H19C13.7533 110.5 9.5 106.247 9.5 101V15C9.5 9.7533 13.7533 5.5 19 5.5Z"
            stroke="black"
          />
        </g>
        <path
          id="Rectangle 17"
          d="M25.2607 20.5H135.522C141.118 20.5 145.502 25.3124 144.981 30.8838L138.35 101.884C137.893 106.767 133.795 110.5 128.891 110.5H19.7988C14.265 110.5 9.90276 105.789 10.3271 100.271L15.7881 29.2715C16.1688 24.322 20.2966 20.5 25.2607 20.5Z"
          fill="#F4F1BB"
          stroke="black"
        />
      </g>
      <defs>
        <filter id="filter0_d_folder" x="0" y="0" width="138" height="111" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="-9" dy="-5"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.230446 0 0 0 0 0.277363 0 0 0 0 0.271189 0 0 0 0.4 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_folder"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_folder" result="shape"/>
        </filter>
      </defs>
    </svg>
  );
};

export default FolderIcon;
