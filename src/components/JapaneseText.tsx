import React from "react";

const JapaneseText: React.FC = () => {
  return (
    <section
      className="absolute text-[#374a91] font-semibold text-sm lg:text-2xl tracking-[1rem] lg:tracking-[1.6rem] left-[10vw] lg:left-[55vw] top-[20%] lg:top-[40%] jp-text opacity-0"
      aria-label="Japanese welcome message"
    >
      <h2 className="sr-only">Welcome Message</h2>
      <p className="mb-5 wave" aria-hidden="true">
        ふわふわの動物たちに、
      </p>
      <p className="mb-10 wave" aria-hidden="true">
        囲まれて暮らしたい
      </p>
      <p className="wave" aria-hidden="true">
        ペットや動物が大好きなあなたへ
      </p>
    </section>
  );
};

export default JapaneseText;
