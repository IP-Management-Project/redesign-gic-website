type SectionHeaderProps = {
  kicker: string;
  titleText: string;
  desc?: string;
  align?: "left" | "center";
};

const headingKicker =
  "text-xs font-bold uppercase tracking-[0.35em] text-default-400";

export function SectionHeader({
  kicker,
  titleText,
  desc,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div className={headingKicker}>{kicker}</div>
      <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight">
        {titleText}
      </h2>
      {desc ? (
        <p className="mt-5 text-default-500 text-base md:text-lg max-w-2xl mx-auto">
          {desc}
        </p>
      ) : null}
    </div>
  );
}
